// Toggle Switcher Functionality
class ToggleSwitcher {
    constructor() {
        this.init();
    }

    init() {
        const toggleItems = document.querySelectorAll('.toggle-switcher > div');
        
        toggleItems.forEach(item => {
            item.addEventListener('click', (e) => {
                this.handleToggleClick(e.target);
            });
        });

        // Initialize disabled states on page load
        this.updateCounters();
    }

    handleToggleClick(clickedItem) {
        // Don't allow clicking disabled items
        if (clickedItem.classList.contains('disabled')) {
            return;
        }

        // Remove active class from all toggle items
        const allToggleItems = document.querySelectorAll('.toggle-switcher > div');
        allToggleItems.forEach(item => {
            item.classList.remove('toggle-active');
            item.classList.add('toggle-item');
        });

        // Add active class to clicked item
        clickedItem.classList.remove('toggle-item');
        clickedItem.classList.add('toggle-active');

        // Get the filter type from the clicked item text
        const filterType = this.getFilterType(clickedItem.textContent);
        
        // Apply filter to category items
        this.filterCategories(filterType);
    }

    getFilterType(text) {
        if (text.includes('All')) return 'all';
        if (text.includes('Lite')) return 'lite';
        if (text.includes('Pro')) return 'pro';
        return 'all';
    }

    filterCategories(filterType) {
        const categoryItems = document.querySelectorAll('.category-item');
        
        categoryItems.forEach(item => {
            const hasLiteBadge = item.querySelector('.lite-badge');
            const hasProBadge = item.querySelector('.pro-badge');
            
            let shouldShow = false;
            
            switch(filterType) {
                case 'all':
                    shouldShow = true;
                    break;
                case 'lite':
                    shouldShow = hasLiteBadge !== null;
                    break;
                case 'pro':
                    shouldShow = hasProBadge !== null;
                    break;
                default:
                    shouldShow = true;
            }
            
            // Remove existing animation classes
            item.classList.remove('filtering-out', 'filtering-in');
            
            if (shouldShow) {
                // Show the item with animation
                item.style.display = '';  // Remove inline style to use CSS default
                setTimeout(() => {
                    item.classList.add('filtering-in');
                }, 10);
            } else {
                // Hide the item with animation
                item.classList.add('filtering-out');
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300); // Match CSS transition duration
            }
        });

        // Update the toggle count display
        this.updateToggleCount(filterType);
    }

    updateToggleCount(filterType) {
        this.updateCounters();
    }

    updateCounters() {
        const toggleItems = document.querySelectorAll('.toggle-switcher > div');
        const categoryItems = document.querySelectorAll('.category-item');
        
        let liteCount = 0;
        let proCount = 0;
        
        categoryItems.forEach(item => {
            if (item.querySelector('.lite-badge')) liteCount++;
            if (item.querySelector('.pro-badge')) proCount++;
        });
        
        console.log(`ToggleSwitcher: Updating counters - Lite: ${liteCount}, Pro: ${proCount}`);
        
        toggleItems.forEach(item => {
            const text = item.textContent;
            if (text.includes('Lite')) {
                item.textContent = `Lite (${liteCount})`;
                // Disable/enable based on count
                if (liteCount === 0) {
                    item.classList.add('disabled');
                    // If this tab is currently active and has 0 count, switch to "All"
                    if (item.classList.contains('toggle-active')) {
                        this.switchToAllTab();
                    }
                } else {
                    item.classList.remove('disabled');
                }
            } else if (text.includes('Pro')) {
                item.textContent = `Pro (${proCount} of 5)`;
                // Disable/enable based on count
                if (proCount === 0) {
                    item.classList.add('disabled');
                    // If this tab is currently active and has 0 count, switch to "All"
                    if (item.classList.contains('toggle-active')) {
                        this.switchToAllTab();
                    }
                } else {
                    item.classList.remove('disabled');
                }
            }
        });
    }
    
    // Method to force count update (called when new items are added)
    forceUpdateCount() {
        console.log('ToggleSwitcher: Force updating counters...');
        this.updateCounters();
    }
    
    getCurrentFilterType() {
        const activeToggle = document.querySelector('.toggle-switcher .toggle-active');
        if (activeToggle) {
            return this.getFilterType(activeToggle.textContent);
        }
        return 'all';
    }

    // Method to refresh filters after new items are added
    refreshFilters() {
        const activeToggle = document.querySelector('.toggle-switcher .toggle-active');
        if (activeToggle) {
            const filterType = this.getFilterType(activeToggle.textContent);
            this.filterCategories(filterType);
        }
    }

    // Method to switch to "All" tab when current tab becomes invalid
    switchToAllTab() {
        const toggleItems = document.querySelectorAll('.toggle-switcher > div');
        const allTab = Array.from(toggleItems).find(item => item.textContent.includes('All'));
        
        if (allTab) {
            // Remove active from all items
            toggleItems.forEach(item => {
                item.classList.remove('toggle-active');
                item.classList.add('toggle-item');
            });
            
            // Activate "All" tab
            allTab.classList.remove('toggle-item');
            allTab.classList.add('toggle-active');
            
            // Apply "all" filter
            this.filterCategories('all');
            
            console.log('ToggleSwitcher: Switched to "All" tab due to 0 count');
        }
    }
}

// Global reference to toggle switcher
let globalToggleSwitcher;

// Initialize toggle switcher when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    globalToggleSwitcher = new ToggleSwitcher();
    console.log('ToggleSwitcher: Initialized and available globally');
    
    // Make it accessible via window for debugging
    window.globalToggleSwitcher = globalToggleSwitcher;
});

// Helper function to update counters from anywhere
window.updateToggleCounters = function() {
    if (globalToggleSwitcher) {
        globalToggleSwitcher.forceUpdateCount();
        return true;
    }
    console.warn('globalToggleSwitcher not available for counter update');
    return false;
}; 