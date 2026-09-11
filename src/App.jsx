import React, { useState } from 'react';
import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';
import DetailModal from './components/DetailModal';
import DonationModal from './components/DonationModal';
import NutritionCalculator from './components/NutritionCalculator';
import FoodRecommendations from './components/FoodRecommendations';
import GrowthMonitoring from './components/GrowthMonitoring';
import hero2Img from './assets/hero2.png';
import './App.css';

function App() {
  // Navigation active tab: 'beranda' | 'cek-gizi' | 'rekomendasi' | 'edukasi' | 'monitoring'
  const [activeTab, setActiveTab] = useState('beranda');

  // Modal states
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authInitialMode, setAuthInitialMode] = useState('login');
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [activeDetailData, setActiveDetailData] = useState(null);
  const [donationModalOpen, setDonationModalOpen] = useState(false);

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
    setActiveTab(tabKey);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="nutrikids-app">
      {/* 1. NAVBAR (Figma Frame 3, 15 & Image 5) */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={handleTabChange}
        onOpenDonation={() => setDonationModalOpen(true)}
        onOpenAuth={handleOpenAuth}
      />

      {/* 2. TAB VIEWS */}
      {/* TAB: CEK GIZI / MONITORING KALKULATOR (Figma Image 4 & 5) */}
      {activeTab === 'cek-gizi' && (
        <NutritionCalculator onNavigateTab={handleTabChange} />
      )}

      {/* TAB: REKOMENDASI MAKANAN */}
      {activeTab === 'rekomendasi' && (
        <FoodRecommendations onOpenDonation={() => setDonationModalOpen(true)} />
      )}

      {/* TAB: MONITORING TUMBUH KEMBANG */}
      {activeTab === 'monitoring' && (
        <GrowthMonitoring onNavigateCalculator={() => handleTabChange('cek-gizi')} />
      )}

      {/* TAB: BERANDA & EDUKASI */}
      {(activeTab === 'beranda' || activeTab === 'edukasi') && (
        <>
          {/* HERO SECTION (Figma Image 1) */}
          {activeTab === 'beranda' && (
            <section className="hero-section-figma">
              <div className="hero-container">
                {/* Left Text Content */}
                <div className="hero-text-col">
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

                {/* Right Hero Image (Hero2 Image) */}
                <div className="hero-visual-col">
                  <div className="hero-image-card">
                    <img
                      src={hero2Img}
                      alt="Anak Sehat Masa Depan Kuat - Nutrikids"
                      className="hero-main-img"
                    />
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ABOUT NUTRIKIDS SECTION (Figma Image 1 Bottom) */}
          <section id="tentang-kami" className="about-section-figma">
            <div className="about-container">
              <div className="about-header">
                <h2 className="about-title">NutriKids</h2>
                <div className="about-title-underline"></div>
                <span className="about-leaf-icon">🍃</span>
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

          {/* DONATION BANNER SECTION (Figma Image 2) */}
          <section className="donation-banner-section">
            <div className="donation-banner-card">
              <h2 className="donation-banner-title">
                Mulai bantu anak yang membutuhkan
              </h2>
              <p className="donation-banner-desc">
                Di balik setiap angka statistik gizi anak, ada wajah dan nama. Melalui Nutrikids, kamu bisa
                membantu keluarga yang sedang berjuang memenuhi kebutuhan gizi anaknya, bukan dengan uang tunai,
                tapi langsung dalam bentuk paket makanan bergizi yang tepat sasaran. Setiap rupiah yang kamu berikan
                bisa dipantau: ke mana perginya, siapa yang menerimanya, dan bagaimana perkembangannya.
              </p>
              <button
                type="button"
                className="btn btn-orange-figma btn-banner-donate"
                onClick={() => setDonationModalOpen(true)}
              >
                Donasi 🤲
              </button>
            </div>
          </section>
        </>
      )}

      {/* 3. ORGANIC WAVE DIVIDER & FOOTER (Figma Image 3) */}
      <div className="footer-wave-wrapper">
        <svg
          className="wave-svg"
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,40 C320,110 480,-10 800,50 C1120,110 1280,20 1440,60 L1440,120 L0,120 Z"
            fill="#0A2316"
          />
        </svg>
      </div>

      <footer className="footer-figma">
        <div className="footer-container">
          {/* Kolom 1: Tentang Kami */}
          <div className="footer-col">
            <h3 className="footer-col-title">Tentang kami</h3>
            <p className="footer-text">
              Kami membuat Nutrikids sebagai mendukung upaya promotif dan preventif dalam mencegah masalah
              malnutrisi pada anak. Nutrikids membantu orang tua melakukan deteksi dini, memperoleh edukasi
              dan rekomendasi gizi, serta memantau pertumbuhan anak.
            </p>
          </div>

          {/* Kolom 2: Tautan Cepat */}
          <div className="footer-col">
            <h3 className="footer-col-title">Tautan cepat</h3>
            <ul className="footer-links-list">
              <li>
                <button
                  type="button"
                  className="footer-btn-link"
                  onClick={() => handleTabChange('cek-gizi')}
                >
                  Cek gizi
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-btn-link"
                  onClick={() => handleTabChange('rekomendasi')}
                >
                  Rekomendasi makanan
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-btn-link"
                  onClick={() => handleTabChange('edukasi')}
                >
                  Edukasi
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-btn-link"
                  onClick={() => setDonationModalOpen(true)}
                >
                  Donasi
                </button>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Kontak Kami */}
          <div className="footer-col">
            <h3 className="footer-col-title">Kontak kami</h3>
            <ul className="footer-contact-list">
              <li>
                <span className="contact-icon">📍</span>
                <span>Jl. in aja dulu</span>
              </li>
              <li>
                <span className="contact-icon">📞</span>
                <span>0811 - 2345 - 6789</span>
              </li>
              <li>
                <span className="contact-icon">💬</span>
                <span>+62 811 -2345 - 6789</span>
              </li>
              <li>
                <span className="contact-icon">📸</span>
                <span>@Nutrikids</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} NutriKids Indonesia. Seluruh hak cipta dilindungi.</p>
        </div>
      </footer>

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

      <DonationModal
        isOpen={donationModalOpen}
        onClose={() => setDonationModalOpen(false)}
      />
    </div>
  );
}

export default App;