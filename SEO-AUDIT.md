# KroxIT — SEO, Local SEO & CRO Audit

**Audited:** 31 July 2026 · 8 pages, `styles.css`, `app.js`, `assets/`
**Scope:** No redesign. Everything below works within the existing design system.
**Domain:** kroxit.com

---

## ✅ ALREADY IMPLEMENTED (31 July 2026)

These are live in your files now — no action needed:

- **Canonical tags** on all 8 pages (self-referencing, pointing at real `.html` URLs)
- **22 JSON-LD blocks**, all strictly validated: Organization ×8, WebSite ×1, BreadcrumbList ×7, Service ×5, FAQPage ×1
- **Open Graph completed** — `og:url`, `og:locale`, `og:image`, `og:image:alt` on all 8
- **`twitter:card`** upgraded from `summary` → `summary_large_image`
- **`robots.txt`** created — blocks `/errros/`, `/reference/`, `?service=` params
- **`sitemap.xml`** created — all 8 URLs with priorities
- **`SCHEMA-LOCALBUSINESS-TODO.html`** — LocalBusiness schema staged, awaiting your real NAP data
- **All 13 alt attributes rewritten** after viewing every image — see `PHOTO-SHOT-LIST.md`
- **Fabricated testimonial removed** from `index.html` (B4 resolved)

**Correction to §1.4 and §1.5 below:** I originally flagged missing `width`/`height` on images as a CLS cause. On re-checking `styles.css`, every image container already sets `aspect-ratio` + `object-fit: cover` (`.svc-row-media` 5/4, `.blog-thumb` 16/10), so the space is reserved before load and there is no CLS risk from these images. Related: the homepage hero is a `<canvas>` animation, not an image, so there is no LCP image to prioritise on `/` — the "remove lazy from the hero image" advice applies only to `services.html`.

**Two notes on decisions I made:**

1. **Canonicals point to `.html` URLs** (`https://kroxit.com/services.html`), not the clean slugs recommended in §2. A canonical must point at a URL that actually resolves — pointing at `/it-services-mohali` before that rewrite exists would deindex the site. If you later add clean-URL rewrites, update canonicals **and** `sitemap.xml` **and** the schema `url` fields in the same deploy, with 301s from the old paths.

2. **`og:image` temporarily uses `assets/logo-full.png`** (501×283). It's real and it works, but it's below the 1200×630 ideal. Replace it with a proper OG image and update the 8 `og:image` / `twitter:image` tags.

**Still blocked on you:** the LocalBusiness schema — by far the biggest Map Pack lever — cannot go live until the placeholder phone number is replaced. See the Appendix.

---

## 0. READ THIS FIRST — 8 blockers that outrank everything else

These are not "optimizations." Until these are fixed, ranking work is wasted spend, and three of them carry real risk.

| # | Issue | Where | Why it's critical |
|---|---|---|---|
| **B1** | **Phone number is a placeholder** — `+91 12345 67890` appears **10 times** | all 8 pages, footer + `contact.html` + `index.html` CTA | Google cross-references NAP (Name/Address/Phone) between your site and your Google Business Profile. A fake number breaks the match, kills Map Pack eligibility, and every lead that dials it is lost. |
| **B2** | **A second, different phone** — `+91 98765 43210` | `contact.html` | Two conflicting numbers on one site is a direct NAP-consistency penalty signal. |
| **B3** | **WhatsApp number doesn't match either** — `918360853441` | 14 places | This looks like your *real* number. So the site shows customers one number and Google another. Pick one primary. |
| **B4** | **Fabricated testimonial** — "Leslie Alexander, Operations Head, Meridian Group" + an Unsplash stock portrait | `index.html:171–181` | This is an invented review attached to a stock photo of a real person. It violates Google's spam policy on fake reviews, breaches E-E-A-T at the deepest level, and is exposed under India's Consumer Protection (E-commerce) Rules on misleading endorsements. **Remove it today.** Do not replace it with another invented one. |
| **B5** | **Unverifiable trust stats** — "4.9/5 Customer Rating", "2563 Devices Secured" | `index.html:88–89` | If you don't have ~50+ real reviews averaging 4.9, this is a fabricated trust claim. If you *do*, cite the source ("4.9★ from 63 Google reviews") and it becomes your strongest asset. |
| **B6** | **3 fake blog posts** linking to `href="#"` | `index.html:194–217` | Advertises content that doesn't exist. Dead-ends the crawler and the visitor at the exact moment they're most engaged. |
| **B7** | **Zero structured data, zero canonicals, no `robots.txt`, no `sitemap.xml`, no `og:image`** | site-wide | You are invisible to rich results, Map Pack, and social sharing. This is the single biggest *technical* gap and the fastest to close. |
| **B8** | **Every page is thin** — 174 to 507 words | all 8 | Competitors ranking for these terms run 900–2,000 words. You cannot outrank them on 300. |

**Also shipping to production that shouldn't be:** `errros/` (4 screenshot PNGs, 541 KB), `reference/` (5 competitor-reference folders), `assets/hero.jpg` (1.05 MB) and `assets/logo.jpg` (732 KB) — both **completely unreferenced**. That's ~2.3 MB of dead weight, and `reference/` may expose competitor material you don't want public.

---

## 1. COMPLETE SEO AUDIT

### 1.1 Technical — by priority

| Priority | Issue | Evidence | Fix |
|---|---|---|---|
| 🔴 P0 | No `rel="canonical"` on any page | 0/8 pages | Add self-referencing canonical to all 8 |
| 🔴 P0 | No JSON-LD structured data | 0/8 pages | Organization + LocalBusiness + Service + FAQPage + Breadcrumb (§8) |
| 🔴 P0 | No `robots.txt` | absent | Create (§14) |
| 🔴 P0 | No `sitemap.xml` | absent | Create (§14) |
| 🔴 P0 | No `og:image` / `twitter:image` | 0/8 pages | Every social share renders as a blank grey card |
| 🟠 P1 | `twitter:card` set to `summary` | all 8 | Change to `summary_large_image` |
| 🟠 P1 | **All 13 images hotlinked from Unsplash CDN** | `index.html` ×6, `services.html` ×7 | Third-party LCP dependency you don't control. Download, compress to WebP, self-host. |
| 🟠 P1 | Hero image has **no `width`/`height`** | `index.html`, `services.html` | Causes CLS. Add intrinsic dimensions to every `<img>`. |
| 🟠 P1 | Render-blocking Google Fonts | all 8 | 4 families / 9 weights. Drop to 2 families, self-host, `font-display: swap` |
| 🟠 P1 | `lucide@latest` from unpkg, unpinned | all 8 | `@latest` = uncacheable + can break without warning. Pin the version, or tree-shake to the ~25 icons you use (saves ~300 KB) |
| 🟡 P2 | No `lang` variants / `hreflang` | — | Fine for now (single-region) |
| 🟡 P2 | Social links are `href="#"` | all 8 footers | Point to real profiles or remove |
| 🟡 P2 | No breadcrumb navigation | 6 interior pages | Add visible breadcrumbs + BreadcrumbList schema |
| 🟢 P3 | No `.ico` favicon fallback | all 8 | PNG-only; add `favicon.ico` for legacy |

