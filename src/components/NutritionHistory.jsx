import React, { useState, useEffect } from 'react';
import {
  getSavedGrowthRecords,
  deleteGrowthRecord,
  clearGrowthRecords,
  formatToShortDate,
} from '../services/nutritionCalculator';
import { childApi, getToken } from '../services/api';
import './NutritionHistory.css';

export default function NutritionHistory({
  currentUser = null,
  onNavigateTab,
  onOpenAuth,
}) {
  const userKey = currentUser ? currentUser.email || currentUser.username || currentUser.id : null;
  const [records, setRecords] = useState(() => getSavedGrowthRecords(userKey));

  // Perbarui riwayat saat userKey berubah
  useEffect(() => {
    setRecords(getSavedGrowthRecords(userKey));

    // Sinkronisasi data riwayat dari backend jika user terotentikasi
    const loadBackendRecords = async () => {
      const activeToken = currentUser?.token || getToken();
      if (!activeToken) return;

      try {
        const res = await childApi.getChildren();
        if (res && res.success && Array.isArray(res.children) && res.children.length > 0) {
          const backendItems = [];
          res.children.forEach((child) => {
            if (Array.isArray(child.growthHistory) && child.growthHistory.length > 0) {
              child.growthHistory.forEach((g, idx) => {
                backendItems.push({
                  id: `${child._id}-${idx}`,
                  childName: child.name,
                  gender: child.gender === 'Laki-laki' ? 'boy' : 'girl',
                  dateLabel: formatToShortDate(new Date(g.date || child.createdAt)),
                  ageMonths: child.birthDate
                    ? Math.max(1, Math.round((new Date() - new Date(child.birthDate)) / (1000 * 60 * 60 * 24 * 30.43)))
                    : 24,
                  ageDisplay: 'Catatan Database',
                  heightCm: g.height,
                  weightKg: g.weight,
                  statusText: g.status || 'Gizi Baik',
                  statusLevel:
                    g.status === 'Kekurangan Gizi'
                      ? 'danger'
                      : g.status === 'Gizi Kurang' || g.status === 'Risiko Obesitas'
                      ? 'warning'
                      : 'normal',
                  statusColor:
                    g.status === 'Kekurangan Gizi'
                      ? '#dc2626'
                      : g.status === 'Gizi Kurang' || g.status === 'Risiko Obesitas'
                      ? '#d97706'
                      : '#15803d',
                });
              });
            }
          });

          if (backendItems.length > 0) {
            const local = getSavedGrowthRecords(userKey);
            const combined = [
              ...backendItems,
              ...local.filter((l) => !backendItems.some((b) => b.childName === l.childName && b.dateLabel === l.dateLabel)),
            ];
            setRecords(combined);
          }
        }
      } catch (err) {
        console.warn('[NutriKids API] Riwayat memakai penyimpanan lokal:', err.message);
      }
    };

    loadBackendRecords();
  }, [userKey, currentUser]);

  // Hapus satu catatan
  const handleDeleteItem = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus catatan pemeriksaan ini?')) {
      const updated = deleteGrowthRecord(id, userKey);
      setRecords(updated);
    }
  };

  // Hapus semua catatan
  const handleClearAll = () => {
    if (window.confirm('Hapus seluruh catatan riwayat pemeriksaan akun ini?')) {
      clearGrowthRecords(userKey);
      setRecords([]);
    }
  };

  return (
    <div className="nutrikids-feature-page history-page">
      <div className="feature-container">
        {/* Page Title with Green Accent Bar */}
        <div className="history-top-header">
          <div className="page-heading-with-bar">
            <span className="accent-bar-green"></span>
            <h1 className="page-heading-text">Riwayat Cek Gizi Anak</h1>
          </div>
          <button
            type="button"
            className="btn-history-kembali"
            onClick={() => onNavigateTab && onNavigateTab('cek-gizi')}
          >
            &larr; Cek Gizi Baru
          </button>
        </div>

        {/* Main Card */}
        <div className="feature-main-card history-main-card">
          {/* Header Info Akun */}
          <div className="history-account-banner">
            <div className="history-user-identity">
              <span className="history-avatar-icon">
                {currentUser ? (currentUser.name || currentUser.username || 'U').charAt(0).toUpperCase() : '👤'}
              </span>
              <div className="history-user-details">
                <span className="history-user-badge">Akun Aktif</span>
                <h2 className="history-user-fullname">
                  {currentUser ? (currentUser.name || currentUser.username) : 'Pengunjung Tamu'}
                </h2>
                {currentUser && <span className="history-user-email">{currentUser.email}</span>}
              </div>
            </div>

            {records.length > 0 && (
              <div className="history-top-actions">
                <button
                  type="button"
                  className="btn-clear-all"
                  onClick={handleClearAll}
                >
                  🗑️ Hapus Semua
                </button>
              </div>
            )}
          </div>

          <div className="history-divider"></div>

          {/* Kondisi 1: Belum Login */}
          {!currentUser ? (
            <div className="history-auth-required-box">
              <span className="auth-lock-icon">🔐</span>
              <h3 className="auth-prompt-h3">Masuk untuk Melihat Riwayat</h3>
              <p className="auth-prompt-p">
                Riwayat pemeriksaan gizi tersimpan secara privat di akun Anda. Masuk atau daftarkan akun NutriKids Anda untuk menyimpan dan melihat catatan tumbuh kembang anak.
              </p>
              <button
                type="button"
                className="btn-teal-pill btn-history-auth"
                onClick={() => onOpenAuth && onOpenAuth('login')}
              >
                Masuk / Daftar Akun &rarr;
              </button>
            </div>
          ) : records.length === 0 ? (
            /* Kondisi 2: Sudah Login tapi Belum Ada Catatan Tersimpan */
            <div className="history-empty-box">
              <div className="history-empty-illustration">📋</div>
              <h3 className="empty-title">Belum Ada Riwayat Tersimpan</h3>
              <p className="empty-description">
                Data pemeriksaan hanya akan dicatat ke riwayat jika Anda menekan tombol <strong>"Simpan data"</strong> setelah melakukan analisis di halaman Cek Gizi.
              </p>
              <div className="empty-action-group">
                <button
                  type="button"
                  className="btn-teal-pill btn-start-check"
                  onClick={() => onNavigateTab && onNavigateTab('cek-gizi')}
                >
                  + Mulai Cek Gizi Sekarang
                </button>
              </div>
            </div>
          ) : (
            /* Kondisi 3: Ada Data Catatan yang Telah Disimpan */
            <div className="history-content-block">
              <div className="history-stats-bar">
                <span className="history-count-tag">
                  Total Pemeriksaan Tersimpan: <strong>{records.length}</strong>
                </span>
                <span className="history-note-tag">
                  ℹ️ Riwayat akan otomatis hilang saat Anda keluar / logout dari akun.
                </span>
              </div>

              <div className="history-table-wrapper">
                <table className="history-modern-table">
                  <thead>
                    <tr>
                      <th>Tanggal</th>
                      <th>Nama Anak</th>
                      <th>Usia</th>
                      <th>Tinggi Badan</th>
                      <th>Berat Badan</th>
                      <th>Status Risiko Gizi</th>
                      <th className="th-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((rec) => (
                      <tr key={rec.id} className="history-row-item">
                        <td className="td-date-badge">
                          <span className="date-capsule">{rec.dateLabel}</span>
                        </td>
                        <td className="td-child-name">
                          <strong>{rec.childName}</strong>
                          <span className="gender-subtext">
                            {rec.gender === 'boy' ? '👦 Laki-laki' : '👧 Perempuan'}
                          </span>
                        </td>
                        <td>{rec.ageDisplay || `${rec.ageMonths} bln`}</td>
                        <td>{rec.heightCm} cm</td>
                        <td>{rec.weightKg} kg</td>
                        <td>
                          <span
                            className={`history-status-badge ${
                              rec.statusLevel === 'danger'
                                ? 'danger'
                                : rec.statusLevel === 'warning'
                                ? 'warning'
                                : 'normal'
                            }`}
                            style={{
                              borderColor: rec.statusColor,
                              color: rec.statusColor,
                            }}
                          >
                            ● {rec.statusText}
                          </span>
                        </td>
                        <td className="td-center">
                          <button
                            type="button"
                            className="btn-delete-record"
                            onClick={() => handleDeleteItem(rec.id)}
                            title="Hapus catatan ini"
                            aria-label="Hapus catatan"
                          >
                            🗑️
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Bottom Quick Actions */}
              <div className="history-bottom-navigation">
                <button
                  type="button"
                  className="btn-teal-pill btn-history-action"
                  onClick={() => onNavigateTab && onNavigateTab('cek-gizi')}
                >
                  + Cek Gizi Anak Lainnya
                </button>
                <button
                  type="button"
                  className="btn-history-secondary"
                  onClick={() => onNavigateTab && onNavigateTab('rekomendasi')}
                >
                  Lihat Rekomendasi Makanan &rarr;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
