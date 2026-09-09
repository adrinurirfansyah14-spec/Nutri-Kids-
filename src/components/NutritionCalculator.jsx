import React, { useState } from 'react';
import foodBanner from '../assets/food-banner.jpg';
import girlImg from '../assets/girl-reading.jpg';
import boyImg from '../assets/boy-reading.jpg';
import { calculateChildNutrition, saveGrowthRecord } from '../services/nutritionCalculator';
import './NutritionCalculator.css';

export default function NutritionCalculator({ onNavigateTab }) {
  const [gender, setGender] = useState('girl'); // 'girl' or 'boy'
  const [ageMonths, setAgeMonths] = useState('24');
  const [weightKg, setWeightKg] = useState('11.5');
  const [heightCm, setHeightCm] = useState('86');

  // Hasil Perhitungan
  const [result, setResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleCalculate = (e) => {
    if (e) e.preventDefault();
    setErrorMessage('');
    setSaveSuccess(false);

    try {
      const calcResult = calculateChildNutrition({
        gender,
        ageMonths,
        weightKg,
        heightCm,
      });
      setResult(calcResult);

      // Smooth scroll to results
      setTimeout(() => {
        const resEl = document.getElementById('calculator-result-section');
        if (resEl) {
          resEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } catch (err) {
      setErrorMessage(err.message || 'Terjadi kesalahan saat menghitung.');
      setResult(null);
    }
  };

  const handleSaveToMonitoring = () => {
    if (!result) return;
    saveGrowthRecord(result);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="nutrition-calc-page">
      {/* 1. HERO FOOD BANNER (Figma Image 5) */}
      <div className="calc-header-banner">
        <img
          src={foodBanner}
          alt="Aneka Makanan Bergizi Seimbang Nutrikids"
          className="calc-banner-image"
        />
        <div className="calc-banner-overlay">
          {/* Frosted Glass Badge Pill (Figma Image 5) */}
          <div className="frosted-calc-pill">
            <span className="pill-accent-line"></span>
            <span className="pill-leaf-icon">🍃</span>
            <span className="pill-text">Kalkulator Gizi</span>
          </div>
        </div>
      </div>

      {/* 2. CALCULATOR FORM CARD (Figma Image 4) */}
      <div className="calc-content-container">
        <div className="calc-main-card">
          {/* Title and Subtitle */}
          <div className="calc-card-header">
            <h2 className="calc-top-tag">Kalkulator Perhitungan</h2>
            <h1 className="calc-main-title">Status Perkembangan Gizi Anak</h1>
            <p className="calc-child-prompt">Anak anda :</p>
          </div>

          {/* Gender Selector with Chibi Avatars (Figma Image 4) */}
          <div className="gender-selector-grid">
            {/* Perempuan */}
            <div
              className={`gender-option-card ${gender === 'girl' ? 'active' : ''}`}
              onClick={() => setGender('girl')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setGender('girl')}
            >
              <div className="avatar-img-wrapper">
                <img src={girlImg} alt="Anak Perempuan" className="chibi-avatar" />
              </div>
              <span className="gender-label">Perempuan</span>
              {gender === 'girl' && <span className="active-check">✓</span>}
            </div>

            {/* Laki - Laki */}
            <div
              className={`gender-option-card ${gender === 'boy' ? 'active' : ''}`}
              onClick={() => setGender('boy')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setGender('boy')}
            >
              <div className="avatar-img-wrapper">
                <img src={boyImg} alt="Anak Laki - Laki" className="chibi-avatar" />
              </div>
              <span className="gender-label">Laki - Laki</span>
              {gender === 'boy' && <span className="active-check">✓</span>}
            </div>
          </div>

          {/* Input Form Fields */}
          <form className="calc-input-form" onSubmit={handleCalculate}>
            {/* Usia Anak (Bulan) */}
            <div className="calc-input-row">
              <label htmlFor="ageMonths" className="calc-input-label">
                Usia Anak (Bulan) :
              </label>
              <div className="calc-input-composite">
                <input
                  id="ageMonths"
                  type="number"
                  step="1"
                  min="0"
                  max="120"
                  value={ageMonths}
                  onChange={(e) => setAgeMonths(e.target.value)}
                  placeholder="24"
                  className="calc-inner-input"
                  required
                />
                <span className="calc-unit-badge">Bulan</span>
              </div>
            </div>

            {/* Berat Badan Anak (Kg) */}
            <div className="calc-input-row">
              <label htmlFor="weightKg" className="calc-input-label">
                Berat Badan Anak :
              </label>
              <div className="calc-input-composite">
                <input
                  id="weightKg"
                  type="number"
                  step="0.1"
                  min="1"
                  max="80"
                  value={weightKg}
                  onChange={(e) => setWeightKg(e.target.value)}
                  placeholder="11.5"
                  className="calc-inner-input"
                  required
                />
                <span className="calc-unit-badge">Kg</span>
              </div>
            </div>

            {/* Tinggi Badan Anak (Cm) */}
            <div className="calc-input-row">
              <label htmlFor="heightCm" className="calc-input-label">
                Tinggi Badan Anak :
              </label>
              <div className="calc-input-composite">
                <input
                  id="heightCm"
                  type="number"
                  step="0.1"
                  min="30"
                  max="180"
                  value={heightCm}
                  onChange={(e) => setHeightCm(e.target.value)}
                  placeholder="86"
                  className="calc-inner-input"
                  required
                />
                <span className="calc-unit-badge">Cm</span>
              </div>
            </div>

            {/* Note instruction */}
            <p className="calc-instruction-note">
              Note : Masukkan dalam bentuk angka satuan
            </p>

            {/* Error Message */}
            {errorMessage && (
              <div className="calc-error-banner">
                <span>⚠️</span> {errorMessage}
              </div>
            )}

            {/* Hitung Button (Figma Image 4: Soft Blue Pill Button) */}
            <div className="calc-submit-container">
              <button type="submit" className="btn-calc-submit">
                Hitung <span>&rarr;</span>
              </button>
            </div>
          </form>
        </div>

        {/* 3. FUNCTIONAL DIAGNOSIS RESULTS (Appears after calculation) */}
        {result && (
          <div id="calculator-result-section" className="calc-results-wrapper">
            <div className="results-header-box">
              <div className="results-title-group">
                <span className="results-pill-badge">Hasil Evaluasi Medis Gizi</span>
                <h3 className="results-main-title">
                  Laporan Deteksi Gizi Anak ({result.gender === 'girl' ? 'Perempuan' : 'Laki-Laki'}, {result.ageMonths} Bulan)
                </h3>
              </div>
              <div className="results-actions-top">
                <button
                  type="button"
                  className="btn-result-action btn-save-monitoring"
                  onClick={handleSaveToMonitoring}
                >
                  {saveSuccess ? '✓ Tersimpan di Monitoring!' : '💾 Simpan ke Monitoring'}
                </button>
                <button
                  type="button"
                  className="btn-result-action btn-print-report"
                  onClick={handlePrint}
                >
                  🖨️ Cetak Laporan
                </button>
              </div>
            </div>

            {/* Status 3 Dimensi WHO Grid */}
            <div className="status-cards-grid">
              {/* BB / U */}
              <div className="status-diag-card" style={{ borderTopColor: result.weightStatus.color }}>
                <div className="diag-card-head">
                  <span className="diag-code">BB / U (Berat menurut Usia)</span>
                  <span
                    className="diag-badge"
                    style={{ backgroundColor: result.weightStatus.color + '22', color: result.weightStatus.color }}
                  >
                    {result.weightStatus.text}
                  </span>
                </div>
                <p className="diag-desc">{result.weightStatus.desc}</p>
                <div className="diag-metric-row">
                  <span>Berat saat ini: <strong>{result.weightKg} kg</strong></span>
                  <span>Target Ideal: <strong>{result.idealWeight} kg</strong></span>
                </div>
              </div>

              {/* TB / U (Stunting Detection) */}
              <div className="status-diag-card" style={{ borderTopColor: result.heightStatus.color }}>
                <div className="diag-card-head">
                  <span className="diag-code">TB / U (Indikator Stunting)</span>
                  <span
                    className="diag-badge"
                    style={{ backgroundColor: result.heightStatus.color + '22', color: result.heightStatus.color }}
                  >
                    {result.heightStatus.text}
                  </span>
                </div>
                <p className="diag-desc">{result.heightStatus.desc}</p>
                <div className="diag-metric-row">
                  <span>Tinggi saat ini: <strong>{result.heightCm} cm</strong></span>
                  <span>Target Ideal: <strong>{result.idealHeight} cm</strong></span>
                </div>
              </div>

              {/* BB / TB (Wasting / Gizi Akut) */}
              <div className="status-diag-card" style={{ borderTopColor: result.wastingStatus.color }}>
                <div className="diag-card-head">
                  <span className="diag-code">BB / TB (Indikator Wasting)</span>
                  <span
                    className="diag-badge"
                    style={{ backgroundColor: result.wastingStatus.color + '22', color: result.wastingStatus.color }}
                  >
                    {result.wastingStatus.text}
                  </span>
                </div>
                <p className="diag-desc">{result.wastingStatus.desc}</p>
                <div className="diag-metric-row">
                  <span>IMT Anak: <strong>{result.bmi} kg/m²</strong></span>
                  <span>Kondisi Fisik: <strong>Proporsional</strong></span>
                </div>
              </div>
            </div>

            {/* Kebutuhan Nutrisi & Rekomendasi Ahli */}
            <div className="nutrition-target-panel">
              <div className="target-col-metrics">
                <h4 className="target-subheading">Kebutuhan Harian Anak (Kemenkes RI):</h4>
                <div className="metric-pill-list">
                  <div className="target-metric-box">
                    <span className="metric-icon">⚡</span>
                    <div className="metric-details">
                      <span className="metric-val">{result.dailyCalories} kkal</span>
                      <span className="metric-label">Energi Harian</span>
                    </div>
                  </div>

                  <div className="target-metric-box">
                    <span className="metric-icon">🥩</span>
                    <div className="metric-details">
                      <span className="metric-val">{result.dailyProtein} gram</span>
                      <span className="metric-label">Protein Hewani & Nabati</span>
                    </div>
                  </div>

                  <div className="target-metric-box">
                    <span className="metric-icon">💧</span>
                    <div className="metric-details">
                      <span className="metric-val">{result.waterMl} ml</span>
                      <span className="metric-label">Cairan / Air Putih</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="target-col-advice">
                <h4 className="target-subheading">Rekomendasi Tindakan Ahli Gizi:</h4>
                <ul className="expert-advice-list">
                  {result.specificAdvice.map((adv, idx) => (
                    <li key={idx}>
                      <span className="adv-bullet">🥑</span>
                      <span>{adv}</span>
                    </li>
                  ))}
                </ul>

                {onNavigateTab && (
                  <div className="advice-cta-bar">
                    <button
                      type="button"
                      className="btn btn-lime-figma btn-goto-food"
                      onClick={() => onNavigateTab('rekomendasi')}
                    >
                      Lihat Rekomendasi Menu Bergizi Sesuai Usia <span>&rarr;</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
