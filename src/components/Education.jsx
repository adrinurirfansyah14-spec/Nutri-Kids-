import React, { useState } from 'react';
import { EDUCATION_ARTICLES_DATA } from '../services/educationData';
import './Education.css';

export default function Education({ onSelectTab }) {
  const [activeArticle, setActiveArticle] = useState(null);

  return (
    <div className="education-page-wrapper">
      <div className="education-container">
        {/* Header Grid Cards (Figma Gambar 1) */}
        <div className="education-grid">
          {EDUCATION_ARTICLES_DATA.map((article) => (
            <div key={article.id} className="education-card">
              <h3 className="education-card-title">{article.title}</h3>
              <p className="education-card-desc">{article.shortDesc}</p>
              <button
                type="button"
                className="btn-cek-selengkapnya"
                onClick={() => setActiveArticle(article)}
              >
                <span>Cek Selengkapnya</span>
                <span className="arrow-icon">&rarr;</span>
              </button>
            </div>
          ))}
        </div>

        {/* Modal Bacaan Lengkap (Figma Gambar 2, 3, 4) */}
        {activeArticle && (
          <div
            className="education-modal-backdrop"
            onClick={() => setActiveArticle(null)}
          >
            <div
              className="education-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="education-modal-close-btn"
                onClick={() => setActiveArticle(null)}
                aria-label="Tutup"
              >
                &times;
              </button>

              <h2 className="education-modal-header-title">
                {activeArticle.modalTitle || activeArticle.title}
              </h2>

              <div className="education-modal-scrollable">
                <div className="education-article-body">
                  {activeArticle.sections.map((sec, idx) => (
                    <p key={idx}>{sec}</p>
                  ))}

                  {activeArticle.highlightHeading && (
                    <div className="education-highlight-block">
                      <h4>{activeArticle.highlightHeading}</h4>
                      <ul>
                        {activeArticle.highlightPoints.map((pt, pIdx) => (
                          <li key={pIdx}>{pt}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activeArticle.secondaryHeading && (
                    <div className="education-highlight-block">
                      <h4>{activeArticle.secondaryHeading}</h4>
                      <ul>
                        {activeArticle.secondaryPoints.map((sPt, sIdx) => (
                          <li key={sIdx}>{sPt}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activeArticle.closingText && (
                    <p>{activeArticle.closingText}</p>
                  )}
                </div>
              </div>

              <div className="education-modal-footer">
                <button
                  type="button"
                  className="btn-close-modal-green"
                  onClick={() => setActiveArticle(null)}
                >
                  Tutup &amp; Mengerti
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
