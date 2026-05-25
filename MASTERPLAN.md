# Benlanry.shop — Amazon Affiliate Site Masterplan
> Domain: benlanry.shop | Stack: Next.js 14 + Tailwind CSS + Vercel
> Model: Amazon Affiliate Marketing (Associates Program)
> Goal: World-class affiliate site — max conversions, max return visits

---

## Project Vision
Build a product showcase website where customers browse curated Amazon products, click to buy, and are seamlessly redirected to Amazon. Client earns commission on every completed purchase. Site must feel as premium and trustworthy as Wirecutter, as clean as Tom's Guide, and as conversion-optimized as BestReviews.

---

## Tech Stack Decision

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | Next.js 14 (App Router) | SEO-critical SSR/SSG, fast, React ecosystem |
| Styling | Tailwind CSS | Utility-first, rapid UI, consistent design system |
| Database | Supabase (PostgreSQL) | Free tier, real-time, auth, email subscriptions |
| CMS / Products | Supabase DB + Admin panel | Custom admin to add/edit products and affiliate links |
| Hosting | Vercel | Free, instant deploys, CDN, pairs perfectly with Next.js |
| Images | Cloudinary or Next/Image | Optimized WebP delivery, lazy loading |
| Email | Resend.com | Modern email API, free tier 3,000/mo |
| Push Notifications | OneSignal | Free browser push notifications, 10,000 subscribers free |
| Analytics | Vercel Analytics + Plausible | Lightweight, privacy-respecting, real conversion data |
| Domain | benlanry.shop | Client to purchase — point DNS to Vercel |

---

## Brand & Design System

### Color Palette
```
Background:      #FFFFFF
Body Text:       #1A1A1A
Primary Accent:  #005BAC  (deep blue — CTAs, links, badges)
Highlight:       #FF6B00  (orange — Best Pick badge, awards, deals)
Muted Text:      #666666
Card Border:     #E0E0E0
Light BG:        #F5F7FA  (section backgrounds, card fills)
Success/Green:   #00A651  (price drops, savings)
Error/Red:       #CC0000  (urgent deals, limited time)
```

### Typography
```
Font Family:     Inter (Google Fonts — free, clean, modern)
H1:              48–64px, font-weight 800
H2:              32–40px, font-weight 700
H3:              22–28px, font-weight 600
Body:            17px, font-weight 400, line-height 1.7
Small/Meta:      13px, uppercase, letter-spacing 0.05em
```

### Logo
- Name: **Benlanry**
- Style: Clean wordmark, Inter font, primary blue accent
- Tagline: "Discover. Compare. Buy Smart."

---

## Site Architecture (Pages & Routes)

```
benlanry.shop/
├── /                          Homepage
├── /deals                     Deals Hub (daily updated)
├── /categories                All Categories
├── /category/[slug]           Category page (e.g., /category/electronics)
├── /product/[slug]            Product review page
├── /best-picks                Editor's Best Picks
├── /compare/[slug]            Comparison page (product vs product)
├── /search                    Search results
├── /newsletter                Newsletter signup landing page
├── /about                     About Benlanry (trust page)
├── /methodology               Our Testing & Curation Process
├── /affiliate-disclosure      FTC Required Disclosure
├── /privacy-policy            Privacy Policy
├── /sitemap.xml               Auto-generated XML sitemap
└── /admin                     Password-protected admin panel
    ├── /admin/products        Add/Edit/Delete products
    ├── /admin/categories      Manage categories
    ├── /admin/deals           Manage deals/promotions
    └── /admin/subscribers     View email/push subscribers
```

---

## Phase-by-Phase Build Plan

---

### PHASE 1 — Foundation & Setup
**Goal: Project scaffolded, deployed, domain connected, design system live**

#### Setup Checklist
- [ ] Initialize Next.js 14 project with App Router (`create-next-app`)
- [ ] Install and configure Tailwind CSS
- [ ] Set up Supabase project (free tier)
- [ ] Create Supabase database schema (products, categories, deals, subscribers)
- [ ] Connect Supabase to Next.js via environment variables
- [ ] Set up Vercel project and connect GitHub repo
- [ ] Configure benlanry.shop domain DNS to point to Vercel
- [ ] Set up Resend.com account and API key
- [ ] Set up OneSignal account and web push SDK
- [ ] Create global design tokens in Tailwind config (colors, fonts, spacing)
- [ ] Install Inter font via next/font
- [ ] Build global Layout component (Header + Footer wrapper)
- [ ] Set up global CSS reset and base styles

