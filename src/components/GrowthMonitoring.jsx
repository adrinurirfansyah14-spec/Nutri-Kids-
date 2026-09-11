import React, { useState } from 'react';
import { getSavedGrowthRecords, deleteGrowthRecord } from '../services/nutritionCalculator';
import './GrowthMonitoring.css';

export default function GrowthMonitoring({ onNavigateCalculator }) {
  const [records, setRecords] = useState(() => getSavedGrowthRecords());
  const [openMenuId, setOpenMenuId] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm('Hapus data catatan pemeriksaan ini?')) {
      const updated = deleteGrowthRecord(id);
      setRecords(updated);
      setOpenMenuId(null);
    }
  };

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  // Ambil nama anak dari catatan terbaru atau default sesuai mockup Gambar 3
  const childName =
    records.length > 0 && records[records.length - 1].childName
      ? records[records.length - 1].childName
      : 'Fauzan Al Khawarizmi';

  return (
    <div className="nutrikids-monitoring-page">
      <div className="monitoring-content-wrapper">
        {/* Header Bar: Accent Bar + Judul di kiri, Tombol Kembali (olive) di kanan */}
        <div className="monitoring-section-header">
          <div className="header-left-title">
            <div className="accent-bar-green"></div>
            <h1 className="section-title-text">Monitoring</h1>
          </div>
          <button
            type="button"
            className="btn-monitoring-back"
            onClick={onNavigateCalculator}
          >
            Kembali
          </button>
        </div>

        {/* White Card Container (Sesuai Gambar 3 Mockup) */}
        <div className="monitoring-white-card">
          {/* Subheader: Nama Anak */}
          <div className="child-name-header">
            <span className="name-bold-label">Nama:</span>{' '}
            <span className="name-regular-text">{childName}</span>
          </div>

          {/* Garis Pembatas Horizontal Halus */}
          <div className="monitoring-divider-line"></div>

          {/* Tabel Riwayat */}
          <div className="monitoring-table-container">
            <table className="monitoring-records-table">
              <thead>
                <tr>
                  <th>Tanggal</th>
                  <th>Usia (bulan)</th>
                  <th>Tinggi badan (cm)</th>
                  <th>Berat badan (kg)</th>
                  <th>Status</th>
                  <th className="th-action"></th>
                </tr>
              </thead>
              <tbody>
                {records.map((rec) => (
                  <tr key={rec.id} className="table-data-row">
                    <td>{rec.dateLabel}</td>
                    <td>{rec.ageMonths}</td>
                    <td>{rec.heightCm}</td>
                    <td>{rec.weightKg}</td>
                    <td className="status-cell">{rec.statusText}</td>
                    <td className="action-cell">
                      <div className="action-menu-wrapper">
                        <button
                          type="button"
                          className="btn-dots-action"
                          onClick={() => toggleMenu(rec.id)}
                          aria-label="Menu Aksi"
                        >
                          •••
                        </button>
                        {openMenuId === rec.id && (
                          <div className="action-popover-menu">
                            <button
                              type="button"
                              className="popover-item danger"
                              onClick={() => handleDelete(rec.id)}
                            >
                              Hapus Data
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

