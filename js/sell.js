/**
 * AutoMarket - Sell Page Functionality
 * Handles multi-step form, package selection, and photo uploads
 */

document.addEventListener('DOMContentLoaded', function() {
    // Package selection
    const packageButtons = document.querySelectorAll('.select-package');
    
    packageButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get the selected package
            const selectedPackage = this.dataset.package;
            
            // Highlight the selected package
            const packages = document.querySelectorAll('.package');
            packages.forEach(pkg => {
                const pkgButton = pkg.querySelector('.select-package');
                if (pkgButton.dataset.package === selectedPackage) {
                    pkg.classList.add('selected');
                    pkgButton.innerHTML = 'Selected';
                    pkgButton.classList.add('btn-success');
                    pkgButton.classList.remove('btn-outline', 'btn-primary');
                } else {
                    pkg.classList.remove('selected');
                    pkgButton.innerHTML = 'Select Package';
                    pkgButton.classList.remove('btn-success');
                    
                    // Restore original button styles
                    if (pkg.classList.contains('featured')) {
                        pkgButton.classList.add('btn-primary');
                    } else {
                        pkgButton.classList.add('btn-outline');
                    }
                }
            });
            
            // Store the selected package
            localStorage.setItem('selectedPackage', selectedPackage);
            
            // Scroll to the form
            document.querySelector('.create-listing').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Show a notification
            showNotification(`${selectedPackage.charAt(0).toUpperCase() + selectedPackage.slice(1)} package selected`, 'success');
        });
    });
    
    // Multi-step form navigation
    const formSections = document.querySelectorAll('.form-section');
    const nextButtons = document.querySelectorAll('.btn-next');
    const prevButtons = document.querySelectorAll('.btn-prev');
    
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentSection = this.closest('.form-section');
            const currentIndex = Array.from(formSections).indexOf(currentSection);
            
            // Validate the current section
            if (validateSection(currentSection)) {
                // Hide current section
                currentSection.classList.remove('active');
                
                // Show next section
                formSections[currentIndex + 1].classList.add('active');
                
                // Scroll to top of form
                document.querySelector('.sell-form').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentSection = this.closest('.form-section');
            const currentIndex = Array.from(formSections).indexOf(currentSection);
            
            // Hide current section
            currentSection.classList.remove('active');
            
            // Show previous section
            formSections[currentIndex - 1].classList.add('active');
            
            // Scroll to top of form
            document.querySelector('.sell-form').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
    
    // Form validation
    function validateSection(section) {
        const requiredFields = section.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                
                // Add error class
                field.classList.add('error');
                
                // Create or update error message
                let errorMessage = field.parentNode.querySelector('.error-message');
                if (!errorMessage) {
                    errorMessage = document.createElement('div');
                    errorMessage.className = 'error-message';
                    field.parentNode.appendChild(errorMessage);
                }
                errorMessage.textContent = 'This field is required';
            } else {
                // Remove error class and message
                field.classList.remove('error');
                const errorMessage = field.parentNode.querySelector('.error-message');
                if (errorMessage) {
                    field.parentNode.removeChild(errorMessage);
                }
            }
        });
        
        // Special validation for photo uploads in section 3
        if (section.id === 'section-3') {
            const photoContainer = section.querySelector('.photo-preview-container');
            const photos = photoContainer.querySelectorAll('.photo-preview');
            
            if (photos.length < 3) {
                isValid = false;
                
                // Show error message for photos
                let errorMessage = photoContainer.parentNode.querySelector('.error-message');
                if (!errorMessage) {
                    errorMessage = document.createElement('div');
                    errorMessage.className = 'error-message';
                    photoContainer.parentNode.appendChild(errorMessage);
                }
                errorMessage.textContent = 'Please upload at least 3 photos';
            } else {
                // Remove error message if enough photos
                const errorMessage = photoContainer.parentNode.querySelector('.error-message');
                if (errorMessage) {
                    photoContainer.parentNode.removeChild(errorMessage);
                }
            }
        }
        
        if (!isValid) {
            // Scroll to the first error
            const firstError = section.querySelector('.error, .error-message');
            if (firstError) {
                firstError.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
                
                // Focus the field if possible
                const errorField = section.querySelector('.error');
                if (errorField) {
                    errorField.focus();
                }
            }
        }
        
        return isValid;
    }
    
    // Make/model relationship
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
                defaultOption.textContent = 'Select Model';
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
    
    // Photo upload functionality
    const photoUploadBtn = document.querySelector('.photo-upload-btn');
    const photoInput = document.getElementById('photo-upload');
    const photoContainer = document.querySelector('.photo-upload-container');
    const photoPreviewContainer = document.querySelector('.photo-preview-container');
    
    if (photoUploadBtn && photoInput) {
        // Click the hidden file input when the button is clicked
        photoUploadBtn.addEventListener('click', function() {
            photoInput.click();
        });
        
        // Handle file selection
        photoInput.addEventListener('change', function() {
            handleFiles(this.files);
        });
        
        // Handle drag and drop
        photoContainer.addEventListener('dragover', function(e) {
            e.preventDefault();
            photoContainer.classList.add('drag-over');
        });
        
        photoContainer.addEventListener('dragleave', function() {
            photoContainer.classList.remove('drag-over');
        });
        
        photoContainer.addEventListener('drop', function(e) {
            e.preventDefault();
            photoContainer.classList.remove('drag-over');
            
            if (e.dataTransfer.files.length) {
                handleFiles(e.dataTransfer.files);
            }
        });
        
        // Process uploaded files
        function handleFiles(files) {
            // Get the current number of photos
            const currentPhotos = photoPreviewContainer.querySelectorAll('.photo-preview').length;
            
            // Get selected package and determine max allowed photos
            const selectedPackage = localStorage.getItem('selectedPackage') || 'standard';
            let maxPhotos = 5; // default for standard
            
            if (selectedPackage === 'premium') {
                maxPhotos = 20;
            } else if (selectedPackage === 'ultimate') {
                maxPhotos = 50; // unlimited would be impractical, setting a high number instead
            }
            
            // Check if adding these files would exceed the limit
            if (currentPhotos + files.length > maxPhotos) {
                showNotification(`Your package allows a maximum of ${maxPhotos} photos.`, 'error');
                return;
            }
            
            // Process each file
            Array.from(files).forEach((file, index) => {
                // Check if it's an image
                if (!file.type.match('image.*')) {
                    showNotification('Only image files are allowed.', 'error');
                    return;
                }
                
                // Create a preview
                const reader = new FileReader();
                reader.onload = function(e) {
                    const preview = document.createElement('div');
                    preview.className = 'photo-preview';
                    
                    const image = document.createElement('img');
                    image.src = e.target.result;
                    image.alt = 'Car Photo';
                    
                    const removeBtn = document.createElement('button');
                    removeBtn.className = 'remove-photo';
                    removeBtn.innerHTML = '<i class="fas fa-times"></i>';
                    removeBtn.addEventListener('click', function() {
                        preview.remove();
                        
                        // Check if we need to update the main photo badge
                        if (preview.querySelector('.main-photo-badge')) {
                            const firstPhoto = photoPreviewContainer.querySelector('.photo-preview');
                            if (firstPhoto) {
                                addMainPhotoBadge(firstPhoto);
                            }
                        }
                    });
                    
                    preview.appendChild(image);
                    preview.appendChild(removeBtn);
                    
                    // Add "Main Photo" badge to the first photo
                    if (currentPhotos === 0 && index === 0) {
                        addMainPhotoBadge(preview);
                    }
                    
                    photoPreviewContainer.appendChild(preview);
                };
                
                reader.readAsDataURL(file);
            });
            
            // Hide the upload instructions if we have photos
            if (currentPhotos + files.length > 0) {
                const instructions = photoContainer.querySelector('.photo-upload-instructions');
                instructions.style.display = 'none';
            }
        }
        
        // Add "Main Photo" badge to an element
        function addMainPhotoBadge(element) {
            // Remove any existing badges
            const existingBadges = photoPreviewContainer.querySelectorAll('.main-photo-badge');
            existingBadges.forEach(badge => badge.remove());
            
            // Add badge to the specified element
            const badge = document.createElement('div');
            badge.className = 'main-photo-badge';
            badge.textContent = 'Main Photo';
            element.appendChild(badge);
        }
    }
    
    // Handle form submission
    const sellForm = document.getElementById('sell-form');
    if (sellForm) {
        sellForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate all sections
            let isValid = true;
            formSections.forEach(section => {
                if (!validateSection(section)) {
                    isValid = false;
                    
                    // Show the invalid section
                    formSections.forEach(s => s.classList.remove('active'));
                    section.classList.add('active');
                    
                    // Scroll to the form
                    sellForm.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    return; // Exit the forEach loop
                }
            });
            
            if (isValid) {
                // Simulate form submission
                const submitButton = sellForm.querySelector('button[type="submit"]');
                submitButton.disabled = true;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Listing...';
                
                // In a real application, you would send an AJAX request to the server
                // This is just a simulation
                setTimeout(() => {
                    // Show success modal
                    const successModal = document.getElementById('success-modal');
                    successModal.classList.add('show');
                    
                    // Reset form and button
                    sellForm.reset();
                    submitButton.disabled = false;
                    submitButton.innerHTML = 'Create Listing';
                    
                    // Clear photos
                    photoPreviewContainer.innerHTML = '';
                    photoContainer.querySelector('.photo-upload-instructions').style.display = 'flex';
                    
                    // Return to first section
                    formSections.forEach(s => s.classList.remove('active'));
                    formSections[0].classList.add('active');
                }, 2000);
            }
        });
    }
    
    // FAQ accordions
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Toggle active class
            const isActive = item.classList.contains('active');
            
            // Close all FAQs
            faqItems.forEach(faq => {
                faq.classList.remove('active');
            });
            
            // If it wasn't active before, make it active now
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // Testimonial slider
    const testimonials = document.querySelectorAll('.testimonial');
    const indicators = document.querySelectorAll('.indicator');
    const prevButton = document.querySelector('.testimonial-prev');
    const nextButton = document.querySelector('.testimonial-next');
    
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
            
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === index);
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
        
        // Event listeners for indicators
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', function() {
                showTestimonial(index);
            });
        });
        
        // Auto-play testimonials
        setInterval(() => {
            let newIndex = currentTestimonial + 1;
            if (newIndex >= testimonials.length) {
                newIndex = 0;
            }
            showTestimonial(newIndex);
        }, 8000);
    }
    
    // Close modal
    const successModal = document.getElementById('success-modal');
    if (successModal) {
        const closeBtn = successModal.querySelector('.close-modal');
        
        closeBtn.addEventListener('click', function() {
            successModal.classList.remove('show');
        });
        
        // Close when clicking outside of the modal content
        successModal.addEventListener('click', function(e) {
            if (e.target === successModal) {
                successModal.classList.remove('show');
            }
        });
    }
});
