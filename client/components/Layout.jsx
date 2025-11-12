import React from "react";
import { Link, useNavigate } from "react-router-dom";

import useAuth from "../src/hooks/useAuth.js";

/**
 * Layout component - provides consistent navigation and header across all pages
 * Includes custom logo and navigation bar as required
 */
export default function Layout() {
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin, user, signout } = useAuth();

  const handleSignOut = async () => {
    await signout();
    navigate("/");
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          {/* Custom Logo */}
          <div className="logo">
            <div className="logo-icon">
              <span className="logo-text">EL</span>
            </div>
            <h1 className="site-title">Eddie Portfolio</h1>
          </div>

          {/* Navigation Bar */}
          <nav className="navbar">
            <ul className="nav-links">
              <li>
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="nav-link">
                  About
                </Link>
              </li>
              <li>
                <Link to="/education" className="nav-link">
                  Education
                </Link>
              </li>
              <li>
                <Link to="/project" className="nav-link">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/services" className="nav-link">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="nav-link">
                  Contact
                </Link>
              </li>
              {!isAuthenticated && (
                <li>
                  <Link to="/auth" className="nav-link">
                    Sign In/Up
                  </Link>
                </li>
              )}
            </ul>
          </nav>

          <div className="auth-status">
            {isAuthenticated ? (
              <div className="auth-avatar">
                <div className="user-pill">
                  <span className="user-name">{user?.name}</span>
                  {isAdmin && <span className="role-badge">Admin</span>}
                </div>
                <button className="signout-button" onClick={handleSignOut}>
                  Sign Out
                </button>
              </div>
            ) : (
              <p className="guest-copy">Guest access</p>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
