import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          📺 Screensaver Ad Platform
        </Link>
        
        <ul className="navbar-menu">
          <li>
            <Link 
              to="/" 
              className={`navbar-link ${isActive('/') ? 'active' : ''}`}
            >
              Assets
            </Link>
          </li>
          <li>
            <Link 
              to="/upload" 
              className={`navbar-link ${isActive('/upload') ? 'active' : ''}`}
            >
              Upload
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
