import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface OptimizedProductImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export const OptimizedProductImage = ({
  src,
  alt,
  className = '',
  priority = false,
}: OptimizedProductImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // Handle different image source types
  let imageSrc = src;
  
  // If it's a local public path, use as-is
  if (src?.startsWith('/products/') || src?.startsWith('/public/')) {
    imageSrc = src;
  }
  // If it's already a full URL (Supabase storage), use as-is
  else if (src?.startsWith('http://') || src?.startsWith('https://') || src?.startsWith('//')) {
    imageSrc = src;
  }
  // If it's a placeholder, use as-is
  else if (src?.startsWith('/placeholder') || src?.includes('placeholder')) {
    imageSrc = src;
  }
  // Otherwise, assume it's a Supabase storage path and needs the public URL
  else if (src && !src.startsWith('/')) {
    imageSrc = src; // Already a storage URL
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && !error && (
        <Skeleton className="absolute inset-0 bg-neutral-800" />
      )}
      <img
        src={imageSrc}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          console.error('Image failed to load:', imageSrc);
          setIsLoading(false);
          setError(true);
        }}
        className={`
          w-full h-full object-cover transition-opacity duration-300
          ${isLoading ? 'opacity-0' : 'opacity-100'}
          ${error ? 'opacity-50' : ''}
        `}
        style={{
          contentVisibility: 'auto',
          willChange: isLoading ? 'opacity' : 'auto',
        }}
      />
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-800">
          <div className="text-center">
            <svg className="w-12 h-12 mx-auto mb-2 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-xs text-white/40">Image unavailable</span>
          </div>
        </div>
      )}
    </div>
  );
};
