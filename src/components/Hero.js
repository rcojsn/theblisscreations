import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Celebrate Every Moment with <span className="highlight">Beautiful Balloon Gifts</span>
          </h1>
          <p className="hero-subtitle">
            Premium balloon bouquets and gift sets that bring joy to birthdays, anniversaries, graduations, and all of life's special occasions.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary">Shop Now</button>
            <button className="btn-secondary">Custom Orders</button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-placeholder">
            <div className="placeholder-content">
              <span>🎈</span>
              <p>Hero Image Placeholder</p>
              <small>1200x600px</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;