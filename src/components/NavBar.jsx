import React from 'react';
import Link from 'next/link'; // Assuming Next.js usage, adjust if needed

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link href="/" className="navbar-logo">
          <img src="/images/logo.svg" alt="Car Marketplace" className="logo-image" />
          <span className="logo-text">Car Marketplace</span>
        </Link>
        
        <div className="nav-links">
          <Link href="/" className="nav-link">Home</Link>
          <Link href="/cars" className="nav-link">Browse Cars</Link>
          <Link href="/sell" className="nav-link">Sell Your Car</Link>
          <Link href="/about" className="nav-link">About Us</Link>
          <Link href="/contact" className="nav-link">Contact</Link>
        </div>
        
        <div className="auth-buttons">
          <Link href="/login" className="btn btn-secondary">Login</Link>
          <Link href="/register" className="btn btn-primary">Register</Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
