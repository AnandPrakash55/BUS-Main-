import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBus, FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaShieldAlt, FaHeadset, FaGift } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    date: new Date(),
    passengers: 1
  });

  const popularCities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 
    'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow'
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchData.from && searchData.to) {
      navigate('/search', { 
        state: { 
          from: searchData.from, 
          to: searchData.to, 
          date: searchData.date,
          passengers: searchData.passengers
        } 
      });
    }
  };

  const handleCitySelect = (field, city) => {
    setSearchData(prev => ({ ...prev, [field]: city }));
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <h1 className="hero-title">Book Bus Tickets Online</h1>
          <p className="hero-subtitle">
            Travel across India with Bhole Shanker - Safe, Reliable & Affordable
          </p>
          
          {/* Search Form */}
          <div className="search-container">
            <form onSubmit={handleSearch} className="search-form">
              <div className="form-group">
                <label className="form-label">From</label>
                <div className="input-with-icon">
                  <FaMapMarkerAlt className="input-icon" />
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Leaving from..."
                    value={searchData.from}
                    onChange={(e) => setSearchData(prev => ({ ...prev, from: e.target.value }))}
                    required
                  />
                </div>
                {searchData.from && (
                  <div className="city-suggestions">
                    {popularCities
                      .filter(city => city.toLowerCase().includes(searchData.from.toLowerCase()))
                      .map(city => (
                        <div 
                          key={city} 
                          className="city-suggestion"
                          onClick={() => handleCitySelect('from', city)}
                        >
                          {city}
                        </div>
                      ))}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">To</label>
                <div className="input-with-icon">
                  <FaMapMarkerAlt className="input-icon" />
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Going to..."
                    value={searchData.to}
                    onChange={(e) => setSearchData(prev => ({ ...prev, to: e.target.value }))}
                    required
                  />
                </div>
                {searchData.to && (
                  <div className="city-suggestions">
                    {popularCities
                      .filter(city => city.toLowerCase().includes(searchData.to.toLowerCase()))
                      .map(city => (
                        <div 
                          key={city} 
                          className="city-suggestion"
                          onClick={() => handleCitySelect('to', city)}
                        >
                          {city}
                        </div>
                      ))}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Date of Journey</label>
                <div className="input-with-icon">
                  <FaCalendarAlt className="input-icon" />
                  <DatePicker
                    selected={searchData.date}
                    onChange={(date) => setSearchData(prev => ({ ...prev, date }))}
                    minDate={new Date()}
                    className="form-input"
                    placeholderText="Select date"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Passengers</label>
                <div className="input-with-icon">
                  <FaUsers className="input-icon" />
                  <select
                    className="form-input"
                    value={searchData.passengers}
                    onChange={(e) => setSearchData(prev => ({ ...prev, passengers: parseInt(e.target.value) }))}
                  >
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button type="submit" className="search-btn">
                Search Buses
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose Bhole Shanker?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <FaShieldAlt className="feature-icon" />
              <h3 className="feature-title">Safe Travel</h3>
              <p className="feature-description">
                All our buses are verified and follow strict safety protocols. 
                Travel with peace of mind.
              </p>
            </div>

            <div className="feature-card">
              <FaGift className="feature-icon" />
              <h3 className="feature-title">Best Offers</h3>
              <p className="feature-description">
                Get the best prices and exclusive discounts on bus tickets. 
                Save more on every journey.
              </p>
            </div>

            <div className="feature-card">
              <FaHeadset className="feature-icon" />
              <h3 className="feature-title">24/7 Support</h3>
              <p className="feature-description">
                Our customer support team is available round the clock to 
                help you with any queries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Routes Section */}
      <section className="routes-section">
        <div className="container">
          <h2 className="section-title">Popular Routes</h2>
          <div className="routes-grid">
            {[
              { from: 'Mumbai', to: 'Pune', price: '₹200' },
              { from: 'Delhi', to: 'Jaipur', price: '₹400' },
              { from: 'Bangalore', to: 'Chennai', price: '₹350' },
              { from: 'Kolkata', to: 'Hyderabad', price: '₹800' },
              { from: 'Ahmedabad', to: 'Mumbai', price: '₹600' },
              { from: 'Lucknow', to: 'Delhi', price: '₹300' }
            ].map((route, index) => (
              <div key={index} className="route-card" onClick={() => {
                setSearchData({
                  from: route.from,
                  to: route.to,
                  date: new Date(),
                  passengers: 1
                });
                navigate('/search', { 
                  state: { 
                    from: route.from, 
                    to: route.to, 
                    date: new Date(),
                    passengers: 1
                  } 
                });
              }}>
                <div className="route-info">
                  <div className="route-cities">
                    <span className="route-from">{route.from}</span>
                    <FaBus className="route-arrow" />
                    <span className="route-to">{route.to}</span>
                  </div>
                  <div className="route-price">Starting from {route.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 