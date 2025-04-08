/**
 * AutoMarket - Home Page Script
 * Handles image loading and testimonial functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize testimonials carousel
    initializeTestimonialsCarousel();
    
    // Initialize mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const menu = document.querySelector('.menu');
    
    if (mobileMenuToggle && menu) {
        mobileMenuToggle.addEventListener('click', function() {
            menu.classList.toggle('active');
        });
    }
    
    // Initialize dropdown toggle on mobile
    const dropdownToggle = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggle.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth < 768) {
                e.preventDefault();
                this.parentElement.classList.toggle('active');
            }
        });
    });
    
    // Pre-load car images to avoid layout shifts
    document.querySelectorAll('.car-image img').forEach(img => {
        if (!img.complete) {
            // Add a loading class to parent
            img.parentElement.classList.add('loading');
            
            img.addEventListener('load', function() {
                // Remove loading class and add loaded class when image loads
                this.parentElement.classList.remove('loading');
                this.parentElement.classList.add('loaded');
            });
            
            img.addEventListener('error', function() {
                // If image fails to load, add error class for styling
                this.parentElement.classList.remove('loading');
                this.parentElement.classList.add('error');
            });
        } else {
            // If image is already loaded from cache
            img.parentElement.classList.add('loaded');
        }
    });
});

// Initialize testimonials carousel
function initializeTestimonialsCarousel() {
    const testimonials = document.querySelectorAll('.testimonial');
    const prevButton = document.querySelector('.prev-testimonial');
    const nextButton = document.querySelector('.next-testimonial');
    
    if (!testimonials.length || !prevButton || !nextButton) return;
    
    let currentIndex = 0;
    
    // Show first testimonial (already handled in HTML with active class)
    
    // Previous button click
    prevButton.addEventListener('click', () => {
        showTestimonial((currentIndex - 1 + testimonials.length) % testimonials.length);
    });
    
    // Next button click
    nextButton.addEventListener('click', () => {
        showTestimonial((currentIndex + 1) % testimonials.length);
    });
    
    // Function to show a specific testimonial
    function showTestimonial(index) {
        testimonials[currentIndex].classList.remove('active');
        testimonials[index].classList.add('active');
        currentIndex = index;
    }
    
    // Auto-rotate testimonials every 8 seconds
    let autoRotate = setInterval(() => {
        showTestimonial((currentIndex + 1) % testimonials.length);
    }, 8000);
    
    // Stop auto-rotation when user interacts with testimonials
    [prevButton, nextButton].forEach(button => {
        button.addEventListener('click', () => {
            clearInterval(autoRotate);
            // Restart auto-rotation after 15 seconds of inactivity
            autoRotate = setInterval(() => {
                showTestimonial((currentIndex + 1) % testimonials.length);
            }, 8000);
        });
    });
}

// Make/Model selection
document.addEventListener('DOMContentLoaded', function() {
    const makeSelect = document.getElementById('make');
    const modelSelect = document.getElementById('model');
    
    if (!makeSelect || !modelSelect) return;
    
    makeSelect.addEventListener('change', function() {
        const make = this.value;
        
        // Enable model select when make is selected
        modelSelect.disabled = !make;
        
        // Clear current options except the first one
        while (modelSelect.options.length > 1) {
            modelSelect.remove(1);
        }
        
        // If no make is selected, stop here
        if (!make) return;
        
        // Add appropriate models based on make
        const models = getModelsByMake(make);
        models.forEach(model => {
            const option = document.createElement('option');
            option.value = model.toLowerCase();
            option.textContent = model;
            modelSelect.appendChild(option);
        });
    });
    
    // Helper function to get models by make
    function getModelsByMake(make) {
        const modelsByMake = {
            'toyota': ['Camry', 'Corolla', 'RAV4', 'LandCruiser', 'HiLux', 'Kluger'],
            'honda': ['Civic', 'Accord', 'CR-V', 'HR-V', 'Jazz'],
            'ford': ['Ranger', 'Mustang', 'Everest', 'Focus', 'Escape'],
            'mazda': ['CX-5', 'CX-9', 'Mazda3', 'Mazda6', 'BT-50'],
            'bmw': ['3 Series', '5 Series', 'X5', 'X3', 'X1'],
            'mercedes': ['C-Class', 'E-Class', 'A-Class', 'GLC', 'GLE'],
            'audi': ['A4', 'Q5', 'A3', 'Q7', 'A5'],
            'hyundai': ['Tucson', 'i30', 'Santa Fe', 'Kona', 'iMax']
        };
        
        return modelsByMake[make] || [];
    }
});
