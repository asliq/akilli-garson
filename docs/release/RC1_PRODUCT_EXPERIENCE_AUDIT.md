# RC1 Product Experience Audit

**Date:** 2026-07-05  
**Release:** RC1 — Demo Edition  
**Reviewer role:** Staff Product Designer · Senior Frontend Architect · Technical Reviewer  
**Method:** Code review, component inventory, RC1 runtime audit cross-reference, CTO first-session walkthrough simulation  
**Scope:** Product experience only — no implementation performed

---

## Executive summary (CTO first 60 seconds)

| Moment | What the CTO sees | Confidence |
|--------|-------------------|------------|
| Browser tab | Professional title + meta; **Vite default favicon** | Neutral |
| Login | Strong brand, Demo Edition badge, animated card | **↑ High** |
| Post-login shell | ERP sidebar, breadcrumbs, Demo Edition pill, status bar | **↑ High** |
| Dashboard | Dense ops view, real KPIs, health panel | **↑ High** |
| Sidebar scan | 15 modules — 9 marked **Plan** | **↓ Mixed** (“scope vs delivery”) |
| Kitchen click | Per-item buttons that don’t match backend | **↓ Sharp drop** |
| System Health | Real API checks, no fake metrics | **↑ Recovers** |

**Overall product experience score: 7.4 / 10**  
**Demo readiness score: 7.0 / 10** (strong opening, credibility risk in Kitchen + empty data)

**Verdict:** Presents as a **credible Demo Edition SaaS shell** with one flagship screen (Dashboard) and one credibility anchor (System Health). Enterprise feeling is **real on Login, Layout, Dashboard, Roadmap**; it **breaks** on inconsistent loading/error patterns, Kitchen honesty, and sidebar scope inflation.

---

## Cross-cutting findings

### What works across the product

- **Brand system:** `DEMO_EDITION` single source — product name, subtitle, edition badge used consistently on Login, sidebar, header, roadmap.
- **Typography:** DM Sans + design tokens in `index.css` — calm, modern, not “bootstrap default.”
- **Information architecture:** ERP-style `NAV_SECTIONS` with section labels, breadcrumbs, page titles — reads enterprise.
- **Honest roadmap pages:** No “API not implemented” developer copy; professional phase/capability cards.
- **Dashboard empty states:** `EmptyState` component with icon, title, description — best pattern in the app.
- **System health:** Real `/health/live`, `/health/ready`, WebSocket status — rare in portfolio projects.

### What hurts everywhere

| Issue | Impact |
|-------|--------|
| **Dual title hierarchy** | Layout header shows page title (`h1`); Dashboard, Orders, Kitchen also render their own `h1` — redundant, amateur in enterprise apps |
| **Loading state inequality** | Menu uses skeletons; Orders/Kitchen use plain “Yükleniyor...” text |
| **Empty state inequality** | Dashboard uses `EmptyState`; Orders/Kitchen/Menu use ad-hoc markup |
| **Error state inequality** | Dashboard has styled banner; other pages are unstyled `<p>` + button |
| **Emoji avatars** | 👨‍🍳 in login, sidebar, settings — playful, not enterprise |
| **Half i18n** | `useTranslation` wired on some pages; most copy hardcoded Turkish |
| **No global footer** | Staff app has no page footer; only Login has copyright line |
| **Favicon** | `/vite.svg` — instant “dev project” signal in browser chrome |

---

## Screen-by-screen review

### 1. Splash / Startup

| Question | Assessment |
|----------|------------|
| **Professional** | Lazy route splitting; inline `PageLoader` with spinner; `AuthGuard` session spinner with branded copy |
| **Unfinished** | No branded splash; Vite favicon; white flash before CSS; no skeleton brand mark |
| **CTO in 15s** | Tab icon is Vite; first paint is generic spinner + “Yükleniyor…” / “Oturum kontrol ediliyor…” |
| **Confidence** | Neutral — does not hurt, does not impress |
| **Score** | **5 / 10** |

---

### 2. Login

| Question | Assessment |
|----------|------------|
| **Professional** | Full-bleed gradient background; motion entrance; three-line brand block; Demo Edition badge; PIN field; loading state on submit; quick-login for demo |
| **Unfinished** | Floating 🍕🍔🍰 decorations; email placeholder `ornek@restaurant.com` (wrong domain vs `@restoran.com`); “Hızlı Giriş (Demo)” + visible PIN — reads as hackathon |
| **CTO in 15s** | “This is a demo build” — immediately clear; brand otherwise looks commercial |
| **Confidence** | **Increases** — best first impression in the app |
| **Score** | **8 / 10** |

