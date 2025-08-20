import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import Navbar from './components/Navbar';
import Breadcrumb from './components/Breadcrumb';
import PageHeader from './components/PageHeader';
import ContentSection from './components/ContentSection';
import ProductGrid from './components/ProductGrid';
import CustomOrderFlow from './components/CustomOrderFlow';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import OrderSuccess from './components/OrderSuccess';
import OrderHistory from './components/OrderHistory';
import './App.css';

function HomePage() {
  return (
    <>
      <Breadcrumb />
      <PageHeader />
      <ContentSection />
      <ProductGrid />
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/custom-order" element={<CustomOrderFlow />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/orders" element={<OrderHistory />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;