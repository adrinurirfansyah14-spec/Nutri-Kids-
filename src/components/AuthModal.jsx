import React, { useState } from 'react';
import './AuthModal.css';

export default function AuthModal({ isOpen, initialMode = 'login', onClose }) {
  const [mode, setMode] = useState(initialMode); // 'login' or 'register'
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [submittedMessage, setSubmittedMessage] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'login') {
      setSubmittedMessage(`Selamat datang kembali! Anda berhasil masuk.`);
    } else {
      setSubmittedMessage(`Pendaftaran berhasil! Akun ${formData.username || 'Anda'} siap digunakan.`);
    }
    setTimeout(() => {
      onClose();
      setSubmittedMessage('');
    }, 1800);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card auth-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Tutup modal">
          &times;
        </button>

        <div className="auth-modal-header">
          <h2 className="auth-title">
            {mode === 'login' ? 'Masuk ke NutriKids' : 'Daftar Akun Baru'}
          </h2>
          <p className="auth-subtitle">
            {mode === 'login'
              ? 'Pantau gizi dan tumbuh kembang anak Anda sekarang.'
              : 'Bergabung bersama komunitas orang tua cerdas NutriKids.'}
          </p>
        </div>

        {submittedMessage ? (
          <div className="auth-success-alert">
            <span>✅</span>
            <p>{submittedMessage}</p>
          </div>
        ) : (
          <form className="auth-form" onSubmit={handleSubmit}>
            {/* Register Fields (Frame 27) */}
            {mode === 'register' && (
              <div className="form-group">
                <input
                  type="text"
                  name="username"
                  className="auth-input"
                  placeholder="Masukan username anda"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            {/* Email Field (Frame 27 & 28) */}
            <div className="form-group">
              <input
                type="email"
                name="email"
                className="auth-input"
                placeholder="Masukan email anda"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password Field (Frame 27 & 28) */}
            <div className="form-group">
              <input
                type="password"
                name="password"
                className="auth-input"
                placeholder="Masukan password anda"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Confirm Password Field (Frame 27) */}
            {mode === 'register' && (
              <div className="form-group">
                <input
                  type="password"
                  name="confirmPassword"
                  className="auth-input"
                  placeholder="Masukan kembali password anda"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            {/* Submit Button (Frame 27 & 28) */}
            <button type="submit" className="btn btn-lime-figma auth-submit-btn">
              {mode === 'login' ? 'Masuk' : 'Daftar'}
            </button>
          </form>
        )}

        {/* Mode Switcher Links (Frame 27 & 28) */}
        <div className="auth-footer-link">
          {mode === 'login' ? (
            <p>
              Tidak punya akun?{' '}
              <button
                type="button"
                className="link-switch"
                onClick={() => setMode('register')}
              >
                Daftar sekarang!
              </button>
            </p>
          ) : (
            <p>
              Sudah punya akun?{' '}
              <button
                type="button"
                className="link-switch"
                onClick={() => setMode('login')}
              >
                Login sekarang!
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
