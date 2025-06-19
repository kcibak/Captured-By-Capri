import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './topnavbar.css';

export const TopNavbar: React.FC = () => {
  const [shrink, setShrink] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setShrink(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`top-navbar${shrink ? ' shrink' : ''}`}> 
      <div className={`navbar-content${shrink ? ' center-logo' : ''}`}>
        <Link to="/" className="logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Captured by Capri</Link>
        {!shrink && (
          <ul className="nav-links">
            <li>
              <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
            </li>
            <li>
              <Link to="/work" className={location.pathname === '/work' ? 'active' : ''}>My Work</Link>
            </li>
            <li>
              <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About Me</Link>
            </li>
            <li>
              <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};
