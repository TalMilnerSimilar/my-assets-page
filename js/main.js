// Main Application Initialization and Coordination

/**
 * MyAssetsApp - Main application class
 * Handles global event management and coordination between components
 */
class MyAssetsApp {
    constructor() {
        this.bannerTimeout = null;
        this.eventHandlers = new Map();
        this.activeMoreActionsDropdown = null;
        this.init();
    }
    
    /**
     * Initialize the application
     */
    init() {
        try {
            console.log('My Assets App initialized');
            
            // Listen for country changes
            this.addEventListener('countryChanged', (event) => {
                console.log('Country changed to:', event.detail.country);
                // Here you could update API calls, refresh data, etc.
            });
            
            // Add any other app-wide initialization
            this.setupGlobalEventHandlers();
            this.setupImageHoverEffects();
            
            // Favorites are now handled by FavoritesManager
        } catch (error) {
            this.handleError('Failed to initialize app', error);
        }
    }
    
    /**
     * Add event listener with cleanup tracking
     */
    addEventListener(event, handler) {
        document.addEventListener(event, handler);
        
        // Store for cleanup
        if (!this.eventHandlers.has(event)) {
            this.eventHandlers.set(event, []);
        }
        this.eventHandlers.get(event).push(handler);
    }
    
    /**
     * Remove all event listeners (for cleanup)
     */
    removeAllEventListeners() {
        this.eventHandlers.forEach((handlers, event) => {
            handlers.forEach(handler => {
                document.removeEventListener(event, handler);
            });
        });
        this.eventHandlers.clear();
    }
    
    /**
     * Global error handler
     */
    handleError(message, error) {
        console.error(`[MyAssetsApp] ${message}:`, error);
        
        // Could implement user-facing error notifications here
        // this.showErrorMessage(message);
    }
    
    /**
     * Setup global event handlers
     */
    setupGlobalEventHandlers() {
        try {
            // Handle analyze button clicks
            this.addEventListener('click', (e) => {
                try {
                    if (e.target.classList.contains('analyze-btn')) {
                        this.handleAnalyzeClick(e.target);
                    }
                    
                    // Handle filters button clicks
                    if (e.target.classList.contains('filters-btn') || e.target.closest('.filters-btn')) {
                        this.handleFiltersClick(e.target.closest('.filters-btn') || e.target);
                    }
                    
                    // Handle more-icon clicks
                    if (e.target.classList.contains('more-icon') || e.target.closest('.more-icon')) {
                        e.preventDefault();
                        e.stopPropagation();
                        this.handleMoreIconClick(e.target.closest('.more-icon') || e.target);
                    }
                    
                    // Favorite icon clicks are now handled by FavoritesManager
                } catch (error) {
                    this.handleError('Error in click handler', error);
                }
            });
            
            // Handle create button click
            const createButton = document.querySelector('.create-button');
            if (createButton) {
                createButton.addEventListener('click', (e) => {
                    try {
                        e.stopPropagation();
                        this.toggleCreateAssetDropdown(createButton);
                    } catch (error) {
                        this.handleError('Error in create button handler', error);
                    }
                });
            }
            
            // Close dropdown when clicking outside
            this.addEventListener('click', (e) => {
                try {
                    // Don't close if clicking on trigger buttons or inside dropdowns
                    if (!e.target.closest('.create-new-asset, .more-icon, .create-asset-dropdown, .more-actions-dropdown')) {
                    this.closeCreateAssetDropdown();
                        this.closeMoreActionsDropdown();
                    }
                } catch (error) {
                    this.handleError('Error closing dropdown', error);
                }
            });
            
            // Handle keyboard navigation
            this.setupKeyboardHandlers();
        } catch (error) {
            this.handleError('Failed to setup event handlers', error);
        }
    }
    
    /**
     * Setup keyboard navigation handlers
     */
    setupKeyboardHandlers() {
        this.addEventListener('keydown', (e) => {
            try {
                // Handle Enter and Space for button-like elements
                if (e.key === 'Enter' || e.key === ' ') {
                    const target = e.target;
                    
                    if (target.classList.contains('favorite-icon') || 
                        target.classList.contains('more-icon') ||
                        target.classList.contains('nav-item')) {
                        e.preventDefault();
                        target.click();
                    }
                }
                
                // Handle Escape to close dropdowns
                if (e.key === 'Escape') {
                    this.closeCreateAssetDropdown();
                    this.closeMoreActionsDropdown();
                    this.closeCountryDropdown();
                }
            } catch (error) {
                this.handleError('Error in keyboard handler', error);
            }
        });
    }

