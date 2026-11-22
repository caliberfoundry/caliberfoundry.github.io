# StealthFlow: 12-Source Playwright Lead Extractor & Make.com Webhook Dispatcher

Live interactive proof-of-concept built for:
1. **Upwork Job `~022121378237490328856`** — *Make.com + Playwright Developer: 12 Separate Stealth Web Scrapers to Webhook Pipeline*
2. **HackerNews `#50508598` (`webapp@ross94957.com`)** — *Bay Area eCommerce Catalog ETL, URL Canonicalization & Schema Entity Matching*

## Contents
- `index.html` — Self-contained interactive dashboard with 12 scraper templates, 50 validated B2B/eCommerce records, instant JSON/CSV export, URL canonicalization diff, and a live Make.com Webhook payload dispatcher.
- `extracted_leads_50.json` — Raw 50-record validated dataset (`100% Pydantic v2 pass rate`).
- `playwright_12_sources_engine.py` — Production async Python Playwright stealth engine with XHR/GraphQL interception, URL canonicalizer, Pydantic v2 validation, and HMAC-SHA256 Make.com webhook dispatcher.

## 1-Click Deployment
```bash
npx vercel --prod --yes
```
