import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useEffect, useState } from 'react';

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
  const [y, setY] = useState(0);
  const [active, setActive] = useState<string>('home');

  useMotionValueEvent(scrollY, 'change', (latest) => setY(latest));

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

  const vh = typeof window !== 'undefined' ? window.innerHeight : 900;
  const glass = y > 40 && y < vh * 0.85;
  const solid = y >= vh * 0.85;

  return (
    <motion.header
      id="home"
      className={`nav ${glass ? 'nav--glass' : ''} ${solid ? 'nav--solid' : ''} ${y <= 40 ? 'nav--top' : ''}`}
      initial={false}
      animate={{
        backgroundColor: solid ? 'rgba(0,0,0,1)' : glass ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0)',
        backdropFilter: glass ? 'blur(20px) saturate(180%)' : 'none',
        WebkitBackdropFilter: glass ? 'blur(20px) saturate(180%)' : 'none',
        borderBottomWidth: glass || solid ? 1 : 0,
        borderBottomColor: glass ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0)',
        boxShadow: solid ? '0 8px 32px rgba(0,0,0,0.4)' : 'none',
      }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.a href="#home" className="nav__logo" whileHover={{ opacity: 0.9 }} transition={{ duration: 0.15 }}>
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

      <a href="#contact" className="nav__cta-mobile">
        Connect
      </a>
    </motion.header>
  );
}
