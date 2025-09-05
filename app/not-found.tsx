"use client";

import Link from 'next/link';
import TravelBot from '@components/TravelBot';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center">
      <TravelBot />
      
      <div className="text-center max-w-2xl px-4">
        <div className="text-8xl font-bold text-orange-600 mb-6">404</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Page Not Found</h1>
        <p className="text-xl text-gray-700 mb-10">
          Oops! The page you're looking for seems to have disappeared like a fort in the mist.
        </p>
        
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-10">
          <div className="text-6xl mb-6">🏰</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Let's Get You Back on Track</h2>
          <p className="text-gray-700 mb-6">
            While we look for that missing page, why not explore some of Kolhapur's magnificent forts?
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <Link href="/forts" className="bg-orange-100 hover:bg-orange-200 text-orange-800 font-medium py-3 px-4 rounded-lg transition-colors">
              Explore Forts
            </Link>
            <Link href="/itinerary" className="bg-amber-100 hover:bg-amber-200 text-amber-800 font-medium py-3 px-4 rounded-lg transition-colors">
              Plan Trip
            </Link>
            <Link href="/" className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition-colors">
              Go Home
            </Link>
          </div>
        </div>
        
        <p className="text-gray-600">
          Need help? Chat with our <span className="text-orange-600 font-medium">Travel Buddy Bot</span> anytime!
        </p>
      </div>
    </div>
  );
}