// Country Dropdown Functionality

// Simple function-based approach for reliability
function initCountryDropdown() {
    const dropdown = document.getElementById('countryDropdown');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const selectedCountry = document.getElementById('selectedCountry');
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    
    if (!dropdown || !dropdownMenu || !selectedCountry) {
        console.error('Required dropdown elements not found');
        return;
    }
    
    // Toggle dropdown
    dropdown.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownMenu.classList.toggle('show');
        dropdown.classList.toggle('open');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
        dropdownMenu.classList.remove('show');
        dropdown.classList.remove('open');
    });
    
    // Handle dropdown item selection
    dropdownItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            
            const country = item.getAttribute('data-country');
            const flagData = item.getAttribute('data-flag');
            
            // Update country text
            selectedCountry.textContent = country;
            
            // Update flag
            updateFlag(flagData);
            
            // Close dropdown
            dropdownMenu.classList.remove('show');
            dropdown.classList.remove('open');
            
            // Save to localStorage
            localStorage.setItem('selectedCountry', country);
            localStorage.setItem('selectedFlag', flagData);
            
            // Dispatch event
            document.dispatchEvent(new CustomEvent('countryChanged', {
                detail: { country, flagData }
            }));
        });
    });
    
    // Load saved selection
    loadSavedSelection();
}

function updateFlag(flagData) {
    const flagContainer = document.querySelector('.flag-icon');
    
    if (!flagContainer) {
        console.error('Flag container not found');
        return;
    }
    
    if (flagData && (flagData.startsWith('http') || flagData.startsWith('icons/'))) {
        // SVG flag (both localhost and local paths)
        flagContainer.innerHTML = `<img id="selectedFlag" src="${flagData}" alt="Country flag" />`;
    } else if (flagData) {
        // Emoji flag
        flagContainer.innerHTML = `<span id="selectedFlag" style="font-size: 16px; width: 16px; height: 16px; display: flex; align-items: center; justify-content: center;">${flagData}</span>`;
    }
}

function loadSavedSelection() {
    const savedCountry = localStorage.getItem('selectedCountry');
    const savedFlag = localStorage.getItem('selectedFlag');
    
    if (savedCountry) {
        const selectedCountry = document.getElementById('selectedCountry');
        if (selectedCountry) {
            selectedCountry.textContent = savedCountry;
        }
    }
    
    if (savedFlag) {
        updateFlag(savedFlag);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initCountryDropdown); 