import React, { useState } from 'react';
import { FOOD_RECOMMENDATIONS_DATA } from '../services/foodData';
import './FoodRecommendations.css';

export default function FoodRecommendations({ onOpenDonation }) {
  // Filter state
  const [selectedMeal, setSelectedMeal] = useState('Semua'); // 'Semua' | 'Sarapan' | 'Makan siang' | 'Makan malam'
  const [selectedBudget, setSelectedBudget] = useState('Semua'); // 'Semua' | 'Hemat' | 'Sedang' | 'Tinggi'
  const [selectedRecipeModal, setSelectedRecipeModal] = useState(null);

  // Filter logic presisi dan 100% akurat
  const filteredRecipes = FOOD_RECOMMENDATIONS_DATA.filter((recipe) => {
    // 1. Cek filter waktu makan
    const matchMeal =
      selectedMeal === 'Semua' ||
      recipe.mealTime.toLowerCase() === selectedMeal.toLowerCase();

    // 2. Cek filter budget
    const matchBudget =
      selectedBudget === 'Semua' ||
      recipe.budget.toLowerCase() === selectedBudget.toLowerCase();

    return matchMeal && matchBudget;
  });

  const handleMealTabClick = (tabName) => {
    setSelectedMeal(tabName);
  };

  return (
    <div className="food-recommendations-page">
      <div className="food-rec-container">
        {/* =========================================================================
            1. FILTER BAR (TABS WAKTU MAKAN & DROPDOWN BUDGET) - FIGMA GAMBAR 4
           ========================================================================= */}
        <div className="food-filter-bar-card">
          {/* Meal Time Tabs */}
          <div className="meal-tabs-group">
            <button
              type="button"
              className={`meal-tab-btn ${selectedMeal === 'Semua' ? 'active' : ''}`}
              onClick={() => handleMealTabClick('Semua')}
            >
              Semua
            </button>
            <button
              type="button"
              className={`meal-tab-btn ${selectedMeal === 'Sarapan' ? 'active' : ''}`}
              onClick={() => handleMealTabClick('Sarapan')}
            >
              Sarapan
            </button>
            <button
              type="button"
              className={`meal-tab-btn ${selectedMeal === 'Makan siang' ? 'active' : ''}`}
              onClick={() => handleMealTabClick('Makan siang')}
            >
              Makan siang
            </button>
            <button
              type="button"
              className={`meal-tab-btn ${selectedMeal === 'Makan malam' ? 'active' : ''}`}
              onClick={() => handleMealTabClick('Makan malam')}
            >
              Makan malam
            </button>
          </div>

          {/* Budget Filter Dropdown */}
          <div className="budget-filter-group">
            <label htmlFor="budgetSelect" className="budget-filter-label">
              Budget:
            </label>
            <div className="budget-select-wrapper">
              <select
                id="budgetSelect"
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(e.target.value)}
                className="budget-modern-select"
              >
                <option value="Semua">Semua</option>
                <option value="Hemat">Hemat</option>
                <option value="Sedang">Sedang</option>
                <option value="Tinggi">Tinggi</option>
              </select>
              <span className="select-arrow-icon">▾</span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            2. FOOD CARDS GRID (3 KOLOM PERSIS FIGMA GAMBAR 4 & 5)
           ========================================================================= */}
        {filteredRecipes.length > 0 ? (
          <div className="food-cards-grid">
            {filteredRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="food-card-modern"
                onClick={() => setSelectedRecipeModal(recipe)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setSelectedRecipeModal(recipe)}
              >
                {/* Badges: [Waktu Makan] [Budget] */}
                <div className="food-card-badges">
                  <span className="badge-cyan meal-badge">{recipe.mealTime}</span>
                  <span className="badge-cyan budget-badge">{recipe.budget}</span>
                </div>

                {/* Recipe Title */}
                <h3 className="food-card-title">{recipe.title}</h3>

                {/* Ingredient Bullets */}
                <ul className="food-card-items-list">
                  {recipe.items.map((item, idx) => (
                    <li key={idx} className="food-item-bullet">
                      <span className="bullet-dot">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Divider Line */}
                <div className="food-card-divider"></div>

                {/* Nutritional Sources Breakdown */}
                <div className="food-card-details">
                  <p className="nutrient-row">
                    <strong>Sumber protein:</strong> <span>{recipe.proteinSource}</span>
                  </p>
                  <p className="nutrient-row">
                    <strong>Sumber karbohidrat:</strong> <span>{recipe.carbsSource}</span>
                  </p>
                  <p className="nutrient-row">
                    <strong>Sayur/buah:</strong> <span>{recipe.fruitVeggieSource}</span>
                  </p>
                </div>

                {/* Subtle Click Cue */}
                <div className="food-card-hover-hint">
                  <span>Lihat Resep &amp; Manfaat Gizi &rarr;</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="food-empty-state">
            <h3>Menu Tidak Ditemukan</h3>
            <p>
              Tidak ada menu untuk kombinasi kategori <strong>{selectedMeal}</strong> dengan
              budget <strong>{selectedBudget}</strong>.
            </p>
            <button
              type="button"
              className="btn-teal-pill"
              onClick={() => {
                setSelectedMeal('Semua');
                setSelectedBudget('Semua');
              }}
            >
              Reset Filter
            </button>
          </div>
        )}

        {/* =========================================================================
            3. INTERACTIVE DETAIL RECIPE MODAL
           ========================================================================= */}
        {selectedRecipeModal && (
          <div
            className="food-modal-backdrop"
            onClick={() => setSelectedRecipeModal(null)}
          >
            <div
              className="food-modal-card"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="food-modal-close-btn"
                onClick={() => setSelectedRecipeModal(null)}
                aria-label="Tutup modal"
              >
                &times;
              </button>

              <div className="food-modal-header">
                <div className="food-modal-badges">
                  <span className="badge-cyan">{selectedRecipeModal.mealTime}</span>
                  <span className="badge-cyan">{selectedRecipeModal.budget}</span>
                </div>
                <h2 className="food-modal-title">{selectedRecipeModal.title}</h2>
              </div>

              <div className="food-modal-body">
                {/* Metric Badges */}
                <div className="food-modal-metrics">
                  <div className="metric-chip">
                    <span className="chip-label">Energi</span>
                    <strong className="chip-val">{selectedRecipeModal.calories}</strong>
                  </div>
                  <div className="metric-chip">
                    <span className="chip-label">Protein</span>
                    <strong className="chip-val">{selectedRecipeModal.proteinGrams}</strong>
                  </div>
                </div>

                {/* Gizi Manfaat */}
                <div className="modal-section-block">
                  <h4 className="modal-sec-title">🌿 Manfaat Tumbuh Kembang</h4>
                  <p className="modal-benefits-desc">{selectedRecipeModal.benefits}</p>
                </div>

                {/* Bahan & Sumber Nutrisi */}
                <div className="modal-section-block">
                  <h4 className="modal-sec-title">🥗 Rincian Komponen Gizi</h4>
                  <div className="modal-nutrient-summary">
                    <p><strong>Sumber Protein:</strong> {selectedRecipeModal.proteinSource}</p>
                    <p><strong>Sumber Karbohidrat:</strong> {selectedRecipeModal.carbsSource}</p>
                    <p><strong>Sayur &amp; Buah:</strong> {selectedRecipeModal.fruitVeggieSource}</p>
                  </div>
                </div>

                {/* Langkah Pembuatan */}
                <div className="modal-section-block">
                  <h4 className="modal-sec-title">🍳 Cara Pembuatan Mudah</h4>
                  <ol className="modal-steps-list">
                    {selectedRecipeModal.instructions.map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ol>
                </div>
              </div>

              <div className="food-modal-footer">
                <button
                  type="button"
                  className="btn-teal-pill"
                  onClick={() => setSelectedRecipeModal(null)}
                >
                  Tutup &amp; Catat Menu
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
