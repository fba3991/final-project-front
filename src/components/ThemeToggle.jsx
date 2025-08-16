import React, { useState, useEffect } from 'react';
import { FaSun, FaMoon, FaPalette } from 'react-icons/fa';
import './ThemeToggle.scss';

const ThemeToggle = () => {
  const [theme, setTheme] = useState('light');
  const [showPalette, setShowPalette] = useState(false);

  const themes = {
    light: { name: 'Chiaro', icon: FaSun, class: 'theme-light' },
    dark: { name: 'Scuro', icon: FaMoon, class: 'theme-dark' },
    club: { name: 'Club', icon: FaPalette, class: 'theme-club' }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.body.className = themes[savedTheme].class;
  }, []);

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.body.className = themes[newTheme].class;
    setShowPalette(false);
  };

  const currentTheme = themes[theme];

  return (
    <div className="theme-toggle">
      <button 
        className="theme-button"
        onClick={() => setShowPalette(!showPalette)}
        aria-label="Cambia tema"
      >
        <currentTheme.icon />
      </button>
      
      {showPalette && (
        <div className="theme-palette">
          {Object.entries(themes).map(([key, themeConfig]) => (
            <button
              key={key}
              className={`theme-option ${key === theme ? 'active' : ''}`}
              onClick={() => changeTheme(key)}
              aria-label={`Tema ${themeConfig.name}`}
            >
              <themeConfig.icon />
              <span>{themeConfig.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;
