// src/App.js
import React, { useState } from 'react'; // 1. Added useState
import './App.css';
import Home from './features/Home/Home';
import Header from './features/Header/Header';
import Subreddits from './features/Subreddits/Subreddits';
import Footer from './features/Footer/Footer';


function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <Header toggleDrawer={toggleDrawer} isDrawerOpen={isDrawerOpen} />
      
      {/* 1. The Backdrop Overlay */}
      {isDrawerOpen && (
        <div 
          className="drawer-backdrop" 
          onClick={toggleDrawer} 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(4px)',
            zIndex: 999
          }}
        />
      )}

      <main>
        <Home />
        <Footer />
      </main>

      <aside className={isDrawerOpen ? 'drawer-open' : ''}>
        <Subreddits />
      </aside>
    </>
  );
}

export default App;