### 1.2 Content

| Priority | Issue | Detail |
|---|---|---|
| 🔴 P0 | **Thin content** | `book.html` 174w · `amc.html` 216w · `networking-services.html` 306w · `local-repair.html` 318w · `server-cloud-services.html` 313w · `contact.html` 342w · `index.html` 472w · `services.html` 507w. Target: 900–1,800w for service pages. |
| 🔴 P0 | **Keyword cannibalization** | `services.html#networking` and `networking-services.html` both target *"networking services Mohali"*. Same for `#repairs` ↔ `local-repair.html`, and `#server-cloud` ↔ `server-cloud-services.html`. Google will pick one and suppress the other — probably the wrong one. **Fix in §10.** |
| 🔴 P0 | **9 of your 17 stated services have no page at all** | Missing: Managed IT Services, Firewall Configuration (only a section), WiFi Setup, Access Point Installation, Network Security, Printer Setup, Data Backup, Microsoft 365 Support, Remote IT Support. These are your highest-intent commercial terms. |
| 🟠 P1 | **Zero location pages** | You target 6 locations and have 0 dedicated location pages. Your competitor has dozens. |
| 🟠 P1 | FAQs exist on only 1 of 8 pages | `contact.html` has 5. Every service page needs 5–8. |
| 🟠 P1 | No author/expertise signals | No team page, no certifications, no engineer bios, no case studies. E-E-A-T floor. |
| 🟠 P1 | Homepage H1 has no service or location | `"Managed IT & Security Solutions"` — generic. Should carry the primary term + Tricity. |
| 🟡 P2 | Commented-out dead code | `services.html:54–65` — a whole abandoned nav grid still in source |
| 🟡 P2 | `.svc-row` H2s are feature names, not queries | *"Whole-building network setup"* → should be *"Office Network & LAN Setup in Mohali"* |

### 1.3 Heading structure

Good news: **exactly one `<h1>` per page** across all 8 — that's correct and rarer than you'd think.

Problems:
- `index.html` H1 is split across `<span>`/`<br>` — reads to a crawler as `"Managed IT & Security Solutions"`, no location, no service.
- Interior H1s are **very long**: `"Networking & whole-building network setup in Mohali, Zirakpur, Chandigarh & Panchkula"` (84 chars). Google truncates and it reads as stuffing. Shorten to one primary location; put the others in body copy.
- H2→H3 nesting is clean; no skipped levels found.

### 1.4 Images & alt text

Every `<img>` **has** an alt attribute — good. But the alts are generic and location-free:

| Current | Better |
|---|---|
| `alt="Structured network cabling"` | `alt="KroxIT engineer installing structured network cabling in a Mohali office"` |
| `alt="CCTV surveillance cameras"` | `alt="CCTV camera installation at a commercial site in Zirakpur"` |
| `alt="KroxIT"` (logo, ×16) | `alt="KroxIT Solutions — IT support in Mohali"` on the footer instance only; keep nav minimal |

Also: `loading="lazy"` is applied — but it's on the **hero/LCP image too**, which *delays* LCP. Remove lazy from the first above-fold image on each page; keep it everywhere below.

### 1.5 Core Web Vitals — predicted

| Metric | Predicted | Cause | Fix |
|---|---|---|---|
| **LCP** | 🔴 Poor (>4s) | 1MB+ Unsplash images over third-party CDN, render-blocking fonts + `lucide@latest` | Self-host WebP, `fetchpriority="high"` on hero, preload it |
| **CLS** | 🟠 Needs work | Images lack `width`/`height`; webfont swap | Add dimensions; the icon-box reservation is already in place |
| **INP** | 🟢 Good | Light JS. The canvas globe (`app.js:30–75`) runs a permanent `requestAnimationFrame` | Pause the loop when the hero scrolls out of view — saves battery on mobile |
| **TTFB** | ❓ | Depends on host — unknown | Use a CDN; enable Brotli |

**Mobile:** the responsive system is solid (drawer nav, fluid type, `aspect-ratio` on media). Main mobile risk is payload weight, not layout.

---

## 2. META SEO — every page, no duplicates

Replace `https://kroxit.com` with your real domain throughout.

### Existing pages

**1. `index.html` → `/`**
- **Title:** `IT Support & Managed IT Services in Mohali | KroxIT` *(54)*
- **Meta:** `Business IT support, AMC, networking & security across Mohali, Zirakpur, Chandigarh & Panchkula. On-site engineers, 24/7 response. Get a free audit.` *(150)*
- **Canonical:** `https://kroxit.com/`
- **Focus:** `IT support Mohali`
- **Secondary:** managed IT services Mohali · IT company Chandigarh Tricity · business IT support Zirakpur
- **LSI:** IT infrastructure, on-site engineer, network uptime, service-level agreement, help desk
- **NLP:** *who provides IT support for offices in Mohali*, *managed IT provider near IT City*

**2. `services.html` → `/it-services-mohali`**
- **Title:** `IT Services in Mohali — Network, Server & Security | KroxIT` *(58)*
- **Meta:** `Complete IT services for Tricity businesses: networking, firewalls, CCTV, biometrics, servers, cloud & AMC. One accountable team. Book a free IT audit.` *(153)*
- **Focus:** `IT services Mohali`
- **Secondary:** IT solutions Chandigarh · corporate IT services Panchkula
- **LSI:** structured cabling, VLAN, deep packet inspection, access control, disaster recovery
- **NLP:** *what IT services do businesses in Mohali need*

**3. `amc.html` → `/it-amc-services-mohali`**
- **Title:** `Computer & IT AMC Services in Mohali | KroxIT Plans` *(51)*
- **Meta:** `Annual Maintenance Contracts for offices in Mohali & Tricity. Scheduled audits, preventive replacement, priority SLA. Transparent per-device pricing.` *(149)*
- **Focus:** `IT AMC services Mohali`
- **Secondary:** computer AMC Chandigarh · annual maintenance contract Panchkula · laptop AMC Zirakpur
- **LSI:** preventive maintenance, SLA response time, per-device pricing, uptime guarantee
- **NLP:** *how much does a computer AMC cost in Mohali*
- ⚠️ **This is your single highest-value commercial page** — your main competitor's entire strategy is built on AMC keywords. It's currently 216 words. Prioritize it.

**4. `contact.html` → `/contact`**
- **Title:** `Contact KroxIT — IT Support in Mohali & Tricity` *(47)*
- **Meta:** `Talk to a KroxIT engineer about IT support, AMC or network setup in Mohali, Zirakpur, Chandigarh & Panchkula. Call, WhatsApp or book a site visit.` *(148)*
- **Focus:** `IT support company contact Mohali`
- **Schema:** ContactPage + LocalBusiness + the 5 existing FAQs as FAQPage

**5. `book.html` → `/book-consultation`**
- **Title:** `Book a Free IT Consultation in Mohali | KroxIT` *(46)*
- **Meta:** `Book a free on-site IT consultation in Mohali, Zirakpur, Chandigarh or Panchkula. Three quick steps, response within one business hour.` *(137)*
- **Focus:** `book IT consultation Mohali`
- **Note:** add `<meta name="robots" content="noindex,follow">` **only** on the step-3 confirmation state if it ever gets its own URL.

