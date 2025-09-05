const http = require('http');

// Test if backend API is running and fetch fort data
const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/forts/panhala',
  method: 'GET'
};

console.log('Testing backend API...');

const req = http.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  console.log(`Headers: ${JSON.stringify(res.headers)}`);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const result = JSON.parse(data);
      console.log('Response:', JSON.stringify(result, null, 2));
      
      if (result.success && result.data) {
        console.log('\\n✅ Successfully fetched fort data');
        console.log(`Fort Name: ${result.data.name}`);
        console.log(`Location: ${result.data.location}`);
        console.log(`Image: ${result.data.image || 'No image provided'}`);
        console.log(`Map Link: ${result.data.mapLink || 'No map link provided'}`);
      } else {
        console.log('\\n❌ Error in response:', result.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Error parsing JSON:', error);
      console.log('Raw response:', data);
    }
  });
});

req.on('error', (error) => {
  console.error('Error connecting to backend:', error.message);
  console.log('Make sure the backend server is running on port 5000');
});

req.end();