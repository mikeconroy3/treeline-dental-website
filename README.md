# Treeline Dental — Complete Site (Server Reviews + OG Theme)

## Deploy (GitHub → Vercel)
1) Push this folder to a GitHub repo.
2) In Vercel → **Add New → Project → Import Git Repository** → Deploy.

## Environment Variables (Vercel → Project → Settings → Environment Variables)
- `NEXT_PUBLIC_GOOGLE_PLACES_API_KEY`  → Browser key (Places API enabled, **HTTP referrers** = your domains).
- `NEXT_PUBLIC_GOOGLE_PLACE_ID`        → Treeline’s Google Place ID.
- `GOOGLE_PLACES_SERVER_KEY`           → (Optional) Server-only key (Places API, avoid HTTP referrer restriction).

Redeploy after adding/updating env vars.

## Troubleshoot
- Open `/api/reviews?debug=1` on your deployed site to see raw Google payload.
- Check Vercel **Functions logs** for messages starting with `[/api/reviews]`.
- If you get `REQUEST_DENIED`: enable billing, fix key restrictions, or verify Place ID.
- Remember: Public Place Details returns up to **5** reviews.

## Assets to replace
- `public/hero.jpg`                → your hero photo
- `public/treeline-logo.png`      → your logo (already included from your upload)
- `public/services/*.jpg`         → 6 service images
- `public/doctor1.jpg`, `doctor2.jpg` → doctor portraits


## IMPORTANT — Fix for 'API keys with referer restrictions cannot be used with this API'
- In Vercel → Environment Variables, set **GOOGLE_PLACES_SERVER_KEY** to a key with **NO Application restriction** (or IP), and **API restriction = Places API**.
- Do NOT use a referrer-restricted browser key for server calls.
- Redeploy, then test `/api/reviews?debug=1` again.

## Crawl Readiness
- **robots.txt** is served by `app/robots.js` with `Allow: /`, and points to your sitemap.
- **sitemap.xml** is served by `app/sitemap.js`. Currently includes `/` (single-page). Add more URLs as you create subpages.
- Optional: set `NEXT_PUBLIC_SITE_URL` in Vercel to your canonical domain (e.g., `https://treeline.dental`) so robots/sitemap use the right base URL.
