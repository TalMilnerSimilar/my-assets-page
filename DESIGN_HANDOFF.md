# 🎨 Design Handoff – My Assets Page

> _All measurements are in **px** unless noted._ Icons are exported SVG @1×.

---

## 1. Page Anatomy
```
┌──────────────── Sticky Header (72 h) ────────────────┐
│  Title  |  Data Filters  |  Progress Indicator (32) │
└───────────────────────────────────────────────────────┘

┌────────────┬──────────────────────────────────────────┐
│ Sidebar    │        Main Content Grid                │
│ 256 w      │  hero (120 h) │ trackers (520 h)        │
│            │  keywords (392 h)                       │
└────────────┴──────────────────────────────────────────┘

Bottom cards (3×400 h) → custom categories (500 h)
```
* Sidebar collapses to **48 w** on _unpinned_; hovers back to 256.
* Main grid has **48 px** left/right outer gutters (24 px ≤ 1400 w).

---

## 2. Typographic Scale (DM Sans)
| Usage                | Size | Weight | Line-height |
|----------------------|------|--------|-------------|
| Page title           | 20   | 500    | 28          |
| Hero heading (H2)    | 20   | 700    | 28          |
| Body / labels        | 14   | 400    | 20          |
| Tooltip count (ring) | 11   | 600    | 14          |

Roboto is used only for the numeric **progress count**.

---

## 3. Colors
Primary #195afe  •  Hover #1854e3  •  Dark Navy #092540  •  Background Gray #f7f7f8  •  Border Gray #d1d5db  •  Text Secondary #6b7c8c

---

## 4. Spacing & Layout Tokens
```
4  8  12  16  24  32  64      →  var(--spacing-xs…3xl)
3  6  8  18  50%              →  var(--radius-*)
```
Internal card paddings: 24. Component gaps: 8 (vertical) / 24 (horizontal).

---

## 5. Components & States
### 5.1 Country Dropdown
Default → hover (border #195afe) → open (chevron 180°).  Menu has 8 radius, 1 border (#e6e9ec) + 4/12 shadow.

### 5.2 Progress Ring
32×32 ring – stroke 3, gap-abs = circumference×(1-%/100). Tooltip width 280, arrow 8.

### 5.3 Sidebar Nav Item
• Padding 12 • Icon 20×20 left • Text 14/20 • Hover bg #f7f7f8 • Active bg rgba(25,90,254,.05)

### 5.4 Buttons
Primary (Hero): 14/500, 16×8 padding, 18 radius, blue/white. Hover darkens to #1854e3.

---

## 6. Breakpoints
* ≤1400: outer gutters shrink to 24.
* ≤1200: main grid becomes single-column, trackers stack.
* ≤900: bottom cards 1-col.
* ≤768: sidebar shifts top, hero vertical stack.

---

## 7. Motion
• 200 ms ease on buttons, nav item bg, dropdown borders.
• Tools ring stroke-offset 300 ms.

---

## 8. Accessibility
AA contrast checked on primary vs white/bg-gray. Focus states: buttons gain 2 outline #1854e3.

---

👋 Ping design if any redline is unclear. 