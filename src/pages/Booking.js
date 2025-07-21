import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaUser, FaPhone, FaEnvelope, FaCreditCard, FaArrowLeft } from 'react-icons/fa';
import './Booking.css';

const Booking = () => {
  const { busId } = useParams();
  const navigate = useNavigate();
  const [bus, setBus] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [passengerDetails, setPassengerDetails] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(true);

  // Mock bus data
  const mockBus = {
    id: busId,
    operator: 'Bhole Shanker Express',
    busType: 'AC Sleeper',
    departureTime: '22:00',
    arrivalTime: '06:00',
    duration: '8h 0m',
    price: 1200,
    totalSeats: 45,
    availableSeats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    bookedSeats: [3, 7, 12, 18, 25, 31, 38, 42]
  };

  useEffect(() => {
    setTimeout(() => {
      setBus(mockBus);
      setLoading(false);
    }, 1000);
  }, [busId]);

  const handleSeatSelect = (seatNumber) => {
    if (mockBus.bookedSeats.includes(seatNumber)) return;
    
    setSelectedSeats(prev => {
      if (prev.includes(seatNumber)) {
        return prev.filter(seat => seat !== seatNumber);
      } else {
        return [...prev, seatNumber];
      }
    });
  };

  const handlePassengerChange = (index, field, value) => {
    const updatedPassengers = [...passengerDetails];
    updatedPassengers[index] = { ...updatedPassengers[index], [field]: value };
    setPassengerDetails(updatedPassengers);
  };

  const handleNext = () => {
    if (currentStep === 1 && selectedSeats.length > 0) {
      // Initialize passenger details for selected seats
      const newPassengerDetails = selectedSeats.map(seat => ({
        seatNumber: seat,
        name: '',
        age: '',
        gender: '',
        phone: '',
        email: ''
      }));
      setPassengerDetails(newPassengerDetails);
      setCurrentStep(2);
    } else if (currentStep === 2) {
      // Validate passenger details
      const isValid = passengerDetails.every(passenger => 
        passenger.name && passenger.age && passenger.gender && passenger.phone
      );
      if (isValid) {
        setCurrentStep(3);
      } else {
        alert('Please fill all required passenger details');
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate(`/bus/${busId}`);
    }
  };

  const handlePayment = () => {
    // Simulate payment processing
    const bookingId = Math.random().toString(36).substr(2, 9).toUpperCase();
    navigate(`/confirmation/${bookingId}`);
  };

  const totalAmount = selectedSeats.length * bus?.price || 0;

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading booking details...</p>
      </div>
    );
  }

  return (
    <div className="booking-page">
      <div className="container">
        {/* Booking Header */}
        <div className="booking-header">
          <button className="back-btn" onClick={handleBack}>
            <FaArrowLeft /> Back
          </button>
          <h1>Book Your Tickets</h1>
          <div className="booking-steps">
            <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
              <span className="step-number">1</span>
              <span className="step-text">Select Seats</span>
            </div>
            <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
              <span className="step-number">2</span>
              <span className="step-text">Passenger Details</span>
            </div>
            <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
              <span className="step-number">3</span>
              <span className="step-text">Payment</span>
            </div>
          </div>
        </div>

        <div className="booking-content">
          {/* Bus Summary */}
          <div className="bus-summary card">
            <h3>Journey Details</h3>
            <div className="journey-info">
              <div className="route">
                <span className="from">Mumbai</span>
                <span className="arrow">→</span>
                <span className="to">Pune</span>
              </div>
              <div className="details">
                <span>{bus.operator} • {bus.busType}</span>
                <span>Departure: {bus.departureTime} • Duration: {bus.duration}</span>
              </div>
            </div>
          </div>

          {/* Step 1: Seat Selection */}
          {currentStep === 1 && (
            <div className="seat-selection card">
              <h3>Select Your Seats</h3>
              <div className="seat-map">
                <div className="driver-area">
                  <span>Driver</span>
                </div>
                <div className="seats-container">
                  {Array.from({ length: Math.ceil(bus.totalSeats / 4) }, (_, row) => (
                    <div key={row} className="seat-row">
                      {Array.from({ length: 4 }, (_, col) => {
                        const seatNumber = row * 4 + col + 1;
                        if (seatNumber > bus.totalSeats) return null;
                        
                        const isBooked = bus.bookedSeats.includes(seatNumber);
                        const isSelected = selectedSeats.includes(seatNumber);
                        
                        return (
                          <button
                            key={seatNumber}
                            className={`seat ${isBooked ? 'booked' : ''} ${isSelected ? 'selected' : ''}`}
                            onClick={() => handleSeatSelect(seatNumber)}
                            disabled={isBooked}
                          >
                            {seatNumber}
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
                <div className="seat-legend">
                  <div className="legend-item">
                    <div className="legend-seat available"></div>
                    <span>Available</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-seat selected"></div>
                    <span>Selected</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-seat booked"></div>
                    <span>Booked</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Passenger Details */}
          {currentStep === 2 && (
            <div className="passenger-details card">
              <h3>Passenger Details</h3>
              {passengerDetails.map((passenger, index) => (
                <div key={index} className="passenger-form">
                  <h4>Passenger {index + 1} - Seat {passenger.seatNumber}</h4>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Full Name *</label>
                      <input
                        type="text"
                        value={passenger.name}
                        onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
                        placeholder="Enter full name"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Age *</label>
                      <input
                        type="number"
                        value={passenger.age}
                        onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
                        placeholder="Age"
                        min="1"
                        max="120"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Gender *</label>
                      <select
                        value={passenger.gender}
                        onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
                        required
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Phone Number *</label>
                      <input
                        type="tel"
                        value={passenger.phone}
                        onChange={(e) => handlePassengerChange(index, 'phone', e.target.value)}
                        placeholder="Enter phone number"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        value={passenger.email}
                        onChange={(e) => handlePassengerChange(index, 'email', e.target.value)}
                        placeholder="Enter email (optional)"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Step 3: Payment */}
          {currentStep === 3 && (
            <div className="payment-section card">
              <h3>Payment Details</h3>
              <div className="payment-methods">
                <div className="payment-method">
                  <input type="radio" id="card" name="payment" defaultChecked />
                  <label htmlFor="card">
                    <FaCreditCard />
                    <span>Credit/Debit Card</span>
                  </label>
                </div>
                <div className="payment-method">
                  <input type="radio" id="upi" name="payment" />
                  <label htmlFor="upi">
                    <FaCreditCard />
                    <span>UPI</span>
                  </label>
                </div>
                <div className="payment-method">
                  <input type="radio" id="netbanking" name="payment" />
                  <label htmlFor="netbanking">
                    <FaCreditCard />
                    <span>Net Banking</span>
                  </label>
                </div>
              </div>
              
              <div className="payment-form">
                <div className="form-group">
                  <label>Card Number</label>
                  <input type="text" placeholder="1234 5678 9012 3456" />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Expiry Date</label>
                    <input type="text" placeholder="MM/YY" />
                  </div>
                  <div className="form-group">
                    <label>CVV</label>
                    <input type="text" placeholder="123" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Card Holder Name</label>
                  <input type="text" placeholder="Enter card holder name" />
                </div>
              </div>
            </div>
          )}

          {/* Booking Summary */}
          <div className="booking-summary card">
            <h3>Booking Summary</h3>
            <div className="summary-details">
              <div className="summary-item">
                <span>Selected Seats:</span>
                <span>{selectedSeats.join(', ')}</span>
              </div>
              <div className="summary-item">
                <span>Number of Passengers:</span>
                <span>{selectedSeats.length}</span>
              </div>
              <div className="summary-item">
                <span>Price per Seat:</span>
                <span>₹{bus.price}</span>
              </div>
              <div className="summary-item total">
                <span>Total Amount:</span>
                <span>₹{totalAmount}</span>
              </div>
            </div>
            
            <div className="booking-actions">
              {currentStep > 1 && (
                <button className="btn btn-secondary" onClick={handleBack}>
                  Back
                </button>
              )}
              {currentStep < 3 ? (
                <button 
                  className="btn btn-primary" 
                  onClick={handleNext}
                  disabled={currentStep === 1 && selectedSeats.length === 0}
                >
                  {currentStep === 1 ? 'Continue' : 'Proceed to Payment'}
                </button>
              ) : (
                <button className="btn btn-primary" onClick={handlePayment}>
                  Pay ₹{totalAmount}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking; 