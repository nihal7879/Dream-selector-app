/** Unsplash real-estate imagery + gradient fallbacks */

const u = (id: string, w = 2400, h = 1350) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=85`;

export const IMAGES = {
  hero: [
    {
      label: 'Urban masterplan · Aerial',
      src: u('1486406146926-c627a92ad1ab'),
      fallback: 'linear-gradient(165deg,#1a2838 0%,#2d4a5e 45%,#1e3344 100%)',
    },
    {
      label: 'Residential development · Facade',
      src: u('1545324418-cc1a3fa10c00'),
      fallback: 'linear-gradient(145deg,#3d2418 0%,#8b4a32 50%,#5c3020 100%)',
    },
    {
      label: 'Luxury showroom · Interior',
      src: u('1618221195710-dd6b41faaea6', 2400, 1350),
      fallback: 'linear-gradient(160deg,#0a0a0c 0%,#1a1a1e 55%,#080808 100%)',
    },
  ],
  gallery: [
    { src: u('1600596542815-ffad4c1539a9', 900, 1200), alt: 'Modern villa exterior', fallback: '#3d4a52' },
    { src: u('1600607687939-ce8a6c25118c', 900, 1200), alt: 'Contemporary living space', fallback: '#4a4540' },
    { src: u('1503387762-592deb58ef6e', 900, 1200), alt: 'Construction development', fallback: '#5a5a50' },
    { src: u('1600210492486-724fe5c67fb0', 900, 1200), alt: 'Staged property interior', fallback: '#e0d8d0' },
  ],
  services: [
    {
      src: u('1564540583246-934409427776', 2400, 1500),
      alt: 'Architect drafting plans',
      fallback: 'linear-gradient(160deg,#1a2838 0%,#3d5a6e 50%,#1e3344 100%)',
    },
    {
      src: u('1551836022-d5d88e9218df', 2400, 1500),
      alt: 'Modern automated workspace',
      fallback: 'linear-gradient(160deg,#2c1f18 0%,#7a4a32 50%,#3d2418 100%)',
    },
    {
      src: u('1486325212027-8081e485255e', 2400, 1500),
      alt: 'City skyline insights',
      fallback: 'linear-gradient(160deg,#0d1218 0%,#2a3344 55%,#0a0e14 100%)',
    },
  ],
  cases: [
    {
      src: u('1500648767791-00dcc994a43e', 400, 400),
      alt: 'Saul Goodman portrait',
      fallback: 'linear-gradient(180deg,#2a3d4a,#4a6270)',
    },
    {
      src: u('1494790108377-be9c29b29330', 400, 400),
      alt: 'Rebecca William portrait',
      fallback: 'linear-gradient(180deg,#4a3028,#7a5040)',
    },
    {
      src: u('1507003211169-0a1dd7228f2d', 400, 400),
      alt: 'Matt Brandon portrait',
      fallback: 'linear-gradient(180deg,#1a1c22,#3a3e48)',
    },
    {
      src: u('1531427186611-ecfd6d936c79', 400, 400),
      alt: 'Daniel portrait',
      fallback: 'linear-gradient(180deg,#2c2f3a,#4a4f60)',
    },
  ],
  about: {
    src: u('1600607687644-c7171b42498f', 1200, 900),
    alt: 'Premium property interior',
    fallback: 'linear-gradient(145deg,#e8e0d8,#d4ccc4)',
  },
} as const;

export function preloadImages(urls: string[]) {
  urls.forEach((src) => {
    const img = new Image();
    img.referrerPolicy = 'no-referrer';
    img.src = src;
  });
}
