import { motion } from 'framer-motion';
import HeroSlideshow from './components/HeroSlideshow';
import VerticalGlassStack from './components/VerticalGlassStack';
import Navbar from './components/Navbar';
import Reveal from './components/Reveal';
import SafeImage from './components/SafeImage';
import Scene, { ParallaxLayer } from './components/Scene';
import { IMAGES } from './lib/images';

const SERVICES = [
  {
    title: 'Visualize Before You Build.',
    desc:
      'Let clients experience your property before it’s even constructed. Immersive previews, virtual layouts, and smart project navigation help developers showcase projects early — boosting buyer confidence and accelerating decisions.',
    ...IMAGES.services[0],
  },
  {
    title: 'Automate. Manage. Grow.',
    desc:
      'From lead capture to lease signing — streamline your sales and rental operations with intelligent automation. Our platform handles the details so you can focus on what matters: faster deals, fewer delays, higher returns.',
    ...IMAGES.services[1],
  },
  {
    title: 'Insights that drive action.',
    desc:
      'Understand what buyers want and when they want it. DreamSelector tracks views, interest, and activity across units — real-time data to refine your sales strategy and boost conversions with confidence.',
    ...IMAGES.services[2],
  },
];

const CASES = [
  {
    title: 'Saul Goodman',
    tag: 'Operations Manager',
    quote:
      'We were managing a complex property portfolio and needed a flexible system. DreamSelector delivered a tailored solution that saved us time and significantly boosted our efficiency.',
    ...IMAGES.cases[0],
  },
  {
    title: 'Rebecca William',
    tag: 'Partner · Property Development, Oslo',
    quote:
      'DreamSelector understood our needs from the very first meeting. With their user-friendly platform, we’ve made the entire sales process much more transparent — both for us and our clients.',
    ...IMAGES.cases[1],
  },
  {
    title: 'Matt Brandon',
    tag: 'IT Manager',
    quote:
      'The support team at DreamSelector is truly exceptional. Fast, competent, and genuinely invested in our success. It feels like a partnership, not just a product.',
    ...IMAGES.cases[2],
  },
];

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <HeroSlideshow />

      <VerticalGlassStack />

      <Scene id="what-we-do" variant="cream">
        <section className="split">
          <ParallaxLayer speed={0.25}>
            <Reveal>
              <p className="split__label">
                <i />
                Our Service
              </p>
            </Reveal>
          </ParallaxLayer>
          <ParallaxLayer speed={-0.2}>
            <Reveal delay={0.08}>
              <p className="split__body">
                Powering property success from first sketch to final signature — DreamSelector is your
                all-in-one digital engine for smarter real estate operations.
              </p>
            </Reveal>
          </ParallaxLayer>
        </section>
      </Scene>

      <Scene variant="dark" className="gallery-scene">
        <section className="gallery">
          <Reveal className="gallery__header">
            <h2>Built environments</h2>
            <p>Spaces we help bring to market — from concept to keys-in-hand.</p>
          </Reveal>
          <div className="gallery__grid">
            {IMAGES.gallery.map((item, i) => {
              const speed = [0.55, -0.35, 0.4, -0.5][i % 4];
              const liftClass = i % 2 === 0 ? 'gallery__lift gallery__lift--up' : 'gallery__lift gallery__lift--down';
              return (
                <Reveal key={item.src} delay={i * 0.05}>
                  <ParallaxLayer speed={speed} className="gallery__parallax">
                    <div className={liftClass}>
                      <motion.div
                        className="gallery__cell"
                        whileHover={{ scale: 1.04, rotate: i % 2 === 0 ? -0.6 : 0.6 }}
                        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <motion.div
                          className="gallery__zoom"
                          whileHover={{ scale: 1.08 }}
                          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <SafeImage
                            src={item.src}
                            alt={item.alt}
                            className="gallery__img"
                            fallback={item.fallback}
                          />
                        </motion.div>
                      </motion.div>
                    </div>
                  </ParallaxLayer>
                </Reveal>
              );
            })}
          </div>
        </section>
      </Scene>

      <Scene id="services" variant="dark">
        <section className="panel panel--dark">
          <Reveal>
            <p className="panel__eyebrow">What we do</p>
            <h2 className="panel__title">Tools that move every phase of the property lifecycle.</h2>
          </Reveal>
          <div className="service-grid">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.07}>
                <motion.article
                  className="service-card"
                  whileHover={{ y: -12 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                >
                  <SafeImage src={s.src} alt={s.title} className="service-card__bg" fallback={s.fallback} />
                  <motion.div
                    className="service-card__shine"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '120%' }}
                    transition={{ duration: 0.45 }}
                  />
                  <div className="service-card__inner">
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                    <span className="service-card__link">Explore →</span>
                  </div>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </section>
      </Scene>

      <Scene id="about" variant="cream">
        <section className="panel panel--cream about">
          <ParallaxLayer speed={0.3} className="about__visual">
            <SafeImage
              src={IMAGES.about.src}
              alt={IMAGES.about.alt}
              className="about__img"
              fallback={IMAGES.about.fallback}
            />
          </ParallaxLayer>
          <Reveal className="about__copy">
            <p className="about__eyebrow">Who we are</p>
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
              international team, we deliver tailor-made solutions that meet the unique needs of each
              project — enhancing efficiency, visibility, and success in a competitive market.
            </p>
          </Reveal>
        </section>
      </Scene>

      <Scene id="cases" variant="cream">
        <section className="panel panel--cases">
          <Reveal>
            <p className="panel__eyebrow panel__eyebrow--light">Client Reviews</p>
            <h2 className="panel__title">Read reviews from trusted clients.</h2>
          </Reveal>
          <div className="cases-grid cases-grid--reviews">
            {CASES.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.06}>
                <motion.article
                  className="review-card"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="review-card__quote" aria-hidden="true">“</span>
                  <p className="review-card__body">{c.quote}</p>
                  <div className="review-card__person">
                    <div className="review-card__avatar">
                      <SafeImage src={c.src} alt={c.title} fallback={c.fallback} />
                    </div>
                    <div>
                      <h3>{c.title}</h3>
                      <p>{c.tag}</p>
                      <div className="review-card__stars" aria-label="5 star rating">
                        ★★★★★
                      </div>
                    </div>
                  </div>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </section>
      </Scene>

      <Scene id="contact" variant="dark">
        <section className="contact">
          <div className="contact__orbs" aria-hidden="true">
            <motion.span
              className="contact__orb contact__orb--a"
              animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
              transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.span
              className="contact__orb contact__orb--b"
              animate={{ x: [0, -50, 30, 0], y: [0, 40, -20, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.span
              className="contact__orb contact__orb--c"
              animate={{ x: [0, 30, -40, 0], y: [0, -20, 30, 0] }}
              transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
          <div className="contact__grid" aria-hidden="true" />
          <Reveal className="contact__inner">
            <motion.p
              className="contact__eyebrow"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <i />
              Let's make your next project a success
              <i />
            </motion.p>
            <motion.h2
              className="contact__heading"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            >
              Together, we power <em>smarter property deals.</em>
            </motion.h2>
            <motion.p
              className="contact__sub"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              Whether you're launching a new development or managing a growing portfolio, DreamSelector
              gives you the tools to move faster, sell smarter, and stay in control. From pre-build
              visualization to final signatures — we're ready to help you simplify the journey and close
              with confidence.
            </motion.p>
            <motion.div
              className="contact__actions"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              <motion.a
                href="mailto:hello@dreamselector.com"
                className="contact__btn"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.18 }}
              >
                <span>Send Message</span>
                <b>→</b>
              </motion.a>
              <a href="mailto:hello@dreamselector.com" className="contact__mail">
                hello@dreamselector.com
              </a>
            </motion.div>
          </Reveal>
        </section>
      </Scene>
    </div>
  );
}
