import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PaystackButton } from 'react-paystack';
import { useCart } from '../contexts/CartContext';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, getCartTotal, clearCart, setShippingInfo } = useCart();
  
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: ''
  });
  
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.zipCode) newErrors.zipCode = 'Zip code is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateTotal = () => {
    const subtotal = getCartTotal();
    const shipping = 10.00;
    const tax = subtotal * 0.08;
    return subtotal + shipping + tax;
  };

  const total = calculateTotal();

  const paystackConfig = {
    reference: `TB${Date.now()}`,
    email: formData.email,
    amount: Math.round(total * 100), // Paystack expects amount in kobo (Nigerian currency) or cents
    currency: 'NGN', // Change to your preferred currency
    publicKey: 'sk_test_27df0cec3a541c8b767cb3616d5daf3862a8a5e3', // Replace with your Paystack public key
    text: `Pay ₦${total.toFixed(2)}`,
    onSuccess: (reference) => {
      console.log('Payment successful:', reference);
      
      setShippingInfo(formData);
      
      const orderData = {
        reference: reference.reference,
        amount: total,
        currency: 'ZAR',
        items: items,
        shippingInfo: formData
      };

      clearCart();
      navigate('/order-success', { 
        state: { 
          orderData,
          total: total,
          reference: reference.reference
        } 
      });
    },
    onClose: () => {
      console.log('Payment closed');
    },
  };

  const PaystackButtonComponent = () => (
    <PaystackButton 
      {...paystackConfig}
      className="paystack-button"
    />
  );

  return (
    <div className="checkout-page">
      <div className="container">
        <div className="checkout-header">
          <h2>Checkout</h2>
        </div>

        <div className="checkout-content">
          <div className="checkout-details">
            <div className="form-section">
              <h3>Contact Information</h3>
              <div className="form-row">
                <div className="form-group full-width">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Shipping Information</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={errors.firstName ? 'error' : ''}
                  />
                  {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                </div>
                <div className="form-group">
                  <label>Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={errors.lastName ? 'error' : ''}
                  />
                  {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group full-width">
                  <label>Address *</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={errors.address ? 'error' : ''}
                  />
                  {errors.address && <span className="error-message">{errors.address}</span>}
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={errors.city ? 'error' : ''}
                  />
                  {errors.city && <span className="error-message">{errors.city}</span>}
                </div>
                <div className="form-group">
                  <label>State *</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className={errors.state ? 'error' : ''}
                  />
                  {errors.state && <span className="error-message">{errors.state}</span>}
                </div>
                <div className="form-group">
                  <label>Zip Code *</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className={errors.zipCode ? 'error' : ''}
                  />
                  {errors.zipCode && <span className="error-message">{errors.zipCode}</span>}
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group full-width">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={errors.phone ? 'error' : ''}
                  />
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>
              </div>
            </div>
          </div>

          <div className="order-summary-checkout">
            <div className="summary-card">
              <h3>Order Summary</h3>
              
              <div className="order-items">
                {items.map((item) => (
                  <div key={item.id} className="order-item">
                    <span className="item-name">{item.title}</span>
                    <span className="item-quantity">x{item.quantity}</span>
                    <span className="item-price">
                      ${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="summary-lines">
                <div className="summary-line">
                  <span>Subtotal:</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="summary-line">
                  <span>Shipping:</span>
                  <span>$10.00</span>
                </div>
                <div className="summary-line">
                  <span>Tax:</span>
                  <span>${(getCartTotal() * 0.08).toFixed(2)}</span>
                </div>
                <div className="summary-line total">
                  <span>Total:</span>
                  <span>₦{total.toFixed(2)}</span>
                </div>
              </div>

              {validateForm() ? (
                <PaystackButtonComponent />
              ) : (
                <button 
                  type="button" 
                  className="place-order-btn disabled"
                  onClick={() => validateForm()}
                >
                  Complete Form to Pay
                </button>
              )}
              
              <div className="payment-info">
                <div className="paystack-info">
                  <p>🔒 Secure payment powered by Paystack</p>
                  <small>Your payment information is encrypted and secure</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;