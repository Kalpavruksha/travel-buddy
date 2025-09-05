"use client";

import { useState, useEffect } from 'react';
import { MapPin, Bot, Calendar } from 'lucide-react';
import FortCard from '@components/FortCard';
import FeatureCard from '@components/FeatureCard';
import Navbar from '@components/Navbar';
import TravelBot from '@components/TravelBot';
import './home-video.css';

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const forts = [
    {
      title: "Panhala Fort",
      description: "The largest fort in the Deccan region and Shivaji Maharaj's favorite fort with the iconic Teen Darwaza",
      imageClass: "fort-card-bg-1"
    },
    {
      title: "Pratapgad Fort",
      description: "Historic site where Chhatrapati Shivaji Maharaj defeated Afzal Khan with breathtaking valley views",
      imageClass: "fort-card-bg-2"
    },
    {
      title: "Raigad Fort",
      description: "The capital of the Maratha Empire and coronation site of Shivaji Maharaj atop a majestic hill",
      imageClass: "fort-card-bg-3"
    },
    {
      title: "Vishalgad Fort",
      description: "Associated with Baji Prabhu Deshpande's heroic sacrifice and spectacular sunrise/sunset views",
      imageClass: "fort-card-bg-4"
    },
    {
      title: "Bavda Fort",
      description: "A lesser-known fort with ancient rock-cut caves and peaceful trekking experience away from crowds",
      imageClass: "fort-card-bg-5"
    },
    {
      title: "Pargad Fort",
      description: "A serene fort with a Shivaji statue and temple, offering peaceful environment with historical significance",
      imageClass: "fort-card-bg-6"
    },
    {
      title: "Shivgad Fort",
      description: "A watchtower fort over Phonda Ghat, surrounded by forest with panoramic views of surrounding landscape",
      imageClass: "fort-card-bg-7"
    }
  ];

  const features = [
    {
      icon: "🤖",
      title: "AI-Powered Guide",
      description: "Get personalized recommendations and historical insights from our intelligent travel bot"
    },
    {
      icon: "🗺️",
      title: "Interactive Maps",
      description: "Navigate with ease using our detailed, interactive maps of each fort complex"
    },
    {
      icon: "📸",
      title: "Photo Guides",
      description: "Capture the best shots with our curated photo spots and photography tips"
    },
    {
      icon: "📅",
      title: "Event Calendar",
      description: "Stay updated with festivals, tours, and special events at the forts"
    }
  ];

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
    <div className="min-h-screen">
      <Navbar />
      <TravelBot />
      
      {/* Hero Section with Video Background */}
      <div className="relative overflow-hidden pt-20 hero-video-bg">
        {/* Video Background - Clouds over mountains */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src="/videos/travel-bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Darker overlay for better text visibility */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-0"></div>
        
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 relative z-10">
          <div className="text-center">
            <h1 className={`text-4xl sm:text-6xl font-bold text-white mb-6 transition-all duration-1000 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Discover the Majesty of <span className="text-amber-300">Kolhapur Forts</span>
            </h1>
            <p className={`text-lg sm:text-xl text-blue-100 mb-10 max-w-3xl mx-auto transition-all duration-1000 delay-150 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Your AI-powered travel companion for exploring the rich history and breathtaking beauty of Kolhapur's ancient fortifications
            </p>
            
            <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-16 transition-all duration-1000 delay-300 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <button 
                onClick={handleChatWithBot}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold rounded-full shadow-lg hover:from-blue-700 hover:to-indigo-800 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Bot size={20} />
                Chat with AI Guide
              </button>
              <button 
                onClick={handleExploreForts}
                className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-full border-2 border-blue-600 shadow-lg hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
              >
                <MapPin size={20} />
                Explore Forts
              </button>
            </div>
          </div>
          
          {/* Fort Showcase */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 transition-all duration-1000 delay-500 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {forts.map((fort, index) => (
              <FortCard 
                key={index}
                title={fort.title}
                description={fort.description}
                imageClass={fort.imageClass}
              />
            ))}
          </div>
        </div>
        
        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="fill-blue-200">
            <path d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,74.7C1120,75,1280,53,1360,42.7L1440,32L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
          </svg>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="py-20 bg-blue-200">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Why Choose Travel Buddy Bot?</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">Experience the ultimate travel companion designed specifically for Kolhapur fort enthusiasts</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Plan Your Perfect Fort Adventure</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">Create a customized itinerary with our AI-powered planning tool</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleChatWithBot}
              className="px-8 py-4 bg-white text-blue-600 font-bold rounded-full shadow-lg hover:bg-blue-50 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <Bot size={20} />
              Ask Our AI Guide
            </button>
            <button 
              onClick={handlePlanTrip}
              className="px-8 py-4 bg-transparent text-white font-bold rounded-full border-2 border-white shadow-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2"
            >
              <Calendar size={20} />
              Create Itinerary
            </button>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-white">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Travel Buddy Bot</h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">Your ultimate companion for exploring the majestic forts of Kolhapur. Discover history, plan your visit, and create unforgettable memories.</p>
            <div className="flex justify-center space-x-6">
              <a href="/about" className="text-gray-400 hover:text-white">About</a>
              <a href="/forts" className="text-gray-400 hover:text-white">Forts</a>
              <a href="/itinerary" className="text-gray-400 hover:text-white">Itinerary</a>
              <a href="/contact" className="text-gray-400 hover:text-white">Contact</a>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-800 text-gray-500 text-sm">
              © {new Date().getFullYear()} Travel Buddy Bot. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}