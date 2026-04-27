// src/features/Footer/Footer.jsx
import React from 'react';
import './Footer.css';
import { FaReddit } from 'react-icons/fa';

const Footer = () => {
  // Automatically gets the current year (currently 2026)
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="logo">
        <FaReddit className="logo-icon" />
        <p>
          Reddit<span> Viewer</span> | Made with ❤️ Jay Kalio 2021-{currentYear} | 
          <a 
            className="apiLink" 
            href="https://www.reddit.com/dev/api/" 
            target="_blank" 
            rel="noreferrer"
          >
            {" "}Reddit API
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