**6. `networking-services.html` → `/networking-services-mohali`**
- **Title:** `Office Network & LAN Setup in Mohali | KroxIT` *(45)*
- **Meta:** `Structured cabling, VLAN switching, fiber backbone & mesh WiFi installation for offices in Mohali, IT City Sector 82 and across the Tricity.` *(141)*
- **Focus:** `network setup Mohali`
- **Secondary:** office LAN installation Chandigarh · structured cabling Zirakpur · WiFi installation Panchkula

**7. `local-repair.html` → `/laptop-repair-mohali`**
- **Title:** `Laptop & Desktop Repair in Mohali | Doorstep | KroxIT` *(53)*
- **Meta:** `Doorstep laptop and desktop repair in Mohali, Zirakpur, Chandigarh & Panchkula. Certified engineers, genuine parts, warranty on every repair.` *(142)*
- **Focus:** `laptop repair Mohali`
- **Secondary:** desktop repair Chandigarh · doorstep laptop service Zirakpur · SSD upgrade Mohali

**8. `server-cloud-services.html` → `/server-cloud-services-mohali`**
- **Title:** `Server Installation & Cloud Services Mohali | KroxIT` *(52)*
- **Meta:** `Server installation, data centre setup, hardware repair and cloud migration for businesses in Mohali, Chandigarh, Zirakpur and Panchkula.` *(139)*
- **Focus:** `server installation Mohali`
- **Secondary:** data centre setup Chandigarh · cloud migration Tricity · server AMC Mohali

### New pages to create (§13 explains why)

| Slug | Title (≤60) | Focus keyword |
|---|---|---|
| `/managed-it-services-mohali` | `Managed IT Services in Mohali & Tricity \| KroxIT` | managed IT services Mohali |
| `/firewall-installation-mohali` | `Firewall Installation & Configuration Mohali \| KroxIT` | firewall configuration Mohali |
| `/cctv-installation-mohali` | `CCTV Camera Installation in Mohali \| KroxIT` | CCTV installation Mohali |
| `/wifi-installation-mohali` | `Office WiFi & Access Point Setup Mohali \| KroxIT` | office WiFi setup Mohali |
| `/network-security-services-mohali` | `Network Security Services in Mohali \| KroxIT` | network security Mohali |
| `/microsoft-365-support-mohali` | `Microsoft 365 Setup & Support in Mohali \| KroxIT` | Microsoft 365 support Mohali |
| `/data-backup-recovery-mohali` | `Data Backup & Recovery Services Mohali \| KroxIT` | data backup Mohali |
| `/remote-it-support` | `Remote IT Support for Tricity Businesses \| KroxIT` | remote IT support Chandigarh |
| `/printer-setup-repair-mohali` | `Printer Setup & Repair Services in Mohali \| KroxIT` | printer repair Mohali |
| `/it-infrastructure-setup-mohali` | `IT Infrastructure Setup for Offices Mohali \| KroxIT` | IT infrastructure setup Mohali |
| `/about` | `About KroxIT — IT Engineers Serving the Tricity` | KroxIT IT company Mohali |
| `/case-studies` | `IT Project Case Studies — Mohali & Tricity \| KroxIT` | IT case study Mohali |

**Location pages** (create *after* the service pages — these are lower priority and easy to get wrong):

`/it-support-mohali` · `/it-support-zirakpur` · `/it-support-chandigarh` · `/it-support-panchkula` · `/it-support-it-city-sector-82-mohali` · `/it-support-kharar` · `/it-support-dera-bassi`

---

## 3. LOCAL SEO

### The non-negotiable foundation

1. **Fix NAP first (B1–B3).** One real phone, one real email, one full postal address with pincode. Identical byte-for-byte on: website footer, GBP, Justdial, Sulekha, IndiaMART, Facebook, LinkedIn.
2. **Full address, not "Sector 21, Mohali."** You need `Building/Plot, Sector, Mohali, Punjab 160055` format.
3. **Embed a Google Map** on `/contact` — pull the iframe from *your own GBP listing*, not a generic pin.

### How to use locations without stuffing

Your current H1s cram all four cities in: *"…in Mohali, Zirakpur, Chandigarh & Panchkula"*. Google reads that as a list, not as relevance. Instead:

- **One primary city per page**, in the H1.
- **Other cities in natural body prose:** *"Most of our field work is in Mohali's IT City and Sector 82 corridor, though we run scheduled visits into Zirakpur and Panchkula on the same SLA."*
- **A "Service Areas" section** with genuinely differentiated copy per area — not the same paragraph with the city swapped. Mention actual landmarks: IT Park Mohali, Quark City, Bestech Business Tower, Sector 82 IT City, VIP Road Zirakpur, Industrial Area Phase 8.
- **Local proof beats local keywords.** One sentence — *"We maintain the network at a 40-seat firm in Quark City"* — outperforms fifty repetitions of "IT support Mohali."

### Citations to build (in order)

Google Business Profile → Justdial → Sulekha → IndiaMART → Bing Places → Apple Business Connect → TradeIndia → Yellow Pages India → Punjab/Chandigarh local directories → LinkedIn Company Page.

---

## 4 & 5. CONTENT + SERVICE PAGE TEMPLATE

Apply this structure to **every** service page. It's the gap between your 300 words and a competitor's 1,500.

```
H1        [Service] in [Primary City] — [outcome-focused qualifier]
Intro     2–3 sentences. Problem → outcome. Location in the first 100 words, once.

H2  What's included
    H3 × 4–6 — each a real deliverable, 40–60 words. Not a bullet.

H2  Who this is for
    Industries: offices, schools, hospitals, hotels, warehouses,
    manufacturing, retail, startups. One line each on their SPECIFIC
    problem — a hospital's uptime need ≠ a warehouse's coverage need.

H2  Our process
    H3 Site survey → H3 Design & quote → H3 Installation →
    H3 Testing & handover → H3 Ongoing support
    Include realistic timelines. "Most 20-seat offices: 3–4 working days."

H2  Why businesses in [City] choose KroxIT
    Certifications. Years active. Response-time commitment. Warranty terms.
    Genuine-parts policy. Named brands you're certified on.
    ⚠️ Only claims you can actually evidence.

H2  Areas we cover
    Prose, not a badge grid. Landmarks and sectors.

H2  Pricing / what it costs
    Even a range beats silence. "Structured cabling from ₹X per point."
    This is the #1 unanswered question and a huge ranking opportunity —
    almost no local competitor publishes pricing.

H2  Frequently asked questions
    5–8 real questions in customer language. → FAQPage schema.

CTA block  Call · WhatsApp · Book a site visit

Related services (3–4 internal links, descriptive anchors)
```

