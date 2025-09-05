"use client";

import { useState, useEffect } from 'react';
import { Search, MapPin, Clock, Ticket, Star, Bot, Shield, Crown, Mountain, TreePine, Waypoints, Map, ExternalLink, Camera, MountainIcon, X, Info, Calendar, Users, DollarSign, Navigation, Castle } from 'lucide-react';
import Navbar from '@components/Navbar';
import TravelBot from '@components/TravelBot';
import SimpleFortMap from '@components/SimpleFortMap';

export default function FortsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [forts, setForts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFort, setSelectedFort] = useState<any>(null);
  const [showFortModal, setShowFortModal] = useState(false);

  // Fetch forts data from API
  useEffect(() => {
    const fetchForts = async () => {
      try {
        const response = await fetch('/api/forts');
        const result = await response.json();
        console.log('Forts data loaded:', result);
        
        // Extract the data array from the response
        const fortsData = result.success ? result.data : result;
        if (fortsData && fortsData.length > 0) {
          console.log('First fort images:', fortsData[0]?.images);
          console.log('First fort main image:', fortsData[0]?.images?.main);
        }
        setForts(fortsData);
      } catch (error) {
        console.error('Error fetching forts:', error);
        // Fallback to sample data if API fails
        setForts([
          {
            id: "panhala",
            name: "Panhala Fort",
            description: "The largest fort in the Decon region and Shivaji Maharaj's favorite fort. Built in 1178 by the Shilahara dynasty, later strengthened by Shivaji Maharaj.",
            location: "20 km from Kolhapur",
            distance: "20 km from Kolhapur city",
            timing: "6:00 AM - 6:00 PM",
            entryFee: "₹15 per person",
            bestTime: "October to February",
            highlights: ["Teen Darwaza", "Sajja Kothi", "Andhar Bavadi", "Shivaji Maharaj's escape tunnel"],
            images: {
              main: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Panhala_Fort_Main_Gate.jpg/1200px-Panhala_Fort_Main_Gate.jpg"
            }
          },
          {
            id: "pratapgad",
            name: "Pratapgad Fort",
            description: "Built by Shivaji in 1656, famous for the historic meeting between Shivaji and Afzal Khan in 1659.",
            location: "Satara district",
            distance: "32 km from Kolhapur city",
            timing: "7:00 AM - 6:00 PM",
            entryFee: "₹25 per person",
            bestTime: "October to March",
            highlights: ["Afzal Khan's tomb", "Bhavani temple", "Memorial of the historic encounter", "Scenic viewpoints"],
            images: {
              main: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Pratapgad_Fort_Aerial_View.jpg/1200px-Pratapgad_Fort_Aerial_View.jpg"
            }
          },
          {
            id: "raigad",
            name: "Raigad Fort",
            description: "Capital of the Maratha Empire under Shivaji. Site of Shivaji's coronation in 1674.",
            location: "Raigad district",
            distance: "120 km from Kolhapur (2.5 hours)",
            timing: "8:00 AM - 5:00 PM",
            entryFee: "₹30 per person",
            bestTime: "October to March",
            highlights: ["Shivaji's coronation site", "Maha Darwaza", "Takmak Tok", "Palace ruins"],
            images: {
              main: "https://upload.wikimedia.org/wikipedia/commons/thumb/r/r1/Raigad_Fort_Coronation_Site.jpg/1200px-Raigad_Fort_Coronation_Site.jpg"
            }
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchForts();
  }, []);

  const filteredForts = forts.filter(fort => 
    (fort.name || fort.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (fort.description || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (fort.location || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChatWithBot = () => {
    const chatButton = document.querySelector('button.fixed.bottom-6.right-6');
    if (chatButton) {
      (chatButton as HTMLButtonElement).click();
    }
  };

  const handleLearnMore = (fort: any) => {
    console.log('Learn More clicked for fort:', fort);
    setSelectedFort(fort);
    setShowFortModal(true);
  };

  const handlePlanVisit = (fortName: string) => {
    console.log('Plan Visit clicked for fort:', fortName);
    
    // Open the chatbot
    const chatButton = document.querySelector('button.fixed.bottom-6.right-6');
    if (chatButton) {
      console.log('Chat button found, clicking...');
      (chatButton as HTMLButtonElement).click();
      
      // Wait for chatbot to open and then send a message
      setTimeout(() => {
        try {
          console.log('Looking for chat input...');
          // Try to find the input field
          const input = document.querySelector('input[placeholder*="forts"], input[placeholder*="travel"], input[placeholder*="experiences"]') as HTMLInputElement;
          if (input) {
            console.log('Input found, setting value...');
            input.value = `Plan a visit to ${fortName}. What should I know before going?`;
            input.dispatchEvent(new Event('input', { bubbles: true }));
            
            // Try to find and click the send button
            const sendButton = input.closest('form')?.querySelector('button[type="submit"]') || 
                             input.parentElement?.querySelector('button') ||
                             document.querySelector('button:not([disabled])');
            
            if (sendButton) {
              console.log('Send button found, clicking...');
              (sendButton as HTMLButtonElement).click();
            } else {
              console.log('Send button not found');
            }
          } else {
            console.log('Input field not found');
          }
        } catch (error) {
          console.log('Chatbot interaction failed:', error);
        }
      }, 1000);
    } else {
      console.log('Chat button not found');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-500 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading forts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      <TravelBot />
      
      {/* Hero Section with Video Background */}
      <div className="relative overflow-hidden pt-24 pb-16">
        {/* Video Background - Indian forts */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src="/videos/forts-bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Overlay for better text visibility */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-900/70 to-indigo-800/80 z-0"></div>
        
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Explore Kolhapur <span className="text-amber-300">Forts</span>
            </h1>
            <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
              Discover the majestic forts of Kolhapur and surrounding regions, each with its own unique history and architectural marvels
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search forts by name, location, or description..."
                  className="w-full px-6 py-4 rounded-full text-gray-900 shadow-lg focus:outline-none focus:ring-4 focus:ring-orange-300 pl-12"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>
            
            {/* Map Toggle Button */}
            <div className="mt-6">
              <button
                onClick={() => setShowMap(!showMap)}
                className="flex items-center gap-2 px-6 py-3 bg-white text-orange-600 font-semibold rounded-full shadow-lg hover:bg-orange-50 transition-all"
              >
                <Map size={20} />
                {showMap ? "Hide Map" : "Show Interactive Map"}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Map Section */}
      {showMap && (
        <div className="py-8 bg-white">
          <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
            <SimpleFortMap />
          </div>
        </div>
      )}
      
      {/* Forts Grid */}
      <div className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {filteredForts.length} Fort{filteredForts.length !== 1 ? 's' : ''} Found
            </h2>
            <button 
              onClick={handleChatWithBot}
              className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition-colors"
            >
              <Bot size={16} />
              Ask AI Guide
            </button>
          </div>
          
          {filteredForts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No forts found</h3>
              <p className="text-gray-600">Try adjusting your search criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredForts.map((fort) => (
                <div key={fort.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
                  {/* Fort Image or Placeholder */}
                  <div className="h-48 bg-gradient-to-r from-amber-700 to-orange-800 flex items-center justify-center relative overflow-hidden">
                    {fort.images?.main ? (
                      <img 
                        src={fort.images.main} 
                        alt={fort.name || fort.title} 
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          console.error('Image failed to load:', fort.images.main, 'for fort:', fort.name);
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          // Show fallback content
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = `
                              <div class="absolute inset-0 bg-gradient-to-r from-amber-700 to-orange-800 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-white opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                              <span class="text-white text-xl font-bold text-center absolute inset-0 flex items-center justify-center">${fort.name || fort.title}</span>
                            `;
                          }
                        }}
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-700 to-orange-800 flex items-center justify-center">
                        <Castle size={48} className="text-white opacity-50" />
                        <span className="text-white text-xl font-bold text-center absolute inset-0 flex items-center justify-center">{fort.name || fort.title}</span>
                      </div>
                    )}
                    
                    {/* Image Gallery Preview */}
                    {fort.images?.gallery && fort.images.gallery.length > 0 && (
                      <div className="absolute bottom-2 left-2 flex gap-1">
                        {fort.images.gallery.slice(0, 3).map((img: string, index: number) => (
                          <div key={index} className="w-8 h-8 rounded border-2 border-white overflow-hidden">
                            <img 
                              src={img} 
                              alt={`${fort.name} view ${index + 1}`}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.parentElement!.style.background = '#9CA3AF';
                                target.style.display = 'none';
                              }}
                            />
                          </div>
                        ))}
                        {fort.images.gallery.length > 3 && (
                          <div className="w-8 h-8 rounded border-2 border-white bg-black bg-opacity-50 flex items-center justify-center">
                            <span className="text-white text-xs font-bold">+{fort.images.gallery.length - 3}</span>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Rating Badge */}
                    {fort.rating && (
                      <div className="absolute top-3 right-3 bg-white bg-opacity-90 rounded-full px-2 py-1 flex items-center gap-1">
                        <Star size={14} className="text-yellow-500 fill-current" />
                        <span className="text-sm font-bold text-gray-800">{fort.rating}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{fort.name || fort.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{fort.description}</p>
                    
                    <div className="space-y-2 text-sm text-gray-700 mb-4">
                      <div className="flex justify-between">
                        <span className="font-medium flex items-center gap-1">
                          <MapPin size={14} />
                          Location:
                        </span>
                        <span>{fort.distance || fort.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium flex items-center gap-1">
                          <Clock size={14} />
                          Timing:
                        </span>
                        <span>{fort.timing || "Check locally"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium flex items-center gap-1">
                          <Ticket size={14} />
                          Entry Fee:
                        </span>
                        <span>{fort.entryFee || "₹15-30"}</span>
                      </div>
                      {fort.bestTime && (
                        <div className="flex justify-between">
                          <span className="font-medium flex items-center gap-1">
                            <Calendar size={14} />
                            Best Time:
                          </span>
                          <span>{fort.bestTime}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-1">
                        <Star size={16} />
                        Key Highlights:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {(fort.highlights || []).slice(0, 3).map((highlight: string, index: number) => (
                          <span key={index} className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
                            {highlight}
                          </span>
                        ))}
                        {(fort.highlights || []).length > 3 && (
                          <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
                            +{(fort.highlights || []).length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleLearnMore(fort)}
                        className="flex-1 py-3 bg-orange-100 text-orange-700 font-semibold rounded-lg hover:bg-orange-200 transition-colors flex items-center justify-center gap-2"
                      >
                        <Info size={16} />
                        Learn More
                      </button>
                      <button 
                        onClick={() => handlePlanVisit(fort.name || fort.title)}
                        className="flex-1 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <Navigation size={16} />
                        Plan Visit
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Fort Detail Modal */}
      {showFortModal && selectedFort && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-gray-900">{selectedFort.name || selectedFort.title}</h2>
                <button 
                  onClick={() => setShowFortModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {/* Fort Image */}
              {selectedFort.images?.main && (
                <div className="mb-6">
                  <img 
                    src={selectedFort.images.main} 
                    alt={selectedFort.name || selectedFort.title}
                    className="w-full h-64 object-cover rounded-xl"
                  />
                </div>
              )}
              
              {/* Description */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">About</h3>
                <p className="text-gray-700 leading-relaxed">{selectedFort.description}</p>
              </div>
              
              {/* Key Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <MapPin size={20} className="text-orange-600" />
                    <span className="font-medium">Location:</span>
                    <span>{selectedFort.distance || selectedFort.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={20} className="text-orange-600" />
                    <span className="font-medium">Timing:</span>
                    <span>{selectedFort.timing || "Check locally"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Ticket size={20} className="text-orange-600" />
                    <span className="font-medium">Entry Fee:</span>
                    <span>{selectedFort.entryFee || "₹15-30"}</span>
                  </div>
                  {selectedFort.bestTime && (
                    <div className="flex items-center gap-2">
                      <Calendar size={20} className="text-orange-600" />
                      <span className="font-medium">Best Time:</span>
                      <span>{selectedFort.bestTime}</span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-3">
                  {selectedFort.coordinates && (
                    <div className="flex items-center gap-2">
                      <Map size={20} className="text-orange-600" />
                      <span className="font-medium">Coordinates:</span>
                      <span className="text-sm">{selectedFort.coordinates.lat.toFixed(4)}, {selectedFort.coordinates.lng.toFixed(4)}</span>
                    </div>
                  )}
                  {selectedFort.trekDifficulty && (
                    <div className="flex items-center gap-2">
                      <Mountain size={20} className="text-orange-600" />
                      <span className="font-medium">Trek Difficulty:</span>
                      <span>{selectedFort.trekDifficulty}</span>
                    </div>
                  )}
                  {selectedFort.altitude && (
                    <div className="flex items-center gap-2">
                      <MountainIcon size={20} className="text-orange-600" />
                      <span className="font-medium">Altitude:</span>
                      <span>{selectedFort.altitude}</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Highlights */}
              {selectedFort.highlights && selectedFort.highlights.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Key Highlights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedFort.highlights.map((highlight: string, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span className="text-gray-700">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Transport Options */}
              {selectedFort.transport && (
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Transport Options</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {selectedFort.transport.bus && (
                      <div className="bg-orange-50 p-3 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Users size={16} className="text-orange-600" />
                          <span className="font-medium text-sm">Bus</span>
                        </div>
                        <p className="text-xs text-gray-600">{selectedFort.transport.bus}</p>
                      </div>
                    )}
                    {selectedFort.transport.taxi && (
                      <div className="bg-orange-50 p-3 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Navigation size={16} className="text-orange-600" />
                          <span className="font-medium text-sm">Taxi</span>
                        </div>
                        <p className="text-xs text-gray-600">{selectedFort.transport.taxi}</p>
                      </div>
                    )}
                    {selectedFort.transport.bike && (
                      <div className="bg-orange-50 p-3 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Navigation size={16} className="text-orange-600" />
                          <span className="font-medium text-sm">Bike</span>
                        </div>
                        <p className="text-xs text-gray-600">{selectedFort.transport.bike}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Nearby Attractions */}
              {selectedFort.nearbyAttractions && selectedFort.nearbyAttractions.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Nearby Attractions</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedFort.nearbyAttractions.map((attraction: string, index: number) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                        {attraction}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Action Buttons */}
              <div className="flex gap-4 pt-6 border-t border-gray-200">
                <button 
                  onClick={() => handlePlanVisit(selectedFort.name || selectedFort.title)}
                  className="flex-1 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Navigation size={20} />
                  Plan Your Visit
                </button>
                {selectedFort.mapLink && (
                  <a 
                    href={selectedFort.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 bg-white text-orange-600 font-semibold rounded-lg border-2 border-orange-600 hover:bg-orange-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <Map size={20} />
                    View on Map
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
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