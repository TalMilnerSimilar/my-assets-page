/**
 * Compact Progress Tracker - Small header progress indicator for asset setup
 */
class ProgressTracker {
    constructor() {
        this.assets = {
            keywords: false,
            products: false,
            categories: false,
            favoriteCategories: false,
            favoriteBrands: false,
            connection: false
        };
        
        this.elements = {};
        this.isTooltipVisible = false;
        this.init();
    }

    /**
     * Initialize the progress tracker
     */
    init() {
        console.log('ProgressTracker: Initializing compact progress tracker');
        this.bindElements();
        this.bindEvents();
        this.loadProgress();
        this.updateDisplay();
    }

    /**
     * Bind DOM elements
     */
    bindElements() {
        this.elements = {
            wrapper: document.getElementById('progressWrapper'),
            frame: document.querySelector('.progress-frame'),
            indicator: document.getElementById('progressIndicator'),
            circle: document.getElementById('progressCircle'),
            count: document.getElementById('progressCount'),
            text: document.getElementById('progressText'),
            tooltip: document.getElementById('progressTooltip')
        };

        if (!this.elements.wrapper) {
            console.warn('ProgressTracker: Progress wrapper not found');
            return;
        }
    }

    /**
     * Bind event listeners
     */
    bindEvents() {
        if (!this.elements.wrapper) return;

        // Show tooltip on hover
        this.elements.frame.addEventListener('mouseenter', () => {
            this.showTooltip();
        });

        // Keep tooltip visible when hovering over tooltip
        this.elements.tooltip.addEventListener('mouseenter', () => {
            this.showTooltip();
        });

        // Hide tooltip when leaving both frame and tooltip
        this.elements.frame.addEventListener('mouseleave', (e) => {
            // Small delay to allow moving to tooltip
            setTimeout(() => {
                if (!this.elements.tooltip.matches(':hover') && !this.elements.frame.matches(':hover')) {
                    this.hideTooltip();
                }
            }, 100);
        });

        this.elements.tooltip.addEventListener('mouseleave', (e) => {
            setTimeout(() => {
                if (!this.elements.tooltip.matches(':hover') && !this.elements.frame.matches(':hover')) {
                    this.hideTooltip();
                }
            }, 100);
        });

        // Close tooltip button
        if (this.elements.closeBtn) {
            this.elements.closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.hideTooltip();
            });
        }

        // Make asset items clickable
        this.bindAssetItemClicks();

        // Listen for asset creation events
        document.addEventListener('assetCreated', (e) => {
            this.markAssetCompleted(e.detail.assetType);
        });

        // Listen for asset removal events
        document.addEventListener('assetRemoved', (e) => {
            this.markAssetIncomplete(e.detail.assetType);
        });

        // Listen for Amazon connection
        document.addEventListener('amazonConnected', () => {
            this.markAssetCompleted('connection');
        });

        document.addEventListener('amazonDisconnected', () => {
            this.markAssetIncomplete('connection');
        });
    }

    /**
     * Load progress from localStorage
     */
    loadProgress() {
        // Don't load from localStorage - always start fresh
        // This ensures counter resets on page refresh
        this.checkCurrentAssets();
    }

    /**
     * Save progress to localStorage
     */
    saveProgress() {
        try {
            localStorage.setItem('progress-tracker-state', JSON.stringify(this.assets));
        } catch (error) {
            console.warn('ProgressTracker: Failed to save progress', error);
        }
    }

    /**
     * Mark an asset as completed
     */
    markAssetCompleted(assetType) {
        // Map asset types to our internal names
        const assetMap = {
            'keyword-lists': 'keywords',
            'product-trackers': 'products',
            'custom-categories': 'categories',
            'favorite-categories': 'favoriteCategories',
            'favorite-brands': 'favoriteBrands',
            'favorites': 'favoriteBrands',
            '1p-connection': 'connection'
        };

        const mappedAsset = assetMap[assetType] || assetType;
        
        if (this.assets.hasOwnProperty(mappedAsset)) {
            this.assets[mappedAsset] = true;
            this.updateDisplay();
            this.saveProgress();
        }
    }

    /**
     * Mark an asset as incomplete
     */
    markAssetIncomplete(assetType) {
        const assetMap = {
            'keyword-lists': 'keywords',
            'product-trackers': 'products',
            'custom-categories': 'categories',
            'favorite-categories': 'favoriteCategories',
            'favorite-brands': 'favoriteBrands',
            'favorites': 'favoriteBrands',
            '1p-connection': 'connection'
        };

        const mappedAsset = assetMap[assetType] || assetType;
        
        if (this.assets.hasOwnProperty(mappedAsset)) {
            this.assets[mappedAsset] = false;
            this.updateDisplay();
            this.saveProgress();
        }
    }

    /**
     * Update the visual display
     */
    updateDisplay() {
        if (!this.elements.circle || !this.elements.count) return;

        const completedCount = Object.values(this.assets).filter(Boolean).length;
        const totalCount = Object.keys(this.assets).length;
        const progressPercentage = (completedCount / totalCount) * 100;

        // Update progress circle (circumference = 2 * π * r = 2 * π * 14 ≈ 87.96)
        const circumference = 87.96;
        const offset = circumference - (progressPercentage / 100) * circumference;
        this.elements.circle.style.strokeDashoffset = offset;

        // Update count text
        this.elements.count.textContent = `${completedCount}/${totalCount}`;

        // NEW: expose percentage to CSS for tooltip accent bar
        if (this.elements.tooltip) {
            this.elements.tooltip.style.setProperty('--progress-percentage', `${progressPercentage}%`);
        }

        // Update progress text
        this.updateProgressText(completedCount, totalCount);

        // Update tooltip asset statuses
        this.updateTooltipStatuses();

        // Hide indicator if all complete
        if (completedCount === totalCount) {
            setTimeout(() => {
                this.elements.wrapper.style.display = 'none';
            }, 2000); // Show completion for 2 seconds
        } else {
            this.elements.wrapper.style.display = 'block';
        }
    }

    /**
     * Update progress text based on completion
     */
    updateProgressText(completedCount, totalCount) {
        if (!this.elements.text) return;

        const progressTexts = [
            'Complete your setup',           // 0/6
            'Great start! Keep going',       // 1/6
            'You\'re making progress',       // 2/6
            'Halfway there!',                // 3/6
            'Almost done!',                  // 4/6
            'One more to go!',               // 5/6
            'Setup complete!'                // 6/6
        ];

        this.elements.text.textContent = progressTexts[completedCount] || progressTexts[0];
    }

    /**
     * Bind asset item click events
     */
    bindAssetItemClicks() {
        if (!this.elements.tooltip) return;

        const assetItems = this.elements.tooltip.querySelectorAll('.asset-item');
        
        assetItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const assetType = item.dataset.asset;
                this.scrollToAsset(assetType);
                this.hideTooltip();
            });
        });
    }

    /**
     * Scroll to the corresponding asset section
     */
    scrollToAsset(assetType) {
        const assetSelectors = {
            keywords: '.keyword-lists',
            products: '.product-trackers', 
            categories: '.custom-categories',
            favoriteCategories: '.favorite-categories',
            favoriteBrands: '.favorite-brands',
            connection: '.my-products'
        };

        const selector = assetSelectors[assetType];
        if (!selector) return;

        const targetElement = document.querySelector(selector);
        if (targetElement) {
            targetElement.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
            
            // Add a subtle highlight effect
            targetElement.style.transition = 'box-shadow 0.3s ease';
            targetElement.style.boxShadow = '0 0 0 2px rgba(14, 165, 233, 0.3)';
            
            setTimeout(() => {
                targetElement.style.boxShadow = '';
            }, 2000);
        }
    }

    /**
     * Update tooltip asset statuses
     */
    updateTooltipStatuses() {
        if (!this.elements.tooltip) return;

        const assetItems = this.elements.tooltip.querySelectorAll('.asset-item');
        
        assetItems.forEach(item => {
            const assetType = item.dataset.asset;
            const isCompleted = this.assets[assetType];
            const statusElement = item.querySelector('.asset-status');
            
            if (statusElement) {
                statusElement.className = `asset-status ${isCompleted ? 'completed' : 'pending'}`;
                
                if (isCompleted) {
                    statusElement.innerHTML = `
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <circle cx="8" cy="8" r="6" fill="#0ea5e9"/>
                            <path d="M5.5 8L7 9.5L10.5 6" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    `;
                } else {
                    statusElement.innerHTML = `
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.5" fill="none"/>
                        </svg>
                    `;
                }
            }
        });
    }

    /**
     * Show tooltip
     */
    showTooltip() {
        if (!this.elements.tooltip) return;
        
        this.elements.tooltip.classList.add('show');
        this.isTooltipVisible = true;
        
        // Position tooltip to avoid clipping
        this.positionTooltip();
    }

    /**
     * Hide tooltip
     */
    hideTooltip() {
        if (!this.elements.tooltip) return;
        
        this.elements.tooltip.classList.remove('show');
        this.isTooltipVisible = false;
    }

    /**
     * Position tooltip to avoid clipping
     */
    positionTooltip() {
        if (!this.elements.tooltip || !this.elements.indicator) return;

        const indicatorRect = this.elements.indicator.getBoundingClientRect();
        const tooltipRect = this.elements.tooltip.getBoundingClientRect();
        const viewportWidth = window.innerWidth;

        // Position below the indicator by default
        let left = indicatorRect.left + (indicatorRect.width / 2) - (tooltipRect.width / 2);
        
        // Adjust if tooltip would go off-screen
        if (left < 10) {
            left = 10;
        } else if (left + tooltipRect.width > viewportWidth - 10) {
            left = viewportWidth - tooltipRect.width - 10;
        }

        this.elements.tooltip.style.left = `${left}px`;
    }

    /**
     * Check current page assets and update progress
     */
    checkCurrentAssets() {
        // Check if any keyword lists exist
        const keywordCards = document.querySelectorAll('.keyword-lists .product-item, .keyword-lists .topic-item');
        if (keywordCards.length > 0) {
            this.markAssetCompleted('keywords');
        }

        // Check if any product trackers exist
        const productCards = document.querySelectorAll('.product-trackers .product-item');
        if (productCards.length > 0) {
            this.markAssetCompleted('products');
        }

        // Check if any custom categories exist
        const categoryCards = document.querySelectorAll('.custom-categories .category-item');
        if (categoryCards.length > 0) {
            this.markAssetCompleted('categories');
        }

        // Check if any favorite categories exist
        const favoriteCategoryCards = document.querySelectorAll('.favorite-categories .product-item, .favorite-categories .favorite-item');
        if (favoriteCategoryCards.length > 0) {
            this.markAssetCompleted('favoriteCategories');
        }

        // Check if any favorite brands exist
        const favoriteBrandCards = document.querySelectorAll('.favorite-brands .product-item, .favorite-brands .favorite-item');
        if (favoriteBrandCards.length > 0) {
            this.markAssetCompleted('favoriteBrands');
        }

        // Check if Amazon is connected by looking for connection status banner
        const amazonStatus = document.querySelector('.amazon-connection-status');
        if (amazonStatus) {
            this.markAssetCompleted('connection');
        }
    }

    /**
     * Reset all progress
     */
    resetProgress() {
        this.assets = {
            keywords: false,
            products: false,
            categories: false,
            favoriteCategories: false,
            favoriteBrands: false,
            connection: false
        };
        this.updateDisplay();
        this.saveProgress();
    }
}

// Initialize progress tracker when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.progressTracker = new ProgressTracker();
    
    // Check existing assets after a short delay to ensure other scripts have loaded
    setTimeout(() => {
        window.progressTracker.checkCurrentAssets();
    }, 100);
}); 