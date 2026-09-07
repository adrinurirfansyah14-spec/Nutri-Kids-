import React from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import './App.css';

/**
 * ==============================================================================
 * APP.JSX - Komponen Utama (Root Component)
 * ==============================================================================
 * 
 * Penjelasan untuk Pemula:
 * - App.jsx bertindak sebagai kerangka utama website Anda.
 * - Di sini kita menyatukan:
 *   1. <Navbar />  -> Selalu tampil di bagian paling atas
 *   2. <Home />    -> Halaman utama website (di masa depan bisa diganti React Router)
 *   3. <Footer />  -> Selalu tampil di bagian paling bawah
 */
function App() {
  return (
    <div className="app-container">
      {/* 1. Navigasi Atas */}
      <Navbar />

      {/* 2. Isi Halaman Utama */}
      <Home />

      {/* 3. Penutup / Footer */}
      <Footer />
    </div>
  );
}

export default App;
