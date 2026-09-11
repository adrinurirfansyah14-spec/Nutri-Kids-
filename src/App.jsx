import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import DetailModal from './components/DetailModal';
import DonationFlow from './components/DonationFlow';
import NutritionCalculator from './components/NutritionCalculator';
import FoodRecommendations from './components/FoodRecommendations';
import GrowthMonitoring from './components/GrowthMonitoring';
import heroKid from './assets/hero2.png';
import btnDonasiOrange from './assets/btn-donasi-orange.png';
import greenWaveHills from './assets/green-wave-hills.png';
import './App.css';

function App() {
  // Navigation active tab: 'beranda' | 'cek-gizi' | 'rekomendasi' | 'monitoring' | 'donasi'
  const [activeTab, setActiveTab] = useState('beranda');

  // Modal states
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authInitialMode, setAuthInitialMode] = useState('login');
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [activeDetailData, setActiveDetailData] = useState(null);

  // Nutrition Card Data (Figma Frame 17 & Image 2)
  const nutritionCards = [
    {
      id: 1,
      title: 'Kebutuhan nutrisi anak',
      category: 'Gizi & Nutrisi',
      description: 'Panduan lengkap makronutrien dan mikronutrien penting seperti zat besi, kalsium, dan vitamin pendukung tumbuh kembang optimal anak.',
      points: [
        'Protein Hewani (Telur, Ikan, Ayam, Daging): Fondasi utama pencegahan stunting pada balita.',
        'Sayuran Hijau & Buah-buahan: Sumber serat, vitamin A, vitamin C, dan antioksidan alami.',
        'Susu & Produk Olahan: Mendukung kepadatan tulang dan pertumbuhan tinggi badan ideal.',
        'Air Bersih & Higienitas: Menjaga saluran pencernaan agar penyerapan nutrisi berjalan optimal.',
      ],
      tips: 'Terapkan konsep "Isi Piringku": 1/3 makanan pokok, 1/3 sayuran, 1/6 lauk pauk, dan 1/6 buah-buahan setiap kali makan.',
    },
    {
      id: 2,
      title: 'Pencegahan Stunting',
      category: 'Tumbuh Kembang',
      description: 'Langkah terukur 1000 Hari Pertama Kehidupan (HPK) untuk memastikan tinggi dan berat badan anak bertumbuh sesuai standar kurva WHO.',
      points: [
        'Pemberian ASI Eksklusif selama 6 bulan pertama kehidupan.',
        'MPASI bergizi seimbang dan kaya protein hewani mulai usia 6 bulan.',
        'Pantau tinggi & berat badan setiap bulan di Posyandu atau faskes terdekat.',
        'Akses sanitasi layak dan cuci tangan pakai sabun sebelum memberi makan anak.',
      ],
      tips: 'Deteksi dini stunting sebelum usia 2 tahun memiliki peluang pemulihan (catch-up growth) yang jauh lebih tinggi.',
    },
    {
      id: 3,
      title: 'Rekomendasi Menu Bergizi',
      category: 'Menu Harian',
      description: 'Inspirasi resep makanan padat gizi, lezat, dan ramah anggaran keluarga yang mudah dibuat di rumah dan sangat disukai anak.',
      points: [
        'Sup bola-bola tahu ikan dengan wortel dan brokoli manis.',
        'Nasi tim ayam telur puyuh kaya zat besi dan seng (zinc).',
        'Puding buah naga dan pisang manis alami tanpa pemanis buatan.',
        'Omelet bayam keju leleh sebagai camilan berenergi tinggi.',
      ],
      tips: 'Ajak anak berpartisipasi memilih sayuran warna-warni saat belanja agar mereka lebih antusias saat makan.',
    },
    {
      id: 4,
      title: 'Deteksi Dini & Monitoring',
      category: 'Monitoring Berkala',
      description: 'Kenali tanda awal gangguan gizi seperti wasting dan underweight sejak dini untuk penanganan cepat dan terarah.',
      points: [
        'Perhatikan lingkar lengan atas (LiLA) anak secara rutin.',
        'Catat kurva kenaikan berat badan dan tinggi badan setiap bulan.',
        'Waspadai jika berat badan anak tidak naik 2 bulan berturut-turut.',
        'Konsultasikan segera dengan tenaga kesehatan jika anak sering sakit atau lesu.',
      ],
      tips: 'Monitoring berkala adalah kunci utama mencegah anak jatuh ke fase malnutrisi kronis.',
    },
  ];

  const handleOpenAuth = (mode = 'login') => {
    setAuthInitialMode(mode);
    setAuthModalOpen(true);
  };

  const handleOpenDetail = (cardData) => {
    setActiveDetailData(cardData);
    setDetailModalOpen(true);
  };

  const handleTabChange = (tabKey) => {
    if (tabKey === 'edukasi') {
      setActiveTab('beranda');
      setTimeout(() => {
        const el = document.getElementById('edukasi');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
      return;
    }
    setActiveTab(tabKey);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="nutrikids-app">
      {/* 1. NAVBAR (Figma Frame 3, 15 & Image 5) */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={handleTabChange}
        onOpenDonation={() => handleTabChange('donasi')}
        onOpenAuth={handleOpenAuth}
      />

      {/* 2. TAB VIEWS */}
      {/* TAB: DONASI FLOW (Figma Images 1, 2, 4, 5) */}
      {activeTab === 'donasi' && (
        <DonationFlow
          onNavigateHome={() => handleTabChange('beranda')}
          onOpenAuth={() => handleOpenAuth('login')}
        />
      )}

      {/* TAB: CEK GIZI / MONITORING KALKULATOR (Figma Image 4 & 5) */}
      {activeTab === 'cek-gizi' && (
        <NutritionCalculator
          onNavigateTab={handleTabChange}
          onOpenDonation={() => handleTabChange('donasi')}
        />
      )}

      {/* TAB: REKOMENDASI MAKANAN */}
      {activeTab === 'rekomendasi' && (
        <FoodRecommendations onOpenDonation={() => handleTabChange('donasi')} />
      )}

      {/* TAB: MONITORING TUMBUH KEMBANG */}
      {activeTab === 'monitoring' && (
        <GrowthMonitoring onNavigateCalculator={() => handleTabChange('cek-gizi')} />
      )}

      {/* TAB: BERANDA */}
      {activeTab === 'beranda' && (
        <>
          {/* HERO SECTION (Figma Image 1 & hero2.png) */}
          <section className="hero-section-figma">
            <div className="hero-container">
              {/* Left Text Content */}
              <div className="hero-text-col">
                <div className="hero-badge-pill">
                  <span className="badge-pill-icon">🍃</span>
                  <span className="badge-pill-text">Solusi Gizi Cerdas &amp; Terpercaya</span>
                </div>
                <h1 className="hero-headline">
                  Cegah Malnutrisi <br />
                  <span className="highlight-lime">Anak Sejak Dini</span>
                </h1>
                <p className="hero-subtitle">
                  Kenali kondisi gizi anak, pahami kebutuhan nutrisinya, dan temukan langkah yang tepat untuk mendukung tumbuh kembang mereka.
                </p>
                <div className="hero-cta-group">
                  <button
                    type="button"
                    className="btn btn-lime-figma btn-hero-primary"
                    onClick={() => handleTabChange('cek-gizi')}
                  >
                    Cek gizi anak <span>&rarr;</span>
                  </button>
                  <button
                    type="button"
                    className="btn btn-pill-light btn-hero-secondary"
                    onClick={() => {
                      const el = document.getElementById('tentang-kami');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Pelajari lebih lanjut
                  </button>
                </div>
              </div>

              {/* Right Hero Image (Figma Image 1 & hero2.png) */}
              <div className="hero-visual-col">
                <div className="hero-image-card">
                  <img
                    src={heroKid}
                    alt="Anak Sehat Makan Sayur dan Makanan Bergizi - NutriKids"
                    className="hero-main-img"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* ABOUT NUTRIKIDS SECTION (Figma Image 1 Bottom) */}
          <section id="tentang-kami" className="about-section-figma">
            <div className="about-container">
              <div className="about-header">
                <h2 className="about-title">NutriKids</h2>
                <div className="about-title-underline"></div>
              </div>

              <p className="about-paragraph">
                Nutrikids sebagai upaya promotif (promosi) dan preventif (pencegahan) dalam mengatasi masalah
                malnutrisi pada anak, khususnya stunting, wasting, dan underweight. Untuk membantu orang tua
                dalam melakukan deteksi dini, memperoleh edukasi gizi, mendapatkan rekomendasi makanan sesuai usia
                dan budget, serta memantau pertumbuhan anak secara berkala. Selain itu, Nutrikids juga menyediakan
                donasi paket makanan bergizi tepat sasaran untuk mendukung pencapaian SDG 2 (Zero Hunger),
                khususnya bagi anak-anak Indonesia.
              </p>
            </div>
          </section>

          {/* NUTRITION CARDS SECTION (Figma Frame 17 & Image 2) */}
          <section id="edukasi" className="cards-section-figma">
            <div className="cards-container">
              <div className="section-title-wrapper">
                <span className="section-tag">Edukasi & Pencegahan</span>
                <h2 className="section-heading">Kebutuhan Nutrisi & Tumbuh Kembang Anak</h2>
              </div>

              <div className="nutrition-cards-grid">
                {nutritionCards.map((card) => (
                  <div key={card.id} className="nutrition-card-figma">
                    <div className="card-content">
                      <h3 className="card-title">{card.title}</h3>
                      <p className="card-description">{card.description}</p>
                    </div>
                    <div className="card-footer">
                      <button
                        type="button"
                        className="btn btn-lime-figma btn-card-action"
                        onClick={() => handleOpenDetail(card)}
                      >
                        Cek Selengkapnya <span>&rarr;</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* DONATION BANNER SECTION (Exact Figma media_1789107378063.png) */}
          <section className="donation-banner-section">
            <div className="donation-banner-inner">
              <p className="donation-banner-lead">
                Di balik setiap angka statistik gizi anak, ada wajah dan nama. Melalui Nutrikids, kamu bisa
                membantu keluarga yang sedang berjuang memenuhi kebutuhan gizi anaknya, bukan dengan uang tunai,
                tapi langsung dalam bentuk paket makanan bergizi yang tepat sasaran!
              </p>
              <h2 className="donation-banner-focus">
                Setiap rupiah yang kamu berikan bisa dipantau: ke mana perginya, siapa yang menerima, dan bagaimana perkembangannya.
              </h2>
              <button
                type="button"
                className="btn-banner-donate-custom"
                onClick={() => handleTabChange('donasi')}
                aria-label="Donasi Sekarang"
              >
                <img
                  src={btnDonasiOrange}
                  alt="Donasi"
                  className="btn-donasi-orange-img"
                />
              </button>
            </div>
          </section>

          {/* GREEN ROLLING HILLS / WAVES (Exact Figma media_1789107553004.png) */}
          <div className="green-hills-section">
            <img
              src={greenWaveHills}
              alt="Gelombang Hijau NutriKids"
              className="green-hills-img"
            />
          </div>
        </>
      )}

      {/* 3. FOOTER (Figma Images 1, 4, 5) */}
      <Footer onSelectTab={handleTabChange} />

      {/* 4. MODALS */}
      <AuthModal
        key={`${authModalOpen}-${authInitialMode}`}
        isOpen={authModalOpen}
        initialMode={authInitialMode}
        onClose={() => setAuthModalOpen(false)}
      />

      <DetailModal
        isOpen={detailModalOpen}
        data={activeDetailData}
        onClose={() => setDetailModalOpen(false)}
      />
    </div>
  );
}

export default App;