# Nanda Dairy Farm V11.2 — Nia and milk-volume offer

- Chat assistant is named **Nia** in launcher, chat header, welcome message, and Cloudflare AI prompt.
- The Good Stuff: **tap a product photo** to see its sample price and product details. Product-card price row now shows a photo tap hint instead of an amount.
- Example promotional rule: **5% off milk subtotal if combined cow + buffalo milk quantity is MORE THAN 5 litres**. 5 L = no discount, 6 L = discount. Curd/paneer are not eligible. Quantities are counted in 1-litre units.
- Cart, WhatsApp order, and Cloudflare server-side Razorpay amount all use shared `src/pricing.js` to avoid client/server total mismatch.
- Edit `VOLUME_DISCOUNT_RATE` in `src/pricing.js` to your actual approved rate; 0.05 means 5%. **Verify all sample product prices and promotional terms with the farm owner before live orders.**
- Retains existing fixed-center keyword rotation, transparent appearance, small avatar, yellow play button and half-speed video.

Deploy: npm install; npm run build; git add .; git commit -m "Name assistant Nia and add milk-volume offer"; git push.
