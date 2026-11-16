# Video troubleshooting

1. Verify video: https://YOUR-WORKER.workers.dev/videos/dairy-farm-v5.mp4
2. Verify status: https://YOUR-WORKER.workers.dev/?videoDebug=1
3. DevTools > Network: filter `mp4` and confirm HTTP 200, content type `video/mp4` (and no HTML rewrite).
4. DevTools > Console: check `[Nanda Dairy video]` message.
5. In Cloudflare Builds, use Build command `npm run build`, Deploy command `npx wrangler deploy`.
6. If you see the old page, verify you pushed to the exact branch connected to the Worker and try a private/incognito window.

The bundled demo is an animated cartoon, not live-action footage. For realistic dairy footage replace `public/videos/dairy-farm-v5.mp4` with your own licensed H.264 MP4.

Autoplay may still be limited by browser data saver, battery restrictions and reduced-motion preferences.
