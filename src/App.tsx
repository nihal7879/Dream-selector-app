import { motion } from 'framer-motion';
import HeroSlideshow from './components/HeroSlideshow';
import Navbar from './components/Navbar';
import Reveal from './components/Reveal';
import SafeImage from './components/SafeImage';
import Scene, { ParallaxLayer } from './components/Scene';
import CinematicServices from './components/CinematicServices';
import AboutInteractive from './components/AboutInteractive';
import { IMAGES } from './lib/images';

function SplitHeading({ text }: { text: string }) {
  const words = text.split(' ');
  return (
    <span className="split-heading" aria-label={text}>
      {words.map((w, i) => (
        <span key={`${w}-${i}`} className="split-heading__mask">
          <motion.span
            className="split-heading__word"
            initial={{ y: '110%', opacity: 0 }}
            whileInView={{ y: '0%', opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
              delay: i * 0.08,
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

type Service = {
  title: string;
  desc: string;
  src: string;
  alt: string;
  fallback: string;
};

const SERVICES: Service[] = [
  {
    title: 'Visualize Before You Build.',
    desc:
      'Let clients experience your property before it’s even constructed. With immersive previews, virtual layouts, and smart project navigation, DreamSelector helps developers showcase projects early — boosting buyer confidence and accelerating decisions.',
    ...IMAGES.services[0],
  },
  {
    title: 'Automate. Manage. Grow.',
    desc:
      'From lead capture to lease signing — streamline your sales and rental process with intelligent automation. Our platform handles the details so you can focus on what matters: faster deals, fewer delays, and higher returns.',
    ...IMAGES.services[1],
  },
  {
    title: 'Insights that drive action.',
    desc:
      'Understand what buyers want and when they want it. DreamSelector tracks views, interest, and activity across units, giving you real-time data to refine your sales strategy and boost conversions with confidence.',
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
    tag: 'Partner, Property Development Firm, Oslo',
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
  {
    title: 'Daniel',
    tag: 'Sales Director',
    quote:
      'After implementing DreamSelector’s system, we experienced a significant increase in rental conversion rates. It’s been a game-changer.',
    ...IMAGES.cases[3],
  },
];

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <HeroSlideshow />

      <CinematicServices services={SERVICES} />

      <Scene id="about" variant="cream">
        <AboutInteractive />
      </Scene>

      <Scene id="services" variant="dark">
        <section className="our-service">
          <div className="our-service__bg" aria-hidden="true" />
          <Reveal>
            <p className="panel__eyebrow our-service__eyebrow">Our Service</p>
            <h2 className="our-service__heading">
              Powering property success from <em>first sketch</em> to <em>final signature.</em>
            </h2>
          </Reveal>
          <div className="our-service__grid">
            <ParallaxLayer speed={0.18} className="our-service__col">
              <Reveal delay={0.05}>
                <p>
                  Whether you’re building the future or closing the next big deal, DreamSelector is
                  your all-in-one digital engine for smarter real estate operations.
                </p>
                <p>
                  From concept to keys-in-hand, our platform helps developers and agents stay ahead
                  with tools that accelerate sales, simplify leasing, and automate property
                  management — so you can focus on growth.
                </p>
              </Reveal>
            </ParallaxLayer>
            <ParallaxLayer speed={-0.12} className="our-service__col">
              <Reveal delay={0.12}>
                <p>
                  Designed for deal-makers and vision-builders, DreamSelector streamlines your entire
                  workflow with intuitive features that drive results across every phase of the
                  property lifecycle.
                </p>
                <div className="our-service__pitch">
                  <p className="our-service__pitch-q">
                    Ready to elevate your portfolio or boost your pipeline?
                  </p>
                  <p className="our-service__pitch-a">
                    Let’s make it happen — <em>faster, smoother, smarter.</em>
                  </p>
                </div>
              </Reveal>
            </ParallaxLayer>
          </div>
        </section>
      </Scene>

      <Scene id="cases" variant="cream">
        <section className="panel panel--cases">
          <Reveal>
            <p className="panel__eyebrow panel__eyebrow--light">Client Reviews</p>
            <h2 className="panel__title panel__title--dark">Read reviews from trusted clients.</h2>
          </Reveal>
          <div className="cases-grid cases-grid--reviews cases-grid--four">
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
              Let’s make your next project a success
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
              Whether you’re launching a new development or managing a growing portfolio, DreamSelector
              gives you the tools to move faster, sell smarter, and stay in control. From pre-build
              visualization to final signatures — we’re ready to help you simplify the journey and
              close with confidence.
            </motion.p>
          </Reveal>

          <motion.div
            className="contact-form"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="contact-form__intro">
              <h3 className="contact-form__heading">
                Ready to bring your <em>vision to life?</em>
              </h3>
              <p className="contact-form__sub">
                Request a free quote or explore how we can shape your project together. Get in touch
                today for a complimentary consultation.
              </p>
              <svg
                className="contact-form__arrow"
                viewBox="0 0 200 220"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <motion.path
                  d="M20 30 C 80 30, 140 70, 90 110 C 50 140, 110 160, 160 180"
                  stroke="#c45c3e"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.8, ease: 'easeInOut', delay: 0.4 }}
                />
                <motion.path
                  d="M160 180 L 148 168 M160 180 L 148 192"
                  stroke="#c45c3e"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 2.1 }}
                />
              </svg>
            </div>

            <form
              className="contact-form__fields"
              onSubmit={(e) => {
                e.preventDefault();
                const data = new FormData(e.currentTarget);
                const subject = encodeURIComponent('New enquiry from ' + (data.get('name') || 'website'));
                const body = encodeURIComponent(
                  `Name: ${data.get('name')}\nEmail: ${data.get('email')}\nPhone: ${data.get('phone')}\n\n${data.get('message')}`,
                );
                window.location.href = `mailto:hello@dreamselector.com?subject=${subject}&body=${body}`;
              }}
            >
              <label className="contact-field">
                <input type="text" name="name" required placeholder=" " autoComplete="name" />
                <span>Your Name *</span>
              </label>
              <label className="contact-field">
                <input type="email" name="email" required placeholder=" " autoComplete="email" />
                <span>Email Address *</span>
              </label>
              <label className="contact-field">
                <input type="tel" name="phone" required placeholder=" " autoComplete="tel" />
                <span>Phone Number *</span>
              </label>
              <label className="contact-field contact-field--area">
                <textarea name="message" required placeholder=" " rows={5} />
                <span>How can we help you? *</span>
              </label>
              <motion.button
                type="submit"
                className="contact-form__submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.18 }}
              >
                Send Message
              </motion.button>
              <p className="contact-form__privacy">
                <span aria-hidden="true">🔒</span> Privacy Guaranteed
              </p>
            </form>
          </motion.div>
        </section>
      </Scene>

      <footer className="footer">
        <p>Copyright {new Date().getFullYear()} DreamSelector | All rights reserved.</p>
      </footer>
    </div>
  );
}
