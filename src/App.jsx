import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages
import Home from './pages/Home';
import Books from './pages/Books';
import BookDetails from './pages/BookDetails';
import AdminDashboard from './pages/AdminDashboard';

const PlaceholderPage = ({ title }) => (
  <div className="container main-content">
    <h1>{title}</h1>
    <p className="text-muted" style={{ marginTop: '1rem' }}>This page will be connected to ERPNext REST APIs.</p>
  </div>
);

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/reservations" element={<PlaceholderPage title="My Reservations" />} />
        <Route path="/reports" element={<PlaceholderPage title="Library Reports" />} />
        <Route path="/dashboard/*" element={<AdminDashboard />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