#### Database Schema (Supabase)
- [ ] `products` table: id, name, slug, description, category_id, amazon_url, affiliate_tag, image_url, price, original_price, rating, review_count, is_best_pick, is_deal, created_at, updated_at
- [ ] `categories` table: id, name, slug, icon, description, image_url, sort_order
- [ ] `deals` table: id, product_id, discount_percent, deal_price, deal_expires_at, is_active
- [ ] `subscribers` table: id, email, push_subscription_json, subscribed_at, is_active
- [ ] `price_alerts` table: id, product_id, subscriber_email, target_price, notified_at

---

### PHASE 2 — Core UI Components
**Goal: All reusable components built, design system fully implemented**

#### Header
- [ ] Logo (left) + Search bar (center) + Nav links (right)
- [ ] Mobile hamburger menu with full category drawer
- [ ] Sticky on scroll (shrinks slightly past hero)
- [ ] Search bar autocomplete (searches products in real-time)
- [ ] "Deals" link in nav with animated pulse badge

#### Footer
- [ ] 4-column grid: About | Categories | Resources | Newsletter
- [ ] "As an Amazon Associate, Benlanry earns from qualifying purchases" disclosure
- [ ] Social media links
- [ ] Copyright + Privacy Policy + Affiliate Disclosure links

#### Product Card Component
- [ ] Product image (WebP, lazy loaded)
- [ ] Product name (truncated at 2 lines)
- [ ] Star rating (visual stars + numeric)
- [ ] Price display (current price + original price + % savings)
- [ ] "Best Pick" badge (orange ribbon on card corner, conditional)
- [ ] "Deal" badge (green flash badge, conditional)
- [ ] "Check Price on Amazon" CTA button (deep blue, full width)
- [ ] Hover effect (subtle lift shadow)
- [ ] Mobile: touch-friendly, 48px min button height

#### Category Card Component
- [ ] Category icon/image
- [ ] Category name
- [ ] Product count
- [ ] Hover effect

#### "Best Pick" Badge Component
- [ ] Orange ribbon badge for product cards
- [ ] Large editorial banner for product pages

#### Comparison Table Component
- [ ] Sticky header row
- [ ] Alternating row colors
- [ ] "Winner" column indicator
- [ ] Horizontal scroll on mobile with swipe affordance
- [ ] Sortable columns

#### Quick Verdict Box Component
- [ ] Highlighted summary box (light blue background)
- [ ] Star rating + product image + 2-3 sentence verdict
- [ ] "Best Pick" stamp (if applicable)
- [ ] "Check Price" CTA button

#### Pros/Cons Component
- [ ] Two-column layout (Pros | Cons)
- [ ] Green checkmark icons for pros
- [ ] Red X icons for cons
- [ ] Mobile: stacks vertically

#### Price Display Component
- [ ] Current price (large, bold)
- [ ] Original price (struck through, muted)
- [ ] Savings amount + percentage (green badge)
- [ ] "Price may change — check Amazon for current price" disclaimer

#### Sticky Buy Bar Component (Mobile + Desktop)
- [ ] Fixed to bottom of screen on product pages
- [ ] Shows: product thumbnail + name + price + "Check Price on Amazon" button
- [ ] Dismissable (X button)
- [ ] Only appears after user scrolls past the main product card

#### Newsletter Signup Component
- [ ] Email input + "Get Deals" submit button
- [ ] "Join 10,000+ smart shoppers" social proof
- [ ] GDPR/spam disclaimer ("No spam. Unsubscribe anytime.")
- [ ] Success state with confirmation message

#### Push Notification Opt-In Component
- [ ] Triggered after 30 seconds on site or after 2 page views
- [ ] Custom styled prompt (not browser default): "Get price drop alerts?"
- [ ] Yes / Maybe Later buttons
- [ ] OneSignal integration

---

### PHASE 3 — Homepage
**Goal: Homepage live with all sections — first impression is world-class**

