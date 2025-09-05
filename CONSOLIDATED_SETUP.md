# Travel Buddy Bot - Consolidated Next.js Setup

## 🚀 What Changed

This project has been consolidated from a separate frontend + Express backend into a **single Next.js application** using API routes.

## ✨ Benefits

- **Single deployment** - No need for separate backend server
- **Cleaner architecture** - Everything in one codebase
- **Better performance** - No CORS issues or network latency
- **Easier deployment** - Deploy to Vercel with one command
- **Simplified development** - One `npm run dev` command

## 🏗️ New Architecture

```
app/
├── api/                    # Next.js API Routes
│   ├── health/route.ts    # Health check endpoint
│   ├── forts/route.ts     # Forts data API
│   ├── chat/route.ts      # AI chat functionality
│   └── data/route.ts      # Categories & tips API
├── components/             # React components
├── services/               # API service layer
└── ...                     # Other app pages
```

## 🔧 Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in the root directory:

```bash
# AI API Keys (get these from respective platforms)
GEMINI_API_KEY=your_gemini_api_key_here
OPENAI_API_KEY=your_openai_api_key_here

# Optional: Default AI provider
DEFAULT_AI_PROVIDER=gemini
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## 🤖 AI Features

- **Google Gemini** - Primary AI provider (free tier available)
- **OpenAI GPT** - Alternative AI provider (requires credits)
- **Fallback responses** - Works even without API keys

## 📱 API Endpoints

- `GET /api/health` - Health check
- `GET /api/forts` - Get all forts
- `POST /api/forts` - Search/filter forts
- `POST /api/chat` - AI chat with travel guide
- `GET /api/data` - Get categories and tips

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🔄 Migration Notes

- **Old backend**: The `backend/` folder is no longer needed
- **API calls**: All API calls now use relative paths (`/api/*`)
- **Data files**: Static data remains in `public/data/`
- **AI services**: Integrated directly into Next.js API routes

## 🧪 Testing

1. Start the development server: `npm run dev`
2. Visit `http://localhost:3000`
3. Test the travel bot chat functionality
4. Navigate through different pages
5. Test the interactive map

## 📚 Next Steps

- Add more AI providers if needed
- Implement caching for API responses
- Add authentication if required
- Optimize for production deployment
