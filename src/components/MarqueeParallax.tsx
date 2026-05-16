import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Reveal from './Reveal';

const KEYWORDS = ['Grow', 'Visualize', 'Automate', 'Manage', 'Close'];

const STATS = [
  { value: '240+', label: 'Projects launched' },
  { value: '38%', label: 'Faster close rate' },
  { value: '12M', label: 'Sq ft visualized' },
];

export default function MarqueeParallax() {
  const zoneRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: zoneRef,
    offset: ['start end', 'end start'],
  });

  const marqueeY = useTransform(scrollYProgress, [0, 0.5, 1], [70, 0, -50]);
  const statsY = useTransform(scrollYProgress, [0, 0.5, 1], [110, 20, -90]);
  const zoneOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.6, 1, 1, 0.9]);

  const items = [...KEYWORDS, ...KEYWORDS];

  return (
    <motion.div ref={zoneRef} className="marquee-zone" style={{ opacity: zoneOpacity }}>
      <motion.div className="marquee-band" style={{ y: marqueeY }}>
        <div className="marquee-section">
          <motion.div
            className="marquee__track"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
          >
            {items.map((word, i) => (
              <span key={`${word}-${i}`} className="marquee__item">
                <em>{word}</em>
                <b>◆</b>
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <motion.div className="stats-band" style={{ y: statsY }}>
        <section className="stats">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <motion.div
                className="stat"
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </motion.div>
            </Reveal>
          ))}
        </section>
      </motion.div>
    </motion.div>
  );
}