---

### 3. Dashboard

| Question | Assessment |
|----------|------------|
| **Professional** | KPI grid (revenue, active, completed, AOV); kitchen queue; restaurant status; activity feed; popular items; embedded health panel; quick links; personalized greeting; error banner with retry; `EmptyState` throughout |
| **Unfinished** | Duplicate `h1` vs layout header; empty KPIs show `0` / em-dash without strong “seed demo data” story; order IDs truncated to 6 chars look technical not operational |
| **CTO in 15s** | “Operations center” — feels like a real product **if data exists**; empty state feels like a fresh install |
| **Confidence** | **Strong increase** — flagship screen |
| **Score** | **8.5 / 10** |

---

### 4. Orders

| Question | Assessment |
|----------|------------|
| **Professional** | Status chips with icons; filter bar; rich payment modal (discount, tip, split); order lifecycle actions; print; refresh |
| **Unfinished** | Full-page “Yükleniyor...” loader; `window.confirm` for cancel; payment UI fully styled when payments API disabled; masa shown as UUID tail; inline empty state not `EmptyState` |
| **CTO in 15s** | Functional list; payment modal signals maturity; **if they open payment** they may ask “is this real?” |
| **Confidence** | Moderate increase — capable but uneven polish |
| **Score** | **7 / 10** |

---

### 5. Kitchen

| Question | Assessment |
|----------|------------|
| **Professional** | KDS-style cards; elapsed timer; priority badges; filter tabs; stat row (bekliyor / hazırlanıyor / hazır) |
| **Unfinished** | Plain text loading/error; **per-item action buttons that don’t match API**; priority toggle appears functional but is local-only; table as UUID fragment |
| **CTO in 15s** | Looks like a real KDS until they click an item button and all lines change together |
| **Confidence** | **Decreases** — highest UX credibility risk in live modules |
| **Score** | **6 / 10** |

---

### 6. Menu (staff)

| Question | Assessment |
|----------|------------|
| **Professional** | `Card`, `Button`, `SkeletonCard`; category chips with counts; inline price edit; add-product modal; image grid; search |
| **Unfinished** | Empty category copy mentions “Demo veritabanı”; duplicate error line in error state; draft items show “Stokta Yok” overlay — confusing for staff |
| **CTO in 15s** | Most “product-designed” staff screen after Dashboard |
| **Confidence** | Increase — demonstrates write path (price edit) |
| **Score** | **7.5 / 10** |

---

### 7. Customer QR (login + menu)

**Customer login (`/customer?token=...`)**

| Question | Assessment |
|----------|------------|
| **Professional** | Auto-redirect on token; gradient hero; QR metaphor; separate visual lane from staff app |
| **Unfinished** | Manual token entry UX is dev-oriented; quick table number buttons |
| **CTO in 15s** | QR deep link works — good demo moment |
| **Confidence** | Increase for cross-channel story |
| **Score** | **7 / 10** |

**Customer menu (`/customer/menu`)**

| Question | Assessment |
|----------|------------|
| **Professional** | Mobile-first cart; category tabs; item detail modal; service fee line; order success toast + redirect |
| **Unfinished** | Hardcoded 10% service fee (not from API); “Garson Çağır” if visible and disabled; payment flow UI on customer side |
| **CTO in 15s** | Polished consumer lane; feels separate product surface |
| **Confidence** | Strong increase when demoed from phone |
| **Score** | **7.5 / 10** |

---

### 8. Customer Orders

| Question | Assessment |
|----------|------------|
| **Professional** | Status timeline; order cards; detail modal; refresh |
| **Unfinished** | Detail modal **fake 90/10 subtotal/service split**; `window.confirm` on cancel; loads staff `useOrders` (all restaurant orders filtered client-side — scope concern for demo) |
| **CTO in 15s** | Timeline looks premium; numbers in detail modal look invented |
| **Confidence** | Mixed — visual yes, data honesty no |
| **Score** | **6.5 / 10** |

---

### 9. Settings

