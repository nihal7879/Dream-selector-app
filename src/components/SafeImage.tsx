import { useState } from 'react';

type Props = {
  src: string;
  alt?: string;
  className?: string;
  fallback?: string;
  style?: React.CSSProperties;
};

export default function SafeImage({ src, alt = '', className = '', fallback = '#1a1a1a', style }: Props) {
  const [ok, setOk] = useState(true);

  return (
    <div
      className={`safe-img ${className}`}
      style={{
        ...style,
        background: ok ? undefined : fallback,
      }}
    >
      {ok && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setOk(false)}
        />
      )}
    </div>
  );
}
