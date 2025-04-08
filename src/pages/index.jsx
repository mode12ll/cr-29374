import React from 'react';
import Head from 'next/head';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import CarCard from '../components/CarCard';
import SearchBar from '../components/SearchBar';
import { getImageUrl } from '../utils/imageUtils';

export default function Home() {
  // Sample car data with Unsplash images
  const featuredCars = [
    {
      id: 1,
      make: 'BMW',
      model: '3 Series',
      year: 2022,
      price: 45999,
      mileage: 12500,
      transmission: 'Automatic',
      imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      featured: true
    },
    {
      id: 2,
      make: 'Tesla',
      model: 'Model 3',
      year: 2023,
      price: 52990,
      mileage: 5000,
      transmission: 'Electric',
      imageUrl: 'https://images.unsplash.com/photo-1561733179-584471270b35?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      featured: true
    },
    {
      id: 3,
      make: 'Audi',
      model: 'Q5',
      year: 2021,
      price: 49500,
      mileage: 18700,
      transmission: 'Automatic',
      imageUrl: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      featured: false
    }
  ];
  
  const latestCars = [
    {
      id: 4,
      make: 'Mercedes-Benz',
      model: 'E-Class',
      year: 2022,
      price: 62000,
      mileage: 9800,
      transmission: 'Automatic',
      imageUrl: 'https://images.unsplash.com/photo-1617814076941-251d99aec70a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      featured: false
    },
    {
      id: 5,
      make: 'Toyota',
      model: 'RAV4',
      year: 2023,
      price: 39500,
      mileage: 3200,
      transmission: 'Automatic',
      imageUrl: 'https://images.unsplash.com/photo-1581540222194-0def2d24a8c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      featured: false
    },
    {
      id: 6,
      make: 'Honda',
      model: 'Civic',
      year: 2023,
      price: 28900,
      mileage: 1500,
      transmission: 'Automatic',
      imageUrl: 'https://images.unsplash.com/photo-1598261816014-6f4dbfc371fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      featured: false
    }
  ];

  return (
    <div className="homepage">
      <Head>
        <title>Car Marketplace - Find Your Perfect Vehicle</title>
        <meta name="description" content="Find and sell cars with our easy-to-use marketplace" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </Head>
      
      <NavBar />
      
      <main>
        <section className="hero-section">
          <div className="container">
            <div className="hero-content">
              <h1>Find Your Perfect Car</h1>
              <p>Browse thousands of cars from trusted sellers across the country</p>
              <SearchBar className="hero-search" />
            </div>
          </div>
        </section>
        
        <section className="featured-section">
          <div className="container">
            <h2 className="section-title">Featured Vehicles</h2>
            <div className="car-grid">
              {featuredCars.map(car => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          </div>
        </section>
        
        <section className="info-section">
          <div className="container">
            <div className="info-grid">
              <div className="info-card">
                <div className="info-icon"><i className="fas fa-car"></i></div>
                <h3>Wide Selection</h3>
                <p>Choose from thousands of certified and verified vehicles</p>
              </div>
              <div className="info-card">
                <div className="info-icon"><i className="fas fa-shield-alt"></i></div>
                <h3>Trusted Sellers</h3>
                <p>Every seller is verified and reviewed by our community</p>
              </div>
              <div className="info-card">
                <div className="info-icon"><i className="fas fa-tag"></i></div>
                <h3>Great Deals</h3>
                <p>Find competitive prices and special offers</p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="latest-section">
          <div className="container">
            <h2 className="section-title">Latest Additions</h2>
            <div className="car-grid">
              {latestCars.map(car => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          </div>
        </section>
        
        <section className="cta-section">
          <div className="container">
            <div className="cta-content">
              <h2>Ready to Sell Your Car?</h2>
              <p>List your vehicle and reach thousands of potential buyers</p>
              <a href="/sell" className="btn btn-primary btn-large">Sell Your Car</a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
