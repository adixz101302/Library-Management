import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>LibraryERP</h3>
            <p>Modern Enterprise Library Management System.</p>
            <p>© {new Date().getFullYear()} All rights reserved.</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <a href="/">Home</a>
            <a href="/books">Catalog</a>
            <a href="/dashboard">Dashboard</a>
          </div>
          <div className="footer-section">
            <h3>Contact Support</h3>
            <p>Email: support@libraryerp.local</p>
            <p>Phone: +1 (555) 123-4567</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