    /**
     * Setup image hover effects for illustrations
     */
    setupImageHoverEffects() {
        try {
            console.log('MyAssetsApp: Setting up image hover effects...');
            
            // Favorite Categories hover effect - trigger on tile hover
            const favCategoriesCard = document.querySelector('.favorite-categories');
            const favCategoriesImg = favCategoriesCard ? favCategoriesCard.querySelector('.empty-state-icon img') : null;
            
            if (favCategoriesCard && favCategoriesImg) {
                console.log('MyAssetsApp: Found favorite categories card and image:', favCategoriesImg.src);
                
                // Add error handling for image loading
                favCategoriesImg.addEventListener('error', () => {
                    console.error('MyAssetsApp: Image failed to load:', favCategoriesImg.src);
                });
                
                favCategoriesImg.addEventListener('load', () => {
                    console.log('MyAssetsApp: Image loaded successfully:', favCategoriesImg.src);
                });
                
                if (favCategoriesImg.src.includes('favorite-categories-empty-illustration.svg')) {
                    const originalSrc = favCategoriesImg.src;
                    const hoverSrc = originalSrc.replace(/\.svg(\?v=\d+)?$/, '-hover.svg$1');
                    
                    console.log('MyAssetsApp: Setting up tile hover effect for favorite categories');
                    console.log('Original src:', originalSrc);
                    console.log('Hover src:', hoverSrc);
                    
                    // Attach hover to the entire card, not just the image
                    favCategoriesCard.addEventListener('mouseenter', () => {
                        console.log('MyAssetsApp: Card hover enter - switching to hover image');
                        favCategoriesImg.src = hoverSrc;
                    });
                    
                    favCategoriesCard.addEventListener('mouseleave', () => {
                        console.log('MyAssetsApp: Card hover leave - switching to original image');
                        favCategoriesImg.src = originalSrc;
                    });
                } else {
                    console.log('MyAssetsApp: Image source does not match expected pattern:', favCategoriesImg.src);
                }
            } else {
                console.log('MyAssetsApp: Favorite categories card or image not found');
                // Try to wait a bit and look again
                setTimeout(() => {
                    const delayedCard = document.querySelector('.favorite-categories');
                    const delayedImg = delayedCard ? delayedCard.querySelector('.empty-state-icon img') : null;
                    if (delayedCard && delayedImg) {
                        console.log('MyAssetsApp: Found favorite categories on retry:', delayedImg.src);
                        this.setupImageHoverEffects();
                    }
                }, 1000);
            }
            
            // Favorite Brands hover effect - trigger on tile hover
            const favBrandsCard = document.querySelector('.favorite-brands');
            const favBrandsImg = favBrandsCard ? favBrandsCard.querySelector('.empty-state-icon img') : null;
            
            if (favBrandsCard && favBrandsImg) {
                console.log('MyAssetsApp: Found favorite brands card and image:', favBrandsImg.src);
                
                // Add error handling for image loading
                favBrandsImg.addEventListener('error', () => {
                    console.error('MyAssetsApp: Image failed to load:', favBrandsImg.src);
                });
                
                favBrandsImg.addEventListener('load', () => {
                    console.log('MyAssetsApp: Image loaded successfully:', favBrandsImg.src);
                });
                
                if (favBrandsImg.src.includes('favorite-brands-empty-illustration.svg')) {
                    const originalSrc = favBrandsImg.src;
                    const hoverSrc = originalSrc.replace(/\.svg(\?v=\d+)?$/, '-hover.svg$1');
                    
                    console.log('MyAssetsApp: Setting up tile hover effect for favorite brands');
                    console.log('Original src:', originalSrc);
                    console.log('Hover src:', hoverSrc);
                    
                    // Attach hover to the entire card, not just the image
                    favBrandsCard.addEventListener('mouseenter', () => {
                        console.log('MyAssetsApp: Card hover enter - switching to hover image');
                        favBrandsImg.src = hoverSrc;
                    });
                    
                    favBrandsCard.addEventListener('mouseleave', () => {
                        console.log('MyAssetsApp: Card hover leave - switching to original image');
                        favBrandsImg.src = originalSrc;
                    });
                } else {
                    console.log('MyAssetsApp: Image source does not match expected pattern:', favBrandsImg.src);
                }
            } else {
                console.log('MyAssetsApp: Favorite brands card or image not found');
            }
            
            // My Products hover effect - trigger on tile hover
            const myProductsCard = document.querySelector('.my-products');
            const myProductsImg = myProductsCard ? myProductsCard.querySelector('.empty-state-icon img') : null;
            
            if (myProductsCard && myProductsImg) {
                console.log('MyAssetsApp: Found my products card and image:', myProductsImg.src);
                
                // Add error handling for image loading
                myProductsImg.addEventListener('error', () => {
                    console.error('MyAssetsApp: Image failed to load:', myProductsImg.src);
                });
                
                myProductsImg.addEventListener('load', () => {
                    console.log('MyAssetsApp: Image loaded successfully:', myProductsImg.src);
                });
                
                if (myProductsImg.src.includes('my-products-empty-illustration.svg')) {
                    const originalSrc = myProductsImg.src;
                    const hoverSrc = originalSrc.replace(/\.svg(\?v=\d+)?$/, '-hover.svg$1');
                    
                    console.log('MyAssetsApp: Setting up tile hover effect for my products');
                    console.log('Original src:', originalSrc);
                    console.log('Hover src:', hoverSrc);
                    
                    // Attach hover to the entire card, not just the image
                    myProductsCard.addEventListener('mouseenter', () => {
                        console.log('MyAssetsApp: Card hover enter - switching to hover image');
                        myProductsImg.src = hoverSrc;
                    });
                    
                    myProductsCard.addEventListener('mouseleave', () => {
                        console.log('MyAssetsApp: Card hover leave - switching to original image');
                        myProductsImg.src = originalSrc;
                    });
                } else {
                    console.log('MyAssetsApp: Image source does not match expected pattern:', myProductsImg.src);
                }
            } else {
                console.log('MyAssetsApp: My products card or image not found');
            }
            
            // Keyword Lists hover effect - trigger on tile hover
            const keywordListsCard = document.querySelector('.keyword-lists');
            const keywordListsImg = keywordListsCard ? keywordListsCard.querySelector('.empty-state-icon img') : null;
            
            if (keywordListsCard && keywordListsImg) {
                console.log('MyAssetsApp: Found keyword lists card and image:', keywordListsImg.src);
                
                // Add error handling for image loading
                keywordListsImg.addEventListener('error', () => {
                    console.log('MyAssetsApp: Image load error for keyword lists:', keywordListsImg.src);
                });
                
                if (keywordListsImg.src.includes('keyword-lists-empty-illustration.svg')) {
                    const originalSrc = keywordListsImg.src;
                    const hoverSrc = originalSrc.replace(/\.svg(\?v=\d+)?$/, '-hover.svg$1');
                    
                    console.log('MyAssetsApp: Setting up keyword lists hover:', originalSrc, '->', hoverSrc);
                    
                    keywordListsCard.addEventListener('mouseenter', () => {
                        console.log('MyAssetsApp: Keyword lists hover enter');
                        keywordListsImg.src = hoverSrc;
                    });
                    
                    keywordListsCard.addEventListener('mouseleave', () => {
                        console.log('MyAssetsApp: Keyword lists hover leave');
                        keywordListsImg.src = originalSrc;
                    });
                } else {
                    console.log('MyAssetsApp: Keyword lists image source does not match expected pattern:', keywordListsImg.src);
                }
            } else {
                console.log('MyAssetsApp: Keyword lists card or image not found');
            }
            
            // Product Trackers hover effect - trigger on tile hover
            const productTrackersCard = document.querySelector('.product-trackers');
            const productTrackersImg = productTrackersCard ? productTrackersCard.querySelector('.empty-state-icon img') : null;
            
            if (productTrackersCard && productTrackersImg) {
                console.log('MyAssetsApp: Found product trackers card and image:', productTrackersImg.src);
                
                // Add error handling for image loading
                productTrackersImg.addEventListener('error', () => {
                    console.log('MyAssetsApp: Image load error for product trackers:', productTrackersImg.src);
                });
                
                if (productTrackersImg.src.includes('product-trackers-empty-illustration.svg')) {
                    const originalSrc = productTrackersImg.src;
                    const hoverSrc = originalSrc.replace(/\.svg(\?v=\d+)?$/, '-hover.svg$1');
                    
                    console.log('MyAssetsApp: Setting up product trackers hover:', originalSrc, '->', hoverSrc);
                    
                    productTrackersCard.addEventListener('mouseenter', () => {
                        console.log('MyAssetsApp: Product trackers hover enter');
                        productTrackersImg.src = hoverSrc;
                    });
                    
                    productTrackersCard.addEventListener('mouseleave', () => {
                        console.log('MyAssetsApp: Product trackers hover leave');
                        productTrackersImg.src = originalSrc;
                    });
                } else {
                    console.log('MyAssetsApp: Product trackers image source does not match expected pattern:', productTrackersImg.src);
                }
            } else {
                console.log('MyAssetsApp: Product trackers card or image not found');
            }
            
            // Custom Categories hover effect - trigger on tile hover
            const customCategoriesCard = document.querySelector('.custom-categories');
            const customCategoriesImg = customCategoriesCard ? customCategoriesCard.querySelector('.empty-state-icon img') : null;
            
            if (customCategoriesCard && customCategoriesImg) {
                console.log('MyAssetsApp: Found custom categories card and image:', customCategoriesImg.src);
                
                // Add error handling for image loading
                customCategoriesImg.addEventListener('error', () => {
                    console.log('MyAssetsApp: Image load error for custom categories:', customCategoriesImg.src);
                });
                
                if (customCategoriesImg.src.includes('custom-categories-empty-illustration.svg')) {
                    const originalSrc = customCategoriesImg.src;
                    const hoverSrc = originalSrc.replace(/\.svg(\?v=\d+)?$/, '-hover.svg$1');
                    
                    console.log('MyAssetsApp: Setting up custom categories hover:', originalSrc, '->', hoverSrc);
                    
                    customCategoriesCard.addEventListener('mouseenter', () => {
                        console.log('MyAssetsApp: Custom categories hover enter');
                        customCategoriesImg.src = hoverSrc;
                    });
                    
                    customCategoriesCard.addEventListener('mouseleave', () => {
                        console.log('MyAssetsApp: Custom categories hover leave');
                        customCategoriesImg.src = originalSrc;
                    });
                } else {
                    console.log('MyAssetsApp: Custom categories image source does not match expected pattern:', customCategoriesImg.src);
                }
            } else {
                console.log('MyAssetsApp: Custom categories card or image not found');
            }
        } catch (error) {
            this.handleError('Error setting up image hover effects', error);
        }
    }
    
