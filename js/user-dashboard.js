/**
 * AutoMarket - User Dashboard
 * Handles user dashboard functionality and navigation
 */

document.addEventListener('DOMContentLoaded', function() {
    // Dashboard navigation
    const navLinks = document.querySelectorAll('.dashboard-nav a');
    const dashboardSections = document.querySelectorAll('.dashboard-section');
    
    if (navLinks) {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get section ID from href
                const targetId = this.getAttribute('href').substring(1) + '-section';
                
                // Hide all sections
                dashboardSections.forEach(section => {
                    section.classList.remove('active');
                });
                
                // Show the target section
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.classList.add('active');
                }
                
                // Update active nav link
                navLinks.forEach(navLink => {
                    navLink.parentElement.classList.remove('active');
                });
                
                this.parentElement.classList.add('active');
                
                // Update URL hash for direct linking
                window.location.hash = this.getAttribute('href');
            });
        });
    }
    
    // Handle URL hash for direct linking
    function handleHashChange() {
        const hash = window.location.hash;
        
        if (hash) {
            // Find the corresponding nav link
            const targetLink = document.querySelector(`.dashboard-nav a[href="${hash}"]`);
            
            if (targetLink) {
                // Simulate click
                targetLink.click();
            }
        }
    }
    
    // Check hash on page load
    handleHashChange();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    // Overview cards - handle view all links
    const cardLinks = document.querySelectorAll('.card-link');
    
    if (cardLinks) {
        cardLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get target section from href
                const targetId = this.getAttribute('href');
                
                // Find and click the corresponding nav link
                const navLink = document.querySelector(`.dashboard-nav a[href="${targetId}"]`);
                
                if (navLink) {
                    navLink.click();
                }
            });
        });
    }
    
    // Handle favorite buttons
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    
    if (favoriteButtons) {
        favoriteButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Toggle favorite status
                const icon = this.querySelector('i');
                
                if (icon.classList.contains('far')) {
                    // Add to favorites
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                    showNotification('Car added to favorites', 'success');
                } else {
                    // Remove from favorites
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                    showNotification('Car removed from favorites', 'info');
                }
            });
        });
    }
    
    // Handle compare buttons
    const compareButtons = document.querySelectorAll('.btn-compare');
    
    if (compareButtons) {
        compareButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const carCard = this.closest('.car-card');
                const carTitle = carCard.querySelector('h3').textContent;
                
                showNotification(`${carTitle} added to compare list`, 'success');
            });
        });
    }
    
    // My Listings - handle listing actions
    const listingActions = document.querySelectorAll('.listing-actions .btn');
    
    if (listingActions) {
        listingActions.forEach(button => {
            button.addEventListener('click', function() {
                const action = this.textContent.trim();
                const listingCard = this.closest('.listing-card');
                const listingTitle = listingCard.querySelector('h3').textContent;
                
                switch (action) {
                    case 'Edit':
                        showNotification(`Editing ${listingTitle}`, 'info');
                        // In a real app, this would navigate to the edit page
                        break;
                    case 'View Stats':
                        showNotification(`Viewing statistics for ${listingTitle}`, 'info');
                        // In a real app, this would show a stats modal or page
                        break;
                    case 'Promote':
                        showNotification(`Showing promotion options for ${listingTitle}`, 'info');
                        // In a real app, this would show a promotion modal
                        break;
                    case 'Delete':
                        if (confirm(`Are you sure you want to delete ${listingTitle}?`)) {
                            // Animate removal
                            listingCard.style.opacity = 0;
                            listingCard.style.transform = 'translateX(-100%)';
                            setTimeout(() => {
                                listingCard.remove();
                                
                                // If this was the last listing, show an empty state
                                const remainingListings = document.querySelectorAll('.listing-card');
                                if (remainingListings.length === 0) {
                                    const listingsContainer = document.querySelector('.listings-container');
                                    listingsContainer.innerHTML = `
                                        <div class="empty-state">
                                            <i class="fas fa-car"></i>
                                            <h3>No Listings Yet</h3>
                                            <p>You don't have any active listings. Ready to sell your car?</p>
                                            <a href="sell.html" class="btn btn-primary">Create a Listing</a>
                                        </div>
                                    `;
                                }
                                
                                showNotification(`${listingTitle} has been deleted`, 'success');
                            }, 300);
                        }
                        break;
                }
            });
        });
    }
    
    // Activity list - handle activity actions
    const activityActions = document.querySelectorAll('.activity-action');
    
    if (activityActions) {
        activityActions.forEach(action => {
            action.addEventListener('click', function(e) {
                e.preventDefault();
                
                const activityText = this.closest('.activity-item').querySelector('.activity-details p').textContent;
                const actionText = this.textContent.trim();
                
                showNotification(`${actionText}: ${activityText}`, 'info');
                
                // In a real app, this would navigate to the appropriate page
            });
        });
    }
    
    // Function to show notification
    function showNotification(message, type = 'success') {
        // Check if we have the main.js notification function
        if (typeof window.showNotification === 'function') {
            window.showNotification(message, type);
            return;
        }
        
        // Fallback notification implementation
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Auto remove notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            
            // Remove from DOM after animation
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
        
        // Close button
        const closeButton = notification.querySelector('.notification-close');
        closeButton.addEventListener('click', function() {
            notification.classList.remove('show');
            
            // Remove from DOM after animation
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
    }
});
