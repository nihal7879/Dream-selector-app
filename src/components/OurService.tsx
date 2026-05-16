import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { useRef, type ReactNode } from 'react';
import Reveal from './Reveal';

type Step = {
  num: string;
  title: string;
  body: string;
  icon: ReactNode;
};

const STEPS: Step[] = [
  {
    num: '01',
    title: 'First sketch',
    body:
      "Whether you’re building the future or closing the next big deal, DreamSelector is your all-in-one digital engine for smarter real estate operations.",
    icon: <IconSketch />,
  },
  {
    num: '02',
    title: 'Keys-in-hand',
    body:
      'From concept to keys-in-hand, our platform helps developers and agents stay ahead with tools that accelerate sales, simplify leasing, and automate property management — so you can focus on growth.',
    icon: <IconKey />,
  },
  {
    num: '03',
    title: 'Workflow at scale',
    body:
      'Designed for deal-makers and vision-builders, DreamSelector streamlines your entire workflow with intuitive features that drive results across every phase of the property lifecycle.',
    icon: <IconFlow />,
  },
];

export default function OurService() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 80%', 'end 30%'],
  });

  const decorY1 = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);
  const decorY2 = useTransform(scrollYProgress, [0, 1], ['10%', '-20%']);
  const decorRotate = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section id="services" ref={sectionRef} className="our-svc">
      <div className="our-svc__bg" aria-hidden="true" />
      <motion.div className="our-svc__decor our-svc__decor--a" style={{ y: decorY1, rotate: decorRotate }} aria-hidden="true">
        <svg viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(196,92,62,0.18)" strokeWidth="1" />
          <circle cx="100" cy="100" r="56" fill="none" stroke="rgba(196,92,62,0.14)" strokeWidth="1" />
          <circle cx="100" cy="100" r="32" fill="none" stroke="rgba(196,92,62,0.1)" strokeWidth="1" />
        </svg>
      </motion.div>
      <motion.div className="our-svc__decor our-svc__decor--b" style={{ y: decorY2 }} aria-hidden="true">
        <svg viewBox="0 0 100 100">
          <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
          <line x1="50" y1="0" x2="50" y2="100" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
          <circle cx="50" cy="50" r="4" fill="#c45c3e" />
        </svg>
      </motion.div>

      <Reveal>
        <p className="our-svc__eyebrow">
          <i />
          Our Service
        </p>
      </Reveal>

      <h2 className="our-svc__heading" aria-label="Powering property success from first sketch to final signature">
        <SplitWords
          text="Powering property success from"
          delayStart={0}
        />
        <span className="our-svc__heading-break"> </span>
        <SplitWords text="first sketch" highlight delayStart={0.32} />
        <span className="our-svc__heading-break"> to </span>
        <SplitWords text="final signature" highlight delayStart={0.5} />
        <SplitWords text="." delayStart={0.66} />
      </h2>

      <div className="our-svc__timeline">
        <TimelineProgress progress={scrollYProgress} />
        {STEPS.map((step, i) => (
          <TimelineStep
            key={step.num}
            step={step}
            index={i}
            total={STEPS.length}
            progress={scrollYProgress}
          />
        ))}
      </div>

      <PitchCard />
    </section>
  );
}

function SplitWords({
  text,
  highlight = false,
  delayStart = 0,
}: {
  text: string;
  highlight?: boolean;
  delayStart?: number;
}) {
  const words = text.split(' ');
  return (
    <span className={`split-words ${highlight ? 'split-words--hl' : ''}`}>
      {words.map((w, i) => (
        <span key={`${w}-${i}`} className="split-words__mask">
          <motion.span
            className="split-words__word"
            initial={{ y: '110%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{
              duration: 0.7,
              delay: delayStart + i * 0.06,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function TimelineProgress({ progress }: { progress: MotionValue<number> }) {
  const scaleY = useTransform(progress, [0.05, 0.95], [0, 1]);
  return (
    <div className="our-svc__progress" aria-hidden="true">
      <motion.div className="our-svc__progress-fill" style={{ scaleY, originY: 0 }} />
    </div>
  );
}

function TimelineStep({
  step,
  index,
  total,
  progress,
}: {
  step: Step;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = 0.1 + (index / total) * 0.7;
  const end = start + 0.2;
  const nodeScale = useTransform(progress, [start, end], [0.6, 1]);
  const nodeOpacity = useTransform(progress, [start, end], [0.3, 1]);
  const lineScale = useTransform(progress, [start + 0.05, end + 0.1], [0, 1]);

  return (
    <motion.article
      className="our-svc__step"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: 0.1 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div className="our-svc__node" style={{ scale: nodeScale, opacity: nodeOpacity }}>
        <span className="our-svc__node-num">{step.num}</span>
        <div className="our-svc__node-icon">{step.icon}</div>
      </motion.div>

      {index < total - 1 && (
        <motion.div
          className="our-svc__connector"
          aria-hidden="true"
          style={{ scaleY: lineScale, originY: 0 }}
        />
      )}

      <div className="our-svc__step-body">
        <p className="our-svc__step-title">{step.title}</p>
        <p className="our-svc__step-text">{step.body}</p>
      </div>
    </motion.article>
  );
}

function PitchCard() {
  return (
    <motion.div
      className="our-svc__pitch"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="our-svc__pitch-glow"
        aria-hidden="true"
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="our-svc__pitch-content">
        <p className="our-svc__pitch-q">
          Ready to elevate your portfolio or boost your pipeline?
        </p>
        <p className="our-svc__pitch-a">
          Let’s make it happen — <em>faster, smoother, smarter.</em>
        </p>
        <motion.a
          href="#contact"
          className="our-svc__pitch-cta"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.18 }}
        >
          Start a Project
          <motion.span
            aria-hidden="true"
            animate={{ x: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            →
          </motion.span>
        </motion.a>
      </div>
    </motion.div>
  );
}

function IconSketch() {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.path
        d="M6 26 L6 6 L18 6 L26 14 L26 26 Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: 'easeInOut' }}
      />
      <motion.path
        d="M18 6 L18 14 L26 14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.6 }}
      />
      <motion.path
        d="M10 17 L20 17 M10 21 L18 21"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 1.0 }}
      />
    </svg>
  );
}

function IconKey() {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.circle
        cx="11"
        cy="16"
        r="5"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.0, ease: 'easeInOut' }}
      />
      <motion.path
        d="M16 16 L28 16 L28 20 L24 20 L24 22 L20 22 L20 20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
      />
      <motion.circle
        cx="11"
        cy="16"
        r="1.4"
        fill="currentColor"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 1.1 }}
      />
    </svg>
  );
}

function IconFlow() {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.circle
        cx="7"
        cy="8"
        r="3"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.0 }}
      />
      <motion.circle
        cx="25"
        cy="16"
        r="3"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.4 }}
      />
      <motion.circle
        cx="7"
        cy="24"
        r="3"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.8 }}
      />
      <motion.path
        d="M10 8 L22 16 M10 24 L22 16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 1.0 }}
      />
    </svg>
  );
}
