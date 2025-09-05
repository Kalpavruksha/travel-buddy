# Example Map Component Implementation

This document provides an example of how to implement an interactive map component using Leaflet.js with the fort data structure.

## Installation

First, install the required dependencies:

```bash
npm install leaflet react-leaflet
```

## Sample Component Code

```jsx
"use client";

import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Fort {
  id: string;
  name: string;
  location: string;
  coordinates: { lat: number; lng: number };
  distance: string;
  timing: string;
  entryFee: string;
  history: string;
  bestTime: string;
  image?: string;
}

const FortMap = () => {
  const [forts, setForts] = useState<Fort[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real implementation, this would fetch from your API
    // For this example, we'll use sample data
    const sampleForts: Fort[] = [
      {
        id: "panhala",
        name: "Panhala Fort",
        location: "Panhala, Kolhapur",
        coordinates: { lat: 16.8053, lng: 74.1055 },
        distance: "20 km from Kolhapur city",
        timing: "6:00 AM - 6:00 PM",
        entryFee: "₹15 per person",
        history: "Built in 1178 by the Shilahara dynasty, later strengthened by Shivaji Maharaj.",
        bestTime: "October to February",
        image: "/images/panhala-fort.jpg"
      },
      {
        id: "pratapgad",
        name: "Pratapgad Fort",
        location: "Satara district, near Kolhapur",
        coordinates: { lat: 17.8892, lng: 73.5678 },
        distance: "32 km from Kolhapur city",
        timing: "7:00 AM - 6:00 PM",
        entryFee: "₹25 per person",
        history: "Built by Chhatrapati Shivaji Maharaj in 1656 to counter the rising power of the Adilshahi dynasty.",
        bestTime: "October to March",
        image: "/images/pratapgad-fort.jpg"
      }
    ];
    
    setForts(sampleForts);
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading map...</div>;
  }

  // Center of Kolhapur for initial map view
  const center: [number, number] = [16.7050, 74.2433];

  return (
    <MapContainer 
      center={center} 
      zoom={10} 
      style={{ height: '500px', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {forts.map((fort) => (
        <Marker 
          key={fort.id} 
          position={[fort.coordinates.lat, fort.coordinates.lng]}
        >
          <Popup>
            <div>
              <h3 className="font-bold text-lg">{fort.name}</h3>
              <p className="text-sm text-gray-600">{fort.location}</p>
              <p className="text-sm mt-1">{fort.history.substring(0, 100)}...</p>
              <div className="mt-2 text-sm">
                <p><strong>Distance:</strong> {fort.distance}</p>
                <p><strong>Timing:</strong> {fort.timing}</p>
                <p><strong>Entry Fee:</strong> {fort.entryFee}</p>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default FortMap;
```

## Usage in Your Application

To use this component in your Next.js application:

1. Create a new file `app/components/FortMap.tsx` with the above code
2. Import and use it in your pages:

```jsx
// In app/forts/page.tsx
import FortMap from '@components/FortMap';

// In your component render method:
<div className="py-8">
  <h2 className="text-2xl font-bold mb-4">Fort Locations</h2>
  <FortMap />
</div>
```

## JSON Data Integration

The component can be easily integrated with your JSON data structure:

```jsx
useEffect(() => {
  const fetchForts = async () => {
    try {
      // Fetch from your API endpoint
      const response = await fetch('/api/forts/map/data');
      const result = await response.json();
      if (result.success) {
        setForts(result.data);
      }
    } catch (error) {
      console.error('Error fetching forts:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchForts();
}, []);
```

## Customization Options

1. **Marker Customization**: Replace default markers with custom icons
2. **Popup Styling**: Add images, links, and formatted content
3. **Map Layers**: Add satellite, terrain, or custom map layers
4. **Interactivity**: Add click handlers, hover effects, and animations
5. **Clustering**: Use marker clustering for better performance with many forts

## Benefits of This Approach

1. **Rich Visualization**: Interactive map showing fort locations
2. **Detailed Information**: Popups with comprehensive fort details
3. **Responsive Design**: Works on all device sizes
4. **Easy Integration**: Simple to connect with your existing JSON data
5. **Performance**: Efficient rendering with React Leaflet
6. **Customizable**: Highly customizable appearance and behavior

This implementation provides a solid foundation for displaying fort locations on an interactive map while maintaining compatibility with your existing data structure.