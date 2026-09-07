import React from 'react';
import './InvestorCard.css';

/**
 * Komponen InvestorCard
 * Fungsi: Menampilkan informasi ringkas profil investor dalam bentuk kartu.
 * 
 * Konsep React untuk Pemula:
 * - Menerima data melalui PROPS (`investor`)
 * - Menggunakan destructuring untuk mengambil field yang dibutuhkan
 */
export default function InvestorCard({ investor }) {
  const { 
    name, 
    category, 
    ticketSize, 
    sector, 
    portfolioCount, 
    description, 
    avatar, 
    isVerified 
  } = investor;

  return (
    <div className="investor-card">
      <div className="card-header">
        <img 
          src={avatar} 
          alt={`Logo atau foto ${name}`} 
          className="card-avatar" 
          loading="lazy"
        />
        <div className="card-title-group">
          <div className="name-wrapper">
            <h3 className="investor-name">{name}</h3>
            {isVerified && (
              <span className="verified-badge" title="Investor Terverifikasi">
                ✓
              </span>
            )}
          </div>
          <span className="badge badge-primary">{category}</span>
        </div>
      </div>

      <p className="card-description">{description}</p>

      <div className="card-details">
        <div className="detail-item">
          <span className="detail-label">Fokus Sektor</span>
          <span className="detail-value">{sector}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Tiket Investasi</span>
          <span className="detail-value highlight-text">{ticketSize}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Portofolio Aktif</span>
          <span className="detail-value">{portfolioCount} Startup</span>
        </div>
      </div>

      <div className="card-footer">
        <button 
          className="btn-connect"
          onClick={() => alert(`Anda tertarik terhubung dengan ${name}!`)}
        >
          Kirim Pitch Deck
        </button>
      </div>
    </div>
  );
}
