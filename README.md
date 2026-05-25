# Benlanry — Discover. Compare. Buy Smart.

> An expert-curated Amazon affiliate storefront with a full-featured admin panel. Built for speed, SEO, and revenue.

**Live site → [benlanry.shop](https://benlanry.shop)**

![Homepage](./docs/screenshots/home.png)

---

## Overview

Benlanry is a production-ready Amazon affiliate marketing website. Visitors browse curated products across 10+ categories, track live deals with countdown timers, subscribe to email and push alerts, and read honest expert reviews — all designed to maximise click-through to Amazon.

The site ships with a complete headless admin panel so the client can manage every product, deal, category, and notification without touching code.

---

## Screenshots

| Public Site | Admin Panel |
|---|---|
| ![Homepage](./docs/screenshots/home.png) | ![Admin Dashboard](./docs/screenshots/admin-dashboard.png) |
| ![Deals Page](./docs/screenshots/deals.png) | ![Admin Login](./docs/screenshots/admin-login.png) |
| ![Categories](./docs/screenshots/categories.png) | |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 14](https://nextjs.org) — App Router, Server Components, Edge Middleware |
| Styling | [Tailwind CSS 3](https://tailwindcss.com) — custom design tokens, fully responsive |
| Database | [Neon](https://neon.tech) — serverless PostgreSQL |
| ORM | [Drizzle ORM](https://orm.drizzle.team) — type-safe, zero-runtime overhead |
| Email | [Resend](https://resend.com) — transactional emails + newsletters |
| Push notifications | [OneSignal](https://onesignal.com) — browser push to all subscribers |
| Deployment | [Vercel](https://vercel.com) — Edge Network, auto-deploy from GitHub |
| Icons | [Lucide React](https://lucide.dev) |

---

## Features

### Public Storefront

- **Hero search** — instant full-text product search across the catalogue
- **Shop by Category** — 10 curated categories (Electronics, Home & Kitchen, Sports, Beauty, Fashion, Books, Gaming, Garden, Pets, Toys)
- **Today's Best Deals** — live deal banner with countdown timers, category filter, and sort by discount
- **Best Picks** — editor-curated top products with star ratings and badges
- **Product detail pages** — full review, pros/cons, quick verdict, sticky buy bar with Amazon affiliate link
- **Price alert** — email me when price drops (stored in DB, cron-checked daily)
- **Email subscribe** — footer newsletter opt-in via Resend
- **Push opt-in** — browser push notifications via OneSignal
- **SEO-ready** — sitemap.xml, robots.txt, Open Graph, Twitter Cards, metadata per page
- **Trust pages** — Affiliate Disclosure, Privacy Policy, Methodology, About

### Admin Panel (`/admin`)

- **Dashboard** — KPI cards (products, best picks, deals, subscribers), quick actions, recent products list
- **Products** — live search, add / edit / deactivate, ASIN extractor, image preview, step-by-step guide
- **Categories** — card grid view, add inline
- **Deals** — create deals with price, discount %, expiry; one-click deactivate
- **Subscribers** — view all email + push subscribers with status badges
- **Push Notifications** — compose and broadcast to all push subscribers instantly, with live preview
- **Auth** — cookie-based session, password protected, Edge-safe middleware

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Neon](https://neon.tech) PostgreSQL database
- A [Vercel](https://vercel.com) account (for deployment)
- An [Amazon Associates](https://affiliate-program.amazon.com) account (for affiliate links)

### Local Development

```bash
# 1. Clone the repo
git clone https://github.com/toptech5419/benlanry-shop.git
cd benlanry-shop

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Fill in your values (see Environment Variables section below)

# 4. Push the database schema
npm run db:push

# 5. Seed default categories
npm run db:seed

# 6. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.
Open [http://localhost:3000/admin](http://localhost:3000/admin) for the admin panel.

---

## Environment Variables

Create a `.env.local` file in the project root:

```env
# Database (Neon PostgreSQL)
DATABASE_URL=postgresql://user:password@host/db?sslmode=require

# Public site URL
NEXT_PUBLIC_APP_URL=https://benlanry.shop

# Amazon Associates affiliate tag
NEXT_PUBLIC_AMAZON_AFFILIATE_TAG=your-tag-20

# Admin panel password
ADMIN_PASSWORD=your-strong-password

# Resend (email / newsletters)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx

# OneSignal (browser push notifications)
NEXT_PUBLIC_ONESIGNAL_APP_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
ONESIGNAL_REST_API_KEY=os_v2_app_xxxxxxxxxxxx

# Cron secret (for price alert cron endpoint)
CRON_SECRET=your-cron-secret
```

> **Never commit `.env.local` to Git.** It is listed in `.gitignore`.

---

## Project Structure

```
src/
├── app/
│   ├── (site)/              # Public storefront — inherits Header + Footer layout
│   │   ├── page.tsx         # Homepage
│   │   ├── deals/           # Today's Best Deals
│   │   ├── best-picks/      # Editor's Best Picks
│   │   ├── categories/      # All Categories
│   │   ├── category/[slug]/ # Category product listing
│   │   ├── product/[slug]/  # Product detail + full review
│   │   ├── search/          # Search results
│   │   ├── about/
│   │   ├── affiliate-disclosure/
│   │   ├── methodology/
│   │   ├── privacy-policy/
│   │   └── unsubscribe/
│   ├── admin/               # Admin panel — fully isolated, no public chrome
│   │   ├── login/
│   │   ├── page.tsx         # Dashboard
│   │   ├── products/        # List, new, edit
│   │   ├── categories/
│   │   ├── deals/
│   │   ├── subscribers/
│   │   └── push/
│   ├── api/                 # API route handlers
│   │   ├── admin/           # Auth, products, categories, deals, stats, subscribers
│   │   ├── subscribe/       # Email opt-in
│   │   ├── unsubscribe/
│   │   ├── price-alert/
│   │   ├── notifications/push/
│   │   └── cron/price-alerts/
│   ├── layout.tsx           # Root layout — html, body, fonts, scripts only
│   ├── not-found.tsx        # Branded 404 page
│   ├── robots.ts            # robots.txt
│   └── sitemap.ts           # Dynamic sitemap
├── components/
│   ├── admin/               # ProductForm with ASIN extractor + image preview
│   ├── home/                # Hero, CategoryGrid, DealsSection, FeaturedPicks
│   ├── product/             # ProductCard, ProsCons, QuickVerdict, StickyBuyBar
│   ├── deals/               # DealCard, CountdownTimer
│   ├── layout/              # Header, Footer, FooterSubscribeForm
│   └── ui/                  # PushOptIn, PriceAlertButton, Breadcrumb
├── db/
│   ├── index.ts             # Drizzle + Neon connection
│   └── schema.ts            # All table definitions
├── lib/
│   └── admin-auth.ts        # Web Crypto SHA-256 session token (Edge-compatible)
├── middleware.ts             # Edge-safe admin route guard (cookie check)
└── scripts/
    └── seed-categories.ts   # Seeds 10 default categories
```

---

## Database Schema

| Table | Key columns |
|---|---|
| `products` | id, name, slug, categoryId, amazonUrl, affiliateTag, imageUrl, price, originalPrice, rating, isBestPick, isDeal, isActive |
| `categories` | id, name, slug, description, icon, sortOrder |
| `deals` | id, productId, dealPrice, originalPrice, discountPercent, dealExpiresAt, isActive |
| `subscribers` | id, email, isEmailActive, isPushActive, subscribedAt |
| `priceAlerts` | id, email, productId, targetPrice, isActive |

---

## Admin Panel Guide

Navigate to `/admin/login` and enter your `ADMIN_PASSWORD`.

### Adding a Product

1. **Admin → Products → Add Product**
2. Paste the full Amazon product URL — the ASIN is extracted automatically and the clean affiliate link is built for you
3. Fill in name, price, category, and image URL (copy from Amazon product page)
4. Tick **Best Pick** or **Deal** if appropriate
5. Add short description, pros/cons, and quick verdict for the review
6. Click **Save** — the product is live on the site immediately

### How Amazon Affiliate Links Work

Every product page has a **Buy on Amazon** button. That link contains your `affiliate tag` (set via `NEXT_PUBLIC_AMAZON_AFFILIATE_TAG`). When a visitor clicks it and buys within 24 hours, Amazon credits your account.

Get your affiliate tag from [Amazon Associates → SiteStripe](https://affiliate-program.amazon.com). Replace the placeholder `your-tag-20` with your real tag in Vercel environment variables.

---

## Deployment

The site auto-deploys to production on every push to `main`. For a manual deploy:

```bash
vercel --prod
```

Set all environment variables in the [Vercel dashboard](https://vercel.com) under **Project → Settings → Environment Variables**.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local development server |
| `npm run build` | Production build |
| `npm run lint` | ESLint check |
| `npm run db:push` | Push Drizzle schema to Neon database |
| `npm run db:studio` | Open Drizzle Studio (visual DB editor) |
| `npm run db:seed` | Seed 10 default categories |

---

## Security Checklist (Before Launch)

- [ ] Change `ADMIN_PASSWORD` to a strong random password (20+ chars)
- [ ] Rotate the Neon database password
- [ ] Rotate Resend and OneSignal API keys if ever shared
- [ ] Verify `.env.local` is in `.gitignore` ✓

---

## License

Private — built for client use. All rights reserved.
