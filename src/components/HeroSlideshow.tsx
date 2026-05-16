import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { IMAGES, preloadImages } from '../lib/images';
import SafeImage from './SafeImage';

const INTERVAL_MS = 5000;
const FADE_S = 0.7;
const SLIDES = IMAGES.hero;

export default function HeroSlideshow() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });

  const parallaxBackY = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const parallaxMidY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const parallaxFrontY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.42, 0.78]);

  const imgPanX = useTransform(smoothX, [-0.5, 0.5], ['-1.5%', '1.5%']);
  const imgPanY = useTransform(smoothY, [-0.5, 0.5], ['-1%', '1%']);

  useEffect(() => {
    preloadImages(SLIDES.map((s) => s.src));
  }, []);

  useEffect(() => {
    setProgress(0);
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      setProgress(Math.min((now - start) / INTERVAL_MS, 1));
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active]);

  useEffect(() => {
    const timer = window.setInterval(() => setActive((p) => (p + 1) % SLIDES.length), INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, []);

  const onMouseMove = (e: React.MouseEvent) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const slide = SLIDES[active];

  return (
    <section
      ref={heroRef}
      className="hero"
      aria-label="Hero slideshow"
      onMouseMove={onMouseMove}
    >
      <motion.div className="hero__parallax-stack" style={{ y: parallaxBackY, scale: bgScale }}>
        <div className="hero__slides">
          <AnimatePresence mode="sync">
            <motion.div
              key={active}
              className="hero__slide"
              initial={{ opacity: 0, scale: 1.08, x: '3%' }}
              animate={{ opacity: 1, scale: 1, x: '0%' }}
              exit={{ opacity: 0, x: '-2%', scale: 1.04 }}
              transition={{ duration: FADE_S, ease: [0.22, 1, 0.36, 1] }}
              style={{ background: slide.fallback }}
            >
              <motion.div className="hero__ken-wrap" style={{ x: imgPanX, y: imgPanY }}>
                <motion.div
                  className="hero__ken-inner"
                  initial={{ scale: 1, x: '0%' }}
                  animate={{ scale: 1.14, x: '-2.5%' }}
                  transition={{ duration: INTERVAL_MS / 1000, ease: 'linear' }}
                >
                  <SafeImage
                    src={slide.src}
                    alt={slide.label}
                    className="hero__ken-img"
                    fallback={slide.fallback}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
        <motion.div className="hero__overlay" style={{ opacity: overlayOpacity }} />
      </motion.div>

      <motion.div className="hero__grain" style={{ y: parallaxMidY }} aria-hidden="true" />

      <motion.div className="hero__progress-track" style={{ y: parallaxFrontY }} aria-hidden="true">
        <motion.div
          className="hero__progress-bar"
          style={{ scaleX: progress, transformOrigin: 'left center' }}
        />
      </motion.div>

      <motion.div className="hero__dots" style={{ y: parallaxFrontY }} role="tablist" aria-label="Slides">
        {SLIDES.map((s, i) => (
          <button
            key={s.label}
            type="button"
            role="tab"
            aria-selected={active === i}
            aria-label={s.label}
            title={s.label}
            className={`hero__dot-btn ${active === i ? 'is-active' : ''}`}
            onClick={() => setActive(i)}
          />
        ))}
      </motion.div>

      <motion.p className="hero__slide-caption" style={{ y: parallaxFrontY, opacity: contentOpacity }}>
        {slide.label}
      </motion.p>

      <motion.div className="hero__content" style={{ y: contentY, opacity: contentOpacity }}>
        <motion.p
          className="hero__eyebrow"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Digital Real Estate Engine
        </motion.p>
        <motion.p
          className="hero__text"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          Your all-in-one digital engine for smarter real estate developers — visualize, manage, and close deals faster than ever.
        </motion.p>
        <motion.a
          href="#contact"
          className="hero__btn"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.22 }}
          whileHover={{ scale: 1.04, backgroundColor: '#fff', color: '#000' }}
          whileTap={{ scale: 0.98 }}
        >
          Free Consultation →
        </motion.a>
      </motion.div>

      <motion.div
        className="hero__scroll-hint"
        style={{ y: parallaxFrontY }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
      >
        Scroll
      </motion.div>
    </section>
  );
}
