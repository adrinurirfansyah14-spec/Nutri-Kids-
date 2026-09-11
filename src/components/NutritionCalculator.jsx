import React, { useState } from 'react';
import { calculateChildNutrition, saveGrowthRecord } from '../services/nutritionCalculator';
import './NutritionCalculator.css';

export default function NutritionCalculator({ onNavigateTab }) {
  // Mode tampilan: 'form' (Gambar 1) atau 'result' (Gambar 2)
  const [viewMode, setViewMode] = useState('form');

  // Input states
  const [childName, setChildName] = useState('');
  const [ageValue, setAgeValue] = useState('');
  const [ageUnit, setAgeUnit] = useState('bulan'); // 'bulan' atau 'tahun'
  const [gender, setGender] = useState('boy'); // 'boy' (Laki Laki) atau 'girl' (Perempuan)
  const [weightKg, setWeightKg] = useState('');
  const [heightCm, setHeightCm] = useState('');

  // Hasil Perhitungan
  const [result, setResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const handleCalculate = (e) => {
    if (e) e.preventDefault();
    setErrorMessage('');

    // Konversi usia ke bulan jika unit yang dipilih adalah tahun
    let calculatedAgeMonths = parseFloat(ageValue);
    if (isNaN(calculatedAgeMonths) || calculatedAgeMonths <= 0) {
      setErrorMessage('Silakan masukkan usia anak yang valid.');
      return;
    }
    if (ageUnit === 'tahun') {
      calculatedAgeMonths = calculatedAgeMonths * 12;
    }

    const parsedWeight = parseFloat(weightKg);
    const parsedHeight = parseFloat(heightCm);

    if (isNaN(parsedWeight) || parsedWeight <= 0) {
      setErrorMessage('Silakan masukkan berat badan yang valid.');
      return;
    }
    if (isNaN(parsedHeight) || parsedHeight <= 0) {
      setErrorMessage('Silakan masukkan tinggi badan yang valid.');
      return;
    }

    try {
      const calcResult = calculateChildNutrition({
        childName: childName.trim() || 'Fauzan Al Khawarizmi',
        gender,
        ageMonths: calculatedAgeMonths,
        weightKg: parsedWeight,
        heightCm: parsedHeight,
      });

      setResult(calcResult);
      setIsSaved(false);
      setViewMode('result');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setErrorMessage(err.message || 'Terjadi kesalahan saat menghitung.');
    }
  };

  const handleSaveData = () => {
    if (!result) return;
    saveGrowthRecord(result);
    setIsSaved(true);

    // Langsung navigasi ke halaman Monitoring (Gambar 3)
    if (onNavigateTab) {
      onNavigateTab('monitoring');
    }
  };

  const handleBackToForm = () => {
    setViewMode('form');
    setErrorMessage('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="nutrikids-calc-page">
      {/* Container utama */}
      <div className="calc-content-wrapper">
        {/* Header dengan Aksen Garis Hijau Vertikal */}
        <div className="calc-section-header">
          <div className="accent-bar-green"></div>
          <h1 className="section-title-text">Cek kondisi gizi anak</h1>
        </div>

        {/* ========================================================================= */}
        {/* TAMPILAN 1: FORM INPUT KALKULATOR (Sesuai Gambar 1 Mockup)               */}
        {/* ========================================================================= */}
        {viewMode === 'form' && (
          <div className="calc-white-card">
            {/* Judul & Subjudul dalam Kartu */}
            <div className="card-heading-group">
              <span className="card-sub-green">Kalkulator Perhitungan</span>
              <h2 className="card-main-title">Status Perkembangan Gizi Anak</h2>
            </div>

            <form onSubmit={handleCalculate} className="calc-modern-form">
              {/* Field 1: Nama Anak */}
              <div className="form-group-full">
                <label className="form-field-label">Nama anak anda:</label>
                <input
                  type="text"
                  className="pill-input-field full-width"
                  placeholder="Masukan nama anak anda"
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                />
              </div>

              {/* Baris 2: Usia (dengan toggle Bulan/Tahun) & Jenis Kelamin */}
              <div className="form-two-col-row">
                {/* Kolom Kiri: Usia */}
                <div className="form-col-group">
                  <label className="form-field-label">Usia:</label>
                  <div className="age-input-composite">
                    <input
                      type="number"
                      step="any"
                      min="0"
                      className="pill-input-field age-number-input"
                      placeholder="Contoh: 3"
                      value={ageValue}
                      onChange={(e) => setAgeValue(e.target.value)}
                      required
                    />
                    <div className="unit-toggle-pill">
                      <button
                        type="button"
                        className={`unit-toggle-btn ${ageUnit === 'bulan' ? 'active' : ''}`}
                        onClick={() => setAgeUnit('bulan')}
                      >
                        Bulan
                      </button>
                      <button
                        type="button"
                        className={`unit-toggle-btn ${ageUnit === 'tahun' ? 'active' : ''}`}
                        onClick={() => setAgeUnit('tahun')}
                      >
                        Tahun
                      </button>
                    </div>
                  </div>
                </div>

                {/* Kolom Kanan: Jenis Kelamin */}
                <div className="form-col-group">
                  <label className="form-field-label">Jenis kelamin:</label>
                  <div className="gender-radio-container">
                    {/* Laki Laki */}
                    <div
                      className={`gender-radio-item ${gender === 'boy' ? 'selected' : ''}`}
                      onClick={() => setGender('boy')}
                    >
                      <span className="gender-name-label">Laki Laki</span>
                      <div className="radio-circle-indicator cyan-circle">
                        {gender === 'boy' && <div className="circle-inner-active"></div>}
                      </div>
                    </div>

                    {/* Perempuan */}
                    <div
                      className={`gender-radio-item ${gender === 'girl' ? 'selected' : ''}`}
                      onClick={() => setGender('girl')}
                    >
                      <span className="gender-name-label">Perempuan</span>
                      <div className="radio-circle-indicator gray-circle">
                        {gender === 'girl' && <div className="circle-inner-active"></div>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Baris 3: Berat Badan & Tinggi Badan */}
              <div className="form-two-col-row">
                {/* Kolom Kiri: Berat Badan */}
                <div className="form-col-group">
                  <label className="form-field-label">Berat Badan(Kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    className="pill-input-field"
                    placeholder="Contoh: 12"
                    value={weightKg}
                    onChange={(e) => setWeightKg(e.target.value)}
                    required
                  />
                </div>

                {/* Kolom Kanan: Tinggi Badan */}
                <div className="form-col-group">
                  <label className="form-field-label">Tinggi Badan(cm)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    className="pill-input-field"
                    placeholder="Contoh: 185"
                    value={heightCm}
                    onChange={(e) => setHeightCm(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Banner Pesan Error jika input tidak valid */}
              {errorMessage && (
                <div className="calc-validation-alert">
                  <span className="alert-icon">⚠️</span> {errorMessage}
                </div>
              )}

              {/* Tombol Submit Analisis */}
              <div className="form-submit-row">
                <button type="submit" className="btn-analisis-pill">
                  Analisis kondisi gizi
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAMPILAN 2: HASIL SKRINING & DETEKSI GIZI (Sesuai Gambar 2 Mockup)       */}
        {/* ========================================================================= */}
        {viewMode === 'result' && result && (
          <div className="calc-white-card result-card-mode">
            {/* 4 Kotak Ringkasan Abu-abu Bersebelahan */}
            <div className="result-metric-grid">
              {/* Box 1: Nama */}
              <div className="metric-box-item">
                <span className="metric-box-title">Nama</span>
                <span className="metric-box-value">{result.childName}</span>
              </div>

              {/* Box 2: Usia */}
              <div className="metric-box-item">
                <span className="metric-box-title">Usia</span>
                <span className="metric-box-value">{result.ageMonths} bulan</span>
              </div>

              {/* Box 3: Tinggi Badan */}
              <div className="metric-box-item">
                <span className="metric-box-title">Tinggi badan</span>
                <span className="metric-box-value">{result.heightCm}</span>
              </div>

              {/* Box 4: Berat Badan */}
              <div className="metric-box-item">
                <span className="metric-box-title">Berat badan</span>
                <span className="metric-box-value">{result.weightKg}</span>
              </div>
            </div>

            {/* Bagian Tengah: Teks Evaluasi Risiko Stunting */}
            <div className="result-evaluation-center">
              <h2 className="stunting-headline-title">{result.stuntingRiskText}</h2>
              <div className="stunting-subtext-group">
                <p className="subtext-line-1">{result.subtextLine1}</p>
                <p className="subtext-line-2">{result.subtextLine2}</p>
              </div>
            </div>

            {/* Dua Tombol Aksi di Bawah: Simpan Data & Kembali */}
            <div className="result-actions-row">
              <button
                type="button"
                className="btn-result-action-pill"
                onClick={handleSaveData}
              >
                {isSaved ? '✓ Data Tersimpan!' : 'Simpan data'}
              </button>
              <button
                type="button"
                className="btn-result-action-pill"
                onClick={handleBackToForm}
              >
                Kembali
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

