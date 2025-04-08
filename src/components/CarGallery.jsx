import React, { useState, useEffect } from 'react';
import { preloadImages } from '../utils/imageUtils';

const CarGallery = ({ images = [], alt = 'Car image' }) => {
  const [loadedImages, setLoadedImages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const fallbackImage = '/images/car-placeholder.jpg';

  useEffect(() => {
    const loadImages = async () => {
      setIsLoading(true);
      const validImages = await preloadImages(images);
      
      // If no valid images, use fallback
      if (validImages.length === 0) {
        setLoadedImages([fallbackImage]);
      } else {
        setLoadedImages(validImages);
      }
      
      setIsLoading(false);
    };
    
    loadImages();
  }, [images]);

  const handleThumbnailClick = (index) => {
    setActiveIndex(index);
  };

  const handleNext = () => {
    setActiveIndex((current) => 
      current === loadedImages.length - 1 ? 0 : current + 1
    );
  };

  const handlePrevious = () => {
    setActiveIndex((current) => 
      current === 0 ? loadedImages.length - 1 : current - 1
    );
  };

  if (isLoading) {
    return (
      <div className="car-gallery">
        <div className="main-image-container">
          <div className="image-skeleton"></div>
        </div>
        <div className="thumbnails-container">
          {[1, 2, 3, 4].map((_, index) => (
            <div key={index} className="thumbnail-skeleton"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="car-gallery">
      <div className="main-image-container">
        <img 
          src={loadedImages[activeIndex]} 
          alt={alt} 
          className="main-gallery-image" 
        />
        
        {loadedImages.length > 1 && (
          <>
            <button 
              onClick={handlePrevious} 
              className="gallery-nav gallery-nav-prev"
              aria-label="Previous image"
            >
              ‹
            </button>
            <button 
              onClick={handleNext} 
              className="gallery-nav gallery-nav-next"
              aria-label="Next image"
            >
              ›
            </button>
          </>
        )}
      </div>
      
      {loadedImages.length > 1 && (
        <div className="thumbnails-container">
          {loadedImages.map((image, index) => (
            <div 
              key={index}
              className={`thumbnail ${index === activeIndex ? 'active' : ''}`}
              onClick={() => handleThumbnailClick(index)}
            >
              <img src={image} alt={`${alt} thumbnail ${index + 1}`} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CarGallery;