**Tone rules for the rewrite:** first person plural, specific numbers over adjectives, no "cutting-edge/robust/seamless/state-of-the-art," admit limits (that's an E-E-A-T *positive*), and lead with what the customer gets, not what you own.

**Per-page assets:**

| Page | Suggested images | Icons (Lucide — already loaded) | Schema |
|---|---|---|---|
| Networking | Real cabling job, rack close-up, floor plan | `cable` `git-branch` `wifi` `network` | `Service` + `FAQPage` |
| Laptop repair | Bench with tools, before/after, parts | `laptop` `wrench` `hard-drive` `shield-check` | `Service` + `FAQPage` + `Offer` |
| Server & cloud | Rack install, monitoring dashboard | `server` `cloud` `database` `activity` | `Service` + `FAQPage` |
| AMC | Engineer on site, sample health report | `calendar-check` `file-check` `clock` `badge-check` | `Service` + `Offer` + `FAQPage` |
| Firewall | Appliance install, dashboard | `shield-check` `lock` `eye` | `Service` + `FAQPage` |
| CCTV | Camera install, live-view wall | `eye` `video` `cloud` | `Service` + `FAQPage` |

> **Use your own photographs.** Every image on the site is currently a hotlinked Unsplash stock photo. Ten real phone photos of your engineers on actual jobs will do more for E-E-A-T and conversion than any copy rewrite in this document.

---

## 6. BLOG STRATEGY — 100 topics

Publish 2–3/week. Cluster → link up to the money page. Format: **Title** — *target keyword*.

### IT Support Mohali / Tricity (1–12)
1. How much does IT support cost in Mohali? — *IT support cost Mohali*
2. In-house IT vs outsourced IT support for Tricity businesses — *outsourced IT support Chandigarh*
3. 9 signs your office needs professional IT support — *when to hire IT support*
4. What to expect from an on-site IT engineer visit — *on-site IT support Mohali*
5. IT support for startups in IT City Sector 82 — *IT support IT City Mohali*
6. Choosing an IT partner in Chandigarh: 12 questions to ask — *IT company Chandigarh*
7. Average IT downtime cost for a 20-person office — *cost of IT downtime*
8. IT support checklist for a new office in Zirakpur — *new office IT setup Zirakpur*
9. Why Tricity SMEs overpay for IT — *IT costs small business India*
10. Response time vs resolution time: what SLAs really mean — *IT SLA meaning*
11. IT support for schools in Mohali — *school IT support Mohali*
12. IT support for hospitals and clinics in the Tricity — *hospital IT support Chandigarh*

### Laptop & Desktop Repair (13–24)
13. Laptop won't turn on: 8 checks before you call — *laptop not turning on fix*
14. Laptop repair cost in Mohali: honest 2026 price guide — *laptop repair cost Mohali*
15. Repair or replace? A 5-year-old business laptop — *repair or replace laptop*
16. HDD to SSD upgrade: what actually changes — *SSD upgrade laptop Mohali*
17. Laptop overheating in Punjab summers — *laptop overheating fix*
18. Screen replacement: OEM vs compatible panels — *laptop screen replacement Mohali*
19. Data recovery from a dead laptop — *data recovery Mohali*
20. Laptop battery replacement: when and what it costs — *laptop battery replacement Chandigarh*
21. Doorstep laptop repair: how it works — *doorstep laptop repair Zirakpur*
22. Keyboard and trackpad failures: causes and fixes — *laptop keyboard repair*
23. Bulk laptop servicing for offices — *corporate laptop AMC Mohali*
24. Buying refurbished business laptops in Chandigarh — *refurbished laptop Chandigarh*

### Firewall & Network Security (25–38)
25. Do small businesses actually need a firewall? — *firewall for small business*
26. Firewall setup cost in Mohali — *firewall installation cost India*
27. Router vs firewall: the difference that matters — *router vs firewall*
28. UTM firewalls explained for non-technical owners — *UTM firewall meaning*
29. Sophos vs Fortinet vs SonicWall for Indian SMEs — *best firewall small business India*
30. Firewall rules every office should have — *firewall rules checklist*
31. Ransomware: what an SME can realistically do — *ransomware protection small business*
32. Phishing training for a 30-person office — *phishing awareness training India*
33. Network security audit: what we check — *network security audit Mohali*
34. VPN setup for remote staff — *business VPN setup India*
35. Guest WiFi that doesn't expose your network — *secure guest WiFi office*
36. Zero-trust for a small business: practical version — *zero trust small business*
37. Cybersecurity compliance basics for Indian SMEs — *cybersecurity compliance India*
38. What a firewall log actually tells you — *firewall log analysis*

### Networking & Office WiFi (39–52)
39. Office network setup cost in Mohali — *office network setup cost*
40. Structured cabling: Cat6 vs Cat6a vs fiber — *Cat6 vs Cat6a office*
41. Why your office WiFi dies at 3pm — *office WiFi slow fix*
42. Access point placement for a two-floor office — *WiFi access point placement*
43. Mesh WiFi vs multiple access points — *mesh vs access point office*
44. VLANs explained without jargon — *what is a VLAN*
45. Network setup for a new warehouse — *warehouse network setup*
46. WiFi for hotels: guest network design — *hotel WiFi setup India*
47. Managed vs unmanaged switches — *managed vs unmanaged switch*
48. Cable management that saves you money later — *server rack cable management*
49. Network setup timeline for a 50-seat office — *office LAN installation time*
50. Fiber backbone: when it's worth it — *fiber backbone office*
51. WiFi 6 vs WiFi 5 for business — *WiFi 6 business upgrade*
52. Network documentation you should demand — *network documentation checklist*

### Server, Cloud & Backup (53–66)
53. On-premise server vs cloud for Tricity SMEs — *on premise vs cloud India*
54. Server installation cost in Mohali — *server installation cost India*
55. Server room setup: cooling, power, access — *server room setup requirements*
56. RAID levels explained for business owners — *RAID for small business*
57. The 3-2-1 backup rule, applied — *3-2-1 backup rule*
58. Backup vs disaster recovery — *backup vs disaster recovery*
59. Migrating a file server to the cloud — *file server cloud migration*
60. NAS for a small office: worth it? — *NAS for small business India*
61. Server AMC: what should be covered — *server AMC Mohali*
62. UPS sizing for a server rack — *UPS sizing server room*
63. Virtualization for a 3-server office — *server virtualization small business*
64. Testing your backups (nobody does this) — *backup testing procedure*
65. Cloud costs that surprise Indian SMEs — *cloud hosting cost India*
66. Data centre setup in Mohali: what's involved — *data centre setup Mohali*

### Microsoft 365 (67–76)
67. Microsoft 365 plans compared for Indian SMEs — *Microsoft 365 plans India*
68. Migrating from Gmail to Microsoft 365 — *Gmail to Microsoft 365 migration*
69. Microsoft 365 security settings you're missing — *Microsoft 365 security checklist*
70. SharePoint vs OneDrive vs Teams files — *SharePoint vs OneDrive*
71. Microsoft 365 backup: why you still need it — *Microsoft 365 backup*
72. MFA rollout without a staff revolt — *MFA rollout small business*
73. Email signature management across a team — *centralised email signature 365*
74. Microsoft 365 licence audit: cutting waste — *Microsoft 365 licence optimisation*
75. Setting up a business email domain — *business email setup India*
76. Teams for a 25-person office: setup guide — *Microsoft Teams setup small business*

### AMC & Managed IT (77–88)
77. What a computer AMC should include — *computer AMC inclusions*
78. AMC cost per device in Mohali — *computer AMC cost per system*
79. Comprehensive vs non-comprehensive AMC — *comprehensive AMC meaning*
80. AMC vs break-fix: the real math — *AMC vs break fix*
81. Questions to ask before signing an AMC — *AMC contract questions*
82. What a monthly IT health report should show — *IT health report sample*
83. Managed IT services explained — *what is managed IT services*
84. Preventive maintenance schedule for offices — *IT preventive maintenance checklist*
85. AMC for schools and colleges — *school computer AMC Punjab*
86. IT asset management for growing companies — *IT asset management SME*
87. When to renegotiate your AMC — *AMC renewal negotiation*
88. Why cheapest AMC costs most — *choosing AMC provider*

### CCTV, Access & Printers (89–96)
89. CCTV installation cost in Mohali — *CCTV installation cost Mohali*
90. How many cameras does your office need? — *CCTV camera count office*
91. CCTV legal requirements in India — *CCTV rules India workplace*
92. IP vs analog cameras — *IP vs analog CCTV*
93. Biometric attendance systems compared — *biometric attendance system India*
94. Access control for multi-door offices — *access control system Mohali*
95. Network printer setup for a shared office — *network printer setup*
96. Printer maintenance that prevents 80% of calls — *printer maintenance tips office*

### Remote Support & Business IT (97–100)
97. How remote IT support actually works — *remote IT support India*
98. Remote vs on-site: what needs a visit — *remote vs onsite IT support*
99. IT budget planning for the year ahead — *IT budget small business*
100. IT setup checklist for a new business in Punjab — *new business IT checklist India*

---

## 7. GOOGLE BUSINESS PROFILE

> Fill in real details where marked. **Do not publish placeholders to GBP** — suspensions are hard to reverse.

### Business description (740/750 chars)

> KroxIT provides managed IT services, IT support and infrastructure setup for businesses across Mohali, Zirakpur, Chandigarh and Panchkula. Our engineers handle office networking and structured cabling, firewall configuration, CCTV and biometric access control, server installation, cloud migration, and laptop and desktop repair — on site or remotely.
>
> We work with offices, startups, schools, hospitals, hotels, warehouses, manufacturing units and retail businesses across the Tricity, including the IT City Sector 82 and IT Park corridors in Mohali.
>
> Annual Maintenance Contracts include scheduled health checks, preventive component replacement, patching and priority response, so problems get caught before they stop your work.
>
> Call or WhatsApp us to arrange a site visit.

**Primary category:** Computer Support and Services

**Secondary categories:** Computer Repair Service · Computer Networking Service · Computer Consultant · Computer Security Service · Security System Installer · Data Recovery Service · Telecommunications Service Provider · Computer Service · Internet Service Provider *(only if genuinely applicable)*

**Services to list** (each with a 200–300 char description): Managed IT Services · IT Support · AMC · Laptop Repair · Desktop Repair · Office Networking · Structured Cabling · WiFi Installation · Access Point Setup · Firewall Configuration · Network Security · Server Installation · Data Centre Setup · Cloud Migration · Data Backup & Recovery · Microsoft 365 Support · CCTV Installation · Biometric Access Control · Printer Setup & Repair · Remote IT Support · On-site IT Support · IT Infrastructure Setup

Example description — *Firewall Configuration*: "Gateway firewall installation and rule configuration for offices in Mohali and the Tricity. Includes deep packet inspection, content filtering, VPN access for remote staff, and monthly threat reporting."

**Attributes:** Online appointments · On-site services · Language: English/Hindi/Punjabi · Identifies as small business · Wheelchair accessible entrance *(if true)* · Free consultation *(if true)*

**Appointment CTA:** Booking URL → `https://kroxit.com/book-consultation`

### GBP posts — 12-week rotation

| Week | Type | Hook |
|---|---|---|
| 1 | Offer | Free IT audit for Mohali offices this month |
| 2 | Update | Structured cabling completed for a 40-seat IT City office |
| 3 | Product | AMC plans from ₹— per device/year |
| 4 | Update | Why office WiFi slows after lunch — and the fix |
| 5 | Offer | Doorstep laptop repair across Zirakpur |
| 6 | Update | Firewall rollout for a Panchkula manufacturing unit |
| 7 | Product | Microsoft 365 migration package |
| 8 | Update | 3-2-1 backup explained in 60 seconds |
| 9 | Offer | Same-day emergency IT response |
| 10 | Update | CCTV grid installed at a Chandigarh retail store |
| 11 | Product | Server installation & data centre setup |
| 12 | Update | Our 5-step network handover process |

Post weekly. Every post: a real photo, one CTA, one location mention.

### Q&A — seed these yourself, then answer

1. Do you provide on-site IT support in Zirakpur? 2. What areas do you cover? 3. Do you offer AMC for small offices? 4. Do you repair laptops at the customer's location? 5. How fast can you respond to an emergency? 6. Do you work with schools and hospitals? 7. Do you provide a warranty on repairs? 8. Can you set up a network for a brand-new office? 9. Do you support Microsoft 365? 10. What are your working hours?

### Review reply templates

**5★:** "Thank you, [Name] — glad the [specific service] went smoothly. Your [network/setup] is on our maintenance schedule, so reach out any time. — Team KroxIT"

**4★:** "Thanks for the honest feedback, [Name]. Noted on [specific point] — we've adjusted how we handle that. Appreciate you taking the time. — Team KroxIT"

**3★ or below:** "Thank you for raising this, [Name]. [Specific issue] isn't the standard we work to. I'd like to put it right — please call me directly on [number] and I'll handle it personally. — [Owner name], KroxIT"

Never argue publicly. Always name the specific service. Reply within 24h. **Never incentivize reviews** — that's a policy violation and a suspension risk.

---

## 8. SCHEMA MARKUP (JSON-LD)

Replace every `REPLACE_*` value with real data before publishing.

### 8.1 Organization + LocalBusiness — sitewide, in `<head>` of every page

```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://kroxit.com/#organization",
  "name": "KroxIT Solutions",
  "alternateName": "KroxIT",
  "url": "https://kroxit.com/",
  "logo": "https://kroxit.com/assets/logo-full.png",
  "image": "https://kroxit.com/assets/office.jpg",
  "description": "Managed IT services, IT support, networking, security and AMC for businesses across Mohali, Zirakpur, Chandigarh and Panchkula.",
  "telephone": "REPLACE_WITH_REAL_PHONE",
  "email": "REPLACE_WITH_REAL_EMAIL",
  "priceRange": "₹₹",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "REPLACE_WITH_FULL_STREET_ADDRESS",
    "addressLocality": "Mohali",
    "addressRegion": "Punjab",
    "postalCode": "REPLACE_PINCODE",
    "addressCountry": "IN"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": "REPLACE_LAT", "longitude": "REPLACE_LNG" },
  "areaServed": [
    { "@type": "City", "name": "Mohali" },
    { "@type": "City", "name": "Zirakpur" },
    { "@type": "City", "name": "Chandigarh" },
    { "@type": "City", "name": "Panchkula" },
    { "@type": "Place", "name": "IT City Sector 82, Mohali" }
  ],
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
    "opens": "09:30", "closes": "19:00"
  }],
  "sameAs": ["REPLACE_LINKEDIN_URL", "REPLACE_FACEBOOK_URL", "REPLACE_GBP_SHORT_URL"],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "IT Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Managed IT Services" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Annual Maintenance Contract" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Office Networking & LAN Setup" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Firewall Configuration" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Server Installation" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Laptop & Desktop Repair" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "CCTV Installation" } }
    ]
  }
}
```

> ⚠️ **Do not add `aggregateRating` until you have real, verifiable reviews.** Self-serving review markup without a genuine source is a manual-action risk — and right now the "4.9/5" on your homepage has no source at all.

### 8.2 Service — one per service page

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Office Network & LAN Setup",
  "provider": { "@id": "https://kroxit.com/#organization" },
  "areaServed": [
    { "@type": "City", "name": "Mohali" },
    { "@type": "City", "name": "Zirakpur" },
    { "@type": "City", "name": "Chandigarh" },
    { "@type": "City", "name": "Panchkula" }
  ],
  "description": "Structured cabling, VLAN switching, fibre backbone and mesh WiFi installation for offices across the Chandigarh Tricity.",
  "url": "https://kroxit.com/networking-services-mohali",
  "offers": { "@type": "Offer", "availability": "https://schema.org/InStock", "priceCurrency": "INR" }
}
```

### 8.3 FAQPage — your 5 existing questions, ready to paste

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "How do I get my device repaired?",
      "acceptedAnswer": { "@type": "Answer", "text": "REPLACE_WITH_THE_ANSWER_TEXT_ON_YOUR_PAGE" } },
    { "@type": "Question", "name": "How fast is emergency support?",
      "acceptedAnswer": { "@type": "Answer", "text": "REPLACE_WITH_THE_ANSWER_TEXT_ON_YOUR_PAGE" } },
    { "@type": "Question", "name": "Can you handle multi-building networks?",
      "acceptedAnswer": { "@type": "Answer", "text": "REPLACE_WITH_THE_ANSWER_TEXT_ON_YOUR_PAGE" } },
    { "@type": "Question", "name": "How do I get AMC pricing?",
      "acceptedAnswer": { "@type": "Answer", "text": "REPLACE_WITH_THE_ANSWER_TEXT_ON_YOUR_PAGE" } },
    { "@type": "Question", "name": "Do repairs come with a warranty?",
      "acceptedAnswer": { "@type": "Answer", "text": "REPLACE_WITH_THE_ANSWER_TEXT_ON_YOUR_PAGE" } }
  ]
}
```
The answer text must match the visible page text exactly, or it's a violation.

