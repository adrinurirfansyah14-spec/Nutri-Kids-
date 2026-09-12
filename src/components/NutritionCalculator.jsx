import React, { useState } from 'react';
import {
  calculateChildNutrition,
  saveGrowthRecord,
  formatToShortDate,
} from '../services/nutritionCalculator';
import { childApi, getToken } from '../services/api';
import './NutritionCalculator.css';

export default function NutritionCalculator({
  onNavigateTab,
  currentUser = null,
  onRequireAuth,
}) {
  // Mode tampilan: 'form' (Input Cek Gizi) | 'result' (Hasil Skrining)
  const [viewMode, setViewMode] = useState('form');

  // Form states (Gambar 1) - Default input kosong sesuai instruksi revisi
  const [childName, setChildName] = useState('');
  const [ageValue, setAgeValue] = useState('');
  const [ageUnit, setAgeUnit] = useState('bulan'); // 'bulan' | 'tahun'
  const [gender, setGender] = useState('boy'); // 'boy' | 'girl'
  const [weightKg, setWeightKg] = useState('');
  const [heightCm, setHeightCm] = useState('');

  // Hasil kalkulasi aktif
  const [calculationResult, setCalculationResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [authPromptOpen, setAuthPromptOpen] = useState(false);

  // Hitung usia dalam bulan untuk kalkulasi standar WHO
  const calculateEffectiveAgeMonths = () => {
    const num = parseFloat(ageValue);
    if (isNaN(num)) return 0;
    return ageUnit === 'tahun' ? num * 12 : num;
  };

  // 1. Submit Form -> Pindah ke Hasil Skrining (Gambar 2)
  const handleAnalyze = (e) => {
    if (e) e.preventDefault();
    setErrorMessage('');

    const effectiveAge = calculateEffectiveAgeMonths();

    if (!childName.trim()) {
      setErrorMessage('Silakan masukkan nama anak anda.');
      return;
    }
    if (!ageValue || effectiveAge <= 0) {
      setErrorMessage('Silakan masukkan usia anak yang valid.');
      return;
    }
    if (!weightKg || parseFloat(weightKg) <= 0) {
      setErrorMessage('Silakan masukkan berat badan yang valid.');
      return;
    }
    if (!heightCm || parseFloat(heightCm) <= 0) {
      setErrorMessage('Silakan masukkan tinggi badan yang valid.');
      return;
    }

    try {
      const calc = calculateChildNutrition({
        gender,
        ageMonths: effectiveAge,
        weightKg,
        heightCm,
      });

      const displayAge =
        ageUnit === 'tahun'
          ? `${ageValue} tahun (${Math.round(effectiveAge)} bulan)`
          : `${ageValue} bulan`;

      const resultPayload = {
        ...calc,
        childName: childName.trim(),
        ageDisplay: displayAge,
        rawAgeValue: ageValue,
        ageUnit,
      };

      setCalculationResult(resultPayload);
      setIsSaved(false);
      setViewMode('result');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setErrorMessage(err.message || 'Gagal menganalisis kondisi gizi.');
    }
  };

  // Eksekusi penyimpanan data ke storage dan sinkronisasi ke backend
  const executeSaveRecord = async (targetResult) => {
    const userKey = currentUser ? currentUser.email || currentUser.username || currentUser.id : null;
    
    // 1. Simpan ke local user storage
    saveGrowthRecord(
      {
        childName: targetResult.childName,
        gender: targetResult.gender,
        ageMonths: targetResult.ageMonths,
        ageDisplay: targetResult.ageDisplay,
        heightCm: targetResult.heightCm,
        weightKg: targetResult.weightKg,
        statusText: targetResult.stuntingRisk.title,
        statusLevel: targetResult.stuntingRisk.level,
        statusColor: targetResult.stuntingRisk.color,
        dateLabel: formatToShortDate(),
      },
      userKey
    );

    // 2. Sinkronisasi ke backend jika token login tersedia
    const activeToken = currentUser?.token || getToken();
    if (activeToken) {
      try {
        await childApi.addChild({
          name: targetResult.childName,
          gender: targetResult.gender,
          weight: targetResult.weightKg,
          height: targetResult.heightCm,
        });
      } catch (err) {
        console.warn('[NutriKids API] Data disimpan lokal (backend belum terhubung):', err.message);
      }
    }

    // Reset input form data sesuai revisi pengguna
    setChildName('');
    setAgeValue('');
    setWeightKg('');
    setHeightCm('');

    setIsSaved(true);
  };

  // 2. Simpan Data dari Hasil Skrining -> Validasi Login Dahulu
  const handleSaveData = () => {
    if (!calculationResult) return;

    // Jika belum login, minta login terlebih dahulu
    if (!currentUser) {
      setAuthPromptOpen(true);
      return;
    }

    // Jika sudah login, langsung simpan tanpa perlu login/daftar lagi
    executeSaveRecord(calculationResult);
  };

  // Handler saat user login dari modal prompt simpan data
  const handleAuthPromptConfirm = () => {
    setAuthPromptOpen(false);
    if (onRequireAuth) {
      onRequireAuth({
        pendingResult: calculationResult,
        onSuccess: () => {
          executeSaveRecord(calculationResult);
        },
      });
    }
  };

  const handleBackToForm = () => {
    setViewMode('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="nutrikids-feature-page">
      <div className="feature-container">
        {/* =========================================================================
            TAMPILAN 1: CEK GIZI - KALKULATOR PERHITUNGAN (FIGMA GAMBAR 1)
           ========================================================================= */}
        {viewMode === 'form' && (
          <div className="feature-view-wrapper">
            {/* Page Title with Green Accent Bar + Riwayat Shortcut */}
            <div className="calc-top-header-row">
              <div className="page-heading-with-bar">
                <span className="accent-bar-green"></span>
                <h1 className="page-heading-text">Cek kondisi gizi anak</h1>
              </div>
              {currentUser && onNavigateTab && (
                <button
                  type="button"
                  className="btn-pill-history-nav"
                  onClick={() => onNavigateTab('riwayat')}
                >
                  📋 Riwayat Cek Gizi
                </button>
              )}
            </div>

            {/* Main Form Card */}
            <div className="feature-main-card">
              <div className="card-top-sub">
                <span className="card-sub-green">Kalkulator Perhitungan</span>
                <h2 className="card-heading-dark">Status Perkembangan Gizi Anak</h2>
              </div>

              {errorMessage && (
                <div className="calc-alert-banner">
                  <span>⚠️ {errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleAnalyze} className="calc-modern-form">
                {/* 1. Nama anak anda */}
                <div className="form-group-modern">
                  <label htmlFor="childNameInput" className="form-label-modern">
                    Nama anak anda:
                  </label>
                  <input
                    id="childNameInput"
                    type="text"
                    value={childName}
                    onChange={(e) => setChildName(e.target.value)}
                    placeholder="Masukan nama anak anda"
                    className="pill-input-modern"
                    required
                  />
                </div>

                {/* 2. Row: Usia & Jenis Kelamin */}
                <div className="form-row-two-col">
                  {/* Usia dengan Toggle Bulan / Tahun */}
                  <div className="form-group-modern">
                    <label htmlFor="ageInput" className="form-label-modern">
                      Usia:
                    </label>
                    <div className="age-input-capsule-group">
                      <input
                        id="ageInput"
                        type="number"
                        step="any"
                        min="0"
                        value={ageValue}
                        onChange={(e) => setAgeValue(e.target.value)}
                        placeholder="Contoh: 3"
                        className="pill-input-modern age-pill-input"
                        required
                      />
                      <div className="unit-toggle-capsule">
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

                  {/* Jenis Kelamin dengan Indikator Cyan/Biru */}
                  <div className="form-group-modern">
                    <span className="form-label-modern">Jenis kelamin:</span>
                    <div className="gender-selector-row">
                      <div
                        className={`gender-radio-item ${gender === 'boy' ? 'selected' : ''}`}
                        onClick={() => setGender('boy')}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && setGender('boy')}
                      >
                        <span className="gender-radio-title">Laki Laki</span>
                        <span className="radio-circle-indicator cyan">
                          {gender === 'boy' && <span className="inner-dot"></span>}
                        </span>
                      </div>

                      <div
                        className={`gender-radio-item ${gender === 'girl' ? 'selected' : ''}`}
                        onClick={() => setGender('girl')}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && setGender('girl')}
                      >
                        <span className="gender-radio-title">Perempuan</span>
                        <span className="radio-circle-indicator gray">
                          {gender === 'girl' && <span className="inner-dot"></span>}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Row: Berat Badan & Tinggi Badan */}
                <div className="form-row-two-col">
                  <div className="form-group-modern">
                    <label htmlFor="weightInput" className="form-label-modern">
                      Berat Badan(Kg)
                    </label>
                    <input
                      id="weightInput"
                      type="number"
                      step="any"
                      min="1"
                      value={weightKg}
                      onChange={(e) => setWeightKg(e.target.value)}
                      placeholder="Contoh: 12"
                      className="pill-input-modern"
                      required
                    />
                  </div>

                  <div className="form-group-modern">
                    <label htmlFor="heightInput" className="form-label-modern">
                      Tinggi Badan(cm)
                    </label>
                    <input
                      id="heightInput"
                      type="number"
                      step="any"
                      min="30"
                      value={heightCm}
                      onChange={(e) => setHeightCm(e.target.value)}
                      placeholder="Contoh: 185"
                      className="pill-input-modern"
                      required
                    />
                  </div>
                </div>

                {/* 4. Tombol Analisis kondisi gizi */}
                <div className="calc-action-row">
                  <button type="submit" className="btn-teal-pill btn-analisis">
                    Analisis kondisi gizi
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAMPILAN 2: HASIL SKRINING (FIGMA GAMBAR 2)
           ========================================================================= */}
        {viewMode === 'result' && calculationResult && (
          <div className="feature-view-wrapper">
            {/* Page Title with Green Accent Bar */}
            <div className="page-heading-with-bar">
              <span className="accent-bar-green"></span>
              <h1 className="page-heading-text">Cek kondisi gizi anak</h1>
            </div>

            {/* Result Main Card */}
            <div className="feature-main-card result-card">
              {/* 4 Summary Gray Metric Boxes */}
              <div className="summary-boxes-grid">
                <div className="summary-box-item">
                  <span className="box-item-label">Nama</span>
                  <span className="box-item-val">{calculationResult.childName}</span>
                </div>

                <div className="summary-box-item">
                  <span className="box-item-label">Usia</span>
                  <span className="box-item-val">
                    {calculationResult.rawAgeValue} {calculationResult.ageUnit}
                  </span>
                </div>

                <div className="summary-box-item">
                  <span className="box-item-label">Tinggi badan</span>
                  <span className="box-item-val">{calculationResult.heightCm} cm</span>
                </div>

                <div className="summary-box-item">
                  <span className="box-item-label">Berat badan</span>
                  <span className="box-item-val">{calculationResult.weightKg} kg</span>
                </div>
              </div>

              {/* Status Section in Center */}
              <div className="result-center-block">
                <h2
                  className="result-risk-title"
                  style={{ color: calculationResult.stuntingRisk.color }}
                >
                  {calculationResult.stuntingRisk.title}
                </h2>
                <p className="result-risk-subtext">
                  {calculationResult.stuntingRisk.subtextLine1}
                  <br />
                  <strong>{calculationResult.stuntingRisk.subtextLine2}</strong>
                </p>
              </div>

              {/* Status Sukses Simpan Data */}
              {isSaved && (
                <div className="save-success-notification">
                  <span className="save-success-icon">✓</span>
                  <div className="save-success-info">
                    <strong>Catatan Gizi Berhasil Disimpan!</strong>
                    <span>
                      Data anak ({calculationResult.childName}) berhasil disimpan. Form input telah di-reset untuk pemeriksaan baru.
                    </span>
                  </div>
                </div>
              )}

              {/* Action Buttons: Simpan data & Kembali */}
              <div className="result-btn-actions">
                {!isSaved ? (
                  <button
                    type="button"
                    className="btn-teal-pill btn-action-pill"
                    onClick={handleSaveData}
                  >
                    Simpan data
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn-teal-pill btn-action-pill btn-saved-disabled"
                    disabled
                  >
                    ✓ Data Tersimpan
                  </button>
                )}

                <button
                  type="button"
                  className="btn-teal-pill btn-action-pill"
                  onClick={handleBackToForm}
                >
                  {isSaved ? 'Cek Gizi Lagi' : 'Kembali'}
                </button>

                {isSaved && onNavigateTab && (
                  <button
                    type="button"
                    className="btn-history-shortcut"
                    onClick={() => onNavigateTab('riwayat')}
                  >
                    📋 Buka Riwayat Cek Gizi &rarr;
                  </button>
                )}

                {onNavigateTab && (
                  <button
                    type="button"
                    className="btn-lime-rekomendasi"
                    onClick={() => {
                      onNavigateTab('rekomendasi');
                    }}
                  >
                    Lihat Rekomendasi Makanan &rarr;
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Modal Prompt Login saat Simpan Data */}
        {authPromptOpen && (
          <div
            className="calc-auth-modal-backdrop"
            onClick={() => setAuthPromptOpen(false)}
          >
            <div
              className="calc-auth-modal-card"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="calc-auth-icon-circle">🔐</div>
              <h3 className="calc-auth-prompt-title">Masuk untuk Menyimpan Data</h3>
              <p className="calc-auth-prompt-desc">
                Anda perlu masuk atau mendaftar akun NutriKids terlebih dahulu agar
                catatan perkembangan gizi anak tersimpan aman di akun Anda.
              </p>
              <div className="calc-auth-prompt-actions">
                <button
                  type="button"
                  className="btn-teal-pill btn-prompt-confirm"
                  onClick={handleAuthPromptConfirm}
                >
                  Masuk / Daftar Akun &rarr;
                </button>
                <button
                  type="button"
                  className="btn-prompt-cancel"
                  onClick={() => setAuthPromptOpen(false)}
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
