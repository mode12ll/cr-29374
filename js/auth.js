/**
 * AutoMarket - Authentication
 * Handles login, registration, and authentication functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Login form handling
    const loginForm = document.getElementById('login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const remember = document.getElementById('remember')?.checked || false;
            
            // Validate form
            if (!validateLoginForm(email, password)) {
                return;
            }
            
            // Show loading state
            const submitButton = loginForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing in...';
            
            // Simulate API call (would connect to a real backend in production)
            setTimeout(() => {
                // For demo purposes, simulating successful login
                const user = {
                    id: '12345',
                    firstName: 'John',
                    lastName: 'Smith',
                    email: email,
                    isLoggedIn: true
                };
                
                // Store user in local storage (in a real app, this would be a session or token)
                localStorage.setItem('user', JSON.stringify(user));
                
                // Redirect to dashboard or previous page
                redirectAfterLogin();
            }, 1500);
        });
    }
    
    // Registration form handling
    const registerForm = document.getElementById('register-form');
    
    if (registerForm) {
        // Password strength meter
        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('confirm-password');
        const strengthSegments = document.querySelectorAll('.strength-segment');
        const strengthText = document.querySelector('.strength-text');
        
        if (passwordInput) {
            passwordInput.addEventListener('input', function() {
                updatePasswordStrength(this.value);
            });
        }
        
        // Form submission
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const firstName = document.getElementById('first-name').value;
            const lastName = document.getElementById('last-name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            const agreeTerms = document.getElementById('agree-terms').checked;
            const subscribe = document.getElementById('subscribe').checked;
            
            // Validate form
            if (!validateRegistrationForm(firstName, lastName, email, password, confirmPassword, agreeTerms)) {
                return;
            }
            
            // Show loading state
            const submitButton = registerForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating account...';
            
            // Simulate API call (would connect to a real backend in production)
            setTimeout(() => {
                // For demo purposes, simulating successful registration
                const user = {
                    id: generateUserId(),
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    phone: phone,
                    isLoggedIn: true,
                    subscribed: subscribe
                };
                
                // Store user in local storage (in a real app, this would involve a server-side registration)
                localStorage.setItem('user', JSON.stringify(user));
                
                // Show success message or redirect
                redirectAfterRegistration();
            }, 1500);
        });
    }
    
    // Toggle password visibility
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const icon = this.querySelector('i');
            
            // Toggle password visibility
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
    
    // Check if user is already logged in
    function checkAuthStatus() {
        const user = JSON.parse(localStorage.getItem('user')) || null;
        
        if (user && user.isLoggedIn) {
            // Update UI for logged-in user
            updateUIForLoggedInUser(user);
        }
    }
    
    // Call on page load
    checkAuthStatus();
    
    // Logout functionality
    const logoutLinks = document.querySelectorAll('a[href="logout"]');
    
    logoutLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
    });
    
    // Validate login form
    function validateLoginForm(email, password) {
        let isValid = true;
        
        // Reset previous errors
        clearErrors();
        
        // Email validation
        if (!email || !isValidEmail(email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Password validation
        if (!password) {
            showError('password', 'Please enter your password');
            isValid = false;
        }
        
        return isValid;
    }
    
    // Validate registration form
    function validateRegistrationForm(firstName, lastName, email, password, confirmPassword, agreeTerms) {
        let isValid = true;
        
        // Reset previous errors
        clearErrors();
        
        // First name validation
        if (!firstName.trim()) {
            showError('first-name', 'Please enter your first name');
            isValid = false;
        }
        
        // Last name validation
        if (!lastName.trim()) {
            showError('last-name', 'Please enter your last name');
            isValid = false;
        }
        
        // Email validation
        if (!email || !isValidEmail(email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Password validation
        if (!password) {
            showError('password', 'Please create a password');
            isValid = false;
        } else if (password.length < 8) {
            showError('password', 'Password must be at least 8 characters');
            isValid = false;
        }
        
        // Confirm password validation
        if (password !== confirmPassword) {
            showError('confirm-password', 'Passwords do not match');
            isValid = false;
        }
        
        // Terms validation
        if (!agreeTerms) {
            showError('agree-terms', 'You must agree to the Terms of Service and Privacy Policy');
            isValid = false;
        }
        
        return isValid;
    }
    
    // Helper functions
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    
    function showError(inputId, message) {
        const input = document.getElementById(inputId);
        
        if (input) {
            input.classList.add('input-error');
            
            // Check if error feedback element already exists
            let errorFeedback = input.parentElement.querySelector('.error-feedback');
            
            if (!errorFeedback) {
                // Create error feedback element
                errorFeedback = document.createElement('div');
                errorFeedback.className = 'error-feedback';
                input.parentElement.appendChild(errorFeedback);
            }
            
            // Set error message
            errorFeedback.textContent = message;
        }
    }
    
    function clearErrors() {
        const errorInputs = document.querySelectorAll('.input-error');
        const errorFeedbacks = document.querySelectorAll('.error-feedback');
        
        errorInputs.forEach(input => {
            input.classList.remove('input-error');
        });
        
        errorFeedbacks.forEach(feedback => {
            feedback.textContent = '';
        });
    }
    
    function updatePasswordStrength(password) {
        // Measure password strength
        const strength = calculatePasswordStrength(password);
        
        // Update UI
        strengthSegments.forEach((segment, index) => {
            segment.className = 'strength-segment';
            
            if (password.length > 0) {
                if (index < strength) {
                    if (strength === 1) {
                        segment.classList.add('weak');
                    } else if (strength === 2) {
                        segment.classList.add('medium');
                    } else if (strength === 3) {
                        segment.classList.add('strong');
                    } else if (strength === 4) {
                        segment.classList.add('very-strong');
                    }
                }
            }
        });
        
        // Update text
        if (password.length === 0) {
            strengthText.textContent = 'Password strength';
            strengthText.className = 'strength-text';
        } else if (strength === 1) {
            strengthText.textContent = 'Weak password';
            strengthText.className = 'strength-text weak';
        } else if (strength === 2) {
            strengthText.textContent = 'Medium password';
            strengthText.className = 'strength-text medium';
        } else if (strength === 3) {
            strengthText.textContent = 'Strong password';
            strengthText.className = 'strength-text strong';
        } else {
            strengthText.textContent = 'Very strong password';
            strengthText.className = 'strength-text very-strong';
        }
    }
    
    function calculatePasswordStrength(password) {
        // This is a simple example - in production you would want a more robust check
        let strength = 0;
        
        // Length check
        if (password.length >= 8) {
            strength += 1;
        }
        
        // Complexity checks
        if (/[A-Z]/.test(password)) {
            strength += 1;
        }
        
        if (/[0-9]/.test(password)) {
            strength += 1;
        }
        
        if (/[^A-Za-z0-9]/.test(password)) {
            strength += 1;
        }
        
        return Math.min(strength, 4);
    }
    
    function redirectAfterLogin() {
        // Check if there's a redirect URL in session storage (e.g., from a "Login to continue" prompt)
        const redirectUrl = sessionStorage.getItem('redirectAfterLogin');
        
        if (redirectUrl) {
            sessionStorage.removeItem('redirectAfterLogin');
            window.location.href = redirectUrl;
        } else {
            // Default: redirect to user dashboard
            window.location.href = 'user-dashboard.html';
        }
    }
    
    function redirectAfterRegistration() {
        // Either redirect to dashboard or show success message
        window.location.href = 'user-dashboard.html';
    }
    
    function updateUIForLoggedInUser(user) {
        // Update auth buttons in header
        const authButtons = document.querySelector('.auth-buttons');
        
        if (authButtons) {
            authButtons.innerHTML = `
                <div class="dropdown user-menu">
                    <button class="dropdown-toggle">
                        <img src="./images/user-avatar.jpg" alt="User" class="user-avatar">
                        <span class="user-name">${user.firstName} ${user.lastName}</span>
                    </button>
                    <div class="dropdown-menu">
                        <a href="user-dashboard.html">
                            <i class="fas fa-tachometer-alt"></i> Dashboard
                        </a>
                        <a href="profile.html">
                            <i class="fas fa-user"></i> My Profile
                        </a>
                        <a href="settings.html">
                            <i class="fas fa-cog"></i> Settings
                        </a>
                        <a href="#" class="logout-btn">
                            <i class="fas fa-sign-out-alt"></i> Logout
                        </a>
                    </div>
                </div>
            `;
            
            // Add event listener to logout button
            const logoutBtn = document.querySelector('.logout-btn');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    logout();
                });
            }
        }
    }
    
    function logout() {
        // Clear user from localStorage
        localStorage.removeItem('user');
        
        // Redirect to home page
        window.location.href = 'index.html';
    }
    
    function generateUserId() {
        // Simple function to generate a random ID
        return 'user_' + Math.random().toString(36).substring(2, 15);
    }
});