    // Favorite handling moved to FavoritesManager
    
    /**
     * Close country dropdown (utility method)
     */
    closeCountryDropdown() {
        const dropdown = document.getElementById('dropdownMenu');
        const button = document.getElementById('countryDropdown');
        if (dropdown && button) {
            dropdown.style.display = 'none';
            button.setAttribute('aria-expanded', 'false');
        }
    }
    
    /**
     * Handle analyze button click
     * @param {HTMLElement} button - The analyze button element
     */
    handleAnalyzeClick(button) {
        try {
            if (!button) {
                throw new Error('Button element is null');
            }

            // Convert to generating state
            button.classList.remove('analyze-btn');
            button.classList.add('generating-btn');
            button.innerHTML = '<div class="refresh-icon"></div> Generating...';
            button.disabled = true;
            button.setAttribute('aria-label', 'Generating analysis');
            
            // Simulate API call
            setTimeout(() => {
                this.resetAnalyzeButton(button);
            }, 3000);
        } catch (error) {
            this.handleError('Failed to handle analyze click', error);
            // Reset button state on error
            if (button) {
                this.resetAnalyzeButton(button);
            }
        }
    }
    
    /**
     * Reset analyze button to default state
     * @param {HTMLElement} button - The button to reset
     */
    resetAnalyzeButton(button) {
        try {
            if (!button) {
                throw new Error('Button element is null');
            }

            button.classList.remove('generating-btn');
            button.classList.add('analyze-btn');
            button.innerHTML = 'Analyze';
            button.disabled = false;
            button.setAttribute('aria-label', 'Analyze this topic');
        } catch (error) {
            this.handleError('Failed to reset analyze button', error);
        }
    }
    
