import heroKid from './assets/hero-kid.png';
import './App.css';

function App() {
  return (
    <div className="page-container">
      {/* 1. NAVBAR */}
      <header className="navbar-container">
        <nav className="navbar">
          <div className="logo-box">Logo NutriKids</div>
          <ul className="nav-links">
            <li><a href="#cek-gizi">Cek Gizi</a></li>
            <li><a href="#rekomendasi">Rekomendasi Makanan</a></li>
            <li><a href="#edukasi">Edukasi</a></li>
            <li><a href="#monitoring">Monitoring</a></li>
          </ul>
          <div className="nav-actions">
            <button className="btn btn-outline">Donasi</button>
            <button className="btn btn-solid">Masuk</button>
          </div>
        </nav>
      </header>

      {/* 2. HERO SECTION */}
      <main className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Cegah Malnutrisi <br />
            <span className="highlight">Anak Sejak Dini</span>
          </h1>
          <p className="hero-desc">
            Kenali kondisi gizi anak, pahami kebutuhan nutrisinya, dan temukan langkah yang tepat untuk mendukung tumbuh kembang mereka.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-solid btn-hero">
              Cek gizi anak <span>&rarr;</span>
            </button>
            <button className="btn btn-text">Pelajari lebih lanjut</button>
          </div>
        </div>

        <div className="hero-image-wrapper">
          <img src={heroKid} alt="Anak Sehat Makan Bergizi" className="hero-img" />
          <div className="badge-bubble">
            Anak Sehat<br />Masa Depan<br />Kuat ✨
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;