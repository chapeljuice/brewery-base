// Admin Panel JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeAdminPanel();
});

// Initialize the admin panel
function initializeAdminPanel() {
    // Set up Google Sheets link
    setupGoogleSheetsLink();
    
    // Load current content from the main website
    loadCurrentContent();
    
    // Set up form event listeners
    setupFormListeners();
}

// Set up Google Sheets link
function setupGoogleSheetsLink() {
    const sheetLink = document.getElementById('beer-sheet-link');
    const sheetId = getGoogleSheetsId();
    
    if (sheetId && sheetId !== 'unknown') {
        sheetLink.href = `https://docs.google.com/spreadsheets/d/${sheetId}/edit`;
        sheetLink.textContent = '📊 Open Beer Data Sheet';
    } else {
        sheetLink.href = '#';
        sheetLink.textContent = '📊 Set up Google Sheets first';
        sheetLink.style.opacity = '0.6';
        sheetLink.onclick = function(e) {
            e.preventDefault();
            alert('Please set up Google Sheets integration first. Check the DEPLOYMENT.md file for instructions.');
        };
    }
}

// Get Google Sheets ID from main script
function getGoogleSheetsId() {
    // This would normally read from the main script.js file
    // For demo purposes, we'll use a placeholder
    return 'unknown';
}

// Copy Sheet ID to clipboard
function copySheetId() {
    const sheetId = getGoogleSheetsId();
    if (sheetId && sheetId !== 'unknown') {
        navigator.clipboard.writeText(sheetId).then(function() {
            showNotification('Sheet ID copied to clipboard!', 'success');
        }).catch(function() {
            showNotification('Failed to copy. Please copy manually: ' + sheetId, 'error');
        });
    } else {
        showNotification('Please set up Google Sheets first', 'warning');
    }
}

// Tab switching functionality
function showTab(tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Remove active class from all tab buttons
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    // Show selected tab content
    const selectedTab = document.getElementById(tabName + '-tab');
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // Add active class to clicked button
    const clickedButton = event.target;
    clickedButton.classList.add('active');
}

// Load current content from the main website
function loadCurrentContent() {
    // This would normally fetch content from the main website
    // For demo purposes, we'll use default values
    console.log('Loading current content...');
}

// Set up form event listeners
function setupFormListeners() {
    // Auto-save functionality
    const formInputs = document.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('change', function() {
            showNotification('Content updated!', 'info');
        });
    });
}

