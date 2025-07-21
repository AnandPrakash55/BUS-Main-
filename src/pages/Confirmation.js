import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaDownload, FaPrint, FaShare, FaHome, FaBus, FaMapMarkerAlt, FaClock, FaUser } from 'react-icons/fa';
import './Confirmation.css';

const Confirmation = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock booking data
  const mockBooking = {
    id: bookingId,
    status: 'confirmed',
    busOperator: 'Bhole Shanker Express',
    busType: 'AC Sleeper',
    from: 'Mumbai',
    to: 'Pune',
    departureTime: '22:00',
    arrivalTime: '06:00',
    date: '2024-01-15',
    duration: '8h 0m',
    passengers: [
      { name: 'Rahul Sharma', seat: 12, age: 28, gender: 'Male' },
      { name: 'Priya Patel', seat: 13, age: 25, gender: 'Female' }
    ],
    totalAmount: 2400,
    boardingPoint: 'Mumbai Central Bus Stand',
    droppingPoint: 'Pune Bus Stand',
    busNumber: 'BS-001',
    operatorContact: '+91 98765 43210',
    bookingTime: new Date().toLocaleString(),
    cancellationPolicy: 'Free cancellation till 2 hours before departure'
  };

  useEffect(() => {
    setTimeout(() => {
      setBooking(mockBooking);
      setLoading(false);
    }, 1500);
  }, [bookingId]);

  const handleDownloadTicket = () => {
    // Simulate ticket download
    alert('Ticket download started...');
  };

  const handlePrintTicket = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Bus Ticket Confirmed',
        text: `My bus ticket from ${booking.from} to ${booking.to} is confirmed!`,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleGoHome = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Confirming your booking...</p>
      </div>
    );
  }

  return (
    <div className="confirmation-page">
      <div className="container">
        {/* Success Header */}
        <div className="success-header">
          <div className="success-icon">
            <FaCheckCircle />
          </div>
          <h1>Booking Confirmed!</h1>
          <p>Your bus tickets have been successfully booked</p>
          <div className="booking-id">
            Booking ID: <span>{booking.id}</span>
          </div>
        </div>

        <div className="confirmation-content">
          {/* Journey Details */}
          <div className="journey-details card">
            <h2>Journey Details</h2>
            <div className="journey-info">
              <div className="route-info">
                <div className="route">
                  <div className="location">
                    <FaMapMarkerAlt className="location-icon" />
                    <div>
                      <span className="city">{booking.from}</span>
                      <span className="point">{booking.boardingPoint}</span>
                    </div>
                  </div>
                  <div className="route-line">
                    <div className="line"></div>
                    <FaBus className="bus-icon" />
                    <div className="line"></div>
                  </div>
                  <div className="location">
                    <FaMapMarkerAlt className="location-icon" />
                    <div>
                      <span className="city">{booking.to}</span>
                      <span className="point">{booking.droppingPoint}</span>
                    </div>
                  </div>
                </div>
                <div className="journey-meta">
                  <div className="meta-item">
                    <FaClock />
                    <span>{booking.departureTime} - {booking.arrivalTime}</span>
                  </div>
                  <div className="meta-item">
                    <FaUser />
                    <span>{booking.passengers.length} Passenger(s)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bus Details */}
          <div className="bus-details card">
            <h2>Bus Information</h2>
            <div className="bus-info-grid">
              <div className="info-item">
                <span className="label">Bus Operator</span>
                <span className="value">{booking.busOperator}</span>
              </div>
              <div className="info-item">
                <span className="label">Bus Type</span>
                <span className="value">{booking.busType}</span>
              </div>
              <div className="info-item">
                <span className="label">Bus Number</span>
                <span className="value">{booking.busNumber}</span>
              </div>
              <div className="info-item">
                <span className="label">Travel Date</span>
                <span className="value">{new Date(booking.date).toLocaleDateString()}</span>
              </div>
              <div className="info-item">
                <span className="label">Duration</span>
                <span className="value">{booking.duration}</span>
              </div>
              <div className="info-item">
                <span className="label">Operator Contact</span>
                <span className="value">{booking.operatorContact}</span>
              </div>
            </div>
          </div>

          {/* Passenger Details */}
          <div className="passenger-details card">
            <h2>Passenger Details</h2>
            <div className="passengers-list">
              {booking.passengers.map((passenger, index) => (
                <div key={index} className="passenger-item">
                  <div className="passenger-info">
                    <div className="passenger-name">
                      <FaUser />
                      <span>{passenger.name}</span>
                    </div>
                    <div className="passenger-details">
                      <span className="age-gender">{passenger.age} years, {passenger.gender}</span>
                      <span className="seat">Seat {passenger.seat}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Summary */}
          <div className="payment-summary card">
            <h2>Payment Summary</h2>
            <div className="payment-details">
              <div className="payment-item">
                <span>Ticket Price (per seat)</span>
                <span>₹{booking.totalAmount / booking.passengers.length}</span>
              </div>
              <div className="payment-item">
                <span>Number of Passengers</span>
                <span>{booking.passengers.length}</span>
              </div>
              <div className="payment-item total">
                <span>Total Amount Paid</span>
                <span>₹{booking.totalAmount}</span>
              </div>
              <div className="payment-item">
                <span>Payment Status</span>
                <span className="status-success">Paid</span>
              </div>
            </div>
          </div>

          {/* Important Information */}
          <div className="important-info card">
            <h2>Important Information</h2>
            <div className="info-list">
              <div className="info-item">
                <h4>Boarding Instructions</h4>
                <ul>
                  <li>Please arrive at the boarding point 30 minutes before departure</li>
                  <li>Carry a valid ID proof for all passengers</li>
                  <li>Luggage limit: 15kg per passenger</li>
                  <li>Show this ticket or booking ID at the counter</li>
                </ul>
              </div>
              <div className="info-item">
                <h4>Cancellation Policy</h4>
                <p>{booking.cancellationPolicy}</p>
              </div>
              <div className="info-item">
                <h4>Contact Information</h4>
                <p>For any queries, contact us at: {booking.operatorContact}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button className="btn btn-secondary" onClick={handleDownloadTicket}>
            <FaDownload /> Download Ticket
          </button>
          <button className="btn btn-secondary" onClick={handlePrintTicket}>
            <FaPrint /> Print Ticket
          </button>
          <button className="btn btn-secondary" onClick={handleShare}>
            <FaShare /> Share
          </button>
          <button className="btn btn-primary" onClick={handleGoHome}>
            <FaHome /> Book Another Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation; 