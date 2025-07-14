// Add Items Functionality
class AddItemsManager {
    constructor() {
        this.sampleData = {
            keywords: [
                { name: 'Gaming Accessories', count: 127 },
                { name: 'Wireless Speakers', count: 89 },
                { name: 'Smart Home Devices', count: 156 },
                { name: 'Mobile Chargers', count: 203 },
                { name: 'Laptop Stands', count: 94 },
                { name: 'Camera Tripods', count: 76 },
                { name: 'Bluetooth Earbuds', count: 189 },
                { name: 'Phone Cases', count: 234 }
            ],
            trackers: [
                { name: 'Apple Watch Series 9 GPS...', brand: 'Apple', category: 'Wearables', image: 'apple-watch.jpg' },
                { name: 'Sony WH-1000XM5 Wireless Headphones...', brand: 'Sony', category: 'Audio Equipment', image: 'wireless-headphones.jpg' },
                { name: 'Nike Air Max 270 React Sneakers...', brand: 'Nike', category: 'Footwear', image: 'nike-sneaker.jpg' },
                { name: 'Ray-Ban Aviator Classic Sunglasses...', brand: 'Ray-Ban', category: 'Accessories', image: 'sunglasses.jpg' },
                { name: 'Bose SoundLink Flex Speaker...', brand: 'Bose', category: 'Audio Equipment', image: 'bluetooth-speaker.jpg' },
                { name: 'Canon EF 50mm f/1.8 STM Lens...', brand: 'Canon', category: 'Camera Accessories', image: 'camera-lens.jpg' },
                { name: 'Logitech MX Master 3S Mouse...', brand: 'Logitech', category: 'Computer Accessories', image: 'wireless-mouse.jpg' },
                { name: 'Keychron K2 Mechanical Keyboard...', brand: 'Keychron', category: 'Computer Accessories', image: 'mechanical-keyboard.jpg' },
                { name: 'DJI Mini 3 Pro Drone...', brand: 'DJI', category: 'Drones & Cameras', image: 'drone.jpg' },
                { name: 'Fitbit Charge 5 Fitness Tracker...', brand: 'Fitbit', category: 'Wearables', image: 'fitness-tracker.jpg' },
                { name: 'Xbox Series X Wireless Controller...', brand: 'Microsoft', category: 'Gaming', image: 'gaming-controller.jpg' },
                { name: 'Amazon Echo Dot 5th Gen...', brand: 'Amazon', category: 'Smart Home', image: 'smart-home-device.jpg' },
                { name: 'Chanel No. 5 Eau de Parfum...', brand: 'Chanel', category: 'Beauty & Personal Care', image: 'perfume-bottle.jpg' },
                { name: 'Louis Vuitton Neverfull MM Tote...', brand: 'Louis Vuitton', category: 'Fashion', image: 'leather-bag.jpg' },
                { name: 'iPhone 15 Pro Silicone Case...', brand: 'Apple', category: 'Phone Accessories', image: 'phone-case.jpg' },
                { name: 'Yeti Rambler 20oz Tumbler...', brand: 'Yeti', category: 'Drinkware', image: 'coffee-cup.jpg' },
                { name: 'Samsung Galaxy S24 Ultra...', brand: 'Samsung', category: 'Smartphones', image: 'smartphone.png' },
                { name: 'iPad Pro 12.9-inch M2...', brand: 'Apple', category: 'Tablets', image: 'tablet.png' },
                { name: 'MacBook Pro 16-inch M3 Max...', brand: 'Apple', category: 'Laptops', image: 'laptop.png' },
                { name: 'LG C3 65-inch OLED 4K TV...', brand: 'LG', category: 'TVs & Displays', image: 'tv.png' }
            ],
            categories: [
                { name: 'Smart Watches', badge: 'PRO', type: 'pro', image: 'apple-watch.jpg' },
                { name: 'Gaming Keyboards', badge: 'LITE', type: 'lite', image: 'mechanical-keyboard.jpg' },
                { name: 'Wireless Mice', badge: 'PRO', type: 'pro', image: 'wireless-mouse.jpg' },
                { name: 'Smartphone Accessories', badge: 'LITE', type: 'lite', image: 'phone-case.jpg' },
                { name: 'Home Office Equipment', badge: 'PRO', type: 'pro', image: 'coffee-cup.jpg' },
                { name: 'Fitness Trackers', badge: 'LITE', type: 'lite', image: 'fitness-tracker.jpg' },
                { name: 'Audio Equipment', badge: 'PRO', type: 'pro', image: 'wireless-headphones.jpg' },
                { name: 'Fashion Accessories', badge: 'LITE', type: 'lite', image: 'sunglasses.jpg' },
                { name: 'Gaming Controllers', badge: 'PRO', type: 'pro', image: 'gaming-controller.jpg' },
                { name: 'Beauty Products', badge: 'LITE', type: 'lite', image: 'perfume-bottle.jpg' },
                { name: 'Smart Home Devices', badge: 'PRO', type: 'pro', image: 'smart-home-device.jpg' },
                { name: 'Footwear', badge: 'LITE', type: 'lite', image: 'nike-sneaker.jpg' }
            ],
            favoriteCategories: [
                '...> Smart Home',
                '...> Gaming Peripherals',
                '...> Mobile Accessories',
                '...> Audio Equipment',
                '...> Computer Hardware',
                '...> Streaming Devices'
            ],
            favoriteBrands: [
                'Samsung',
                'Sony',
                'Microsoft',
                'Logitech',
                'Bose',
                'Nintendo'
            ]
        };
        
        this.init();
    }

