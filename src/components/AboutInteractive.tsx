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
import { ParallaxLayer } from './Scene';

const STATS = [
  { value: 5, suffix: '+', label: 'Years of expertise' },
  { value: 240, suffix: '+', label: 'Projects launched' },
  { value: 12, suffix: 'M', label: 'Sq ft visualized' },
  { value: 38, suffix: '%', label: 'Faster close rate' },
];

export default function AboutInteractive() {
  const sectionRef = useRef<HTMLElement>(null);
  return (
    <section id="about" ref={sectionRef} className="panel panel--cream about about--rich">
      <div className="about__backdrop" aria-hidden="true">
        DS
      </div>

      <TiltImage />

      <Reveal className="about__copy">
        <p className="about__eyebrow">
          <i />
          Who We Are
        </p>
        <h2>
          We build the tools behind <em>Real Estate Success.</em>
        </h2>
        <p>
          At DreamSelector, we bring years of global experience to the forefront of property
          management innovation. Over the past five years, our specialized software solutions have
          played a key role in supporting the sale and rental of both new developments and existing
          properties.
        </p>
        <p>
          Driven by close collaboration with our clients and the dedication of our skilled
          international team, we deliver tailor-made systems that meet the unique needs of each
          project — enhancing efficiency, visibility, and success in a competitive market.
        </p>
        <p>
          With a strong operational foundation in India and a global client base, we’re proud to
          combine world-class development capabilities with in-depth market understanding.
        </p>

        <div className="about__stats">
          {STATS.map((s, i) => (
            <Counter key={s.label} stat={s} index={i} />
          ))}
        </div>

        <motion.a
          href="#contact"
          className="about__cta"
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
    </section>
  );
}

function TiltImage() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 70, damping: 18 });
  const sy = useSpring(my, { stiffness: 70, damping: 18 });

  const rotateX = useTransform(sy, [0, 1], [6, -6]);
  const rotateY = useTransform(sx, [0, 1], [-8, 8]);
  const imgX = useTransform(sx, [0, 1], ['-3%', '3%']);
  const imgY = useTransform(sy, [0, 1], ['-3%', '3%']);

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
    <ParallaxLayer speed={0.25} className="about__visual-parallax">
      <motion.div
        ref={ref}
        className="about__visual"
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY, transformPerspective: 1100 }}
      >
        <motion.div className="about__visual-inner" style={{ x: imgX, y: imgY }}>
          <SafeImage
            src={IMAGES.about.src}
            alt={IMAGES.about.alt}
            className="about__img"
            fallback={IMAGES.about.fallback}
          />
        </motion.div>
        <div className="about__visual-frame" aria-hidden="true" />
        <motion.div
          className="about__badge"
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="about__badge-num">05+</span>
          <span className="about__badge-label">Years of global expertise</span>
        </motion.div>
        <motion.div
          className="about__floater about__floater--ring"
          aria-hidden="true"
          animate={{ rotate: 360 }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        >
          <CircleText text=" DreamSelector · Property · Design · Tech · " />
        </motion.div>
      </motion.div>
    </ParallaxLayer>
  );
}

function CircleText({ text }: { text: string }) {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <path id="aboutCircle" d="M 100,100 m -80,0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0" />
      </defs>
      <text fontSize="13" letterSpacing="3" fill="#1a1a1a">
        <textPath href="#aboutCircle">{text.repeat(2)}</textPath>
      </text>
    </svg>
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

  // Drive the underline reveal from the same scroll position
  const blockRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: blockRef,
    offset: ['start 90%', 'end 30%'],
  });
  const lineScale = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  return (
    <div ref={blockRef} className="about__stat">
      <div ref={ref} className="about__stat-value">
        {Math.round(display)}
        <em>{stat.suffix}</em>
      </div>
      <motion.span className="about__stat-line" style={{ scaleX: lineScale, originX: 0 }} />
      <span className="about__stat-label">{stat.label}</span>
    </div>
  );
}
