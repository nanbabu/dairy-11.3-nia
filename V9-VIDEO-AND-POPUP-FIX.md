# V9.1 — video visibility + compact contact popup

Changes from `nanda-dairy-reference-design-v9-complete`:

- Corrected hero video stacking so the MP4 is visible above its poster and below the labels and translucent content panel.
- Home video pauses when visitors scroll away and resumes when they return, subject to browser muted autoplay policy.
- Compact contact popup: maximum 410px wide desktop, 350px mobile; large side photograph hidden; all contact fields and WhatsApp action preserved.
- No changes to products, prices, cart, themes or payment configuration.

## Deploy

Keep the existing `.git` folder in your repository. Copy these project files over it, then:

```bash
npm install
npm run build
ls -lh dist/videos/dairy-farm-v5.mp4
git add .
git commit -m "Fix V9 homepage video and compact contact popup"
git push origin main
```

Cloudflare Workers: Build command `npm run build`; deploy command `npx wrangler deploy`.

## Debugging

Check `https://YOUR_WORKER.workers.dev/videos/dairy-farm-v5.mp4` directly. The browser should receive `video/mp4`, not a fallback HTML page. In DevTools Network, check its status and mime type. Open `?videoDebug=1` to see playback messages. Muted autoplay is best-effort and can be disabled by browser/accessibility preferences.
