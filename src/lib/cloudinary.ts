/**
 * Cloudinary integration for image handling
 */

// Store Cloudinary configuration
export const cloudinaryConfig = {
  cloud_name: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dv6kixmen',
  api_key: import.meta.env.VITE_CLOUDINARY_API_KEY || '642687843464514',
  secure: true
};

/**
 * Get a Cloudinary URL with transformations
 * @param publicId The public ID of the image
 * @param transformations Transformation options
 * @returns Cloudinary URL
 */
export function getCloudinaryUrl(
  publicId: string,
  transformations: Record<string, any> = {}
): string {
  if (!publicId) return '';
  
  // Extract transformations into Cloudinary URL format
  const transformationParts: string[] = [];
  
  // Process each transformation
  for (const [key, value] of Object.entries(transformations)) {
    if (value !== undefined && value !== null) {
      // Handle special cases
      if (key === 'width' && typeof value === 'number') {
        transformationParts.push(`w_${value}`);
      } else if (key === 'height' && typeof value === 'number') {
        transformationParts.push(`h_${value}`);
      } else if (key === 'format' || key === 'f') {
        transformationParts.push(`f_${value}`);
      } else if (key === 'quality' || key === 'q') {
        transformationParts.push(`q_${value}`);
      } else {
        // Default format for other transformations
        transformationParts.push(`${key}_${value}`);
      }
    }
  }
  
  // Join all transformations with comma
  const transformationsString = transformationParts.length > 0 ? transformationParts.join(',') + '/' : '';
  
  // Format: https://res.cloudinary.com/cloud_name/image/upload/transformations/public_id
  return `https://res.cloudinary.com/${cloudinaryConfig.cloud_name}/image/upload/${transformationsString}${publicId}`;
}

/**
 * Create a responsive image srcset using Cloudinary
 * @param publicId The public ID of the image
 * @param widths Array of widths to generate
 * @param options Additional transformation options
 * @returns srcset string
 */
export function createCloudinarySrcSet(
  publicId: string,
  widths: number[] = [320, 480, 640, 768, 1024, 1280, 1536],
  options: any = {}
): string {
  if (!publicId) return '';
  
  return widths
    .map(width => {
      const url = getCloudinaryUrl(publicId, {
        ...options,
        width: width
      });
      return `${url} ${width}w`;
    })
    .join(', ');
}