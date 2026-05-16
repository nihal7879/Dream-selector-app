import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useRef } from 'react';

const KEYWORDS = ['Grow', 'Visualize', 'Automate', 'Manage', 'Close'];

const STATS = [
  { value: '240+', label: 'Projects launched' },
  { value: '38%', label: 'Faster close rate' },
  { value: '12M', label: 'Sq ft visualized' },
];

type StackItem =
  | { type: 'chip'; text: string }
  | { type: 'stat'; value: string; label: string };

const ROW: StackItem[] = [
  { type: 'chip', text: KEYWORDS[0] },
  { type: 'stat', ...STATS[0] },
  { type: 'chip', text: KEYWORDS[1] },
  { type: 'chip', text: KEYWORDS[2] },
  { type: 'stat', ...STATS[1] },
  { type: 'chip', text: KEYWORDS[3] },
  { type: 'stat', ...STATS[2] },
  { type: 'chip', text: KEYWORDS[4] },
];

function GlassItem({
  item,
  index,
  progress,
}: {
  item: StackItem;
  index: number;
  progress: MotionValue<number>;
}) {
  const drift = 30 + (index % 4) * 14;
  const lift = index % 2 === 0 ? -1 : 1;

  const y = useTransform(progress, [0, 0.5, 1], [lift * 18, 0, lift * -18]);
  const rotate = useTransform(progress, [0, 1], [lift * 1.4, lift * -1.4]);
  const opacity = useTransform(progress, [0, 0.15, 0.85, 1], [0.4, 1, 1, 0.5]);
  const scale = useTransform(progress, [0, 0.2, 0.8, 1], [0.92, 1, 1, 0.95]);

  if (item.type === 'chip') {
    return (
      <motion.div
        className="glass-chip glass-chip--pill"
        style={{ y, rotate, opacity, scale }}
        whileHover={{ scale: 1.06, y: -6 }}
        transition={{ duration: 0.22 }}
      >
        <span>{item.text}</span>
        <b>◆</b>
      </motion.div>
    );
  }

  return (
    <motion.article
      className="glass-chip glass-chip--stat"
      style={{ y, rotate, opacity, scale }}
      whileHover={{ scale: 1.04, y: -8 }}
      transition={{ duration: 0.25 }}
    >
      <strong>{item.value}</strong>
      <span>{item.label}</span>
    </motion.article>
  );
}

export default function VerticalGlassStack() {
  const zoneRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: zoneRef,
    offset: ['start end', 'end start'],
  });

  const headerY = useTransform(scrollYProgress, [0, 1], [40, -30]);
  const rowX = useTransform(scrollYProgress, [0, 1], ['8%', '-8%']);

  return (
    <section ref={zoneRef} className="glass-stack-zone">
      <motion.p className="glass-stack-zone__label" style={{ y: headerY }}>
        Platform impact
      </motion.p>

      <motion.div className="glass-row" style={{ x: rowX }}>
        {ROW.map((item, i) => (
          <GlassItem key={`${item.type}-${i}`} item={item} index={i} progress={scrollYProgress} />
        ))}
      </motion.div>
    </section>
  );
}
