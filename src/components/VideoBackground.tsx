import React from 'react';

interface VideoBackgroundProps {
  src: string;
  className?: string;
  overlay?: boolean;
}

export const VideoBackground: React.FC<VideoBackgroundProps> = ({ 
  src, 
  className = '', 
  overlay = true 
}) => {
  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={src} type="video/mp4" />
      </video>
      
      {overlay && (
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      )}
    </div>
  );
};
