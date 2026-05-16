import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useState } from 'react';

const LINKS = [
  { href: '#what-we-do', label: 'Home' },
  { href: '#about', label: 'Who We Are' },
  { href: '#services', label: 'Our Service' },
  { href: '#cases', label: "Client's Speak" },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [y, setY] = useState(0);

  useMotionValueEvent(scrollY, 'change', (latest) => setY(latest));

  const vh = typeof window !== 'undefined' ? window.innerHeight : 900;
  const glass = y > 40 && y < vh * 0.85;
  const solid = y >= vh * 0.85;

  return (
    <motion.header
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
      <motion.a href="#" className="nav__logo" whileHover={{ opacity: 0.9 }} transition={{ duration: 0.15 }}>
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
        {LINKS.map((link, i) => (
          <motion.a
            key={link.href}
            href={link.href}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 * i }}
            whileHover={{ y: -2 }}
          >
            {link.label}
          </motion.a>
        ))}
        <button type="button" className="nav__more hide-mobile" aria-label="More">
          ···
        </button>
        <motion.a
          href="#contact"
          className="nav__cta"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.15 }}
        >
          Connect Today →
        </motion.a>
      </nav>

      <a href="#contact" className="nav__cta-mobile">
        Connect
      </a>
    </motion.header>
  );
}
