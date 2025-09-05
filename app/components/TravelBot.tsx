"use client";

import { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  MapPin, 
  Clock, 
  Camera, 
  Star, 
  Info, 
  Navigation,
  X,
  MessageCircle,
  Bot,
  User,
  Loader2,
  Calendar,
  Utensils,
  Home,
  Ticket,
  Sun,
  CloudRain,
  Mountain,
  Shield,
  Crown,
  TreePine,
  Waypoints,
  ExternalLink,
  Map,
  Bus,
  Car,
  Bike
} from 'lucide-react';
import { sendChatMessage, getFortById } from '@services/apiService';

interface Message {
  id: number;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  fortData?: any; // For rich responses with fort data
}

const TravelBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'bot',
      content: "🏰 Namaste! I'm your Kolhapur Forts Travel Buddy. I can help you explore the magnificent forts around Kolhapur with detailed information. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const quickActions = [
    { icon: <MapPin size={16} />, label: "Fort Locations", action: "Show me all fort locations" },
    { icon: <Clock size={16} />, label: "Best Timing", action: "What's the best time to visit forts?" },
    { icon: <Camera size={16} />, label: "Photo Spots", action: "Best photography spots at forts" },
    { icon: <Utensils size={16} />, label: "Local Food", action: "Local food recommendations near forts" },
    { icon: <Home size={16} />, label: "Stay Options", action: "Accommodation options near forts" },
    { icon: <Ticket size={16} />, label: "Entry Fees", action: "Entry fees for all forts" }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Generate bot response using AI service
  const generateBotResponse = async (userMessage: string) => {
    try {
      setIsTyping(true);
      
      // Check if user is asking about a specific fort
      const fortNames = ['panhala', 'pratapgad', 'raigad', 'vishalgad', 'bavda', 'pargad', 'shivgad'];
      const lowerMessage = userMessage.toLowerCase();
      
      // If asking about a specific fort, fetch detailed data
      for (const fortName of fortNames) {
        if (lowerMessage.includes(fortName)) {
          try {
            const fortData = await getFortById(fortName);
            setIsTyping(false);
            
            // Return rich response with fort data
            return {
              content: `Here's detailed information about ${fortData.name}:`,
              fortData: fortData
            };
          } catch (error) {
            console.error(`Error fetching data for ${fortName}:`, error);
            // Fall back to AI response
            break;
          }
        }
      }
      
      // Send message to backend AI service for general queries
      const response = await sendChatMessage(userMessage);
      
      setIsTyping(false);
      return { content: response };
    } catch (error) {
      setIsTyping(false);
      console.error('Error generating bot response:', error);
      return { content: "I'm sorry, I encountered an error processing your request. Please try again." };
    }
  };

  const handleSend = async () => {
    if (inputValue.trim() === '') return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    // Generate and add bot response
    const botResponseData = await generateBotResponse(inputValue);
    
    const botResponse: Message = {
      id: messages.length + 2,
      type: 'bot',
      content: botResponseData.content,
      timestamp: new Date(),
      fortData: botResponseData.fortData
    };
    
    setMessages(prev => [...prev, botResponse]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickAction = (action: string) => {
    setInputValue(action);
    // Auto-send the quick action message
    setTimeout(() => {
      handleSend();
    }, 100);
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        type: 'bot',
        content: "🏰 Namaste! I'm your Kolhapur Forts Travel Buddy. I can help you explore the magnificent forts around Kolhapur with detailed information. What would you like to know?",
        timestamp: new Date()
      }
    ]);
  };

  // Render rich fort information
  const renderFortInfo = (fortData: any) => {
    if (!fortData) return null;
    
    return (
      <div className="mt-3 bg-blue-50 rounded-xl p-4 border border-blue-200">
        <div className="flex flex-col md:flex-row items-start gap-4">
          {/* Fort Image */}
          {fortData.images?.main && (
            <div className="flex-shrink-0">
              <img 
                src={fortData.images.main} 
                alt={fortData.name}
                className="w-32 h-32 object-cover rounded-lg border-2 border-blue-200"
                onError={(e) => {
                  // Fallback to a placeholder if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
                }}
              />
            </div>
          )}
          <div className="flex-1">
            <h4 className="font-bold text-lg text-gray-900">{fortData.name}</h4>
            <p className="text-sm text-gray-600 mt-1">{fortData.location}</p>
            
            <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center">
                <MapPin size={14} className="text-blue-600 mr-1" />
                <span>{fortData.distance}</span>
              </div>
              <div className="flex items-center">
                <Clock size={14} className="text-blue-600 mr-1" />
                <span>{fortData.timing}</span>
              </div>
              <div className="flex items-center">
                <Ticket size={14} className="text-blue-600 mr-1" />
                <span>{fortData.entryFee}</span>
              </div>
              {fortData.coordinates && (
                <div className="flex items-center">
                  <Map size={14} className="text-blue-600 mr-1" />
                  <span>{fortData.coordinates.lat.toFixed(4)}, {fortData.coordinates.lng.toFixed(4)}</span>
                </div>
              )}
            </div>
            
            {/* Safely handle history field */}
            {fortData.history && (
              <p className="text-sm text-gray-700 mt-2 leading-relaxed">
                {fortData.history}
              </p>
            )}
            {/* Fallback to description if history is not available */}
            {!fortData.history && fortData.description && (
              <p className="text-sm text-gray-700 mt-2 leading-relaxed">
                {fortData.description}
              </p>
            )}
            
            {fortData.mapLink && (
              <a 
                href={fortData.mapLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View on Map <ExternalLink size={14} />
              </a>
            )}
            
            {fortData.officialLinks && fortData.officialLinks.length > 0 && (
              <div className="mt-2">
                <p className="text-xs text-gray-500">Official Resources:</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {fortData.officialLinks.slice(0, 2).map((link: any, index: number) => (
                    <a 
                      key={index}
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs bg-white px-2 py-1 rounded border border-blue-200 text-blue-700 hover:bg-blue-50"
                    >
                      {link.name} <ExternalLink size={12} />
                    </a>
                  ))}
                </div>
              </div>
            )}
            
            {/* Display nearby hotels if available */}
            {fortData.nearbyHotels && fortData.nearbyHotels.length > 0 && (
              <div className="mt-3">
                <p className="text-xs text-gray-500">Nearby Accommodation:</p>
                <div className="mt-1 space-y-1">
                  {fortData.nearbyHotels.slice(0, 2).map((hotel: any, index: number) => (
                    <div key={index} className="text-xs bg-white p-2 rounded border border-blue-100">
                      <div className="font-medium text-blue-700">{hotel.name}</div>
                      <div className="text-gray-600">{hotel.distance} • {hotel.price}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Display transport options if available */}
            {fortData.transport && (
              <div className="mt-3">
                <p className="text-xs text-gray-500">Transport Options:</p>
                <div className="mt-1 space-y-1 text-xs">
                  {fortData.transport.bus && (
                    <div className="flex items-center text-gray-700">
                      <Bus size={12} className="text-blue-600 mr-1" />
                      <span>{fortData.transport.bus}</span>
                    </div>
                  )}
                  {fortData.transport.taxi && (
                    <div className="flex items-center text-gray-700">
                      <Car size={12} className="text-blue-600 mr-1" />
                      <span>{fortData.transport.taxi}</span>
                    </div>
                  )}
                  {fortData.transport.bike && (
                    <div className="flex items-center text-gray-700">
                      <Bike size={12} className="text-blue-600 mr-1" />
                      <span>{fortData.transport.bike}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-full max-w-md h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <Bot className="text-blue-600" size={20} />
                </div>
                <div>
                  <h3 className="font-bold">Kolhapur Forts Buddy</h3>
                  <p className="text-blue-100 text-xs">AI Travel Assistant</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={clearChat}
                  className="text-blue-100 hover:text-white"
                  title="Clear chat"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-blue-200"
                  title="Close chat"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.type === 'bot' && (
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2 flex-shrink-0">
                    <Bot className="text-blue-600" size={16} />
                  </div>
                )}
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-blue-500 text-white rounded-tr-none'
                      : 'bg-white text-gray-800 rounded-tl-none border border-gray-200 shadow-sm'
                  }`}
                >
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {message.content}
                  </div>
                  
                  {/* Render rich fort information if available */}
                  {message.fortData && renderFortInfo(message.fortData)}
                  
                  <div className={`text-xs mt-2 ${message.type === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>

                {message.type === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center ml-2 flex-shrink-0">
                    <User className="text-white" size={16} />
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start mb-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2 flex-shrink-0">
                  <Bot className="text-blue-600" size={16} />
                </div>
                <div className="bg-white text-gray-800 px-4 py-3 rounded-2xl rounded-tl-none border border-gray-200 shadow-sm">
                  <div className="flex space-x-1">
                    <Loader2 className="animate-spin" size={16} />
                    <span className="text-sm">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="px-4 py-2 bg-white border-t border-gray-200">
            <div className="flex overflow-x-auto space-x-2 pb-2">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickAction(action.action)}
                  className="flex items-center space-x-1 flex-shrink-0 px-3 py-2 bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors text-xs"
                >
                  {action.icon}
                  <span>{action.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about forts, travel tips, or local experiences..."
                className="flex-1 border border-gray-300 rounded-l-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
              <button
                onClick={handleSend}
                disabled={inputValue.trim() === ''}
                className={`px-4 rounded-r-2xl font-medium ${
                  inputValue.trim() === '' 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                    : 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700'
                }`}
              >
                <Send size={20} />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              🏰 Your AI companion for exploring Kolhapur's heritage
            </p>
          </div>
        </div>
      )}
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all ${
          isOpen 
            ? 'bg-red-500 hover:bg-red-600' 
            : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700'
        } text-white z-50`}
      >
        {isOpen ? (
          <X size={24} />
        ) : (
          <MessageCircle size={24} />
        )}
      </button>
    </>
  );
};

export default TravelBot;