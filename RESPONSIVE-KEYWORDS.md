# Responsive floating dairy labels

This version fixes the seven hero keywords (Fresh Cow Milk, Buffalo Milk, Homemade Curd, Fresh Paneer, Fresh Ghee, Reports, Billing).

- Desktop >1050px: spaced floating oval badges as in the visual reference.
- Tablet 601–1050px: flex-wrap layout instead of arbitrary absolute positioning.
- Mobile <=600px: compact wrapping badges sized to the screen; no overlap with the headline card.
- Video and compact contact modal are preserved from V9.1.

## Deploy

Copy files into your Git repository (preserve `.git`), run `npm install && npm run build`, and commit/push. Cloudflare build command: `npm run build`; deploy command: `npx wrangler deploy`.
