import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <h2>The Bliss Creations</h2>
        </div>
        <ul className="nav-menu">
          <li className="nav-item">
            <a href="#home" className="nav-link">Home</a>
          </li>
          <li className="nav-item">
            <a href="#balloons" className="nav-link">Balloon Bouquets</a>
          </li>
          <li className="nav-item">
            <a href="#gifts" className="nav-link">Gift Sets</a>
          </li>
          <li className="nav-item">
            <a href="#occasions" className="nav-link">Occasions</a>
          </li>
          <li className="nav-item">
            <a href="#custom" className="nav-link">Custom Orders</a>
          </li>
          <li className="nav-item">
            <a href="#contact" className="nav-link">Contact</a>
          </li>
        </ul>
        <div className="nav-cta">
          <button className="cart-btn">🛒 Cart (0)</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;