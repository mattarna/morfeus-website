# Site Architecture

## Two Separate Worlds

### 1. Sito Madre (/{locale}/...)
Main website with locale prefix. Contains:
- **Homepage** (`/[locale]/`): visual-heavy (70% design, 30% copy), brand/authority, SMISTA traffic
- **Service pages** (`/[locale]/servizi/[slug]`): copy-heavy (30% design, 60% copy), CONVERTE in call booked
- **Case study pages** (`/[locale]/case-study/[slug]`): proof-heavy, CONVERTE in call booked
- **Utility pages**: privacy, cookies, portal
- **Forge** (`/[locale]/forge`): existing landing page, template reference for copy-heavy pages

### 2. Funnel Area (/slug)
Separate area, NO locale prefix. Lives in `src/app/__funnels/` with middleware rewrite.
Funnels are single-language (defined per funnel config).

## Page Roles (One Job Per Page)
- Homepage: impress, position, route to service/case-study pages
- Service pages: explain vertical, prove value, convert to call
- Case study pages: show proof, build trust, convert to call
- Funnel pages: capture leads, convert through multi-step flow

## Key Mechanism
ROIometro: lives on homepage as brand differentiator, converts directly to call booked.

## URL Structure
- `/` → redirects to `/en` (default locale)
- `/it` → Italian homepage
- `/en` → English homepage
- `/it/servizi/operating-partner` → Italian service page
- `/it/case-study/progetto-alfa` → Italian case study
- `/nome-funnel` → Funnel (no locale prefix)

## Content System
- All copy in `messages/it.json` + `messages/en.json` (next-intl)
- No MDX, no CMS
- Namespace convention: `Services.<slug>`, `CaseStudy.<slug>`, `Common`
