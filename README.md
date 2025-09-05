This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Project Structure

This project includes both frontend and backend functionality in a single Next.js application:

- **Frontend**: React components in the `app` directory
- **Backend**: API routes in the `app/api` directory
  - `app/api/chat/route.ts`: Chat functionality with AI integration
  - `app/api/forts/route.ts`: Fort data management
  - `app/api/data/route.ts`: Travel tips and category data

## Video Backgrounds

This project implements video backgrounds on key pages for enhanced visual appeal:

- **Homepage**: Clouds/mountains video background
- **Forts Page**: Indian forts video background
- **Other Pages**: Lightweight animated background

To use the video backgrounds, you need to download the required MP4 files and place them in the `/public/videos/` directory. See `VIDEO_INSTRUCTIONS.md` for detailed download instructions.

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
GEMINI_API_KEY=your_google_gemini_api_key
OPENAI_API_KEY=your_openai_api_key (optional)
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

### Vercel Deployment Steps

1. Push your code to a GitHub repository
2. Log in to Vercel and create a new project
3. Import your GitHub repository
4. Add your environment variables in the Vercel project settings:
   - `GEMINI_API_KEY`
   - `OPENAI_API_KEY` (optional)
5. Deploy!

The application will be deployed with both frontend and backend functionality in a single deployment.