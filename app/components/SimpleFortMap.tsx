"use client";

import { useState, useEffect } from 'react';
import { MapPin, ExternalLink, Loader2 } from 'lucide-react';

interface Fort {
  id: string;
  name: string;
  coordinates: { lat: number; lng: number };
  location: string;
  distance: string;
  description?: string;
  image?: string;
}

const SimpleFortMap = () => {
  const [selectedFort, setSelectedFort] = useState<string | null>(null);
  const [forts, setForts] = useState<Fort[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch forts data from API
  useEffect(() => {
    const fetchForts = async () => {
      try {
        const response = await fetch('/api/forts?action=map');
        const result = await response.json();
        // Ensure the data has the correct structure for the map
        const fortsData = result.success ? result.data : result;
        const formattedForts = fortsData.map((fort: any) => ({
          id: fort.id,
          name: fort.name,
          coordinates: {
            lat: fort.coordinates?.lat || 0,
            lng: fort.coordinates?.lng || 0
          },
          location: fort.location,
          distance: fort.distance,
          description: fort.description,
          image: fort.images?.main || fort.image || null
        }));
        setForts(formattedForts);
      } catch (error) {
        console.error('Error fetching forts:', error);
        // Fallback to sample data if API fails
        setForts([
          {
            id: "panhala",
            name: "Panhala Fort",
            coordinates: { lat: 16.8053, lng: 74.1055 },
            location: "Panhala, Kolhapur",
            distance: "20 km from Kolhapur",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Panhala_Fort_Main_Gate.jpg/1200px-Panhala_Fort_Main_Gate.jpg"
          },
          {
            id: "pratapgad",
            name: "Pratapgad Fort",
            coordinates: { lat: 17.8892, lng: 73.5678 },
            location: "Satara district",
            distance: "32 km from Kolhapur",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Pratapgad_Fort_Aerial_View.jpg/1200px-Pratapgad_Fort_Aerial_View.jpg"
          },
          {
            id: "raigad",
            name: "Raigad Fort",
            coordinates: { lat: 18.2492, lng: 73.3148 },
            location: "Raigad district",
            distance: "2.5 hours from Kolhapur",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/r/r1/Raigad_Fort_Coronation_Site.jpg/1200px-Raigad_Fort_Coronation_Site.jpg"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchForts();
  }, []);

  // Convert lat/lng to map coordinates (improved projection for Maharashtra region)
  const getMapCoordinates = (lat: number, lng: number) => {
    // Improved projection for Maharashtra region (covers all forts)
    // Latitude range: 15.5 to 18.5
    // Longitude range: 73.0 to 74.5
    const x = ((lng - 73.0) / (74.5 - 73.0)) * 90 + 5; // 73.0 to 74.5 longitude
    const y = ((18.5 - lat) / (18.5 - 15.5)) * 90 + 5; // 15.5 to 18.5 latitude
    return { x: Math.max(5, Math.min(95, x)), y: Math.max(5, Math.min(95, y)) };
  };

  const handleFortClick = (fortId: string) => {
    setSelectedFort(selectedFort === fortId ? null : fortId);
    // This would open the chatbot with info about this fort
    const chatButton = document.querySelector('button.fixed.bottom-6.right-6');
    if (chatButton) {
      (chatButton as HTMLButtonElement).click();
      setTimeout(() => {
        const input = document.querySelector('input[placeholder="Ask about forts, travel tips, or local experiences..."]') as HTMLInputElement;
        if (input) {
          const fort = forts.find(f => f.id === fortId);
          if (fort) {
            input.value = `Tell me more about ${fort.name}`;
            input.dispatchEvent(new Event('input', { bubbles: true }));
            // Find and click the send button
            const sendButton = document.querySelector('button[disabled]')?.nextElementSibling as HTMLButtonElement;
            if (sendButton) {
              sendButton.click();
            }
          }
        }
      }, 300);
    }
  };

  // Function to open fort in Google Maps
  const openInGoogleMaps = (coordinates: { lat: number; lng: number }, name: string) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${coordinates.lat},${coordinates.lng}&query_place_id=${encodeURIComponent(name)}`;
    window.open(url, '_blank');
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <div className="flex items-center justify-center h-80">
          <div className="text-center">
            <Loader2 className="animate-spin h-8 w-8 text-orange-500 mx-auto mb-2" />
            <p className="text-gray-600">Loading forts map...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Kolhapur Forts Interactive Map</h3>
      <p className="text-gray-600 mb-4">Click on any fort marker to learn more about it</p>
      
      <div className="relative w-full h-80 bg-gradient-to-br from-amber-50 to-orange-100 rounded-lg overflow-hidden border border-gray-300">
        {/* Map background with geographical features */}
        <div className="absolute inset-0">
          {/* Decorative SVG elements for better visual appeal */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Mountains/hills */}
            <path d="M10 80 Q 20 60, 30 70 Q 40 50, 50 65 Q 60 45, 70 60 Q 80 50, 90 70 L 90 100 L 10 100 Z" fill="#10B981" opacity="0.2"/>
            <path d="M5 85 Q 15 65, 25 75 Q 35 55, 45 70 Q 55 50, 65 65 Q 75 55, 85 75 L 85 100 L 5 100 Z" fill="#059669" opacity="0.3"/>
            
            {/* Rivers */}
            <path d="M0 40 Q 20 35, 40 40 Q 60 45, 80 40 Q 100 35, 100 35 L 100 45 Q 80 50, 60 45 Q 40 50, 20 45 Q 0 50, 0 45 Z" fill="#3B82F6" opacity="0.4"/>
            
            {/* Forest areas */}
            <circle cx="20" cy="30" r="8" fill="#047857" opacity="0.3"/>
            <circle cx="70" cy="25" r="10" fill="#065F46" opacity="0.2"/>
          </svg>
          
          {/* City markers */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">K</span>
            </div>
            <div className="text-xs text-blue-800 font-medium mt-1 text-center">Kolhapur</div>
          </div>
        </div>
        
        {/* Fort markers */}
        {forts.map((fort) => {
          const mapCoords = getMapCoordinates(fort.coordinates.lat, fort.coordinates.lng);
          return (
            <button
              key={fort.id}
              onClick={() => handleFortClick(fort.id)}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${
                selectedFort === fort.id 
                  ? 'scale-125 z-10' 
                  : 'hover:scale-110'
              }`}
              style={{ left: `${mapCoords.x}%`, top: `${mapCoords.y}%` }}
              title={`${fort.name} - ${fort.distance}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${
                selectedFort === fort.id 
                  ? 'bg-red-500 text-white ring-4 ring-red-200' 
                  : 'bg-orange-500 text-white ring-2 ring-orange-200'
              }`}>
                <MapPin size={16} />
              </div>
              <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-1 px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${
                selectedFort === fort.id 
                  ? 'bg-red-500 text-white' 
                  : 'bg-orange-500 text-white'
              }`}>
                {fort.name}
              </div>
            </button>
          );
        })}
        
        {/* Legend */}
        <div className="absolute bottom-2 left-2 bg-white bg-opacity-90 rounded-lg p-2 text-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center">
                <MapPin size={12} className="text-white" />
              </div>
              <span>Fort Locations</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">K</span>
              </div>
              <span>Kolhapur City</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Selected fort info */}
      {selectedFort && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-lg text-gray-900">
                    {forts.find(f => f.id === selectedFort)?.name}
                  </h4>
                  <p className="text-gray-600">
                    {forts.find(f => f.id === selectedFort)?.location}
                  </p>
                  <p className="text-gray-600 text-sm mt-1">
                    {forts.find(f => f.id === selectedFort)?.distance}
                  </p>
                  {forts.find(f => f.id === selectedFort)?.description && (
                    <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                      {forts.find(f => f.id === selectedFort)?.description}
                    </p>
                  )}
                </div>
                <button 
                  onClick={() => setSelectedFort(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-3">
                <button
                  onClick={() => handleFortClick(selectedFort)}
                  className="py-2 px-4 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-1"
                >
                  <span>Learn More</span>
                  <ExternalLink size={14} />
                </button>
                <button
                  onClick={() => openInGoogleMaps(
                    forts.find(f => f.id === selectedFort)?.coordinates, 
                    forts.find(f => f.id === selectedFort)?.name
                  )}
                  className="py-2 px-4 bg-white text-blue-600 text-sm font-medium rounded-lg border border-blue-600 hover:bg-blue-50 transition-colors flex items-center justify-center gap-1"
                >
                  <span>View on Map</span>
                  <MapPin size={14} />
                </button>
              </div>
            </div>
            
            {/* Fort Image */}
            {forts.find(f => f.id === selectedFort)?.image && (
              <div className="flex-shrink-0">
                <img 
                  src={forts.find(f => f.id === selectedFort)?.image} 
                  alt={forts.find(f => f.id === selectedFort)?.name}
                  className="w-24 h-24 object-cover rounded-lg border border-blue-200"
                  onError={(e) => {
                    // Fallback to a placeholder if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
                    target.onerror = null; // Prevent infinite loop
                  }}
                />
              </div>
            )}
          </div>
        </div>
      )}
      
      <div className="mt-4 text-sm text-gray-500">
        <p>📍 <strong>Tip:</strong> Click on any fort marker to get detailed information from our AI travel assistant!</p>
        <p className="mt-1">🗺️ <strong>Map:</strong> This map shows the relative locations of forts around Kolhapur using real GPS coordinates.</p>
      </div>
    </div>
  );
};

export default SimpleFortMap;