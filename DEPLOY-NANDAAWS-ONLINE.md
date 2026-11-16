# Publish at nandaaws.online

1. Update `src/config.js` and test locally (`npm install && npm run build`).
2. Commit and push to GitHub.
3. Cloudflare Workers → `nanda-dairy-adv` (or your current Worker) → Settings → Builds: Build `npm run build`, deploy `npx wrangler deploy`, root `/`.
4. Confirm the Worker URL loads and `/videos/dairy-farm-v5.mp4` returns video, not HTML.
5. In Cloudflare Workers → Settings → Domains & Routes add `nandaaws.online` as a **Custom Domain** after the domain is active in Cloudflare DNS.
6. Preserve unrelated DNS/subdomains. Test HTTPS, cart and images before stopping EC2.

The `wrangler.jsonc` name can be changed to your existing Worker name to prevent creating a new Worker. This project defaults to `nanda-dairy-ad`, matching your most recent screenshot. Change the `name` in `wrangler.jsonc` if your actual Worker is named differently.
