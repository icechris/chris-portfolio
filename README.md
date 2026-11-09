# Christian Duodu Portfolio

Complete Next.js portfolio with 20 web/technical projects, CV download, 39 campaign designs and seven motion videos.

## Run locally
Requires Node.js 22 or newer.

```bash
npm install
npm run dev
```

## Deploy to Vercel
Extract this ZIP. Upload the extracted project to a GitHub repository, then import that repository in Vercel. Select Next.js; leave the root directory at the repository root. Use `npm run build`. No environment variables are required.

Or deploy from the extracted folder with the Vercel CLI:

```bash
npm install
npx vercel
```

After checking the preview, run `npx vercel --prod`.

## Content
- Main portfolio: `app/page.tsx`
- Graphics and motion gallery: `app/graphic-design/page.tsx`
- Artwork: `app/graphic-design/designs.json`
- Videos: `app/graphic-design/motion.json`
- Styling: `app/globals.css`
- Assets and CV: `public/`

Artwork is served as WebP. Videos include playback controls and load on demand.
