import React, { useState } from 'react';
import './Navbar.css';

/**
 * Komponen Navbar
 * Fungsi: Menampilkan navigasi utama di bagian atas website.
 * Konsep React: Menggunakan useState untuk toggle menu mobile.
 */
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="navbar-wrapper">
      <nav className="navbar container">
        {/* Logo Brand */}
        <div className="navbar-brand">
          <span className="brand-icon">💼</span>
          <span className="brand-text">
            Get<span className="highlight">Investor</span>
          </span>
        </div>

        {/* Menu Navigasi Desktop */}
        <ul className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
          <li><a href="#home" onClick={() => setIsMenuOpen(false)}>Beranda</a></li>
          <li><a href="#investors" onClick={() => setIsMenuOpen(false)}>Daftar Investor</a></li>
          <li><a href="#stats" onClick={() => setIsMenuOpen(false)}>Statistik</a></li>
          <li><a href="#about" onClick={() => setIsMenuOpen(false)}>Tentang Kami</a></li>
        </ul>

        {/* Tombol Aksi */}
        <div className="navbar-actions">
          <button className="btn-secondary">Masuk</button>
          <button className="btn-primary">Daftar Startup</button>
        </div>

        {/* Tombol Hamburger untuk Mobile */}
        <button 
          className="hamburger-btn" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu navigasi"
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </nav>
    </header>
  );
}
