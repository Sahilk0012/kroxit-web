# KroxIT — Image Audit & Photography Shot List

**Audited:** 31 July 2026 — every image on the site viewed and compared against the caption it carries.

---

## Part 1 — What the audit found

All 12 photographs on the site are hotlinked stock images from Unsplash. I loaded every one and compared it to the alt text and the section it sits in. **Six of the twelve did not show what they claimed to show.**

| # | What the photo actually shows | Was labelled | Verdict |
|---|---|---|---|
| 1 | Patch panel, blue/grey cables | "KroxIT network operations center" *(index)* / "Structured network cabling" *(services)* | ⚠️ **False attribution** — it is not KroxIT's facility. Also used on two pages with two different meanings. |
| 2 | Earth from orbit, city lights at night | "Reducing IT threats" | ❌ **Wrong** — a NASA-style space photo illustrating nothing about IT |
| 3 | Two people high-fiving at a desk | "KroxIT client" | 🚨 **Fabricated endorsement** — stock photo of real people presented as a named client. **Removed.** |
| 4 | Red network cables in a rack | "Server room representing rising cyberattack risk" | ✅ Acceptable |
| 5 | Person using a laptop and phone | "Security professional reviewing monitoring dashboards" | ❌ **Wrong** — no dashboards, no security context |
| 6 | Macro shot of a circuit board | "Fingerprint biometric access scanner" | ❌ **Wrong** — no scanner, no fingerprint |
| 7 | Green "Matrix" falling code | "Firewall and network security" | ❌ **Cliché** — the single most overused hacker stock image |
| 8 | Grid of wall-mounted CCTV cameras | "CCTV surveillance cameras" | ✅ On-topic (stylised, but correct) |
| 9 | Red padlock on a keyboard | "Biometric access control" | ❌ **Wrong** — padlock cliché, zero biometrics |
| 10 | Clean product shot of a Dell laptop | "Laptop and desktop repair" | ⚠️ **Weak** — an intact laptop, no repair shown; prominently features another brand |
| 11 | Overhead desk flatlay, coffee & laptops | "IT maintenance team" | ❌ **Wrong** — a coworking flatlay, no team, no maintenance |
| 12 | Cabled server racks | "Server rack in a data center" | ✅ Good |

**Score: 4 correct, 2 acceptable-with-caveats, 6 wrong.**

---

## Part 2 — What I fixed

✅ **All 13 alt attributes rewritten** to describe what is genuinely in each frame. Where an image is conceptual rather than literal, the alt now says so ("*representing*…") instead of asserting something the photo doesn't show.

✅ **False ownership claims removed.** "KroxIT network operations center" asserted that a stock patch-panel photo was your facility. It isn't. Same for "KroxIT client."

✅ **Fabricated testimonial removed** from `index.html` — the quote, the invented name and job title, and the stock portrait. The markup is commented out with restore instructions so the design returns the moment you have a real one.

> **What I did not do:** swap the six bad stock photos for six different stock photos. That would fix the mismatch but not the honesty problem — it would still be someone else's photography standing in for your work. The section below is the actual fix.

---

## Part 3 — Shot list

You do not need a photographer or a studio. A recent phone camera in daylight beats stock, because it is *true*. Shoot landscape, hold steady, wipe the lens.

### Priority 1 — replaces the six wrong images

| # | Shot | Replaces | Notes |
|---|---|---|---|
| **P1** | An engineer terminating cable into a patch panel — hands in frame, panel labelled | #1 | Your most-used image slot. Hands doing real work is the single most persuasive shot you can take. |
| **P2** | A firewall appliance mounted in a rack, status lights on | #7 (Matrix code) | Even a plain shot of the unit beats abstract green code. |
| **P3** | A biometric reader on a door frame, ideally with a finger or face presented | #6, #9 | Currently represented by a circuit board and a padlock. |
| **P4** | A laptop opened on a bench mid-repair — panel off, tools and parts visible | #10 | An intact laptop sells nothing. A repair in progress sells the service. |
| **P5** | Two engineers working on a rack or reviewing a checklist on site | #11 | This is your "team" shot. Real faces, real site. |
| **P6** | A monitoring dashboard on a real screen — router UI, switch stats, camera grid | #5, #2 | Blur or crop any client names, IPs or hostnames. |

### Priority 2 — trust and E-E-A-T

| # | Shot | Where it goes |
|---|---|---|
| P7 | Team photo outside your Mohali premises | `/about`, footer, **Google Business Profile** |
| P8 | Your van / kit bag / toolkit laid out | About, service pages |
| P9 | Certificates and partner badges on the wall | About — direct E-E-A-T signal |
| P10 | Before / after pair of a messy vs. tidied rack | Case studies — the highest-converting image type in this trade |
| P11 | An engineer at a client reception desk or site entrance | Location pages |
| P12 | A completed CCTV or access install, wide shot | CCTV service page |

### Priority 3 — Google Business Profile

GBP listings with 10+ genuine photos get materially more calls and direction requests than bare ones. Shoot: exterior with signage · interior workspace · team · at least 5 work-in-progress shots · your logo · a cover image.

---

## Part 4 — Technical requirements when you add real photos

1. **Self-host.** Put them in `assets/`. Every current image is hotlinked from Unsplash's CDN — a third-party dependency on your largest render-blocking asset, which you don't control.
2. **Compress to WebP**, quality ~82. Target under 200 KB each. Keep a JPEG fallback.
3. **Size sensibly** — 1600px wide is plenty for `.svc-row-media`; 1200px for blog thumbnails.
4. **Descriptive filenames** — `network-cabling-mohali-office.webp`, not `IMG_4471.webp`. Filenames are a real ranking signal for image search.
5. **Alt text**: describe the photo first, add location only where it is genuinely true. `alt="KroxIT engineer terminating Cat6 cable into a patch panel at a Mohali office"` — accurate *and* keyword-relevant, because the photo really is that.
6. **Keep `loading="lazy"`** on everything below the fold. The homepage hero is a `<canvas>` animation, not an image, so there is no LCP image to prioritise there.
7. **Get written permission** before showing any client premises, staff, or equipment. A one-line email consent is enough, and it protects you.

### Layout note — no CLS risk

Every image container already sets `aspect-ratio` plus `object-fit: cover` in `styles.css` (`.svc-row-media` 5/4, `.blog-thumb` 16/10, `.testimonial-media` fixed min-height). Layout is reserved before the image loads, so adding `width`/`height` attributes is optional here. This corrects the "add image dimensions" item in `SEO-AUDIT.md` §1.4 — it does not apply to these particular images.

### Still to remove

`assets/hero.jpg` (1.05 MB) and `assets/logo.jpg` (732 KB) are **referenced nowhere** in any page. Along with `errros/` (541 KB of screenshots) and `reference/`, that is ~2.3 MB of dead weight served to every visitor.

---

## Part 5 — Interim position

Until the real photos exist, the site is in an honest state: the stock images remain, but nothing claims to be yours that isn't, and nothing asserts a scene the photo doesn't contain. That is defensible.

Replacing the six wrong images is worth more than any other single item on the audit's list. Buyers in this trade are choosing whether to trust you with their infrastructure, and photographs of your actual work do that job better than copy.
