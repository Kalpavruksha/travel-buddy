"use client";

import { useState } from 'react';
import Navbar from '@components/Navbar';
import TravelBot from '@components/TravelBot';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this data to your backend
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    
    // Reset submission status after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const contactInfo = [
    {
      title: "Email Us",
      content: "contact@travelbuddybot.com",
      icon: "📧"
    },
    {
      title: "Call Us",
      content: "+91 98765 43210",
      icon: "📞"
    },
    {
      title: "Visit Us",
      content: "Kolhapur, Maharashtra, India",
      icon: "📍"
    },
    {
      title: "Follow Us",
      content: "@TravelBuddyBot",
      icon: "📱"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <TravelBot />
      
      {/* Hero Section with Video Background */}
      <div className="pt-24 pb-16 relative overflow-hidden">
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
        
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Get in <span className="text-amber-200">Touch</span>
            </h1>
            <p className="text-xl text-orange-100 mb-10 max-w-3xl mx-auto">
              Have questions about Kolhapur forts or need help planning your adventure? We're here to help!
            </p>
          </div>
        </div>
      </div>
      
      {/* Contact Section */}
      <div className="py-16 bg-gradient-to-br from-amber-50 to-orange-100">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Send us a message</h2>
              
              {isSubmitted ? (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6">
                  <p className="font-bold">Thank you for your message!</p>
                  <p>We'll get back to you soon.</p>
                </div>
              ) : null}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold rounded-lg shadow-lg hover:opacity-90 transition-all"
                >
                  Send Message
                </button>
              </form>
            </div>
            
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Contact Information</h2>
              
              <div className="space-y-8 mb-12">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <span className="text-xl">{info.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{info.title}</h3>
                      <p className="text-gray-700">{info.content}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Map Placeholder */}
              <div className="bg-gradient-to-br from-amber-200 to-orange-300 rounded-2xl h-80 flex items-center justify-center mb-12">
                <div className="text-center">
                  <div className="text-5xl mb-4">🗺️</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Our Location</h3>
                  <p className="text-gray-700">Kolhapur, Maharashtra, India</p>
                </div>
              </div>
              
              {/* FAQ Section */}
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">What is the best time to visit Kolhapur forts?</h3>
                  <p className="text-gray-700">The best time to visit is between October and March when the weather is pleasant and comfortable for exploration.</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Are the forts suitable for families with children?</h3>
                  <p className="text-gray-700">Yes, most forts are family-friendly, though some involve trekking. We can help you choose the best options for your family.</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Do you offer guided tours?</h3>
                  <p className="text-gray-700">Yes, we partner with local guides who provide expert insights into the history and architecture of each fort.</p>
                </div>
              </div>
            </div>
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