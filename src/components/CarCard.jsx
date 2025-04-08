import React, { useState, useEffect } from 'react';
import { getImageUrl, isImageValid } from '../utils/imageUtils';
import Link from 'next/link';

const CarCard = ({ car }) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const fallbackImage = 'https://images.unsplash.com/photo-1550355291-bbee04a92027?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
  
  useEffect(() => {
    const checkImage = async () => {
      if (car.imageUrl) {
        const isValidImg = await isImageValid(car.imageUrl);
        setImageError(!isValidImg);
      } else {
        setImageError(true);
      }
      setIsLoading(false);
    };
    
    checkImage();
  }, [car.imageUrl]);

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(car.price);
  
  return (
    <div className="car-card">
      <div className="car-image-container">
        {isLoading && <div className="image-skeleton"></div>}
        <img 
          src={imageError ? fallbackImage : car.imageUrl} 
          alt={`${car.make} ${car.model}`}
          onError={() => setImageError(true)}
          className={`car-image ${isLoading ? 'hidden' : ''}`}
          onLoad={() => setIsLoading(false)}
        />
        {car.featured && <span className="featured-badge">Featured</span>}
      </div>
      
      <div className="car-details">
        <div className="car-header">
          <h3 className="car-title">{car.make} {car.model}</h3>
          <p className="car-price">{formattedPrice}</p>
        </div>
        
        <div className="car-specs">
          <div className="spec-item">
            <span className="spec-icon"><i className="fas fa-cog"></i></span>
            <span>{car.transmission}</span>
          </div>
          <div className="spec-item">
            <span className="spec-icon"><i className="fas fa-calendar-alt"></i></span>
            <span>{car.year}</span>
          </div>
          <div className="spec-item">
            <span className="spec-icon"><i className="fas fa-road"></i></span>
            <span>{car.mileage.toLocaleString()} mi</span>
          </div>
        </div>
        
        <Link href={`/cars/${car.id}`} className="view-details-btn">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default CarCard;
