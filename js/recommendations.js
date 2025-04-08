/**
 * AutoMarket - Recommendation Engine
 * Handles personalized car recommendations based on user behavior and preferences
 */

document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const isLoggedIn = checkLoginStatus();
    
    // Elements
    const recommendationsSection = document.getElementById('personalized-recommendations');
    const loginPrompt = document.getElementById('login-prompt');
    const similarTab = document.getElementById('similar-tab');
    const popularTab = document.getElementById('popular-tab');
    const dealsTab = document.getElementById('deals-tab');
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    // Toggle between recommendation tabs
    if (tabButtons) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                tabButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get the tab to show
                const tabToShow = this.dataset.tab;
                
                // Hide all tabs
                document.querySelectorAll('.recommendation-grid').forEach(tab => {
                    tab.classList.remove('active');
                });
                
                // Show the selected tab
                document.getElementById(`${tabToShow}-tab`).classList.add('active');
            });
        });
    }
    
    // Initialize recommendations
    initializeRecommendations(isLoggedIn);
    
    // Function to check if user is logged in
    function checkLoginStatus() {
        // In a real application, this would check for auth tokens or session cookies
        // For demo purposes, we'll check local storage for a user object
        const user = localStorage.getItem('user');
        return !!user; // Convert to boolean
    }
    
    // Initialize recommendations based on login status
    function initializeRecommendations(isLoggedIn) {
        if (isLoggedIn) {
            // User is logged in, show personalized recommendations
            if (loginPrompt) loginPrompt.style.display = 'none';
            
            // Load recommendations from browsing history and preferences
            loadPersonalizedRecommendations();
        } else {
            // User is not logged in, show login prompt and generic recommendations
            if (loginPrompt) loginPrompt.style.display = 'block';
            
            // Load generic popular recommendations
            loadGenericRecommendations();
        }
    }
    
    // Load personalized recommendations based on user history
    function loadPersonalizedRecommendations() {
        // In a real application, this would make API calls to fetch personalized recommendations
        
        // Get recently viewed cars from local storage
        const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
        
        if (recentlyViewed.length > 0) {
            // Use recently viewed cars to generate similar recommendations
            loadSimilarCars(recentlyViewed);
        } else {
            // Fallback to generic recommendations if no history
            loadGenericRecommendations();
        }
        
        // Load popular cars in the user's area
        loadPopularCars();
        
        // Load cars with good deals
        loadDeals();
    }
    
    // Load generic recommendations for non-logged in users
    function loadGenericRecommendations() {
        // Load cars that are generally popular
        const popularCars = [
            {
                id: 'car2',
                title: 'Mazda CX-5 2022',
                price: '$35,990',
                image: './images/car2.jpg',
                kilometers: '8,500 km',
                fuelType: 'Petrol',
                transmission: 'Automatic',
                location: 'Melbourne, VIC'
            },
            {
                id: 'car3',
                title: 'Honda Civic 2021',
                price: '$28,750',
                image: './images/car3.jpg',
                kilometers: '15,300 km',
                fuelType: 'Petrol',
                transmission: 'CVT',
                location: 'Brisbane, QLD'
            },
            {
                id: 'car4',
                title: 'Toyota RAV4 Hybrid 2022',
                price: '$42,990',
                image: './images/car4.jpg',
                kilometers: '12,100 km',
                fuelType: 'Hybrid',
                transmission: 'Automatic',
                location: 'Sydney, NSW'
            }
        ];
        
        // Render popular cars in all tabs since we don't have personalized data
        renderCarCards(similarTab, popularCars);
        renderCarCards(popularTab, popularCars);
        renderCarCards(dealsTab, popularCars);
    }
    
    // Load similar cars based on viewing history
    function loadSimilarCars(recentlyViewed) {
        // In a real app, this would make an API call with the recently viewed cars
        // to get similar recommendations
        
        // For demo, we'll create some similar cars based on the most recent view
        const mostRecentCar = recentlyViewed[0];
        const similarCars = [
            {
                id: 'similar1',
                title: `${mostRecentCar.make} ${mostRecentCar.model} ${parseInt(mostRecentCar.year) - 1}`,
                price: '$' + (parseInt(mostRecentCar.price.replace(/[^0-9]/g, '')) - 5000).toLocaleString(),
                image: './images/similar1.jpg',
                kilometers: '32,500 km',
                fuelType: mostRecentCar.fuelType,
                transmission: mostRecentCar.transmission,
                location: 'Sydney, NSW'
            },
            {
                id: 'similar2',
                title: `${mostRecentCar.make} ${mostRecentCar.model} ${mostRecentCar.year}`,
                price: '$' + (parseInt(mostRecentCar.price.replace(/[^0-9]/g, '')) - 2000).toLocaleString(),
                image: './images/similar2.jpg',
                kilometers: '18,700 km',
                fuelType: mostRecentCar.fuelType,
                transmission: mostRecentCar.transmission,
                location: 'Melbourne, VIC'
            },
            {
                id: 'similar3',
                title: `${mostRecentCar.make} ${mostRecentCar.model} ${parseInt(mostRecentCar.year) + 1}`,
                price: '$' + (parseInt(mostRecentCar.price.replace(/[^0-9]/g, '')) + 4000).toLocaleString(),
                image: './images/similar3.jpg',
                kilometers: '5,200 km',
                fuelType: mostRecentCar.fuelType,
                transmission: mostRecentCar.transmission,
                location: 'Brisbane, QLD'
            }
        ];
        
        renderCarCards(similarTab, similarCars);
    }
    
    // Load popular cars in the user's area
    function loadPopularCars() {
        // In a real app, this would fetch popular cars in the user's location
        
        const popularCars = [
            {
                id: 'popular1',
                title: 'Toyota RAV4 Hybrid 2022',
                price: '$42,990',
                image: './images/popular1.jpg',
                kilometers: '9,800 km',
                fuelType: 'Hybrid',
                transmission: 'Automatic',
                location: 'Sydney, NSW'
            },
            {
                id: 'popular2',
                title: 'Mazda CX-5 2021',
                price: '$34,500',
                image: './images/popular2.jpg',
                kilometers: '22,400 km',
                fuelType: 'Petrol',
                transmission: 'Automatic',
                location: 'Sydney, NSW'
            },
            {
                id: 'popular3',
                title: 'Hyundai i30 2022',
                price: '$26,990',
                image: './images/popular3.jpg',
                kilometers: '11,300 km',
                fuelType: 'Petrol',
                transmission: 'Manual',
                location: 'Sydney, NSW'
            }
        ];
        
        renderCarCards(popularTab, popularCars);
    }
    
    // Load cars with good deals
    function loadDeals() {
        // In a real app, this would fetch cars with recent price drops or good deals
        
        const dealCars = [
            {
                id: 'deal1',
                title: 'Volkswagen Golf 2020',
                price: '$24,990',
                image: './images/deal1.jpg',
                kilometers: '45,600 km',
                fuelType: 'Petrol',
                transmission: 'Automatic',
                location: 'Perth, WA',
                tag: 'Price Drop'
            },
            {
                id: 'deal2',
                title: 'Kia Sportage 2019',
                price: '$27,750',
                image: './images/deal2.jpg',
                kilometers: '38,900 km',
                fuelType: 'Diesel',
                transmission: 'Automatic',
                location: 'Adelaide, SA',
                tag: 'Good Deal'
            },
            {
                id: 'deal3',
                title: 'Ford Ranger 2020',
                price: '$41,990',
                image: './images/deal3.jpg',
                kilometers: '52,300 km',
                fuelType: 'Diesel',
                transmission: 'Automatic',
                location: 'Sydney, NSW',
                tag: '10% Off'
            }
        ];
        
        renderCarCards(dealsTab, dealCars);
    }
    
    // Render car cards
    function renderCarCards(container, cars) {
        if (!container) return;
        
        // Clear the container first
        container.innerHTML = '';
        
        // Create car cards
        cars.forEach(car => {
            const carCard = document.createElement('div');
            carCard.className = 'car-card';
            
            carCard.innerHTML = `
                <div class="car-image">
                    <img src="${car.image}" alt="${car.title}">
                    ${car.tag ? `<span class="tag">${car.tag}</span>` : ''}
                    <button class="favorite-btn" data-car-id="${car.id}"><i class="far fa-heart"></i></button>
                </div>
                <div class="car-details">
                    <h3>${car.title}</h3>
                    <p class="price">${car.price}</p>
                    <div class="specs">
                        <span><i class="fas fa-tachometer-alt"></i> ${car.kilometers}</span>
                        <span><i class="fas fa-gas-pump"></i> ${car.fuelType}</span>
                        <span><i class="fas fa-cog"></i> ${car.transmission}</span>
                    </div>
                    <div class="location"><i class="fas fa-map-marker-alt"></i> ${car.location}</div>
                    <div class="car-actions">
                        <a href="car-detail.html?id=${car.id}" class="btn btn-outline">View Details</a>
                        <button class="btn btn-compare" data-car-id="${car.id}"><i class="fas fa-exchange-alt"></i></button>
                    </div>
                </div>
            `;
            
            container.appendChild(carCard);
        });
        
        // Initialize favorite buttons
        const favoriteButtons = container.querySelectorAll('.favorite-btn');
        favoriteButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Toggle favorite status
                const icon = this.querySelector('i');
                if (icon.classList.contains('far')) {
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                    showNotification('Added to favorites');
                } else {
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                    showNotification('Removed from favorites');
                }
            });
        });
        
        // Initialize compare buttons
        const compareButtons = container.querySelectorAll('.btn-compare');
        compareButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const carId = this.dataset.carId;
                
                // Add to compare list (max 3)
                addToCompareList(carId);
                
                showNotification('Added to compare list');
            });
        });
    }
    
    // Add a car to the compare list
    function addToCompareList(carId) {
        let compareList = JSON.parse(localStorage.getItem('compareList')) || [];
        
        // Check if already in list
        if (!compareList.includes(carId)) {
            // Remove oldest if we already have 3
            if (compareList.length >= 3) {
                compareList.shift();
            }
            
            compareList.push(carId);
            localStorage.setItem('compareList', JSON.stringify(compareList));
        }
    }
    
    // Function to show notification (using the one from main.js)
    function showNotification(message, type = 'success') {
        if (typeof window.showNotification === 'function') {
            // Use the global function if available
            window.showNotification(message, type);
        } else {
            // Local implementation as fallback
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            notification.innerHTML = `
                <div class="notification-content">
                    <span>${message}</span>
                    <button class="notification-close">&times;</button>
                </div>
            `;
            
            document.body.appendChild(notification);
            
            // Add visible class after a small delay (for animation)
            setTimeout(() => {
                notification.classList.add('visible');
            }, 10);
            
            // Auto remove after 3 seconds
            setTimeout(() => {
                notification.classList.remove('visible');
                // Remove from DOM after animation completes
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 3000);
            
            // Close button functionality
            const closeButton = notification.querySelector('.notification-close');
            closeButton.addEventListener('click', () => {
                notification.classList.remove('visible');
                // Remove from DOM after animation completes
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            });
        }
    }
});
