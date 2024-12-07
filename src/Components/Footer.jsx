import React from 'react';
import '../Styles/Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/create">Create Team</a>
          <a href="/view">View Teams</a>
        </div>
        <p className="footer-text">© 2024 Indian Cricket Team Management. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
