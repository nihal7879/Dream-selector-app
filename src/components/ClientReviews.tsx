import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Reveal from './Reveal';
import SafeImage from './SafeImage';

type Review = {
  name: string;
  role: string;
  quote: string;
  src: string;
  alt: string;
  fallback: string;
};

type Props = {
  reviews: Review[];
};

const STATS = [
  { value: '4.9', suffix: '/5', label: 'Average rating' },
  { value: '200', suffix: '+', label: 'Happy clients' },
  { value: '98', suffix: '%', label: 'Would recommend' },
  { value: '24', suffix: 'h', label: 'Response time' },
];

export default function ClientReviews({ reviews }: Props) {
  return (
    <section id="cases" className="reviews">
      <div className="reviews__bg" aria-hidden="true" />
      <div className="reviews__quote-bg" aria-hidden="true">“</div>

      <Reveal>
        <p className="reviews__eyebrow">
          <i />
          Client Reviews
        </p>
      </Reveal>

      <Reveal delay={0.05}>
        <h2 className="reviews__heading">
          Read reviews from <em>trusted clients.</em>
        </h2>
      </Reveal>

      <Reveal delay={0.12}>
        <div className="reviews__stats" role="list">
          {STATS.map((s) => (
            <div key={s.label} className="reviews__stat" role="listitem">
              <span className="reviews__stat-value">
                {s.value}
                <em>{s.suffix}</em>
              </span>
              <span className="reviews__stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </Reveal>

      <div className="reviews__grid">
        {reviews.map((r, i) => (
          <ReviewCard key={r.name} review={r} index={i} />
        ))}
      </div>
    </section>
  );
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 90, damping: 20 });
  const sy = useSpring(my, { stiffness: 90, damping: 20 });

  const rotateX = useTransform(sy, [0, 1], [4, -4]);
  const rotateY = useTransform(sx, [0, 1], [-4, 4]);
  const glowX = useTransform(sx, (v) => v * 100);
  const glowY = useTransform(sy, (v) => v * 100);
  const glowBg = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, rgba(196, 92, 62, 0.35), transparent 60%)`;

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
    <Reveal delay={0.15 + index * 0.07}>
      <motion.article
        ref={ref}
        className="review"
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY, transformPerspective: 1100 }}
        whileHover={{ y: -10 }}
        transition={{ y: { duration: 0.32, ease: [0.16, 1, 0.3, 1] } }}
      >
        <motion.div className="review__glow" style={{ background: glowBg }} aria-hidden="true" />
        <span className="review__big-quote" aria-hidden="true">"</span>

        <div className="review__stars" aria-label="5 star rating">
          {[0, 1, 2, 3, 4].map((s) => (
            <motion.span
              key={s}
              className="review__star"
              initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.45,
                delay: 0.25 + index * 0.07 + s * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              ★
            </motion.span>
          ))}
        </div>

        <p className="review__body">{review.quote}</p>

        <div className="review__author">
          <div className="review__avatar">
            <span className="review__avatar-ring" aria-hidden="true" />
            <SafeImage src={review.src} alt={review.alt} fallback={review.fallback} />
          </div>
          <div className="review__id">
            <h3 className="review__name">{review.name}</h3>
            <p className="review__role">{review.role}</p>
          </div>
        </div>

        <span className="review__accent" aria-hidden="true" />
      </motion.article>
    </Reveal>
  );
}
