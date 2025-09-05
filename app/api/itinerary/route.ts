import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import OpenAI from 'openai';
import { readFileSync } from 'fs';
import { join } from 'path';

// Initialize AI clients
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export async function POST(request: Request) {
  try {
    const { tripDuration, travelers, interests, aiProvider = 'gemini' } = await request.json();
    
    if (!tripDuration || !travelers || !interests) {
      return NextResponse.json(
        { error: 'Missing required parameters: tripDuration, travelers, interests' },
        { status: 400 }
      );
    }

    // Read forts data at runtime
    const fortsPath = join(process.cwd(), 'public', 'data', 'forts.json');
    const fortsData = JSON.parse(readFileSync(fortsPath, 'utf8'));

    let response;
    
    if (aiProvider === 'gemini' && process.env.GEMINI_API_KEY) {
      // Use Google Gemini for itinerary generation
      const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
      
      const prompt = `Create a detailed, personalized travel itinerary for exploring Kolhapur forts in Maharashtra, India.

Travel Details:
- Duration: ${tripDuration} days
- Number of travelers: ${travelers}
- Interests: ${Object.keys(interests).filter(key => interests[key]).join(', ')}

Available Forts: ${fortsData.map((fort: any) => `${fort.name} (${fort.distance}, ${fort.timing})`).join(', ')}

Requirements:
- Create a day-by-day itinerary with specific timings
- Include travel time between locations
- Suggest local food stops and accommodation
- Consider the travelers' interests
- Include practical tips and costs
- Make it realistic and achievable
- Include specific fort highlights and historical context

Format the response as a structured JSON with this exact structure:
{
  "summary": "Brief overview of the trip",
  "days": [
    {
      "day": 1,
      "title": "Day title",
      "activities": ["Activity 1", "Activity 2"],
      "highlights": ["Highlight 1", "Highlight 2"],
      "travelTime": "X hours",
      "accommodation": "Accommodation details",
      "food": "Food recommendations",
      "costs": "Estimated costs for the day"
    }
  ],
  "totalCost": "Total estimated cost",
  "tips": ["Tip 1", "Tip 2"],
  "packingList": ["Item 1", "Item 2"]
}

Keep the response focused and practical.`;
      
      // Retry logic for handling API overload
      let retries = 3;
      while (retries > 0) {
        try {
          const result = await model.generateContent(prompt);
          // Fixed response extraction method
          const responseText = result.response.candidates?.[0]?.content?.parts?.[0]?.text || "";
          
          // Try to extract JSON from the response
          try {
            // More robust JSON extraction
            const jsonStart = responseText.indexOf('{');
            const jsonEnd = responseText.lastIndexOf('}');
            if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
              const jsonString = responseText.substring(jsonStart, jsonEnd + 1);
              response = JSON.parse(jsonString);
              break; // Success, exit retry loop
            } else {
              if (retries > 1) {
                console.log(`Failed to parse JSON, retrying... (${retries - 1} attempts left)`);
                await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds before retry
                retries--;
                continue;
              }
              response = { error: 'Could not parse AI response', rawResponse: responseText };
            }
          } catch (parseError) {
            console.error('JSON Parse Error:', parseError);
            if (retries > 1) {
              console.log(`JSON Parse Error, retrying... (${retries - 1} attempts left)`);
              await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds before retry
              retries--;
              continue;
            }
            response = { error: 'Failed to parse AI response', rawResponse: responseText };
          }
        } catch (apiError: any) {
          if (apiError.message?.includes('503 Service Unavailable') && retries > 1) {
            console.log(`Gemini API overloaded, retrying... (${retries - 1} attempts left)`);
            await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds before retry
            retries--;
          } else {
            throw apiError;
          }
        }
      }
      
    } else if (aiProvider === 'openai' && process.env.OPENAI_API_KEY) {
      // Use OpenAI for itinerary generation
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are an expert travel planner specializing in Kolhapur forts. Create detailed, personalized itineraries based on user preferences. Always respond with valid JSON.`
          },
          {
            role: 'user',
            content: `Create a ${tripDuration}-day itinerary for ${travelers} travelers interested in ${Object.keys(interests).filter(key => interests[key]).join(', ')}. Include specific fort details, timings, and practical information. Respond with valid JSON only.`
          }
        ],
        max_tokens: 1000,
        temperature: 0.7
      });
      
      try {
        const content = completion.choices[0].message.content || '{}';
        // Try to extract JSON from the response
        const jsonStart = content.indexOf('{');
        const jsonEnd = content.lastIndexOf('}');
        if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
          const jsonString = content.substring(jsonStart, jsonEnd + 1);
          response = JSON.parse(jsonString);
        } else {
          response = { error: 'Could not parse OpenAI response', rawResponse: content };
        }
      } catch (parseError) {
        console.error('OpenAI JSON Parse Error:', parseError);
        response = { error: 'Failed to parse OpenAI response' };
      }
      
    } else {
      // Fallback: Generate a basic itinerary using the available data
      response = generateFallbackItinerary(tripDuration, travelers, interests);
    }
    
    return NextResponse.json({ 
      itinerary: response,
      aiProvider,
      timestamp: new Date().toISOString()
    });
    
  } catch (error: any) {
    console.error('Itinerary generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate itinerary', details: error.message || 'Unknown error occurred' },
      { status: 500 }
    );
  }
}

// Fallback itinerary generator
function generateFallbackItinerary(duration: number, travelers: number, interests: any) {
  // Use sample fort data for fallback
  const sampleForts = [
    { name: "Panhala Fort", distance: "20 km from Kolhapur", highlights: ["Teen Darwaza", "Sajja Kothi", "Historical significance"] },
    { name: "Pratapgad Fort", distance: "32 km from Kolhapur", highlights: ["Afzal Khan's tomb", "Scenic views", "Memorial chhatri"] },
    { name: "Raigad Fort", distance: "2.5 hours from Kolhapur", highlights: ["Coronation site", "Takmak Tok", "Maha Darwaza"] }
  ];
  
  const selectedForts = sampleForts.slice(0, Math.min(duration, sampleForts.length));
  
  const days = selectedForts.map((fort, index) => ({
    day: index + 1,
    title: `${fort.name} Exploration`,
    activities: [
      `Morning: Travel to ${fort.name}`,
      `10:00 AM: Explore ${fort.name}`,
      `1:00 PM: Local lunch`,
      `3:00 PM: Continue exploring`,
      `6:00 PM: Return to accommodation`
    ],
    highlights: fort.highlights,
    travelTime: fort.distance,
    accommodation: "Local hotel or homestay",
    food: "Local Kolhapuri cuisine",
    costs: `₹${200 + (travelers * 100)} per person`
  }));
  
  return {
    summary: `${duration}-day fort exploration in Kolhapur region`,
    days,
    totalCost: `₹${duration * (200 + travelers * 100)}`,
    tips: [
      "Best time to visit: October to March",
      "Carry water and comfortable shoes",
      "Book accommodation in advance",
      "Respect local customs and heritage sites"
    ],
    packingList: [
      "Comfortable walking shoes",
      "Water bottle",
      "Camera",
      "Light jacket",
      "Sunscreen and hat"
    ]
  };
}