import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaBus, FaStar, FaClock, FaMapMarkerAlt, FaUsers, FaShieldAlt, FaWifi, FaPlug, FaWater, FaBed } from 'react-icons/fa';
import './BusDetails.css';

const BusDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bus, setBus] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock bus data
  const mockBusData = {
    1: {
      id: 1,
      operator: 'Bhole Shanker Express',
      busType: 'AC Sleeper',
      departureTime: '22:00',
      arrivalTime: '06:00',
      duration: '8h 0m',
      price: 1200,
      rating: 4.5,
      totalSeats: 45,
      availableSeats: 32,
      amenities: ['WiFi', 'USB Charging', 'Water Bottle', 'Blanket'],
      cancellation: 'Free cancellation till 2 hours before departure',
      boardingPoint: 'Mumbai Central Bus Stand',
      droppingPoint: 'Pune Bus Stand',
      busNumber: 'BS-001',
      operatorContact: '+91 98765 43210',
      description: 'Premium AC sleeper bus with comfortable berths and modern amenities. Perfect for overnight travel with maximum comfort and safety.',
      policies: [
        'Boarding starts 30 minutes before departure',
        'Valid ID proof required for all passengers',
        'Luggage limit: 15kg per passenger',
        'No smoking or alcohol consumption allowed',
        'Children below 5 years travel free'
      ]
    }
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setBus(mockBusData[id] || mockBusData[1]);
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleBookNow = () => {
    navigate(`/booking/${id}`);
  };

  const getAmenityIcon = (amenity) => {
    switch (amenity.toLowerCase()) {
      case 'wifi': return <FaWifi />;
      case 'usb charging': return <FaPlug />;
      case 'water bottle': return <FaWater />;
      case 'blanket': return <FaBed />;
      default: return <FaShieldAlt />;
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading bus details...</p>
      </div>
    );
  }

  if (!bus) {
    return (
      <div className="error">
        <h2>Bus not found</h2>
        <p>The bus you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <div className="bus-details-page">
      <div className="container">
        {/* Bus Header */}
        <div className="bus-header-section">
          <div className="bus-basic-info">
            <div className="bus-operator-info">
              <h1>{bus.operator}</h1>
              <div className="bus-rating">
                <FaStar className="star-icon" />
                <span>{bus.rating}</span>
                <span className="rating-text">Excellent</span>
              </div>
            </div>
            <div className="bus-type-badge">
              <FaBus />
              <span>{bus.busType}</span>
            </div>
          </div>
          
          <div className="bus-actions">
            <div className="price-display">
              <span className="currency">₹</span>
              <span className="amount">{bus.price}</span>
              <span className="per-seat">per seat</span>
            </div>
            <button className="btn btn-primary book-now-btn" onClick={handleBookNow}>
              Book Now
            </button>
          </div>
        </div>

        <div className="bus-details-grid">
          {/* Journey Details */}
          <div className="journey-details card">
            <h2>Journey Details</h2>
            <div className="journey-timeline">
              <div className="timeline-item">
                <div className="time-info">
                  <span className="time">{bus.departureTime}</span>
                  <span className="label">Departure</span>
                </div>
                <div className="location">
                  <FaMapMarkerAlt />
                  <span>{bus.boardingPoint}</span>
                </div>
              </div>
              
              <div className="journey-duration">
                <FaClock />
                <span>{bus.duration}</span>
              </div>
              
              <div className="timeline-item">
                <div className="time-info">
                  <span className="time">{bus.arrivalTime}</span>
                  <span className="label">Arrival</span>
                </div>
                <div className="location">
                  <FaMapMarkerAlt />
                  <span>{bus.droppingPoint}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bus Information */}
          <div className="bus-info card">
            <h2>Bus Information</h2>
            <div className="info-grid">
              <div className="info-item">
                <span className="label">Bus Number</span>
                <span className="value">{bus.busNumber}</span>
              </div>
              <div className="info-item">
                <span className="label">Total Seats</span>
                <span className="value">{bus.totalSeats}</span>
              </div>
              <div className="info-item">
                <span className="label">Available Seats</span>
                <span className="value available">{bus.availableSeats}</span>
              </div>
              <div className="info-item">
                <span className="label">Operator Contact</span>
                <span className="value">{bus.operatorContact}</span>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="amenities-section card">
            <h2>Amenities</h2>
            <div className="amenities-grid">
              {bus.amenities.map((amenity, index) => (
                <div key={index} className="amenity-item">
                  <div className="amenity-icon">
                    {getAmenityIcon(amenity)}
                  </div>
                  <span className="amenity-name">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cancellation Policy */}
          <div className="cancellation-policy card">
            <h2>Cancellation Policy</h2>
            <div className="policy-content">
              <div className="policy-badge">
                <FaShieldAlt />
                <span>{bus.cancellation}</span>
              </div>
            </div>
          </div>

          {/* Bus Description */}
          <div className="bus-description card">
            <h2>About This Bus</h2>
            <p>{bus.description}</p>
          </div>

          {/* Travel Policies */}
          <div className="travel-policies card">
            <h2>Travel Policies</h2>
            <ul className="policies-list">
              {bus.policies.map((policy, index) => (
                <li key={index}>{policy}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Booking CTA */}
        <div className="booking-cta">
          <div className="cta-content">
            <div className="cta-info">
              <h3>Ready to Book?</h3>
              <p>Only {bus.availableSeats} seats left at ₹{bus.price} each</p>
            </div>
            <button className="btn btn-primary cta-btn" onClick={handleBookNow}>
              Book Now - ₹{bus.price}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusDetails; 