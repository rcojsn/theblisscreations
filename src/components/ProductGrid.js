import React from 'react';
import { Link } from 'react-router-dom';
import './ProductGrid.css';

const ProductGrid = () => {
  const products = [
    { id: 1, title: 'Birthday Balloon Bouquet', category: 'Birthday', price: '$45' },
    { id: 2, title: 'Anniversary Romance Set', category: 'Anniversary', price: '$75' },
    { id: 3, title: 'Graduation Celebration', category: 'Graduation', price: '$60' },
    { id: 4, title: 'Baby Shower Deluxe', category: 'Baby Shower', price: '$85' },
    { id: 5, title: 'Get Well Soon Bundle', category: 'Get Well', price: '$40' },
    { id: 6, title: 'Congratulations Special', category: 'Congratulations', price: '$55' },
    { id: 7, title: 'Custom Message Balloons', category: 'Custom', price: '$50' },
    { id: 8, title: 'Holiday Themed Package', category: 'Holiday', price: '$65' },
    { id: 9, title: 'Corporate Event Set', category: 'Corporate', price: '$120' },
    { id: 10, title: 'Wedding Decoration Kit', category: 'Wedding', price: '$200' },
    { id: 11, title: 'Kids Party Favorites', category: 'Kids Party', price: '$70' },
    { id: 12, title: 'Sympathy Arrangement', category: 'Sympathy', price: '$35' }
  ];

  return (
    <section className="product-grid-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Our Featured Collections</h2>
          <p className="section-subtitle">
            Discover our handcrafted balloon gifts perfect for every celebration
          </p>
        </div>
        
        <div className="product-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <div className="image-placeholder">
                  <span className="balloon-icon">🎈</span>
                  <p className="placeholder-text">Product Image</p>
                  <small>400x300px</small>
                </div>
              </div>
              <div className="product-info">
                <span className="product-category">{product.category}</span>
                <h3 className="product-title">{product.title}</h3>
                <div className="product-footer">
                  <span className="product-price">{product.price}</span>
                  <button className="add-to-cart-btn">Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="grid-footer">
          <div className="custom-order-cta">
            <h3>Want Something Unique?</h3>
            <p>Create your own personalized balloon gift with our step-by-step designer!</p>
            <Link to="/custom-order" className="custom-order-cta-btn">
              🎨 Create Custom Order
            </Link>
          </div>
          <button className="load-more-btn">View All Products</button>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;