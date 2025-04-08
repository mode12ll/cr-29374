/**
 * AutoMarket - Optimized Image Loading Script
 * Provides lazy loading and fallback handling for images
 */

document.addEventListener('DOMContentLoaded', function() {
    // Set up Intersection Observer for lazy loading
    const lazyLoadImages = document.querySelectorAll('.lazy-load');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.dataset.src;
                    
                    if (src) {
                        img.src = src;
                        img.addEventListener('load', () => {
                            img.classList.add('loaded');
                            const container = img.closest('.car-image') || img.closest('.make-image-container');
                            if (container) {
                                container.classList.add('loaded');
                            }
                        });
                        
                        img.addEventListener('error', () => {
                            handleImageError(img);
                        });
                    }
                    
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '100px 0px',
            threshold: 0.01
        });
        
        lazyLoadImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers without Intersection Observer
        lazyLoadImages.forEach(img => {
            const src = img.dataset.src;
            if (src) {
                img.src = src;
                img.addEventListener('load', () => {
                    img.classList.add('loaded');
                    const container = img.closest('.car-image') || img.closest('.make-image-container');
                    if (container) {
                        container.classList.add('loaded');
                    }
                });
                img.addEventListener('error', () => {
                    handleImageError(img);
                });
            }
        });
    }
    
    // Handle pre-loaded images that may have loaded before JS execution
    document.querySelectorAll('img[src]:not(.lazy-load)').forEach(img => {
        if (img.complete) {
            const container = img.closest('.car-image') || img.closest('.make-image-container');
            if (container) {
                container.classList.add('loaded');
            }
        } else {
            img.addEventListener('load', () => {
                const container = img.closest('.car-image') || img.closest('.make-image-container');
                if (container) {
                    container.classList.add('loaded');
                }
            });
            
            img.addEventListener('error', () => {
                handleImageError(img);
            });
        }
    });
    
    // Handle image loading errors
    function handleImageError(img) {
        const container = img.closest('.car-image');
        const makeContainer = img.closest('.make-image-container');
        
        if (container) {
            container.classList.add('error');
            // Set fallback image based on context
            if (img.alt.includes('Car') || img.alt.includes('BMW') || img.alt.includes('Mercedes') || 
                img.alt.includes('Audi') || img.alt.includes('Toyota')) {
                img.src = './images/fallbacks/car-placeholder.jpg';
            } else {
                img.src = './images/fallbacks/image-placeholder.jpg';
            }
        } else if (makeContainer) {
            makeContainer.classList.add('error');
            img.src = './images/logos/placeholder.svg';
        }
    }
    
    // Optimize hero section loading
    const heroSection = document.getElementById('hero-section');
    if (heroSection) {
        const img = new Image();
        img.onload = function() {
            heroSection.classList.add('hero-loaded');
        };
        img.src = 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80';
    }
});