| Question | Assessment |
|----------|------------|
| **Professional** | Card-based sections; profile block; theme/language/sound/kitchen refresh; notification prefs; cache clear |
| **Unfinished** | Every toggle fires toast immediately — noisy; `hasChanges` state unused; dark mode toggle exists but demo is light-first; API status section may reference legacy concepts |
| **CTO in 15s** | “Enterprise settings page” appearance |
| **Confidence** | Slight increase — completeness signal |
| **Score** | **7 / 10** |

---

### 10. System Health

| Question | Assessment |
|----------|------------|
| **Professional** | Clear intro copy (“simüle edilmiş veri kullanılmaz”); `SystemHealthPanel` with latency; component list explainer; status dots |
| **Unfinished** | Redis not surfaced as its own row (folded into ready endpoint); duplicate with dashboard compact panel |
| **CTO in 15s** | “They wired real health checks” — strong engineering signal |
| **Confidence** | **Strong increase** — best credibility screen for technical audience |
| **Score** | **8.5 / 10** |

---

### 11. Roadmap pages

| Question | Assessment |
|----------|------------|
| **Professional** | Hero + phase badge + capabilities list + architecture note + edition footer; no broken UI |
| **Unfinished** | Nine clickable sidebar entries lead here — scope inflation; all pages look similar (template fatigue) |
| **CTO in 15s** | “Planned modules” — honest if you say it once; **if they click three**, feels like padding |
| **Confidence** | Increase if framed as vision; decrease if explored randomly |
| **Score** | **8 / 10** (page quality) · **5 / 10** (IA risk when over-navigated) |

---

### 12. Layout — Sidebar

| Question | Assessment |
|----------|------------|
| **Professional** | AG monogram; three-line brand; online + WebSocket status; section labels; live badges on orders; “Plan” badge on roadmap items; user profile + logout |
| **Unfinished** | 15 items for 6 live modules; roadmap items still fully clickable; emoji user avatar |
| **CTO in 15s** | “Wide product vision” — sidebar sells scope |
| **Confidence** | Increase (breadth) / risk (depth) |
| **Score** | **8 / 10** |

---

### 13. Layout — Header

| Question | Assessment |
|----------|------------|
| **Professional** | Breadcrumbs; page title; Demo Edition pill; live clock; notification bell with count |
| **Unfinished** | **VoiceCommand mic** in header — niche, unreliable; competes with CommandPalette; duplicate title with page-level `h1` |
| **CTO in 15s** | Dense toolbar — enterprise density |
| **Confidence** | Slight increase; mic button raises eyebrow |
| **Score** | **7.5 / 10** |

---

### 14. Layout — Content area

| Question | Assessment |
|----------|------------|
| **Professional** | Max-width content; consistent padding; mobile hamburger + overlay |
| **Unfinished** | No footer; no global page actions pattern |
| **CTO in 15s** | Clean canvas |
| **Confidence** | Neutral |
| **Score** | **7 / 10** |

---

### 15. Footer

| Question | Assessment |
|----------|------------|
| **Professional** | Login card footer with `DEMO_EDITION.footer` |
| **Unfinished** | **No staff app footer** — no version, build, or support link |
| **CTO in 15s** | Not noticed (absent) |
| **Confidence** | Neutral |
| **Score** | **N/A** (staff) · Login footer **6 / 10** |

---

## State pattern audit

| State | Best example | Weakest example |
|-------|--------------|-----------------|
| **Loading** | Menu skeleton grid | Orders/Kitchen plain text |
| **Empty** | Dashboard `EmptyState` | Orders inline div |
| **Error** | Dashboard `errorBanner` | Menu duplicate `<p>` lines |
| **Success** | react-hot-toast globally | — |

**Enterprise apps treat these four states as a system.** This product treats them as per-page decisions.

---

## Branding & visual consistency scorecard

| Dimension | Score | Note |
|-----------|------:|------|
| Color / tokens | 8 | Consistent CSS variables |
| Typography | 8 | DM Sans, clear hierarchy |
| Iconography | 8 | Lucide throughout staff app |
| Component library usage | 6 | Menu/Settings use `Card`; Orders/Kitchen do not |
| Motion | 7 | Framer on Login/Menu; restrained elsewhere |
| Edition branding | 9 | Demo Edition disciplined |
| Consumer vs staff lanes | 8 | Distinct CSS modules, coherent |

---

## Demo readiness checklist (product lens)

