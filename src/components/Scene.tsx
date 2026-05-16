import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

type SceneProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  variant?: 'light' | 'dark' | 'cream';
};

export default function Scene({ children, className = '', id, variant = 'light' }: SceneProps) {
  return (
    <section id={id} className={`scene scene--${variant} ${className}`}>
      {children}
    </section>
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

export type { MotionValue };
