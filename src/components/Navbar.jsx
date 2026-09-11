import React, { useState } from 'react';
import nutriKidsLogo from '../assets/nutrikids-logo.png';
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

  const handleDonationClick = () => {
    setMobileMenuOpen(false);
    if (onSelectTab) {
      onSelectTab('donasi');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (onOpenDonation) {
      onOpenDonation();
    }
  };

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Exact Figma NutriKids Logo */}
        <button
          type="button"
          className="navbar-logo-btn"
          onClick={() => handleNavClick('beranda')}
          aria-label="NutriKids Beranda"
        >
          <img
            src={nutriKidsLogo}
            alt="NutriKids Logo"
            className="navbar-logo-img"
          />
        </button>

        {/* Navigation Links */}
        <nav className={`navbar-nav ${mobileMenuOpen ? 'open' : ''}`}>
          <button
            type="button"
            className={`nav-item ${activeTab === 'beranda' ? 'active' : ''}`}
            onClick={() => handleNavClick('beranda')}
          >
            Beranda
          </button>
          <button
            type="button"
            className={`nav-item ${activeTab === 'cek-gizi' || activeTab === 'monitoring' ? 'active' : ''}`}
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

          {/* Mobile Actions */}
          <div className="navbar-actions mobile-only">
            <button
              type="button"
              className={`btn btn-outline-figma ${activeTab === 'donasi' ? 'active-donasi' : ''}`}
              onClick={handleDonationClick}
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
            className={`btn btn-outline-figma ${activeTab === 'donasi' ? 'active-donasi' : ''}`}
            onClick={handleDonationClick}
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
