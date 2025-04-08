/**
 * AutoMarket - Main JavaScript
 * Handles global functionality for the entire site
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips if any
    initTooltips();
    
    // Handle responsive navigation
    handleMobileNavigation();
    
    // Check if directories exist for images, if not provide fallbacks
    checkImageDirectories();

    // Add global notification system
    initNotificationSystem();
});

/**
 * Initialize tooltip functionality
 */
function initTooltips() {
    const tooltips = document.querySelectorAll('[data-tooltip]');
    
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseenter', function() {
            const text = this.getAttribute('data-tooltip');
            
            if (!text) return;
            
            const tooltipEl = document.createElement('div');
            tooltipEl.className = 'tooltip';
            tooltipEl.textContent = text;
            
            document.body.appendChild(tooltipEl);
            
            const rect = this.getBoundingClientRect();
            const tooltipRect = tooltipEl.getBoundingClientRect();
            
            tooltipEl.style.top = `${rect.top - tooltipRect.height - 10 + window.scrollY}px`;
            tooltipEl.style.left = `${rect.left + (rect.width / 2) - (tooltipRect.width / 2)}px`;
            
            this.addEventListener('mouseleave', function onMouseLeave() {
                document.body.removeChild(tooltipEl);
                this.removeEventListener('mouseleave', onMouseLeave);
            });
        });
    });
}

/**
 * Handle mobile navigation
 */
function handleMobileNavigation() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const menu = document.querySelector('.menu');
    
    if (mobileMenuToggle && menu) {
        mobileMenuToggle.addEventListener('click', function() {
            menu.classList.toggle('active');
            this.setAttribute('aria-expanded', 
                this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
            );
        });
    }
    
    // Handle dropdown toggle on mobile
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth < 768) {
                e.preventDefault();
                const parentDropdown = this.closest('.dropdown');
                
                // Close other open dropdowns
                document.querySelectorAll('.dropdown.active').forEach(dropdown => {
                    if (dropdown !== parentDropdown) {
                        dropdown.classList.remove('active');
                    }
                });
                
                parentDropdown.classList.toggle('active');
                this.setAttribute('aria-expanded', 
                    this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
                );
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!menu || !menu.classList.contains('active')) return;
        
        if (!menu.contains(e.target) && e.target !== mobileMenuToggle) {
            menu.classList.remove('active');
            if (mobileMenuToggle) {
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            }
        }
    });
}

/**
 * Check if image directories exist, create fallbacks if needed
 */
function checkImageDirectories() {
    // Create an array of image paths to check
    const criticalImages = [
        './images/logos/placeholder.svg',
        './images/fallbacks/car-placeholder.jpg',
        './images/fallbacks/image-placeholder.jpg'
    ];
    
    // Pre-load critical fallback images
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
    
    // Check if we need to create directories (if running server-side)
    if (typeof window === 'undefined' && typeof require === 'function') {
        const fs = require('fs');
        const path = require('path');
        
        const directories = [
            './images',
            './images/logos',
            './images/fallbacks'
        ];
        
        directories.forEach(dir => {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
                console.log(`Created directory: ${dir}`);
            }
        });
    }
}

/**
 * Initialize notification system
 */
function initNotificationSystem() {
    // Create notification container if it doesn't exist
    let notificationContainer = document.querySelector('.notification-container');
    
    if (!notificationContainer) {
        notificationContainer = document.createElement('div');
        notificationContainer.className = 'notification-container';
        document.body.appendChild(notificationContainer);
    }
    
    // Expose notification functions globally
    window.showNotification = function(message, type = 'info', duration = 5000) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        const content = document.createElement('div');
        content.className = 'notification-content';
        
        const messageSpan = document.createElement('span');
        messageSpan.textContent = message;
        
        const closeBtn = document.createElement('button');
        closeBtn.className = 'notification-close';
        closeBtn.innerHTML = '&times;';
        closeBtn.setAttribute('aria-label', 'Close notification');
        
        content.appendChild(messageSpan);
        content.appendChild(closeBtn);
        notification.appendChild(content);
        
        // Add to container
        notificationContainer.appendChild(notification);
        
        // Show with animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Setup close button
        closeBtn.addEventListener('click', () => {
            closeNotification(notification);
        });
        
        // Auto close after duration
        if (duration > 0) {
            setTimeout(() => {
                closeNotification(notification);
            }, duration);
        }
        
        // Close function
        function closeNotification(notificationEl) {
            notificationEl.classList.remove('show');
            
            // Remove from DOM after animation
            setTimeout(() => {
                if (notificationEl.parentNode) {
                    notificationEl.parentNode.removeChild(notificationEl);
                }
            }, 300);
        }
    };
}
