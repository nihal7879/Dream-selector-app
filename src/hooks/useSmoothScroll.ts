import Lenis from 'lenis';
import { useEffect } from 'react';

export function useSmoothScroll() {
  useEffect(() => {
    document.documentElement.classList.add('lenis', 'lenis-smooth');

    // Always start fresh at the top on reload — disable browser auto scroll restore
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.6,
      lerp: 0.08,
    });
    lenis.scrollTo(0, { immediate: true });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!target || !(target instanceof HTMLAnchorElement)) return;
      const id = target.getAttribute('href');
      if (!id || id === '#') return;
      e.preventDefault();
      if (id === '#home' || id === '#top') {
        lenis.scrollTo(0, { duration: 1.2 });
        return;
      }
      const el = document.querySelector(id);
      if (!el || !(el instanceof HTMLElement)) return;
      lenis.scrollTo(el, { offset: -90, duration: 1.2 });
    };

    document.addEventListener('click', onClick);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('click', onClick);
      document.documentElement.classList.remove('lenis', 'lenis-smooth');
      lenis.destroy();
    };
  }, []);
}
