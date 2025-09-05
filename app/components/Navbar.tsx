"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bot, MapPin, Calendar, Info, Mail, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChatWithBot = () => {
    // This will trigger the chatbot to open
    const chatButton = document.querySelector('button.fixed.bottom-6.right-6');
    if (chatButton) {
      (chatButton as HTMLButtonElement).click();
    }
    // Close mobile menu if open
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-sm py-2 shadow-md' : 'bg-transparent py-4'}`}>
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center" onClick={closeMobileMenu}>
            <span className="text-2xl font-bold text-orange-600 flex items-center gap-2">
              <MapPin className="text-orange-600" size={24} />
              Travel Buddy Bot
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-900 hover:text-orange-600 font-medium flex items-center gap-1" onClick={closeMobileMenu}>
              <MapPin size={16} />
              Home
            </Link>
            <Link href="/forts" className="text-gray-900 hover:text-orange-600 font-medium flex items-center gap-1" onClick={closeMobileMenu}>
              <MapPin size={16} />
              Forts
            </Link>
            <Link href="/itinerary" className="text-gray-900 hover:text-orange-600 font-medium flex items-center gap-1" onClick={closeMobileMenu}>
              <Calendar size={16} />
              Itinerary
            </Link>
            <Link href="/about" className="text-gray-900 hover:text-orange-600 font-medium flex items-center gap-1" onClick={closeMobileMenu}>
              <Info size={16} />
              About
            </Link>
            <Link href="/contact" className="text-gray-900 hover:text-orange-600 font-medium flex items-center gap-1" onClick={closeMobileMenu}>
              <Mail size={16} />
              Contact
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleChatWithBot}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition-colors"
            >
              <Bot size={16} />
              Chat with Bot
            </button>
            
            {/* Mobile menu button */}
            <button 
              onClick={toggleMobileMenu}
              className="md:hidden text-gray-900 focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 bg-white rounded-lg shadow-lg">
            <div className="flex flex-col space-y-4 px-4">
              <Link href="/" className="text-gray-900 hover:text-orange-600 font-medium flex items-center gap-2 py-2" onClick={closeMobileMenu}>
                <MapPin size={16} />
                Home
              </Link>
              <Link href="/forts" className="text-gray-900 hover:text-orange-600 font-medium flex items-center gap-2 py-2" onClick={closeMobileMenu}>
                <MapPin size={16} />
                Forts
              </Link>
              <Link href="/itinerary" className="text-gray-900 hover:text-orange-600 font-medium flex items-center gap-2 py-2" onClick={closeMobileMenu}>
                <Calendar size={16} />
                Itinerary
              </Link>
              <Link href="/about" className="text-gray-900 hover:text-orange-600 font-medium flex items-center gap-2 py-2" onClick={closeMobileMenu}>
                <Info size={16} />
                About
              </Link>
              <Link href="/contact" className="text-gray-900 hover:text-orange-600 font-medium flex items-center gap-2 py-2" onClick={closeMobileMenu}>
                <Mail size={16} />
                Contact
              </Link>
              <button 
                onClick={handleChatWithBot}
                className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition-colors justify-center"
              >
                <Bot size={16} />
                Chat with Bot
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;