#### Hero Section
- [ ] Large headline: "Find the Best Products. Buy Smart."
- [ ] Large centered search bar (primary interactive element)
- [ ] 8–10 category quick-link pills below search (Electronics, Home, Kitchen, etc.)
- [ ] Trust bar: "10,000+ products reviewed | Expert curated | Updated daily"
- [ ] Background: clean white with subtle pattern or clean gradient

#### Featured Best Picks Section
- [ ] Section title: "Our Top Picks This Week"
- [ ] 3-column product card grid (1-column mobile)
- [ ] "Best Pick" badges on featured cards
- [ ] "See All Best Picks →" link

#### Category Grid Section
- [ ] Section title: "Shop by Category"
- [ ] 3×3 or 4×2 category card grid with icons
- [ ] Hover effects, clean borders

#### Today's Deals Section
- [ ] Section title: "Today's Best Deals" with countdown timer
- [ ] Horizontal scroll on mobile (snap scroll)
- [ ] Deal cards with discount badges (e.g., "42% OFF")
- [ ] "View All Deals →" link

#### Trending Products Section
- [ ] Section title: "Trending Right Now"
- [ ] 4-column product card row
- [ ] Based on most-viewed or manually curated

#### Newsletter CTA Section
- [ ] Full-width section, light blue background
- [ ] Headline: "Never Miss a Deal"
- [ ] Email signup form
- [ ] Social proof number

#### Trust Strip / Media Logos (optional Phase 3)
- [ ] "As featured in" logos strip (if applicable in future)

---

### PHASE 4 — Category & Product Pages
**Goal: Core browsing and product pages live — full conversion flow working**

#### Category Page (/category/[slug])
- [ ] Category hero: name + description + product count
- [ ] Filter sidebar (desktop) / Filter drawer (mobile): price range, rating, brand, features
- [ ] Sort options: Best Pick first | Highest Rated | Price: Low-High | Price: High-Low | Newest
- [ ] Product card grid (3-col desktop, 2-col tablet, 1-col mobile)
- [ ] "Best Pick" prominently sorted to top
- [ ] Pagination or infinite scroll
- [ ] Breadcrumb navigation (BreadcrumbList schema)

#### Product Page (/product/[slug])
- [ ] Breadcrumb navigation
- [ ] H1: Product name
- [ ] "Last updated: [date]" timestamp
- [ ] "Best Pick" banner (if applicable)
- [ ] Quick Verdict Box (above the fold)
- [ ] Product image gallery (multiple angles)
- [ ] Sticky "Check Price on Amazon" button (desktop sidebar)
- [ ] Price display (current + original + savings)
- [ ] Key specs bullet list (5–7 points)
- [ ] Affiliate disclosure inline: "Affiliate link — we may earn a commission"
- [ ] Pros / Cons component
- [ ] "Who Is This For?" section
- [ ] Full review body (2,000–5,000 words ideally)
- [ ] Comparison table (this product vs 2–3 alternatives)
- [ ] "Should You Buy It?" verdict section
- [ ] "Alternatives to Consider" — 3 related product cards
- [ ] FAQ section (FAQ schema markup)
- [ ] Sticky bottom buy bar (mobile + desktop scroll trigger)
- [ ] JSON-LD schema: Product + AggregateRating + FAQPage + BreadcrumbList

---

### PHASE 5 — Deals & Search
**Goal: Deals hub live, search fully functional**

#### Deals Page (/deals)
- [ ] Hero: "Today's Best Amazon Deals" + deal count
- [ ] Filter by category
- [ ] Deal cards with countdown timers (expires in X hours)
- [ ] "Highest Discount" sort option
- [ ] Updated daily (admin-managed)

#### Search Page (/search)
- [ ] Real-time search results as user types (debounced, 300ms)
- [ ] Results show product cards
- [ ] "No results" state with suggestions
- [ ] Search tracked for analytics (most searched terms informs content strategy)

---

### PHASE 6 — Notifications System
**Goal: All three notification types live and working**

#### Email Notifications (via Resend.com)
- [ ] Welcome email on newsletter signup
- [ ] Weekly "Best Deals" digest email (manual trigger from admin or cron job)
- [ ] Price drop alert email (auto-triggered when deal price updates in DB)
- [ ] Email templates: branded, HTML, mobile-optimized
- [ ] Unsubscribe link in every email (CAN-SPAM required)
- [ ] Double opt-in confirmation email
- [ ] Subscriber management in admin panel