### 8.4 BreadcrumbList — every interior page

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://kroxit.com/" },
    { "@type": "ListItem", "position": 2, "name": "IT Services", "item": "https://kroxit.com/it-services-mohali" },
    { "@type": "ListItem", "position": 3, "name": "Network Setup" }
  ]
}
```

### 8.5 WebSite — homepage only

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://kroxit.com/#website",
  "url": "https://kroxit.com/",
  "name": "KroxIT Solutions",
  "publisher": { "@id": "https://kroxit.com/#organization" },
  "inLanguage": "en-IN"
}
```

---

## 9. CONVERSION OPTIMIZATION

### What's already working
Sticky WhatsApp float · 3-step booking wizard with service pre-selection via `?service=` · consistent nav CTA · trust strip on interior pages. That's a better foundation than most local IT sites.

### Fixes, by expected impact

| Impact | Issue | Fix |
|---|---|---|
| 🔴 High | **No phone CTA anywhere in the nav** | Local IT buyers call. Add a click-to-call button beside "Book a Consultation" — it will likely outconvert the form. |
| 🔴 High | **Hero has no offer or proof** | "Managed IT & Security Solutions" says nothing. Try: **"IT support for Tricity businesses — engineer on site within 4 hours."** Add a one-line proof under it. |
| 🔴 High | **Trust signals are unverifiable** (B4, B5) | Replace the fake testimonial and unsourced stats with: real Google review count + link, years in business, engineer count, brand certifications, client logos (with permission). |
| 🔴 High | **No pricing anywhere** | AMC page has plans but no numbers. "From ₹X/device/year" removes the biggest friction point and wins featured snippets. |
| 🟠 Med | Booking form asks for everything at once in step 2 | Ask for phone first. Name + phone alone should be enough to submit; everything else optional. |
| 🟠 Med | **Contact form doesn't submit anywhere** — `app.js:203–212` fakes success | Every "message" sent so far has been silently discarded. Wire to Formspree/Web3Forms/your backend **before** driving traffic. |
| 🟠 Med | Mobile has no sticky call bar | Add a fixed bottom bar: `Call` · `WhatsApp` · `Book` on ≤640px |
| 🟠 Med | No urgency or response promise | "We reply within one business hour, 9:30am–7pm" |
| 🟡 Low | Blog cards go nowhere | Remove until real posts exist |
| 🟡 Low | Footer social links `href="#"` | Real profiles or delete |
| 🟡 Low | WhatsApp float has no prefilled text on most pages | The networking page does it right — copy that everywhere |

