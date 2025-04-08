/**
 * AutoMarket - Search Page Functionality
 * Handles advanced search filters, grid/list view toggle, and dynamic loading of results
 */

document.addEventListener('DOMContentLoaded', function() {
    // Toggle more filters visibility
    const moreFiltersToggle = document.querySelector('.more-filters-toggle');
    if (moreFiltersToggle) {
        const moreFilters = document.querySelector('.more-filters');
        moreFiltersToggle.addEventListener('click', function() {
            moreFilters.classList.toggle('active');
        });
    }

    // Handle grid/list view toggle
    const viewButtons = document.querySelectorAll('.view-btn');
    const carGrid = document.querySelector('.car-grid');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            viewButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the view type from data attribute
            const viewType = this.dataset.view;
            
            // Remove all view classes
            carGrid.classList.remove('grid-view', 'list-view');
            
            // Add the selected view class
            carGrid.classList.add(`${viewType}-view`);
            
            // Save preference in local storage
            localStorage.setItem('preferredView', viewType);
        });
    });
    
    // Set initial view based on saved preference
    const preferredView = localStorage.getItem('preferredView') || 'grid';
    document.querySelector(`.view-btn[data-view="${preferredView}"]`).click();

    // Handle make model relationship
    const makeSelect = document.getElementById('make');
    const modelSelect = document.getElementById('model');
    
    if (makeSelect && modelSelect) {
        // Define models for each make
        const modelsByMake = {
            toyota: ['Camry', 'Corolla', 'RAV4', 'Kluger', 'LandCruiser', 'Hilux', 'Yaris'],
            honda: ['Civic', 'Accord', 'CR-V', 'HR-V', 'Jazz', 'Odyssey'],
            mazda: ['Mazda3', 'Mazda6', 'CX-3', 'CX-5', 'CX-9', 'BT-50', 'MX-5'],
            ford: ['Ranger', 'Focus', 'Everest', 'Escape', 'Mustang', 'Transit'],
            bmw: ['1 Series', '3 Series', '5 Series', 'X1', 'X3', 'X5', 'M3', 'M5'],
            mercedes: ['A-Class', 'C-Class', 'E-Class', 'S-Class', 'GLA', 'GLC', 'GLE'],
            audi: ['A1', 'A3', 'A4', 'A6', 'Q3', 'Q5', 'Q7', 'TT']
        };
        
        // Function to update models based on selected make
        function updateModels() {
            // Clear current options
            modelSelect.innerHTML = '';
            modelSelect.disabled = true;
            
            const make = makeSelect.value;
            
            if (make && modelsByMake[make]) {
                // Add default option
                const defaultOption = document.createElement('option');
                defaultOption.value = '';
                defaultOption.textContent = 'Any Model';
                modelSelect.appendChild(defaultOption);
                
                // Add model options for the selected make
                modelsByMake[make].forEach(model => {
                    const option = document.createElement('option');
                    option.value = model.toLowerCase().replace(/\s+/g, '-');
                    option.textContent = model;
                    modelSelect.appendChild(option);
                });
                
                // Enable the model select
                modelSelect.disabled = false;
            } else {
                // If no make is selected, show default message
                const defaultOption = document.createElement('option');
                defaultOption.value = '';
                defaultOption.textContent = 'Select Make First';
                modelSelect.appendChild(defaultOption);
            }
        }
        
        // Update models when make changes
        makeSelect.addEventListener('change', updateModels);
        
        // Initialize models on page load
        updateModels();
    }

    // Handle pagination
    const pageButtons = document.querySelectorAll('.page-btn:not(.prev):not(.next)');
    const prevButton = document.querySelector('.page-btn.prev');
    const nextButton = document.querySelector('.page-btn.next');
    
    if (pageButtons.length) {
        pageButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                pageButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Update prev/next button states
                const currentPage = parseInt(this.textContent);
                prevButton.disabled = currentPage === 1;
                nextButton.disabled = currentPage === pageButtons.length;
                
                // Simulate loading new results (in a real app, this would fetch from the server)
                simulateLoading();
            });
        });
        
        // Handle prev/next buttons
        if (prevButton) {
            prevButton.addEventListener('click', function() {
                const activePage = document.querySelector('.page-btn.active:not(.prev):not(.next)');
                const currentPage = parseInt(activePage.textContent);
                
                if (currentPage > 1) {
                    const prevPage = document.querySelector(`.page-btn:not(.prev):not(.next):nth-child(${currentPage})`);
                    prevPage.click();
                }
            });
        }
        
        if (nextButton) {
            nextButton.addEventListener('click', function() {
                const activePage = document.querySelector('.page-btn.active:not(.prev):not(.next)');
                const currentPage = parseInt(activePage.textContent);
                
                if (currentPage < pageButtons.length) {
                    const nextPage = document.querySelector(`.page-btn:not(.prev):not(.next):nth-child(${currentPage + 2})`);
                    nextPage.click();
                }
            });
        }
    }

    // Simulate loading new search results
    function simulateLoading() {
        const results = document.querySelector('.car-grid');
        const loadingOverlay = document.createElement('div');
        loadingOverlay.className = 'loading-overlay';
        loadingOverlay.innerHTML = '<div class="spinner"></div>';
        
        results.appendChild(loadingOverlay);
        
        // In a real app, this would be replaced with an actual API call
        setTimeout(() => {
            results.removeChild(loadingOverlay);
            // Example of how you might update results (in reality, this would come from the server)
            // updateSearchResults(newResults);
        }, 800);
    }

    // Handle sorting functionality
    const sortSelect = document.getElementById('sort');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            // In a real app, this would re-sort the results based on the selected option
            simulateLoading();
        });
    }

    // Handle favorite toggles for search results
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    favoriteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent click from bubbling to parent elements
            
            // Toggle favorite icon
            const icon = this.querySelector('i');
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
            }
        });
    });

    // Initialize filter form reset functionality
    const filterForm = document.querySelector('.filter-form');
    const resetButton = filterForm.querySelector('button[type="reset"]');
    
    if (resetButton) {
        resetButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Reset all form fields
            const inputs = filterForm.querySelectorAll('input, select');
            inputs.forEach(input => {
                if (input.type === 'checkbox') {
                    input.checked = false;
                } else {
                    input.value = '';
                }
            });
            
            // Specifically handle the model select which needs to be updated
            if (makeSelect && modelSelect) {
                makeSelect.value = '';
                updateModels();
            }
            
            // Simulate search with reset filters
            simulateLoading();
        });
    }
});
