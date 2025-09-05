"use client";

import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import travelAnimation from "../animations/travel.json";
import Navbar from '@components/Navbar';
import TravelBot from '@components/TravelBot';

export default function LightHomePage() {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleExploreForts = () => {
    window.location.href = '/forts';
  };

  const handlePlanTrip = () => {
    window.location.href = '/itinerary';
  };

  const handleChatWithBot = () => {
    // This will trigger the chatbot to open
    const chatButton = document.querySelector('button.fixed.bottom-6.right-6');
    if (chatButton) {
      (chatButton as HTMLButtonElement).click();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <TravelBot />
      
      {/* Hero Section with Animated Gradient Background */}
      <div className="relative w-full flex-grow flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 animate-gradient">
        {/* Floating Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Content */}
        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold drop-shadow-lg mb-6"
          >
            🌍 Travel Buddy
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-lg sm:text-xl md:text-2xl mt-4 mb-8 drop-shadow-md max-w-2xl mx-auto"
          >
            Your smart tourism guide for forts, food & culture
          </motion.p>

          {/* Lottie Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: "spring", stiffness: 80 }}
            className="w-48 h-48 md:w-64 md:h-64 mx-auto mb-8"
          >
            <Lottie animationData={travelAnimation} loop={true} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button 
              onClick={handleChatWithBot}
              className="px-6 py-3 bg-white text-blue-600 font-bold rounded-full shadow-lg hover:bg-blue-50 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              Chat with AI Guide
            </button>
            <button 
              onClick={handleExploreForts}
              className="px-6 py-3 bg-transparent text-white font-bold rounded-full border-2 border-white shadow-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2"
            >
              Explore Forts
            </button>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Travel Buddy?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the ultimate travel companion designed specifically for Kolhapur
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-6 rounded-xl text-center">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-bold mb-2">AI-Powered Guide</h3>
              <p className="text-gray-600">Get personalized recommendations and historical insights</p>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-xl text-center">
              <div className="text-4xl mb-4">🗺️</div>
              <h3 className="text-xl font-bold mb-2">Interactive Maps</h3>
              <p className="text-gray-600">Navigate with ease using our detailed maps</p>
            </div>
            
            <div className="bg-pink-50 p-6 rounded-xl text-center">
              <div className="text-4xl mb-4">📅</div>
              <h3 className="text-xl font-bold mb-2">Smart Itinerary</h3>
              <p className="text-gray-600">Create customized travel plans in seconds</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 bg-gray-900 text-white">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} Travel Buddy Bot. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}