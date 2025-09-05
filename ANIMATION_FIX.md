# Travel Animation Fix

## Issue
The light-home page was failing to build because it was trying to import a Lottie animation file (`travel.json`) that didn't exist in the `/app/animations/` directory.

## Fix
Created a simple travel animation JSON file that includes:
1. A moving airplane icon
2. Two animated clouds moving in opposite directions
3. Simple vector shapes that work well with the travel theme

## File Created
- `/app/animations/travel.json` - Lottie animation file with airplane and cloud animations

## Verification
The Next.js build now completes successfully:
```bash
npm run build
```

## Animation Details
The animation includes:
- A white airplane moving from bottom to top of the canvas
- Two white clouds moving horizontally across the canvas in opposite directions
- Simple vector shapes for optimal performance
- Looping animation (180 frames at 30fps)

This provides a lightweight alternative to video while maintaining visual interest for the lightweight homepage implementation.