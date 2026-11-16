# Nanda Dairy Farm — Premium Reference Edition V9

A fully functional Vite + Cloudflare Workers dairy website built to closely match the user-approved design mockup: rounded warm cream navigation, floating product keyword pills, a wide beige glass headline panel, and golden calls to action over a muted autoplay cow video.

## Run locally

```bash
npm install
npm run dev
```

## Deploy

Cloudflare Workers connected to GitHub: **Build command** `npm run build`, **Deploy command** `npx wrangler deploy`, root `/`.

Push the whole extracted project into your existing GitHub repository (preserve its `.git` directory). Cloudflare rebuilds on push.

## Check the video

The provided H.264 MP4 is `public/videos/dairy-farm-v5.mp4`, approximately 20 seconds. Open `/videos/dairy-farm-v5.mp4` on your deployed site to test. Browser autoplay is muted; reduced-motion settings show a cow photo instead. The video is an AI animated cow scene, not actual recorded farm footage.

## Features

- Seven scattered keyword labels: Fresh Cow Milk, Buffalo Milk, Homemade Curd, Fresh Paneer, Fresh Ghee, Reports, Billing. Reports and Billing are visual badges, not operational dashboards.
- Ten selectable theme presets; photos and accents outside the reference-style hero change with themes.
- Product list, cart and WhatsApp enquiry.
- Optional Razorpay integration **disabled by default**; never accept live payments until you've configured credentials, persistence and webhooks.
- Auto-open contact popup once per browser session.

## Update real business details

Edit `src/config.js` to update **demo** prices, contact number, address and business hours. The website images are stock photography; replace them with licensed photos of your own farm where possible.

`src/main.js`: homepage and interactions. `src/style.css`: visual appearance. `src/themes.js`: themes. `worker/index.js`: payment API (optional).


## V9.4: equal-spacing update
See `KEYWORD-PLACEMENT-FIX.md`. Oval labels retained, arranged in a circular pattern.


## V9.6 update

The transparent oval keywords rotate in a 42-second circular orbit while their text stays upright. The homepage cow video and circular video play at **0.5× speed**. See `ROTATION-AND-VIDEO-SPEED.md`.