#### Browser Push Notifications (via OneSignal)
- [ ] OneSignal SDK installed and configured
- [ ] Custom permission prompt UI (not browser default)
- [ ] Notification triggers:
  - [ ] New Best Pick added
  - [ ] Flash deal goes live
  - [ ] Price drop on a popular product
- [ ] Admin can send manual push from OneSignal dashboard
- [ ] Push notification click tracks to product page with affiliate link

#### Price Drop Alerts (Custom)
- [ ] User saves a product to "Watch List" (no account needed — email only)
- [ ] Price alert saved in Supabase `price_alerts` table
- [ ] Cron job (Vercel Cron / GitHub Actions) checks prices daily
- [ ] Sends email alert when price drops below target
- [ ] "Set Price Alert" button on every product page

---

### PHASE 7 — Trust, SEO & Legal Pages
**Goal: Site trusted by Google and users, legally compliant**

#### Trust Pages
- [ ] /about — Who we are, our mission, team names/photos
- [ ] /methodology — How we curate and review products (builds E-E-A-T)
- [ ] /affiliate-disclosure — FTC-compliant affiliate disclosure page
- [ ] /privacy-policy — GDPR/CCPA compliant privacy policy

#### SEO Infrastructure
- [ ] XML sitemap auto-generated (`/sitemap.xml`)
- [ ] robots.txt configured
- [ ] Open Graph + Twitter Card meta tags on all pages
- [ ] Canonical URLs on all pages
- [ ] JSON-LD schema on all product pages (Product + Review + FAQ + Breadcrumb)
- [ ] Meta title + description templates for all page types
- [ ] Image alt text on all product images
- [ ] Internal linking: every product links to its category, category links to best picks

#### Performance
- [ ] Lighthouse score: Performance 90+, SEO 100, Accessibility 90+, Best Practices 100
- [ ] LCP < 2.5 seconds
- [ ] CLS < 0.1
- [ ] INP < 200ms
- [ ] All images converted to WebP with next/image
- [ ] Lazy loading on all below-fold images
- [ ] No render-blocking resources

---

### PHASE 8 — Admin Panel
**Goal: Client can manage products, deals, and subscribers without touching code**

- [ ] Password-protected admin route (/admin)
- [ ] Products manager: Add / Edit / Delete products
  - [ ] Form fields: name, description, category, Amazon affiliate URL, image upload, price, rating, is_best_pick toggle, is_deal toggle
- [ ] Categories manager: Add / Edit / Delete categories
- [ ] Deals manager: Set active deals, discount %, expiry date
- [ ] Subscribers list: view email subscribers, push subscribers
- [ ] Push notification sender: compose + send broadcast from admin panel
- [ ] Analytics dashboard: clicks, page views, top products

---

### PHASE 9 — Testing & Launch
**Goal: Bug-free, fast, and live on benlanry.shop**

#### Pre-Launch QA Checklist
- [ ] All affiliate links include correct `?tag=[client-tag]` parameter
- [ ] All affiliate links open in new tab (`target="_blank" rel="noopener noreferrer"`)
- [ ] Affiliate disclosure visible on every page with affiliate links
- [ ] All pages tested on: Chrome, Firefox, Safari, Edge
- [ ] All pages tested on: iPhone (Safari), Android (Chrome)
- [ ] All forms tested: newsletter signup, price alert, contact
- [ ] 404 page exists and is branded
- [ ] All images load correctly, no broken images
- [ ] No console errors in browser dev tools
- [ ] Search works correctly
- [ ] Push notification opt-in triggers and works
- [ ] Email signup sends welcome email
- [ ] Price alert system tested end-to-end
- [ ] Admin panel secured and tested
- [ ] SSL certificate active (HTTPS) — Vercel handles this automatically

