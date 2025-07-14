class BrandSelectionModal {
    constructor() {
        this.selectedBrands = new Set();
        this.originalBrands = new Set(); // Track original state
        this.allBrands = [
            'Amazon',
            'Amazon Basics',
            'Generic',
            'NIVEA',
            'CeraVe',
            'Samsung',
            'Sony',
            'Microsoft',
            'Logitech',
            'Bose',
            'Nintendo',
            'Apple',
            'Google',
            'HP',
            'Dell',
            'Canon',
            'Nikon',
            'Nike',
            'Adidas',
            'Puma'
        ];
        this.filteredBrands = [...this.allBrands];
        this.onSave = null;
        this.onCancel = null;
    }

    open() {
        // Load current favorite brands from DOM
        this.loadCurrentFavorites();
        
        this.createModal();
        this.attachEventListeners();
        this.renderBrandList();
        
        // Initialize button state (disabled by default since no changes made yet)
        this.updateSaveButton();
        
        // Focus search input
        setTimeout(() => {
            const searchInput = this.modal.querySelector('.brand-search-input');
            if (searchInput) {
                searchInput.focus();
            }
        }, 100);
    }

    show(options = {}) {
        this.onSave = options.onSave || (() => {});
        this.onCancel = options.onCancel || (() => {});
        
        this.open();
    }

    loadCurrentFavorites() {
        // Get current favorite brands from the DOM
        const favBrandsBody = document.querySelector('.favorite-brands .card-body');
        const currentBrands = new Set();
        
        if (favBrandsBody) {
            // Look for all favorite items, regardless of checked/unchecked state
            const favoriteItems = favBrandsBody.querySelectorAll('.favorite-item');
            favoriteItems.forEach(item => {
                const brandLink = item.querySelector('.brand-link, a');
                if (brandLink) {
                    const brandName = brandLink.textContent?.trim();
                    if (brandName) {
                                            // Add all favorite brands
                    currentBrands.add(brandName);
                    }
                }
            });
        }
        
        // Set both selected and original brands to current state
        this.selectedBrands = new Set(currentBrands);
        this.originalBrands = new Set(currentBrands);
    }

    createModal() {
        // Remove existing modal if any
        this.remove();

        // Create modal overlay
        this.modal = document.createElement('div');
        this.modal.className = 'brand-selection-modal-overlay';
        this.modal.innerHTML = `
            <div class="brand-selection-modal">
                <div class="modal-header">
                    <div class="modal-title-section">
                        <div class="modal-icon">
                            <svg width="24" height="24" viewBox="0 0 15 14" fill="none">
                                <path d="M2.8029 14L3.66821 8.93504L0 5.34538L5.06907 4.60591L7.33333 0L9.59759 4.60591L14.6667 5.34538L10.9985 8.93504L11.8638 14L7.33333 11.6089L2.8029 14Z" fill="#195AFE"/>
                            </svg>
                        </div>
                        <h2 class="modal-title">Favorite Brands</h2>
                    </div>
                    <button class="modal-close-btn" type="button">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    </button>
                </div>
                
                <div class="modal-body">
                    <div class="modal-step">
                        <div class="step-header">
                            <h3>Choose your favorite brands</h3>
                            <p class="step-description">Select the brands you want to save as favorites for quick and easy access whenever you need them. Your favorite brands will appear at the top of brand lists throughout the platform.</p>
                        </div>
                        
                        <div class="brand-selection-section">
                            <div class="brand-label">Brand:</div>
                            <div class="brand-search-container">
                                <div class="search-input-wrapper">
                                    <svg class="search-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="#B6BEC6" stroke-width="2" stroke-linecap="round"/>
                                    </svg>
                                    <input type="text" class="brand-search-input" placeholder="Search or select your brand">
                                </div>
                                <div class="brand-list-container">
                                    <div class="brand-list"></div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="modal-actions">
                            <button class="modal-cancel-btn" type="button">Cancel</button>
                            <button class="modal-save-btn" type="button">Save Favorites</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(this.modal);
        document.body.classList.add('modal-open');
        
        // Trigger animation
        requestAnimationFrame(() => {
            this.modal.classList.add('show');
        });
    }

    attachEventListeners() {
        // Close modal events
        this.modal.querySelector('.modal-close-btn').addEventListener('click', () => this.close());
        this.modal.querySelector('.modal-cancel-btn').addEventListener('click', () => this.close());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });

        // Save button
        this.modal.querySelector('.modal-save-btn').addEventListener('click', () => this.save());

        // Search input
        const searchInput = this.modal.querySelector('.brand-search-input');
        searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));

        // Escape key to close
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    handleKeyDown(e) {
        if (e.key === 'Escape') {
            this.close();
        }
    }

    handleSearch(searchTerm) {
        const term = searchTerm.toLowerCase().trim();
        
        if (term === '') {
            this.filteredBrands = [...this.allBrands];
        } else {
            this.filteredBrands = this.allBrands.filter(brand => 
                brand.toLowerCase().includes(term)
            );
        }
        
        this.renderBrandList();
    }

    renderBrandList() {
        const brandList = this.modal.querySelector('.brand-list');
        
        if (this.filteredBrands.length === 0) {
            brandList.innerHTML = `
                <div class="no-brands-message">
                    <p>No brands found matching your search</p>
                </div>
            `;
            return;
        }

        brandList.innerHTML = this.filteredBrands.map(brand => `
            <div class="brand-item" data-brand="${brand}">
                <div class="brand-checkbox-wrapper">
                    <input type="checkbox" class="brand-checkbox" id="brand-${brand.replace(/\s+/g, '-')}" ${this.selectedBrands.has(brand) ? 'checked' : ''}>
                    <label for="brand-${brand.replace(/\s+/g, '-')}" class="brand-label-text">${brand}</label>
                </div>
            </div>
        `).join('');

        // Add event listeners for checkboxes
        brandList.querySelectorAll('.brand-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const brandName = e.target.closest('.brand-item').dataset.brand;
                if (e.target.checked) {
                    this.selectedBrands.add(brandName);
                } else {
                    this.selectedBrands.delete(brandName);
                }
                this.updateSaveButton();
            });
        });

        // Add event listeners for entire brand items to make them clickable
        brandList.querySelectorAll('.brand-item').forEach(brandItem => {
            brandItem.addEventListener('click', (e) => {
                // Don't trigger if clicking on the checkbox or label (they have their own handlers)
                if (e.target.classList.contains('brand-checkbox') || e.target.classList.contains('brand-label-text')) {
                    return;
                }
                
                const brandName = brandItem.dataset.brand;
                const checkbox = brandItem.querySelector('.brand-checkbox');
                
                // Toggle checkbox state
                checkbox.checked = !checkbox.checked;
                
                // Update selected brands
                if (checkbox.checked) {
                    this.selectedBrands.add(brandName);
                } else {
                    this.selectedBrands.delete(brandName);
                }
                this.updateSaveButton();
            });
        });
    }

    updateSaveButton() {
        const saveBtn = this.modal.querySelector('.modal-save-btn');
        const hasChanges = this.hasChanges();
        
        saveBtn.disabled = !hasChanges;
        saveBtn.textContent = 'Save Favorites';
    }

    hasChanges() {
        // Check if current selection differs from original
        if (this.selectedBrands.size !== this.originalBrands.size) {
            return true;
        }
        
        // Check if any brand in selected is not in original
        for (const brand of this.selectedBrands) {
            if (!this.originalBrands.has(brand)) {
                return true;
            }
        }
        
        return false;
    }

    save() {
        const saveBtn = this.modal.querySelector('.modal-save-btn');
        
        // Don't save if button is disabled or no changes made
        if (saveBtn.disabled || !this.hasChanges()) {
            return;
        }

        const selectedBrandsArray = Array.from(this.selectedBrands);
        
        // Call the global function if available, otherwise use callback
        if (window.addSelectedBrands) {
            window.addSelectedBrands(selectedBrandsArray);
        } else if (this.onSave) {
            this.onSave(selectedBrandsArray);
        }
        
        this.close();
    }

    close() {
        if (this.onCancel) {
            this.onCancel();
        }
        this.remove();
    }

    remove() {
        if (this.modal) {
            document.body.classList.remove('modal-open');
            document.removeEventListener('keydown', this.handleKeyDown.bind(this));
            
            // Animate out
            this.modal.classList.remove('show');
            
            // Remove after animation completes
            setTimeout(() => {
                if (this.modal) {
                    this.modal.remove();
                    this.modal = null;
                }
            }, 300);
        }
    }
}

// Export for use in other files
window.BrandSelectionModal = BrandSelectionModal;

// Initialize the brand selection modal
window.brandSelectionModal = new BrandSelectionModal(); 