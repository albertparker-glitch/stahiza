# Implementation Plan - Fix Vercel Asset Loading (Images & Background Video)

## Problem Analysis
When hosted on Vercel, static assets referenced at `/pages/images/...` (such as `badge.png`, `ostricast.jpeg`, `bena.jpeg`, `odeke.jpeg`, and `back.mp4`) result in 404 errors if they are not present in Vite's `public/` directory during build time. Furthermore, if any media file fails to load or is missing, the UI should gracefully fall back to high-fidelity SVG/CSS graphics instead of showing broken image icons or missing videos.

## Proposed Changes

### 1. Public Asset Directory Structure
- Create `public/pages/images/` directory.
- Mirror all required media assets into `public/pages/images/`.

### 2. Robust Fallback Handlers in `src/App.tsx`
- **SchoolBadgeImg**: Ensure that if `/pages/images/badge.png` fails to load, it automatically falls back to an inline SVG rendering of the official STAHIZA Crest.
- **Background Video**: Provide a rich CSS gradient and animated background fallback if `back.mp4` fails to autoplay or load on mobile/Vercel.
- **Leadership Photos**: Ensure robust `onError` fallbacks for `ostricast.jpeg`, `bena.jpeg`, and `odeke.jpeg`.

## Verification Plan
- Run `npm run build` to verify clean compilation.
- Verify asset paths match Vite public directory rules.