---

## 10. INTERNAL LINKING & SILO

### Fix the cannibalization first

Right now `services.html#networking` and `networking-services.html` compete. Resolve it by making them **different page types**:

- `services.html` = **hub**. Short 80-word summary per service + a strong link out. It should rank for *"IT services Mohali"*, nothing narrower.
- `networking-services.html` = **spoke**. The deep, 1,200-word page that ranks for *"network setup Mohali"*.

Then delete the duplicate detail from the hub, and make every hub → spoke link use a descriptive anchor.

### Silo

```
/  (Home — "IT support Mohali")
│
├── /it-services-mohali  (HUB)
│   ├── /managed-it-services-mohali
│   ├── /networking-services-mohali ──┬── /wifi-installation-mohali
│   │                                 └── /it-infrastructure-setup-mohali
│   ├── /firewall-installation-mohali ─── /network-security-services-mohali
│   ├── /server-cloud-services-mohali ─── /data-backup-recovery-mohali
│   ├── /cctv-installation-mohali
│   ├── /laptop-repair-mohali ─────────── /printer-setup-repair-mohali
│   ├── /microsoft-365-support-mohali
│   └── /remote-it-support
│
├── /it-amc-services-mohali  (money page — link from everywhere)
├── /locations/  → 6 city pages → each links to top 4 services
├── /blog/  → clusters → link UP to matching service page
├── /about · /case-studies · /contact · /book-consultation
```

### Anchor text rules
- Descriptive, varied: *"office network setup in Mohali"*, not *"click here"* or *"read more"* (your `.svc-link` uses "Read More" ×7 on the homepage — change each one).
- 3–6 contextual in-body links per page, above the footer.
- Every blog post links up to exactly one money page with an exact-ish anchor.
- Every service page links to AMC and to `/contact`.