    init() {
        // Add click listeners to all add-item buttons and connect-amazon button
        document.addEventListener('click', (e) => {
            if (e.target.closest('.add-item')) {
                const addButton = e.target.closest('.add-item');
                const span = addButton.querySelector('span');
                const text = span.textContent;
                
                if (text.includes('Keyword List')) {
                    this.addKeywordList();
                } else if (text.includes('Tracker') || text.includes('Track Your First Product')) {
                    this.addTracker();
                } else if (text.includes('Custom Category')) {
                    this.addCustomCategory();
                } else if (text.includes('Favorite Category')) {
                    this.addFavoriteCategory();
                } else if (text.includes('Favorite Brand')) {
                    this.addFavoriteBrand();
                } else if (text.includes('Product')) {
                    this.addMyProduct();
                }
            } else if (e.target.closest('.connect-amazon')) {
                this.connectAmazon();
            }
        });
    }

    getRandomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    replaceEmptyStateIfNeeded(container, addButtonText) {
        const emptyState = container.querySelector('.empty-state');
        if (emptyState) {
            const addButton = document.createElement('div');
            addButton.className = 'add-item';
            addButton.innerHTML = `<span>${addButtonText}</span>`;
            container.replaceChild(addButton, emptyState);
        }
    }

    restoreEmptyState(container, cardType) {
        // Remove existing add button if present
        const addButton = container.querySelector('.add-item');
        if (addButton) {
            addButton.remove();
        }

        // Create empty state based on card type
        const emptyState = document.createElement('div');
        emptyState.className = 'empty-state';
        emptyState.style.paddingTop = '16px';

        if (cardType === 'favorite-brands') {
            emptyState.innerHTML = `
                <div class="empty-state-icon" style="width: 150px; height: 120px; margin-bottom: 32px;">
                    <img src="illustrations/favorite-brands-empty-illustration.svg?v=1" alt="Favorite brands illustration" style="width: 91px; height: 150px;" />
                </div>
                <div class="empty-state-content">
                    <h4>🏆 Follow the market leaders</h4>
                    <p>Monitor winning brands and spot opportunities to outmaneuver them.</p>
                </div>
                <button class="empty-state-button add-item">
                    <span>Add a new Favorite Brand</span>
                </button>
            `;
        } else if (cardType === 'favorite-categories') {
            emptyState.innerHTML = `
                <div class="empty-state-icon" style="width: 150px; height: 120px; margin-bottom: 32px;">
                                                <img src="illustrations/favorite-categories-empty-illustration.svg?v=4" alt="Favorite categories illustration" />
                </div>
                <div class="empty-state-content">
                    <h4>🎯 Focus on what matters</h4>
                    <p>Save time by focusing on your most important product categories.</p>
                </div>
                <button class="empty-state-button add-item">
                    <span>Add a new Favorite Category</span>
                </button>
            `;
        } else if (cardType === 'keyword-lists') {
            emptyState.innerHTML = `
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
            `;
        } else if (cardType === 'product-trackers') {
            emptyState.innerHTML = `
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
            `;
        } else if (cardType === 'custom-categories') {
            emptyState.innerHTML = `
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
            `;
        }

        container.appendChild(emptyState);
        
        // Set up hover effect for favorite categories - trigger on tile hover
        if (cardType === 'favorite-categories') {
            const img = emptyState.querySelector('img');
            const favCategoriesCard = container.closest('.favorite-categories');
            
            if (favCategoriesCard && img && img.src.includes('favorite-categories-empty-illustration.svg')) {
                const originalSrc = img.src;
                const hoverSrc = originalSrc.replace(/\.svg(\?v=\d+)?$/, '-hover.svg$1');
                
                console.log('AddItemsManager: Setting up tile hover effect for restored favorite categories');
                console.log('Original src:', originalSrc);
                console.log('Hover src:', hoverSrc);
                
                // Add error handling for image loading
                img.addEventListener('error', () => {
                    console.error('AddItemsManager: Image failed to load:', img.src);
                });
                
                img.addEventListener('load', () => {
                    console.log('AddItemsManager: Image loaded successfully:', img.src);
                });
                
                // Attach hover to the entire card, not just the image
                favCategoriesCard.addEventListener('mouseenter', () => {
                    console.log('AddItemsManager: Card hover enter - switching to hover image');
                    img.src = hoverSrc;
                });
                
                favCategoriesCard.addEventListener('mouseleave', () => {
                    console.log('AddItemsManager: Card hover leave - switching to original image');
                    img.src = originalSrc;
                });
            } else if (img) {
                console.log('AddItemsManager: Image source does not match expected pattern or card not found:', img.src);
            }
        }
        
        // Set up hover effect for favorite brands - trigger on tile hover
        if (cardType === 'favorite-brands') {
            const img = emptyState.querySelector('img');
            const favBrandsCard = container.closest('.favorite-brands');
            
            if (favBrandsCard && img && img.src.includes('favorite-brands-empty-illustration.svg')) {
                const originalSrc = img.src;
                const hoverSrc = originalSrc.replace(/\.svg(\?v=\d+)?$/, '-hover.svg$1');
                
                console.log('AddItemsManager: Setting up tile hover effect for restored favorite brands');
                console.log('Original src:', originalSrc);
                console.log('Hover src:', hoverSrc);
                
                // Add error handling for image loading
                img.addEventListener('error', () => {
                    console.error('AddItemsManager: Image failed to load:', img.src);
                });
                
                img.addEventListener('load', () => {
                    console.log('AddItemsManager: Image loaded successfully:', img.src);
                });
                
                // Attach hover to the entire card, not just the image
                favBrandsCard.addEventListener('mouseenter', () => {
                    console.log('AddItemsManager: Card hover enter - switching to hover image');
                    img.src = hoverSrc;
                });
                
                favBrandsCard.addEventListener('mouseleave', () => {
                    console.log('AddItemsManager: Card hover leave - switching to original image');
                    img.src = originalSrc;
                });
            } else if (img) {
                console.log('AddItemsManager: Image source does not match expected pattern or card not found:', img.src);
            }
        }
        
        // Set up hover effect for keyword lists - trigger on tile hover
        if (cardType === 'keyword-lists') {
            const img = emptyState.querySelector('img');
            const keywordListsCard = container.closest('.keyword-lists');
            
            if (keywordListsCard && img && img.src.includes('keyword-lists-empty-illustration.svg')) {
                const originalSrc = img.src;
                const hoverSrc = originalSrc.replace(/\.svg(\?v=\d+)?$/, '-hover.svg$1');
                
                console.log('AddItemsManager: Setting up tile hover effect for restored keyword lists');
                console.log('Original src:', originalSrc);
                console.log('Hover src:', hoverSrc);
                
                // Add error handling for image loading
                img.addEventListener('error', () => {
                    console.error('AddItemsManager: Image failed to load:', img.src);
                });
                
                img.addEventListener('load', () => {
                    console.log('AddItemsManager: Image loaded successfully:', img.src);
                });
                
                // Attach hover to the entire card, not just the image
                keywordListsCard.addEventListener('mouseenter', () => {
                    console.log('AddItemsManager: Card hover enter - switching to hover image');
                    img.src = hoverSrc;
                });
                
                keywordListsCard.addEventListener('mouseleave', () => {
                    console.log('AddItemsManager: Card hover leave - switching to original image');
                    img.src = originalSrc;
                });
            } else if (img) {
                console.log('AddItemsManager: Image source does not match expected pattern or card not found:', img.src);
            }
        }
        
        // Set up hover effect for product trackers - trigger on tile hover
        if (cardType === 'product-trackers') {
            const img = emptyState.querySelector('img');
            const productTrackersCard = container.closest('.product-trackers');
            
            if (productTrackersCard && img && img.src.includes('product-trackers-empty-illustration.svg')) {
                const originalSrc = img.src;
                const hoverSrc = originalSrc.replace(/\.svg(\?v=\d+)?$/, '-hover.svg$1');
                
                console.log('AddItemsManager: Setting up tile hover effect for restored product trackers');
                console.log('Original src:', originalSrc);
                console.log('Hover src:', hoverSrc);
                
                // Add error handling for image loading
                img.addEventListener('error', () => {
                    console.error('AddItemsManager: Image failed to load:', img.src);
                });
                
                img.addEventListener('load', () => {
                    console.log('AddItemsManager: Image loaded successfully:', img.src);
                });
                
                // Attach hover to the entire card, not just the image
                productTrackersCard.addEventListener('mouseenter', () => {
                    console.log('AddItemsManager: Card hover enter - switching to hover image');
                    img.src = hoverSrc;
                });
                
                productTrackersCard.addEventListener('mouseleave', () => {
                    console.log('AddItemsManager: Card hover leave - switching to original image');
                    img.src = originalSrc;
                });
            } else if (img) {
                console.log('AddItemsManager: Image source does not match expected pattern or card not found:', img.src);
            }
        }
        
        // Set up hover effect for custom categories - trigger on tile hover
        if (cardType === 'custom-categories') {
            const img = emptyState.querySelector('img');
            const customCategoriesCard = container.closest('.custom-categories');
            
            if (customCategoriesCard && img && img.src.includes('custom-categories-empty-illustration.svg')) {
                const originalSrc = img.src;
                const hoverSrc = originalSrc.replace(/\.svg(\?v=\d+)?$/, '-hover.svg$1');
                
                console.log('AddItemsManager: Setting up tile hover effect for restored custom categories');
                console.log('Original src:', originalSrc);
                console.log('Hover src:', hoverSrc);
                
                // Add error handling for image loading
                img.addEventListener('error', () => {
                    console.error('AddItemsManager: Image failed to load:', img.src);
                });
                
                img.addEventListener('load', () => {
                    console.log('AddItemsManager: Image loaded successfully:', img.src);
                });
                
                // Attach hover to the entire card, not just the image
                customCategoriesCard.addEventListener('mouseenter', () => {
                    console.log('AddItemsManager: Card hover enter - switching to hover image');
                    img.src = hoverSrc;
                });
                
                customCategoriesCard.addEventListener('mouseleave', () => {
                    console.log('AddItemsManager: Card hover leave - switching to original image');
                    img.src = originalSrc;
                });
            } else if (img) {
                console.log('AddItemsManager: Image source does not match expected pattern or card not found:', img.src);
            }
        }
    }

