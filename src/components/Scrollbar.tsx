import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export default function Scrollbar() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.35,
  });

  const [thumbHeight, setThumbHeight] = useState(80);
  const [viewportH, setViewportH] = useState(900);
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(true);
  const hideTimer = useRef<number | null>(null);

  useEffect(() => {
    const calc = () => {
      const vh = window.innerHeight;
      const doc = document.documentElement.scrollHeight;
      const ratio = Math.min(1, vh / Math.max(doc, 1));
      setViewportH(vh);
      // Thumb is a hairline-ish indicator. Keep it modest but visible.
      const h = Math.max(56, Math.min(160, vh * ratio * 0.55));
      setThumbHeight(h);
    };
    calc();
    window.addEventListener('resize', calc);
    const ro = new ResizeObserver(calc);
    ro.observe(document.documentElement);
    return () => {
      window.removeEventListener('resize', calc);
      ro.disconnect();
    };
  }, []);

  // Show on scroll, fade out after idle
  useEffect(() => {
    const handleScroll = () => {
      setVisible(true);
      setActive(true);
      if (hideTimer.current) window.clearTimeout(hideTimer.current);
      hideTimer.current = window.setTimeout(() => setActive(false), 800);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (hideTimer.current) window.clearTimeout(hideTimer.current);
    };
  }, []);

  const trackInset = 12;
  const top = useTransform(smooth, (v) => {
    const travel = viewportH - thumbHeight - trackInset * 2;
    return trackInset + Math.max(0, v) * Math.max(0, travel);
  });

  const expanded = hover || active;

  return (
    <div className="scrollbar-rail" aria-hidden="true">
      <motion.div
        className={`scrollbar-thumb ${hover ? 'is-hover' : ''} ${active ? 'is-active' : ''} ${
          visible ? 'is-visible' : ''
        }`}
        style={{ top, height: thumbHeight }}
        animate={{
          width: expanded ? 3 : 2,
          opacity: visible ? 1 : 0.55,
        }}
        transition={{ width: { duration: 0.32, ease: [0.16, 1, 0.3, 1] }, opacity: { duration: 0.4 } }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <span className="scrollbar-thumb__glow" aria-hidden="true" />
        <span className="scrollbar-thumb__core" aria-hidden="true" />
      </motion.div>
    </div>
  );
}
