import React from 'react';

interface HeroBackgroundProps {
  children?: React.ReactNode;
}

export const HeroBackground: React.FC<HeroBackgroundProps> = ({ children }) => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0 bg-black/50 z-10" />
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/cyber-bg.mp4" type="video/mp4" />
      </video>
      
      <div className="relative z-20 h-full">
        {children}
      </div>
    </div>
  );
};
