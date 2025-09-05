"use client";

import Navbar from '@components/Navbar';
import TravelBot from '@components/TravelBot';

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Fort Historian",
      role: "History Expert",
      image: "/placeholder.svg",
      bio: "Expert in Maratha history and fort architecture with over 15 years of experience exploring Maharashtra's forts."
    },
    {
      name: "AI Specialist",
      role: "Technology Lead",
      image: "/placeholder.svg",
      bio: "Specializes in AI-powered travel recommendations and natural language processing for travel queries."
    },
    {
      name: "Adventure Guide",
      role: "Experience Designer",
      image: "/placeholder.svg",
      bio: "Creates immersive travel experiences and adventure itineraries for fort exploration enthusiasts."
    }
  ];

  const features = [
    {
      title: "AI-Powered Recommendations",
      description: "Our intelligent bot learns your preferences to suggest the perfect forts and experiences."
    },
    {
      title: "Historical Insights",
      description: "Deep dive into the rich history of each fort with our expert-curated content."
    },
    {
      title: "Interactive Maps",
      description: "Navigate fort complexes with our detailed, offline-capable maps."
    },
    {
      title: "Community Reviews",
      description: "Read and share experiences with fellow fort enthusiasts."
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
              About <span className="text-amber-200">Travel Buddy Bot</span>
            </h1>
            <p className="text-xl text-orange-100 mb-10 max-w-3xl mx-auto">
              Your ultimate companion for exploring the majestic forts of Kolhapur and beyond
            </p>
          </div>
        </div>
      </div>
      
      {/* Mission Section */}
      <div className="py-16 bg-gradient-to-br from-amber-50 to-orange-100">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                <p className="text-gray-700 mb-6 text-lg">
                  At Travel Buddy Bot, we're passionate about preserving and sharing the rich heritage of Kolhapur's magnificent forts. 
                  Our mission is to make these historical treasures accessible to everyone through innovative technology and expert knowledge.
                </p>
                <p className="text-gray-700 mb-6 text-lg">
                  We believe that understanding our past is key to building a better future. By connecting travelers with the stories, 
                  architecture, and cultural significance of these forts, we hope to inspire a new generation of history enthusiasts.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="bg-orange-100 px-4 py-2 rounded-full text-orange-800 font-medium">
                    Heritage Preservation
                  </div>
                  <div className="bg-amber-100 px-4 py-2 rounded-full text-amber-800 font-medium">
                    Educational Travel
                  </div>
                  <div className="bg-orange-100 px-4 py-2 rounded-full text-orange-800 font-medium">
                    Sustainable Tourism
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-amber-200 to-orange-300 rounded-2xl h-96 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-6xl mb-4">🏰</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Fort Heritage</h3>
                  <p className="text-gray-700">Connecting travelers with history</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Features Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">What Makes Us Special</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <div className="text-2xl">⭐</div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Team Section */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="h-48 bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center">
                    <div className="text-5xl">👤</div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-orange-600 font-medium mb-4">{member.role}</p>
                    <p className="text-gray-600">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="py-16 relative overflow-hidden">
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
        
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Ready to Explore Kolhapur Forts?</h2>
          <p className="text-xl text-orange-100 mb-10 max-w-2xl mx-auto">
            Join thousands of travelers who have discovered the magic of Kolhapur forts with Travel Buddy Bot
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-orange-600 font-bold rounded-full shadow-lg hover:bg-orange-50 transition-all transform hover:scale-105">
              Start Exploring
            </button>
            <button className="px-8 py-4 bg-transparent text-white font-bold rounded-full border-2 border-white shadow-lg hover:bg-white/10 transition-all">
              Learn More
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