# AutoMarket - Car Marketplace

A comprehensive car marketplace website where users can browse, search, and compare cars for sale, as well as access tools like finance calculators.

## Features

- **Browse Cars**: View featured and newest cars with detailed specifications
- **Search Functionality**: Find cars by make, model, price, and other criteria
- **Car Categories**: Browse cars by type (sedan, SUV, hatchback, etc.)
- **Popular Makes**: Quick access to popular car brands
- **Finance Calculator**: Calculate car loan payments with detailed amortization schedules
- **Mobile Responsive**: Optimized for all device sizes
- **Lazy Loading**: Efficient image loading for better performance
- **Error Handling**: Fallback images and graceful error handling

## Installation & Setup

1. Clone the repository:
   ```
   git clone https://github.com/your-username/car-marketplace.git
   cd car-marketplace
   ```

2. No build process is required for basic usage. Simply open `index.html` in your browser.

3. For development with live reloading, you can use a tool like Live Server in VS Code.

## Directory Structure

## Getting Started

To run this application locally, follow these steps:

1. **Create placeholder images:**
   - Open `images/create-placeholders.html` in your browser
   - Click each "Download" button to save the placeholder images
   - Make sure all placeholder images are in the `images` folder

2. **Open the application:**
   - Open `index.html` in your web browser to view the homepage
   - Navigate through the website using the navigation menu

## Testing the Application

- **User Authentication:**
  - Register a new account via `register.html`
  - Login with your credentials via `login.html`
  - Access your dashboard at `user-dashboard.html`

- **Car Search and Browsing:**
  - Browse featured cars on the homepage
  - Use the search form to filter cars
  - View detailed information about a car by clicking "View Details"

- **Saving and Comparing Cars:**
  - Click the heart icon to save a car to your favorites
  - Add cars to compare list using the compare button
  - View your comparison at `compare.html`

- **Dealer Features:**
  - Access the dealer dashboard at `dealer-dashboard.html`
  - View inventory management and performance metrics

## Important Notes

This is a frontend demonstration using HTML, CSS, and JavaScript. It uses LocalStorage to maintain state and dummy data for demonstration purposes. In a production environment, this would connect to a backend API for real data.

The placeholder image utility ensures the application functions properly even without all the car images.
