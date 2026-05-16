import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useRef } from 'react';
import SafeImage from './SafeImage';

type Service = {
  title: string;
  desc: string;
  src: string;
  alt: string;
  fallback: string;
};

type Props = {
  services: Service[];
};

export default function CinematicServices({ services }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const total = services.length;
  const sectionHeight = `${total * 110}vh`;

  return (
    <section
      ref={sectionRef}
      id="what-we-do"
      className="cinema"
      style={{ height: sectionHeight }}
    >
      <div className="cinema__sticky">
        <div className="cinema__bg-stack" aria-hidden="true">
          {services.map((s, i) => (
            <ChapterBg key={s.title} service={s} index={i} total={total} progress={scrollYProgress} />
          ))}
        </div>

        <div className="cinema__overlay" aria-hidden="true" />

        <FloatingShapes progress={scrollYProgress} />

        <div className="cinema__head">
          <p className="cinema__eyebrow">
            <i />
            What we do
          </p>
          <ChapterCounter progress={scrollYProgress} total={total} />
        </div>

        <div className="cinema__text-stack">
          {services.map((s, i) => (
            <ChapterText key={s.title} service={s} index={i} total={total} progress={scrollYProgress} />
          ))}
        </div>

        <ChapterRail progress={scrollYProgress} total={total} services={services} />
      </div>
    </section>
  );
}

