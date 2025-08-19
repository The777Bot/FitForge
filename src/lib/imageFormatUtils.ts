/**
 * Utility functions for image format detection and optimization
 */

/**
 * Check if a specific image format is supported by the browser
 */
export function checkImageFormatSupport(format: string): boolean {
  if (typeof document === 'undefined') return false;
  
  const formats: Record<string, string> = {
    webp: 'image/webp',
    avif: 'image/avif',
    jpeg: 'image/jpeg',
    png: 'image/png',
  };
  
  const mime = formats[format.toLowerCase()];
  if (!mime) return false;
  
  // Use a more reliable method to check image format support
  // HTMLImageElement doesn't have canPlayType method (that's for media elements)
  const canvas = document.createElement('canvas');
  return canvas.getContext('2d') !== null && canvas.toDataURL(mime).indexOf(mime) !== -1;
}

/**
 * Get the best supported image format for the current browser
 */
export function getBestImageFormat(): string {
  if (checkImageFormatSupport('avif')) return 'avif';
  if (checkImageFormatSupport('webp')) return 'webp';
  return 'jpg'; // Fallback to jpg
}

/**
 * Get an optimized URL for an image based on the current environment
 * In development, this returns the original URL
 * In production, it would transform the URL to use optimized formats
 */
export function getOptimizedImageUrl(url: string | undefined): string {
  if (!url) return '';
  
  // In development, just return the original URL
  if (import.meta.env.DEV) {
    // Handle special cases
    
    // Data URLs
    if (url.startsWith('data:')) {
      return url;
    }
    
    // Vite imported assets in dev mode
    if (url.startsWith('/assets/')) {
      return url;
    }
    
    // URLs without extensions or with import query parameters
    if (url.includes('?import') || !url.match(/\.(jpg|jpeg|png|gif|svg|webp|avif)$/i)) {
      return url;
    }
    
    // Already optimized formats
    if (url.match(/\.(avif|webp)$/i)) {
      return url;
    }
    
    // External URLs
    if (url.startsWith('http')) {
      return url;
    }
    
    // For development, return the original URL
    return url;
  }
  
  // In production, we would transform the URL to use optimized formats
  // This is commented out for now as it would be implemented based on the production setup
  /*
  const bestFormat = getBestImageFormat();
  const baseUrl = url.replace(/\.(jpg|jpeg|png|gif|svg|webp|avif)$/i, '');
  return `${baseUrl}.${bestFormat}`;
  */
  
  return url;
}

/**
 * Create a srcset attribute for responsive images
 * In development, this returns an empty string
 * In production, it would generate a srcset with different sizes and formats
 */
export function createSrcSet(url: string | undefined): string {
  if (!url) return '';
  
  // In development, skip srcset generation
  if (import.meta.env.DEV) {
    // Skip for empty URLs
    if (!url) return '';
    
    // Skip for data URLs
    if (url.startsWith('data:')) return '';
    
    // Skip for Vite imported assets in dev mode
    if (url.startsWith('/assets/')) return '';
    
    // Skip for URLs without extensions or with import query parameters
    if (url.includes('?import') || !url.match(/\.(jpg|jpeg|png|gif|svg|webp|avif)$/i)) return '';
    
    // Skip for already optimized formats
    if (url.match(/\.(avif|webp)$/i)) return '';
    
    // Skip for external URLs
    if (url.startsWith('http')) return '';
    
    return '';
  }
  
  // In production, we would generate a srcset with different sizes and formats
  // This is commented out for now as it would be implemented based on the production setup
  /*
  const bestFormat = getBestImageFormat();
  const baseUrl = url.replace(/\.(jpg|jpeg|png|gif|svg|webp|avif)$/i, '');
  
  const sizes = [320, 640, 960, 1280, 1920];
  const srcSet = sizes
    .map(size => `${baseUrl}-${size}.${bestFormat} ${size}w`)
    .join(', ');
  
  return srcSet;
  */
  
  return '';
}