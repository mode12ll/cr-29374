/**
 * AutoMarket - Dealer Dashboard
 * Handles dealer dashboard functionality and visualizations
 */

document.addEventListener('DOMContentLoaded', function() {
    // Sidebar toggle
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('expanded');
        });
    }
    
    // Section navigation
    const navLinks = document.querySelectorAll('.sidebar-nav a');
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
                
                // Close sidebar on mobile after navigation
                if (window.innerWidth < 992) {
                    sidebar.classList.remove('expanded');
                }
            });
        });
    }
    
    // Initialize performance chart
    const performanceChartEl = document.getElementById('performance-chart');
    
    if (performanceChartEl) {
        const performanceData = {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
                {
                    label: 'Page Views',
                    data: [1200, 1900, 1500, 2000, 2400, 1800, 1600],
                    borderColor: '#1976d2',
                    backgroundColor: 'rgba(25, 118, 210, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Leads',
                    data: [8, 12, 10, 14, 16, 9, 11],
                    borderColor: '#4caf50',
                    backgroundColor: 'transparent',
                    tension: 0.4
                }
            ]
        };
        
        const performanceOptions = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    grace: '5%',
                    ticks: {
                        stepSize: 500
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                    align: 'end'
                }
            }
        };
        
        new Chart(performanceChartEl, {
            type: 'line',
            data: performanceData,
            options: performanceOptions
        });
    }
    
    // Initialize models chart
    const modelsChartEl = document.getElementById('models-chart');
    
    if (modelsChartEl) {
        const modelsData = {
            labels: ['Toyota Camry', 'BMW X5', 'Honda Civic', 'Mazda CX-5', 'Mercedes GLC'],
            datasets: [{
                data: [245, 187, 156, 98, 203],
                backgroundColor: [
                    '#4158d0',
                    '#c850c0',
                    '#43a047',
                    '#ff9800',
                    '#1976d2'
                ],
                borderWidth: 0,
                borderRadius: 4
            }]
        };
        
        const modelsOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        boxWidth: 15,
                        padding: 15
                    }
                },
                title: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Views: ${context.raw}`;
                        }
                    }
                }
            }
        };
        
        new Chart(modelsChartEl, {
            type: 'bar',
            data: modelsData,
            options: modelsOptions
        });
    }
    
    // Handle inventory table actions
    const actionButtons = document.querySelectorAll('.inventory-table .btn-icon');
    
    if (actionButtons) {
        actionButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                const action = this.title;
                const row = this.closest('tr');
                const vehicleName = row.querySelector('.vehicle-info h4').textContent;
                
                // Handle different actions
                switch (action) {
                    case 'Edit':
                        showNotification(`Editing ${vehicleName}`, 'info');
                        // In a real app, this would open an edit form or modal
                        break;
                    case 'Promote':
                        showPromoteDialog(vehicleName);
                        break;
                    case 'Delete':
                        confirmDelete(row, vehicleName);
                        break;
                    case 'View Sale':
                        showNotification(`Viewing sale details for ${vehicleName}`, 'info');
                        // In a real app, this would open a sale details page or modal
                        break;
                    case 'Relist':
                        showRelistDialog(vehicleName);
                        break;
                }
            });
        });
    }
    
    // Handle checkbox selections in inventory table
    const selectAllCheckbox = document.querySelector('.inventory-table thead input[type="checkbox"]');
    const rowCheckboxes = document.querySelectorAll('.inventory-table tbody input[type="checkbox"]');
    
    if (selectAllCheckbox && rowCheckboxes.length > 0) {
        // Select/deselect all
        selectAllCheckbox.addEventListener('change', function() {
            rowCheckboxes.forEach(checkbox => {
                checkbox.checked = this.checked;
            });
            
            // Update UI for selected rows
            updateSelectedRowsUI();
        });
        
        // Individual row selection
        rowCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                // Check if all rows are selected and update selectAll accordingly
                const allChecked = Array.from(rowCheckboxes).every(c => c.checked);
                const someChecked = Array.from(rowCheckboxes).some(c => c.checked);
                
                selectAllCheckbox.checked = allChecked;
                selectAllCheckbox.indeterminate = someChecked && !allChecked;
                
                // Update UI for selected rows
                updateSelectedRowsUI();
            });
        });
    }
    
    // Update UI based on selected rows
    function updateSelectedRowsUI() {
        const selectedCount = document.querySelectorAll('.inventory-table tbody input[type="checkbox"]:checked').length;
        
        // In a real application, you might show/hide bulk action buttons based on selection
        // and update a counter showing how many items are selected
        
        if (selectedCount > 0) {
            console.log(`${selectedCount} items selected`);
            // This is where you would show bulk action buttons
        } else {
            console.log('No items selected');
            // This is where you would hide bulk action buttons
        }
    }
    
    // Confirm delete dialog
    function confirmDelete(row, vehicleName) {
        if (confirm(`Are you sure you want to delete ${vehicleName}?`)) {
            // In a real application, you would send an API request to delete the vehicle
            
            // For demo purposes, just remove the row
            row.style.opacity = 0;
            setTimeout(() => {
                row.remove();
                showNotification(`${vehicleName} has been deleted`, 'success');
            }, 300);
        }
    }
    
    // Show promote dialog
    function showPromoteDialog(vehicleName) {
        // In a real application, this would open a modal with promotion options
        
        // For demo purposes, just show a notification
        showNotification(`Showing promotion options for ${vehicleName}`, 'info');
    }
    
    // Show relist dialog
    function showRelistDialog(vehicleName) {
        // In a real application, this would open a modal with relisting options
        
        // For demo purposes, just show a notification
        showNotification(`Relisting ${vehicleName}...`, 'info');
    }
    
    // Function to show notification
    function showNotification(message, type = 'success') {
        // Check if we already have a notification container
        let notificationContainer = document.querySelector('.notification-container');
        
        if (!notificationContainer) {
            // Create a container for notifications
            notificationContainer = document.createElement('div');
            notificationContainer.className = 'notification-container';
            document.body.appendChild(notificationContainer);
        }
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add notification to container
        notificationContainer.appendChild(notification);
        
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
    
    // Date filter change
    const dateFilter = document.getElementById('date-range');
    
    if (dateFilter) {
        dateFilter.addEventListener('change', function() {
            const selectedRange = this.value;
            
            // In a real application, this would reload the dashboard data
            // based on the selected date range
            
            // For demo purposes, just show a notification
            showNotification(`Dashboard data updated for ${selectedRange}`, 'info');
        });
    }
    
    // Add event listeners to lead response buttons
    const respondButtons = document.querySelectorAll('.lead-action .btn');
    
    if (respondButtons) {
        respondButtons.forEach(button => {
            button.addEventListener('click', function() {
                const leadName = this.closest('.lead-item').querySelector('.lead-details h4').textContent;
                
                // In a real application, this would open a messaging interface
                
                // For demo purposes, just show a notification
                showNotification(`Opening conversation with ${leadName}`, 'info');
            });
        });
    }
    
    // Initialize inventory filters
    const inventoryFilters = document.querySelectorAll('.inventory-filters select, .inventory-filters input');
    const clearFiltersBtn = document.querySelector('.inventory-filters .btn');
    
    if (inventoryFilters && clearFiltersBtn) {
        // Apply filters
        inventoryFilters.forEach(filter => {
            filter.addEventListener('change', function() {
                // In a real application, this would filter the inventory table
                
                // For demo purposes, just log the filters
                console.log('Filter applied:', filter.value);
            });
        });
        
        // Clear filters
        clearFiltersBtn.addEventListener('click', function() {
            inventoryFilters.forEach(filter => {
                filter.value = '';
            });
            
            // In a real application, this would reset the inventory table
            
            // For demo purposes, just show a notification
            showNotification('Filters cleared', 'info');
        });
    }
    
    // Pagination handlers
    const paginationBtns = document.querySelectorAll('.pagination-numbers button');
    const paginationPrev = document.querySelector('.pagination-prev');
    const paginationNext = document.querySelector('.pagination-next');
    
    if (paginationBtns.length > 0) {
        // Page number buttons
        paginationBtns.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                paginationBtns.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Enable/disable prev/next buttons
                updatePaginationButtons();
                
                // In a real application, this would load the next page of inventory
                
                // For demo purposes, just show a notification
                showNotification(`Loading page ${this.textContent}`, 'info');
            });
        });
        
        // Previous page button
        if (paginationPrev) {
            paginationPrev.addEventListener('click', function() {
                if (this.classList.contains('disabled')) return;
                
                // Find current active button
                const activeButton = document.querySelector('.pagination-numbers button.active');
                const prevButton = activeButton.previousElementSibling;
                
                if (prevButton && prevButton.tagName === 'BUTTON') {
                    // Simulate click on previous button
                    prevButton.click();
                }
            });
        }
        
        // Next page button
        if (paginationNext) {
            paginationNext.addEventListener('click', function() {
                if (this.classList.contains('disabled')) return;
                
                // Find current active button
                const activeButton = document.querySelector('.pagination-numbers button.active');
                const nextButton = activeButton.nextElementSibling;
                
                if (nextButton && nextButton.tagName === 'BUTTON') {
                    // Simulate click on next button
                    nextButton.click();
                }
            });
        }
        
        // Initial pagination button state
        updatePaginationButtons();
    }
    
    // Update pagination prev/next button states
    function updatePaginationButtons() {
        const activeButton = document.querySelector('.pagination-numbers button.active');
        
        if (!activeButton) return;
        
        // Check if this is the first button
        const isFirst = !activeButton.previousElementSibling || activeButton.previousElementSibling.tagName !== 'BUTTON';
        
        // Check if this is the last button
        const isLast = !activeButton.nextElementSibling || activeButton.nextElementSibling.tagName !== 'BUTTON';
        
        // Update prev button
        if (paginationPrev) {
            paginationPrev.classList.toggle('disabled', isFirst);
        }
        
        // Update next button
        if (paginationNext) {
            paginationNext.classList.toggle('disabled', isLast);
        }
    }
});
