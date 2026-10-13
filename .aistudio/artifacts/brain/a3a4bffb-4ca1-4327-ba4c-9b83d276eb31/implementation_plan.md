# Implementation Plan - Decouple Marquee Staff from Leadership Data

## Problem Analysis
The marquee staff data was previously sharing or falling back to the leadership data. The user specified that marquee data should be completely independent of leadership data and extracted directly from the `others` folder in the `IMAGES` Supabase bucket, mapped using hardcoded staff names corresponding to their filenames.

## Proposed Changes

### 1. Dedicated Marquee Staff Mapping in `src/data/schoolData.ts`
- Create a dedicated `MARQUEE_STAFF_MAP` or `FALLBACK_MARQUEE_STAFF` array mapping specific filenames in `others/` to their exact staff names and roles.
- Update `fetchMarqueeStaff()` to query Supabase storage for the `others` folder, matching files to the explicit mapping or falling back gracefully to the dedicated marquee staff list.
- Ensure marquee staff data is entirely decoupled from `fetchLeaders()`.

## Verification Plan
- Run `npm run build` to verify clean compilation.
- Verify marquee staff renders correctly with their respective names and images from `IMAGES/others/`.
