import React, { useState } from 'react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  priority?: boolean; // If true, loading="eager" and fetchPriority="high" (for Hero image)
  sizes?: string;
  className?: string;
  fallbackSrc?: string;
}

/**
 * Utility to generate Unsplash srcset for responsive image delivery on mobile and desktop.
 */
function generateSrcSet(url: string): string | undefined {
  if (!url || typeof url !== 'string') return undefined;
  if (url.includes('images.unsplash.com')) {
    try {
      const baseUrl = url.split('?')[0];
      const widths = [320, 480, 640, 800, 1080, 1200, 1600];
      return widths
        .map((w) => `${baseUrl}?q=80&w=${w}&auto=format&fit=crop ${w}w`)
        .join(', ');
    } catch {
      return undefined;
    }
  }
  return undefined;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  priority = false,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  className = '',
  fallbackSrc = 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=600&auto=format&fit=crop',
  srcSet,
  loading,
  decoding = 'async',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const finalSrc = hasError ? fallbackSrc : src;
  const calculatedSrcSet = srcSet || generateSrcSet(finalSrc);

  return (
    <img
      src={finalSrc}
      alt={alt}
      loading={priority ? 'eager' : loading || 'lazy'}
      decoding={decoding}
      fetchPriority={priority ? 'high' : 'auto'}
      srcSet={calculatedSrcSet}
      sizes={sizes}
      referrerPolicy="no-referrer"
      onLoad={() => setIsLoaded(true)}
      onError={() => {
        if (!hasError) setHasError(true);
      }}
      className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-85'} ${className}`}
      {...props}
    />
  );
};