    handleFiltersClick(filtersButton) {
        const categoryItem = filtersButton.closest('.category-item');
        const chevron = filtersButton.querySelector('.chevron-down');
        
        if (categoryItem) {
            // Toggle expanded state
            categoryItem.classList.toggle('expanded');
            
            // Update chevron direction
            if (categoryItem.classList.contains('expanded')) {
                chevron.style.transform = 'rotate(180deg)';
            } else {
                chevron.style.transform = 'rotate(0deg)';
            }
        }
    }
    
    // Favorite methods moved to FavoritesManager
    
    toggleCreateAssetDropdown(button) {
        // Remove existing dropdown
        this.closeCreateAssetDropdown();
        
        // Create dropdown
        const dropdown = document.createElement('div');
        dropdown.className = 'create-asset-dropdown';
        
        dropdown.innerHTML = `
            <div class="dropdown-list-item" data-type="keyword-list">
                <div class="dropdown-item-content">
                    <span class="dropdown-item-text">Keyword List</span>
                    <div class="dropdown-item-icon">
                        <img src="icons/keyword list.svg" alt="Keywords" />
                </div>
                </div>
            </div>
            
            <div class="dropdown-list-item" data-type="product-tracker">
                <div class="dropdown-item-content">
                    <span class="dropdown-item-text">Product Tracker</span>
                    <div class="dropdown-item-icon">
                        <img src="icons/product tracker.svg" alt="Product Tracker" />
                </div>
                </div>
            </div>
            
            <div class="dropdown-list-item" data-type="custom-category">
                <div class="dropdown-item-content">
                    <span class="dropdown-item-text">Custom Category</span>
                    <div class="dropdown-item-icon">
                        <img src="icons/custom category.svg" alt="Custom Category" />
                </div>
                </div>
            </div>
            
            <div class="dropdown-list-item" data-type="favorite-categories">
                <div class="dropdown-item-content">
                    <span class="dropdown-item-text">Favorite Categories</span>
                    <div class="dropdown-item-icon">
                        <img src="icons/star-icon.svg" alt="Star" />
                </div>
                </div>
            </div>
            
            <div class="dropdown-list-item" data-type="favorite-brands">
                <div class="dropdown-item-content">
                    <span class="dropdown-item-text">Favorite Brands</span>
                    <div class="dropdown-item-icon">
                        <img src="icons/star-icon.svg" alt="Star" />
                </div>
                </div>
            </div>
            
            <div class="dropdown-list-item" data-type="1p-connection">
                <div class="dropdown-item-content">
                    <span class="dropdown-item-text">Connect 1P data</span>
                    <div class="dropdown-item-icon">
                        <img src="icons/Amazon icon.svg" alt="Amazon" />
                </div>
                </div>
            </div>
        `;
        
        // Position dropdown relative to button
        button.style.position = 'relative';
        button.appendChild(dropdown);
        
        // Add click handlers
        const options = dropdown.querySelectorAll('.dropdown-list-item');
        options.forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                const type = option.dataset.type;
                this.createAsset(type);
                this.closeCreateAssetDropdown();
            });
        });
    }
    
    closeCreateAssetDropdown() {
        const existingDropdown = document.querySelector('.create-asset-dropdown');
        if (existingDropdown) {
            existingDropdown.remove();
        }
    }
    
    createAsset(type) {
        this.closeCreateAssetDropdown();

        const addItemsManager = window.addItemsManager;
        let newItem;

        switch (type) {
            case 'product-tracker':
                this.showSuccessMessage("Direct the user to the relevant creation page, no need for this toast");
                newItem = addItemsManager.addTracker();
                this.scrollToTile(newItem);
                break;
            case 'custom-category':
                this.showSuccessMessage("Direct the user to the relevant creation page, no need for this toast");
                newItem = addItemsManager.addCustomCategory();
                this.scrollToTile(newItem);
                break;
            case 'keyword-list':
                this.showSuccessMessage("Open the keyword creation side panel, no need for this toast");
                newItem = addItemsManager.addKeywordList();
                this.scrollToTile(newItem);
                break;
            case 'favorite-brands':
                addItemsManager.addFavoriteBrand();
                break;
            case 'favorite-categories':
                addItemsManager.addFavoriteCategory();
                break;
            case '1p-connection':
                this.showSuccessMessage("Direct the user to the MBA page, no need for this toast");
                addItemsManager.connectAmazon();
                this.scrollToTile(document.querySelector('.my-products'));
                break;
            default:
                // This case should not be reached with the current UI
                this.showSuccessMessage(`${type.replace('-', ' ')} created successfully!`);
                break;
        }
    }
    
    showSuccessMessage(message) {
        // Remove any existing toast
        const existingToast = document.querySelector('.toast-notification');
        if (existingToast) {
            existingToast.remove();
        }

        // Create the toast element
        const toast = document.createElement('div');
        toast.className = 'toast-notification';

        toast.innerHTML = `
            <span class="toast-message">${message}</span>
            <button class="toast-close-btn">&times;</button>
            <div class="toast-timer"></div>
        `;

        document.body.appendChild(toast);

        // Animate in
        setTimeout(() => {
            toast.classList.add('show');
        }, 10); // Small delay to ensure transition happens

        const closeToast = () => {
            toast.classList.remove('show');
            // Remove the element after the transition ends
            toast.addEventListener('transitionend', () => {
                if (toast.parentElement) {
                    toast.remove();
                }
            }, { once: true });
        };

        // Auto-dismiss after 5 seconds
        const autoDismiss = setTimeout(closeToast, 5000);

        // Manual close button
        toast.querySelector('.toast-close-btn').addEventListener('click', () => {
            clearTimeout(autoDismiss);
            closeToast();
        });
    }

    scrollToTile(tile) {
        if (!tile) return;
    
        const header = document.querySelector('.shi-header');
        const headerHeight = header ? header.offsetHeight : 0;
        const tileRect = tile.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const tileTop = tileRect.top + scrollTop;
        const targetScrollTop = tileTop - headerHeight;
    
        window.scrollTo({
            top: targetScrollTop,
            behavior: 'smooth'
        });
    }

    showConfirmationModal(itemName, itemType, onConfirm) {
        // Create modal HTML
        const modalHTML = `
            <div class="confirmation-modal" id="confirmationModal">
                <div class="confirmation-modal-content">
                    <div class="confirmation-modal-header">
                        <div class="confirmation-modal-title-container">
                            <h3 class="confirmation-modal-title">Delete a ${itemType}</h3>
                        </div>
                    </div>
                    <div class="confirmation-modal-body">
                        <p class="confirmation-modal-message">
                            Are you sure you want to delete this ${itemType}? This cannot be undone.
                        </p>
                    </div>
                    <div class="confirmation-modal-footer">
                        <button class="confirmation-modal-cancel-btn" id="modalCancelBtn">Cancel</button>
                        <button class="confirmation-modal-delete-btn" id="modalDeleteBtn">Delete</button>
                    </div>
                </div>
            </div>
        `;
        
        // Add modal to body
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        const modal = document.getElementById('confirmationModal');
        const cancelBtn = document.getElementById('modalCancelBtn');
        const deleteBtn = document.getElementById('modalDeleteBtn');
        
        // Show modal with animation
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
        
        // Handle cancel
        const handleCancel = () => {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.remove();
            }, 300);
        };
        
        // Handle delete
        const handleDelete = () => {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.remove();
                onConfirm();
            }, 300);
        };
        
        // Event listeners
        cancelBtn.addEventListener('click', handleCancel);
        deleteBtn.addEventListener('click', handleDelete);
        
        // Click outside to close
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                handleCancel();
            }
        });
        
        // Escape key to close
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                handleCancel();
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
    }

    showFavoriteRemovalModal(itemName, itemType, onConfirm) {
        // Create modal HTML for favorite removal
        const modalHTML = `
            <div class="confirmation-modal" id="confirmationModal">
                <div class="confirmation-modal-content">
                    <div class="confirmation-modal-header">
                        <div class="confirmation-modal-title-container">
                            <h3 class="confirmation-modal-title">Remove ${itemType} from favorites</h3>
                        </div>
                    </div>
                    <div class="confirmation-modal-body">
                        <p class="confirmation-modal-message">
                            Are you sure you want to remove "${itemName}" from your favorite ${itemType === 'category' ? 'categories' : 'brands'}? You can add it back later.
                        </p>
                    </div>
                    <div class="confirmation-modal-footer">
                        <button class="confirmation-modal-cancel-btn" id="modalCancelBtn">Cancel</button>
                        <button class="confirmation-modal-delete-btn" id="modalDeleteBtn">Remove</button>
                    </div>
                </div>
            </div>
        `;
        
        // Add modal to body
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        const modal = document.getElementById('confirmationModal');
        const cancelBtn = document.getElementById('modalCancelBtn');
        const deleteBtn = document.getElementById('modalDeleteBtn');
        
        // Show modal with animation
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
        
        // Handle cancel
        const handleCancel = () => {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.remove();
            }, 300);
        };
        
        // Handle delete
        const handleDelete = () => {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.remove();
                onConfirm();
            }, 300);
        };
        
        // Event listeners
        cancelBtn.addEventListener('click', handleCancel);
        deleteBtn.addEventListener('click', handleDelete);
        
        // Click outside to close
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                handleCancel();
            }
        });
        
        // Escape key to close
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                handleCancel();
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
    }

    handleMoreIconClick(moreIcon) {
        // Close any existing dropdown first
        this.closeMoreActionsDropdown();
        
        // Create the dropdown
        const dropdown = document.createElement('div');
        dropdown.className = 'more-actions-dropdown';
        
        // Determine the parent item type to customize dropdown content
        const parentItem = moreIcon.closest('.topic-item, .product-card, .category-item');
        let dropdownContent = '';
        
        if (parentItem && parentItem.classList.contains('product-card')) {
            if (parentItem.classList.contains('my-product-item')) {
                // My products only show analyze option (no delete)
                dropdownContent = `
                    <div class="dropdown-item" data-action="analyze">
                        <span>Analyze</span>
                    </div>
                `;
            } else {
                // Product trackers show analyze and delete options
                dropdownContent = `
                    <div class="dropdown-item" data-action="analyze">
                        <span>Analyze</span>
                    </div>
                    <div class="dropdown-item" data-action="delete">
                        <span>Delete</span>
                    </div>
                `;
            }
        } else if (parentItem && (parentItem.classList.contains('topic-item') || parentItem.classList.contains('category-item'))) {
            // Keyword lists and custom categories show only edit and delete (no analyze - they have standalone analyze buttons)
            dropdownContent = `
                <div class="dropdown-item" data-action="edit">
                    <span>Edit</span>
                </div>
                <div class="dropdown-item" data-action="delete">
                    <span>Delete</span>
                </div>
            `;
        } else {
            // All other items show analyze, edit and delete options
            dropdownContent = `
                <div class="dropdown-item" data-action="analyze">
                    <span>Analyze</span>
                </div>
                <div class="dropdown-item" data-action="edit">
                    <span>Edit</span>
                </div>
                <div class="dropdown-item" data-action="delete">
                    <span>Delete</span>
                </div>
            `;
        }
        
        dropdown.innerHTML = dropdownContent;
        
        // Find the appropriate actions container
        const actionsContainer = moreIcon.closest('.topic-actions, .product-actions, .category-actions');
        if (actionsContainer) {
            // Make sure the container has relative positioning for the dropdown
            actionsContainer.style.position = 'relative';
            actionsContainer.appendChild(dropdown);
            
            // Add dropdown-active class to parent item for overflow handling
            if (parentItem) {
                parentItem.classList.add('dropdown-active');
                this.activeDropdownParent = parentItem;
            }
            
            // Store reference for cleanup
            this.activeMoreActionsDropdown = dropdown;
            
            // Add click handlers for dropdown items
            dropdown.addEventListener('click', (e) => {
                const item = e.target.closest('.dropdown-item');
                if (item) {
                    e.stopPropagation();
                    const action = item.dataset.action;
                    this.handleMoreAction(action, parentItem);
                    this.closeMoreActionsDropdown();
                }
            });
            
            // Show dropdown with animation
            setTimeout(() => {
                dropdown.classList.add('show');
            }, 10);
        }
    }

    closeMoreActionsDropdown() {
        if (this.activeMoreActionsDropdown) {
            this.activeMoreActionsDropdown.remove();
            this.activeMoreActionsDropdown = null;
        }
        
        // Remove dropdown-active class from parent item
        if (this.activeDropdownParent) {
            this.activeDropdownParent.classList.remove('dropdown-active');
            this.activeDropdownParent = null;
        }
    }

    handleMoreAction(action, parentItem) {
        if (!parentItem) return;
        
        // Get the item name based on item type
        let itemName = 'this item';
        let itemType = 'item';
        
        if (parentItem.classList.contains('topic-item')) {
            // Keyword list item
            itemName = parentItem.querySelector('.topic-info h4')?.textContent || 'this keyword list';
            itemType = 'keyword list';
        } else if (parentItem.classList.contains('product-card')) {
            // Product tracker or my product item
            itemName = parentItem.querySelector('.product-name .product-text')?.textContent || 'this product';
            itemType = parentItem.classList.contains('my-product-item') ? 'product' : 'tracker';
        } else if (parentItem.classList.contains('category-item')) {
            // Custom category item
            itemName = parentItem.querySelector('.category-title h4')?.textContent || 'this category';
            itemType = 'category';
        }
        
        if (action === 'analyze') {
            // Find the analyze button equivalent in the dropdown and simulate the click
            const analyzeBtn = document.createElement('button');
            analyzeBtn.className = 'analyze-btn';
            analyzeBtn.textContent = 'Analyze';
            
            // Temporarily add it to the parent item so handleAnalyzeClick can find it
            parentItem.appendChild(analyzeBtn);
            
            // Call the existing analyze functionality
            this.handleAnalyzeClick(analyzeBtn);
            
            // Remove the temporary button
            analyzeBtn.remove();
            
        } else if (action === 'edit') {
            this.showSuccessMessage("Direct the user to the relevant edit page, no need for this toast");
            const addItemsManager = window.addItemsManager;
            if (parentItem.classList.contains('topic-item')) {
                const keyword = addItemsManager.getRandomItem(addItemsManager.sampleData.keywords);
                parentItem.querySelector('h4').textContent = keyword.name;
                parentItem.querySelector('p').textContent = `${keyword.count} Keywords`;
            } else if (parentItem.classList.contains('category-item')) {
                const category = addItemsManager.getRandomItem(addItemsManager.sampleData.categories);
                parentItem.querySelector('h4').textContent = category.name;
                // You might want to update the badge as well, e.g.
                // parentItem.querySelector('.badge').textContent = category.badge;
            }
            // Add animation to highlight the change
            parentItem.classList.add('item-updated');
            setTimeout(() => parentItem.classList.remove('item-updated'), 1000);

        } else if (action === 'delete') {
            this.showConfirmationModal(itemName, itemType, () => {
                // Get container and card references BEFORE removing the item
                const container = parentItem.closest('.card-body');
                const card = parentItem.closest('.card');

                // Remove the item
                parentItem.remove();
                this.showSuccessMessage(`"${itemName}" deleted successfully`);
                
                // Check if this was the last item and restore empty state if needed
                this.checkForEmptyStateRestoration(container, card);
            });
        }
    }

    checkForEmptyStateRestoration(container, card) {
        if (!container || !card) return;
        
        // Check if there are any remaining items after deletion
        const remainingItems = container.querySelectorAll('.topic-item, .product-card, .category-item');
        
        if (remainingItems.length === 0) {
            // Clear the container completely
            container.innerHTML = '';
            
            // Restore the appropriate empty state based on card type
            if (card.classList.contains('keyword-lists')) {
                this.restoreKeywordListsEmptyState(container);
                this.fireAssetRemovedEvent('keyword-lists');
            } else if (card.classList.contains('product-trackers')) {
                this.restoreProductTrackersEmptyState(container);
                this.fireAssetRemovedEvent('product-trackers');
            } else if (card.classList.contains('custom-categories')) {
                this.restoreCustomCategoriesEmptyState(container);
                this.fireAssetRemovedEvent('custom-categories');
            }
        }
    }

    checkForFavoriteEmptyStateRestoration(container, card) {
        if (!container || !card) return;
        
        // Check if there are any remaining favorite items after deletion
        const remainingItems = container.querySelectorAll('.favorite-item');
        
        if (remainingItems.length === 0) {
            // Clear the container completely
            container.innerHTML = '';
            
            // Restore the appropriate empty state based on card type
            if (card.classList.contains('favorite-categories')) {
                this.restoreFavoriteCategoriesEmptyState(container);
                this.fireAssetRemovedEvent('favorite-categories');
            } else if (card.classList.contains('favorite-brands')) {
                this.restoreFavoriteBrandsEmptyState(container);
                this.fireAssetRemovedEvent('favorite-brands');
            }
        }
    }
    
    restoreKeywordListsEmptyState(container) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">
                    <img src="illustrations/keyword-lists-empty-illustration.svg?v=2" alt="Keyword list illustration" />
                </div>
                <div class="empty-state-content">
                    <div class="empty-state-text">
                        <h4>🚀 Dominate Amazon search</h4>
                        <p>Unlock hidden keyword opportunities your competitors are missing.</p>
                    </div>
                    <button class="empty-state-button add-item">
                        <span class="product-tracker-button-text">Create your first Keyword List</span>
                    </button>
                </div>
            </div>
        `;
    }
    
    restoreProductTrackersEmptyState(container) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">
                    <img src="illustrations/product-trackers-empty-illustration.svg?v=2" alt="Product tracker illustration" />
                </div>
                <div class="empty-state-content">
                    <h4>📈 Spy on your competition</h4>
                    <p>Track any product's performance, rankings, and reviews instantly.</p>
                </div>
                <button class="empty-state-button add-item">
                    <span class="product-tracker-button-text">Track Your First Product</span>
                </button>
            </div>
        `;
    }
    
        restoreCustomCategoriesEmptyState(container) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">
                    <img src="illustrations/custom-categories-empty-illustration.svg?v=2" alt="Custom category illustration" />
                </div>
                <div class="empty-state-content">
                    <h4>💎 Build your market empire</h4>
                    <p>Create categories that reveal untapped market segments and profitable niches.</p>
                </div>
                <button class="empty-state-button add-item">
                    <span class="product-tracker-button-text">Add a new Custom Category</span>
                </button>
            </div>
        `;
    }

    restoreFavoriteCategoriesEmptyState(container) {
        container.innerHTML = `
            <div class="empty-state" style="padding-top: 16px;">
                <div class="empty-state-icon" style="width: 150px; height: 120px; margin-bottom: 32px;">
                    <img src="illustrations/favorite-categories-empty-illustration.svg?v=4" alt="Favorite categories illustration" />
                </div>
                <div class="empty-state-content">
                    <h4>⭐ Bookmark your goldmines</h4>
                    <p>Save the most profitable categories for instant access.</p>
                </div>
                <button class="empty-state-button add-item">
                    <span>Add a new Favorite Category</span>
                </button>
            </div>
        `;
    }

    restoreFavoriteBrandsEmptyState(container) {
        container.innerHTML = `
            <div class="empty-state" style="padding-top: 16px;">
                <div class="empty-state-icon" style="width: 150px; height: 120px; margin-bottom: 32px;">
                    <img src="illustrations/favorite-brands-empty-illustration.svg?v=1" alt="Favorite brands illustration" style="width: 91px; height: 150px;" />
                </div>
                <div class="empty-state-content">
                    <h4>🏆 Follow the market leaders</h4>
                    <p>Pin the top brands to stay updated on their strategies.</p>
                </div>
                <button class="empty-state-button add-item">
                    <span>Add a new Favorite Brand</span>
                </button>
            </div>
        `;
    }

    fireAssetRemovedEvent(assetType) {
        document.dispatchEvent(new CustomEvent('assetRemoved', {
            detail: { assetType }
        }));
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.myAssetsApp = new MyAssetsApp();
    
    // We handle scrolling manually now, so this can be removed to avoid conflicts.
    // document.documentElement.style.scrollBehavior = 'smooth';
}); 