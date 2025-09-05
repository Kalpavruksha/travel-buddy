import React from 'react';
import { Castle, MapPin, Clock } from 'lucide-react';

interface FortCardProps {
  title: string;
  description: string;
  imageClass: string;
}

const FortCard: React.FC<FortCardProps> = ({ title, description, imageClass }) => {
  const handleExploreNow = () => {
    // Navigate to the forts page
    window.location.href = '/forts';
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl">
      <div className={`h-48 ${imageClass} flex items-end justify-center p-4 relative`}>
        <div className="text-center bg-black bg-opacity-50 rounded-lg px-3 py-2 absolute inset-x-4 bottom-4">
          <span className="text-white text-xl font-bold">{title}</span>
        </div>
      </div>
      <div className="p-6">
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex justify-between text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <MapPin size={14} />
            <span>Kolhapur</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>2-3 hours</span>
          </div>
        </div>
        <button 
          onClick={handleExploreNow}
          className="mt-6 w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all flex items-center justify-center gap-2"
        >
          <MapPin size={16} />
          Explore Now
        </button>
      </div>
    </div>
  );
};

export default FortCard;