#### Domain & DNS
- [ ] Client purchases benlanry.shop
- [ ] DNS A/CNAME records pointed to Vercel
- [ ] SSL auto-provisioned by Vercel (Let's Encrypt)
- [ ] www redirect to non-www (or vice versa) configured
- [ ] Domain verified in Vercel dashboard

#### Amazon Associates Setup (Client Action)
- [ ] Client signs up at affiliate-program.amazon.com
- [ ] Affiliate tag created (e.g., `benlanry-20`)
- [ ] Tag added to all affiliate links
- [ ] Associates account approved (requires 3 sales within 180 days — important)
- [ ] Associates account region confirmed (US / UK / other)

#### Post-Launch
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Set up Vercel Analytics
- [ ] Monitor Core Web Vitals in Google Search Console
- [ ] Set up Uptime monitoring (UptimeRobot free)

---

## Complete Feature Checklist (Master Reference)

### Design & Branding
- [ ] Clean white layout with single blue accent color
- [ ] Inter font, consistent type scale
- [ ] "Best Pick" orange badges on qualifying products
- [ ] Consistent card design across all pages
- [ ] Mobile-first responsive on all screen sizes
- [ ] Smooth hover transitions (200ms ease)
- [ ] No layout shift as page loads (CLS = 0)

### Conversion Features
- [ ] Sticky "Check Price on Amazon" CTA on product pages
- [ ] Sticky bottom buy bar on mobile
- [ ] Quick Verdict box on every product page
- [ ] Pros/Cons on every product page
- [ ] Comparison table on every category page
- [ ] "Alternatives to Consider" on every product page
- [ ] Deal countdown timers
- [ ] Price savings badges (e.g., "Save $42 / 35% OFF")
- [ ] Star ratings visible on product cards
- [ ] Multiple product images

### Retention & Return Visit Features
- [ ] Email newsletter with weekly deals
- [ ] Browser push notifications for new deals
- [ ] Price drop alert system (watch a product)
- [ ] Deals page updated daily
- [ ] Seasonal gift guides (Christmas, Valentine's, Black Friday)
- [ ] "Last Updated" timestamp on all products/reviews
- [ ] Search with real-time results
- [ ] Category filtering and sorting

### Trust Signals
- [ ] FTC affiliate disclosure on all pages
- [ ] /about page with team info
- [ ] /methodology page (how products are curated)
- [ ] Author names on all reviews
- [ ] Honest pros AND cons (never 100% positive)
- [ ] "Last Tested / Updated" dates
- [ ] No fake reviews or inflated ratings

### SEO
- [ ] Unique title + meta description on every page
- [ ] JSON-LD schema on all product pages
- [ ] XML sitemap
- [ ] robots.txt
- [ ] Open Graph tags
- [ ] Canonical URLs
- [ ] Alt text on all images
- [ ] Breadcrumb navigation
- [ ] Internal linking structure

### Notifications (All 3 Types)
- [ ] Email: Welcome email
- [ ] Email: Weekly deals digest
- [ ] Email: Price drop alerts
- [ ] Push: New deal notification
- [ ] Push: New Best Pick notification
- [ ] Push: Flash sale alert
- [ ] Price alert: User saves product → email when price drops

### Legal & Compliance
- [ ] Affiliate disclosure page
- [ ] Privacy policy page
- [ ] Unsubscribe link in all emails
- [ ] Cookie consent banner (GDPR)
- [ ] HTTPS enforced
- [ ] No personal data sold to third parties stated in policy

### Admin & Operations
- [ ] Admin panel to add/edit/delete products
- [ ] Admin panel to manage deals
- [ ] Admin panel to send push notifications
- [ ] Subscriber management
- [ ] Analytics dashboard
- [ ] Daily price cron job

---

## Build Order Summary

```
Phase 1  → Foundation & Setup         (Week 1)
Phase 2  → UI Components              (Week 1–2)
Phase 3  → Homepage                   (Week 2)
Phase 4  → Category & Product Pages   (Week 2–3)
Phase 5  → Deals & Search             (Week 3)
Phase 6  → Notifications System       (Week 3–4)
Phase 7  → Trust, SEO & Legal         (Week 4)
Phase 8  → Admin Panel                (Week 4)
Phase 9  → Testing & Launch           (Week 5)
```

**Estimated timeline: 4–5 weeks of focused build time**

---

## Client Responsibilities

| Action | When |
|--------|------|
| Purchase benlanry.shop domain | Before Phase 1 ends |
| Sign up for Amazon Associates | Before Phase 9 (launch) |
| Provide affiliate tag (e.g., `benlanry-20`) | Before Phase 4 |
| Provide initial product list (20–50 products) | Before Phase 4 |
| Approve design/colors before full build | After Phase 2 |

---

*Last updated: 2026-05-25*
*Stack: Next.js 14 + Tailwind CSS + Supabase + Vercel + Resend + OneSignal*
