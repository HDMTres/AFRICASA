'use client';
import React, { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Récupérer le thème sauvegardé
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && systemPrefersDark);
    setIsDark(shouldBeDark);
    applyTheme(shouldBeDark);
  }, []);

  const applyTheme = (dark) => {
    const root = document.documentElement;
    
    if (dark) {
      root.classList.add('dark-mode');
      document.body.style.setProperty('--bg-primary', '#1F2937');
      document.body.style.setProperty('--bg-secondary', '#374151');
      document.body.style.setProperty('--text-primary', '#F9FAFB');
      document.body.style.setProperty('--text-secondary', '#D1D5DB');
      document.body.style.setProperty('--border-color', '#4B5563');
      document.body.style.setProperty('--card-bg', '#374151');
      document.body.style.setProperty('--hover-bg', '#4B5563');
    } else {
      root.classList.remove('dark-mode');
      document.body.style.setProperty('--bg-primary', '#FFFFFF');
      document.body.style.setProperty('--bg-secondary', '#F9FAFB');
      document.body.style.setProperty('--text-primary', '#111827');
      document.body.style.setProperty('--text-secondary', '#6B7280');
      document.body.style.setProperty('--border-color', '#E5E7EB');
      document.body.style.setProperty('--card-bg', '#FFFFFF');
      document.body.style.setProperty('--hover-bg', '#F3F4F6');
    }
  };

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  return (
    <div className="theme-toggle-widget">
      <div className="theme-header">
        <h3 className="widget-title">🎨 Thème</h3>
      </div>
      
      <div className="theme-content">
        <div className="theme-option">
          <div className="theme-info">
            <span className="theme-icon">{isDark ? '🌙' : '☀️'}</span>
            <div className="theme-details">
              <h4>{isDark ? 'Mode Sombre' : 'Mode Clair'}</h4>
              <p>{isDark ? 'Interface sombre pour vos yeux' : 'Interface claire et lumineuse'}</p>
            </div>
          </div>
          
          <label className="theme-switch">
            <input
              type="checkbox"
              checked={isDark}
              onChange={toggleTheme}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="theme-preview">
          <h4>🎯 Aperçu</h4>
          <div className={`preview-card ${isDark ? 'dark' : 'light'}`}>
            <div className="preview-header">
              <h5>Exemple de carte</h5>
            </div>
            <div className="preview-content">
              <p>Ceci est un aperçu du thème sélectionné.</p>
              <button className="preview-btn">Bouton d'exemple</button>
            </div>
          </div>
        </div>

        <div className="theme-benefits">
          <h4>✨ Avantages</h4>
          <ul className="benefits-list">
            <li>
              <span className="benefit-icon">👁️</span>
              Réduit la fatigue oculaire
            </li>
            <li>
              <span className="benefit-icon">🔋</span>
              Économise la batterie (écrans OLED)
            </li>
            <li>
              <span className="benefit-icon">🌟</span>
              Améliore la concentration
            </li>
            <li>
              <span className="benefit-icon">🕐</span>
              Idéal pour le travail nocturne
            </li>
          </ul>
        </div>

        <div className="auto-theme">
          <h4>🤖 Mode Automatique</h4>
          <p>Le thème s'adapte automatiquement aux préférences système de votre appareil.</p>
          <button 
            className="auto-btn"
            onClick={() => {
              localStorage.removeItem('theme');
              const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
              setIsDark(systemPrefersDark);
              applyTheme(systemPrefersDark);
            }}
          >
            🔄 Utiliser le thème système
          </button>
        </div>
      </div>
    </div>
  );
}
