import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { IMAGES } from '../lib/images';
import SafeImage from './SafeImage';
import Reveal from './Reveal';

const STATS = [
  { value: 5, suffix: '+', label: 'Years of expertise' },
  { value: 240, suffix: '+', label: 'Projects launched' },
  { value: 12, suffix: 'M', label: 'Sq ft visualized' },
  { value: 38, suffix: '%', label: 'Faster close rate' },
];

export default function AboutInteractive() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const decorY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);

  return (
    <section id="about" ref={sectionRef} className="about-v2">
      <div className="about-v2__bg" aria-hidden="true" />
      <div className="about-v2__corner about-v2__corner--tl" aria-hidden="true" />
      <div className="about-v2__corner about-v2__corner--tr" aria-hidden="true" />
      <div className="about-v2__corner about-v2__corner--bl" aria-hidden="true" />
      <div className="about-v2__corner about-v2__corner--br" aria-hidden="true" />

      <motion.span className="about-v2__rail" style={{ y: decorY }} aria-hidden="true">
        GLOBAL · DESIGN · TECH · GLOBAL · DESIGN · TECH
      </motion.span>

      <div className="about-v2__grid">
        <VisualStack />

        <div className="about-v2__copy">
          <Reveal>
            <p className="about-v2__eyebrow">
              <i />
              Who We Are
              <span className="about-v2__est">Est. 2020</span>
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="about-v2__heading">
              We build the tools behind
              <br />
              <em>Real Estate</em> <span className="about-v2__heading-script">Success.</span>
            </h2>
          </Reveal>

          <motion.span
            className="about-v2__rule"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
            aria-hidden="true"
          />

          <Reveal delay={0.15}>
            <p className="about-v2__lead">
              At DreamSelector, we bring years of global experience to the forefront of property
              management innovation. Over the past five years, our specialized software solutions
              have played a key role in supporting the sale and rental of both new developments and
              existing properties.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <p>
              Driven by close collaboration with our clients and the dedication of our skilled
              international team, we deliver tailor-made systems that meet the unique needs of each
              project — enhancing efficiency, visibility, and success in a competitive market.
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <p>
              With a strong operational foundation in India and a global client base, we’re proud to
              combine world-class development capabilities with in-depth market understanding.
            </p>
          </Reveal>

          <Reveal delay={0.3} className="about-v2__signature">
            <svg
              viewBox="0 0 180 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="about-v2__sig-mark"
              aria-hidden="true"
            >
              <motion.path
                d="M5 28 C 22 8, 42 32, 60 18 C 78 4, 96 26, 118 14 C 138 4, 158 22, 175 12"
                stroke="#c45c3e"
                strokeWidth="1.4"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.6, ease: 'easeInOut', delay: 0.5 }}
              />
            </svg>
            <span className="about-v2__sig-name">— The DreamSelector team</span>
          </Reveal>

          <Reveal delay={0.35}>
            <motion.a
              href="#contact"
              className="about-v2__cta"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.18 }}
            >
              Get In Touch
              <motion.span
                aria-hidden="true"
                animate={{ x: [0, 6, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              >
                →
              </motion.span>
            </motion.a>
          </Reveal>
        </div>
      </div>

      <div className="about-v2__stats">
        <span className="about-v2__stats-rule" aria-hidden="true" />
        <div className="about-v2__stats-row">
          {STATS.map((s, i) => (
            <Counter key={s.label} stat={s} index={i} />
          ))}
        </div>
        <span className="about-v2__stats-rule" aria-hidden="true" />
      </div>
    </section>
  );
}

function VisualStack() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });

  const tiltX = useTransform(sy, [0, 1], [4, -4]);
  const tiltY = useTransform(sx, [0, 1], [-6, 6]);
  const panX = useTransform(sx, [0, 1], ['-2%', '2%']);
  const panY = useTransform(sy, [0, 1], ['-2%', '2%']);

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };
  const handleLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <div className="about-v2__visual" onMouseMove={handleMove} onMouseLeave={handleLeave}>
      <motion.div
        ref={ref}
        className="about-v2__photo about-v2__photo--main"
        style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 1200 }}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div className="about-v2__photo-inner" style={{ x: panX, y: panY }}>
          <SafeImage src={IMAGES.about.src} alt={IMAGES.about.alt} fallback={IMAGES.about.fallback} />
        </motion.div>
        <motion.div
          className="about-v2__badge"
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="about-v2__badge-num">05</span>
          <span className="about-v2__badge-plus">+</span>
          <span className="about-v2__badge-label">
            Years of
            <br />
            global expertise
          </span>
        </motion.div>
      </motion.div>

      <motion.div
        className="about-v2__photo about-v2__photo--accent"
        initial={{ opacity: 0, y: 40, x: 30 }}
        whileInView={{ opacity: 1, y: 0, x: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden="true"
      >
        <div className="about-v2__photo-inner about-v2__photo-inner--accent" />
      </motion.div>

      <motion.div
        className="about-v2__photo-frame"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        aria-hidden="true"
      />

      <span className="about-v2__visual-tag">DreamSelector · Studio</span>
    </div>
  );
}

function Counter({ stat, index }: { stat: (typeof STATS)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, stat.value, {
      duration: 1.4,
      delay: 0.1 + index * 0.1,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, stat.value, index]);

  return (
    <div ref={ref} className="about-v2__stat">
      <span className="about-v2__stat-index">0{index + 1}</span>
      <div className="about-v2__stat-value">
        {Math.round(display)}
        <em>{stat.suffix}</em>
      </div>
      <span className="about-v2__stat-label">{stat.label}</span>
    </div>
  );
}
