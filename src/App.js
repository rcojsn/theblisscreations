import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Breadcrumb from './components/Breadcrumb';
import PageHeader from './components/PageHeader';
import ContentSection from './components/ContentSection';
import ProductGrid from './components/ProductGrid';
import CustomOrderFlow from './components/CustomOrderFlow';
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
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/custom-order" element={<CustomOrderFlow />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;