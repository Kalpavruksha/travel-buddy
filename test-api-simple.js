// Simple API test
const testAPI = async () => {
  try {
    console.log('🧪 Testing API endpoints...');
    
    // Test health endpoint
    const healthResponse = await fetch('http://localhost:3001/api/health');
    const healthData = await healthResponse.json();
    console.log('✅ Health:', healthData);
    
    // Test forts endpoint
    const fortsResponse = await fetch('http://localhost:3001/api/forts');
    const fortsData = await fortsResponse.json();
    console.log(`✅ Forts: ${fortsData.length} forts loaded`);
    
    // Test data endpoint
    const dataResponse = await fetch('http://localhost:3001/api/data');
    const dataData = await dataResponse.json();
    console.log('✅ Data:', Object.keys(dataData));
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
};

// Run test
testAPI();
