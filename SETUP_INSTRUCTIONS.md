# Travel Buddy Bot - Setup Instructions

## Project Overview
Travel Buddy Bot is a web application that provides information about Kolhapur forts through an AI-powered chatbot interface. The application consists of:

1. **Frontend**: Next.js React application
2. **Backend**: Node.js Express API server
3. **Database**: JSON-based data storage
4. **AI Services**: Integration with OpenAI and Google Gemini APIs

## Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

## Setup Instructions

### 1. Install Dependencies

Navigate to the project root directory and install frontend dependencies:
```bash
cd d:\travel buddy\travel-buddy-bot
npm install
```

Navigate to the backend directory and install backend dependencies:
```bash
cd d:\travel buddy\travel-buddy-bot\backend
npm install
```

### 2. Configure Environment Variables

In the `backend/.env` file, you'll find:
```env
PORT=5000
# Add your OpenAI API key here to enable OpenAI integration
OPENAI_API_KEY=your_openai_api_key_here
# Add your Google Gemini API key here to enable Gemini integration
GEMINI_API_KEY=your_gemini_api_key_here
```

To use AI features, replace the placeholder values with your actual API keys:
- Get OpenAI API key from: https://platform.openai.com/api-keys
- Get Google Gemini API key from: https://makersuite.google.com/app/apikey

### 3. Start the Application

You have two options to start the application:

#### Option A: Start Frontend and Backend Separately

1. Start the backend server:
```bash
cd d:\travel buddy\travel-buddy-bot\backend
npm start
```

2. In a new terminal, start the frontend:
```bash
cd d:\travel buddy\travel-buddy-bot
npm run dev
```

#### Option B: Start Both Servers Together

```bash
cd d:\travel buddy\travel-buddy-bot
npm run dev:full
```

### 4. Access the Application

Once both servers are running:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### 5. API Endpoints

The backend provides the following API endpoints:

#### Forts Data
- `GET /api/forts` - Get all forts
- `GET /api/forts/:id` - Get specific fort by ID
- `GET /api/forts/search/:query` - Search forts
- `GET /api/forts/map/data` - Get forts data for map display

#### Chat
- `POST /api/chat/message` - Send message to AI chatbot

#### Data
- `GET /api/data/categories` - Get fort categories
- `GET /api/data/tips` - Get travel tips
- `GET /api/data/tips/:category` - Get tips by category

### 6. Features Implemented

1. **Rich Fort Information**:
   - Detailed fort descriptions with history
   - Location coordinates and map links
   - Entry fees and visiting hours
   - Photography tips and best times to visit
   - Nearby hotels and restaurants
   - Transportation options

2. **AI-Powered Chatbot**:
   - Natural language processing with fallback mechanisms
   - Integration with Google Gemini and OpenAI APIs
   - Rule-based responses as fallback

3. **Interactive Map**:
   - Fort locations displayed on map
   - Clickable pins with fort information

4. **Responsive Design**:
   - Mobile-friendly interface
   - Modern UI with Lucide React icons

### 7. Troubleshooting

#### Common Issues

1. **Module not found errors**:
   - Ensure all dependencies are installed with `npm install`
   - Delete `node_modules` and `package-lock.json` and reinstall

2. **Port conflicts**:
   - Change the PORT value in `backend/.env` if port 5000 is in use

3. **API key errors**:
   - Verify your API keys are correctly set in the `.env` file
   - Check that your API keys have proper permissions

#### Testing the Backend

To verify the backend is working, you can test the health endpoint:
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "Travel Buddy Bot API is running"
}
```

### 8. Project Structure

```
travel-buddy-bot/
├── app/                 # Next.js frontend
│   ├── components/      # React components
│   ├── forts/          # Forts page
│   ├── services/       # Frontend services
│   └── ...             # Other frontend files
├── backend/             # Express backend
│   ├── controllers/     # Request handlers
│   ├── data/           # JSON data files
│   ├── models/         # Data models
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   ├── .env            # Environment variables
│   └── server.js       # Express server
├── public/              # Static assets
└── ...                 # Configuration files
```

### 9. Development Notes

1. **Adding New Forts**:
   - Update `backend/data/forts.json` with new fort information
   - Ensure all required fields are included for proper display

2. **Modifying AI Responses**:
   - Update prompt templates in `backend/services/aiService.js`
   - Adjust fallback responses in the rule-based system

3. **Extending API**:
   - Add new routes in `backend/routes/`
   - Implement controllers in `backend/controllers/`
   - Add business logic in `backend/services/`

This documentation provides a comprehensive guide to setting up and running the Travel Buddy Bot application.