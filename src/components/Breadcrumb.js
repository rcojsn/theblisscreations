import React from 'react';
import './Breadcrumb.css';

const Breadcrumb = ({ items = [] }) => {
  const defaultItems = [
    { label: 'Home', href: '#home' },
    { label: 'Hot Air Balloons & Bubble Boxes', href: '#balloons', active: true }
  ];

  const breadcrumbItems = items.length > 0 ? items : defaultItems;

  return (
    <nav className="breadcrumb-nav">
      <div className="breadcrumb-container">
        <ul className="breadcrumb-list">
          {breadcrumbItems.map((item, index) => (
            <li key={index} className="breadcrumb-item">
              {item.active ? (
                <span className="breadcrumb-current">{item.label}</span>
              ) : (
                <>
                  <a href={item.href} className="breadcrumb-link">{item.label}</a>
                  <span className="breadcrumb-separator">›</span>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Breadcrumb;