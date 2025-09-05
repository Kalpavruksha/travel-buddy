import React from 'react';
import { 
  Bot, 
  Map, 
  Camera, 
  Calendar,
  Star,
  Navigation,
  Info,
  MessageCircle,
  Shield,
  Crown,
  Mountain,
  TreePine
} from 'lucide-react';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  // Map string icons to actual Lucide components
  const iconMap: Record<string, React.ReactNode> = {
    "🤖": <Bot size={24} />,
    "🗺️": <Map size={24} />,
    "📸": <Camera size={24} />,
    "📅": <Calendar size={24} />,
    "⭐": <Star size={24} />,
    "🧭": <Navigation size={24} />,
    "ℹ️": <Info size={24} />,
    "💬": <MessageCircle size={24} />,
    "🛡️": <Shield size={24} />,
    "👑": <Crown size={24} />,
    "⛰️": <Mountain size={24} />,
    "🌲": <TreePine size={24} />
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg text-center transform transition-all hover:scale-105 hover:shadow-xl">
      <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
        {iconMap[icon] || <Star size={24} />}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;