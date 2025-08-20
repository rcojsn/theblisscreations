import React, { useState } from 'react';
import './CustomOrderFlow.css';

const CustomOrderFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [orderData, setOrderData] = useState({
    balloonType: null,
    colors: [],
    pattern: null,
    message: '',
    recipientName: '',
    accessories: [],
    totalPrice: 0
  });

  const steps = [
    { number: 1, title: 'Choose Balloon', description: 'Select your base balloon type' },
    { number: 2, title: 'Colors & Style', description: 'Pick colors and patterns' },
    { number: 3, title: 'Personalize', description: 'Add your special message' },
    { number: 4, title: 'Accessories', description: 'Add finishing touches' },
    { number: 5, title: 'Review', description: 'Preview your creation' }
  ];

  const balloonTypes = [
    { id: 'foil-heart', name: 'Foil Heart', price: 12, image: '💖' },
    { id: 'foil-star', name: 'Foil Star', price: 10, image: '⭐' },
    { id: 'latex-round', name: 'Latex Round', price: 5, image: '🎈' },
    { id: 'number', name: 'Number Balloon', price: 15, image: '1️⃣' },
    { id: 'letter', name: 'Letter Balloon', price: 15, image: '🅰️' },
    { id: 'custom-shape', name: 'Custom Shape', price: 20, image: '🎭' }
  ];

  const colors = [
    { id: 'red', name: 'Red', hex: '#FF0000' },
    { id: 'blue', name: 'Blue', hex: '#0066CC' },
    { id: 'pink', name: 'Pink', hex: '#FF69B4' },
    { id: 'gold', name: 'Gold', hex: '#FFD700' },
    { id: 'silver', name: 'Silver', hex: '#C0C0C0' },
    { id: 'purple', name: 'Purple', hex: '#800080' },
    { id: 'green', name: 'Green', hex: '#008000' },
    { id: 'orange', name: 'Orange', hex: '#FFA500' }
  ];

  const patterns = [
    { id: 'solid', name: 'Solid Color', price: 0 },
    { id: 'gradient', name: 'Gradient', price: 3 },
    { id: 'polka-dots', name: 'Polka Dots', price: 5 },
    { id: 'stripes', name: 'Stripes', price: 4 },
    { id: 'holographic', name: 'Holographic', price: 8 }
  ];

  const accessories = [
    { id: 'ribbon', name: 'Satin Ribbon', price: 2 },
    { id: 'weight', name: 'Decorative Weight', price: 5 },
    { id: 'gift-box', name: 'Premium Gift Box', price: 10 },
    { id: 'confetti', name: 'Confetti Fill', price: 7 },
    { id: 'led-lights', name: 'LED Light String', price: 12 },
    { id: 'gift-card', name: 'Personalized Gift Card', price: 3 }
  ];

  const updateOrderData = (field, value) => {
    setOrderData(prev => ({ ...prev, [field]: value }));
  };

  const calculateTotalPrice = () => {
    let total = 0;
    if (orderData.balloonType) {
      const balloon = balloonTypes.find(b => b.id === orderData.balloonType);
      total += balloon ? balloon.price : 0;
    }
    if (orderData.pattern) {
      const pattern = patterns.find(p => p.id === orderData.pattern);
      total += pattern ? pattern.price : 0;
    }
    orderData.accessories.forEach(accId => {
      const accessory = accessories.find(a => a.id === accId);
      total += accessory ? accessory.price : 0;
    });
    return total;
  };

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
      setOrderData(prev => ({ ...prev, totalPrice: calculateTotalPrice() }));
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleAccessory = (accessoryId) => {
    const currentAccessories = orderData.accessories;
    const isSelected = currentAccessories.includes(accessoryId);
    
    if (isSelected) {
      updateOrderData('accessories', currentAccessories.filter(id => id !== accessoryId));
    } else {
      updateOrderData('accessories', [...currentAccessories, accessoryId]);
    }
  };

  const toggleColor = (colorId) => {
    const currentColors = orderData.colors;
    const isSelected = currentColors.includes(colorId);
    
    if (isSelected) {
      updateOrderData('colors', currentColors.filter(id => id !== colorId));
    } else if (currentColors.length < 3) {
      updateOrderData('colors', [...currentColors, colorId]);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="step-content">
            <h3>Choose Your Balloon Type</h3>
            <div className="balloon-grid">
              {balloonTypes.map(balloon => (
                <div
                  key={balloon.id}
                  className={`balloon-option ${orderData.balloonType === balloon.id ? 'selected' : ''}`}
                  onClick={() => updateOrderData('balloonType', balloon.id)}
                >
                  <div className="balloon-image">{balloon.image}</div>
                  <h4>{balloon.name}</h4>
                  <p className="price">${balloon.price}</p>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="step-content">
            <h3>Choose Colors & Pattern</h3>
            <div className="color-selection">
              <h4>Select Colors (up to 3)</h4>
              <div className="color-grid">
                {colors.map(color => (
                  <div
                    key={color.id}
                    className={`color-option ${orderData.colors.includes(color.id) ? 'selected' : ''}`}
                    style={{ backgroundColor: color.hex }}
                    onClick={() => toggleColor(color.id)}
                  >
                    <span className="color-name">{color.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="pattern-selection">
              <h4>Select Pattern</h4>
              <div className="pattern-grid">
                {patterns.map(pattern => (
                  <div
                    key={pattern.id}
                    className={`pattern-option ${orderData.pattern === pattern.id ? 'selected' : ''}`}
                    onClick={() => updateOrderData('pattern', pattern.id)}
                  >
                    <h5>{pattern.name}</h5>
                    <p>+${pattern.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="step-content">
            <h3>Personalize Your Gift</h3>
            <div className="personalization-form">
              <div className="form-group">
                <label htmlFor="recipient-name">Recipient's Name</label>
                <input
                  type="text"
                  id="recipient-name"
                  value={orderData.recipientName}
                  onChange={(e) => updateOrderData('recipientName', e.target.value)}
                  placeholder="Enter recipient's name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="custom-message">Custom Message</label>
                <textarea
                  id="custom-message"
                  value={orderData.message}
                  onChange={(e) => updateOrderData('message', e.target.value)}
                  placeholder="Enter your special message..."
                  maxLength={100}
                />
                <small>{orderData.message.length}/100 characters</small>
              </div>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="step-content">
            <h3>Add Special Touches</h3>
            <div className="accessories-grid">
              {accessories.map(accessory => (
                <div
                  key={accessory.id}
                  className={`accessory-option ${orderData.accessories.includes(accessory.id) ? 'selected' : ''}`}
                  onClick={() => toggleAccessory(accessory.id)}
                >
                  <h4>{accessory.name}</h4>
                  <p className="price">+${accessory.price}</p>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 5:
        return (
          <div className="step-content">
            <h3>Review Your Custom Creation</h3>
            <div className="order-summary">
              <div className="preview-section">
                <h4>Your Balloon Gift</h4>
                <div className="order-preview">
                  {orderData.balloonType && (
                    <p><strong>Balloon:</strong> {balloonTypes.find(b => b.id === orderData.balloonType)?.name}</p>
                  )}
                  {orderData.colors.length > 0 && (
                    <p><strong>Colors:</strong> {orderData.colors.map(id => colors.find(c => c.id === id)?.name).join(', ')}</p>
                  )}
                  {orderData.pattern && (
                    <p><strong>Pattern:</strong> {patterns.find(p => p.id === orderData.pattern)?.name}</p>
                  )}
                  {orderData.recipientName && (
                    <p><strong>For:</strong> {orderData.recipientName}</p>
                  )}
                  {orderData.message && (
                    <p><strong>Message:</strong> "{orderData.message}"</p>
                  )}
                  {orderData.accessories.length > 0 && (
                    <p><strong>Accessories:</strong> {orderData.accessories.map(id => accessories.find(a => a.id === id)?.name).join(', ')}</p>
                  )}
                </div>
              </div>
              <div className="price-breakdown">
                <h4>Price Breakdown</h4>
                <div className="price-item">
                  <span>Base Balloon:</span>
                  <span>${orderData.balloonType ? balloonTypes.find(b => b.id === orderData.balloonType)?.price : 0}</span>
                </div>
                {orderData.pattern && patterns.find(p => p.id === orderData.pattern)?.price > 0 && (
                  <div className="price-item">
                    <span>Pattern:</span>
                    <span>+${patterns.find(p => p.id === orderData.pattern)?.price}</span>
                  </div>
                )}
                {orderData.accessories.map(accId => {
                  const accessory = accessories.find(a => a.id === accId);
                  return (
                    <div key={accId} className="price-item">
                      <span>{accessory?.name}:</span>
                      <span>+${accessory?.price}</span>
                    </div>
                  );
                })}
                <div className="price-total">
                  <span><strong>Total:</strong></span>
                  <span><strong>${calculateTotalPrice()}</strong></span>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return orderData.balloonType !== null;
      case 2:
        return orderData.colors.length > 0 && orderData.pattern !== null;
      case 3:
        return true;
      case 4:
        return true;
      case 5:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="custom-order-flow">
      <div className="container">
        <h1 className="flow-title">Create Your Custom Balloon Gift</h1>
        
        <div className="step-indicator">
          {steps.map(step => (
            <div
              key={step.number}
              className={`step-item ${currentStep === step.number ? 'active' : ''} ${currentStep > step.number ? 'completed' : ''}`}
            >
              <div className="step-number">{step.number}</div>
              <div className="step-info">
                <h4>{step.title}</h4>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="step-container">
          {renderStepContent()}
          
          <div className="step-navigation">
            {currentStep > 1 && (
              <button className="btn-secondary" onClick={prevStep}>
                Previous Step
              </button>
            )}
            
            <div className="nav-spacer"></div>
            
            {currentStep < 5 ? (
              <button 
                className="btn-primary" 
                onClick={nextStep}
                disabled={!canProceed()}
              >
                Next Step
              </button>
            ) : (
              <button className="btn-success">
                Add to Cart - ${calculateTotalPrice()}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomOrderFlow;