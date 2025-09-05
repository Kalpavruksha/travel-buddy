import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: Request) {
  try {
    const { message, context } = await request.json();
    
    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Generate AI response using the existing aiService logic
    let response = '';
    
    try {
      // Use Google Gemini with more dynamic prompts
      // Updated to use available model gemini-2.5-flash
      const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
      
      // Create a more dynamic and contextual prompt
      const dynamicPrompt = `You are an expert travel guide for Kolhapur, Maharashtra, India, specializing in forts, history, and local experiences.

Context: The user is asking: "${message}"
Additional context: ${JSON.stringify(context || {})}

Instructions:
- Provide unique, detailed responses based on the specific question
- Include practical travel tips, historical facts, and local insights
- If asking about forts, mention specific details about Panhala, Pratapgad, Raigad, Vishalgad, Bavda, etc.
- If asking about timing, consider seasons and weather
- If asking about food, mention local Kolhapuri cuisine
- Keep responses informative but under 250 words
- Make each response unique and contextual
- Include specific names, distances, and practical information

Please provide a helpful, unique response:`;
      
      console.log('Calling Gemini API...');
      const result = await model.generateContent(dynamicPrompt);
      // Fixed response extraction method with proper type checking
      response = result.response.candidates?.[0]?.content?.parts?.[0]?.text || "";
      console.log('Gemini API response successful');
    } catch (geminiError) {
      console.error('Gemini API error:', geminiError);
      response = generateFallbackResponse(message);
    }
    
    return NextResponse.json({ 
      success: true,
      data: { 
        response,
        timestamp: new Date().toISOString()
      }
    });
    
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat request' },
      { status: 500 }
    );
  }
}

// Enhanced fallback response generator
function generateFallbackResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('fort') && lowerMessage.includes('location')) {
    return `Here are the key fort locations in the Kolhapur region:

🏰 **Panhala Fort**: 20 km from Kolhapur city, easily accessible by road
🏰 **Pratapgad Fort**: 32 km from Kolhapur, located in Satara district  
🏰 **Raigad Fort**: 120 km from Kolhapur (2.5 hours drive), Maratha Empire capital
🏰 **Vishalgad Fort**: 80 km from Kolhapur, known for its strategic location
🏰 **Bavda Fort**: 45 km from Kolhapur, offers panoramic views

All forts are well-connected by road. Panhala is the closest and most accessible for day trips.`;
  }
  
  if (lowerMessage.includes('photography') || lowerMessage.includes('photo')) {
    return `📸 **Best Photography Spots at Kolhapur Forts:**

**Panhala Fort**: 
- Teen Darwaza (Three Gates) at sunrise
- Sajja Kothi viewpoint for panoramic shots
- Sunset from the western ramparts

**Pratapgad Fort**:
- Aerial view from the main entrance
- Memorial chhatri with valley backdrop
- Bhavani temple architecture

**Raigad Fort**:
- Coronation site with historical significance
- Takmak Tok cliff edge
- Maha Darwaza entrance

**Best Times**: Early morning (6-8 AM) and golden hour (5-7 PM) for optimal lighting.`;
  }
  
  if (lowerMessage.includes('history') || lowerMessage.includes('shivaji')) {
    return `🏛️ **Historical Significance of Kolhapur Forts:**

**Panhala Fort (1178 AD)**: Built by Shilahara dynasty, later strengthened by Chhatrapati Shivaji Maharaj. It was his favorite fort and served as a strategic military base during the Maratha Empire.

**Pratapgad Fort (1656 AD)**: Built by Shivaji, famous for the historic 1659 meeting with Afzal Khan, which resulted in Afzal Khan's defeat and death.

**Raigad Fort**: Capital of the Maratha Empire under Shivaji. Site of his coronation in 1674 as Chhatrapati (Emperor).

These forts played crucial roles in establishing Maratha supremacy in the Deccan region.`;
  }
  
  // Default response
  const fallbackResponses = [
    `I'm your travel guide for Kolhapur! I can help you with detailed information about local forts, history, and travel tips. Please ask me specific questions about forts like Panhala, Pratapgad, or Raigad, and I'll provide unique insights.`,
    `Welcome to Kolhapur Forts Explorer! I'm here to help you discover the rich history and beauty of forts like Panhala, Pratapgad, and Raigad. Ask me about specific attractions, best times to visit, or travel planning.`,
    `Hello! I'm your Kolhapur travel companion. I can guide you through the magnificent forts, share historical stories, and help plan your perfect trip. What would you like to know about?`
  ];
  
  const randomIndex = Math.floor(Math.random() * fallbackResponses.length);
  return fallbackResponses[randomIndex];
}