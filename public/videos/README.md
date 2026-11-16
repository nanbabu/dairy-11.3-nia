# Required homepage background video

The video file is deliberately NOT bundled in this source ZIP. Before deployment run:

```bash
sudo apt update && sudo apt install -y curl ffmpeg
bash scripts/setup-video.sh
```

The script downloads a CC0 Wikimedia Commons cattle video and converts the first 12 seconds to a muted browser-friendly H.264 MP4 named `public/videos/dairy-farm.mp4`.
Source: https://commons.wikimedia.org/wiki/File:Video_Cattle_Sep26.webm

Then commit the generated video to GitHub. Vite copies public/videos/dairy-farm.mp4 to dist/videos/dairy-farm.mp4, and Cloudflare Workers serves it at `https://YOUR_DOMAIN/videos/dairy-farm.mp4`.

Test the direct URL in a browser. If it is 404, the video did not get committed/deployed.

The theme still photos and content work even when the video is not present; they are the fallback.