    addKeywordList() {
        const keyword = this.getRandomItem(this.sampleData.keywords);
        const keywordListsBody = document.querySelector('.keyword-lists .card-body');
        const addButton = keywordListsBody.querySelector('.add-item, .empty-state');
        
        // Replace empty state with regular add button if this is the first item
        this.replaceEmptyStateIfNeeded(keywordListsBody, 'Add a new Keyword List');
        
        const newItem = document.createElement('div');
        newItem.className = 'topic-item';
        newItem.innerHTML = `
            <div class="topic-content">
                <div class="topic-icon-container">
                    <div class="topic-icon"></div>
                </div>
                <div class="topic-info">
                    <h4>${keyword.name}</h4>
                    <p>${keyword.count} Keywords</p>
                </div>
            </div>
            <div class="topic-actions">
                <button class="analyze-btn">Analyze</button>
                <button class="more-icon" type="button" aria-label="More actions"></button>
            </div>
        `;
        
        keywordListsBody.insertBefore(newItem, keywordListsBody.querySelector('.add-item'));
        this.animateNewItem(newItem);
        
        // Dispatch event for onboarding tracking
        this.dispatchAssetEvent('assetCreated', 'keyword-lists');
        return newItem;
    }

    addTracker() {
        const tracker = this.getRandomItem(this.sampleData.trackers);
        const trackersBody = document.querySelector('.product-trackers .card-body');
        
        // Replace empty state with regular add button if this is the first item
        this.replaceEmptyStateIfNeeded(trackersBody, 'Add a new Tracker');
        
        const newItem = document.createElement('div');
        newItem.className = 'product-card';
        newItem.innerHTML = `
            <div class="product-image dynamic-image" style="background-image: url('icons/images/${tracker.image}'); background-size: cover; background-position: center; background-repeat: no-repeat;"></div>
            <div class="product-info">
                <div class="product-name">
                    <span class="product-icon"></span>
                    <span class="product-text">${tracker.name}</span>
                </div>
                <div class="product-brand">
                    <span class="brand-icon"></span>
                    <span class="product-text">${tracker.brand}</span>
                </div>
                <div class="product-category">
                    <span class="category-icon"></span>
                    <span class="product-text">${tracker.category}</span>
                </div>
            </div>
            <div class="product-actions">
                <div class="more-icon"></div>
            </div>
        `;
        
        trackersBody.insertBefore(newItem, trackersBody.querySelector('.add-item'));
        this.animateNewItem(newItem);
        
        // Dispatch event for onboarding tracking
        this.dispatchAssetEvent('assetCreated', 'product-trackers');
        return newItem;
    }

