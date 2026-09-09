import React, { useState } from 'react';
import './Navbar.css';

export default function Navbar({
  activeTab = 'beranda',
  onSelectTab,
  onOpenDonation,
  onOpenAuth,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tabKey) => {
    onSelectTab(tabKey);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Logo */}
        <button
          type="button"
          className="navbar-logo-btn"
          onClick={() => handleNavClick('beranda')}
        >
          <span className="logo-icon">🥗</span>
          <span className="logo-text">NutriKids</span>
        </button>

        {/* Navigation Links */}
        <nav className={`navbar-nav ${mobileMenuOpen ? 'open' : ''}`}>
          <button
            type="button"
            className={`nav-item ${activeTab === 'cek-gizi' ? 'active' : ''}`}
            onClick={() => handleNavClick('cek-gizi')}
          >
            Cek Gizi
          </button>
          <button
            type="button"
            className={`nav-item ${activeTab === 'rekomendasi' ? 'active' : ''}`}
            onClick={() => handleNavClick('rekomendasi')}
          >
            Rekomendasi Makanan
          </button>
          <button
            type="button"
            className={`nav-item ${activeTab === 'edukasi' ? 'active' : ''}`}
            onClick={() => handleNavClick('edukasi')}
          >
            Edukasi
          </button>
          <button
            type="button"
            className={`nav-item ${activeTab === 'monitoring' ? 'active' : ''}`}
            onClick={() => handleNavClick('monitoring')}
          >
            Monitoring
          </button>

          {/* Mobile Actions */}
          <div className="navbar-actions mobile-only">
            <button
              type="button"
              className="btn btn-outline-figma"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDonation();
              }}
            >
              Donasi
            </button>
            <button
              type="button"
              className="btn btn-lime-figma"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth('login');
              }}
            >
              Masuk
            </button>
          </div>
        </nav>

        {/* Desktop Action Buttons (Figma Frame 15) */}
        <div className="navbar-actions desktop-only">
          <button
            type="button"
            className="btn btn-outline-figma"
            onClick={onOpenDonation}
          >
            Donasi
          </button>
          <button
            type="button"
            className="btn btn-lime-figma"
            onClick={() => onOpenAuth('login')}
          >
            Masuk
          </button>
        </div>

        {/* Hamburger Menu Toggle for Mobile */}
        <button
          type="button"
          className="hamburger-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span className={`bar ${mobileMenuOpen ? 'active' : ''}`}></span>
          <span className={`bar ${mobileMenuOpen ? 'active' : ''}`}></span>
          <span className={`bar ${mobileMenuOpen ? 'active' : ''}`}></span>
        </button>
      </div>
    </header>
  );
}
