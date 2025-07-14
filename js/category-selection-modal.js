class CategorySelectionModal {
    constructor() {
        this.selectedCategories = new Set();
        this.originalCategories = new Set(); // Track original state
        this.allCategories = [
            'Electronics > Smart Home',
            'Electronics > Gaming > Peripherals',
            'Electronics > Audio > Headphones',
            'Electronics > Audio > Speakers',
            'Electronics > Wearable > Fitness Trackers',
            'Electronics > Wearable > Smartwatches',
            'Electronics > Photography > Cameras',
            'Electronics > Photography > Lenses',
            'Electronics > Photography > Tripods',
            'Electronics > Photography > Lighting',
            'Electronics > Mobile > Phone Cases',
            'Electronics > Mobile > Chargers',
            'Electronics > Mobile > Screen Protectors',
            'Electronics > Mobile > Wireless Chargers',
            'Electronics > Computing > Laptops',
            'Electronics > Computing > Desktops',
            'Electronics > Computing > Tablets',
            'Electronics > Computing > Monitors',
            'Electronics > Computing > Keyboards',
            'Electronics > Computing > Mice',
            'Electronics > Computing > Storage',
            'Electronics > Computing > Networking',
            'Electronics > TV > Smart TVs',
            'Electronics > TV > Streaming Devices',
            'Electronics > TV > Sound Bars',
            'Electronics > TV > Remote Controls',
            'Electronics > Gaming > Consoles',
            'Electronics > Gaming > Controllers',
            'Electronics > Gaming > Headsets',
            'Electronics > Gaming > Accessories',
            'Home & Garden > Kitchen > Appliances',
            'Home & Garden > Kitchen > Cookware',
            'Home & Garden > Kitchen > Utensils',
            'Home & Garden > Kitchen > Storage',
            'Home & Garden > Kitchen > Coffee Makers',
            'Home & Garden > Kitchen > Blenders',
            'Home & Garden > Kitchen > Toasters',
            'Home & Garden > Kitchen > Microwaves',
            'Home & Garden > Living Room > Furniture',
            'Home & Garden > Living Room > Lighting',
            'Home & Garden > Living Room > Decor',
            'Home & Garden > Living Room > Rugs',
            'Home & Garden > Bedroom > Mattresses',
            'Home & Garden > Bedroom > Pillows',
            'Home & Garden > Bedroom > Bedding',
            'Home & Garden > Bedroom > Furniture',
            'Home & Garden > Bathroom > Towels',
            'Home & Garden > Bathroom > Accessories',
            'Home & Garden > Bathroom > Storage',
            'Home & Garden > Bathroom > Fixtures',
            'Home & Garden > Garden > Tools',
            'Home & Garden > Garden > Plants',
            'Home & Garden > Garden > Furniture',
            'Home & Garden > Garden > Lighting',
            'Home & Garden > Garden > Watering',
            'Home & Garden > Cleaning > Vacuum Cleaners',
            'Home & Garden > Cleaning > Supplies',
            'Home & Garden > Cleaning > Tools',
            'Fashion > Clothing > Men > Shirts',
            'Fashion > Clothing > Men > Pants',
            'Fashion > Clothing > Men > Jackets',
            'Fashion > Clothing > Men > Shoes',
            'Fashion > Clothing > Men > Accessories',
            'Fashion > Clothing > Women > Dresses',
            'Fashion > Clothing > Women > Tops',
            'Fashion > Clothing > Women > Bottoms',
            'Fashion > Clothing > Women > Shoes',
            'Fashion > Clothing > Women > Accessories',
            'Fashion > Clothing > Kids > Boys',
            'Fashion > Clothing > Kids > Girls',
            'Fashion > Clothing > Kids > Shoes',
            'Fashion > Jewelry > Necklaces',
            'Fashion > Jewelry > Rings',
            'Fashion > Jewelry > Earrings',
            'Fashion > Jewelry > Bracelets',
            'Fashion > Jewelry > Watches',
            'Fashion > Bags > Handbags',
            'Fashion > Bags > Backpacks',
            'Fashion > Bags > Travel Bags',
            'Fashion > Bags > Wallets',
            'Health & Beauty > Skincare > Face Care',
            'Health & Beauty > Skincare > Body Care',
            'Health & Beauty > Skincare > Sun Care',
            'Health & Beauty > Makeup > Face Makeup',
            'Health & Beauty > Makeup > Eye Makeup',
            'Health & Beauty > Makeup > Lip Makeup',
            'Health & Beauty > Hair Care > Shampoo',
            'Health & Beauty > Hair Care > Conditioner',
            'Health & Beauty > Hair Care > Styling',
            'Health & Beauty > Hair Care > Tools',
            'Health & Beauty > Personal Care > Oral Care',
            'Health & Beauty > Personal Care > Deodorants',
            'Health & Beauty > Personal Care > Razors',
            'Health & Beauty > Wellness > Vitamins',
            'Health & Beauty > Wellness > Supplements',
            'Health & Beauty > Wellness > Fitness Equipment',
            'Sports & Outdoors > Fitness > Cardio Equipment',
            'Sports & Outdoors > Fitness > Strength Training',
            'Sports & Outdoors > Fitness > Yoga',
            'Sports & Outdoors > Fitness > Accessories',
            'Sports & Outdoors > Outdoor > Camping',
            'Sports & Outdoors > Outdoor > Hiking',
            'Sports & Outdoors > Outdoor > Fishing',
            'Sports & Outdoors > Outdoor > Hunting',
            'Sports & Outdoors > Sports > Basketball',
            'Sports & Outdoors > Sports > Football',
            'Sports & Outdoors > Sports > Soccer',
            'Sports & Outdoors > Sports > Baseball',
            'Sports & Outdoors > Sports > Tennis',
            'Sports & Outdoors > Sports > Golf',
            'Sports & Outdoors > Water Sports > Swimming',
            'Sports & Outdoors > Water Sports > Surfing',
            'Sports & Outdoors > Water Sports > Kayaking',
            'Sports & Outdoors > Winter Sports > Skiing',
            'Sports & Outdoors > Winter Sports > Snowboarding',
            'Automotive > Car Care > Cleaning',
            'Automotive > Car Care > Maintenance',
            'Automotive > Car Care > Tools',
            'Automotive > Interior > Seat Covers',
            'Automotive > Interior > Floor Mats',
            'Automotive > Interior > Organizers',
            'Automotive > Exterior > Lights',
            'Automotive > Exterior > Covers',
            'Automotive > Exterior > Accessories',
            'Automotive > Electronics > GPS',
            'Automotive > Electronics > Dash Cams',
            'Automotive > Electronics > Audio Systems',
            'Automotive > Parts > Engine',
            'Automotive > Parts > Brakes',
            'Automotive > Parts > Suspension',
            'Books & Media > Books > Fiction',
            'Books & Media > Books > Non-Fiction',
            'Books & Media > Books > Educational',
            'Books & Media > Books > Children',
            'Books & Media > Movies > DVDs',
            'Books & Media > Movies > Blu-ray',
            'Books & Media > Music > CDs',
            'Books & Media > Music > Vinyl',
            'Books & Media > Games > Board Games',
            'Books & Media > Games > Card Games',
            'Books & Media > Games > Puzzles',
            'Toys & Games > Kids > Action Figures',
            'Toys & Games > Kids > Dolls',
            'Toys & Games > Kids > Building Blocks',
            'Toys & Games > Kids > Educational Toys',
            'Toys & Games > Kids > Outdoor Toys',
            'Toys & Games > Baby > Strollers',
            'Toys & Games > Baby > Car Seats',
            'Toys & Games > Baby > Feeding',
            'Toys & Games > Baby > Toys',
            'Toys & Games > Baby > Clothing',
            'Pet Supplies > Dogs > Food',
            'Pet Supplies > Dogs > Toys',
            'Pet Supplies > Dogs > Accessories',
            'Pet Supplies > Dogs > Grooming',
            'Pet Supplies > Cats > Food',
            'Pet Supplies > Cats > Litter',
            'Pet Supplies > Cats > Toys',
            'Pet Supplies > Cats > Accessories',
            'Pet Supplies > Fish > Aquariums',
            'Pet Supplies > Fish > Food',
            'Pet Supplies > Fish > Filters',
            'Pet Supplies > Birds > Food',
            'Pet Supplies > Birds > Cages',
            'Pet Supplies > Birds > Toys',
            'Office & School > Supplies > Pens',
            'Office & School > Supplies > Paper',
            'Office & School > Supplies > Notebooks',
            'Office & School > Supplies > Folders',
            'Office & School > Furniture > Desks',
            'Office & School > Furniture > Chairs',
            'Office & School > Furniture > Storage',
            'Office & School > Electronics > Printers',
            'Office & School > Electronics > Calculators',
            'Office & School > Electronics > Shredders',
            'Tools & Hardware > Hand Tools > Screwdrivers',
            'Tools & Hardware > Hand Tools > Hammers',
            'Tools & Hardware > Hand Tools > Wrenches',
            'Tools & Hardware > Hand Tools > Pliers',
            'Tools & Hardware > Power Tools > Drills',
            'Tools & Hardware > Power Tools > Saws',
            'Tools & Hardware > Power Tools > Sanders',
            'Tools & Hardware > Hardware > Screws',
            'Tools & Hardware > Hardware > Nails',
            'Tools & Hardware > Hardware > Bolts',
            'Tools & Hardware > Storage > Tool Boxes',
            'Tools & Hardware > Storage > Organizers',
            'Food & Beverages > Snacks > Chips',
            'Food & Beverages > Snacks > Cookies',
            'Food & Beverages > Snacks > Nuts',
            'Food & Beverages > Beverages > Coffee',
            'Food & Beverages > Beverages > Tea',
            'Food & Beverages > Beverages > Soft Drinks',
            'Food & Beverages > Beverages > Water',
            'Food & Beverages > Pantry > Pasta',
            'Food & Beverages > Pantry > Rice',
            'Food & Beverages > Pantry > Sauces',
            'Food & Beverages > Pantry > Spices',
            'Food & Beverages > Frozen > Meals',
            'Food & Beverages > Frozen > Desserts',
            'Food & Beverages > Frozen > Vegetables',
            'Industrial & Scientific > Lab Equipment > Microscopes',
            'Industrial & Scientific > Lab Equipment > Scales',
            'Industrial & Scientific > Lab Equipment > Glassware',
            'Industrial & Scientific > Safety > Protective Gear',
            'Industrial & Scientific > Safety > First Aid',
            'Industrial & Scientific > Safety > Signs',
            'Industrial & Scientific > Material Handling > Carts',
            'Industrial & Scientific > Material Handling > Lifts',
            'Industrial & Scientific > Material Handling > Conveyors',
            'Collectibles & Art > Antiques > Furniture',
            'Collectibles & Art > Antiques > Jewelry',
            'Collectibles & Art > Antiques > Coins',
            'Collectibles & Art > Art > Paintings',
            'Collectibles & Art > Art > Sculptures',
            'Collectibles & Art > Art > Prints',
            'Collectibles & Art > Trading Cards > Sports',
            'Collectibles & Art > Trading Cards > Gaming',
            'Collectibles & Art > Trading Cards > Entertainment',
            'Musical Instruments > String > Guitars',
            'Musical Instruments > String > Violins',
            'Musical Instruments > String > Basses',
            'Musical Instruments > Wind > Flutes',
            'Musical Instruments > Wind > Saxophones',
            'Musical Instruments > Wind > Trumpets',
            'Musical Instruments > Percussion > Drums',
            'Musical Instruments > Percussion > Cymbals',
            'Musical Instruments > Percussion > Accessories',
            'Musical Instruments > Electronic > Keyboards',
            'Musical Instruments > Electronic > Synthesizers',
            'Musical Instruments > Electronic > Audio Interfaces'
        ];
        this.filteredCategories = [...this.allCategories];
        this.onSave = null;
        this.onCancel = null;
    }

    open() {
        // Load current favorite categories from DOM
        this.loadCurrentFavorites();
        
        this.createModal();
        this.attachEventListeners();
        this.renderCategoryList();
        
        // Initialize button state (disabled by default since no changes made yet)
        this.updateSaveButton();
        
        // Focus search input
        setTimeout(() => {
            const searchInput = this.modal.querySelector('.category-search-input');
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
        // Get current favorite categories from the DOM
        const favCategoriesBody = document.querySelector('.favorite-categories .card-body');
        const currentCategories = new Set();
        
        if (favCategoriesBody) {
            const favoriteItems = favCategoriesBody.querySelectorAll('.favorite-item');
            favoriteItems.forEach(item => {
                // Check for both span and link elements for backward compatibility
                const categoryElement = item.querySelector('span') || item.querySelector('a.category-link');
                const categoryDisplayName = categoryElement?.textContent?.trim();
                
                if (categoryDisplayName) {
                    // For links, try to get full path from data attribute first
                    if (categoryElement.tagName === 'A' && categoryElement.hasAttribute('data-full-path')) {
                        const fullPath = categoryElement.getAttribute('data-full-path');
                        currentCategories.add(fullPath);
                    } else {
                        // Extract leaf category name from "... > CategoryName" format
                        const leafCategoryName = categoryDisplayName.replace('... > ', '');
                        
                        // Find the full category path that ends with this leaf name
                        const fullCategoryPath = this.allCategories.find(fullPath => 
                            fullPath.split(' > ').pop() === leafCategoryName
                        );
                        
                        if (fullCategoryPath) {
                            currentCategories.add(fullCategoryPath);
                        }
                    }
                }
            });
        }
        
        // Set both selected and original categories to current state
        this.selectedCategories = new Set(currentCategories);
        this.originalCategories = new Set(currentCategories);
    }

    createModal() {
        // Remove existing modal if any
        this.remove();

        // Create modal overlay
        this.modal = document.createElement('div');
        this.modal.className = 'category-selection-modal-overlay';
        this.modal.innerHTML = `
            <div class="category-selection-modal">
                <div class="modal-header">
                    <div class="modal-title-section">
                        <div class="modal-icon">
                            <svg width="24" height="24" viewBox="0 0 15 14" fill="none">
                                <path d="M2.8029 14L3.66821 8.93504L0 5.34538L5.06907 4.60591L7.33333 0L9.59759 4.60591L14.6667 5.34538L10.9985 8.93504L11.8638 14L7.33333 11.6089L2.8029 14Z" fill="#195AFE"/>
                            </svg>
                        </div>
                        <h2 class="modal-title">Favorite Categories</h2>
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
                            <h3>Choose your favorite categories</h3>
                            <p class="step-description">Select the categories you want to save as favorites for quick and easy access whenever you need them. Your favorite categories will appear at the top of category lists throughout the platform.</p>
                        </div>
                        
                        <div class="category-selection-section">
                            <div class="category-label">Category:</div>
                            <div class="category-search-container">
                                <div class="search-input-wrapper">
                                    <svg class="search-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="#B6BEC6" stroke-width="2" stroke-linecap="round"/>
                                    </svg>
                                    <input type="text" class="category-search-input" placeholder="Search or select your category">
                                </div>
                                <div class="category-list-container">
                                    <div class="category-list"></div>
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
        const searchInput = this.modal.querySelector('.category-search-input');
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
            this.filteredCategories = [...this.allCategories];
        } else {
            this.filteredCategories = this.allCategories.filter(category => 
                category.toLowerCase().includes(term)
            );
        }
        
        this.renderCategoryList();
    }

    renderCategoryList() {
        const categoryList = this.modal.querySelector('.category-list');
        
        if (this.filteredCategories.length === 0) {
            categoryList.innerHTML = `
                <div class="no-categories-message">
                    <p>No categories found matching your search</p>
                </div>
            `;
            return;
        }

        categoryList.innerHTML = this.filteredCategories.map(category => `
            <div class="category-item" data-category="${category}">
                <div class="category-checkbox-wrapper">
                    <input type="checkbox" class="category-checkbox" id="category-${category.replace(/\s+/g, '-')}" ${this.selectedCategories.has(category) ? 'checked' : ''}>
                    <label for="category-${category.replace(/\s+/g, '-')}" class="category-label-text">${category}</label>
                </div>
            </div>
        `).join('');

        // Add event listeners for checkboxes
        categoryList.querySelectorAll('.category-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const categoryName = e.target.closest('.category-item').dataset.category;
                if (e.target.checked) {
                    this.selectedCategories.add(categoryName);
                } else {
                    this.selectedCategories.delete(categoryName);
                }
                this.updateSaveButton();
            });
        });

        // Add event listeners for entire category items to make them clickable
        categoryList.querySelectorAll('.category-item').forEach(categoryItem => {
            categoryItem.addEventListener('click', (e) => {
                // Don't trigger if clicking on the checkbox or label (they have their own handlers)
                if (e.target.classList.contains('category-checkbox') || e.target.classList.contains('category-label-text')) {
                    return;
                }
                
                const categoryName = categoryItem.dataset.category;
                const checkbox = categoryItem.querySelector('.category-checkbox');
                
                // Toggle checkbox state
                checkbox.checked = !checkbox.checked;
                
                // Update selected categories
                if (checkbox.checked) {
                    this.selectedCategories.add(categoryName);
                } else {
                    this.selectedCategories.delete(categoryName);
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
        if (this.selectedCategories.size !== this.originalCategories.size) {
            return true;
        }
        
        // Check if any category in selected is not in original
        for (const category of this.selectedCategories) {
            if (!this.originalCategories.has(category)) {
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

        const selectedCategoriesArray = Array.from(this.selectedCategories);
        
        // Call the global function if available, otherwise use callback
        if (window.addSelectedCategories) {
            window.addSelectedCategories(selectedCategoriesArray);
        } else if (this.onSave) {
            this.onSave(selectedCategoriesArray);
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
window.CategorySelectionModal = CategorySelectionModal;

// Initialize the category selection modal
window.categorySelectionModal = new CategorySelectionModal(); 