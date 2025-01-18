import React from 'react';


const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()}  All rights reserved.</p>
      <div className="footer-links">
        <a href="/about">About Us</a> <br/>
        <a href="/contact">Contact</a>
      </div>
    </footer>
  );
};

export default Footer;
