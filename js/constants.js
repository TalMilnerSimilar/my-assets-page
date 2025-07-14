// Application Constants
// Centralized configuration to avoid magic numbers and improve maintainability

const CONSTANTS = {
    // Timing constants
    ANIMATION_DURATION: {
        FAST: 200,
        MEDIUM: 300,
        SLOW: 500
    },
    
    // Banner auto-hide timing
    BANNER_AUTO_HIDE_DELAY: 3000,
    
    // API simulation delays
    API_SIMULATION_DELAY: 3000,
    
    // Layout constants
    LAYOUT: {
        SIDEBAR_WIDTH: 256,
        CARD_HEIGHTS: {
            HERO: 120,
            KEYWORDS: 392,
            TRACKERS: 520,
            BOTTOM_CARDS: 400,
            CUSTOM_CATEGORIES: 500
        },
        BREAKPOINTS: {
            MOBILE: 768,
            TABLET: 900,
            DESKTOP: 1200,
            LARGE_DESKTOP: 1400
        }
    },
    
    // CSS class names
    CSS_CLASSES: {
        ACTIVE: 'active',
        EXPANDED: 'expanded',
        SHOW: 'show',
        GENERATING: 'generating-btn',
        ANALYZE: 'analyze-btn',
        FILTERING_OUT: 'filtering-out',
        FILTERING_IN: 'filtering-in'
    },
    
    // Element selectors
    SELECTORS: {
        CARDS: '.card',
        FAVORITE_ICON: '.favorite-icon',
        FAVORITE_ITEM: '.favorite-item',
        CATEGORY_ITEM: '.category-item',
        TOGGLE_SWITCHER: '.toggle-switcher > div',
        COUNTRY_DROPDOWN: '#countryDropdown',
        DROPDOWN_MENU: '#dropdownMenu',
        PIN_BUTTON: '#pinButton'
    },
    
    // Messages
    MESSAGES: {
        BANNER: {
            SINGLE_CATEGORY: 'Category removed',
            MULTIPLE_CATEGORIES: 'Categories removed',
            SINGLE_BRAND: 'Brand removed',
            MULTIPLE_BRANDS: 'Brands removed'
        },
        BUTTONS: {
            GENERATING: 'Generating...',
            ANALYZE: 'Analyze',
            GENERATING_CATEGORY: 'Generating Category...'
        }
    },
    
    // Storage keys
    STORAGE_KEYS: {
        NAVBAR_PINNED: 'navbarPinned',
        SELECTED_COUNTRY: 'selectedCountry'
    },
    
    // Countries data
    COUNTRIES: [
        { code: 'amazon.com', flag: 'icons/us-flag.svg', name: 'United States' },
        { code: 'amazon.co.uk', flag: '🇬🇧', name: 'United Kingdom' },
        { code: 'amazon.de', flag: '🇩🇪', name: 'Germany' },
        { code: 'amazon.fr', flag: '🇫🇷', name: 'France' },
        { code: 'amazon.es', flag: '🇪🇸', name: 'Spain' },
        { code: 'amazon.it', flag: '🇮🇹', name: 'Italy' },
        { code: 'amazon.ca', flag: '🇨🇦', name: 'Canada' },
        { code: 'amazon.co.jp', flag: '🇯🇵', name: 'Japan' }
    ],
    
    // Filter types
    FILTER_TYPES: {
        ALL: 'all',
        LITE: 'lite',
        PRO: 'pro'
    },
    
    // Badge types
    BADGE_TYPES: {
        LITE: 'lite',
        PRO: 'pro',
        NEW: 'new',
        BETA: 'beta'
    },
    
    // Event names
    EVENTS: {
        COUNTRY_CHANGED: 'countryChanged',
        NAVBAR_TOGGLED: 'navbarToggled',
        FAVORITE_TOGGLED: 'favoriteToggled'
    },
    
    // Image paths
    IMAGES: {
        ICONS: 'icons/',
        PRODUCT_IMAGES: 'icons/images/',
        FLAGS: 'icons/'
    },
    
    // Accessibility
    ACCESSIBILITY: {
        ARIA_LABELS: {
            TOGGLE_NAVIGATION: 'Toggle navigation',
            COUNTRY_SELECTOR: 'Select country',
            FAVORITE_TOGGLE: 'Toggle favorite',
            ANALYZE_BUTTON: 'Analyze data',
            MORE_OPTIONS: 'More options'
        },
        KEYBOARD_CODES: {
            ENTER: 'Enter',
            SPACE: ' ',
            ESCAPE: 'Escape',
            ARROW_DOWN: 'ArrowDown',
            ARROW_UP: 'ArrowUp'
        }
    }
};

// Freeze the constants object to prevent modification
Object.freeze(CONSTANTS); 