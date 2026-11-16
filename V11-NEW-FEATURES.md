# Nanda Dairy Farm V11: clickable products & website AI assistant

- Every rotating hero keyword is now clickable. Opens concise detail popup, why a visitor might choose it and a fair, non-invented comparison.
- The Good Stuff product photos open a detailed popup. Shopping cart buttons continue working.
- New illustrated lady avatar bottom right opens Nanda Farm Assistant chatbot.
- Uses Cloudflare Workers AI binding (`ai.binding=AI`) on `/api/chat`; handles responses on the Worker, no browser API key.
- If AI fails or is not configured, the browser switches to clearly labeled local site-guide answers. The chatbot has NO access to real-time stock, live pricing, certifications, personal orders or delivery details.
- Before publishing: replace placeholder contact phone/location/hours and demo prices in `src/config.js`. Test AI on Cloudflare; Workers AI may incur charges or limits per your Cloudflare plan.
- Previous V10.1 orbit sizes/JS positions, 42-second orbit, transparent badges, yellow play button and 0.5x video are retained.

Deploy to your existing GitHub-connected Cloudflare Worker, making sure `npm run build` and `npx wrangler deploy` remain set.

The Wrangler Worker name is set to `dairy-9-10`, based on your latest Cloudflare deployment page. If your current Worker differs, adjust `wrangler.jsonc` before deploying so you do not create or overwrite the wrong Worker.