    addCustomCategory() {
        const category = this.getRandomItem(this.sampleData.categories);
        
        // Check Pro category limit (5 max)
        if (category.type === 'pro') {
            const existingProCategories = document.querySelectorAll('.category-item.pro-category');
            if (existingProCategories.length >= 5) {
                // Show error message or switch to lite category
                console.log('Pro category limit reached (5 max). Adding lite category instead.');
                const liteCategories = this.sampleData.categories.filter(cat => cat.type === 'lite');
                const selectedCategory = this.getRandomItem(liteCategories);
                return this.addCategoryItem(selectedCategory);
            }
        }
        
        return this.addCategoryItem(category);
    }
    
    addCategoryItem(category) {
        console.log(`AddItemsManager: Adding ${category.type} category: ${category.name}`);
        
        const categoriesBody = document.querySelector('.custom-categories .card-body');
        
        // Replace empty state with regular add button if this is the first item
        this.replaceEmptyStateIfNeeded(categoriesBody, 'Add a new Custom Category');
        
        const newItem = document.createElement('div');
        newItem.className = 'category-item';
        if (category.type === 'lite') {
            newItem.classList.add('lite-category');
        } else {
            newItem.classList.add('pro-category');
        }
        
        // Determine if this is a Pro category to show generating state
        const isProCategory = category.type === 'pro';
        const actionButton = isProCategory 
            ? `<button class="generating-btn" disabled>
                <div class="refresh-icon"></div>
                <span>Generating Category...</span>
            </button>`
            : `<button class="analyze-btn">
                <span>Analyze</span>
            </button>`;
        
        newItem.innerHTML = `
            <div class="category-main">
                <div class="category-images">
                    <div class="category-image dynamic-category-image" style="background-image: url('icons/images/${category.image}'); background-size: cover; background-position: center; background-repeat: no-repeat;"></div>
                    <div class="category-image dynamic-category-image" style="background-image: url('icons/images/${category.image}'); background-size: cover; background-position: center; background-repeat: no-repeat;"></div>
                    <div class="category-image dynamic-category-image" style="background-image: url('icons/images/${category.image}'); background-size: cover; background-position: center; background-repeat: no-repeat;"></div>
                </div>
                <div class="category-content">
                    <div class="category-title">
                        <h4>${category.name}</h4>
                        <div class="${category.type}-badge">${category.badge}</div>
                        <div class="floop-decoration"></div>
                        <div class="filters-btn">
                            <span>Filters</span>
                            <div class="chevron-down"></div>
                        </div>
                    </div>
                </div>
                <div class="category-actions">
                    ${actionButton}
                    <button class="more-icon" type="button" aria-label="More actions"></button>
                </div>
            </div>
            <div class="category-separator"></div>
            <div class="category-expanded-content">
                <div class="filter-stats">
                    <div class="filter-stat-item">
                        <span class="stat-number">${Math.floor(Math.random() * 5)}</span>
                        <span class="stat-label">Categories</span>
                        <div class="floop-decoration"></div>
                    </div>
                    <div class="filter-stat-item">
                        <span class="stat-number">${Math.floor(Math.random() * 20) + 1}</span>
                        <span class="stat-label">Brands</span>
                        <div class="floop-decoration"></div>
                    </div>
                    <div class="filter-stat-item">
                        <span class="stat-number">${Math.floor(Math.random() * 10)}</span>
                        <span class="stat-label">Names Included</span>
                        <div class="floop-decoration"></div>
                    </div>
                    <div class="filter-stat-item">
                        <span class="stat-number">${Math.floor(Math.random() * 5)}</span>
                        <span class="stat-label">Names Excluded</span>
                        <div class="floop-decoration"></div>
                    </div>
                    <div class="filter-stat-item">
                        <span class="stat-number">${Math.floor(Math.random() * 25) + 1}</span>
                        <span class="stat-label">Product Attributes</span>
                        <div class="floop-decoration"></div>
                    </div>
                    <div class="filter-stat-item">
                        <span class="stat-number">${Math.floor(Math.random() * 15)}</span>
                        <span class="stat-label">ASINs Included</span>
                        <div class="floop-decoration"></div>
                    </div>
                    <div class="filter-stat-item">
                        <span class="stat-number">${Math.floor(Math.random() * 10)}</span>
                        <span class="stat-label">ASINs Excluded</span>
                        <div class="floop-decoration"></div>
                    </div>
                    <div class="filter-stat-item no-decoration">
                        <span class="stat-label">Result Limit:</span>
                        <span class="stat-number">${['None', '100', '500', '1000', '2000'][Math.floor(Math.random() * 5)]}</span>
                    </div>
                </div>
            </div>
        `;
        
        categoriesBody.insertBefore(newItem, categoriesBody.querySelector('.add-item'));
        this.animateNewItem(newItem);
        
        // If it's a Pro category, set up the 3-second transition to normal state
        if (isProCategory) {
            console.log(`AddItemsManager: Pro category created, will switch to normal state in 3 seconds`);
            setTimeout(() => {
                this.convertGeneratingToNormal(newItem);
            }, 3000); // 3 seconds
        }
        
        // Update the toggle counter immediately after adding
        this.updateToggleCounter();
        
        // Dispatch event for onboarding tracking
        this.dispatchAssetEvent('assetCreated', 'custom-categories');
        return newItem;
    }
    
