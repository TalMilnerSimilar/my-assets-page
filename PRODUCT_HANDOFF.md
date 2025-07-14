# 📄 Product Handoff – My Assets Page  
**Shopper Intelligence**

---

## 1. Why we’re building this
Marketplace teams juggle keyword lists, product trackers, and custom categories in 3+ different modules today.  The **My Assets** page consolidates them into a single hub so users can:
1. Discover all their saved assets at-a-glance.
2. Track completion progress to unlock the next workflow (e.g., analyze performance).
3. Create / favorite / manage assets without switching context.

**North-star outcome**: Reduce time-to-insight for an e-commerce analyst by 30 %.

---

## 2. Target users
| Persona | Job-to-be-Done | Pain today |
|---------|---------------|------------|
| **E-commerce Analyst** | “I want to monitor how my 50 keyword lists perform weekly.” | Lists live in separate screen; can’t batch manage. |
| **Brand Manager** | “I need to add new product trackers each quarter.” | Creation flows are hidden; no central ‘+’ button. |
| **Category Specialist** | “I compare custom categories across marketplaces.” | Country switcher resets selections. |

---

## 3. User stories & acceptance criteria
| # | As a… | I want… | So that… | Acceptance Test |
|---|-------|--------|----------|------------------|
| 1 | Analyst | to view all asset types grouped by cards | I can quickly jump in | Card grid shows counts & last-updated date. |
| 2 | Brand Mgr | a progress indicator of how many assets are ready for analysis | I know next step | Ring shows % complete; tooltip lists assets missing data. |
| 3 | Any | to pin my favorite assets | they’re surfaced across the platform | Clicking star toggles state; persists in localStorage. |
| 4 | Any | to switch Amazon marketplace | see relevant data | Country selector updates flag & fires `countryChanged` event. |
| 5 | PM | to track engagement | know if feature delivers | GA events: `card_open`, `asset_created`, `progress_tooltip_view`. |

MVP = stories 1-4.  Story 5 nice-to-have if GA hook exists.

---

## 4. Functional requirements
1. **Asset cards** must surface: title, description, count, star, ‘•••’ menu.
2. **Create asset** dropdown (Hero > “Create”) shows 3 CTAs – Keyword List, Product Tracker, Custom Category.
3. **Progress ring** auto-updates when an asset’s status changes (API stubbed for now).
4. **Country context** persists per user (localStorage).
5. **Responsive**: usable down to 768 w.

### Out-of-scope (v1)
* Bulk edit / delete.
* Real-time collaboration.
* Non-Amazon marketplaces.

---

## 5. Non-functional & constraints
* ✅ Works on Chrome ≥90, Safari ≥14.
* ⚡ First contentful paint under 2 s (static assets only).
* ♿ WCAG 2.1 AA contrast.
* 🌐 i18n ready (no hard-coded strings in JS).

---

## 6. Analytics & success metrics
| Metric | Baseline | Target |
|--------|----------|--------|
| Daily active users reaching hub | – | 1 000 |  
| Avg. session time on hub | – | ≥30 s |  
| Assets favorited per user | 0 | ≥3 |  
| Progress ring tooltip hovers | – | ≥40 % of sessions |

Events to track: `assets_hub_open`, `asset_favorited`, `country_switched`, `progress_hover`, `create_clicked`.

---

## 7. Risks & mitigations
* **Feature overlap** with existing sidebar links → Communicate deprecation timeline.
* **Data inconsistency** between asset counts and old modules → Use single API endpoint; final source-of-truth owned by Assets service.
* **Scope creep** on bulk actions → push to v2.

---

📬  Questions?  Slack #product-assets or @tal. 