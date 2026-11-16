# Nanda Dairy Farm V11.3 — Nia Narrated Product Tour

The **existing yellow center play button** in the rotating keyword circle now opens a small semi-transparent modal with a 1 minute 57 second **pre-recorded MP4 English narration**. The presentation shows the original Nia avatar, with professionally worded explanations of four listed products, ghee enquiries, the example milk discount, reports/billing and website features. Video and spoken narration are generated synthetically; it is **not** a realistic lip-synced avatar or a live AI-generated response.

- Click the center Play button to open and start the narrated tour. Native browser video controls support pause, seek, volume, replay and fullscreen; X, Escape or backdrop close and reset it.
- The background cow video remains at 0.5x; orbiting keyword animation, Nia's small bottom-right chat avatar, keyword/product details and shopping cart remain untouched.
- Modal has translucent background; the MP4 video slides themselves are opaque as ordinary MP4 does not support an alpha channel in standard browser playback.
- Prices in `src/config.js`, current contact details and 5% example discount in `src/pricing.js` must be updated/confirmed before publishing.
- Nia illustration is the **same** `public/images/farm-assistant.png` from V11.2 / V11.1. Voice is synthetic English generated locally; it is not a natural human recording.

## Deployment

Run `npm install`, `npm run build`, then `git add . && git commit -m "Add Nia narrated product tour" && git push`.

New assets: `public/videos/nia-product-tour.mp4`, `public/images/nia-tour-poster.png`. Source edits: `src/main.js`, `src/style.css`.
