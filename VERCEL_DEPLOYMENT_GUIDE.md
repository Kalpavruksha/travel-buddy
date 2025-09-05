# Vercel Deployment Guide for Travel Buddy

## Prerequisites

1. A [Vercel account](https://vercel.com)
2. GitHub, GitLab, or Bitbucket account (for Git integration)
3. API keys for the services used in the application

## Deployment Steps

### 1. Prepare Your Repository

Make sure your code is pushed to a Git repository (GitHub, GitLab, or Bitbucket).

### 2. Import Project to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your Git repository or upload files directly
4. Vercel will automatically detect it's a Next.js project

### 3. Configure Project Settings

Vercel should automatically detect the following settings:
- Framework: Next.js
- Build Command: `next build`
- Output Directory: `.next`
- Development Command: `next dev`

### 4. Set Environment Variables

In your Vercel project settings, go to the "Environment Variables" section and add:

```
GEMINI_API_KEY=your_actual_gemini_api_key
OPENAI_API_KEY=your_actual_openai_api_key (optional)
```

Note: You can also set these through the Vercel CLI or dashboard after deployment.

### 5. Deploy

Click "Deploy" and Vercel will:
1. Clone your repository
2. Install dependencies
3. Build the Next.js application
4. Deploy to a preview URL

### 6. Configure Production Domain (Optional)

After successful deployment, you can:
1. Add a custom domain in the project settings
2. Configure DNS settings as prompted
3. Enable automatic HTTPS

## Environment Variables

The application requires the following environment variables:

| Variable | Required | Description |
|----------|----------|-------------|
| GEMINI_API_KEY | Yes | Google Generative AI API key for chat functionality |
| OPENAI_API_KEY | No | OpenAI API key (optional, for alternative AI responses) |

## File Structure for Vercel

Your project is already structured correctly for Vercel deployment:
- Next.js pages in the `app` directory
- API routes in `app/api`
- Static assets in `public`
- Environment variables in Vercel dashboard

## Troubleshooting

### Common Issues

1. **Missing Environment Variables**
   - Ensure all required API keys are set in Vercel dashboard
   - Check that variable names match exactly

2. **Build Failures**
   - Check the build logs in Vercel dashboard
   - Ensure all dependencies are in package.json
   - Verify TypeScript compilation

3. **API Route Issues**
   - All API routes have been converted from Express to Next.js API routes
   - Check that the database service is properly reading JSON files

### Checking Deployment Status

You can check your deployment status and logs in the Vercel dashboard or use the Vercel CLI:

```bash
npm install -g vercel
vercel login
vercel --prod
```

## Additional Notes

- The application uses serverless functions for API routes
- All data is read from JSON files in the `public/data` directory
- Video files are served from `public/videos`
- The application should work without any additional server configuration

## Support

If you encounter any issues during deployment:
1. Check the Vercel documentation: https://vercel.com/docs
2. Review the build logs in your Vercel dashboard
3. Ensure all environment variables are properly set