"use client";

import { useState, useEffect } from 'react';
import './video-test.css';

export default function VideoTest() {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100">
      {/* Hero Section with Video Background */}
      <div className="relative overflow-hidden pt-20 hero-video-bg">
        {/* Video Background */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-ancient-ruins-and-stone-columns-4483-large.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Overlay is handled by CSS */}
        
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 relative z-10">
          <div className="text-center">
            <h1 className={`text-4xl sm:text-6xl font-bold text-white mb-6 transition-all duration-1000 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Video Background <span className="text-amber-300">Demo</span>
            </h1>
            <p className={`text-lg sm:text-xl text-blue-100 mb-10 max-w-3xl mx-auto transition-all duration-1000 delay-150 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              This is a demonstration of the video background feature for the Travel Buddy Bot homepage.
            </p>
            
            <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-16 transition-all duration-1000 delay-300 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <button 
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold rounded-full shadow-lg hover:from-blue-700 hover:to-indigo-800 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              >
                Test Button
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}