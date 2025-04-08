/**
 * AutoMarket - Finance Calculator Preview Script
 * Provides a mini version of the finance calculator on the homepage
 */

document.addEventListener('DOMContentLoaded', function() {
    const loanAmountInput = document.getElementById('quick-loan-amount');
    const loanTermSelect = document.getElementById('quick-loan-term');
    const interestRateInput = document.getElementById('quick-interest-rate');
    const calculateButton = document.getElementById('quick-calculate-btn');
    const monthlyPaymentDisplay = document.getElementById('quick-monthly-payment');
    
    if (!loanAmountInput || !loanTermSelect || !interestRateInput || 
        !calculateButton || !monthlyPaymentDisplay) {
        // Skip if any elements are missing
        return;
    }
    
    // Calculate initial value
    calculateMonthlyPayment();
    
    // Set up event listeners
    calculateButton.addEventListener('click', calculateMonthlyPayment);
    
    // Calculate monthly payment
    function calculateMonthlyPayment() {
        // Get values from inputs
        const principal = parseFloat(loanAmountInput.value);
        const termYears = parseInt(loanTermSelect.value);
        const interestRate = parseFloat(interestRateInput.value) / 100;
        
        // Validate inputs
        if (isNaN(principal) || isNaN(termYears) || isNaN(interestRate) ||
            principal <= 0 || termYears <= 0 || interestRate < 0) {
            monthlyPaymentDisplay.textContent = 'Invalid input';
            return;
        }
        
        // Convert annual interest rate to monthly and term in years to months
        const monthlyRate = interestRate / 12;
        const termMonths = termYears * 12;
        
        // Calculate monthly payment using the loan payment formula
        const monthlyPayment = principal * 
            (monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / 
            (Math.pow(1 + monthlyRate, termMonths) - 1);
        
        // Display result
        monthlyPaymentDisplay.textContent = '$' + monthlyPayment.toFixed(2);
        
        // Add animation for visual feedback
        monthlyPaymentDisplay.classList.add('calculated');
        setTimeout(() => {
            monthlyPaymentDisplay.classList.remove('calculated');
        }, 500);
    }
    
    // Add input validation
    loanAmountInput.addEventListener('input', function() {
        // Keep the value positive
        if (this.value < 0) {
            this.value = Math.abs(this.value);
        }
    });
    
    interestRateInput.addEventListener('input', function() {
        // Keep the value within reasonable range and positive
        if (this.value < 0) {
            this.value = Math.abs(this.value);
        } else if (this.value > 30) {
            this.value = 30;
        }
    });
});
