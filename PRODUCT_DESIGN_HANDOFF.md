# 🛠️🎨 Product + Design Handoff — **My Assets**
_This document replaces `PRODUCT_HANDOFF.md` and `DESIGN_HANDOFF.md`._

---

## 0. TL;DR
A unified hub for **Keyword Lists**, **Product Trackers**, and **Custom Categories**.  Goal: cut an e-commerce analyst’s time-to-insight by **30 %**.

---

## 1. Context & Outcomes (Product)
• **Problem:** Assets are scattered across modules → cognitive load, longer workflows.  
• **Outcome metric:** ≥1 000 DAU on hub within 90 days; average 3 favorites per user; ≥40 % interact with progress ring.  
• **Personas:** E-commerce Analyst, Brand Manager, Category Specialist.

### Core user stories (MVP)
1. View all asset types grouped by cards.  
2. Monitor readiness via progress ring.  
3. Pin favorites.  
4. Switch Amazon marketplace.  
5. GA events fire (nice-to-have).

---

## 2. Page Anatomy (Design)
```
Sticky Header (72h)
  ├ Title (20/500)     left
  ├ Data Filters       centre
  └ Progress Ring (32) right

Sidebar 256w (48w when unpinned)
Main Grid  → hero (120h) + trackers (520h)
           → keywords (392h)
Bottom Cards 3×400h → Custom Categories 500h
```
Breakpoints: ≤1400 gutters 24; ≤1200 single-col; ≤900 bottom cards 1-col; ≤768 sidebar top.

---

## 3. Global Design Tokens
| Token | Hex | Use |
|-------|-----|-----|
| `primary-blue` | #195afe | CTAs, active states |
| `primary-blue-hover` | #1854e3 | CTA hover |
| `dark-navy` | #092540 | Primary text |
| `background-gray` | #f7f7f8 | App bg |
| `border-gray` | #d1d5db | Card borders |
| … | … | … |

Spacing: 4·8·12·16·24·32·64 — radii: 3·6·8·18·50 %.

---

## 4. Component & Behaviour Reference
Below is every interactive / visual element on the page with its **design** and **behaviour** specs (no code).

### 4.1 Sidebar Navigation
Design:
* Width 256; collapses to 48 when _unpinned_.  White bg, 1 px #e6e9ec border-right.
* Nav item: 12 padding, icon 20×20, text 14/400.  Hover bg #f7f7f8; active bg rgba(25,90,254,.05).
* Badges: _NEW_ (blue pill) / _BETA_ (gray pill) 10/700.
Behaviour:
* **Pin button** toggles `unpinned` state; persists in localStorage.  
* When unpinned, hover over rail expands temporarily (256) until mouse leaves.
* Click nav item → emit `navChanged` app event (destination handled globally).

### 4.2 Sticky Header
Design:
* Height 72; background gray; sticky top 0 + shadow none.
* Grid: title | flex-grow | dropdown (163.25 w fixed).
Behaviour:
* Stays visible on scroll.
* Tab order: title > country > progress.

#### a) Country Selector
Design: pill 32 h; flag 16×16; text 14/400; chevron 12×7.
Behaviour:
1. Click / ⌘↓ opens dropdown (max-h 300, scrollable, 8 radius).  
2. Selecting item closes menu and fires **`countryChanged`** custom event `{ country: 'US' }`.  
3. ESC closes; outside-click closes.

#### b) Progress Ring + Tooltip
Design: 32×32 SVG ring stroke 3; numeric count 11/600 blue; wrapper has subtle border & shadow on hover.
Behaviour:
* Hover or focus shows tooltip at top-right (280 w) with slide-down 200 ms.  
* Blue bar at tooltip top animates to `--progress-percentage`.  
* Close button (×) hides tooltip.

### 4.3 Hero Section
Design: 120 h card, subtle linear-gradient bg, 1 px border, 24 radius.
Elements:
* **H2** 20/700 dark-navy.
* **Body copy** 16/400.
* **Create button** primary blue 14/500; radius 18.
Behaviour:
* Button opens dropdown anchored bottom-right of button listing: Keyword List / Product Tracker / Custom Category.  
* Dropdown closes on outside click / ESC.  
* Selecting option opens respective creation flow (out-of-scope; stub).

### 4.4 Asset Cards (Keyword Lists, Product Trackers, Custom Categories)
Shared Design:
* 1 px border #d1d5db, 8 radius; header 24 padding with title 18/500.
* Body scrolls if content > height; custom 6 px scrollbar.

#### a) Keyword Lists
* Topic row: icon 32 container, list title 16/500, keyword count 14/400 secondary.
* Actions: **Analyze** button (blue) → **Generating…** disabled state with spinner; star icon toggles favorite.

#### b) Product Trackers
* Card grid inside right column; product thumb 60×60; name 14/500, brand 12/400.
* Hover lifts card shadow 1→3 px.

#### c) Custom Categories
* Accordion rows (category-item) default closed.  Chevron rotates 180° when expanded.
* Expanded row reveals filter stats + toggle pills (Behavior below).

### 4.5 Toggles & Filters
Design: pill group 28 h, radius full; inactive bg #f1f5f9, active blue/white.
Behaviour: clicking toggle fires `filterChanged` with `{ categoryId, value }`.

### 4.6 Favorite Star
Design: 20×20 outline; filled yellow star when active.
Behaviour: click/space toggles; persists per user; banner appears when unfavoriting last item.

### 4.7 Analyze Button
States:
1. **Default** blue → white text.  
2. **Hover** darker blue.  
3. **Generating** muted gray border + spinner icon; cursor not-allowed; auto-reverts after API completes (simulated 3 s).

### 4.8 Tooltips (General)
* 8 radius; 1 px border #d1d5db; shadow 0 4 12 rgba0,0,0,.1.  
* Arrow 8 × 8.
* Fade 200 ms ease.

### 4.9 Onboarding Overlay (first-time only)
Light-dismiss overlay with card explaining assets; slides in top (animation `slideInFromTop` 400 ms).  Close stores flag in localStorage.

---

## 5. Accessibility & Motion
* All interactive elements reachable by Tab; Enter/Space triggers; Esc closes modals/dropdowns.
* Focus visible: 2 px outline #1854e3, offset 2.
* Animations ≤200 ms (WCAG friendly); prefers-reduced-motion → animations disabled.

---

## 6. Analytics (Product)
Track events:
`assets_hub_open`, `asset_favorited`, `country_switched`, `progress_hover`, `create_clicked`, `card_open`, `asset_created`.

---

## 7. Risks & Mitigations
Feature overlap, data inconsistency, scope creep → see previous PRD section (§7).

---

ℹ️  Questions → #product-assets or #design-system. 