// API service for making requests to the Next.js API routes
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export const apiService = {
  // Fetch all forts
  async getForts() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/forts?action=all`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      return result.success ? result.data : result;
    } catch (error) {
      console.error('Error fetching forts:', error);
      throw error;
    }
  },

  // Fetch fort by ID
  async getFortById(id: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/forts/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      return result.success ? result.data : result;
    } catch (error) {
      console.error(`Error fetching fort with ID ${id}:`, error);
      throw error;
    }
  },

  // Send message to chat API
  async sendMessage(message: string, context?: any) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, context }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      return result.success ? result.data : result;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  },

  // Search forts
  async searchForts(query: string, filters?: any) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/forts?action=search&query=${query}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      return result.success ? result.data : result;
    } catch (error) {
      console.error('Error searching forts:', error);
      throw error;
    }
  },
};

// Fort interface
export interface Fort {
  id: string;
  name: string;
  location: string;
  coordinates: { lat: number; lng: number };
  distance: string;
  timing: string;
  entryFee: string;
  history: string;
  bestTime: string;
  highlights: string[];
  architecture: string;
  trekDifficulty: string;
  photographyTips: string;
  nearbyAttractions: string[];
  mapLink?: string;
  officialLinks?: { name: string; url: string }[];
  image?: string;
  altitude?: string;
  nearbyHotels?: { name: string; distance: string; price: string }[];
  nearbyRestaurants?: { name: string; cuisine: string; distance: string }[];
  transport?: { bus: string; taxi: string; bike: string };
  // New fields from JSON data
  images?: { main?: string; gallery?: string[] };
  description?: string;
  tags?: string[];
  rating?: number;
  reviews?: number;
  ropewayFee?: string;
  accommodation?: { name: string; price: string; distance: string }[];
}

// Message interface
export interface Message {
  id: number;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

// Get all forts
export async function getAllForts(): Promise<Fort[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/forts?action=all`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result.success ? result.data : result;
  } catch (error) {
    console.error('Error fetching forts:', error);
    throw error;
  }
}

// Get specific fort by ID
export async function getFortById(id: string): Promise<Fort> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/forts/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result.success ? result.data : result;
  } catch (error) {
    console.error(`Error fetching fort ${id}:`, error);
    throw error;
  }
}

// Search forts by query
export async function searchForts(query: string): Promise<Fort[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/forts?action=search&query=${query}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result.success ? result.data : result;
  } catch (error) {
    console.error('Error searching forts:', error);
    throw error;
  }
}

// Get forts for map display
export async function getFortsForMap(): Promise<Fort[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/forts?action=map`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result.success ? result.data : result;
  } catch (error) {
    console.error('Error fetching map data:', error);
    throw error;
  }
}

// Send chat message to AI
export async function sendChatMessage(message: string): Promise<string> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    // Handle both possible response formats
    if (result.success) {
      return result.data?.response || result.data || '';
    }
    return result.response || result.data?.response || '';
  } catch (error) {
    console.error('Error sending chat message:', error);
    throw error;
  }
}