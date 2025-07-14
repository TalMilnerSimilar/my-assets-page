# UI Text Reference - Deletion Modals and Toast Messages

This document contains all the text strings used in deletion modals and toast notifications throughout the My Assets Page application.

## Deletion Modals

### 1. Standard Deletion Modal (`showConfirmationModal`)
**Used for**: Product trackers, keyword lists, custom categories, and other general items

**Modal Title**: `Delete a ${itemType}`

**Modal Message**: `Are you sure you want to delete this ${itemType}? This cannot be undone.`

**Buttons**:
- Cancel: `Cancel`
- Delete: `Delete`

**Example Usage**:
- Title: "Delete a product tracker"
- Message: "Are you sure you want to delete this product tracker? This cannot be undone."

### 2. Favorite Removal Modal (`showFavoriteRemovalModal`)
**Used for**: Favorite categories and favorite brands

**Modal Title**: `Remove ${itemType} from favorites`

**Modal Message**: `Are you sure you want to remove "${itemName}" from your favorite ${itemType === 'category' ? 'categories' : 'brands'}? You can add it back later.`

**Buttons**:
- Cancel: `Cancel`
- Remove: `Remove`

**Example Usage**:
- Title: "Remove category from favorites"
- Message: "Are you sure you want to remove 'Electronics' from your favorite categories? You can add it back later."

- Title: "Remove brand from favorites"
- Message: "Are you sure you want to remove 'Apple' from your favorite brands? You can add it back later."

## Toast Messages (Success Notifications)

### 1. Item Deletion Success
**Template**: `"${itemName}" deleted successfully`

**Example Usage**:
- "iPhone 15 Pro Tracker" deleted successfully
- "Gaming Accessories" deleted successfully

### 2. Favorite Item Removal Success
**Template**: `"${itemName}" removed from favorite ${itemType === 'category' ? 'categories' : 'brands'}`

**Example Usage**:
- "Electronics" removed from favorite categories
- "Apple" removed from favorite brands

### 3. Creation/Edit Action Messages
**Note**: These are currently placeholder texts that indicate redirection to other pages

**Product Tracker Creation**: `"Direct the user to the relevant creation page, no need for this toast"`

**Custom Category Creation**: `"Direct the user to the relevant creation page, no need for this toast"`

**Keyword List Creation**: `"Open the keyword creation side panel, no need for this toast"`

**1P Connection**: `"Direct the user to the MBA page, no need for this toast"`

**Edit Action**: `"Direct the user to the relevant edit page, no need for this toast"`

**Generic Creation**: `${type.replace('-', ' ')} created successfully!`

## Banner Messages (Legacy)

### Removal Banners
**Note**: These are from an older implementation but may still exist in some parts of the codebase

**From Constants**:
- Single category: `Category removed`
- Multiple categories: `Categories removed`
- Single brand: `Brand removed`
- Multiple brands: `Brands removed`

**Dynamic Banner**: `${count} ${plural} removed`
- Examples: "1 Category removed", "3 Categories removed", "1 Brand removed", "2 Brands removed"

## Technical Implementation Notes

### Toast Notification Properties
- **Duration**: 5 seconds (auto-dismiss)
- **Position**: Bottom center of screen
- **Styling**: Dark background (#092540), white text
- **Interaction**: Manual close button (×) available
- **Animation**: Slide up from bottom

### Modal Properties
- **Backdrop**: Semi-transparent overlay
- **Interaction**: 
  - Click outside to close
  - Escape key to close
  - Cancel button to close
  - Confirm button to execute action
- **Animation**: Fade in/out with scale effect

### Context-Sensitive Logic
- **Item Type Detection**: Automatically detects if item is category or brand based on parent container classes
- **Item Name Extraction**: Gets actual item names from DOM elements (.category-link, .brand-link)
- **Empty State Handling**: Restores empty state illustrations when last item is removed

## File Locations
- **Modal Implementation**: `js/main.js` (showConfirmationModal, showFavoriteRemovalModal)
- **Toast Implementation**: `js/main.js` (showSuccessMessage)
- **Favorite Logic**: `js/favorites.js` (FavoritesManager)
- **Constants**: `js/constants.js` (MESSAGES object)
- **Styling**: `css/toast.css`, `css/cards.css` (modal styles)

## Version History
- **v1.1.0**: Current implementation with separate modals for favorites vs. standard deletion
- **Legacy**: Previous implementation used dimming/unchecked states instead of actual removal 