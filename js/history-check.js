/**
 * AutoMarket - Vehicle History Check
 * Handles vehicle history check form submission and testimonial slider
 */

document.addEventListener('DOMContentLoaded', function() {
    // Form submission
    const historyCheckForm = document.getElementById('history-check-form');
    const vinInput = document.getElementById('vin');
    const registrationInput = document.getElementById('registration');
    const stateSelect = document.getElementById('state');
    
    if (historyCheckForm) {
        historyCheckForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (!validateForm()) {
                return;
            }
            
            // Simulate form submission
            const submitButton = historyCheckForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            
            // In a real application, you would submit the form to a server
            // For this demo, we'll simulate a response after a delay
            setTimeout(() => {
                // Redirect to a payment page (we'll pretend this exists)
                showNotification('Redirecting to secure payment page...', 'info');
                
                // In a real application, you would redirect to a payment page
                // window.location.href = 'payment.html';
                
                // For demo purposes, reset the form and button
                submitButton.disabled = false;
                submitButton.innerHTML = 'Check Vehicle History';
                
                // Show success modal or message
                simulatePaymentSuccess();
            }, 2000);
        });
    }
    
    // Validate form inputs
    function validateForm() {
        let isValid = true;
        
        // Check if either VIN or registration + state is provided
        const vinValue = vinInput.value.trim();
        const regValue = registrationInput.value.trim();
        const stateValue = stateSelect.value;
        
        // Reset previous error messages
        clearErrorMessages();
        
        // Validate VIN or registration
        if (!vinValue && (!regValue || !stateValue)) {
            if (!vinValue) {
                addErrorMessage(vinInput, 'Please enter a VIN or registration details');
            }
            
            if (!regValue) {
                addErrorMessage(registrationInput, 'Registration number is required if not using VIN');
            }
            
            if (!stateValue) {
                addErrorMessage(stateSelect, 'State is required with registration number');
            }
            
            isValid = false;
        }
        
        // If VIN is provided, validate format (basic validation)
        if (vinValue && (vinValue.length !== 17 || !isValidVIN(vinValue))) {
            addErrorMessage(vinInput, 'Please enter a valid 17-character VIN');
            isValid = false;
        }
        
        // If registration is provided, validate format (basic validation)
        if (regValue && regValue.length < 2) {
            addErrorMessage(registrationInput, 'Please enter a valid registration number');
            isValid = false;
        }
        
        return isValid;
    }
    
    // Basic VIN validation (simplified)
    function isValidVIN(vin) {
        // This is a simplified validation - a real implementation would be more complex
        const regex = /^[A-HJ-NPR-Z0-9]{17}$/i;
        return regex.test(vin);
    }
    
    // Add error message to an input
    function addErrorMessage(input, message) {
        input.classList.add('error');
        
        // Create error message element
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        
        // Add error message after the input
        input.parentNode.appendChild(errorElement);
    }
    
    // Clear all error messages
    function clearErrorMessages() {
        // Remove error class from inputs
        const errorInputs = document.querySelectorAll('.error');
        errorInputs.forEach(input => {
            input.classList.remove('error');
        });
        
        // Remove error message elements
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(message => {
            message.parentNode.removeChild(message);
        });
    }
    
    // Simulate successful payment and report generation
    function simulatePaymentSuccess() {
        // Create a modal element
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <div class="success-content">
                    <i class="fas fa-check-circle"></i>
                    <h3>Vehicle Check Complete!</h3>
                    <p>Your vehicle history report has been generated and sent to your email.</p>
                    <div class="report-preview">
                        <div class="preview-header">
                            <h4>Report Summary</h4>
                            <span class="report-id">Report ID: VHC-${Math.floor(100000 + Math.random() * 900000)}</span>
                        </div>
                        <div class="preview-item">
                            <span class="label">Vehicle:</span>
                            <span class="value">2018 Toyota Camry</span>
                        </div>
                        <div class="preview-item">
                            <span class="label">VIN:</span>
                            <span class="value">${vinInput.value || 'WBAFG41090L389793'}</span>
                        </div>
                        <div class="preview-item success">
                            <span class="label">Stolen Check:</span>
                            <span class="value"><i class="fas fa-check-circle"></i> No stolen records found</span>
                        </div>
                        <div class="preview-item success">
                            <span class="label">Written-off Check:</span>
                            <span class="value"><i class="fas fa-check-circle"></i> Not recorded as written-off</span>
                        </div>
                        <div class="preview-item warning">
                            <span class="label">Odometer Check:</span>
                            <span class="value"><i class="fas fa-exclamation-triangle"></i> Inconsistent readings detected</span>
                        </div>
                    </div>
                    <div class="modal-actions">
                        <a href="#" class="btn btn-primary">View Full Report</a>
                        <a href="#" class="btn btn-outline">Download PDF</a>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add visible class after a small delay (for animation)
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
        
        // Close button functionality
        const closeButton = modal.querySelector('.close-modal');
        closeButton.addEventListener('click', () => {
            modal.classList.remove('show');
            // Remove from DOM after animation completes
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        });
        
        // Close when clicking outside of the modal content
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('show');
                // Remove from DOM after animation completes
                setTimeout(() => {
                    document.body.removeChild(modal);
                }, 300);
            }
        });
    }
    
    // Testimonial slider
    const testimonials = document.querySelectorAll('.testimonial');
    const prevButton = document.querySelector('.prev-testimonial');
    const nextButton = document.querySelector('.next-testimonial');
    
    if (testimonials.length > 0) {
        let currentTestimonial = 0;
        
        // Hide all testimonials except the first one
        testimonials.forEach((testimonial, index) => {
            if (index !== 0) {
                testimonial.style.display = 'none';
            }
        });
        
        // Function to show a specific testimonial
        function showTestimonial(index) {
            testimonials.forEach((testimonial, i) => {
                testimonial.style.display = i === index ? 'block' : 'none';
            });
            currentTestimonial = index;
        }
        
        // Event listeners for prev/next buttons
        if (prevButton) {
            prevButton.addEventListener('click', function() {
                let newIndex = currentTestimonial - 1;
                if (newIndex < 0) {
                    newIndex = testimonials.length - 1;
                }
                showTestimonial(newIndex);
            });
        }
        
        if (nextButton) {
            nextButton.addEventListener('click', function() {
                let newIndex = currentTestimonial + 1;
                if (newIndex >= testimonials.length) {
                    newIndex = 0;
                }
                showTestimonial(newIndex);
            });
        }
        
        // Auto-play testimonials
        setInterval(() => {
            let newIndex = currentTestimonial + 1;
            if (newIndex >= testimonials.length) {
                newIndex = 0;
            }
            showTestimonial(newIndex);
        }, 8000);
    }
    
    // Report options selection
    const reportOptions = document.querySelectorAll('.report-option');
    
    reportOptions.forEach(option => {
        option.addEventListener('click', function() {
            const radio = this.querySelector('input[type="radio"]');
            radio.checked = true;
            
            // Highlight the selected option
            reportOptions.forEach(opt => {
                if (opt.querySelector('input[type="radio"]').checked) {
                    opt.style.borderColor = var(--primary-color);
                    opt.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
                } else {
                    opt.style.borderColor = '#eee';
                    opt.style.boxShadow = 'none';
                }
            });
        });
    });
});