| Item | Ready? |
|------|--------|
| Login → Dashboard in &lt; 10s | ✅ |
| Dashboard looks alive with seed data | ⚠️ Needs data |
| Kitchen demo without clicking item buttons | ⚠️ |
| Menu price edit wow moment | ✅ |
| Customer QR on phone | ✅ |
| System Health all green | ✅ |
| Avoid roadmap rabbit holes | ⚠️ Discipline required |
| README screenshots match UI | ❌ |

---

## Prioritized backlog

### P0 — Must fix before interview (first impression)

| # | Item | Why |
|---|------|-----|
| 1 | **Kitchen honesty** — remove per-item buttons OR show order-level actions only | Single biggest credibility killer on live path |
| 2 | **Seed believable demo data** — orders in mixed statuses, populated menu | Empty Dashboard = “fresh install”, not “operations platform” |
| 3 | **Replace Vite favicon** with AG monogram | Browser chrome first signal |
| 4 | **Fix Menu error state** duplicate line + remove “Demo veritabanı” copy | Developer language on a live screen |
| 5 | **Demo script discipline** — never click 3+ roadmap pages; never open payment modal unless explaining demo mode | Product is navigable but not all navigable paths are honest |
| 6 | **Remove or hide VoiceCommand** from production header | Reads as gimmick to enterprise reviewers |
| 7 | **Customer order detail** — remove fake 90/10 fee split or label as estimate | Data honesty on customer lane |

---

### P1 — Strong improvements (visible polish)

| # | Item | Why |
|---|------|-----|
| 8 | **Unify loading states** — skeleton pattern on Orders/Kitchen matching Menu | Enterprise consistency |
| 9 | **Unify empty/error states** — use `EmptyState` + dashboard-style error banner everywhere | Systematic UX |
| 10 | **Remove duplicate page `h1`** — layout header owns title; pages use `h2` or subtitle only | Visual hierarchy fix |
| 11 | **Login placeholder** → `ahmet@restoran.com`; tone down floating food emoji | Polish first screen |
| 12 | **Payment modal demo mode** — badge “Demo: ödeme kaydı simüle” when API off | Prevents “fake POS” question |
| 13 | **Sidebar IA** — collapse roadmap section or make Plan items non-clickable with tooltip | Reduces vaporware perception |
| 14 | **README screenshots** (Login, Sidebar, Dashboard, Kitchen, Menu, Health, Customer QR) | GitHub first impression |
| 15 | **Resolve Ctrl+K** — Command Palette wins; move Kitchen shortcut | Professional keyboard UX |

---

### P2 — Nice to have (only if P0–P1 done)

| # | Item | Why |
|---|------|-----|
| 16 | Branded splash / app loader with AG mark | Startup polish |
| 17 | Staff app footer — version + Demo Edition + link to docs | Enterprise closure |
| 18 | Replace emoji avatars with initials in circle | Visual maturity |
| 19 | Complete i18n or remove unused `useTranslation` imports | Consistency |
| 20 | Table numbers instead of UUID tails in Orders/Kitchen | Operational readability |
| 21 | Dark mode QA pass | Settings promises it |
| 22 | Customer “Garson Çağır” hide until API exists | Avoid disabled-button dead ends |

---

## Recommended 10-minute demo path (product)

1. **Login** — quick login Ahmet (show brand, not PIN hint unless asked)  
2. **Dashboard** — KPIs, kitchen queue, health panel (stay 90 seconds)  
3. **Menu** — change one price  
4. **Orders** — advance one order status (skip payment modal)  
5. **Kitchen** — show queue **only** (no per-item clicks)  
6. **Phone** — `/customer?token=qr-masa-1` → add item → place order  
7. **System Health** — all green  
8. **One roadmap page** — “vision, not vaporware” → stop  

---

## Score summary

| Screen / Area | Score |
|---------------|------:|
| Splash / Startup | 5 |
| Login | 8 |
| Dashboard | 8.5 |
| Orders | 7 |
| Kitchen | 6 |
| Menu | 7.5 |
| Customer QR | 7 |
| Customer Menu | 7.5 |
| Customer Orders | 6.5 |
| Settings | 7 |
| System Health | 8.5 |
| Roadmap (page) | 8 |
| Sidebar | 8 |
| Header | 7.5 |
| Content shell | 7 |
| **Weighted overall** | **7.4** |

---

*This audit is design and experience only. Technical architecture findings are documented separately in code review and `RC1_RUNTIME_AUDIT.md`.*
