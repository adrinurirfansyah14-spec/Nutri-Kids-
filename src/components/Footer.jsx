import React from 'react';
import nutriKidsLogo from '../assets/nutrikids-logo.png';
import './Footer.css';

export default function Footer({ onSelectTab }) {
  const handleLink = (tabKey) => {
    if (onSelectTab) {
      onSelectTab(tabKey);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer-figma">
      <div className="footer-container">
        {/* Kolom 1: Logo & Tentang Kami */}
        <div className="footer-col footer-col-brand">
          <div className="footer-logo-wrap">
            <img src={nutriKidsLogo} alt="NutriKids Logo" className="footer-logo-img" />
          </div>
          <p className="footer-text">
            Nutrikids sebagai upaya promotif dan preventif dalam mencegah masalah
            malnutrisi pada anak. Nutrikids membantu orang tua melakukan deteksi dini, memperoleh edukasi
            dan rekomendasi gizi, serta memantau pertumbuhan anak secara berkelanjutan.
          </p>
        </div>

        {/* Kolom 2: Tautan Cepat */}
        <div className="footer-col">
          <h3 className="footer-col-title">Tautan cepat</h3>
          <ul className="footer-links-list">
            <li>
              <button
                type="button"
                className="footer-btn-link"
                onClick={() => handleLink('cek-gizi')}
              >
                Cek gizi
              </button>
            </li>
            <li>
              <button
                type="button"
                className="footer-btn-link"
                onClick={() => handleLink('rekomendasi')}
              >
                Rekomendasi makanan
              </button>
            </li>
            <li>
              <button
                type="button"
                className="footer-btn-link"
                onClick={() => handleLink('edukasi')}
              >
                Edukasi
              </button>
            </li>
            <li>
              <button
                type="button"
                className="footer-btn-link"
                onClick={() => handleLink('donasi')}
              >
                Donasi
              </button>
            </li>
          </ul>
        </div>

        {/* Kolom 3: Kontak Kami */}
        <div className="footer-col">
          <h3 className="footer-col-title">Kontak kami</h3>
          <ul className="footer-contact-list">
            <li>
              <span className="contact-icon">📍</span>
              <span>Jl. in aja dulu</span>
            </li>
            <li>
              <span className="contact-icon">📞</span>
              <span>0811 - 2345 - 6789</span>
            </li>
            <li>
              <span className="contact-icon">💬</span>
              <span>+62 811 -2345 - 6789</span>
            </li>
            <li>
              <span className="contact-icon">📸</span>
              <span>@Nutrikids</span>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

