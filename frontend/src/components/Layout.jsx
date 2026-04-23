// src/components/Layout.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Layout.css";
import logoImage from "../assets/images/danie.jpg";

import {
  FaHome,
  FaDonate,
  FaExclamationTriangle,
  FaInfoCircle,
  FaEnvelope,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaUser
} from "react-icons/fa";

import Notifications from "./Notifications";
import { getUserRole, getToken, removeToken } from "../utils/token";

const Layout = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const role = getUserRole();
  const isAuthenticated = !!getToken();

  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };

  const dashboardLink = () => {
    switch (role) {
      case "volunteer":
        return "/volunteer/dashboard";
      case "donor":
        return "/donor/dashboard";
      case "admin":
        return "/admin/dashboard";
      default:
        return null;
    }
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* HEADER */}
      <header className="header">
        <div className="logo">
          <Link to="/" onClick={closeMenu}>
            <img src={logoImage} alt="CommunityAid Logo" />
            <span>CommunityAid</span>
          </Link>
        </div>

        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>

          {/* PUBLIC LINKS */}
          <Link to="/" onClick={closeMenu}>
            <FaHome /> Home
          </Link>

          <Link to="/donate" onClick={closeMenu}>
            <FaDonate /> Donate
          </Link>

          <Link to="/report-emergency" onClick={closeMenu}>
            <FaExclamationTriangle /> Report Emergency
          </Link>

          <Link to="/about" onClick={closeMenu}>
            <FaInfoCircle /> About
          </Link>

          <Link to="/contact" onClick={closeMenu}>
            <FaEnvelope /> Contact
          </Link>

          {/* AUTHENTICATED FEATURES */}
          {isAuthenticated && <Notifications />}

          {/* DASHBOARD */}
          {isAuthenticated && dashboardLink() && (
            <Link to={dashboardLink()} onClick={closeMenu}>
              {role.toUpperCase()} Dashboard
            </Link>
          )}

          {/* 👤 PROFILE (NEW ADDITION) */}
          {isAuthenticated && (
            <Link to="/profile" onClick={closeMenu}>
              <FaUser /> Profile
            </Link>
          )}

          {/* LOGIN / LOGOUT */}
          {!isAuthenticated ? (
            <button className="login-btn" onClick={() => navigate("/login")}>
              Login
            </button>
          ) : (
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          )}
        </nav>

        {/* MOBILE MENU */}
        <div
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main>{children}</main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-links">
          <Link to="/donate"><FaDonate /> Donate</Link>
          <Link to="/about"><FaInfoCircle /> About</Link>
          <Link to="/contact"><FaEnvelope /> Contact</Link>
        </div>

        <div className="socials">
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <FaFacebook /> Facebook
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <FaTwitter /> Twitter
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <FaInstagram /> Instagram
          </a>
        </div>

        <p>© {new Date().getFullYear()} CommunityAid. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Layout;