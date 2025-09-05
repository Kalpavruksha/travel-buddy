// Database service for Next.js API routes
const fs = require('fs');
const path = require('path');

// Fort class
class Fort {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.location = data.location;
    this.coordinates = data.coordinates || { lat: 0, lng: 0 };
    this.distance = data.distance;
    this.timing = data.timing;
    this.entryFee = data.entryFee;
    this.history = data.history;
    this.bestTime = data.bestTime;
    this.highlights = data.highlights || [];
    this.architecture = data.architecture;
    this.trekDifficulty = data.trekDifficulty;
    this.photographyTips = data.photographyTips;
    this.nearbyAttractions = data.nearbyAttractions || [];
    this.mapLink = data.mapLink;
    this.officialLinks = data.officialLinks || [];
    this.image = data.image;
    this.altitude = data.altitude;
    // Additional fields for rich responses
    this.images = data.images || {};
    this.description = data.description || '';
    this.tags = data.tags || [];
    this.rating = data.rating || 0;
    this.reviews = data.reviews || 0;
    this.ropewayFee = data.ropewayFee || '';
    this.accommodation = data.accommodation || [];
    this.nearbyHotels = data.nearbyHotels || [];
    this.nearbyRestaurants = data.nearbyRestaurants || [];
    this.transport = data.transport || {};
  }

  // Get fort information as JSON
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      location: this.location,
      coordinates: this.coordinates,
      distance: this.distance,
      timing: this.timing,
      entryFee: this.entryFee,
      history: this.history,
      bestTime: this.bestTime,
      highlights: this.highlights,
      architecture: this.architecture,
      trekDifficulty: this.trekDifficulty,
      photographyTips: this.photographyTips,
      nearbyAttractions: this.nearbyAttractions,
      mapLink: this.mapLink,
      officialLinks: this.officialLinks,
      image: this.image,
      altitude: this.altitude,
      images: this.images,
      description: this.description,
      tags: this.tags,
      rating: this.rating,
      reviews: this.reviews,
      ropewayFee: this.ropewayFee,
      accommodation: this.accommodation,
      nearbyHotels: this.nearbyHotels,
      nearbyRestaurants: this.nearbyRestaurants,
      transport: this.transport
    };
  }

  // Get basic fort information
  getBasicInfo() {
    return {
      id: this.id,
      name: this.name,
      location: this.location,
      coordinates: this.coordinates,
      distance: this.distance,
      timing: this.timing,
      entryFee: this.entryFee,
      bestTime: this.bestTime,
      image: this.image,
      rating: this.rating,
      reviews: this.reviews
    };
  }

  // Get detailed information for rich responses
  getDetailedInfo() {
    return {
      id: this.id,
      name: this.name,
      location: this.location,
      coordinates: this.coordinates,
      distance: this.distance,
      timing: this.timing,
      entryFee: this.entryFee,
      history: this.history,
      bestTime: this.bestTime,
      highlights: this.highlights,
      photographyTips: this.photographyTips,
      mapLink: this.mapLink,
      officialLinks: this.officialLinks,
      image: this.image,
      nearbyHotels: this.nearbyHotels,
      nearbyRestaurants: this.nearbyRestaurants,
      transport: this.transport,
      images: this.images,
      description: this.description,
      tags: this.tags,
      rating: this.rating,
      reviews: this.reviews,
      ropewayFee: this.ropewayFee,
      accommodation: this.accommodation,
      trekDifficulty: this.trekDifficulty
    };
  }
}

class DatabaseService {
  constructor() {
    // Initialize with fort data
    this.forts = this._initializeForts();
  }

  // Initialize fort data from JSON
  _initializeForts() {
    // Read fort data from the JSON file
    try {
      const fortsData = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', 'forts.json'), 'utf8'));
      
      // Convert to Fort objects
      const forts = {};
      fortsData.forEach(fortData => {
        forts[fortData.id] = new Fort(fortData);
      });
      
      return forts;
    } catch (error) {
      console.error('Error initializing forts data:', error);
      return {};
    }
  }

  // Get all forts
  getAllForts() {
    return Object.values(this.forts);
  }

  // Get fort by ID
  getFortById(id) {
    return this.forts[id.toLowerCase()];
  }

  // Search forts by query
  searchForts(query) {
    const searchTerm = query.toLowerCase();
    return Object.values(this.forts).filter(fort => {
      // Check all possible fields for the search term
      return (
        (fort.name && fort.name.toLowerCase().includes(searchTerm)) ||
        (fort.location && fort.location.toLowerCase().includes(searchTerm)) ||
        (fort.description && fort.description.toLowerCase().includes(searchTerm)) ||
        (fort.history && fort.history.toLowerCase().includes(searchTerm)) ||
        (fort.highlights && fort.highlights.some(highlight => 
          highlight && highlight.toLowerCase().includes(searchTerm)
        ))
      );
    });
  }

  // Get forts with coordinates for map display
  getFortsForMap() {
    return Object.values(this.forts).map(fort => ({
      id: fort.id,
      name: fort.name,
      coordinates: fort.coordinates,
      description: fort.description ? fort.description.substring(0, 100) + "..." : "No description available",
      image: fort.image || (fort.images && fort.images.main) || ''
    }));
  }
  
  // Get forts by difficulty
  getFortsByDifficulty(difficulty) {
    const difficultyTerm = difficulty.toLowerCase();
    return Object.values(this.forts).filter(fort => 
      fort.trekDifficulty && fort.trekDifficulty.toLowerCase().includes(difficultyTerm)
    );
  }
  
  // Get featured forts (top 3 by rating)
  getFeaturedForts() {
    return Object.values(this.forts)
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 3);
  }
  
  // Get fort recommendations based on user preferences
  getRecommendations(preferences) {
    // Simple recommendation logic based on trek difficulty preference
    if (preferences && preferences.trekDifficulty) {
      return this.getFortsByDifficulty(preferences.trekDifficulty);
    }
    
    // Default: return all forts
    return Object.values(this.forts);
  }
  
  // Get statistics
  getStatistics() {
    const forts = Object.values(this.forts);
    const totalForts = forts.length;
    
    // Calculate average rating
    const totalRating = forts.reduce((sum, fort) => sum + (fort.rating || 0), 0);
    const averageRating = totalForts > 0 ? (totalRating / totalForts).toFixed(1) : 0;
    
    // Get trek difficulty distribution
    const difficultyCount = {};
    forts.forEach(fort => {
      const difficulty = fort.trekDifficulty || 'Unknown';
      difficultyCount[difficulty] = (difficultyCount[difficulty] || 0) + 1;
    });
    
    return {
      totalForts,
      averageRating: parseFloat(averageRating),
      difficultyDistribution: difficultyCount
    };
  }
}

// Export a singleton instance
const databaseService = new DatabaseService();
module.exports = databaseService;
module.exports.databaseService = databaseService;