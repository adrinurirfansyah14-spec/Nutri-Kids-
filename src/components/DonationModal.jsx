import React, { useState } from 'react';
import './DonationModal.css';

export default function DonationModal({ isOpen, onClose }) {
  const [selectedPackage, setSelectedPackage] = useState('Paket Sayur & Buah Segar');
  const [amount, setAmount] = useState('50000');
  const [donorName, setDonorName] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const packages = [
    { name: 'Paket Sayur & Buah', price: '25000', icon: '🥦', desc: '1 keranjang sayur hijau dan buah segar untuk balita' },
    { name: 'Paket Susu & Telur', price: '50000', icon: '🥚', desc: '10 butir telur omega + susu pertumbuhan anak' },
    { name: 'Paket Nutrisi Lengkap', price: '100000', icon: '🍲', desc: 'Pangan protein hewani, sayur, dan suplemen mikronutrien' },
  ];

  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg.name);
    setAmount(pkg.price);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card donation-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Tutup donasi modal">
          &times;
        </button>

        <div className="donation-modal-header">
          <span className="donation-icon-badge">🤲</span>
          <h2 className="donation-title">Salurkan Paket Makanan Bergizi</h2>
          <p className="donation-subtitle">
            Bantuan Anda disalurkan langsung berupa paket pangan sehat tepat sasaran kepada anak yang membutuhkan.
          </p>
        </div>

        {isSuccess ? (
          <div className="donation-success-box">
            <span className="success-emoji">🎉</span>
            <h3>Terima Kasih Banyak!</h3>
            <p>
              Kebaikan Anda sebesar <strong>Rp {parseInt(amount).toLocaleString('id-ID')}</strong> akan segera kami salurkan kepada anak penerima manfaat.
            </p>
          </div>
        ) : (
          <form className="donation-form" onSubmit={handleSubmit}>
            {/* Packages */}
            <label className="input-label">Pilih Paket Bantuan:</label>
            <div className="packages-grid">
              {packages.map((pkg) => (
                <div
                  key={pkg.name}
                  className={`package-card ${selectedPackage === pkg.name ? 'selected' : ''}`}
                  onClick={() => handlePackageSelect(pkg)}
                >
                  <span className="pkg-icon">{pkg.icon}</span>
                  <div className="pkg-info">
                    <span className="pkg-name">{pkg.name}</span>
                    <span className="pkg-price">Rp {parseInt(pkg.price).toLocaleString('id-ID')}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Name input */}
            <div className="form-group">
              <label className="input-label">Nama Anda (Opsional):</label>
              <input
                type="text"
                className="auth-input"
                placeholder="Contoh: Hamba Allah / Sahabat NutriKids"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
              />
            </div>

            {/* Custom nominal */}
            <div className="form-group">
              <label className="input-label">Nominal Donasi (Rp):</label>
              <input
                type="number"
                className="auth-input"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="10000"
                required
              />
            </div>

            {/* Submit Button (Coral Orange #D85A30 from Figma) */}
            <button type="submit" className="btn btn-orange-figma btn-donate-submit">
              Donasi Sekarang 🤲
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
