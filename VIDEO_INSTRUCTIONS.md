# Video Background Instructions

## Required Video Files

To implement the video backgrounds as designed, you need to add the following video files to the `/public/videos/` directory:

### 1. Homepage Background
- **File**: `/public/videos/travel-bg.mp4`
- **Source**: Clouds over mountains (cinematic, calm) - Pexels
- **Link**: https://www.pexels.com/video/aerial-view-of-morning-clouds-over-mountain-29393032/

### 2. Forts Page Background
- **File**: `/public/videos/forts-bg.mp4`
- **Source**: Indian forts (browse many fort clips, some 4K) - Pixabay
- **Link**: https://pixabay.com/videos/search/indian%20forts/

## How to Download and Use

1. Open each link above
2. Click **Download** (choose **MP4**; 1080p is plenty for the web)
3. Put the files in your app at:
   - `/public/videos/travel-bg.mp4`
   - `/public/videos/forts-bg.mp4`

## License Notes (safe for commercial use)

- **Pexels**: Free for personal & commercial use; attribution not required
- **Pixabay**: Free under Pixabay License; avoid selling the clip "as-is"

## Implementation Details

The video backgrounds have been implemented in the following pages:
- Homepage (`/app/page.tsx`) - Uses clouds/mountains video
- Forts page (`/app/forts/page.tsx`) - Uses Indian forts video

Other pages use the lightweight animated background instead of videos to keep them light and fast.

If any of these videos don't open due to network blocks, go to the site's main video page and search:
- "mountain clouds"
- "travel"
- "fort"