import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBus, FaUser, FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <FaBus className="logo-icon" />
            <span className="logo-text">Bhole Shanker</span>
          </Link>

          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <ul className="nav-list">
              <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
              <li><Link to="/search" onClick={() => setIsMenuOpen(false)}>Bus Tickets</Link></li>
              <li><a href="#offers" onClick={() => setIsMenuOpen(false)}>Offers</a></li>
              <li><a href="#help" onClick={() => setIsMenuOpen(false)}>Help</a></li>
            </ul>
          </nav>

          <div className="header-actions">
            {isLoggedIn ? (
              <div className="user-menu">
                <button className="user-btn">
                  <FaUser />
                  <span>My Account</span>
                </button>
                <button className="btn btn-secondary" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <button className="btn btn-primary" onClick={handleLogin}>
                Login
              </button>
            )}
            
            <button className="mobile-menu-btn" onClick={toggleMenu}>
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 