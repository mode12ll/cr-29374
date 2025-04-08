/**
 * AutoMarket - Car Detail Page Functionality
 * Handles gallery, contact forms, and other car detail page interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    // Image gallery functionality
    const mainImage = document.getElementById('main-car-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Update main image
            mainImage.src = this.dataset.img;
            
            // Update active state
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Show phone number button
    const showPhoneButton = document.querySelector('.car-actions .btn-primary');
    if (showPhoneButton) {
        showPhoneButton.addEventListener('click', function() {
            // Show the contact modal
            const modal = document.getElementById('contact-modal');
            modal.classList.add('show');
        });
    }

    // Email seller button
    const emailButton = document.querySelector('.car-actions .btn-outline:first-of-type');
    if (emailButton) {
        emailButton.addEventListener('click', function() {
            // Scroll to contact form
            const contactForm = document.querySelector('.contact-form');
            contactForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Focus on the first input
            setTimeout(() => {
                contactForm.querySelector('input').focus();
            }, 800);
        });
    }

    // Compare button
    const compareButton = document.querySelector('.btn-compare');
    if (compareButton) {
        compareButton.addEventListener('click', function() {
            // Get car ID and details
            const carId = document.querySelector('.favorite-btn').dataset.carId;
            const carTitle = document.querySelector('.car-header h1').textContent;
            const carPrice = document.querySelector('.car-header .price').textContent;
            const carImage = document.getElementById('main-car-image').src;
            
            // Add to compare list in local storage
            addToCompare(carId, carTitle, carPrice, carImage);
            
            // Show notification
            showNotification('Car added to compare list', 'success');
            
            // Update UI
            this.innerHTML = '<i class="fas fa-check"></i> Added to Compare';
            this.disabled = true;
            
            // Reset after 3 seconds
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-exchange-alt"></i> Add to Compare';
                this.disabled = false;
            }, 3000);
        });
    }

    // Close modal functionality
    const closeModalButtons = document.querySelectorAll('.close-modal');
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.classList.remove('show');
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.classList.remove('show');
        }
    });

    // Contact form validation and submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Check validation (this uses the main.js validation)
            const requiredFields = contactForm.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                }
            });
            
            if (isValid) {
                // Simulate form submission
                const submitButton = contactForm.querySelector('button[type="submit"]');
                submitButton.disabled = true;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                
                // In a real application, you would send an AJAX request to the server
                // This is just a simulation
                setTimeout(() => {
                    // Show success message
                    showNotification('Message sent successfully! The seller will contact you soon.', 'success');
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Reset button
                    submitButton.disabled = false;
                    submitButton.innerHTML = 'Send Message';
                }, 1500);
            }
        });
    }

    // Function to add car to compare list
    function addToCompare(carId, title, price, image) {
        let compareList = JSON.parse(localStorage.getItem('compareList')) || [];
        
        // Check if car is already in the list
        if (!compareList.some(car => car.id === carId)) {
            // Add to compare list (limit to 3 cars)
            if (compareList.length >= 3) {
                compareList.shift(); // Remove the oldest car
            }
            
            compareList.push({
                id: carId,
                title: title,
                price: price,
                image: image
            });
            
            localStorage.setItem('compareList', JSON.stringify(compareList));
        }
    }

    // Initialize image gallery zooming (if library is available)
    if (typeof Drift === 'function') {
        new Drift(mainImage, {
            paneContainer: document.querySelector('.main-image'),
            inlinePane: false,
            zoomFactor: 3,
            hoverBoundingBox: true,
            boundingBoxColor: 'rgba(0, 86, 179, 0.2)'
        });
    }

    // Check if this car is in favorites and update UI
    function checkIfFavorite() {
        const favoriteBtn = document.querySelector('.favorite-btn');
        if (!favoriteBtn) return;
        
        const carId = favoriteBtn.dataset.carId;
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        
        if (favorites.includes(carId)) {
            favoriteBtn.classList.add('active');
            const icon = favoriteBtn.querySelector('i');
            icon.classList.remove('far');
            icon.classList.add('fas');
        }
    }
    
    // Check if this car is in compare list and update UI
    function checkIfInCompare() {
        const compareBtn = document.querySelector('.btn-compare');
        if (!compareBtn) return;
        
        const carId = document.querySelector('.favorite-btn').dataset.carId;
        const compareList = JSON.parse(localStorage.getItem('compareList')) || [];
        
        if (compareList.some(car => car.id === carId)) {
            compareBtn.innerHTML = '<i class="fas fa-check"></i> In Compare List';
        }
    }
    
    // Check initial states
    checkIfFavorite();
    checkIfInCompare();
});
