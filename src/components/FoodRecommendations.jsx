import React, { useState } from 'react';
import './FoodRecommendations.css';

const RECIPES_DATA = [
  {
    id: 'rec-1',
    title: 'Nasi Tim Ikan Kembung & Telur Puyuh',
    category: 'MPASI (6-11 Bulan)',
    tag: 'Anti-Stunting',
    ageRange: '6 - 11 Bulan',
    calories: '210 kkal',
    protein: '9.2 gram',
    costEst: 'Rp 8.000 / porsi',
    ingredients: [
      '50 gr beras pulen',
      '30 gr fillet ikan kembung segar (kaya Omega-3)',
      '2 butir telur puyuh rebus',
      '20 gr wortel serut halus',
      '1 sdt minyak kelapa murni / santan encer',
      '200 ml kaldu ayam kampung tanpa garam',
    ],
    benefits: 'Ikan kembung memiliki kandungan omega-3 dan protein hewani lebih tinggi dibanding salmon, sangat efektif mendukung pesatnya mielinisasi otak dan tinggi badan balita.',
    steps: [
      'Rebus beras dengan kaldu ayam hingga menjadi bubur lembut.',
      'Kukus ikan kembung hingga matang, lalu suwir dan haluskan bersama telur puyuh.',
      'Campurkan wortel serut dan ikan ke dalam bubur, masak hingga matang merata.',
      'Tambahkan 1 sdt minyak kelapa saat hangat untuk menambah kerapatan energi.',
    ],
  },
  {
    id: 'rec-2',
    title: 'Sup Bola Tahu Hati Ayam & Brokoli',
    category: 'Balita (1-3 Tahun)',
    tag: 'Tinggi Zat Besi',
    ageRange: '1 - 3 Tahun',
    calories: '280 kkal',
    protein: '14.5 gram',
    costEst: 'Rp 10.000 / porsi',
    ingredients: [
      '1 buah tahu sutra putih (haluskan)',
      '40 gr hati ayam segar (haluskan)',
      '1 butir telur ayam',
      '3 kuntum brokoli hijau cincang',
      '1/2 buah jagung manis pipil',
      'Bawang putih, daun bawang, dan minyak wijen',
    ],
    benefits: 'Kombinasi hati ayam dan telur menyediakan zat besi bioavailabilitas tinggi untuk mencegah anemia defisiensi besi yang merupakan penyebab utama anak lesu dan gagal tumbuh.',
    steps: [
      'Campur tahu halus, hati ayam cincang, dan telur. Bentuk menjadi bulatan kecil.',
      'Didihkan air kaldu dengan tumisan bawang putih wangi.',
      'Masukkan bola-bola tahu hati ayam hingga mengapung matang.',
      'Masukkan brokoli dan jagung pipil, masak sebentar agar nutrisi vitamin C tetap terjaga.',
    ],
  },
  {
    id: 'rec-3',
    title: 'Omelet Gulung Bayam & Keju Leleh',
    category: 'Balita (1-3 Tahun)',
    tag: 'Tinggi Kalsium',
    ageRange: '1 - 3 Tahun',
    calories: '240 kkal',
    protein: '12.0 gram',
    costEst: 'Rp 7.500 / porsi',
    ingredients: [
      '2 butir telur ayam ras',
      '1 genggam bayam hijau rebus (cincang peras airnya)',
      '25 gr keju cheddar parut',
      '1 sdm susu UHT plain',
      '1 sdm mentega untuk memanggang',
    ],
    benefits: 'Tinggi kalsium dan vitamin A dari telur dan keju, membantu pertumbuhan tulang panjang dan meningkatkan daya tahan tubuh anak dari infeksi.',
    steps: [
      'Kocok telur bersama susu UHT dan sejumput lada halus.',
      'Campurkan bayam cincang ke dalam kocokan telur.',
      'Dadar tipis di wajan teflon dengan lelehan mentega.',
      'Taburi parutan keju di atasnya saat setengah matang, lalu gulung perlahan hingga matang keemasan.',
    ],
  },
  {
    id: 'rec-4',
    title: 'Nasi Kuning Tim Daging Cincang & Tempe Bacem Gurih',
    category: 'Pra-Sekolah (4-6 Tahun)',
    tag: 'Padat Gizi & Energi',
    ageRange: '4 - 6 Tahun',
    calories: '390 kkal',
    protein: '18.0 gram',
    costEst: 'Rp 15.000 / porsi',
    ingredients: [
      '1 porsi nasi kunyit (beras, santan, kunyit, sereh)',
      '50 gr daging sapi cincang tanpa lemak',
      '2 potong tempe bacem panggang',
      '1 butir telur ceplok air (poached egg)',
      'Lalapan tomat ceri dan ketimun iris tipis',
    ],
    benefits: 'Kunyit merangsang nafsu makan anak secara alami, sedangkan daging sapi cincang dan tempe memberikan sinergi protein hewani dan nabati berkualitas tinggi.',
    steps: [
      'Tumis daging sapi cincang dengan bawang bombay dan kecap manis hingga matang meresap.',
      'Siapkan nasi kuning harum hangat.',
      'Sajikan dengan potongan tempe gurih dan telur.',
      'Lengkapi dengan potongan tomat ceri kaya likopen dan vitamin C.',
    ],
  },
  {
    id: 'rec-5',
    title: 'Puding Buah Naga Pisang Santan Gurih',
    category: 'MPASI (6-11 Bulan)',
    tag: 'Camilan Sehat',
    ageRange: '6+ Bulan',
    calories: '160 kkal',
    protein: '4.5 gram',
    costEst: 'Rp 6.000 / porsi',
    ingredients: [
      '1/2 buah naga merah matang (lumatkan)',
      '1 buah pisang ambon matang (lumatkan)',
      '1 sdm agar-agar plain tanpa warna',
      '100 ml santan encer segar',
      '150 ml air matang',
    ],
    benefits: 'Snack tinggi serat alami dan kalium, mencegah sembelit pada balita sekaligus menyediakan energi sehat tanpa gula pasir tambahan.',
    steps: [
      'Rebus air, santan, dan bubuk agar-agar hingga mendidih sambil diaduk.',
      'Matikan api, masukkan lumatan buah naga dan pisang manis alami.',
      'Aduk rata lalu tuang ke dalam cetakan lucu.',
      'Dinginkan hingga set, sajikan saat dingin untuk camilan sore hari.',
    ],
  },
  {
    id: 'rec-6',
    title: 'Perkedel Tempe Ikan Tenggiri Sayur',
    category: 'Pra-Sekolah (4-6 Tahun)',
    tag: 'Hemat & Padat Gizi',
    ageRange: '3 - 6 Tahun',
    calories: '270 kkal',
    protein: '15.2 gram',
    costEst: 'Rp 9.000 / porsi',
    ingredients: [
      '100 gr tempe kukus (haluskan)',
      '50 gr daging ikan tenggiri giling',
      '1 batang daun seledri cincang',
      '1 buah wortel serut halus',
      '1 butir telur untuk pelapis',
      'Minyak untuk memanggang/menggoreng',
    ],
    benefits: 'Sangat cocok untuk anak yang kurang suka sayur atau ikan utuh (picky eater) karena sayur dan ikan tersamarkan dalam tekstur perkedel gurih.',
    steps: [
      'Campurkan tempe halus, ikan tenggiri, wortel, dan seledri cincang.',
      'Bumbui dengan bawang putih halus, garam, dan lada secukupnya.',
      'Bentuk adonan menjadi bulatan pipih.',
      'Celupkan ke dalam kocokan telur, lalu goreng di wajan datar dengan sedikit minyak hingga kuning kecokelatan.',
    ],
  },
];

