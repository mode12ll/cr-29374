/**
 * AutoMarket - Finance Calculator
 * Full-featured car loan calculator with amortization schedule
 */

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const carPriceInput = document.getElementById('car-price');
    const downPaymentInput = document.getElementById('down-payment');
    const tradeInValueInput = document.getElementById('trade-in-value');
    const taxesFeesInput = document.getElementById('taxes-fees');
    const interestRateInput = document.getElementById('interest-rate');
    const loanTermSelect = document.getElementById('loan-term');
    const calculateBtn = document.getElementById('calculate-btn');
    
    // Results Elements
    const monthlyPaymentEl = document.getElementById('monthly-payment');
    const loanAmountEl = document.getElementById('loan-amount');
    const totalInterestEl = document.getElementById('total-interest');
    const totalCostEl = document.getElementById('total-cost');
    const principalSegmentEl = document.getElementById('principal-segment');
    const interestSegmentEl = document.getElementById('interest-segment');
    const loanScheduleBodyEl = document.getElementById('loan-schedule-body');
    
    // Modal Elements
    const modalEl = document.getElementById('amortization-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const closeModalButtonEl = document.getElementById('close-modal-btn');
    const viewFullScheduleBtn = document.getElementById('view-full-schedule');
    const printScheduleBtn = document.getElementById('print-schedule');
    const fullScheduleBodyEl = document.getElementById('full-schedule-body');
    const modalLoanAmountEl = document.getElementById('modal-loan-amount');
    const modalLoanTermEl = document.getElementById('modal-loan-term');
    const modalInterestRateEl = document.getElementById('modal-interest-rate');
    const modalMonthlyPaymentEl = document.getElementById('modal-monthly-payment');
    
    // Check if all required elements exist
    const requiredElements = [
        carPriceInput, downPaymentInput, tradeInValueInput, taxesFeesInput,
        interestRateInput, loanTermSelect, calculateBtn, monthlyPaymentEl,
        loanAmountEl, totalInterestEl, totalCostEl, principalSegmentEl,
        interestSegmentEl, loanScheduleBodyEl, modalEl, closeModalBtn,
        closeModalButtonEl, viewFullScheduleBtn, printScheduleBtn,
        fullScheduleBodyEl, modalLoanAmountEl, modalLoanTermEl,
        modalInterestRateEl, modalMonthlyPaymentEl
    ];
    
    // If any element is missing, log error and return
    for (const el of requiredElements) {
        if (!el) {
            console.error('Missing required element for finance calculator');
            return;
        }
    }
    
    // Initialize the calculator
    calculateLoan();
    
    // Event Listeners
    calculateBtn.addEventListener('click', calculateLoan);
    viewFullScheduleBtn.addEventListener('click', showAmortizationModal);
    closeModalBtn.addEventListener('click', hideAmortizationModal);
    closeModalButtonEl.addEventListener('click', hideAmortizationModal);
    printScheduleBtn.addEventListener('click', printAmortizationSchedule);
    
    // Input validation (prevent negative values)
    const numberInputs = [carPriceInput, downPaymentInput, tradeInValueInput, taxesFeesInput, interestRateInput];
    numberInputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.value < 0) {
                this.value = 0;
            }
        });
    });
    
    // Calculate Loan
    function calculateLoan() {
        // Get values from inputs
        const carPrice = parseFloat(carPriceInput.value) || 0;
        const downPayment = parseFloat(downPaymentInput.value) || 0;
        const tradeInValue = parseFloat(tradeInValueInput.value) || 0;
        const taxesFeesPercent = parseFloat(taxesFeesInput.value) || 0;
        const interestRate = parseFloat(interestRateInput.value) || 0;
        const loanTermMonths = parseInt(loanTermSelect.value) || 60;
        
        // Calculate loan details
        const taxesFeesAmount = (carPrice * taxesFeesPercent) / 100;
        const loanAmount = carPrice + taxesFeesAmount - downPayment - tradeInValue;
        
        // Validate loan amount
        if (loanAmount <= 0) {
            showError('Loan amount must be greater than zero');
            return;
        }
        
        // Calculate monthly interest rate
        const monthlyInterestRate = interestRate / 100 / 12;
        
        // Calculate monthly payment
        let monthlyPayment = 0;
        if (interestRate === 0) {
            // No interest, simple division
            monthlyPayment = loanAmount / loanTermMonths;
        } else {
            // Standard loan formula
            monthlyPayment = loanAmount * 
                (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTermMonths)) / 
                (Math.pow(1 + monthlyInterestRate, loanTermMonths) - 1);
        }
        
        // Calculate total payments and interest
        const totalPayments = monthlyPayment * loanTermMonths;
        const totalInterest = totalPayments - loanAmount;
        
        // Update the UI with the results
        monthlyPaymentEl.textContent = formatCurrency(monthlyPayment);
        loanAmountEl.textContent = formatCurrency(loanAmount);
        totalInterestEl.textContent = formatCurrency(totalInterest);
        totalCostEl.textContent = formatCurrency(totalPayments);
        
        // Update the payment chart
        const principalPercentage = (loanAmount / totalPayments * 100).toFixed(2);
        const interestPercentage = (totalInterest / totalPayments * 100).toFixed(2);
        principalSegmentEl.style.width = `${principalPercentage}%`;
        interestSegmentEl.style.width = `${interestPercentage}%`;
        
        // Generate amortization schedule
        const schedule = generateAmortizationSchedule(loanAmount, monthlyInterestRate, monthlyPayment, loanTermMonths);
        
        // Populate loan schedule preview (first 5 payments)
        populateLoanSchedulePreview(schedule.slice(0, 5));
        
        // Store the full schedule for the modal
        window.fullAmortizationSchedule = schedule;
        
        // Update modal summary
        modalLoanAmountEl.textContent = formatCurrency(loanAmount);
        modalLoanTermEl.textContent = `${loanTermMonths} months`;
        modalInterestRateEl.textContent = `${interestRate}%`;
        modalMonthlyPaymentEl.textContent = formatCurrency(monthlyPayment);
        
        // Add animation to highlight the updated result
        monthlyPaymentEl.classList.add('calculated');
        setTimeout(() => {
            monthlyPaymentEl.classList.remove('calculated');
        }, 500);
    }
    
    // Generate amortization schedule
    function generateAmortizationSchedule(loanAmount, monthlyInterestRate, monthlyPayment, loanTermMonths) {
        const schedule = [];
        let remainingBalance = loanAmount;
        
        for (let month = 1; month <= loanTermMonths; month++) {
            // Calculate interest for this period
            const interestPayment = remainingBalance * monthlyInterestRate;
            
            // Calculate principal for this period
            let principalPayment = monthlyPayment - interestPayment;
            
            // Adjust for final payment rounding
            if (month === loanTermMonths) {
                principalPayment = remainingBalance;
                monthlyPayment = principalPayment + interestPayment;
            }
            
            // Calculate new balance
            remainingBalance -= principalPayment;
            
            // Handle floating point errors
            if (remainingBalance < 0.01) {
                remainingBalance = 0;
            }
            
            // Add to schedule
            schedule.push({
                month,
                payment: monthlyPayment,
                principal: principalPayment,
                interest: interestPayment,
                balance: remainingBalance
            });
        }
        
        return schedule;
    }
    
    // Populate loan schedule preview table
    function populateLoanSchedulePreview(scheduleItems) {
        loanScheduleBodyEl.innerHTML = '';
        
        scheduleItems.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.month}</td>
                <td>${formatCurrency(item.payment)}</td>
                <td>${formatCurrency(item.principal)}</td>
                <td>${formatCurrency(item.interest)}</td>
                <td>${formatCurrency(item.balance)}</td>
            `;
            loanScheduleBodyEl.appendChild(row);
        });
    }
    
    // Show amortization modal
    function showAmortizationModal() {
        // Populate full schedule
        populateFullAmortizationSchedule();
        
        // Show modal
        modalEl.classList.add('active');
        
        // Prevent background scrolling
        document.body.style.overflow = 'hidden';
    }
    
    // Hide amortization modal
    function hideAmortizationModal() {
        modalEl.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Populate full amortization schedule
    function populateFullAmortizationSchedule() {
        if (!window.fullAmortizationSchedule) return;
        
        fullScheduleBodyEl.innerHTML = '';
        
        window.fullAmortizationSchedule.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.month}</td>
                <td>${formatCurrency(item.payment)}</td>
                <td>${formatCurrency(item.principal)}</td>
                <td>${formatCurrency(item.interest)}</td>
                <td>${formatCurrency(item.balance)}</td>
            `;
            fullScheduleBodyEl.appendChild(row);
        });
    }
    
    // Print amortization schedule
    function printAmortizationSchedule() {
        const printWindow = window.open('', '_blank');
        
        if (!printWindow) {
            alert('Please allow pop-ups to print the amortization schedule.');
            return;
        }
        
        const loanAmount = modalLoanAmountEl.textContent;
        const loanTerm = modalLoanTermEl.textContent;
        const interestRate = modalInterestRateEl.textContent;
        const monthlyPayment = modalMonthlyPaymentEl.textContent;
        
        let tableRows = '';
        window.fullAmortizationSchedule.forEach(item => {
            tableRows += `
                <tr>
                    <td>${item.month}</td>
                    <td>${formatCurrency(item.payment)}</td>
                    <td>${formatCurrency(item.principal)}</td>
                    <td>${formatCurrency(item.interest)}</td>
                    <td>${formatCurrency(item.balance)}</td>
                </tr>
            `;
        });
        
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Loan Amortization Schedule</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    h1 { text-align: center; margin-bottom: 20px; }
                    .summary { display: flex; justify-content: space-between; margin-bottom: 30px; }
                    .summary-item { text-align: center; }
                    .summary-label { font-size: 14px; color: #666; margin-bottom: 5px; }
                    .summary-value { font-size: 18px; font-weight: bold; }
                    table { width: 100%; border-collapse: collapse; }
                    th { background-color: #f8f9fa; padding: 10px; text-align: left; border-bottom: 2px solid #ddd; }
                    td { padding: 10px; border-bottom: 1px solid #ddd; }
                    @media print {
                        table { page-break-inside: auto; }
                        tr { page-break-inside: avoid; page-break-after: auto; }
                        thead { display: table-header-group; }
                    }
                </style>
            </head>
            <body>
                <h1>Loan Amortization Schedule</h1>
                
                <div class="summary">
                    <div class="summary-item">
                        <div class="summary-label">Loan Amount</div>
                        <div class="summary-value">${loanAmount}</div>
                    </div>
                    <div class="summary-item">
                        <div class="summary-label">Term</div>
                        <div class="summary-value">${loanTerm}</div>
                    </div>
                    <div class="summary-item">
                        <div class="summary-label">Interest Rate</div>
                        <div class="summary-value">${interestRate}</div>
                    </div>
                    <div class="summary-item">
                        <div class="summary-label">Monthly Payment</div>
                        <div class="summary-value">${monthlyPayment}</div>
                    </div>
                </div>
                
                <table>
                    <thead>
                        <tr>
                            <th>Payment #</th>
                            <th>Payment</th>
                            <th>Principal</th>
                            <th>Interest</th>
                            <th>Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tableRows}
                    </tbody>
                </table>
            </body>
            </html>
        `);
        
        printWindow.document.close();
        printWindow.focus();
        
        // Print after a small delay to ensure the content is fully loaded
        setTimeout(() => {
            printWindow.print();
            printWindow.close();
        }, 500);
    }
    
    // Show error message
    function showError(message) {
        // Simple implementation: alert the error
        alert(message);
        
        // A more sophisticated implementation would show an inline error message
        // or a custom notification
    }
    
    // Format currency
    function formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);
    }
});
