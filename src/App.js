import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <ProductGrid />
    </div>
  );
}

export default App;