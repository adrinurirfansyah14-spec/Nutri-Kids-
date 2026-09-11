import React, { useState } from 'react';
import qrisLogo from '../assets/qris-logo.png';
import qrisCode from '../assets/qris-code.png';
import './DonationFlow.css';

export default function DonationFlow({ onNavigateHome, onOpenAuth }) {
  // Step 1: Nominal
  // Step 2: Informasi donatur
  // Step 3: Panduan pembayaran QRIS
  // Step 4: Status transaksi (Menunggu pembayaran)
  const [step, setStep] = useState(1);

  // Form State
  const [nominal, setNominal] = useState(50000);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const PRESET_NOMINALS = [30000, 50000, 75000, 100000];

  const formatRupiah = (val) => {
    if (!val || isNaN(val)) return '';
    return new Intl.NumberFormat('id-ID').format(val);
  };

  const getActiveAmount = () => {
    return Number(nominal) || 0;
  };

  // Step 1: Handle Nominal Selection
  const handleSelectPreset = (amount) => {
    setNominal(amount);
    setErrorMsg('');
  };

  const handleCustomNominalChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '');
    setNominal(raw ? Number(raw) : 0);
    setErrorMsg('');
  };

  const handleNextToStep2 = () => {
    const amount = getActiveAmount();
    if (!amount || amount < 10000) {
      setErrorMsg('Minimum donasi adalah Rp 10.000');
      return;
    }
    setErrorMsg('');
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 2: Handle Donor Info
  const handleNextToStep3 = (e) => {
    e.preventDefault();
    if (!isAnonymous && !fullName.trim()) {
      setErrorMsg('Silakan masukkan nama lengkap Anda.');
      return;
    }
    if (!phone.trim()) {
      setErrorMsg('Silakan masukkan nomor telepon Anda.');
      return;
    }
    setErrorMsg('');
    setStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 3: Handle Download QR
  const handleDownloadQR = () => {
    const link = document.createElement('a');
    link.href = qrisCode;
    link.download = `QRIS-Donasi-NutriKids-${getActiveAmount()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="donation-page-section">
      <div className="donation-page-container">
        {/* ================= STEP 1: PILIH NOMINAL (Image 2) ================= */}
        {step === 1 && (
          <div className="donation-card-figma step-1-card">
            <div className="donation-card-header">
              <h1 className="donation-title">Nominal</h1>
              <p className="donation-subtitle">Pilih nominal yang tersedia</p>
            </div>

            {/* 4 Preset Pills */}
            <div className="nominal-preset-grid">
              {PRESET_NOMINALS.map((amt) => {
                const isActive = Number(nominal) === amt;
                return (
                  <button
                    key={amt}
                    type="button"
                    className={`btn-nominal-pill ${isActive ? 'active' : ''}`}
                    onClick={() => handleSelectPreset(amt)}
                    aria-pressed={isActive}
                  >
                    Rp {formatRupiah(amt)}
                  </button>
                );
              })}
            </div>

            {/* Custom Nominal */}
            <div className="nominal-custom-block">
              <label htmlFor="custom-nominal-input" className="nominal-custom-label">
                Nominal lainnya
              </label>
              <div className="nominal-input-wrapper">
                <span className="nominal-prefix">Rp</span>
                <input
                  id="custom-nominal-input"
                  type="text"
                  inputMode="numeric"
                  placeholder="50.000"
                  value={nominal ? formatRupiah(nominal) : ''}
                  onChange={handleCustomNominalChange}
                  className="nominal-text-input"
                />
              </div>
              <span className="nominal-min-hint">Minimum donasi Rp 10.000</span>
            </div>

            {errorMsg && <div className="donation-error-alert">{errorMsg}</div>}

            {/* Next Button */}
            <button
              type="button"
              className="btn-donation-primary"
              onClick={handleNextToStep2}
            >
              Selanjutnya
            </button>
          </div>
        )}

        {/* ================= STEP 2: INFORMASI DONATUR (Image 1) ================= */}
        {step === 2 && (
          <div className="donation-card-figma step-2-card">
            {/* Top row: Nominal Donasi Anda + Ubah */}
            <div className="step2-nominal-header">
              <div className="step2-nominal-title-wrap">
                <span className="step2-label">Nominal Donasi Anda</span>
                <strong className="step2-amount-display">
                  Rp {formatRupiah(getActiveAmount())}
                </strong>
              </div>
              <button
                type="button"
                className="btn-step2-change"
                onClick={() => setStep(1)}
              >
                Ubah
              </button>
            </div>

            <hr className="donation-divider" />

            {/* Metode Pembayaran */}
            <div className="step2-payment-method">
              <span className="step2-label">Metode pembayaran</span>
              <div className="step2-qris-badge">
                <img src={qrisLogo} alt="QRIS" className="qris-brand-img" />
              </div>
            </div>

            <hr className="donation-divider" />

            {/* Form Informasi Donatur */}
            <form onSubmit={handleNextToStep3} className="step2-donor-form">
              <div className="step2-donor-header">
                <h2 className="step2-donor-title">Informasi donatur</h2>
                <p className="step2-donor-subtitle">
                  <span
                    className="step2-login-link"
                    onClick={onOpenAuth}
                    role="button"
                    tabIndex={0}
                  >
                    Masuk akun
                  </span>{' '}
                  atau lengkapi data di bawah ini
                </p>
              </div>

              {/* Nama Lengkap */}
              <div className="form-group-figma">
                <label className="form-label-figma">Nama lengkap*</label>
                <input
                  type="text"
                  placeholder="Nama lengkap"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={isAnonymous}
                  className="form-input-figma"
                />
              </div>

              {/* No Telepon */}
              <div className="form-group-figma">
                <label className="form-label-figma">No. Telepon*</label>
                <input
                  type="tel"
                  placeholder="No. telepon"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="form-input-figma"
                />
              </div>

              {/* Email */}
              <div className="form-group-figma">
                <label className="form-label-figma">Email*</label>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input-figma"
                  required
                />
              </div>

              {/* Toggle Sembunyikan Nama (Anonim) */}
              <div className="anonymous-toggle-row">
                <span className="anonymous-label">Sembunyikan nama saya (Anonim)</span>
                <label className="ios-toggle-switch">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => {
                      setIsAnonymous(e.target.checked);
                      if (e.target.checked) setFullName('Orang Baik (Anonim)');
                      else setFullName('');
                    }}
                  />
                  <span className="slider-round"></span>
                </label>
              </div>

              <p className="donation-thank-note">Terima kasih atas dukungan Anda</p>

              {errorMsg && <div className="donation-error-alert">{errorMsg}</div>}

              {/* CTA Button */}
              <button type="submit" className="btn-donation-primary">
                Donasi Sekarang
              </button>
            </form>
          </div>
        )}

        {/* ================= STEP 3: PANDUAN PEMBAYARAN QRIS (Image 4) ================= */}
        {step === 3 && (
          <div className="donation-card-figma step-3-card">
            <span className="step3-top-tag">Panduan pembayaran</span>

            <div className="step3-center-header">
              <h1 className="step3-main-title">Panduan Pembayaran</h1>
              <p className="step3-subtitle">Silakan transfer tepat sesuai nominal berikut</p>
              <div className="step3-big-amount">
                Rp {formatRupiah(getActiveAmount())}
              </div>
              <p className="step3-payment-note">Dengan pembayaran menggunakan</p>
              <div className="step3-qris-icon-wrap">
                <img src={qrisLogo} alt="QRIS" className="qris-brand-img" />
              </div>
            </div>

            {/* QR Code Poster (Exact Figma QRIS Card) */}
            <div className="step3-qr-poster-wrap">
              <img
                src={qrisCode}
                alt="QR Code QRIS NutriKids"
                className="step3-qr-poster-img"
              />
            </div>

            {/* Download Button */}
            <div className="step3-download-wrap">
              <button
                type="button"
                className="btn-download-qr"
                onClick={handleDownloadQR}
              >
                Download QR Code
              </button>
            </div>

            {/* Tata Cara Pembayaran Box */}
            <div className="step3-instructions-card">
              <h3 className="instructions-title">Tata cara pembayaran</h3>
              <ul className="instructions-list">
                <li>
                  Download atau screenshot <strong>QR code</strong>
                </li>
                <li>buka aplikasi pembayaran</li>
                <li>
                  pilih <strong>&ldquo;pay&rdquo;</strong> atau <strong>&ldquo;scan&rdquo;</strong>
                </li>
                <li>
                  upload file <strong>gambar QR code</strong>
                </li>
                <li>
                  masukkan <strong>kode PIN</strong>
                </li>
                <li>selesai</li>
              </ul>
            </div>

            {/* Cek Status Pembayaran Button */}
            <button
              type="button"
              className="btn-donation-primary"
              onClick={() => {
                setStep(4);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Cek Status Pembayaran
            </button>
          </div>
        )}

        {/* ================= STEP 4: STATUS MENUNGGU PEMBAYARAN (Image 5) ================= */}
        {step === 4 && (
          <div className="donation-card-figma step-4-card">
            {/* Thank you greeting */}
            <div className="step4-greeting-wrap">
              <h1 className="step4-thank-title">
                Terima kasih, {isAnonymous ? 'Orang Baik' : fullName || 'Orang Baik'}!
              </h1>
              <p className="step4-thank-subtitle">Sudah Berbagi Bahagia</p>
            </div>

            {/* Transaction Detail Card */}
            <div className="step4-details-card">
              <h3 className="step4-details-title">Detail transaksi</h3>
              <div className="step4-detail-row">
                <span className="step4-row-label">Pembayaran Via</span>
                <div className="step4-row-val">
                  <img src={qrisLogo} alt="QRIS" className="qris-brand-img" />
                </div>
              </div>
              <div className="step4-detail-row">
                <span className="step4-row-label">Nominal</span>
                <span className="step4-row-val nominal-text">
                  Rp {formatRupiah(getActiveAmount())}
                </span>
              </div>
            </div>

            {/* Status Box (Red Outline) */}
            <div className="step4-status-box">
              <span className="step4-status-text">Menunggu Pembayaran</span>
            </div>

            {/* Belum Transfer Action */}
            <button
              type="button"
              className="btn-donation-primary btn-step4-retry"
              onClick={() => {
                setStep(3);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Belum Transfer? Klik di sini
            </button>

            {/* Dual CTA: Kontak CS & Kembali ke Halaman */}
            <div className="step4-actions-row">
              <a
                href="https://wa.me/6281123456789?text=Halo%20Nutrikids%2C%20saya%20ingin%20konfirmasi%20donasi."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-contact-cs"
              >
                <span className="cs-icon">💬</span> Kontak CS
              </a>

              <button
                type="button"
                className="btn-return-home"
                onClick={onNavigateHome}
              >
                Kembali ke halaman <span>&rarr;</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
