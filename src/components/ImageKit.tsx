import React from 'react';
import { IKImage, IKContext } from 'imagekitio-react';

interface ImageProps {
  path: string;
  alt: string;
  w?: number;
  h?: number;
  className?: string;
  transformation?: Array<{
    width?: number;
    height?: number;
    [key: string]: any;
  }>;
}

const ImageKit: React.FC<ImageProps> = ({ 
  path, 
  alt, 
  w, 
  h, 
  className = '',
  transformation
}) => {
  // Use the provided URL endpoint
  const urlEndpoint = "https://ik.imagekit.io/sy6soezys/";
  
  // Default transformation if none provided
  const defaultTransformation = [{ 
    width: w || 400, 
    height: h || 300,
    quality: 80,
  }];

  return (
    <IKContext urlEndpoint={urlEndpoint}>
      <IKImage
        path={path}
        transformation={transformation || defaultTransformation}
        loading="lazy"
        lqip={{ active: true }}
        alt={alt}
        className={className}
      />
    </IKContext>
  );
};

export default ImageKit;