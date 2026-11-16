# Nanda Dairy Farm V11.1 — Small AI Girl Icon

This version is based on the complete V11 Interactive + AI project. It changes only `src/style.css` by appending responsive launcher styles for the actual `.farm-ai-launcher` element. It hides the text label next to the avatar, leaving a compact circular photo button. The AI chat panel, Workers AI route, keywords, video and products are unchanged.

- Desktop: 42 × 42 px
- Tablet up to 900px: 40 × 40 px
- Mobile up to 700px: 36 × 36 px
- Small mobile up to 380px: 32 × 32 px

## Deploy

Extract over your existing Git repository without deleting `.git`, then run:

```sh
npm install
npm run build
git add .
git commit -m "Make AI assistant avatar compact"
git push
```

Confirm Cloudflare builds and deploys the intended `dairy-9-10` Worker.
