# Implementation Plan - Fix Badge Visibility Across All Devices

## Problem Analysis
The user reported that badges are not visible anywhere on the site (PC or mobile). This happens because `SchoolBadgeImg` attempts to load external image files (`badge1.png`, `badge.png`) from Supabase or local paths which may 404 or fail to load, falling back through multiple error states or failing to render correctly.

## Proposed Changes

### 1. Robust Vector SVG Crest in `SchoolBadgeImg.tsx`
- Replace the image-loading and error-state looping logic in `SchoolBadgeImg.tsx` with a stunning, high-fidelity vector SVG rendering of the official STAHIZA Crest (Shield, Crown/Banner, "EDUCATION IS THE WAY", open book, pen, and ladder).
- This guarantees 100% immediate visibility, crisp scaling across mobile and PC, zero network dependency, and zero broken image issues.

## Verification Plan
- Run `npm run build` to verify clean compilation.
- Verify badges appear instantly across all tabs and components.