    /**
     * Convert a Pro category from generating state to normal state
     */
    convertGeneratingToNormal(categoryItem) {
        try {
            console.log('AddItemsManager: Converting Pro category from generating to normal state');
            
            const generatingBtn = categoryItem.querySelector('.generating-btn');
            if (generatingBtn) {
                // Replace the generating button with an analyze button
                const analyzeBtn = document.createElement('button');
                analyzeBtn.className = 'analyze-btn';
                analyzeBtn.innerHTML = '<span>Analyze</span>';
                
                // Replace the generating button with the analyze button
                generatingBtn.parentNode.replaceChild(analyzeBtn, generatingBtn);
                console.log('AddItemsManager: Pro category conversion completed - added analyze button');
            } else {
                console.warn('AddItemsManager: No generating button found to convert');
            }
        } catch (error) {
            console.error('AddItemsManager: Error converting generating to normal state:', error);
        }
    }

    updateToggleCounter() {
        // Force immediate count update
        console.log('AddItemsManager: Requesting toggle counter update...');
        
        // Try multiple times with increasing delays to ensure DOM is ready
        const attemptUpdate = (attempt = 0) => {
            // Try direct access first
            if (window.globalToggleSwitcher) {
                console.log(`AddItemsManager: Updating counter via globalToggleSwitcher (attempt ${attempt + 1})`);
                window.globalToggleSwitcher.forceUpdateCount();
                return;
            }
            
            // Try fallback function
            if (window.updateToggleCounters) {
                console.log(`AddItemsManager: Updating counter via fallback function (attempt ${attempt + 1})`);
                if (window.updateToggleCounters()) {
                    return;
                }
            }
            
            if (attempt < 5) {
                setTimeout(() => attemptUpdate(attempt + 1), 50 * (attempt + 1));
            } else {
                console.warn('AddItemsManager: Toggle counter update failed after 5 attempts');
            }
        };
        
        setTimeout(() => attemptUpdate(), 10);
    }

