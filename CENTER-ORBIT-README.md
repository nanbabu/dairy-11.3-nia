# Nanda Dairy V10 - stable center orbit

Changes: `src/style.css` and `src/main.js` only.

- The orbit container stays at the same fixed point in the homepage hero and NEVER rotates.
- The seven transparent oval badges orbit clockwise around it with equal angular spacing. Their text stays horizontal and upright.
- All badges remain closer to the middle, including laptops and narrow displays.
- The central translucent play/pause button controls the background cow film.
- The cow background video speed remains at 0.5x.
- A reduced-motion browser/OS preference intentionally freezes the orbit for accessibility.

Deploy: `npm install && npm run build`, followed by `git add . && git commit -m "Fix real centered keyword orbit" && git push origin main`.

To check laptop reduced motion, Windows Settings > Accessibility > Visual effects > Animation effects, and browser/OS accessibility settings.
