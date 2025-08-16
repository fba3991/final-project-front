import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaHome, FaChartLine, FaUsers, FaList, FaPlus, FaCog, FaHistory } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";
import "./Navbar.scss";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const menuItems = [
    { path: "/", label: "Home", icon: <FaHome /> },
    { path: "/dashboard", label: "Dashboard", icon: <FaChartLine /> },
    { path: "/rosa", label: "Rosa", icon: <FaUsers /> },
    { path: "/players", label: "Giocatori", icon: <FaList /> },
    { path: "/create-player", label: "Nuovo Giocatore", icon: <FaPlus /> },
    { path: "/gestione-squadra", label: "Gestione Squadra", icon: <FaCog /> },
    { path: "/storia", label: "Storia", icon: <FaHistory /> }
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo e Nome Squadra */}
        <div className="navbar-brand">
          <Link to="/" className="logo-link">
            <img src="/stemma.png" alt="Logo Squadra" className="logo-img" />
            <span className="team-name">LA NOSTRA SQUADRA</span>
          </Link>
        </div>

        {/* Menu Desktop */}
        <div className="navbar-menu desktop-menu">
          <ul className="menu-list">
            {menuItems.map((item) => (
              <li key={item.path} className="menu-item">
                <Link to={item.path} className="menu-link">
                  <span className="menu-icon">{item.icon}</span>
                  <span className="menu-text">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Azioni (Theme Toggle) */}
        <div className="navbar-actions">
          <ThemeToggle />
        </div>

        {/* Hamburger Menu per Mobile */}
        <button className="hamburger-menu" onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Menu Mobile a Tendina */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <span className="mobile-menu-title">Menu</span>
          <button className="close-menu" onClick={closeMenu}>
            <FaTimes />
          </button>
        </div>
        <ul className="mobile-menu-list">
          {menuItems.map((item) => (
            <li key={item.path} className="mobile-menu-item">
              <Link to={item.path} className="mobile-menu-link" onClick={closeMenu}>
                <span className="mobile-menu-icon">{item.icon}</span>
                <span className="mobile-menu-text">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Overlay per chiudere il menu */}
      {isMenuOpen && <div className="menu-overlay" onClick={closeMenu}></div>}
    </nav>
  );
};

export default Navbar;
