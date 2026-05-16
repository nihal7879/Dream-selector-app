import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'Who We Are' },
  { href: '#services', label: 'Our Service' },
  { href: '#cases', label: "Client's Speak" },
  { href: '#contact', label: 'Contact Us' },
];

const SECTION_IDS = LINKS.map((l) => l.href.replace('#', ''));

export default function Navbar() {
  const { scrollY } = useScroll();
  const [navState, setNavState] = useState<{ top: boolean; glass: boolean; solid: boolean }>({
    top: true,
    glass: false,
    solid: false,
  });
  const [active, setActive] = useState<string>('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const lastStateRef = useRef('top');

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const vh = window.innerHeight;
    const next = latest <= 40 ? 'top' : latest < vh * 0.85 ? 'glass' : 'solid';
    if (next === lastStateRef.current) return;
    lastStateRef.current = next;
    setNavState({ top: next === 'top', glass: next === 'glass', solid: next === 'solid' });
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      {
        rootMargin: '-40% 0px -50% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const { top, glass, solid } = navState;

  return (
    <>
      <header
        id="home"
        className={`nav ${glass || menuOpen ? 'nav--glass' : ''} ${solid ? 'nav--solid' : ''} ${
          top && !menuOpen ? 'nav--top' : ''
        }`}
      >
        <motion.a
          href="#home"
          className="nav__logo"
          onClick={closeMenu}
          whileHover={{ opacity: 0.9 }}
          transition={{ duration: 0.15 }}
        >
          <span className="nav__mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 2L29 12L24 28H8L3 12L16 2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
              <path d="M3 12H29M16 2L8 28M16 2L24 28M16 2L16 12M3 12L16 28L29 12" stroke="currentColor" strokeWidth="0.8" opacity="0.55" strokeLinejoin="round" />
              <circle cx="16" cy="12" r="1.6" fill="currentColor" />
            </svg>
          </span>
          <span className="nav__name">
            <span className="nav__name-line">
              Dream<em>Selector</em>
            </span>
            <span className="nav__name-sub">Digital Real Estate Engine</span>
          </span>
        </motion.a>

        <nav className="nav__links">
          {LINKS.map((link, i) => {
            const id = link.href.replace('#', '');
            const isActive = active === id;
            return (
              <motion.a
                key={link.href}
                href={link.href}
                className={`nav__link ${isActive ? 'is-active' : ''}`}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.05 * i }}
                whileHover={{ y: -2 }}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="nav__underline"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
              </motion.a>
            );
          })}
          <motion.a
            href="#contact"
            className="nav__cta"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15 }}
          >
            Connect Today <span aria-hidden="true">→</span>
          </motion.a>
        </nav>

        <button
          type="button"
          className={`nav__burger ${menuOpen ? 'is-open' : ''}`}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="nav-mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.nav
              className="nav-mobile__panel"
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            >
              <ul className="nav-mobile__list">
                {LINKS.map((link, i) => {
                  const id = link.href.replace('#', '');
                  const isActive = active === id;
                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.3, delay: 0.05 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <a
                        href={link.href}
                        className={`nav-mobile__link ${isActive ? 'is-active' : ''}`}
                        onClick={closeMenu}
                      >
                        <span className="nav-mobile__num">0{i + 1}</span>
                        <span className="nav-mobile__label">{link.label}</span>
                        <span className="nav-mobile__arrow" aria-hidden="true">
                          →
                        </span>
                      </a>
                    </motion.li>
                  );
                })}
              </ul>
              <motion.div
                className="nav-mobile__footer"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <a href="#contact" className="nav-mobile__cta" onClick={closeMenu}>
                  Connect Today
                  <span aria-hidden="true">→</span>
                </a>
                <p className="nav-mobile__meta">hello@dreamselector.com</p>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
