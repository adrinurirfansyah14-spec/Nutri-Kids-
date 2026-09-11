import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import DetailModal from './components/DetailModal';
import DonationFlow from './components/DonationFlow';
import NutritionCalculator from './components/NutritionCalculator';
import FoodRecommendations from './components/FoodRecommendations';
import heroKid from './assets/hero2.png';
import btnDonasiOrange from './assets/btn-donasi-orange.png';
import greenWaveHills from './assets/green-wave-hills.png';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('beranda');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authInitialMode, setAuthInitialMode] = useState('login');
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [activeDetailData, setActiveDetailData] = useState(null);

  const handleOpenAuth = (mode = 'login') => {
    setAuthInitialMode(mode);
    setAuthModalOpen(true);
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
      <Navbar
        activeTab={activeTab}
        onSelectTab={handleTabChange}
        onOpenDonation={() => handleTabChange('donasi')}
        onOpenAuth={handleOpenAuth}
      />

      {activeTab === 'donasi' && (
        <DonationFlow
          onNavigateHome={() => handleTabChange('beranda')}
          onOpenAuth={() => handleOpenAuth('login')}
        />
      )}

      {/* Menampung Layar 1 (Input), Layar 2 (Hasil), dan Layar 3 (Monitoring) */}
      {activeTab === 'cek-gizi' && (
        <NutritionCalculator onOpenDonation={() => handleTabChange('donasi')} />
      )}

      {activeTab === 'rekomendasi' && (
        <FoodRecommendations onOpenDonation={() => handleTabChange('donasi')} />
      )}

      {activeTab === 'beranda' && (
        <>
          {/* Hero, About, Cards Edukasi, & Donation Banner Section */}
        </>
      )}

      {/* Footer Bersih Tanpa Konflik Git */}
      <Footer onSelectTab={handleTabChange} />

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