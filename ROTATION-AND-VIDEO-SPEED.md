# V9.6 — rotating transparent keywords and 0.5× cow video

The previous V9.5 project had `animation: none !important` on `.dairy-pill` and fixed seven badge positions. V9.6 rotates the seven-badge container in **42 seconds per revolution** and counter-rotates each badge so the text stays upright. The original transparent oval style is unchanged.

Both the hero background video and the optional round video have `playbackRate = 0.5` (half the original playback speed). The 20.16-second file therefore runs for about 40.32 seconds per loop. This works in Chromium browsers; some platforms may use alternative playback restrictions.

## Deploy
Copy the complete project into your existing Git repository, keeping `.git`, then run:

```bash
npm install
npm run build
git add .
git commit -m "Rotate transparent keyword ring and slow cows to half speed"
git push origin main
```

Cloudflare Workers build command: `npm run build`; deploy command: `npx wrangler deploy`.

If you prefer to change just two files, copy `src/style.css` and `src/main.js` into your existing V9.5 repository.