    addFavoriteCategory() {
        // Open category selection modal using the global instance
        if (window.categorySelectionModal) {
            window.categorySelectionModal.open();
        }
    }

    addSelectedCategories(categories) {
        const favCategoriesBody = document.querySelector('.favorite-categories .card-body');
        
        // Replace empty state with regular add button if this is the first item
        this.replaceEmptyStateIfNeeded(favCategoriesBody, 'Add a new Favorite Category');
        
        // Remove existing favorite items (but keep add button)
        const existingItems = favCategoriesBody.querySelectorAll('.favorite-item');
        existingItems.forEach(item => item.remove());
        
        // Add all selected categories
        categories.forEach((category, index) => {
            // Extract only the leaf category name (part after last ">")
            const leafCategoryName = category.includes(' > ') ? 
                category.split(' > ').pop() : 
                category;
            
            const newItem = document.createElement('div');
            newItem.className = 'favorite-item';
            newItem.innerHTML = `
                <a href="#" class="category-link" data-full-path="${category}" title="${category}">... > ${leafCategoryName}</a>
                <div class="favorite-icon" aria-label="Toggle ${leafCategoryName} favorite" tabindex="0"></div>
            `;
            
            favCategoriesBody.insertBefore(newItem, favCategoriesBody.querySelector('.add-item'));
            
            // Animate each item with a slight delay
            setTimeout(() => {
                this.animateNewItem(newItem);
            }, index * 100);
        });
        
        // If no categories selected, show empty state
        if (categories.length === 0) {
            this.restoreEmptyState(favCategoriesBody, 'favorite-categories');
        }
        
        // Allow time for DOM updates to complete
        setTimeout(() => {
            // Items are now initialized and ready
        }, categories.length * 100 + 100);
        
        // Dispatch event for onboarding tracking  
        this.dispatchAssetEvent('assetCreated', 'favorite-categories');
    }

