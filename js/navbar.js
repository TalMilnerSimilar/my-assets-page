// Navbar Pin/Unpin Functionality

class Navbar {
    constructor() {
        this.pinButton = document.getElementById('pinButton');
        this.navbar = document.querySelector('.nav-bar');
        this.mainContent = document.querySelector('.main-content');
        
        this.init();
    }
    
    init() {
        // Check if navbar is pinned from localStorage
        const isNavbarPinned = localStorage.getItem('navbarPinned') !== 'false';
        
        // Set initial state
        if (!isNavbarPinned) {
            this.unpin();
        }
        
        this.bindEvents();
    }
    
    bindEvents() {
        // Pin button click event
        this.pinButton.addEventListener('click', () => {
            const isCurrentlyPinned = !this.navbar.classList.contains('unpinned');
            
            if (isCurrentlyPinned) {
                this.unpin();
            } else {
                this.pin();
            }
        });
        
        // Show navbar on hover when unpinned
        this.navbar.addEventListener('mouseenter', () => {
            if (this.navbar.classList.contains('unpinned')) {
                this.navbar.classList.add('hover-show');
            }
        });
        
        this.navbar.addEventListener('mouseleave', () => {
            this.navbar.classList.remove('hover-show');
        });
    }
    
    pin() {
        this.navbar.classList.remove('unpinned');
        this.mainContent.classList.remove('navbar-unpinned');
        this.pinButton.classList.remove('unpinned');
        localStorage.setItem('navbarPinned', 'true');
    }
    
    unpin() {
        this.navbar.classList.add('unpinned');
        this.mainContent.classList.add('navbar-unpinned');
        this.pinButton.classList.add('unpinned');
        localStorage.setItem('navbarPinned', 'false');
    }
}

// Initialize navbar when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Navbar();
}); 