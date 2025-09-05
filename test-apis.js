// Test script to verify API endpoints
const testAPIs = async () => {
  const baseURL = 'http://localhost:3000';
  
  console.log('🧪 Testing Travel Buddy Bot APIs...\n');
  
  try {
    // Test 1: Health Check
    console.log('1️⃣ Testing Health Check...');
    const healthResponse = await fetch(`${baseURL}/api/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Health Check:', healthData);
    
    // Test 2: Forts Data
    console.log('\n2️⃣ Testing Forts API...');
    const fortsResponse = await fetch(`${baseURL}/api/forts`);
    const fortsData = await fortsResponse.json();
    console.log(`✅ Forts API: ${fortsData.length} forts loaded`);
    console.log('Sample fort:', fortsData[0]?.name || 'No forts found');
    
    // Test 3: Data API
    console.log('\n3️⃣ Testing Data API...');
    const dataResponse = await fetch(`${baseURL}/api/data`);
    const dataData = await dataResponse.json();
    console.log('✅ Data API:', Object.keys(dataData));
    
    // Test 4: Chat API (without API key - should use fallback)
    console.log('\n4️⃣ Testing Chat API...');
    const chatResponse = await fetch(`${baseURL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Tell me about Panhala Fort' })
    });
    const chatData = await chatResponse.json();
    console.log('✅ Chat API:', chatData.response ? 'Response received' : 'Error');
    
    // Test 5: Itinerary API (without API key - should use fallback)
    console.log('\n5️⃣ Testing Itinerary API...');
    const itineraryResponse = await fetch(`${baseURL}/api/itinerary`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tripDuration: 3,
        travelers: 2,
        interests: { history: true, trekking: true }
      })
    });
    const itineraryData = await itineraryResponse.json();
    console.log('✅ Itinerary API:', itineraryData.itinerary ? 'Itinerary generated' : 'Error');
    
    console.log('\n🎉 All API tests completed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
};

// Run tests if this file is executed directly
if (typeof window === 'undefined') {
  testAPIs();
}

module.exports = { testAPIs };
