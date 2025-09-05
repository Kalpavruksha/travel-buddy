"use client";

import React from 'react';

interface VideoBackgroundProps {
  videoSrc: string;
  children: React.ReactNode;
  className?: string;
  overlayClass?: string;
}

export default function VideoBackground({ 
  videoSrc, 
  children, 
  className = '', 
  overlayClass = 'bg-gradient-to-b from-blue-900/70 to-blue-800/80' 
}: VideoBackgroundProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Video Background */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Overlay for better text visibility */}
      <div className={`absolute top-0 left-0 w-full h-full z-0 ${overlayClass}`}></div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}