---

## 11. KEYWORD RESEARCH

**Primary (build pages for these):** IT support Mohali · IT services Mohali · managed IT services Mohali · computer AMC Mohali · laptop repair Mohali · network setup Mohali · CCTV installation Mohali · server installation Mohali · firewall installation Mohali · IT company Chandigarh

**Secondary:** IT support Zirakpur · IT services Panchkula · IT company Chandigarh Tricity · office WiFi setup Chandigarh · desktop repair Chandigarh · network security Mohali · data backup Mohali · Microsoft 365 support Chandigarh · IT AMC Panchkula · biometric attendance Mohali

**Long-tail:** IT support company in IT City Sector 82 Mohali · annual maintenance contract for computers in Mohali · office LAN installation Zirakpur · doorstep laptop repair in Mohali · structured cabling contractor Chandigarh · firewall configuration service Panchkula · server room setup Mohali · IT support for schools in Mohali · onsite IT engineer Zirakpur · CCTV installation for offices Chandigarh

**Commercial:** best IT company in Mohali · top IT support Chandigarh · IT AMC providers in Tricity · managed IT services provider Punjab · IT support companies near me

**Transactional:** book IT consultation Mohali · IT AMC quote Mohali · laptop repair near me Mohali · hire IT support Chandigarh · get network setup quote · emergency IT support Mohali

**Informational:** what is managed IT services · computer AMC meaning · how much does IT support cost · what is a VLAN · firewall vs antivirus · what is structured cabling

**Question keywords:** how much does a computer AMC cost in Mohali · who provides IT support in Zirakpur · what should an AMC include · how long does office network setup take · do small businesses need a firewall · how fast can an IT engineer reach my office · is doorstep laptop repair reliable · what does an IT health report show

**Low competition, high value (start here):** IT support IT City Sector 82 · computer AMC Dera Bassi · office network setup Kharar · IT support for warehouses Mohali · hotel WiFi setup Zirakpur · IT support for manufacturing units Panchkula · school computer AMC Punjab · biometric attendance system Mohali

**High intent (put budget behind these):** emergency IT support Mohali · same day laptop repair Mohali · IT AMC quote · server installation cost Mohali · firewall setup Chandigarh price

---

## 12. COMPETITOR ANALYSIS

I searched live for your market. The dominant player for AMC and IT-infrastructure terms across the Tricity is **Sidigiqor Technologies OPC Pvt Ltd** (`sidigiqor.com`), plus satellite WordPress properties targeting the same terms.

### Why they rank

1. **Massive service × location page permutation.** They run separate pages for *Computer AMC Chandigarh*, *Computer AMC Mohali*, *Computer AMC Panchkula*, *Laptop AMC Mohali Sector 68*, *Desktop AMC Mohali*, *Network AMC Mohali* — each a distinct URL. You have **zero** location pages.
2. **Sector-level granularity.** "Laptop AMC in Mohali Sector 68" is precisely the low-competition, high-intent long tail you're not touching.
3. **Wider geographic net.** They also target Zirakpur, Pinjore, Kalka, Kharar, Baddi and Dera Bassi — spillover towns you're ignoring.
4. **Trust markers.** "Startup India certified" is displayed prominently — a cheap, verifiable authority signal.
5. **Satellite blogs** on free WordPress subdomains feeding links and capturing extra SERP real estate.
6. **Volume.** Many indexed URLs on one narrow topic = topical authority. You have 8 pages total.

### Where they're weak — your opening

| Their weakness | Your play |
|---|---|
| Thin, near-duplicate pages (city swapped, copy identical) | Write genuinely different pages per location — real landmarks, real projects. Google's helpful-content system is built to demote exactly what they're doing. |
| Dated design, poor UX | **Your site is dramatically better designed.** That's a conversion advantage they can't quickly copy. |
| No transparent pricing | Publish AMC and setup price ranges. Wins snippets and pre-qualifies leads. |
| Keyword-stuffed titles (some run 150+ chars) | Clean, human titles convert better in the SERP even at equal rank. |
| Little evidence of real project work | Case studies with photos and named outcomes. This is your biggest E-E-A-T lever. |
| Free-subdomain satellite blogs | One authoritative blog on your own domain compounds; theirs doesn't. |

### How to outperform them — sequence

1. **Match their coverage** — build the 12 service pages + 6 location pages (§2). This is the single biggest lever.
2. **Beat their depth** — 1,200–1,800 genuinely useful words vs their ~400 templated ones.
3. **Out-trust them** — real reviews, real photos, real case studies, published pricing.
4. **Out-technical them** — full schema, fast Core Web Vitals, clean IA. You can win this in a week.
5. **Local links** — Mohali Industrial Association, Chandigarh chambers, local business directories, sponsor a local tech meetup, supplier/partner pages. This is where they're thinnest and it's the hardest thing for them to catch up on.

*Caveat: this reflects a live search snapshot, not rank-tracker data. Before committing budget, verify positions in Google Search Console and a rank tracker set to Mohali/Chandigarh geo.*

