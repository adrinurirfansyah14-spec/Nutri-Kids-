import React, { useState, useEffect, useRef } from 'react';
import nutriKidsLogo from '../assets/nutrikids-logo.png';
import './Navbar.css';

export default function Navbar({
  activeTab = 'beranda',
  onSelectTab,
  onOpenDonation,
  onOpenAuth,
  currentUser = null,
  onLogout,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileMenuRef = useRef(null);

  // Tutup dropdown jika klik di luar
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

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

  const getInitial = (name) => {
    if (!name) return 'U';
    return name.charAt(0).toUpperCase();
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

          {/* Mobile Actions */}
          <div className="navbar-actions mobile-only">
            <button
              type="button"
              className={`btn btn-outline-figma ${activeTab === 'donasi' ? 'active-donasi' : ''}`}
              onClick={handleDonationClick}
            >
              Donasi
            </button>

            {currentUser ? (
              <div className="mobile-user-profile-box">
                <div className="mobile-user-header">
                  <span className="profile-avatar-circle">
                    {getInitial(currentUser.name || currentUser.username)}
                  </span>
                  <div className="mobile-user-text">
                    <strong>{currentUser.name || currentUser.username}</strong>
                    <span>{currentUser.email}</span>
                  </div>
                </div>
                <div className="mobile-user-actions">
                  <button
                    type="button"
                    className="btn btn-pill-light btn-sm"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onSelectTab('riwayat');
                    }}
                  >
                    📋 Riwayat Gizi
                  </button>
                  <button
                    type="button"
                    className="btn btn-pill-light btn-sm"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAuth('login');
                    }}
                  >
                    🔄 Ganti Akun
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-figma btn-sm"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      if (onLogout) onLogout();
                    }}
                  >
                    🚪 Keluar
                  </button>
                </div>
              </div>
            ) : (
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
            )}
          </div>
        </nav>

        {/* Desktop Action Buttons */}
        <div className="navbar-actions desktop-only">
          <button
            type="button"
            className={`btn btn-outline-figma ${activeTab === 'donasi' ? 'active-donasi' : ''}`}
            onClick={handleDonationClick}
          >
            Donasi
          </button>

          {currentUser ? (
            /* Logged In Profile Menu Trigger & Dropdown */
            <div className="navbar-profile-wrap" ref={profileMenuRef}>
              <button
                type="button"
                className={`navbar-profile-trigger ${profileDropdownOpen ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setProfileDropdownOpen(!profileDropdownOpen);
                }}
                aria-expanded={profileDropdownOpen}
              >
                <span className="profile-avatar-circle">
                  {getInitial(currentUser.name || currentUser.username)}
                </span>
                <span className="profile-user-name">
                  {currentUser.name || currentUser.username}
                </span>
                <span className={`profile-chevron ${profileDropdownOpen ? 'open' : ''}`}>
                  ▾
                </span>
              </button>

              {profileDropdownOpen && (
                <div className="navbar-profile-dropdown" onClick={(e) => e.stopPropagation()}>
                  <div className="dropdown-user-header">
                    <span className="dropdown-avatar-big">
                      {getInitial(currentUser.name || currentUser.username)}
                    </span>
                    <div className="dropdown-user-info">
                      <strong className="dropdown-name">
                        {currentUser.name || currentUser.username}
                      </strong>
                      <span className="dropdown-email">{currentUser.email}</span>
                      <span className="dropdown-role-badge">Orang Tua Peduli Gizi</span>
                    </div>
                  </div>

                  <div className="dropdown-divider"></div>

                  <div className="dropdown-menu-list">
                    <button
                      type="button"
                      className="dropdown-menu-btn"
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        onSelectTab('cek-gizi');
                      }}
                    >
                      <span className="menu-btn-icon">🥗</span>
                      <span>Cek Gizi Anak</span>
                    </button>
                    <button
                      type="button"
                      className="dropdown-menu-btn"
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        onSelectTab('riwayat');
                      }}
                    >
                      <span className="menu-btn-icon">📋</span>
                      <span>Riwayat Cek Gizi</span>
                    </button>
                    <button
                      type="button"
                      className="dropdown-menu-btn"
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        onSelectTab('donasi');
                      }}
                    >
                      <span className="menu-btn-icon">💖</span>
                      <span>Donasi NutriKids</span>
                    </button>
                    <button
                      type="button"
                      className="dropdown-menu-btn"
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        onOpenAuth('login');
                      }}
                    >
                      <span className="menu-btn-icon">🔄</span>
                      <span>Ganti Akun</span>
                    </button>
                  </div>

                  <div className="dropdown-divider"></div>

                  <button
                    type="button"
                    className="dropdown-logout-btn"
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      if (onLogout) onLogout();
                    }}
                  >
                    <span className="menu-btn-icon">🚪</span>
                    <span>Keluar / Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              type="button"
              className="btn btn-lime-figma"
              onClick={() => onOpenAuth('login')}
            >
              Masuk
            </button>
          )}
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
