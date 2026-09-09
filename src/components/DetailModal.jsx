import React from 'react';
import './DetailModal.css';

export default function DetailModal({ isOpen, data, onClose }) {
  if (!isOpen) return null;

  const content = data || {
    title: 'Kebutuhan nutrisi anak',
    category: 'Edukasi Gizi Balita & Anak',
    description: `Kebutuhan gizi anak sangat penting untuk mendukung pertumbuhan fisik dan perkembangan kognitif otak secara optimal. Asupan harian harus mencakup karbohidrat kompleks (energi), protein hewani dan nabati (pembentukan sel & jaringan), lemak sehat (perkembangan otak), serta vitamin dan mineral seperti zat besi, kalsium, vitamin A, C, dan D.`,
    points: [
      'Protein Hewani (Telur, Ikan, Ayam, Daging): Kunci utama pencegahan stunting pada balita.',
      'Sayuran Hijau & Buah-buahan: Sumber serat, vitamin A, vitamin C, dan antioksidan alami.',
      'Susu & Produk Olahan: Mendukung kepadatan tulang dan pertumbuhan tinggi badan ideal.',
      'Air Bersih & Higienitas: Menjaga saluran pencernaan agar penyerapan nutrisi berjalan optimal.',
    ],
    tips: 'Berikan variasi makanan dengan konsep "Isi Piringku": 1/3 makanan pokok, 1/3 sayuran, 1/6 lauk pauk, dan 1/6 buah-buahan.',
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card detail-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Close Button (Frame 29) */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Tutup detail modal">
          &times;
        </button>

        <div className="detail-modal-header">
          {content.category && <span className="detail-badge">{content.category}</span>}
          <h2 className="detail-title">{content.title}</h2>
        </div>

        <div className="detail-modal-body">
          <p className="detail-desc">{content.description}</p>

          {content.points && (
            <div className="detail-points">
              <h3>Poin Penting Nutrisi Harian:</h3>
              <ul>
                {content.points.map((pt, idx) => (
                  <li key={idx}>
                    <span className="bullet-icon">🥗</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {content.tips && (
            <div className="detail-tips-box">
              <strong>💡 Rekomendasi Ahli Gizi:</strong>
              <p>{content.tips}</p>
            </div>
          )}
        </div>

        <div className="detail-modal-footer">
          <button className="btn btn-lime-figma" onClick={onClose}>
            Tutup & Mengerti
          </button>
        </div>
      </div>
    </div>
  );
}
