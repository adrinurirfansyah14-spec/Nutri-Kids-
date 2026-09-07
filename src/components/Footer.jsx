import React from 'react';
import './Footer.css';

/**
 * Komponen Footer
 * Fungsi: Informasi penutup website, hak cipta, dan navigasi tambahan.
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-wrapper">
      <div className="container footer-content">
        <div className="footer-brand">
          <div className="brand-logo">
            <span className="brand-icon">💼</span>
            <span className="brand-name">GetInvestor</span>
          </div>
          <p className="footer-bio">
            Platform karya Kelompok 3 untuk menghubungkan ide bisnis inovatif dengan pemodal masa depan.
          </p>
        </div>

        <div className="footer-links-group">
          <div className="links-column">
            <h4>Navigasi</h4>
            <a href="#home">Beranda</a>
            <a href="#investors">Daftar Investor</a>
            <a href="#stats">Statistik</a>
          </div>
          <div className="links-column">
            <h4>Dukungan</h4>
            <a href="#faq">Pusat Bantuan</a>
            <a href="#privacy">Kebijakan Privasi</a>
            <a href="#terms">Syarat & Ketentuan</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>© {currentYear} GetInvestor (Kelompok 3). All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
