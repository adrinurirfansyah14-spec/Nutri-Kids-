import React, { useState } from 'react';
import { getSavedGrowthRecords, deleteGrowthRecord } from '../services/nutritionCalculator';
import './GrowthMonitoring.css';

export default function GrowthMonitoring({ onNavigateCalculator }) {
  const [records, setRecords] = useState(() => getSavedGrowthRecords());

  const handleDelete = (id) => {
    if (window.confirm('Hapus catatan pemeriksaan ini?')) {
      const updated = deleteGrowthRecord(id);
      setRecords(updated);
    }
  };

  const latestRecord = records.length > 0 ? records[0] : null;

  return (
    <div className="growth-monitoring-page">
      {/* Header */}
      <div className="monitoring-header">
        <div className="monitoring-container">
          <span className="monitoring-tag">Buku KIA Digital</span>
          <h1 className="monitoring-title">Monitoring Tumbuh Kembang Anak</h1>
          <p className="monitoring-subtitle">
            Catat dan pantau grafik kenaikan berat badan serta tinggi badan anak secara berkala untuk deteksi dini dan pencegahan malnutrisi kronis.
          </p>
          <button
            type="button"
            className="btn btn-lime-figma btn-add-measurement"
            onClick={onNavigateCalculator}
          >
            ➕ Input Pengukuran Baru <span>&rarr;</span>
          </button>
        </div>
      </div>

      <div className="monitoring-container">
        {/* Metric Summary Cards */}
        {latestRecord && (
          <div className="monitoring-summary-grid">
            <div className="summary-card">
              <span className="sum-icon">⚖️</span>
              <div className="sum-details">
                <span className="sum-label">Berat Badan Terakhir</span>
                <strong className="sum-val">{latestRecord.weightKg} kg</strong>
                <span className="sum-sub">Target: {latestRecord.idealWeight} kg</span>
              </div>
            </div>

            <div className="summary-card">
              <span className="sum-icon">📏</span>
              <div className="sum-details">
                <span className="sum-label">Tinggi Badan Terakhir</span>
                <strong className="sum-val">{latestRecord.heightCm} cm</strong>
                <span className="sum-sub">Target: {latestRecord.idealHeight} cm</span>
              </div>
            </div>

            <div className="summary-card">
              <span className="sum-icon">🩺</span>
              <div className="sum-details">
                <span className="sum-label">Status Deteksi Stunting</span>
                <strong
                  className="sum-val"
                  style={{ color: latestRecord.heightStatus.color }}
                >
                  {latestRecord.heightStatus.text}
                </strong>
                <span className="sum-sub">{latestRecord.ageMonths} Bulan</span>
              </div>
            </div>

            <div className="summary-card">
              <span className="sum-icon">🥗</span>
              <div className="sum-details">
                <span className="sum-label">Target Kalori Harian</span>
                <strong className="sum-val">{latestRecord.dailyCalories} kkal</strong>
                <span className="sum-sub">Protein: {latestRecord.dailyProtein}g / hari</span>
              </div>
            </div>
          </div>
        )}

        {/* History Table */}
        <div className="history-table-card">
          <div className="history-header">
            <h3>Riwayat Pengukuran Antropometri</h3>
            <span className="record-count">Total: {records.length} Catatan</span>
          </div>

          {records.length > 0 ? (
            <div className="table-responsive">
              <table className="monitoring-table">
                <thead>
                  <tr>
                    <th>Tanggal</th>
                    <th>Anak</th>
                    <th>Usia</th>
                    <th>Berat (Kg)</th>
                    <th>Tinggi (Cm)</th>
                    <th>Status Gizi</th>
                    <th>Indikator Stunting</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((rec) => (
                    <tr key={rec.id}>
                      <td className="date-cell">{rec.dateLabel}</td>
                      <td>
                        <span className="gender-pill">
                          {rec.gender === 'girl' ? '👧 Perempuan' : '👦 Laki-Laki'}
                        </span>
                      </td>
                      <td><strong>{rec.ageMonths}</strong> Bulan</td>
                      <td><strong>{rec.weightKg}</strong> kg</td>
                      <td><strong>{rec.heightCm}</strong> cm</td>
                      <td>
                        <span
                          className="table-status-badge"
                          style={{
                            backgroundColor: rec.weightStatus.color + '20',
                            color: rec.weightStatus.color,
                          }}
                        >
                          {rec.weightStatus.text}
                        </span>
                      </td>
                      <td>
                        <span
                          className="table-status-badge"
                          style={{
                            backgroundColor: rec.heightStatus.color + '20',
                            color: rec.heightStatus.color,
                          }}
                        >
                          {rec.heightStatus.text}
                        </span>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn-del-record"
                          onClick={() => handleDelete(rec.id)}
                          title="Hapus data"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-monitoring-box">
              <span className="empty-icon">📊</span>
              <h4>Belum Ada Catatan Monitoring</h4>
              <p>
                Gunakan Kalkulator Gizi untuk memeriksa status antropometri anak dan simpan datanya ke riwayat monitoring ini.
              </p>
              <button
                type="button"
                className="btn btn-lime-figma"
                onClick={onNavigateCalculator}
              >
                Cek Gizi Sekarang <span>&rarr;</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
