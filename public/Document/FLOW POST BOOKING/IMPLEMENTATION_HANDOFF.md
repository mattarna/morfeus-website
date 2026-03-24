# PRE-CALL FUNNEL — IMPLEMENTATION HANDOFF

This document lists everything to complete after code delivery.

## 1) Placeholders to Replace

### Video URLs (Thank-you page)
- File: `src/components/sections/CallConfirmedPage.tsx`
- Replace:
  - `PLACEHOLDER_VIDEO_LINKEDIN`
  - `PLACEHOLDER_VIDEO_COLDEMAIL`

Use embeddable URLs compatible with iframe.

### Webinar URL (case-study pages)
- File: `src/components/sections/CaseStudyTemplate.tsx`
- Replace:
  - `PLACEHOLDER_WEBINAR_URL`

### Logos row
- Current state: neutral placeholders.
- File: `src/components/sections/CallConfirmedPage.tsx`
- Replace placeholder blocks with real client logo images (white-on-transparent preferred).

## 2) Form Backend Configuration

### Internal endpoint used by frontend
- `POST /api/precall-intake`
- File: `src/app/api/precall-intake/route.ts`

### External forward endpoint (optional)
- Set env var:
  - `PRECALL_INTAKE_FORWARD_URL=https://your-real-endpoint.com/path`

If this env var is missing, submissions still return success but are not forwarded.

### Expected payload fields
- `sector` (required)
- `annualRevenue` (required)
- `frictionArea` (required)
- `repeatedProblem` (required)
- `source` (optional)
- `callDate` (optional)
- `callTime` (optional)
- `locale` (optional)

## 3) GTM / Tracking Events

Tracking helper file:
- `src/lib/tracking/precall.ts`

Events currently pushed to `dataLayer`:
- `precall_page_view`
- `precall_video_variant_loaded`
- `precall_watch_video_click`
- `precall_form_start`
- `precall_form_submit_success`
- `precall_form_submit_error`
- `precall_case_cta_click`

### Recommended GTM setup
1. Create one Custom Event trigger per event name above.
2. Create GA4 Event tags mapped 1:1 to each event.
3. Pass parameters such as:
   - `locale`
   - `page_id`
   - `source`
   - `variant`
   - `case_slug`
   - `target_url`
4. Validate in GTM Preview mode and GA4 DebugView.

## 4) URL and Route Map

Locale routes:
- `/{locale}/call-confirmed`
- `/{locale}/case-study/sales`
- `/{locale}/case-study/operations`
- `/{locale}/case-study/administrative`
- `/{locale}/case-study/ecommerce`
- `/{locale}/case-study/info-business`

## 5) SEO Rules Implemented

- All pre-call pages have `noindex, nofollow`.
- Metadata title format is `"[Page Title] — Morfeus"`.

## 6) Content Source of Truth

All copy is in:
- `messages/it.json`
- `messages/en.json`

Namespace used:
- `PreCall.callConfirmed`
- `PreCall.caseStudies.<slug>`

## 7) QA Checklist Before Launch

### Functional
- Test all optional URL params on `/call-confirmed`:
  - `name`
  - `date`
  - `time`
  - `source`
  - `form=complete`
- Confirm fallback behavior with no params.
- Confirm form state switches to completed state without full page reload.

### Locale
- Test both locales:
  - `/it/call-confirmed`
  - `/en/call-confirmed`
  - `/it/case-study/*`
  - `/en/case-study/*`

### Tracking
- Open browser console and verify `window.dataLayer` pushes.
- Validate each event in GTM Preview mode.

### Layout
- Confirm there is no menu on these pages.
- Confirm header shows logo + "Watch the video" CTA.
- Confirm there is no footer.
- Confirm mobile readability and spacing.

## 8) Rollback Notes

If urgent rollback is needed:
1. Remove links pointing traffic to `/call-confirmed` and new `/case-study/*` pages.
2. Keep old post-booking redirection target active.
3. Re-enable once placeholders, GTM, and endpoint checks are complete.