function ChapterBg({
  service,
  index,
  total,
  progress,
}: {
  service: Service;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const fadeIn = 0.06;

  const opacity = useTransform(
    progress,
    [Math.max(0, start - fadeIn), start, end - fadeIn, Math.min(1, end + fadeIn)],
    [index === 0 ? 1 : 0, 1, 1, index === total - 1 ? 1 : 0],
  );
  const scale = useTransform(progress, [start - 0.1, end + 0.1], [1.18, 1.02]);
  const x = useTransform(progress, [start, end], ['2%', '-2%']);

  return (
    <motion.div className="cinema__bg" style={{ opacity, scale, x }}>
      <SafeImage src={service.src} alt={service.alt} fallback={service.fallback} className="cinema__bg-img" />
    </motion.div>
  );
}

function ChapterText({
  service,
  index,
  total,
  progress,
}: {
  service: Service;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const span = end - start;
  const peakStart = start + span * 0.22;
  const peakEnd = start + span * 0.78;

  // Container only handles the exit fade so individual words/blocks can stagger in
  const containerOpacity = useTransform(progress, [start, peakStart, peakEnd, end], [0, 1, 1, 0]);

  const descOpacity = useTransform(progress, [start + span * 0.55, start + span * 0.7, peakEnd, end], [0, 1, 1, 0]);
  const descY = useTransform(progress, [start + span * 0.55, start + span * 0.7], [24, 0]);

  const ctaOpacity = useTransform(progress, [start + span * 0.68, start + span * 0.78, peakEnd, end], [0, 1, 1, 0]);
  const ctaY = useTransform(progress, [start + span * 0.68, start + span * 0.78], [20, 0]);

  const tokens = service.title.split(/(\s+)/);
  const wordIndexes: number[] = [];
  tokens.forEach((tok, i) => {
    if (tok.trim().length > 0) wordIndexes.push(i);
  });
  const totalWords = wordIndexes.length;

  // Words reveal between start..peakStart with stagger
  const revealStart = start + span * 0.1;
  const revealEnd = start + span * 0.55;
  const revealSpan = revealEnd - revealStart;

  return (
    <motion.div className="cinema__text" style={{ opacity: containerOpacity }}>
      <h3 className="cinema__title">
        {tokens.map((tok, i) => {
          if (tok.trim().length === 0) {
            return (
              <span key={i} className="cinema__title-space">
                {tok}
              </span>
            );
          }
          const wordOrder = wordIndexes.indexOf(i);
          const wordStart = revealStart + (revealSpan * 0.55 * wordOrder) / Math.max(totalWords, 1);
          const wordEnd = wordStart + revealSpan * 0.45;
          return (
            <ChapterWord
              key={i}
              word={tok}
              wordStart={wordStart}
              wordEnd={wordEnd}
              fadeStart={peakEnd}
              fadeEnd={end}
              progress={progress}
            />
          );
        })}
      </h3>
      <motion.p className="cinema__desc" style={{ opacity: descOpacity, y: descY }}>
        {service.desc}
      </motion.p>
      <motion.a
        className="cinema__cta"
        href="#contact"
        style={{ opacity: ctaOpacity, y: ctaY }}
      >
        Read More <span aria-hidden="true">→</span>
      </motion.a>
    </motion.div>
  );
}

function ChapterWord({
  word,
  wordStart,
  wordEnd,
  fadeStart,
  fadeEnd,
  progress,
}: {
  word: string;
  wordStart: number;
  wordEnd: number;
  fadeStart: number;
  fadeEnd: number;
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, [wordStart, wordEnd, fadeStart, fadeEnd], [0, 1, 1, 0]);
  const y = useTransform(progress, [wordStart, wordEnd, fadeStart, fadeEnd], ['115%', '0%', '0%', '-40%']);

  return (
    <span className="cinema__word-mask">
      <motion.span className="cinema__word" style={{ opacity, y }}>
        {word}
      </motion.span>
    </span>
  );
}

function ChapterCounter({ progress, total }: { progress: MotionValue<number>; total: number }) {
  const current = useTransform(progress, (p) => {
    const idx = Math.min(total - 1, Math.floor(p * total));
    return String(idx + 1).padStart(2, '0');
  });
  return (
    <div className="cinema__counter">
      <motion.span>{current}</motion.span>
      <i />
      <span>{String(total).padStart(2, '0')}</span>
    </div>
  );
}

function ChapterRail({
  progress,
  total,
  services,
}: {
  progress: MotionValue<number>;
  total: number;
  services: Service[];
}) {
  return (
    <div className="cinema__rail" aria-hidden="true">
      {services.map((s, i) => {
        const start = i / total;
        const end = (i + 1) / total;
        return <RailDot key={s.title} index={i} start={start} end={end} progress={progress} label={s.title} />;
      })}
    </div>
  );
}

function RailDot({
  index,
  start,
  end,
  progress,
  label,
}: {
  index: number;
  start: number;
  end: number;
  progress: MotionValue<number>;
  label: string;
}) {
  const fill = useTransform(progress, [start, end], ['0%', '100%']);
  const opacity = useTransform(progress, [start - 0.05, start, end, end + 0.05], [0.4, 1, 1, 0.4]);
  return (
    <motion.div className="cinema__rail-item" style={{ opacity }}>
      <span className="cinema__rail-num">{String(index + 1).padStart(2, '0')}</span>
      <div className="cinema__rail-bar">
        <motion.div className="cinema__rail-fill" style={{ height: fill }} />
      </div>
      <span className="cinema__rail-label">{label.replace(/[.]$/, '')}</span>
    </motion.div>
  );
}

function FloatingShapes({ progress }: { progress: MotionValue<number> }) {
  const y1 = useTransform(progress, [0, 1], ['0%', '-40%']);
  const y2 = useTransform(progress, [0, 1], ['0%', '60%']);
  const y3 = useTransform(progress, [0, 1], ['0%', '-25%']);
  const rotate1 = useTransform(progress, [0, 1], [0, 90]);
  const rotate2 = useTransform(progress, [0, 1], [0, -120]);

  return (
    <div className="cinema__shapes" aria-hidden="true">
      <motion.span className="cinema__shape cinema__shape--ring" style={{ y: y1, rotate: rotate1 }} />
      <motion.span className="cinema__shape cinema__shape--line" style={{ y: y2 }} />
      <motion.span className="cinema__shape cinema__shape--dot" style={{ y: y3, rotate: rotate2 }} />
      <motion.span className="cinema__shape cinema__shape--cross" style={{ y: y2, rotate: rotate1 }} />
    </div>
  );
}