    addFavoriteBrand() {
        // Open brand selection modal using the global instance
        if (window.brandSelectionModal) {
            window.brandSelectionModal.open();
        }
    }

    addSelectedBrands(brands) {
        const favBrandsBody = document.querySelector('.favorite-brands .card-body');
        
        // Replace empty state with regular add button if this is the first item
        this.replaceEmptyStateIfNeeded(favBrandsBody, 'Add a new Favorite Brand');
        
        // Remove existing favorite items (but keep add button)
        const existingItems = favBrandsBody.querySelectorAll('.favorite-item');
        existingItems.forEach(item => item.remove());
        
        // Add all selected brands
        brands.forEach((brand, index) => {
            const newItem = document.createElement('div');
            newItem.className = 'favorite-item';
            
            newItem.innerHTML = `
                <a href="#" class="brand-link">${brand}</a>
                <div class="favorite-icon" aria-label="Toggle ${brand} favorite" tabindex="0"></div>
            `;
            
            favBrandsBody.insertBefore(newItem, favBrandsBody.querySelector('.add-item'));
            
            // Animate each item with a slight delay
            setTimeout(() => {
                this.animateNewItem(newItem);
            }, index * 100);
        });
        
        // If no brands selected, show empty state
        if (brands.length === 0) {
            this.restoreEmptyState(favBrandsBody, 'favorite-brands');
        }
        
        // Allow time for DOM updates to complete
        setTimeout(() => {
            // Items are now initialized and ready
        }, brands.length * 100 + 100);
        
        // Dispatch event for onboarding tracking  
        this.dispatchAssetEvent('assetCreated', 'favorite-brands');
    }

