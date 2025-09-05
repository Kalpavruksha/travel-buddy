"use client";

import { useState } from 'react';
import Navbar from '@components/Navbar';
import TravelBot from '@components/TravelBot';
import { Loader2, Download, Edit3, MapPin, Clock, Utensils, Home, DollarSign, Lightbulb, Package } from 'lucide-react';

// PDF generation function using browser's print functionality
const downloadItineraryAsPDF = () => {
  window.print();
};

export default function ItineraryPage() {
  const [tripDuration, setTripDuration] = useState(3);
  const [travelers, setTravelers] = useState(2);
  const [interests, setInterests] = useState({
    history: true,
    photography: false,
    trekking: true,
    culture: false
  });
  const [generatedItinerary, setGeneratedItinerary] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiProvider, setAiProvider] = useState('gemini');

  const fortItineraries = [
    {
      day: 1,
      title: "Arrival & Panhala Fort",
      activities: [
        "Morning: Arrive in Kolhapur",
        "11:00 AM: Visit Kolhapur Museum",
        "2:00 PM: Lunch at local restaurant",
        "3:30 PM: Begin ascent to Panhala Fort",
        "6:00 PM: Sunset view from Teen Darwaza",
        "8:00 PM: Dinner at hotel"
      ],
      highlights: ["Largest fort in Deccan", "Shivaji Maharaj's favorite", "Teen Darwaza"]
    },
    {
      day: 2,
      title: "Pratapgad & Mahabaleshwar",
      activities: [
        "7:00 AM: Early breakfast",
        "8:30 AM: Drive to Pratapgad Fort",
        "10:00 AM: Explore Pratapgad Fort",
        "1:00 PM: Lunch at fort complex",
        "3:00 PM: Visit Pratapgarh temple",
        "5:00 PM: Drive to Mahabaleshwar",
        "7:00 PM: Dinner and overnight stay"
      ],
      highlights: ["Afzal Khan's defeat site", "Memorial chhatri", "Scenic beauty"]
    },
    {
      day: 3,
      title: "Raigad Fort & Departure",
      activities: [
        "7:00 AM: Breakfast",
        "9:00 AM: Drive to Raigad Fort",
        "10:30 AM: Explore Raigad Fort (coronation site)",
        "1:00 PM: Lunch near the fort",
        "3:00 PM: Visit Takmak Tok",
        "5:00 PM: Return to Kolhapur",
        "7:00 PM: Departure"
      ],
      highlights: ["Maratha Empire capital", "Shivaji's coronation site", "Architectural marvel"]
    }
  ];

  const toggleInterest = (interest: string) => {
    setInterests(prev => ({
      ...prev,
      [interest]: !prev[interest as keyof typeof interests]
    }));
  };

  const generateItinerary = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/itinerary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tripDuration,
          travelers,
          interests,
          aiProvider
        }),
      });
      
      const data = await response.json();
      if (data.itinerary && !data.itinerary.error) {
        setGeneratedItinerary(data.itinerary);
      } else {
        console.error('Failed to generate itinerary:', data.error || data.itinerary?.error);
        // Show error to user
        alert('Failed to generate itinerary: ' + (data.error || data.itinerary?.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error generating itinerary:', error);
      alert('Error generating itinerary. Please check your connection and try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <TravelBot />
      
      {/* Hero Section with Video Background - Hidden when printing */}
      <div className="relative overflow-hidden pt-20 hero-bg no-print">
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
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Create Your <span className="text-amber-300">Perfect Itinerary</span>
            </h1>
            <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
              Customize your fort exploration journey with our AI-powered itinerary planner
            </p>
          </div>
        </div>
      </div>
      
      {/* Itinerary Builder - Hidden when printing */}
      <div className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100 no-print">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Plan Your Fort Adventure</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Preferences Section */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Your Preferences</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Trip Duration (Days)</label>
                    <select 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={tripDuration}
                      onChange={(e) => setTripDuration(parseInt(e.target.value))}
                    >
                      <option value={1}>1 Day</option>
                      <option value={2}>2 Days</option>
                      <option value={3}>3 Days</option>
                      <option value={4}>4 Days</option>
                      <option value={5}>5 Days</option>
                      <option value={7}>1 Week</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Number of Travelers</label>
                    <select 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={travelers}
                      onChange={(e) => setTravelers(parseInt(e.target.value))}
                    >
                      <option value={1}>1 Traveler</option>
                      <option value={2}>2 Travelers</option>
                      <option value={3}>3 Travelers</option>
                      <option value={4}>4 Travelers</option>
                      <option value={5}>5+ Travelers</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Your Interests</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        className={`px-4 py-3 rounded-lg border ${
                          interests.history 
                            ? 'bg-blue-100 border-blue-500 text-blue-700' 
                            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                        onClick={() => toggleInterest('history')}
                      >
                        History
                      </button>
                      <button
                        className={`px-4 py-3 rounded-lg border ${
                          interests.photography 
                            ? 'bg-blue-100 border-blue-500 text-blue-700' 
                            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                        onClick={() => toggleInterest('photography')}
                      >
                        Photography
                      </button>
                      <button
                        className={`px-4 py-3 rounded-lg border ${
                          interests.trekking 
                            ? 'bg-blue-100 border-blue-500 text-blue-700' 
                            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                        onClick={() => toggleInterest('trekking')}
                      >
                        Trekking
                      </button>
                      <button
                        className={`px-4 py-3 rounded-lg border ${
                          interests.culture 
                            ? 'bg-blue-100 border-blue-500 text-blue-700' 
                            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                        onClick={() => toggleInterest('culture')}
                      >
                        Culture
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <p className="text-sm text-gray-600 text-center">
                    ✨ AI-powered itinerary generation will be available soon with API keys
                  </p>
                </div>
                
                <button 
                  onClick={generateItinerary}
                  disabled={isGenerating}
                  className="mt-4 w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isGenerating ? (
                    <><Loader2 className="animate-spin" size={20} />Generating Itinerary...</>
                  ) : (
                    'Generate Itinerary'
                  )}
                </button>
              </div>
              
              {/* Preview Section */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Sample Itinerary</h3>
                <div className="bg-blue-50 rounded-xl p-6 h-full">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mr-3">
                      3
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Days</h4>
                      <p className="text-sm text-gray-600">Kolhapur Forts Tour</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-blue-200 flex items-center justify-center mr-3 mt-1">
                        <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                      </div>
                      <p className="text-gray-700">Panhala Fort with historical insights</p>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-blue-200 flex items-center justify-center mr-3 mt-1">
                        <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                      </div>
                      <p className="text-gray-700">Pratapgad Fort with panoramic views</p>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-blue-200 flex items-center justify-center mr-3 mt-1">
                        <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                      </div>
                      <p className="text-gray-700">Raigad Fort - Maratha Empire capital</p>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-blue-200 flex items-center justify-center mr-3 mt-1">
                        <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                      </div>
                      <p className="text-gray-700">Local cuisine and cultural experiences</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-blue-200">
                    <p className="text-gray-600 text-sm">
                      <span className="font-medium">Note:</span> This is a sample itinerary. Your personalized plan will be generated based on your preferences.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* AI Generated Itinerary */}
          {generatedItinerary ? (
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Your AI-Generated Itinerary</h2>
                <p className="text-gray-600 mb-6">{generatedItinerary.summary}</p>
                <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1 bg-blue-100 px-3 py-1 rounded-full">
                    <MapPin size={16} />
                    {tripDuration} Days
                  </span>
                  <span className="flex items-center gap-1 bg-blue-100 px-3 py-1 rounded-full">
                    <Clock size={16} />
                    {travelers} Travelers
                  </span>
                  <span className="flex items-center gap-1 bg-blue-100 px-3 py-1 rounded-full">
                    <DollarSign size={16} />
                    {generatedItinerary.totalCost}
                  </span>
                </div>
              </div>
              
              {/* Days */}
              <div className="space-y-8">
                {generatedItinerary.days?.map((day: any) => (
                  <div key={day.day} className="border-l-4 border-blue-500 pl-6 pb-6">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mr-4">
                        Day {day.day}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">{day.title}</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2">
                        <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <Clock size={20} />
                          Activities
                        </h4>
                        <ul className="space-y-3">
                          {day.activities?.map((activity: string, index: number) => (
                            <li key={index} className="flex items-start">
                              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                              <span className="text-gray-700">{activity}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Lightbulb size={20} />
                            Highlights
                          </h4>
                          <ul className="space-y-2">
                            {day.highlights?.map((highlight: string, index: number) => (
                              <li key={index} className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                </svg>
                                <span className="text-gray-700">{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin size={16} className="text-blue-600" />
                            <span className="font-medium">Travel:</span>
                            <span>{day.travelTime}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Home size={16} className="text-blue-600" />
                            <span className="font-medium">Stay:</span>
                            <span>{day.accommodation}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Utensils size={16} className="text-blue-600" />
                            <span className="font-medium">Food:</span>
                            <span>{day.food}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <DollarSign size={16} className="text-blue-600" />
                            <span className="font-medium">Cost:</span>
                            <span>{day.costs}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Tips and Packing List */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Lightbulb size={20} />
                    Travel Tips
                  </h4>
                  <ul className="space-y-2">
                    {generatedItinerary.tips?.map((tip: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700 text-sm">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Package size={20} />
                    Packing List
                  </h4>
                  <ul className="space-y-2">
                    {generatedItinerary.packingList?.map((item: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="mt-12 text-center no-print">
                <button 
                  onClick={downloadItineraryAsPDF}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold rounded-full shadow-lg hover:from-blue-700 hover:to-indigo-800 transition-all transform hover:scale-105 flex items-center gap-2 mx-auto"
                >
                  <Download size={20} />
                  Download Itinerary (PDF)
                </button>
                <button 
                  onClick={() => setGeneratedItinerary(null)}
                  className="ml-4 px-8 py-4 bg-white text-blue-600 font-bold rounded-full border-2 border-blue-600 shadow-lg hover:bg-blue-50 transition-all flex items-center gap-2"
                >
                  <Edit3 size={20} />
                  Generate New Itinerary
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Your Personalized Itinerary</h2>
              <p className="text-gray-600 mb-8">Click "Generate AI Itinerary" above to create your custom travel plan based on your preferences.</p>
              
              {/* Sample Preview */}
              <div className="bg-blue-50 rounded-xl p-6 max-w-2xl mx-auto">
                <h3 className="font-bold text-lg text-gray-900 mb-4">Sample Preview</h3>
                <div className="space-y-4">
                  {fortItineraries.slice(0, 2).map((day) => (
                    <div key={day.day} className="text-left">
                      <h4 className="font-bold text-gray-900">Day {day.day}: {day.title}</h4>
                      <p className="text-sm text-gray-600">{day.activities[0]} • {day.activities[1]}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Footer - Hidden when printing */}
      <footer className="py-12 bg-gray-900 text-white no-print">
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