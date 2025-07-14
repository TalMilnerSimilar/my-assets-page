/**
 * Tooltip Manager - Handles tooltip display with fixed positioning
 */
class TooltipManager {
    constructor() {
        this.activeTooltip = null;
        this.hoverState = new Map(); // Track hover state for each icon
        this.hideTimeout = null;
        this.showTimeout = null; // Add timeout for delayed showing
        this.init();
    }

    /**
     * Initialize tooltip system
     */
    init() {
        console.log('TooltipManager: Initializing...');
        this.bindEvents();
    }

    /**
     * Bind event listeners
     */
    bindEvents() {
        // Use pointer events for better cross-device support
        // Event delegation for info icons
        document.addEventListener('pointerenter', (e) => {
            if (e.target.classList.contains('info-icon')) {
                this.handleIconEnter(e.target);
            } else if (e.target.classList.contains('category-link')) {
                this.handleCategoryLinkEnter(e.target);
            } else if (e.target.classList.contains('shared-tag')) {
                this.handleSharedTagEnter(e.target);
            }
        }, true);

        document.addEventListener('pointerleave', (e) => {
            if (e.target.classList.contains('info-icon')) {
                this.handleIconLeave(e.target);
            } else if (e.target.classList.contains('category-link')) {
                this.handleCategoryLinkLeave(e.target);
            } else if (e.target.classList.contains('shared-tag')) {
                this.handleSharedTagLeave(e.target);
            }
        }, true);

        // Handle tooltip link clicks
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('tooltip-link')) {
                const linkUrl = e.target.getAttribute('data-url');
                if (linkUrl) {
                    console.log('TooltipManager: Opening tooltip link:', linkUrl);
                    window.open(linkUrl, '_blank');
                    this.hideTooltip();
                } else {
                e.preventDefault();
                    console.log('TooltipManager: Tooltip link clicked but no URL found');
                }
            }
        });

        // Global escape key handler
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.activeTooltip) {
                this.hideTooltip();
            }
        });
    }

    handleIconEnter(icon) {
        console.log('TooltipManager: Icon enter detected');
        
        // Clear any pending hide timeout
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
            this.hideTimeout = null;
        }

        // Set hover state for this icon
        this.hoverState.set(icon, true);
        
        // Show tooltip with delay
        this.showTooltipWithDelay(icon);
    }

    handleIconLeave(icon) {
        console.log('TooltipManager: Icon leave detected');
        
        // Remove hover state for this icon
        this.hoverState.set(icon, false);
        
        // Clear any pending show timeout
        if (this.showTimeout) {
            clearTimeout(this.showTimeout);
            this.showTimeout = null;
        }
        
        // Start delayed hide process
        this.startHideDelay();
    }

    handleTooltipEnter(tooltip) {
        console.log('TooltipManager: Tooltip enter detected');
        
        // Clear any pending hide timeout
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
            this.hideTimeout = null;
        }
    }

    handleTooltipLeave(tooltip) {
        console.log('TooltipManager: Tooltip leave detected');
        
        // Start delayed hide process
        this.startHideDelay();
    }

    startHideDelay() {
        // Clear existing timeout
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
        }

        // Set new timeout
        this.hideTimeout = setTimeout(() => {
            // Check if any icon is still being hovered
            const anyIconHovered = Array.from(this.hoverState.values()).some(state => state === true);
            
            if (!anyIconHovered) {
                this.hideTooltip();
            }
        }, 100); // Reduced delay for better responsiveness
    }

    handleCategoryLinkEnter(link) {
        console.log('TooltipManager: Category link enter detected');
        
        // Clear any pending hide timeout
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
            this.hideTimeout = null;
        }

        // Set hover state for this link
        this.hoverState.set(link, true);
        
        // Show category tooltip with delay
        this.showCategoryTooltipWithDelay(link);
    }

    handleCategoryLinkLeave(link) {
        console.log('TooltipManager: Category link leave detected');
        
        // Remove hover state for this link
        this.hoverState.set(link, false);
        
        // Clear any pending show timeout
        if (this.showTimeout) {
            clearTimeout(this.showTimeout);
            this.showTimeout = null;
        }
        
        // Start delayed hide process
        this.startHideDelay();
    }

    handleSharedTagEnter(tag) {
        console.log('TooltipManager: Shared tag enter detected');
        
        // Clear any pending hide timeout
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
            this.hideTimeout = null;
        }

        // Set hover state for this tag
        this.hoverState.set(tag, true);
        
        // Show shared tag tooltip with delay
        this.showSharedTagTooltipWithDelay(tag);
    }

    handleSharedTagLeave(tag) {
        console.log('TooltipManager: Shared tag leave detected');
        
        // Remove hover state for this tag
        this.hoverState.set(tag, false);
        
        // Clear any pending show timeout
        if (this.showTimeout) {
            clearTimeout(this.showTimeout);
            this.showTimeout = null;
        }
        
        // Start delayed hide process
        this.startHideDelay();
    }

    /**
     * Show tooltip with 0.5 second delay
     */
    showTooltipWithDelay(element) {
        // Clear any existing show timeout
        if (this.showTimeout) {
            clearTimeout(this.showTimeout);
        }

        // Set timeout for 0.5 seconds before showing
        this.showTimeout = setTimeout(() => {
            this.showTooltip(element);
            this.showTimeout = null;
        }, 500);
    }

    /**
     * Show category tooltip with 0.5 second delay
     */
    showCategoryTooltipWithDelay(element) {
        // Clear any existing show timeout
        if (this.showTimeout) {
            clearTimeout(this.showTimeout);
        }

        // Set timeout for 0.5 seconds before showing
        this.showTimeout = setTimeout(() => {
            this.showCategoryTooltip(element);
            this.showTimeout = null;
        }, 500);
    }

    /**
     * Show shared tag tooltip with 0.2 second delay
     */
    showSharedTagTooltipWithDelay(element) {
        // Clear any existing show timeout
        if (this.showTimeout) {
            clearTimeout(this.showTimeout);
        }

        // Set timeout for 0.2 seconds before showing
        this.showTimeout = setTimeout(() => {
            this.showSharedTagTooltip(element);
            this.showTimeout = null;
        }, 200);
    }

    /**
     * Get tooltip content based on the icon's context
     */
    getTooltipContent(infoIcon) {
        const card = infoIcon.closest('.card');
        if (!card) return null;

        // Determine which section this is
        if (card.classList.contains('keyword-lists')) {
            return {
                text: 'Track keyword rankings and discover new opportunities',
                link: null // No learn more link available
            };
        } else if (card.classList.contains('product-trackers')) {
            return {
                text: 'Monitor competitor products and market trends',
                link: 'https://support.similarweb.com/hc/en-us/articles/25808193170845-Product-Trackers',
                linkText: 'See how to track any product →'
            };
        } else if (card.classList.contains('custom-categories')) {
            return {
                text: 'Create custom product categories for better organization',
                link: 'https://support.similarweb.com/hc/en-us/articles/27765563016733-Custom-Categories',
                linkText: 'Build winning categories →'
            };
        } else if (card.classList.contains('favorite-categories')) {
            return {
                text: 'Save frequently used categories for quick access',
                link: null // No learn more link available
            };
        } else if (card.classList.contains('favorite-brands')) {
            return {
                text: 'Track your most important competitor brands',
                link: null // No learn more link available
            };
        } else if (card.classList.contains('my-products')) {
            return {
                text: 'Connect your Amazon account to import your products',
                link: 'https://support.similarweb.com/hc/en-us/articles/16184273415709-Discover-My-Brand-Analytics',
                linkText: 'Connect your data in 2 minutes →'
            };
        }

        return null;
    }

    /**
     * Show tooltip with fixed positioning
     */
    showTooltip(element) {
        // Hide any existing tooltip
        this.hideTooltip();

        // Get tooltip content
        const content = this.getTooltipContent(element);
        if (!content) return;

        // Create tooltip element
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';

        // Create tooltip content
        const tooltipText = document.createElement('div');
        tooltipText.className = 'tooltip-text';
        tooltipText.textContent = content.text;
        tooltip.appendChild(tooltipText);

        // Add optional link
        if (content.link) {
            const tooltipLink = document.createElement('div');
            tooltipLink.className = 'tooltip-link';
            tooltipLink.textContent = content.linkText || 'Learn more';
            tooltipLink.setAttribute('data-url', content.link);
            tooltipLink.style.cursor = 'pointer';
            tooltip.appendChild(tooltipLink);
        }

        // Add to body for fixed positioning
        document.body.appendChild(tooltip);

        // Bind tooltip events using pointer events
        tooltip.addEventListener('pointerenter', () => {
            this.handleTooltipEnter(tooltip);
        });

        tooltip.addEventListener('pointerleave', () => {
            this.handleTooltipLeave(tooltip);
        });

        // Position tooltip relative to the icon
        this.positionTooltip(tooltip, element);

        // Show tooltip
        setTimeout(() => {
            tooltip.classList.add('show');
        }, 10);

        this.activeTooltip = tooltip;
        console.log('TooltipManager: Showing tooltip with improved hover detection');
    }

    /**
     * Show category tooltip with full path
     */
    showCategoryTooltip(categoryLink) {
        // Hide any existing tooltip
        this.hideTooltip();

        // Get full category path from data attribute
        const fullPath = categoryLink.getAttribute('data-full-path');
        if (!fullPath) return;

        // Create tooltip element
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip category-tooltip';

        // Create tooltip content
        const tooltipText = document.createElement('div');
        tooltipText.className = 'tooltip-text';
        tooltipText.textContent = fullPath;
        tooltip.appendChild(tooltipText);

        // Add to body for fixed positioning
        document.body.appendChild(tooltip);

        // Bind tooltip events using pointer events
        tooltip.addEventListener('pointerenter', () => {
            this.handleTooltipEnter(tooltip);
        });

        tooltip.addEventListener('pointerleave', () => {
            this.handleTooltipLeave(tooltip);
        });

        // Position tooltip relative to the link
        this.positionTooltip(tooltip, categoryLink);

        // Show tooltip
        setTimeout(() => {
            tooltip.classList.add('show');
        }, 10);

        this.activeTooltip = tooltip;
        console.log('TooltipManager: Showing category tooltip for:', fullPath);
    }

    /**
     * Show shared tag tooltip with full path
     */
    showSharedTagTooltip(tag) {
        // Hide any existing tooltip
        this.hideTooltip();

        // Create tooltip element
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip shared-tag-tooltip';

        // Create tooltip content
        const tooltipText = document.createElement('div');
        tooltipText.className = 'tooltip-text';
        tooltipText.textContent = 'All custom categories are shared between all of the users in your account.';
        tooltip.appendChild(tooltipText);

        // Add to body for fixed positioning
        document.body.appendChild(tooltip);

        // Bind tooltip events using pointer events
        tooltip.addEventListener('pointerenter', () => {
            this.handleTooltipEnter(tooltip);
        });

        tooltip.addEventListener('pointerleave', () => {
            this.handleTooltipLeave(tooltip);
        });

        // Position tooltip relative to the tag
        this.positionTooltip(tooltip, tag);

        // Show tooltip
        setTimeout(() => {
            tooltip.classList.add('show');
        }, 10);

        this.activeTooltip = tooltip;
        console.log('TooltipManager: Showing shared tag tooltip');
    }

    /**
     * Position tooltip using fixed positioning
     */
    positionTooltip(tooltip, element) {
        // Get element position and dimensions
        const elementRect = element.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;

        // Force a reflow to get accurate tooltip dimensions
        tooltip.style.visibility = 'hidden';
        tooltip.style.opacity = '1';
        const tooltipRect = tooltip.getBoundingClientRect();
        tooltip.style.visibility = '';
        tooltip.style.opacity = '';

        const tooltipWidth = tooltipRect.width;
        const tooltipHeight = tooltipRect.height;
        const padding = 16;
        const arrowSize = 8;

        // Calculate horizontal position (centered on element)
        let left = elementRect.left + (elementRect.width / 2) - (tooltipWidth / 2);
        
        // Ensure tooltip doesn't go off screen horizontally
        if (left < padding) {
            left = padding;
        } else if (left + tooltipWidth > viewportWidth - padding) {
            left = viewportWidth - tooltipWidth - padding;
        }

        // Calculate vertical position and arrow placement
        let top;
        let isAbove = true;
        const spaceAbove = elementRect.top;
        const spaceBelow = viewportHeight - elementRect.bottom;

        if (spaceAbove >= tooltipHeight + arrowSize + padding) {
            // Position above element
            top = elementRect.top - tooltipHeight - arrowSize;
            isAbove = true;
        } else if (spaceBelow >= tooltipHeight + arrowSize + padding) {
            // Position below element
            top = elementRect.bottom + arrowSize;
            isAbove = false;
        } else {
            // Default to above if both spaces are insufficient
            top = elementRect.top - tooltipHeight - arrowSize;
            isAbove = true;
        }

        // Apply positioning
        tooltip.style.left = left + 'px';
        tooltip.style.top = top + 'px';

        // Calculate arrow position
        const arrowLeft = (elementRect.left + elementRect.width / 2) - left - arrowSize;
        
        // Create dynamic arrow styles
        const arrowStyleId = 'tooltip-arrow-style';
        let arrowStyle = document.getElementById(arrowStyleId);
        
        if (!arrowStyle) {
            arrowStyle = document.createElement('style');
            arrowStyle.id = arrowStyleId;
            document.head.appendChild(arrowStyle);
        }

        if (isAbove) {
            // Arrow points up (tooltip is above element)
            arrowStyle.textContent = `
                .tooltip::after {
                    top: 100%;
                    left: ${arrowLeft}px;
                    border-top: 8px solid #092540;
                    border-bottom: transparent;
                }
            `;
        } else {
            // Arrow points down (tooltip is below element)
            arrowStyle.textContent = `
                .tooltip::after {
                    top: -8px;
                    left: ${arrowLeft}px;
                    border-top: transparent;
                    border-bottom: 8px solid #092540;
                }
            `;
        }

        console.log(`TooltipManager: Positioned tooltip at (${left}, ${top}), arrow at ${arrowLeft}px, ${isAbove ? 'above' : 'below'}`);
    }

    /**
     * Hide tooltip
     */
    hideTooltip() {
        // Clear any pending hide timeout
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
            this.hideTimeout = null;
        }

        // Clear any pending show timeout
        if (this.showTimeout) {
            clearTimeout(this.showTimeout);
            this.showTimeout = null;
        }
        
        if (this.activeTooltip) {
            this.activeTooltip.classList.remove('show');
            setTimeout(() => {
                if (this.activeTooltip && this.activeTooltip.parentElement) {
                    this.activeTooltip.parentElement.removeChild(this.activeTooltip);
                }
                this.activeTooltip = null;
            }, 200);
            console.log('TooltipManager: Hiding tooltip');
        }
    }

    /**
     * Hide all tooltips
     */
    hideAllTooltips() {
        this.hideTooltip();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.tooltipManager = new TooltipManager();
}); 

// Export for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TooltipManager;
} 