    connectAmazon() {
        const myProductsBody = document.querySelector('.my-products .card-body');
        const connectButton = myProductsBody.querySelector('.connect-amazon');
        
        // Show connecting state
        connectButton.innerHTML = '<span>Connecting...</span>';
        connectButton.disabled = true;
        connectButton.style.opacity = '0.7';
        
        // Simulate connection process (3 seconds)
        setTimeout(() => {
            // Remove the empty state/connect button
            const emptyState = myProductsBody.querySelector('.empty-state');
            if (emptyState) {
                emptyState.remove();
            }
            
            // Add 20 sample products automatically
            this.addAllMyProducts();
            
            // Add connection status banner at card level (like removal banner)
            const myProductsCard = document.querySelector('.my-products');
            const header = document.createElement('div');
            header.className = 'amazon-connection-status';
            header.innerHTML = `
                <div class="connection-info">
                    <img src="icons/Amazon icon.svg" alt="Amazon" style="width: 20px; height: 20px; filter: brightness(0) invert(1);">
                    <span>Amazon account connected • 20 products imported</span>
                </div>
            `;
            
            // Position at card level, after the card header (like removal banner)
            const cardHeader = myProductsCard.querySelector('.card-header');
            cardHeader.insertAdjacentElement('afterend', header);
            
            // Auto-hide the banner after 3 seconds (like removal banner)
            setTimeout(() => {
                if (header && header.parentNode) {
                    header.style.opacity = '0';
                    header.style.transform = 'translateY(-10px)';
                    setTimeout(() => {
                        if (header && header.parentNode) {
                            header.remove();
                        }
                    }, 300); // Wait for fade animation
                }
            }, 3000);
            
            // Dispatch Amazon connection event for progress tracking
            const event = new CustomEvent('amazonConnected', {
                bubbles: true
            });
            document.dispatchEvent(event);
            console.log('AddItemsManager: Dispatched amazonConnected event');
            
        }, 3000);
    }

    addAllMyProducts() {
        const myProductsBody = document.querySelector('.my-products .card-body');
        
        // Add 20 products from our sample data
        for (let i = 0; i < 20; i++) {
            const product = this.getRandomItem(this.sampleData.trackers);
            
            const newItem = document.createElement('div');
            newItem.className = 'product-card my-product-item';
            newItem.innerHTML = `
                <div class="product-image" style="background-image: url('icons/images/${product.image}'); background-size: cover; background-position: center;"></div>
                <div class="product-info">
                    <div class="product-name">
                        <span class="product-icon"></span>
                        <span class="product-text">${product.name}</span>
                    </div>
                    <div class="product-brand">
                        <span class="brand-icon"></span>
                        <span class="product-text">${product.brand}</span>
                    </div>
                    <div class="product-category">
                        <span class="category-icon"></span>
                        <span class="product-text">${product.category}</span>
                    </div>
                </div>
                <div class="product-actions">
                    <div class="more-icon"></div>
                </div>
            `;
            
            myProductsBody.appendChild(newItem);
            
            // Stagger the animation
            setTimeout(() => {
                this.animateNewItem(newItem);
            }, i * 50);
        }
    }

    animateNewItem(item) {
        // Add entrance animation
        item.style.opacity = '0';
        item.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.3s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 50);
    }
    
    /**
     * Dispatch asset-related events for onboarding tracking
     */
    dispatchAssetEvent(eventType, assetType) {
        const event = new CustomEvent(eventType, {
            detail: { assetType },
            bubbles: true
        });
        document.dispatchEvent(event);
        console.log(`AddItemsManager: Dispatched ${eventType} event for ${assetType}`);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.addItemsManager = new AddItemsManager();
    
    // Make these functions globally accessible for the modals
    window.addSelectedBrands = (brands) => {
        if (window.addItemsManager) {
            window.addItemsManager.addSelectedBrands(brands);
        }
    };
    
    window.addSelectedCategories = (categories) => {
        if (window.addItemsManager) {
            window.addItemsManager.addSelectedCategories(categories);
        }
    };
}); 