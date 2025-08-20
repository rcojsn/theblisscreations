import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './OrderHistory.css';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const mockOrders = [
      {
        id: 'TB12345678',
        date: '2024-01-15',
        items: [
          { title: 'Birthday Balloon Bouquet', quantity: 1, price: '$45' },
          { title: 'Anniversary Romance Set', quantity: 2, price: '$75' }
        ],
        status: 'delivered',
        total: 195,
        shippingAddress: '123 Main St, Anytown, ST 12345'
      },
      {
        id: 'TB12345679',
        date: '2024-01-20',
        items: [
          { title: 'Graduation Celebration', quantity: 1, price: '$60' }
        ],
        status: 'shipped',
        total: 78,
        shippingAddress: '456 Oak Ave, Another City, ST 67890'
      },
      {
        id: 'TB12345680',
        date: '2024-01-25',
        items: [
          { title: 'Baby Shower Deluxe', quantity: 1, price: '$85' },
          { title: 'Custom Message Balloons', quantity: 1, price: '$50' }
        ],
        status: 'processing',
        total: 155.8,
        shippingAddress: '789 Pine St, Some Town, ST 54321'
      }
    ];

    setOrders(mockOrders);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return '#28a745';
      case 'shipped':
        return '#007bff';
      case 'processing':
        return '#ffc107';
      case 'cancelled':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'delivered':
        return 'Delivered';
      case 'shipped':
        return 'Shipped';
      case 'processing':
        return 'Processing';
      case 'cancelled':
        return 'Cancelled';
      default:
        return 'Unknown';
    }
  };

  if (orders.length === 0) {
    return (
      <div className="order-history-page">
        <div className="container">
          <div className="page-header">
            <h2>Order History</h2>
          </div>
          <div className="empty-orders">
            <div className="empty-icon">📦</div>
            <h3>No Orders Yet</h3>
            <p>You haven't placed any orders yet. Start shopping to see your order history here!</p>
            <Link to="/" className="start-shopping-btn">
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="order-history-page">
      <div className="container">
        <div className="page-header">
          <h2>Your Orders</h2>
          <p>Track and manage all your balloon gift orders</p>
        </div>

        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <h3>Order #{order.id}</h3>
                  <p className="order-date">Placed on {new Date(order.date).toLocaleDateString()}</p>
                </div>
                <div className="order-status">
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(order.status) }}
                  >
                    {getStatusText(order.status)}
                  </span>
                </div>
              </div>

              <div className="order-content">
                <div className="order-items">
                  <h4>Items Ordered</h4>
                  {order.items.map((item, index) => (
                    <div key={index} className="order-item">
                      <div className="item-image">
                        <div className="image-placeholder">
                          <span className="balloon-icon">🎈</span>
                        </div>
                      </div>
                      <div className="item-details">
                        <p className="item-title">{item.title}</p>
                        <p className="item-quantity">Quantity: {item.quantity}</p>
                      </div>
                      <div className="item-price">
                        ${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="order-details">
                  <div className="shipping-info">
                    <h4>Shipping Address</h4>
                    <p>{order.shippingAddress}</p>
                  </div>
                  
                  <div className="order-summary">
                    <h4>Order Total</h4>
                    <p className="total-amount">${order.total.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              <div className="order-actions">
                {order.status === 'delivered' && (
                  <button className="action-btn secondary">
                    Leave Review
                  </button>
                )}
                {order.status === 'shipped' && (
                  <button className="action-btn primary">
                    Track Package
                  </button>
                )}
                {order.status === 'processing' && (
                  <button className="action-btn secondary">
                    Cancel Order
                  </button>
                )}
                <button className="action-btn secondary">
                  Order Again
                </button>
                <button className="action-btn secondary">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="page-footer">
          <div className="help-section">
            <h3>Need Help?</h3>
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

export default OrderHistory;