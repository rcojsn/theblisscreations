import React from 'react';
import Navbar from './components/Navbar';
import Breadcrumb from './components/Breadcrumb';
import PageHeader from './components/PageHeader';
import ContentSection from './components/ContentSection';
import ProductGrid from './components/ProductGrid';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Breadcrumb />
      <PageHeader />
      <ContentSection />
      <ProductGrid />
    </div>
  );
}

export default App;