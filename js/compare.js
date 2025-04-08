/**
 * AutoMarket - Compare Page Functionality
 * Handles loading and managing compared cars
 */

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const compareTable = document.getElementById('compare-table');
    const emptyCompare = document.getElementById('empty-compare');
    const clearAllBtn = document.getElementById('clear-all');
    const removeButtons = document.querySelectorAll('.remove-car');
    const copyLinkBtn = document.getElementById('copy-link');
    const printComparisonBtn = document.getElementById('print-comparison');
    
    // Load cars from local storage
    function loadComparedCars() {
        const compareList = JSON.parse(localStorage.getItem('compareList')) || [];
        
        // Show appropriate view based on if we have cars to compare
        if (compareList.length > 0) {
            emptyCompare.style.display = 'none';
            compareTable.style.display = 'block';
            
            // In a real application, we would dynamically populate the table
            // For this demo, we're using the static HTML content
            
            // Display the appropriate number of car columns
            const carColumns = document.querySelectorAll('.car-cell');
            carColumns.forEach((column, index) => {
                if (index === 0) return; // Skip the feature column
                
                if (index <= compareList.length) {
                    // Show this car column
                    column.classList.remove('empty-car');
                    
                    // If this was the last empty slot, show the "Add car" placeholder
                    if (index === compareList.length && index < 3) {
                        column.classList.add('empty-car');
                        column.innerHTML = `
                            <div class="add-car-placeholder">
                                <i class="fas fa-plus-circle"></i>
                                <p>Add another car</p>
                                <a href="search.html" class="btn btn-outline btn-sm">Browse Cars</a>
                            </div>
                        `;
                    }
                } else {
                    // Hide this car column
                    column.classList.add('empty-car');
                    column.innerHTML = '';
                }
            });
            
        } else {
            emptyCompare.style.display = 'block';
            compareTable.style.display = 'none';
        }
    }
    
    // Initialize page
    loadComparedCars();
    
    // Clear all compared cars
    if (clearAllBtn) {
        clearAllBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to clear all cars from comparison?')) {
                localStorage.removeItem('compareList');
                loadComparedCars();
                showNotification('All cars have been removed from comparison');
            }
        });
    }
    
    // Remove individual car
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const carId = this.dataset.carId;
            const compareList = JSON.parse(localStorage.getItem('compareList')) || [];
            
            // Remove the car with the matching ID
            const updatedList = compareList.filter(car => car.id !== carId);
            localStorage.setItem('compareList', JSON.stringify(updatedList));
            
            loadComparedCars();
            showNotification('Car removed from comparison');
        });
    });
    
    // Copy comparison link to clipboard
    if (copyLinkBtn) {
        copyLinkBtn.addEventListener('click', function() {
            // Get current URL
            const url = window.location.href;
            
            // Create a temporary input element
            const tempInput = document.createElement('input');
            tempInput.value = url;
            document.body.appendChild(tempInput);
            
            // Select and copy the link
            tempInput.select();
            document.execCommand('copy');
            
            // Remove the temporary element
            document.body.removeChild(tempInput);
            
            // Show notification
            const notification = document.getElementById('link-copied-notification');
            notification.classList.add('visible');
            
            // Hide notification after 3 seconds
            setTimeout(() => {
                notification.classList.remove('visible');
            }, 3000);
        });
    }
    
    // Close notification
    const notificationCloseBtn = document.querySelector('.notification-close');
    if (notificationCloseBtn) {
        notificationCloseBtn.addEventListener('click', function() {
            const notification = this.closest('.notification');
            notification.classList.remove('visible');
        });
    }
    
    // Print comparison
    if (printComparisonBtn) {
        printComparisonBtn.addEventListener('click', function() {
            window.print();
        });
    }
    
    // Add custom print styles when printing
    const printStyles = `
        @media print {
            header, footer, .compare-footer, .browse-cars, .notification {
                display: none !important;
            }
            
            body, .compare-section {
                padding: 0 !important;
                margin: 0 !important;
            }
            
            .compare-header {
                text-align: center;
                margin-bottom: 20px;
            }
            
            .compare-header h1 {
                font-size: 24px;
            }
            
            .compare-header p {
                font-size: 14px;
            }
            
            .compare-table {
                box-shadow: none;
                border: 1px solid #ddd;
            }
            
            .car-actions {
                display: none;
            }
            
            .btn {
                display: none;
            }
        }
    `;
    
    // Add print styles to head
    const style = document.createElement('style');
    style.innerHTML = printStyles;
    document.head.appendChild(style);
    
    // Show notification function
    function showNotification(message, type = 'success') {
        // This function is already defined in main.js
        // If you need to use it in this file specifically, you might want to redefine it here
    }
});
