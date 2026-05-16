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
      src: u('1600585154340-be6161a56a0c', 1400, 900),
      alt: '3D property visualization',
      fallback: 'linear-gradient(160deg,#1e2a36,#3d5a6e)',
    },
    {
      src: u('1560518883-ce09059eeffa', 1400, 900),
      alt: 'Real estate sales',
      fallback: 'linear-gradient(160deg,#2a2218,#5c4030)',
    },
    {
      src: u('1497366216548-37526070297c', 1400, 900),
      alt: 'Developer office',
      fallback: 'linear-gradient(160deg,#12141a,#2a2e38)',
    },
  ],
  cases: [
    {
      src: u('1512917774080-9991f1c4c750', 1400, 1750),
      alt: 'Harbor waterfront residences',
      fallback: 'linear-gradient(180deg,#2a3d4a,#4a6270)',
    },
    {
      src: u('1460317793731-4ccef5a2915c', 1400, 1750),
      alt: 'Brickline apartment quarter',
      fallback: 'linear-gradient(180deg,#4a3028,#7a5040)',
    },
    {
      src: u('1600566753190-17f0baa2a6c3', 1400, 1750),
      alt: 'Skyline terrace homes',
      fallback: 'linear-gradient(180deg,#1a1c22,#3a3e48)',
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
