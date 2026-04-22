# Go-Live Checklist — webinar-claude

## 1) Pre-flight

- Set env vars in Vercel project:
  - `BREVO_API_KEY` (or `BREVO_API_KEY_V2`)
  - `BREVO_WEBINAR_LIST_ID` (recommended)
- Confirm route is reachable in local QA:
  - `/webinar-claude`
  - `/webinar-claude/thank-you`

## 2) Preview deploy

```bash
npx vercel --yes
```

Verify on preview URL:

- Page load ok (desktop + mobile)
- Form validation client-side
- API submit:
  - invalid payload -> 400
  - valid payload -> 200 (when Brevo key is set)
- Redirect to `/webinar-claude/thank-you`
- Buttons:
  - YouTube live
  - Google Calendar
  - `.ics` download
- Tracking:
  - `funnel_view`
  - `cta_click`
  - `conversion` on thank-you

## 3) Production deploy

```bash
npx vercel --prod --yes
```

## 4) Post-release monitoring (24-48h)

- Check API error rate for `/api/funnels/webinar-claude/optin`
- Check conversion drop-off opt-in -> thank-you
- Check CTA click rate (calendar + YouTube)
- Validate noindex headers on funnel pages
