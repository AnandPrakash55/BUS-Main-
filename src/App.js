import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import BusDetails from './pages/BusDetails';
import Booking from './pages/Booking';
import Confirmation from './pages/Confirmation';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/bus/:id" element={<BusDetails />} />
            <Route path="/booking/:busId" element={<Booking />} />
            <Route path="/confirmation/:bookingId" element={<Confirmation />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App; 