// Preview changes
function previewChanges() {
    const content = collectFormData();
    
    // Create a preview window
    const previewWindow = window.open('', '_blank');
    previewWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Preview - Formula Brewing</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                .preview-section { margin: 20px 0; padding: 15px; border: 1px solid #ddd; border-radius: 8px; }
                .preview-title { color: #d4af37; font-weight: bold; margin-bottom: 10px; }
            </style>
        </head>
        <body>
            <h1>Content Preview</h1>
            
            <div class="preview-section">
                <div class="preview-title">Hero Section</div>
                <p><strong>Title:</strong> ${content.heroTitle}</p>
                <p><strong>Subtitle:</strong> ${content.heroSubtitle}</p>
                <p><strong>Button:</strong> ${content.heroButton}</p>
            </div>
            
            <div class="preview-section">
                <div class="preview-title">About Section</div>
                <p><strong>Title:</strong> ${content.aboutTitle}</p>
                <p><strong>Text:</strong> ${content.aboutText}</p>
                <p><strong>Stats:</strong> ${content.stat1Number} ${content.stat1Label}, ${content.stat2Number} ${content.stat2Label}, ${content.stat3Number} ${content.stat3Label}</p>
            </div>
            
            <div class="preview-section">
                <div class="preview-title">Contact Information</div>
                <p><strong>Name:</strong> ${content.contactName}</p>
                <p><strong>Address:</strong> ${content.contactAddress}</p>
                <p><strong>Phone:</strong> ${content.contactPhone}</p>
                <p><strong>Email:</strong> ${content.contactEmail}</p>
                <p><strong>Hours:</strong> ${content.contactHours}</p>
            </div>
            
            <p><em>This is a preview. Changes will be applied to the main website when you save.</em></p>
        </body>
        </html>
    `);
    previewWindow.document.close();
}

// Collect form data
function collectFormData() {
    return {
        // Hero section
        heroTitle: document.getElementById('hero-title').value,
        heroSubtitle: document.getElementById('hero-subtitle').value,
        heroButton: document.getElementById('hero-button').value,
        
        // About section
        aboutTitle: document.getElementById('about-title').value,
        aboutText: document.getElementById('about-text').value,
        stat1Number: document.getElementById('stat1-number').value,
        stat1Label: document.getElementById('stat1-label').value,
        stat2Number: document.getElementById('stat2-number').value,
        stat2Label: document.getElementById('stat2-label').value,
        stat3Number: document.getElementById('stat3-number').value,
        stat3Label: document.getElementById('stat3-label').value,
        
        // Contact section
        contactName: document.getElementById('contact-name').value,
        contactAddress: document.getElementById('contact-address').value,
        contactPhone: document.getElementById('contact-phone').value,
        contactEmail: document.getElementById('contact-email').value,
        contactHours: document.getElementById('contact-hours').value
    };
}

// Save content to Google Sheets
function saveToGoogleSheets() {
    const content = collectFormData();
    
    // This would normally save to a Google Sheet
    // For demo purposes, we'll show a notification
    showNotification('Content saved to Google Sheets!', 'success');
    
    // In a real implementation, this would:
    // 1. Create a Google Sheet for website content
    // 2. Save the form data to that sheet
    // 3. Update the main website to read from that sheet
    console.log('Saving content:', content);
}

// Export content
function exportContent() {
    const content = collectFormData();
    const contentJson = JSON.stringify(content, null, 2);
    
    // Create download link
    const blob = new Blob([contentJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formula-brewing-content.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('Content exported successfully!', 'success');
}

// Reset to defaults
function resetToDefaults() {
    if (confirm('Are you sure you want to reset all content to default values? This cannot be undone.')) {
        // Reset form fields to default values
        document.getElementById('hero-title').value = 'Formula Brewing';
        document.getElementById('hero-subtitle').value = 'Crafting exceptional beers with precision and passion';
        document.getElementById('hero-button').value = 'Explore Our Beers';
        
        document.getElementById('about-title').value = 'About Formula Brewing';
        document.getElementById('about-text').value = 'At Formula Brewing, we combine scientific precision with artistic creativity to craft beers that push boundaries and delight palates. Our state-of-the-art facility and passionate team work together to create unique, high-quality brews that reflect our commitment to excellence.';
        
        document.getElementById('stat1-number').value = '15+';
        document.getElementById('stat1-label').value = 'Beer Varieties';
        document.getElementById('stat2-number').value = '24/7';
        document.getElementById('stat2-label').value = 'Fresh Updates';
        document.getElementById('stat3-number').value = '100%';
        document.getElementById('stat3-label').value = 'Craft Quality';
        
        document.getElementById('contact-name').value = 'Formula Brewing';
        document.getElementById('contact-address').value = '[Your Address Here]';
        document.getElementById('contact-phone').value = '[Your Phone]';
        document.getElementById('contact-email').value = 'info@formulabrewing.com';
        document.getElementById('contact-hours').value = 'Mon-Sun: 11AM-10PM';
        
        showNotification('Content reset to defaults!', 'success');
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
    `;
    
    // Set background color based on type
    switch(type) {
        case 'success':
            notification.style.background = '#28a745';
            break;
        case 'error':
            notification.style.background = '#dc3545';
            break;
        case 'warning':
            notification.style.background = '#ffc107';
            notification.style.color = '#333';
            break;
        default:
            notification.style.background = '#17a2b8';
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Export functions for global access
window.showTab = showTab;
window.copySheetId = copySheetId;
window.previewChanges = previewChanges;
window.saveToGoogleSheets = saveToGoogleSheets;
window.exportContent = exportContent;
window.resetToDefaults = resetToDefaults; 