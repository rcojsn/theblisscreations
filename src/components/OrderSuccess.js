import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './OrderSuccess.css';

const OrderSuccess = () => {
  const location = useLocation();
  const { orderData, total, reference } = location.state || {};

  if (!orderData) {
    return (
      <div className="order-success-page">
        <div className="container">
          <div className="error-message">
            <h2>Order not found</h2>
            <p>We couldn't find your order details. Please contact support if you need assistance.</p>
            <Link to="/" className="home-btn">Return Home</Link>
          </div>
        </div>
      </div>
    );
  }

  const generateOrderNumber = () => {
    return `TB${Date.now().toString().slice(-8).toUpperCase()}`;
  };

  const orderNumber = generateOrderNumber();
  const estimatedDelivery = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString();

  return (
    <div className="order-success-page">
      <div className="container">
        <div className="success-content">
          <div className="success-icon">
            <div className="checkmark">✓</div>
          </div>
          
          <h1>Order Confirmed!</h1>
          <p className="success-message">
            Thank you for your order! We've received your payment and will start preparing your balloon arrangements right away.
          </p>

          <div className="order-details-card">
            <div className="order-header">
              <h2>Order Details</h2>
              <span className="order-number">Order #{orderNumber}</span>
              {reference && (
                <span className="payment-reference">Paystack Ref: {reference}</span>
              )}
            </div>

            <div className="customer-info">
              <div className="info-section">
                <h3>Shipping Address</h3>
                <div className="address">
                  <p>{orderData.shippingInfo.firstName} {orderData.shippingInfo.lastName}</p>
                  <p>{orderData.shippingInfo.address}</p>
                  <p>{orderData.shippingInfo.city}, {orderData.shippingInfo.state} {orderData.shippingInfo.zipCode}</p>
                  <p>{orderData.shippingInfo.phone}</p>
                </div>
              </div>

              <div className="info-section">
                <h3>Estimated Delivery</h3>
                <div className="delivery-date">
                  <span className="date">{estimatedDelivery}</span>
                  <span className="delivery-note">Standard shipping (3-5 business days)</span>
                </div>
              </div>
            </div>

            <div className="order-items">
              <h3>Items Ordered</h3>
              <div className="items-list">
                {orderData.items.map((item) => (
                  <div key={item.id} className="order-item">
                    <div className="item-image">
                      <div className="image-placeholder">
                        <span className="balloon-icon">🎈</span>
                      </div>
                    </div>
                    <div className="item-details">
                      <h4>{item.title}</h4>
                      <p className="item-category">{item.category}</p>
                      <p className="item-quantity">Quantity: {item.quantity}</p>
                    </div>
                    <div className="item-price">
                      ${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="order-summary">
              <h3>Payment Summary</h3>
              <div className="summary-lines">
                <div className="summary-line">
                  <span>Subtotal:</span>
                  <span>${(total - 10 - (total - 10) * 0.08 / 1.08).toFixed(2)}</span>
                </div>
                <div className="summary-line">
                  <span>Shipping:</span>
                  <span>$10.00</span>
                </div>
                <div className="summary-line">
                  <span>Tax:</span>
                  <span>${((total - 10) * 0.08 / 1.08).toFixed(2)}</span>
                </div>
                <div className="summary-line total">
                  <span>Total Paid:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="next-steps">
            <h3>What's Next?</h3>
            <div className="steps-grid">
              <div className="step">
                <div className="step-icon">📧</div>
                <div className="step-content">
                  <h4>Confirmation Email</h4>
                  <p>You'll receive an order confirmation email at {orderData.shippingInfo.email}</p>
                </div>
              </div>
              <div className="step">
                <div className="step-icon">🎨</div>
                <div className="step-content">
                  <h4>Preparation</h4>
                  <p>Our team will carefully craft your balloon arrangements</p>
                </div>
              </div>
              <div className="step">
                <div className="step-icon">🚚</div>
                <div className="step-content">
                  <h4>Shipping</h4>
                  <p>We'll send tracking information when your order ships</p>
                </div>
              </div>
            </div>
          </div>

          <div className="action-buttons">
            <Link to="/" className="continue-shopping-btn">
              Continue Shopping
            </Link>
            <button 
              className="print-btn"
              onClick={() => window.print()}
            >
              Print Receipt
            </button>
          </div>

          <div className="support-info">
            <p>
              Have questions about your order? 
              <a href="mailto:support@theblisscreations.com"> Contact our support team</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;