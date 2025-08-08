// Secure client-side script - uses server API instead of direct Google Sheets access

// Demo data for when server is not available
const DEMO_BEERS = [
    {
        name: "Formula IPA",
        type: "India Pale Ale",
        abv: "6.5%",
        ibu: "65",
        status: "available",
        description: "A bold, hop-forward IPA with citrus and pine notes. Our flagship beer that showcases our brewing expertise."
    },
    {
        name: "Golden Lager",
        type: "Czech Pilsner",
        abv: "4.8%",
        ibu: "35",
        status: "available",
        description: "A crisp, clean lager with subtle hop character and a smooth finish. Perfect for any occasion."
    },
    {
        name: "Stout Porter",
        type: "Dark Ale",
        abv: "5.2%",
        ibu: "28",
        status: "limited",
        description: "Rich and roasty with notes of coffee and chocolate. A smooth, full-bodied dark ale."
    },
    {
        name: "Wheat Hefeweizen",
        type: "German Wheat",
        abv: "5.0%",
        ibu: "15",
        status: "out",
        description: "A traditional German-style wheat beer with banana and clove notes. Light and refreshing."
    },
    {
        name: "Amber Ale",
        type: "American Amber",
        abv: "5.5%",
        ibu: "40",
        status: "available",
        description: "Balanced malt and hop character with caramel notes. A crowd-pleasing amber ale."
    },
    {
        name: "Saison Farmhouse",
        type: "Belgian Saison",
        abv: "6.8%",
        ibu: "25",
        status: "available",
        description: "A complex farmhouse ale with fruity esters and spicy phenols. Perfect for food pairing."
    }
];

// DOM elements
const loadingElement = document.getElementById('loading');
const beersGridElement = document.getElementById('beers-grid');
const errorElement = document.getElementById('error');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    loadBeers();
    setupSmoothScrolling();
});

// Load beers from server API or use demo data
async function loadBeers() {
    showLoading();
    
    try {
        const beers = await loadFromServer();
        displayBeers(beers);
        hideLoading();
        
    } catch (error) {
        console.warn('Server unavailable, using demo data:', error);
        displayBeers(DEMO_BEERS);
        hideLoading();
    }
}

// Load data from server API
async function loadFromServer() {
    const response = await fetch('/api/beers');
    
    if (!response.ok) {
        throw new Error('Failed to fetch from server');
    }
    
    const beers = await response.json();
    
    if (!beers || beers.length === 0) {
        throw new Error('No beer data available');
    }
    
    return beers;
}

// Display beers in the grid
function displayBeers(beers) {
    beersGridElement.innerHTML = '';
    
    beers.forEach(beer => {
        const beerCard = createBeerCard(beer);
        beersGridElement.appendChild(beerCard);
    });
    
    // Show demo notice if using demo data
    const demoNotice = document.getElementById('demo-notice');
    if (beers === DEMO_BEERS) {
        demoNotice.classList.remove('hidden');
    } else {
        demoNotice.classList.add('hidden');
    }
}

// Create a beer card element
function createBeerCard(beer) {
    const card = document.createElement('div');
    card.className = 'beer-card';
    
    const statusClass = `status-${beer.status}`;
    const statusText = beer.status.charAt(0).toUpperCase() + beer.status.slice(1);
    
    card.innerHTML = `
        <div class="beer-header">
            <div>
                <div class="beer-name">${beer.name}</div>
                <div class="beer-type">${beer.type}</div>
            </div>
            <span class="beer-status ${statusClass}">${statusText}</span>
        </div>
        
        <div class="beer-details">
            <div class="beer-detail">
                <span class="detail-label">ABV</span>
                <span class="detail-value">${beer.abv}</span>
            </div>
            <div class="beer-detail">
                <span class="detail-label">IBU</span>
                <span class="detail-value">${beer.ibu}</span>
            </div>
        </div>
        
        <div class="beer-description">${beer.description}</div>
    `;
    
    return card;
}

// Show loading state
function showLoading() {
    loadingElement.classList.remove('hidden');
    beersGridElement.innerHTML = '';
    errorElement.classList.add('hidden');
}

// Hide loading state
function hideLoading() {
    loadingElement.classList.add('hidden');
}

// Show error state
function showError() {
    loadingElement.classList.add('hidden');
    beersGridElement.innerHTML = '';
    errorElement.classList.remove('hidden');
}

// Setup smooth scrolling for navigation links
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Auto-refresh beer data every 5 minutes
setInterval(() => {
    loadBeers();
}, 5 * 60 * 1000);

// Add some interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to beer cards
    const beerCards = document.querySelectorAll('.beer-card');
    beerCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add scroll-based navbar background
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });
});

// Export functions for global access
window.loadBeers = loadBeers; 