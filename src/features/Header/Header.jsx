// src/features/Header/Header.jsx
import React from 'react';
import SearchBar from './SearchBar'; // Import our new component
import './Header.css';

const Header = (props) => {
  const { toggleDrawer, isDrawerOpen } = props;

  return (
    <header>
      <div className="header-left">
        <button 
          className={`menu-button ${isDrawerOpen ? 'active' : ''}`} 
          onClick={toggleDrawer}
          aria-label="Toggle Subreddits"
        >
          <svg viewBox="0 0 24 24" width="24" height="24">
            <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        <div className="logo">
          <h1>Reddit<span> Viewer</span></h1>
        </div>
      </div>
      
      {/* Inject the SearchBar here */}
      <SearchBar />
    </header>
  );
};

export default Header;
