import React, { useState } from 'react';
import { useRouter } from 'next/router';

const SearchBar = ({ className = '' }) => {
  const router = useRouter();
  const [searchParams, setSearchParams] = useState({
    query: '',
    make: '',
    priceMin: '',
    priceMax: '',
    yearMin: '',
    yearMax: ''
  });
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    
    // Build query parameters
    const params = new URLSearchParams();
    
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    
    router.push(`/cars?${params.toString()}`);
  };

  const toggleAdvanced = () => {
    setIsAdvancedOpen(!isAdvancedOpen);
  };

  return (
    <div className={`search-bar ${className}`}>
      <form onSubmit={handleSearch}>
        <div className="search-main">
          <input
            type="text"
            name="query"
            value={searchParams.query}
            onChange={handleInputChange}
            placeholder="Search by make, model, or keyword..."
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
          <button 
            type="button" 
            className="advanced-toggle"
            onClick={toggleAdvanced}
          >
            {isAdvancedOpen ? 'Less filters' : 'More filters'}
          </button>
        </div>
        
        {isAdvancedOpen && (
          <div className="advanced-search">
            <div className="filter-row">
              <div className="filter-group">
                <label htmlFor="make">Make</label>
                <select 
                  id="make" 
                  name="make" 
                  value={searchParams.make}
                  onChange={handleInputChange}
                >
                  <option value="">Any Make</option>
                  <option value="Toyota">Toyota</option>
                  <option value="Honda">Honda</option>
                  <option value="Ford">Ford</option>
                  <option value="BMW">BMW</option>
                  <option value="Mercedes">Mercedes</option>
                  <option value="Audi">Audi</option>
                  <option value="Tesla">Tesla</option>
                </select>
              </div>
              
              <div className="filter-group price-range">
                <label>Price Range</label>
                <div className="range-inputs">
                  <input 
                    type="number" 
                    name="priceMin"
                    placeholder="Min" 
                    value={searchParams.priceMin}
                    onChange={handleInputChange}
                  />
                  <span className="range-separator">to</span>
                  <input 
                    type="number" 
                    name="priceMax"
                    placeholder="Max" 
                    value={searchParams.priceMax}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="filter-group year-range">
                <label>Year Range</label>
                <div className="range-inputs">
                  <input 
                    type="number" 
                    name="yearMin"
                    placeholder="Min" 
                    value={searchParams.yearMin}
                    onChange={handleInputChange}
                  />
                  <span className="range-separator">to</span>
                  <input 
                    type="number" 
                    name="yearMax"
                    placeholder="Max" 
                    value={searchParams.yearMax}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
