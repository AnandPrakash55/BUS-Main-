import React from 'react';
import { Link } from 'react-router-dom';
import { FaBus, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <FaBus className="footer-logo-icon" />
              <span className="footer-logo-text">Bhole Shanker</span>
            </div>
            <p className="footer-description">
              Your trusted partner for safe and comfortable bus travel across India. 
              Book tickets online with the best prices and offers.
            </p>
            <div className="social-links">
              <a href="#" className="social-link"><FaFacebook /></a>
              <a href="#" className="social-link"><FaTwitter /></a>
              <a href="#" className="social-link"><FaInstagram /></a>
              <a href="#" className="social-link"><FaLinkedin /></a>
            </div>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/search">Bus Tickets</Link></li>
              <li><a href="#offers">Offers</a></li>
              <li><a href="#routes">Popular Routes</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Support</h3>
            <ul className="footer-links">
              <li><a href="#help">Help Center</a></li>
              <li><a href="#contact">Contact Us</a></li>
              <li><a href="#refund">Refund Policy</a></li>
              <li><a href="#terms">Terms & Conditions</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Company</h3>
            <ul className="footer-links">
              <li><a href="#about">About Us</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#blog">Blog</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 Bhole Shanker. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#cookies">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 