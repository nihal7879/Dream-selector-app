import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

type SceneProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  /** darker wipe between scenes */
  variant?: 'light' | 'dark' | 'cream';
};

export default function Scene({ children, className = '', id, variant = 'light' }: SceneProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.6, 1, 1, 0.85]);

  return (
    <motion.section
      ref={ref}
      id={id}
      className={`scene scene--${variant} ${className}`}
      style={{ opacity }}
    >
      <SceneWipe progress={scrollYProgress} />
      {children}
    </motion.section>
  );
}

function SceneWipe({ progress }: { progress: MotionValue<number> }) {
  const wipeY = useTransform(progress, [0, 0.15], ['100%', '0%']);
  return (
    <motion.div className="scene__wipe" style={{ y: wipeY }} aria-hidden="true" />
  );
}

export function ParallaxLayer({
  children,
  speed = 0.4,
  className = '',
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 80, speed * -80]);

  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}
