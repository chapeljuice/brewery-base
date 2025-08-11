// Google Sheets Configuration
// Uses local config if available, otherwise falls back to demo mode
const GOOGLE_SHEETS_ID = window.LOCAL_CONFIG ? window.LOCAL_CONFIG.GOOGLE_SHEETS_ID : 'unknown';
const GOOGLE_API_KEY = window.LOCAL_CONFIG ? window.LOCAL_CONFIG.GOOGLE_API_KEY : 'unknown';

// Demo data for when Google Sheets is not configured
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
    setupParallaxScrolling();
});

// Load beers from Google Sheets or use demo data
async function loadBeers() {
    showLoading();
    
    try {
        let beers;
        
        // Check if Google Sheets is configured
        if (GOOGLE_SHEETS_ID !== 'unknown' && GOOGLE_API_KEY !== 'unknown') {
            try {
                beers = await loadFromGoogleSheets();
            } catch (sheetsError) {
                console.warn('Google Sheets unavailable, falling back to demo data:', sheetsError);
                beers = DEMO_BEERS;
            }
        } else {
            // Use demo data
            beers = DEMO_BEERS;
            // Simulate loading delay for demo
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
        displayBeers(beers);
        hideLoading();
        
    } catch (error) {
        console.error('Error loading beers:', error);
        // Always fall back to demo data if everything else fails
        displayBeers(DEMO_BEERS);
        hideLoading();
    }
}

// Load data from Google Sheets
async function loadFromGoogleSheets() {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEETS_ID}/values/Sheet1!A:F?key=${GOOGLE_API_KEY}`;
    
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch from Google Sheets');
    }
    
    const data = await response.json();
    const rows = data.values;
    
    // Skip header row and parse data
    const beers = rows.slice(1).map(row => ({
        name: row[0] || '',
        type: row[1] || '',
        abv: row[2] || '',
        rating: row[3] || '',
        status: row[4] || 'available',
        description: row[5] || ''
    }));
    
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
    if (GOOGLE_SHEETS_ID === 'unknown' || GOOGLE_API_KEY === 'unknown') {
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
                <span class="detail-label">Untappd Rating</span>
                <span class="detail-value">${beer.rating}</span>
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

// Setup parallax scrolling for hero logo
function setupParallaxScrolling() {
    const heroLogo = document.querySelector('.hero-logo');
    
    if (!heroLogo) return;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 2; // Logo moves twice as fast as scroll
        
        // Only apply parallax when logo is visible (within viewport)
        if (scrolled < window.innerHeight) {
            const yPos = scrolled * parallaxSpeed;
            heroLogo.style.transform = `translate(-50%, calc(-50% - ${yPos}px))`;
        }
    }
    
    // Use requestAnimationFrame for smooth performance
    let ticking = false;
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', function() {
        requestTick();
        ticking = false;
    });
}

// Auto-refresh beer data every 5 minutes (only if Google Sheets is properly configured)
setInterval(() => {
    if (GOOGLE_SHEETS_ID !== 'unknown' && GOOGLE_API_KEY !== 'unknown') {
        loadBeers();
    }
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

// Initialize Google Map
function initMap() {
    // Formula Brewing location in Issaquah, WA
    const formulaBrewing = { lat: 47.5301, lng: -122.0326 };
    
    // Create map
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: formulaBrewing,
        styles: [
            // Custom map styling for a more branded look
            {
                "featureType": "all",
                "elementType": "geometry.fill",
                "stylers": [{ "weight": "2.00" }]
            },
            {
                "featureType": "all",
                "elementType": "geometry.stroke",
                "stylers": [{ "color": "#9c9c9c" }]
            },
            {
                "featureType": "all",
                "elementType": "labels.text",
                "stylers": [{ "visibility": "on" }]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [{ "color": "#f2f2f2" }]
            },
            {
                "featureType": "landscape.man_made",
                "elementType": "geometry.fill",
                "stylers": [{ "color": "#ffffff" }]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [{ "visibility": "off" }]
            },
            {
                "featureType": "road",
                "elementType": "all",
                "stylers": [{ "saturation": -100 }, { "lightness": 45 }]
            },
            {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [{ "visibility": "simplified" }]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.icon",
                "stylers": [{ "visibility": "off" }]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [{ "visibility": "off" }]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [{ "color": "#d4af37" }, { "visibility": "on" }]
            }
        ]
    });
    
    // Create custom marker
    const marker = new google.maps.Marker({
        position: formulaBrewing,
        map: map,
        title: "Formula Brewing",
        animation: google.maps.Animation.DROP
    });
    
    // Create info window
    const infoWindow = new google.maps.InfoWindow({
        content: `
            <div style="padding: 10px; font-family: 'Inter', sans-serif;">
                <h3 style="margin: 0 0 8px 0; color: #d4af37; font-size: 18px;">Formula Brewing</h3>
                <p style="margin: 0 0 8px 0; color: #666; font-size: 14px;">
                    Craft Brewery in Issaquah, WA
                </p>
                <p style="margin: 0; color: #999; font-size: 12px;">
                    📍 Issaquah, Washington
                </p>
            </div>
        `
    });
    
    // Show info window on marker click
    marker.addListener("click", () => {
        infoWindow.open(map, marker);
    });
    
    // Optional: Open info window by default
    infoWindow.open(map, marker);
}

// Fallback if Google Maps fails to load
function initMapFallback() {
    const mapElement = document.getElementById('map');
    if (mapElement) {
        mapElement.innerHTML = `
            <div class="map-placeholder">
                <div style="text-align: center; padding: 20px;">
                    <h4 style="color: #d4af37; margin-bottom: 10px;">Formula Brewing</h4>
                    <p style="margin-bottom: 10px;">Issaquah, Washington</p>
                    <a href="https://maps.google.com/?q=Formula+Brewing+Issaquah+WA" 
                       target="_blank" 
                       style="color: #d4af37; text-decoration: none; font-weight: 600;">
                        📍 Open in Google Maps
                    </a>
                </div>
            </div>
        `;
    }
}

// Check if Google Maps loaded, otherwise show fallback
setTimeout(() => {
    if (typeof google === 'undefined') {
        initMapFallback();
    }
}, 3000);

// Export functions for global access
window.loadBeers = loadBeers;
window.initMap = initMap; 