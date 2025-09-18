import React from "react";
import { Link } from "react-router-dom";

/**
 * Layout component - provides consistent navigation and header across all pages
 * Includes custom logo and navigation bar as required
 */
export default function Layout() {
  return (
    <>
      <header className="header">
        <div className="header-container">
          {/* Custom Logo */}
          <div className="logo">
            <div className="logo-icon">
              <span className="logo-text">EL</span>
            </div>
            <h1 className="site-title">Jaehyeok (Eddie) Lee Portfolio</h1>
          </div>

          {/* Navigation Bar */}
          <nav className="navbar">
            <ul className="nav-links">
              <li><Link to="/" className="nav-link">Home</Link></li>
              <li><Link to="/about" className="nav-link">About</Link></li>
              <li><Link to="/education" className="nav-link">Education</Link></li>
              <li><Link to="/project" className="nav-link">Projects</Link></li>
              <li><Link to="/services" className="nav-link">Services</Link></li>
              <li><Link to="/contact" className="nav-link">Contact</Link></li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
