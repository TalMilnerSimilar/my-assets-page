/**
 * Robust Favorites System
 * Handles favorite toggling regardless of HTML structure (button vs div)
 */
class FavoritesManager {
    constructor() {
        this.init();
    }

    init() {
        console.log('FavoritesManager: Initializing...');
        
        // Use event delegation to catch all favorite icon clicks
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('favorite-icon') || 
                e.target.closest('.favorite-icon')) {
                
                const favoriteIcon = e.target.classList.contains('favorite-icon') 
                    ? e.target 
                    : e.target.closest('.favorite-icon');
                    
                this.handleFavoriteToggle(favoriteIcon);
            }
        });

        // Initialize clean state
        
        console.log('FavoritesManager: Initialized');
    }

    /**
     * Handle favorite toggle - now opens confirmation modal for removal
     */
    handleFavoriteToggle(favoriteIcon) {
        if (!favoriteIcon) return;

        console.log('FavoritesManager: Opening removal confirmation modal');
        
        const favoriteItem = favoriteIcon.closest('.favorite-item');
        if (!favoriteItem) {
            console.warn('FavoritesManager: No .favorite-item parent found');
            return;
        }

        // Get the item name from the DOM
        const itemName = this.getItemName(favoriteItem);
        
        // Determine item type based on parent card
        const card = favoriteItem.closest('.card');
        const itemType = card && card.classList.contains('favorite-categories') ? 'category' : 'brand';
        
        // Use the main app's confirmation modal with updated text
        if (window.myAssetsApp) {
            window.myAssetsApp.showFavoriteRemovalModal(itemName, itemType, () => {
                this.removeFavoriteItem(favoriteItem);
            });
        } else {
            console.warn('FavoritesManager: myAssetsApp not available');
        }
    }

    /**
     * Get the item name from the DOM structure
     */
    getItemName(favoriteItem) {
        // Look for category name in category-link
        const categoryLink = favoriteItem.querySelector('.category-link');
        if (categoryLink) {
            const fullText = categoryLink.textContent.trim();
            // Extract the leaf category name (part after last ">")
            return fullText.includes(' > ') ? fullText.split(' > ').pop() : fullText;
        }
        
        // Look for brand name in brand-link
        const brandLink = favoriteItem.querySelector('.brand-link');
        if (brandLink) {
            return brandLink.textContent.trim();
        }
        
        // Look for other possible name elements
        const nameElement = favoriteItem.querySelector('.favorite-name, .item-name, h4, .title');
        if (nameElement) {
            return nameElement.textContent.trim();
        }
        
        // Fallback to data attribute if available
        const dataName = favoriteItem.getAttribute('data-name');
        if (dataName) {
            return dataName;
        }
        
        // Determine type-specific fallback based on parent card
        const card = favoriteItem.closest('.card');
        if (card && card.classList.contains('favorite-categories')) {
            return 'this category';
        } else if (card && card.classList.contains('favorite-brands')) {
            return 'this brand';
        }
        
        // Last resort - generic name
        return 'this item';
    }

    /**
     * Remove a favorite item from the DOM and handle empty state
     */
    removeFavoriteItem(favoriteItem) {
        // Get container and card references BEFORE removing the item
        const container = favoriteItem.closest('.card-body');
        const card = favoriteItem.closest('.card');
        
        // Get item name and type for success message
        const itemName = this.getItemName(favoriteItem);
        const itemType = card && card.classList.contains('favorite-categories') ? 'category' : 'brand';
        
        // Remove the item
        favoriteItem.remove();
        
        // Show success message
        if (window.myAssetsApp) {
            window.myAssetsApp.showSuccessMessage(`"${itemName}" removed from favorite ${itemType === 'category' ? 'categories' : 'brands'}`);
        }
        
        // Check if this was the last item and restore empty state if needed
        if (window.myAssetsApp) {
            window.myAssetsApp.checkForFavoriteEmptyStateRestoration(container, card);
        }
        
        console.log('FavoritesManager: Favorite item removed:', itemName);
    }


}

// Initialize favorites manager
let favoritesManager;
document.addEventListener('DOMContentLoaded', () => {
    favoritesManager = new FavoritesManager();
    
    // Make it globally accessible
    window.favoritesManager = favoritesManager;
}); 