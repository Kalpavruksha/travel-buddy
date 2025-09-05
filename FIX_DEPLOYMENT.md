# Fixing React Version Conflict for Vercel Deployment

## Issue Analysis
The error shows that Vercel is trying to install React 19.1.0 despite your package.json specifying React 18.3.1. This is likely due to:

1. Cached dependencies in package-lock.json
2. Vercel's build cache
3. A dependency that's requesting React 19

## Solution Steps

### Step 1: Clean Local Dependencies
Delete the package-lock.json and node_modules directory:

```bash
# On Windows
rmdir /s /q node_modules
del package-lock.json

# On Mac/Linux
rm -rf node_modules package-lock.json
```

### Step 2: Reinstall Dependencies
```bash
npm install
```

### Step 3: Verify React Version
Check that the installed React version is 18.3.1:

```bash
npm list react
```

You should see:
```
travel-buddy-bot@0.1.0
└── react@18.3.1
```

### Step 4: Commit Changes
```bash
git add package.json package-lock.json
git commit -m "fix: resolve React version conflict for Vercel deployment"
git push origin main
```

### Step 5: Clear Vercel Cache (If Needed)
If the issue persists after deploying:

1. Go to your Vercel dashboard
2. Select your project
3. Go to the "Settings" tab
4. Click "Git" in the sidebar
5. Scroll down to "Ignored Build Step"
6. Add `package-lock.json` to the ignored files
7. Or alternatively, in your project settings, go to "Build & Development Settings" and add this to the "Ignored Build Step":
   ```bash
   echo "Vercel Cache Cleared"
   ```

## Alternative Solution: Force Legacy Peer Dependencies

If the above doesn't work, you can force npm to accept the peer dependency mismatch:

```bash
npm install --legacy-peer-deps
```

Then commit and push the changes.

## Why This Happens

Some packages like `framer-motion` have peer dependencies that allow both React 18 and 19:
```
"peerOptional": {
  "react": "^18.0.0 || ^19.0.0",
  "react-dom": "^18.0.0 || ^19.0.0"
}
```

However, `react-leaflet` specifically requires React 18:
```
"peer": {
  "react": "^18.0.0"
}
```

This creates a conflict that npm cannot resolve automatically.

## Verification

After deployment, verify that:
1. The map functionality works correctly
2. The chatbot responds properly
3. All interactive elements function as expected