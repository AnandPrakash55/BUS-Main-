import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaBus, FaClock, FaMapMarkerAlt, FaStar, FaFilter, FaSort } from 'react-icons/fa';
import { format } from 'date-fns';
import './SearchResults.css';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [buses, setBuses] = useState([]);
  const [filteredBuses, setFilteredBuses] = useState([]);
  const [filters, setFilters] = useState({
    departureTime: 'all',
    busType: 'all',
    priceRange: 'all',
    rating: 'all'
  });
  const [sortBy, setSortBy] = useState('price');
  const [showFilters, setShowFilters] = useState(false);

  // Mock bus data
  const mockBuses = [
    {
      id: 1,
      operator: 'Bhole Shanker Express',
      busType: 'AC Sleeper',
      departureTime: '22:00',
      arrivalTime: '06:00',
      duration: '8h 0m',
      price: 1200,
      rating: 4.5,
      seats: 45,
      amenities: ['WiFi', 'USB Charging', 'Water Bottle', 'Blanket'],
      cancellation: 'Free cancellation till 2 hours before departure'
    },
    {
      id: 2,
      operator: 'Shiv Shanker Travels',
      busType: 'Non-AC Sleeper',
      departureTime: '23:30',
      arrivalTime: '07:30',
      duration: '8h 0m',
      price: 800,
      rating: 4.2,
      seats: 42,
      amenities: ['Water Bottle', 'Blanket'],
      cancellation: 'Free cancellation till 1 hour before departure'
    },
    {
      id: 3,
      operator: 'Mahadev Bus Service',
      busType: 'AC Seater',
      departureTime: '20:00',
      arrivalTime: '04:00',
      duration: '8h 0m',
      price: 1000,
      rating: 4.7,
      seats: 38,
      amenities: ['WiFi', 'USB Charging', 'Water Bottle', 'Snacks'],
      cancellation: 'Free cancellation till 3 hours before departure'
    },
    {
      id: 4,
      operator: 'Bhole Shanker Deluxe',
      busType: 'AC Sleeper',
      departureTime: '21:00',
      arrivalTime: '05:00',
      duration: '8h 0m',
      price: 1400,
      rating: 4.8,
      seats: 40,
      amenities: ['WiFi', 'USB Charging', 'Water Bottle', 'Blanket', 'Snacks', 'Pillow'],
      cancellation: 'Free cancellation till 4 hours before departure'
    }
  ];

  useEffect(() => {
    setBuses(mockBuses);
    setFilteredBuses(mockBuses);
  }, []);

  useEffect(() => {
    let filtered = [...buses];

    // Apply filters
    if (filters.departureTime !== 'all') {
      filtered = filtered.filter(bus => {
        const hour = parseInt(bus.departureTime.split(':')[0]);
        if (filters.departureTime === 'morning') return hour >= 6 && hour < 12;
        if (filters.departureTime === 'afternoon') return hour >= 12 && hour < 18;
        if (filters.departureTime === 'evening') return hour >= 18 && hour < 22;
        if (filters.departureTime === 'night') return hour >= 22 || hour < 6;
        return true;
      });
    }

    if (filters.busType !== 'all') {
      filtered = filtered.filter(bus => bus.busType.toLowerCase().includes(filters.busType.toLowerCase()));
    }

    if (filters.priceRange !== 'all') {
      filtered = filtered.filter(bus => {
        if (filters.priceRange === 'under500') return bus.price < 500;
        if (filters.priceRange === '500to1000') return bus.price >= 500 && bus.price <= 1000;
        if (filters.priceRange === 'above1000') return bus.price > 1000;
        return true;
      });
    }

    if (filters.rating !== 'all') {
      filtered = filtered.filter(bus => bus.rating >= parseFloat(filters.rating));
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'departure') return a.departureTime.localeCompare(b.departureTime);
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'duration') return a.duration.localeCompare(b.duration);
      return 0;
    });

    setFilteredBuses(filtered);
  }, [buses, filters, sortBy]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const handleBusSelect = (busId) => {
    navigate(`/bus/${busId}`);
  };

  const searchData = location.state || { from: 'Patana', to: 'Tata', date: new Date() };

  return (
    <div className="search-results">
      <div className="container">
        {/* Search Summary */}
        <div className="search-summary">
          <div className="search-info">
            <h1>Buses from {searchData.from} to {searchData.to}</h1>
            <p>{format(searchData.date, 'EEEE, MMMM do, yyyy')}</p>
          </div>
          <div className="search-actions">
            <button 
              className="btn btn-secondary filter-btn"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FaFilter /> Filters
            </button>
            <select 
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="price">Sort by Price</option>
              <option value="departure">Sort by Departure</option>
              <option value="rating">Sort by Rating</option>
              <option value="duration">Sort by Duration</option>
            </select>
          </div>
        </div>

        <div className="results-container">
          {/* Filters Sidebar */}
          <div className={`filters-sidebar ${showFilters ? 'show' : ''}`}>
            <h3>Filters</h3>
            
            <div className="filter-group">
              <label>Departure Time</label>
              <select 
                value={filters.departureTime}
                onChange={(e) => handleFilterChange('departureTime', e.target.value)}
              >
                <option value="all">All Times</option>
                <option value="morning">Morning (6 AM - 12 PM)</option>
                <option value="afternoon">Afternoon (12 PM - 6 PM)</option>
                <option value="evening">Evening (6 PM - 10 PM)</option>
                <option value="night">Night (10 PM - 6 AM)</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Bus Type</label>
              <select 
                value={filters.busType}
                onChange={(e) => handleFilterChange('busType', e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="AC Sleeper">AC Sleeper</option>
                <option value="Non-AC Sleeper">Non-AC Sleeper</option>
                <option value="AC Seater">AC Seater</option>
                <option value="Non-AC Seater">Non-AC Seater</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Price Range</label>
              <select 
                value={filters.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
              >
                <option value="all">All Prices</option>
                <option value="under500">Under ₹500</option>
                <option value="500to1000">₹500 - ₹1000</option>
                <option value="above1000">Above ₹1000</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Rating</label>
              <select 
                value={filters.rating}
                onChange={(e) => handleFilterChange('rating', e.target.value)}
              >
                <option value="all">All Ratings</option>
                <option value="4.5">4.5+ Stars</option>
                <option value="4.0">4.0+ Stars</option>
                <option value="3.5">3.5+ Stars</option>
              </select>
            </div>
          </div>

          {/* Bus Results */}
          <div className="bus-results">
            {filteredBuses.length === 0 ? (
              <div className="no-results">
                <h3>No buses found</h3>
                <p>Try adjusting your filters or search for a different route.</p>
              </div>
            ) : (
              filteredBuses.map(bus => (
                <div key={bus.id} className="bus-card" onClick={() => handleBusSelect(bus.id)}>
                  <div className="bus-header">
                    <div className="bus-operator">
                      <h3>{bus.operator}</h3>
                      <div className="bus-rating">
                        <FaStar className="star-icon" />
                        <span>{bus.rating}</span>
                      </div>
                    </div>
                    <div className="bus-type">
                      <FaBus />
                      <span>{bus.busType}</span>
                    </div>
                  </div>

                  <div className="bus-details">
                    <div className="time-details">
                      <div className="departure">
                        <span className="time">{bus.departureTime}</span>
                        <span className="label">Departure</span>
                      </div>
                      <div className="duration">
                        <span className="duration-text">{bus.duration}</span>
                        <div className="route-line">
                          <FaMapMarkerAlt className="start-point" />
                          <div className="line"></div>
                          <FaMapMarkerAlt className="end-point" />
                        </div>
                      </div>
                      <div className="arrival">
                        <span className="time">{bus.arrivalTime}</span>
                        <span className="label">Arrival</span>
                      </div>
                    </div>

                    <div className="bus-info">
                      <div className="seats">
                        <span>{bus.seats} seats available</span>
                      </div>
                      <div className="amenities">
                        {bus.amenities.map((amenity, index) => (
                          <span key={index} className="amenity">{amenity}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bus-footer">
                    <div className="price-section">
                      <div className="price">
                        <span className="currency">₹</span>
                        <span className="amount">{bus.price}</span>
                      </div>
                      <div className="cancellation">{bus.cancellation}</div>
                    </div>
                    <button className="btn btn-primary select-btn">
                      Select Seats
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults; 