# Tooltip Text Reference

This document contains all the tooltip text strings used throughout the My Assets Page application.

## Info Icon Tooltips

### 1. Keyword Lists
**Trigger**: Info icon in Keyword Lists card
**Text**: `Track keyword rankings and discover new opportunities`
**Link**: None
**Implementation**: `TooltipManager.getTooltipContent()`

### 2. Product Trackers  
**Trigger**: Info icon in Product Trackers card
**Text**: `Monitor competitor products and market trends`
**Link**: `https://support.similarweb.com/hc/en-us/articles/25808193170845-Product-Trackers`
**Link Text**: `See how to track any product →`
**Implementation**: `TooltipManager.getTooltipContent()`

### 3. Custom Categories
**Trigger**: Info icon in Custom Categories card
**Text**: `Create custom product categories for better organization`
**Link**: `https://support.similarweb.com/hc/en-us/articles/27765563016733-Custom-Categories`
**Link Text**: `Build winning categories →`
**Implementation**: `TooltipManager.getTooltipContent()`

### 4. Favorite Categories
**Trigger**: Info icon in Favorite Categories card
**Text**: `Save frequently used categories for quick access`
**Link**: None
**Implementation**: `TooltipManager.getTooltipContent()`

### 5. Favorite Brands
**Trigger**: Info icon in Favorite Brands card
**Text**: `Track your most important competitor brands`
**Link**: None
**Implementation**: `TooltipManager.getTooltipContent()`

### 6. My Products
**Trigger**: Info icon in My Products card
**Text**: `Connect your Amazon account to import your products`
**Link**: `https://support.similarweb.com/hc/en-us/articles/16184273415709-Discover-My-Brand-Analytics`
**Link Text**: `Connect your data in 2 minutes →`
**Implementation**: `TooltipManager.getTooltipContent()`

## Category Link Tooltips

### Category Full Path Tooltip
**Trigger**: Hovering over category links with `data-full-path` attribute
**Text**: Shows the full category path (e.g., "Electronics > Computers > Laptops")
**Implementation**: `TooltipManager.showCategoryTooltip()`
**CSS Class**: `category-tooltip`

**Example Usage**:
- Display text: "... > Laptops"
- Tooltip text: "Electronics > Computers > Laptops"

## Shared Tag Tooltips

### Shared Categories Tag
**Trigger**: Hovering over shared tag elements
**Text**: `All custom categories are shared between all of the users in your account.`
**Implementation**: `TooltipManager.showSharedTagTooltip()`
**CSS Class**: `shared-tag-tooltip`

## Progress Tracker Tooltip

### Asset Setup Progress
**Trigger**: Hovering over progress tracker indicator in header
**Header**: `Asset Setup Progress`
**Implementation**: Static HTML in `index.html`

**Asset Items**:

1. **Keyword List**
   - Name: `Keyword List`
   - Description: `Track search rankings`
   - Asset Type: `keywords`

2. **Product Tracker**
   - Name: `Product Tracker`
   - Description: `Monitor performance`
   - Asset Type: `products`

3. **Custom Category**
   - Name: `Custom Category`
   - Description: `Create segments`
   - Asset Type: `categories`

4. **Favorite Categories**
   - Name: `Favorite Categories`
   - Description: `Track favorite categories`
   - Asset Type: `favoriteCategories`

5. **Favorite Brands**
   - Name: `Favorite Brands`
   - Description: `Track favorite brands`
   - Asset Type: `favoriteBrands`

6. **Connect 1P Data**
   - Name: `Connect 1P data`
   - Description: `Connect Amazon data`
   - Asset Type: `connection`

## Technical Implementation Details

### Tooltip Styling Properties
- **Background**: `#092540` (Dark blue)
- **Text Color**: `#ffffff` (White)
- **Font**: DM Sans, 12px, 400 weight
- **Max Width**: 280px
- **Border Radius**: 6px
- **Box Shadow**: `0px 3px 5px 0px rgba(42, 62, 82, 0.12)`
- **Z-Index**: 1000

### Tooltip Behavior
- **Show Delay**: 10ms
- **Hide Delay**: 100ms (for hover transitions)
- **Positioning**: Fixed positioning, dynamically calculated
- **Interaction**: Can be closed with Escape key
- **Hover Persistence**: Tooltip remains visible when hovering over tooltip itself

### Progress Tracker Tooltip Styling
- **Background**: `#ffffff` (White)
- **Border**: `1px solid #cbd1d7`
- **Width**: 280px
- **Position**: Fixed, top-right of header
- **Progress Bar**: Dynamic width based on completion percentage
- **Close Button**: Available (×)

### Event Listeners
- **Pointer Events**: Used for better cross-device support
- **Event Delegation**: Centralized handling for all tooltip triggers
- **Escape Key**: Global handler for closing tooltips
- **Hover States**: Proper enter/leave handling with delays

## File Locations
- **Main Implementation**: `js/tooltips.js` (TooltipManager class)
- **Progress Tracker**: `js/progress-tracker.js` (ProgressTracker class)
- **HTML Structure**: `index.html` (Progress tooltip)
- **Styling**: `css/cards.css` (Info tooltips), `css/header.css` (Progress tooltip)
- **Category Generation**: `js/add-items.js` (Category link tooltips)

## Usage Examples

### Info Icon Tooltip
```javascript
// Automatically handled by TooltipManager
// Triggered on hover over elements with .info-icon class
```

### Category Link Tooltip
```html
<a href="#" class="category-link" data-full-path="Electronics > Computers > Laptops" title="Electronics > Computers > Laptops">
    ... > Laptops
</a>
```

### Shared Tag Tooltip
```html
<span class="shared-tag">Shared</span>
```

## Accessibility Features
- **Title Attributes**: Category links include title attributes for screen readers
- **Keyboard Navigation**: Escape key closes tooltips
- **Focus Management**: Proper focus handling for tooltip interactions
- **ARIA Considerations**: Tooltips use fixed positioning for better screen reader compatibility

## Version History
- **Current**: Comprehensive tooltip system with info icons, category paths, and progress tracking
- **Features**: Click-to-open links, hover persistence, dynamic positioning, escape key support 