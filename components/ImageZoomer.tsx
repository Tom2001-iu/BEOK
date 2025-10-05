import React, { useState, useRef } from 'react';

interface ImageZoomerProps {
  src: string;
  alt: string;
  zoomLevel?: number;
  loupeSize?: number;
}

const ImageZoomer: React.FC<ImageZoomerProps> = ({ src, alt, zoomLevel = 2.5, loupeSize = 150 }) => {
  const [showZoom, setShowZoom] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !imgRef.current) return;

    const { left, top } = containerRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    
    setPosition({ x, y });
  };
  
  const backgroundPosX = -position.x * zoomLevel + (loupeSize / 2);
  const backgroundPosY = -position.y * zoomLevel + (loupeSize / 2);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full cursor-none" // Hide cursor, loupe will follow
      onMouseEnter={() => setShowZoom(true)}
      onMouseLeave={() => setShowZoom(false)}
      onMouseMove={handleMouseMove}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        aria-label={alt}
      />
      
      {showZoom && (
        <div
          role="presentation"
          className="absolute rounded-full border-2 border-white shadow-lg pointer-events-none"
          style={{
            height: `${loupeSize}px`,
            width: `${loupeSize}px`,
            top: `${position.y - loupeSize / 2}px`,
            left: `${position.x - loupeSize / 2}px`,
            backgroundImage: `url(${src})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: `${(imgRef.current?.width || 0) * zoomLevel}px ${(imgRef.current?.height || 0) * zoomLevel}px`,
            backgroundPosition: `${backgroundPosX}px ${backgroundPosY}px`,
          }}
        />
      )}
    </div>
  );
};

export default ImageZoomer;