**Sources:** [sidigiqor.com — IT Infrastructure Company in Mohali](https://sidigiqor.com/it-infrastructure-services-company-in-mohali/) · [Computer AMC Services Chandigarh/Mohali/Panchkula/Zirakpur](https://sidigiqor.com/comprehensive-computer-amc-services-in-chandigarh-mohali-panchkula-and-zirakpur/) · [Computer AMC Services across North India](https://sidigiqor.com/computer-amc-services-in-chandigarh-panchkula-mohali-across-north-india/)

---

## 13. CONTENT GAP

**Missing pages:** About · Case Studies · Team/Engineers · Blog (index + posts) · Privacy Policy · Terms · Pricing · Testimonials/Reviews · Careers · Sitemap page · 404 page

**Missing service pages (9 of your 17 services):** Managed IT Services · Firewall Configuration · WiFi Setup · Access Point Installation · Network Security · Printer Setup · Data Backup · Microsoft 365 Support · Remote IT Support · IT Infrastructure Setup

**Missing location pages:** all six of your stated targets, plus the spillover towns your competitor already owns — Kharar, Dera Bassi, Baddi, Pinjore, Kalka.

**Missing FAQs** (you have 5 site-wide; you need ~50):
Pricing — *What does an AMC cost per device? Is there a minimum contract? Do you charge for a site survey? What's not covered?*
Logistics — *How fast can an engineer reach Zirakpur? Do you work weekends? Can you work after office hours? Do you provide replacement devices?*
Technical — *Which firewall brands do you install? Do you support Mac? Can you work with our existing hardware? Do you provide network documentation?*
Trust — *Are your engineers certified? Are you insured? Do you sign an NDA? Who owns the equipment under AMC? What happens to our data?*

**Missing trust content:** certifications/partner badges · years in business · team size · named client logos · real project photos · service-area map · response-time SLA published · warranty terms in writing.

---

## 14. TECHNICAL SEO

### `robots.txt` — create at web root

```
User-agent: *
Allow: /

Disallow: /errros/
Disallow: /reference/
Disallow: /*?service=

Sitemap: https://kroxit.com/sitemap.xml
```

### `sitemap.xml` — create at web root

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://kroxit.com/</loc><priority>1.0</priority><changefreq>weekly</changefreq></url>
  <url><loc>https://kroxit.com/it-services-mohali</loc><priority>0.9</priority></url>
  <url><loc>https://kroxit.com/it-amc-services-mohali</loc><priority>0.9</priority></url>
  <url><loc>https://kroxit.com/networking-services-mohali</loc><priority>0.8</priority></url>
  <url><loc>https://kroxit.com/laptop-repair-mohali</loc><priority>0.8</priority></url>
  <url><loc>https://kroxit.com/server-cloud-services-mohali</loc><priority>0.8</priority></url>
  <url><loc>https://kroxit.com/book-consultation</loc><priority>0.7</priority></url>
  <url><loc>https://kroxit.com/contact</loc><priority>0.7</priority></url>
</urlset>
```
Add each new page as you publish it. Submit in Google Search Console.

### Open Graph + Twitter — add to every page

```html
<link rel="canonical" href="https://kroxit.com/PAGE-SLUG">
<meta property="og:url" content="https://kroxit.com/PAGE-SLUG">
<meta property="og:image" content="https://kroxit.com/assets/og-image.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="en_IN">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="https://kroxit.com/assets/og-image.jpg">
```
Create a 1200×630 OG image: logo + "IT Support & Managed IT Services — Mohali · Chandigarh · Tricity".

### Favicon set
`favicon.ico` (32×32) · `apple-touch-icon.png` (180×180) · `icon-192.png` · `icon-512.png` · `site.webmanifest`

### Images — highest-impact performance work

| Action | Saving |
|---|---|
| Delete `assets/hero.jpg` (1.05 MB) + `assets/logo.jpg` (732 KB) — **both unreferenced** | 1.79 MB |
| Delete/move `errros/` (541 KB) and `reference/` out of the web root | 541 KB+ |
| Self-host the 13 Unsplash images as WebP @ ~85% | ~60–70% per image, removes a third-party dependency |
| Add `width`/`height` to every `<img>` | Fixes CLS |
| `fetchpriority="high"` on hero, remove its `loading="lazy"` | Direct LCP win |
| `<picture>` with WebP + JPEG fallback | Broad support |

### Caching (`.htaccess` — adjust for your host)

```apache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript image/svg+xml
</IfModule>
```
Your `?v=` cache-busting on `styles.css` and `app.js` is already correct — keep using it.

### Other
- Enforce HTTPS + a single canonical host (www **or** non-www, 301 the other).
- Pin Lucide to a version instead of `@latest`, or self-host only the icons you use.
- Self-host fonts; cut from 4 families to 2.
- Add a real 404 page with nav and a search/CTA.

---

## 15. FINAL ACTION PLAN

### 🔥 Quick wins — this week, high impact, low effort
1. Replace the placeholder phone `+91 12345 67890` everywhere with your real number **(B1)**
2. Delete the second conflicting number in `contact.html` **(B2)**
3. Remove the fabricated testimonial **(B4)**
4. Remove or source the "4.9/5" and "2563" stats **(B5)**
5. Delete the 3 fake blog cards **(B6)**
6. Delete `assets/hero.jpg`, `assets/logo.jpg`, `errros/`, `reference/` — 2.3 MB gone
7. Add `robots.txt` and `sitemap.xml`
8. Add canonicals to all 8 pages
9. Wire the contact form to a real endpoint — **it currently discards every submission**
10. Add a click-to-call button in the nav
11. Fix the 7 "Read More" anchors to descriptive text
12. `twitter:card` → `summary_large_image`

### 🔴 High priority — weeks 1–4
13. Claim + fully complete Google Business Profile (§7)
14. Add Organization/LocalBusiness schema sitewide
15. Add FAQPage schema to `contact.html`
16. Create the OG image; add OG/Twitter image tags
17. Self-host + compress all images to WebP; add dimensions; fix LCP
18. Expand `amc.html` from 216 → 1,200+ words with real pricing — **your highest-value page**
19. Expand `services.html` into a proper hub; resolve cannibalization (§10)
20. Get your first 10 real Google reviews
21. Build `/about` with real team, credentials, years active

### 🟠 Medium priority — weeks 5–10
22. Build the 12 missing service pages (§2)
23. Expand the 3 existing spoke pages to 1,200+ words using the §5 template
24. Add FAQs (5–8) + FAQPage schema to every service page
25. Launch the blog; publish 2–3/week from §6
26. Build the 6 location pages
27. Add breadcrumbs + BreadcrumbList schema
28. Publish 3 case studies with real photos and outcomes
29. Mobile sticky call/WhatsApp bar
30. Local citation building (§3)

### 🟡 Low priority — weeks 11+
31. Spillover location pages (Kharar, Dera Bassi, Baddi, Pinjore, Kalka)
32. Self-host fonts; trim to 2 families
33. Tree-shake Lucide
34. Pause the hero canvas loop when off-screen
35. Privacy Policy, Terms, Careers, 404
36. Local link building — associations, sponsorships, partner pages

### 90-day roadmap

**Days 1–15 — Foundation & credibility**
Fix all 8 blockers. Technical basics (robots, sitemap, canonicals, schema, OG). GBP live and complete. Contact form working. Dead assets removed.
*Success: GSC verified, GBP live, zero fabricated claims, all pages indexable.*

**Days 16–45 — Depth on what exists**
Rewrite AMC, Services, and the 3 spoke pages to full depth. FAQs + schema everywhere. Images self-hosted and fast. First 10 reviews. `/about` live. Blog launched with 8–10 posts.
*Success: LCP <2.5s, avg page >1,000 words, 10+ reviews, rich results appearing.*

**Days 46–75 — Coverage**
Ship 12 service pages. Ship 6 location pages. 20+ more blog posts. Case studies. Citations. Internal linking silo complete.
*Success: 30+ indexed pages, Map Pack visibility for 2–3 core terms, first organic leads.*

**Days 76–90 — Compound & measure**
Local link building. Review velocity. Refresh underperformers using GSC query data. Double down on whatever's converting.
*Success: top 3 Map Pack for 3+ primary terms, page 1 for 5+ long-tails, measurable lead flow.*

### Measure these, not vanity metrics
GBP calls & direction requests · form + WhatsApp submissions by page · Map Pack rank for the 10 primary keywords · GSC impressions/clicks by query · Core Web Vitals field data · **cost per lead**

---

## Appendix — what I need from you to finish the implementation

I can write the schema, canonicals, sitemap and meta tags directly into your files, but these must be real values:

1. **Live domain** (canonicals, sitemap, schema `@id`)
2. **Real phone number** — and confirm whether `+91 83608 53441` (your WhatsApp) is it
3. **Real email** — is `hello@kroxit.com` live?
4. **Full street address + pincode**
5. **Business hours**
6. **GBP status** — claimed? verified? URL?
7. **Real review count and average**, if any
8. **Years in business, team size, certifications**

Give me those and I'll implement everything in §14 and §8 across all pages in one pass.
