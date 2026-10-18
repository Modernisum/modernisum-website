---
name: seo
description: >-
  Master Search Engine Optimization (SEO) & SERP supremacy standards for Modernisum Web platforms. Covers Google
  SERP Sitelinks 6-Pack, JSON-LD structured schemas, RSS/Atom feeds, Google News sitemaps, canonical tags, Open Graph /
  Twitter cards, Core Web Vitals performance budgets, and background keyword hygiene.
---

# Master SEO & SERP Supremacy Architecture

> **The Sovereign SERP Axiom**:  
> Every public route across **Modernisum Technologies** (`modernisum.com`), **MOD School** (`school.modernisum.com`), and **MOD Farmer** must rank at the absolute pinnacle of search intent.  
> We combine pristine Pan-India English header hygiene with dense, machine-readable background structured data, real-time syndication feeds, and sub-1.2s Core Web Vitals performance.

---

## 1. Pan-India English Header Hygiene vs. Background SEO Keywords

### 1.1 The Header Hygiene Invariant
- **Strict Universal English Rule**: The visible Header, Navbar, mega-dropdowns, primary callout pills, and container headings **MUST remain 100% in crisp, professional English**.
- **Rationale**: 90% of school and enterprise decision-makers across all 28 Indian states operate in English for institutional governance. Placing mixed or forced regional Hindi copy inside primary layout headers degrades brand prestige.

### 1.2 Regional Intent in Background Metadata
All regional search demand (e.g. Hindi search queries, state board compliance terms, colloquial agricultural phrasing) must be captured strictly through:
- `<meta name="keywords" content="..." />`
- Dedicated server-rendered `hreflang` alternate links.
- Deep background JSON-LD schema annotations.
- Dedicated regional compliance sub-routes (e.g., `/mod-school/docs/state-boards/up-board-compliance`).

---

## 2. Google SERP Sitelinks 6-Pack & SearchAction Engine

Modernisum web applications target Google's coveted **6-Pack Sitelinks Grid** with an integrated Sitelinks Searchbox:

### 2.1 Sitelinks Searchbox Schema (`WebSite`)
Embed on root domain layouts (`school.modernisum.com` and `modernisum.com`):

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "MOD School OS",
  "url": "https://school.modernisum.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://school.modernisum.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

### 2.2 Six Core Sitelink Anchors
Ensure clean internal linking and `SiteNavigationElement` anchors targeting:
1. `/downloads` — Windows x64 Desktop, Android APKs, Chrome Extension
2. `/features` — Biometric Turnstiles, ESC/POS Receipt Printing, GPS Bus Telemetry
3. `/pricing` — Transparent Flat Billing (₹15/₹20 per student/month)
4. `/docs` — Administrator Setup, Teacher Onboarding, Parent App Walkthrough
5. `/contact` — Direct WhatsApp Support, Book Campus Audit
6. `/releases` — Live Version History, SHA-256 Hashes, Changelogs

---

## 3. Master JSON-LD Structured Data Suite

Every major page type must render dedicated schema blocks:

### 3.1 Corporate Authority (`Organization`)
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Modernisum Technologies",
  "legalName": "Modernisum Technologies",
  "identifier": "UDYAM-UP-56-0049848",
  "url": "https://modernisum.com",
  "logo": "https://modernisum.com/logo.png",
  "sameAs": [
    "https://github.com/Modernisum",
    "https://x.com/modernisum"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Support",
    "availableLanguage": ["English", "Hindi"]
  }
}
```

### 3.2 Software Products (`SoftwareApplication`)
Used across `/mod-school/download` and `/mod-school/releases`:
- `applicationCategory`: `BusinessApplication`, `EducationalApplication`
- `operatingSystem`: `Windows 10/11 x64`, `Android 8.0+`, `Google Chrome`
- `offers`: Transparent pricing (`price`: "15.00", `priceCurrency`: "INR")
- `downloadUrl` and `checksum` (SHA-256)

### 3.3 FAQ & Knowledge Base (`FAQPage`)
Convert all landing page accordions and FAQ blocks into semantic `FAQPage` schemas to trigger Google FAQ rich-result accordions directly on search result pages.

### 3.4 Interactive Media (`VideoObject`)
All embedded Google Drive product demos and hardware walkthroughs must include:
- `name`, `description`, `thumbnailUrl`, `uploadDate`, `embedUrl`.

---

## 4. Automated Syndication Feeds & News Sitemaps

To ensure rapid Google crawler indexing (within 15–30 minutes of publishing):

| Feed Route | Format | Content & Update Frequency | Purpose |
| :--- | :--- | :--- | :--- |
| **`/feed.xml`** | RSS 2.0 / Atom | Platform releases, engineering blogs, case studies | Real-time blog syndication & RSS readers |
| **`/news-sitemap.xml`** | Google News XML | Articles published within the last 48 hours | Rapid indexing into Google News tab |
| **`/sitemap.xml`** | XML Sitemap | All canonical routes across public websites | Search crawler route discovery |
| **`/robots.txt`** | Text | Allow public bots, disallow `/admin` and private APIs | Crawl budget optimization |

---

## 5. Social Open Graph & Rich Metadata Architecture

1. **Open Graph Specifications**:
   - `og:image`: 1200x630px high-contrast preview cards showing actual software cockpit screenshots.
   - `og:title`: Concise, high-authority title (`MOD School OS — Sovereign Education Platform`).
   - `og:site_name`: `Modernisum Technologies`.
2. **Twitter / X Cards**:
   - `twitter:card`: `summary_large_image`.
   - `twitter:site`: `@modernisum`.
3. **Canonical URLs**:
   - Every route must define a self-referencing canonical URL (`metadataBase` in Next.js) to prevent duplicate content penalties from URL query parameters.

---

## 6. Core Web Vitals & SERP Speed Budget

Google prioritizes pages that achieve green Core Web Vitals metrics:

| Metric | Target | Optimization Rule |
| :--- | :--- | :--- |
| **LCP (Largest Contentful Paint)** | `< 1.2s` | Priority image preloading (`priority`), static CSS gradient meshes over expensive canvas/blur filters. |
| **INP (Interaction to Next Paint)** | `< 50ms` | Zero heavy main-thread blocking scripts; lightweight React state updates. |
| **CLS (Cumulative Layout Shift)** | `0.000` | Explicit width/height on images and video shells; zero dynamic layout insertion above the fold. |
| **Render Throttling** | Auto | Apply `content-visibility: auto` with `contain-intrinsic-size` to below-the-fold sections. |
