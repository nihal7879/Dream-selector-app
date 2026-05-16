import { useState } from 'react';

type Props = {
  src: string;
  alt?: string;
  className?: string;
  fallback?: string;
  style?: React.CSSProperties;
  priority?: boolean;
};

export default function SafeImage({
  src,
  alt = '',
  className = '',
  fallback = '#1a1a1a',
  style,
  priority = false,
}: Props) {
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
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          referrerPolicy="no-referrer"
          onError={() => setOk(false)}
        />
      )}
    </div>
  );
}