export default function FoodRecommendations({ onOpenDonation }) {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const categories = [
    'Semua',
    'MPASI (6-11 Bulan)',
    'Balita (1-3 Tahun)',
    'Pra-Sekolah (4-6 Tahun)',
    'Anti-Stunting',
    'Hemat & Padat Gizi',
  ];

  const filteredRecipes = RECIPES_DATA.filter((item) => {
    const matchesCategory =
      activeCategory === 'Semua' ||
      item.category === activeCategory ||
      item.tag === activeCategory;

    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.benefits.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ingredients.some((ing) => ing.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="food-rec-page">
      {/* Header Banner */}
      <div className="food-rec-header">
        <div className="food-rec-container">
          <span className="food-rec-tag">Menu Seimbang & Anti-Stunting</span>
          <h1 className="food-rec-title">Rekomendasi Menu Makanan Bergizi Anak</h1>
          <p className="food-rec-subtitle">
            Kumpulan resep padat gizi berbasis pangan lokal, ramah anggaran keluarga, dan disesuaikan dengan kebutuhan usia serta kondisi pertumbuhan anak.
          </p>

          {/* Search Bar */}
          <div className="food-search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="food-search-input"
              placeholder="Cari menu, bahan (misal: telur, ikan kembung, bayam)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="food-rec-container">
        <div className="category-tabs-scroll">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`cat-pill-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Recipes Grid */}
        <div className="recipes-grid">
          {filteredRecipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <div className="recipe-card-header">
                <span className="recipe-badge-age">{recipe.ageRange}</span>
                <span className="recipe-badge-tag">{recipe.tag}</span>
              </div>

              <h3 className="recipe-title">{recipe.title}</h3>
              <p className="recipe-benefits">{recipe.benefits}</p>

              <div className="recipe-nutrition-bar">
                <div className="nutri-item">
                  <span className="nutri-label">Kalori</span>
                  <strong className="nutri-val">{recipe.calories}</strong>
                </div>
                <div className="nutri-item">
                  <span className="nutri-label">Protein</span>
                  <strong className="nutri-val">{recipe.protein}</strong>
                </div>
                <div className="nutri-item">
                  <span className="nutri-label">Estimasi Biaya</span>
                  <strong className="nutri-val">{recipe.costEst}</strong>
                </div>
              </div>

              <div className="recipe-card-footer">
                <button
                  type="button"
                  className="btn btn-lime-figma btn-view-recipe"
                  onClick={() => setSelectedRecipe(recipe)}
                >
                  Lihat Resep & Langkah <span>&rarr;</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredRecipes.length === 0 && (
          <div className="no-recipes-box">
            <p>Tidak ditemukan menu untuk pencarian "{searchQuery}".</p>
            <button
              className="btn btn-lime-figma"
              onClick={() => {
                setActiveCategory('Semua');
                setSearchQuery('');
              }}
            >
              Reset Filter
            </button>
          </div>
        )}

        {/* CTA Donasi Makanan */}
        <div className="food-donation-callout">
          <div className="callout-text">
            <h3>Ingin Membantu Paket Bahan Makanan Sehat untuk Keluarga Pra-Sejahtera?</h3>
            <p>Donasi Anda disalurkan dalam bentuk paket telur ayam, ikan segar, dan sayuran ke faskes Posyandu target.</p>
          </div>
          <button className="btn btn-orange-figma btn-callout-donate" onClick={onOpenDonation}>
            Salurkan Paket Donasi 🤲
          </button>
        </div>
      </div>

      {/* Recipe Detail Modal */}
      {selectedRecipe && (
        <div className="modal-backdrop" onClick={() => setSelectedRecipe(null)}>
          <div className="modal-card recipe-modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close-btn"
              onClick={() => setSelectedRecipe(null)}
              aria-label="Tutup resep"
            >
              &times;
            </button>

            <div className="recipe-modal-header">
              <span className="detail-badge">{selectedRecipe.category}</span>
              <h2 className="modal-recipe-title">{selectedRecipe.title}</h2>
              <div className="modal-nutri-badges">
                <span>🔥 {selectedRecipe.calories}</span>
                <span>🥩 {selectedRecipe.protein}</span>
                <span>💰 {selectedRecipe.costEst}</span>
              </div>
            </div>

            <div className="recipe-modal-body">
              <div className="recipe-section-block">
                <h4>🛒 Bahan-Bahan Pangan:</h4>
                <ul className="ingredients-list">
                  {selectedRecipe.ingredients.map((ing, idx) => (
                    <li key={idx}>{ing}</li>
                  ))}
                </ul>
              </div>

              <div className="recipe-section-block">
                <h4>👩‍🍳 Langkah Pembuatan:</h4>
                <ol className="steps-list">
                  {selectedRecipe.steps.map((st, idx) => (
                    <li key={idx}>{st}</li>
                  ))}
                </ol>
              </div>

              <div className="recipe-tips-alert">
                <strong>💡 Manfaat Gizi:</strong>
                <p>{selectedRecipe.benefits}</p>
              </div>
            </div>

            <div className="recipe-modal-footer">
              <button
                className="btn btn-lime-figma"
                onClick={() => setSelectedRecipe(null)}
              >
                Tutup Resep
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
