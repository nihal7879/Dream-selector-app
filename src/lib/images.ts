/** Local image assets (under /public/images) with gradient fallbacks. */

export const IMAGES = {
  hero: [
    {
      label: 'Urban masterplan · Aerial',
      src: '/images/hero-1.jpg',
      fallback: 'linear-gradient(165deg,#1a2838 0%,#2d4a5e 45%,#1e3344 100%)',
    },
    {
      label: 'Residential development · Facade',
      src: '/images/hero-2.jpg',
      fallback: 'linear-gradient(145deg,#3d2418 0%,#8b4a32 50%,#5c3020 100%)',
    },
    {
      label: 'Luxury showroom · Interior',
      src: '/images/hero-3.jpg',
      fallback: 'linear-gradient(160deg,#0a0a0c 0%,#1a1a1e 55%,#080808 100%)',
    },
  ],
  services: [
    {
      src: '/images/service-1.jpg',
      alt: 'Architect drafting plans',
      fallback: 'linear-gradient(160deg,#1a2838 0%,#3d5a6e 50%,#1e3344 100%)',
    },
    {
      src: '/images/service-2.jpg',
      alt: 'Modern automated workspace',
      fallback: 'linear-gradient(160deg,#2c1f18 0%,#7a4a32 50%,#3d2418 100%)',
    },
    {
      src: '/images/service-3.jpg',
      alt: 'City skyline insights',
      fallback: 'linear-gradient(160deg,#0d1218 0%,#2a3344 55%,#0a0e14 100%)',
    },
  ],
  cases: [
    {
      src: '/images/review-1.jpg',
      alt: 'Saul Goodman portrait',
      fallback: 'linear-gradient(180deg,#2a3d4a,#4a6270)',
    },
    {
      src: '/images/review-2.jpg',
      alt: 'Rebecca William portrait',
      fallback: 'linear-gradient(180deg,#4a3028,#7a5040)',
    },
    {
      src: '/images/review-3.jpg',
      alt: 'Matt Brandon portrait',
      fallback: 'linear-gradient(180deg,#1a1c22,#3a3e48)',
    },
    {
      src: '/images/review-4.jpg',
      alt: 'Daniel portrait',
      fallback: 'linear-gradient(180deg,#2c2f3a,#4a4f60)',
    },
  ],
  about: {
    src: '/images/about.jpg',
    alt: 'Premium property interior',
    fallback: 'linear-gradient(145deg,#e8e0d8,#d4ccc4)',
  },
} as const;

export function preloadImages(urls: string[]) {
  urls.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}
