# 📝 Developer Handoff – My Assets Page

Welcome devs!  This doc is the single-source-of-truth for wiring the new **My Assets** page into Shopper Intelligence.

---

## 1. Project Overview
A vanilla-HTML prototype that mirrors the approved Figma design.  It ships with:

* **Responsive sidebar** with pin/unpin
* **Sticky header** with country selector & progress ring
* **Card grid** for _Keyword Lists_, _Product Trackers_, _Custom Categories_
* **Zero external runtime deps** – pure HTML/CSS/ES6

Everything lives in `/My Assets Page` – no build-step needed.

---

## 2. Run Locally
```bash
cd "My Assets Page"
python3 -m http.server 8000      # or use any static server
open http://localhost:8000       # ⌘-click in iTerm to open automatically
```

> ☝️  No bundler required.  If you want hot-reload, point Vite/Parcel/etc. at `index.html` – it just works.

---

## 3. File Map
```
css/          Global tokens & component styles
  │
  ├─ base.css       – Design tokens & resets (see §4)
  ├─ layout.css     – Grid + flex layout helpers
  ├─ navbar.css     – Sidebar + pin logic (CSS only)
  ├─ header.css     – Sticky header, country dropdown, progress tooltip
  └─ cards.css      – Asset-card styles

js/
  ├─ main.js        – App bootstrap + global event bus
  ├─ navbar.js      – Pin/unpin side-nav
  ├─ dropdown.js    – Country selector logic
  ├─ favorites.js   – Star/favorite manager
  └─ add-items.js   – Dummy data generator (dev-only)

index.html    Mark-up skeleton
icons/        Optimised SVG + demo images
```

---

## 4. Design Tokens
> Defined in `css/base.css` as CSS variables.

### 4.1 Colors
| Token | Hex |
|-------|-----|
| `--primary-blue`         | #195afe |
| `--primary-blue-hover`   | #1854e3 |
| `--dark-navy`            | #092540 |
| `--light-gray`           | #e6e9ec |
| `--border-gray`          | #d1d5db |
| `--background-gray`      | #f7f7f8 |
| `--white`                | #ffffff |
| `--text-secondary`       | #6b7c8c |

### 4.2 Spacing (px)
`xs 4 | sm 8 | md 12 | lg 16 | xl 24 | 2xl 32 | 3xl 64`

### 4.3 Radii
`sm 3 | md 6 | lg 8 | xl 18 | full 50%`

### 4.4 Shadows
`--shadow-dropdown: 0 4px 12px rgba(0,0,0,.1)`

---

## 5. Component Cheat-Sheet
| Component | Entry CSS | Entry JS | Key Hooks |
|-----------|-----------|----------|-----------|
| Sidebar   | `navbar.css` | `navbar.js` | `.nav-item`, `.pin-toggle` |
| Header    | `header.css` | `dropdown.js`  | `#countryDropdown`, `.progress-frame` |
| Card Grid | `cards.css`  | `favorites.js` | `.asset-card`, `.favorite-icon` |

### 5.1 Country Selector
```html
<button id="countryDropdown" aria-haspopup="listbox" aria-expanded="false">
  <span class="flag-icon"><img src="icons/us-flag.svg" alt="US"/></span>
  <span class="country-text">United States</span>
  <span class="dropdown-chevron"><img src="icons/chevron-down.svg"/></span>
</button>
<ul id="dropdownMenu" class="dropdown-menu" role="listbox">…</ul>
```
JS dispatches a custom `countryChanged` event with `{ country: 'US' }` payload – listen at `document.addEventListener('countryChanged', cb)`.

### 5.2 Progress Ring Tooltip
Handlebar at top-right; hover/press shows async tooltip with completion percent (`data-progress="0-100"`).  Update percentage via `--progress-percentage` CSS var to animate the blue bar.

---

## 6. Accessibility
* All interactive elements expose `aria-` states.
* Keyboard: `Tab`, `Enter`, `Space`, `Esc` handled in `main.js → setupKeyboardHandlers()`.
* Color contrast passes AA against background gray.

---

## 7. Integration Notes
1. **Framework agnostic.**  If porting into React, lift HTML chunks into components and keep CSS modules unchanged.
2. **i18n.**  Replace hard-coded strings; icons are separate so RTL safe.
3. **State.**  Current prototype stores user prefs (favorites, nav-pin) in `localStorage`; swap for Redux/GraphQL calls as needed.
4. **Data layer.**  Replace dummy JSON in `add-items.js` with API.
5. **Deployment.**  No node deps – ship as part of your existing static asset pipeline.

---

## 8. Open Todos
- [ ] Wire real API for asset lists & progress counts.
- [ ] Replace inline SVG `<img>` with sprite/`<svg>` embed for perf.
- [ ] Unit tests around `FavoritesManager` once integrated.

---

🏁 **Done – ping @tal or #design-system for clarifications.** 