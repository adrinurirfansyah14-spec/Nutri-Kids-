import React, { useState } from 'react';
import InvestorCard from '../components/InvestorCard';
import { mockInvestors, platformStats } from '../services/mockData';
import './Home.css';

/**
 * Halaman Home (Beranda)
 * Folder: src/pages/Home.jsx
 * 
 * Konsep React untuk Pemula:
 * 1. Mengimpor komponen reusable (InvestorCard)
 * 2. Mengambil data dari folder services (mockData)
 * 3. Menggunakan useState untuk interaktivitas (filter kategori & pencarian)
 * 4. Merender daftar data menggunakan fungsi .map()
 */
export default function Home() {
  // State untuk menyimpan kategori filter aktif
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  // State untuk kata kunci pencarian
  const [searchQuery, setSearchQuery] = useState('');

  // Daftar kategori unik untuk tombol filter
  const categories = ['Semua', 'Venture Capital', 'Angel Investor', 'Impact Investor', 'Corporate VC'];

  // Logika penyaringan (filtering) data investor berdasarkan kategori dan pencarian
  const filteredInvestors = mockInvestors.filter((investor) => {
    const matchesCategory = selectedCategory === 'Semua' || investor.category === selectedCategory;
    const matchesSearch = investor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          investor.sector.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="home-page">
      {/* ================= HERO SECTION ================= */}
      <section id="home" className="hero-section">
        <div className="container hero-container">
          <span className="badge badge-accent hero-badge">🚀 Terbuka untuk Startup Early-Stage</span>
          <h1 className="hero-title">
            Temukan <span className="text-gradient">Investor Ideal</span> untuk Mewujudkan Ide Besarmu
          </h1>
          <p className="hero-subtitle">
            GetInvestor mempertemukan para pendiri startup (founders) dengan investor terpercaya.
            Dapatkan pendanaan, mentoring industri, dan akses jaringan global.
          </p>
          <div className="hero-cta-group">
            <a href="#investors" className="btn-hero-primary">Jelajahi Investor</a>
            <a href="#about" className="btn-hero-secondary">Pelajari Alur Kerja</a>
          </div>
        </div>
      </section>

      {/* ================= STATS SECTION ================= */}
      <section id="stats" className="stats-section">
        <div className="container stats-grid">
          {platformStats.map((stat, index) => (
            <div key={index} className="stat-card">
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ================= INVESTOR LIST SECTION ================= */}
      <section id="investors" className="investors-section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Daftar Investor Pilihan</h2>
              <p className="section-desc">Pilih pemodal yang sesuai dengan sektor dan skala bisnismu</p>
            </div>

            {/* Input Pencarian */}
            <div className="search-box">
              <input
                type="text"
                placeholder="Cari investor atau sektor (misal: Fintech, IoT)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          {/* Filter Kategori */}
          <div className="filter-tabs">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid Kartu Investor */}
          {filteredInvestors.length > 0 ? (
            <div className="investors-grid">
              {filteredInvestors.map((item) => (
                <InvestorCard key={item.id} investor={item} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>🔍 Tidak ditemukan investor untuk kriteria "{searchQuery}".</p>
              <button 
                className="btn-reset" 
                onClick={() => { setSelectedCategory('Semua'); setSearchQuery(''); }}
              >
                Reset Pencarian
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ================= CTA BANNER SECTION ================= */}
      <section id="about" className="cta-banner-section">
        <div className="container">
          <div className="cta-banner">
            <h2>Siap Mengamankan Pendanaan untuk Bisnismu?</h2>
            <p>Bergabunglah dengan ratusan startup Indonesia lainnya yang telah mendapatkan kepercayaan investor.</p>
            <button className="btn-cta-white" onClick={() => alert("Form pendaftaran startup akan terbuka!")}>
              Daftarkan Startup Anda Sekarang
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
