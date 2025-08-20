import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import './Navbar.css';

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { getCartItemCount } = useCart();

  const handleMouseEnter = (menu) => {
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h2>The Bliss Creations</h2>
          </Link>
        </div>
        
        <ul className="nav-menu">
          <li 
            className="nav-item dropdown"
            onMouseEnter={() => handleMouseEnter('balloons')}
            onMouseLeave={handleMouseLeave}
          >
            <a href="#balloons" className="nav-link">
              Balloons <span className="dropdown-arrow">▼</span>
            </a>
            {activeDropdown === 'balloons' && (
              <div className="mega-menu">
                <div className="mega-menu-content">
                  <div className="menu-column">
                    <h4>By Occasion</h4>
                    <a href="#birthday">Birthday Balloons</a>
                    <a href="#anniversary">Anniversary</a>
                    <a href="#graduation">Graduation</a>
                    <a href="#baby-shower">Baby Shower</a>
                    <a href="#wedding">Wedding</a>
                  </div>
                  <div className="menu-column">
                    <h4>By Type</h4>
                    <a href="#foil">Foil Balloons</a>
                    <a href="#latex">Latex Balloons</a>
                    <a href="#helium">Helium Balloons</a>
                    <a href="#balloon-bouquets">Balloon Bouquets</a>
                    <a href="#number-balloons">Number Balloons</a>
                  </div>
                  <div className="menu-column">
                    <h4>Popular</h4>
                    <a href="#hot-air">Hot Air Balloons</a>
                    <a href="#bubble-boxes">Bubble Boxes</a>
                    <a href="#balloon-arrangements">Balloon Arrangements</a>
                    <a href="#custom-balloons">Custom Balloons</a>
                  </div>
                </div>
              </div>
            )}
          </li>

          <li 
            className="nav-item dropdown"
            onMouseEnter={() => handleMouseEnter('party')}
            onMouseLeave={handleMouseLeave}
          >
            <a href="#party" className="nav-link">
              Party Supplies <span className="dropdown-arrow">▼</span>
            </a>
            {activeDropdown === 'party' && (
              <div className="mega-menu">
                <div className="mega-menu-content">
                  <div className="menu-column">
                    <h4>Decorations</h4>
                    <a href="#banners">Banners</a>
                    <a href="#streamers">Streamers</a>
                    <a href="#confetti">Confetti</a>
                    <a href="#table-decor">Table Decorations</a>
                  </div>
                  <div className="menu-column">
                    <h4>Party Favors</h4>
                    <a href="#gift-bags">Gift Bags</a>
                    <a href="#party-hats">Party Hats</a>
                    <a href="#noise-makers">Noise Makers</a>
                    <a href="#stickers">Stickers</a>
                  </div>
                </div>
              </div>
            )}
          </li>

          <li 
            className="nav-item dropdown"
            onMouseEnter={() => handleMouseEnter('themes')}
            onMouseLeave={handleMouseLeave}
          >
            <a href="#themes" className="nav-link">
              Themes <span className="dropdown-arrow">▼</span>
            </a>
            {activeDropdown === 'themes' && (
              <div className="mega-menu">
                <div className="mega-menu-content">
                  <div className="menu-column">
                    <h4>Popular Themes</h4>
                    <a href="#unicorn">Unicorn</a>
                    <a href="#princess">Princess</a>
                    <a href="#superhero">Superhero</a>
                    <a href="#safari">Safari</a>
                    <a href="#mermaid">Mermaid</a>
                  </div>
                  <div className="menu-column">
                    <h4>Color Themes</h4>
                    <a href="#pink-gold">Pink & Gold</a>
                    <a href="#blue-silver">Blue & Silver</a>
                    <a href="#rainbow">Rainbow</a>
                    <a href="#black-gold">Black & Gold</a>
                  </div>
                </div>
              </div>
            )}
          </li>

          <li className="nav-item">
            <Link to="/custom-order" className="nav-link custom-order-highlight">Create Custom Order</Link>
          </li>

          <li className="nav-item">
            <a href="#about" className="nav-link">About</a>
          </li>

          <li className="nav-item">
            <a href="#contact" className="nav-link">Contact</a>
          </li>

          <li className="nav-item">
            <Link to="/orders" className="nav-link">My Orders</Link>
          </li>
        </ul>

        <div className="nav-actions">
          <div className="search-container">
            <input type="text" placeholder="Search products..." className="search-input" />
            <button className="search-btn">🔍</button>
          </div>
          <Link to="/cart" className="cart-btn">
            🛒 <span className="cart-count">{getCartItemCount()}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;