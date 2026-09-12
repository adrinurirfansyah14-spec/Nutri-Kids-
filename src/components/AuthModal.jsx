import React, { useState } from 'react';
import nutriKidsLogo from '../assets/nutrikids-logo.png';
import { authApi } from '../services/api';
import './AuthModal.css';

export default function AuthModal({
  isOpen,
  initialMode = 'login',
  onClose,
  onLoginSuccess,
  authPromptTitle,
  authPromptSubtitle,
}) {
  const [mode, setMode] = useState(initialMode); // 'login' or 'register'
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [submittedMessage, setSubmittedMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage('');
  };

  const handleSuccessfulAuth = (userObj) => {
    if (onLoginSuccess) {
      onLoginSuccess(userObj);
    }
    setTimeout(() => {
      onClose();
      setSubmittedMessage('');
      setErrorMessage('');
    }, 1200);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const rawUsername = formData.username || formData.email.split('@')[0] || 'Orang Tua';
    const cleanName =
      rawUsername.charAt(0).toUpperCase() + rawUsername.slice(1).replace(/[._]/g, ' ');

    if (mode === 'register' && formData.password !== formData.confirmPassword) {
      setErrorMessage('Konfirmasi password tidak cocok dengan password.');
      return;
    }

    setLoading(true);

    try {
      if (mode === 'login') {
        // Coba login via backend Express API (/api/users/login)
        try {
          const res = await authApi.login({
            email: formData.email,
            password: formData.password,
          });

          if (res && res.user) {
            const userPayload = {
              id: res.user.id || res.user._id,
              username: res.user.name || rawUsername,
              name: res.user.name || cleanName,
              email: res.user.email,
              phone: res.user.phone || formData.phone || '',
              role: res.user.role || 'Orang Tua Peduli Gizi',
              token: res.token,
            };
            setSubmittedMessage(`Selamat datang kembali, ${userPayload.name}!`);
            handleSuccessfulAuth(userPayload);
            return;
          }
        } catch (apiErr) {
          // Tangani validasi kredensial dari backend
          if (
            apiErr.message &&
            (apiErr.message.toLowerCase().includes('password') ||
              apiErr.message.toLowerCase().includes('email') ||
              apiErr.message.toLowerCase().includes('salah'))
          ) {
            setErrorMessage(apiErr.message);
            setLoading(false);
            return;
          }
          console.warn('[NutriKids Auth] Backend tidak dapat dijangkau, fallback ke sesi lokal:', apiErr.message);
        }

        // Graceful Local Fallback jika backend offline
        const localUser = {
          id: 'user-' + Date.now(),
          username: rawUsername,
          name: cleanName,
          email: formData.email,
          phone: formData.phone || '081234567890',
          role: 'Orang Tua Peduli Gizi',
        };
        setSubmittedMessage(`Selamat datang kembali, ${cleanName}!`);
        handleSuccessfulAuth(localUser);

      } else {
        // Coba registrasi via backend Express API (/api/users/register)
        try {
          const res = await authApi.register({
            name: cleanName,
            email: formData.email,
            password: formData.password,
            phone: formData.phone || '',
          });

          if (res && res.user) {
            const userPayload = {
              id: res.user.id || res.user._id,
              username: res.user.name || rawUsername,
              name: res.user.name || cleanName,
              email: res.user.email,
              phone: res.user.phone || formData.phone || '',
              role: res.user.role || 'Orang Tua Peduli Gizi',
              token: res.token,
            };
            setSubmittedMessage(`Pendaftaran berhasil! Selamat bergabung, ${userPayload.name}.`);
            handleSuccessfulAuth(userPayload);
            return;
          }
        } catch (apiErr) {
          if (apiErr.message && apiErr.message.toLowerCase().includes('terdaftar')) {
            setErrorMessage(apiErr.message);
            setLoading(false);
            return;
          }
          console.warn('[NutriKids Auth] Backend tidak dapat dijangkau, fallback ke registrasi lokal:', apiErr.message);
        }

        // Graceful Local Fallback jika backend offline
        const localUser = {
          id: 'user-' + Date.now(),
          username: rawUsername,
          name: cleanName,
          email: formData.email,
          phone: formData.phone || '081234567890',
          role: 'Orang Tua Peduli Gizi',
        };
        setSubmittedMessage(`Pendaftaran berhasil! Selamat bergabung, ${cleanName}.`);
        handleSuccessfulAuth(localUser);
      }
    } finally {
      setLoading(false);
    }
  };

  // Demo Fast Login
  const handleQuickDemoLogin = () => {
    const demoUser = {
      id: 'fauzan-parent-01',
      username: 'fauzan_parent',
      name: 'Fauzan Al Khawarizmi',
      email: 'fauzan.alkhawarizmi@gmail.com',
      phone: '081123456789',
      avatar: '👨‍💼',
      role: 'Orang Tua Peduli Gizi',
    };
    setSubmittedMessage(`Berhasil masuk sebagai ${demoUser.name}!`);
    handleSuccessfulAuth(demoUser);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card auth-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Tutup modal">
          &times;
        </button>

        <div className="auth-modal-header">
          <img src={nutriKidsLogo} alt="NutriKids Logo" className="auth-brand-logo" />
          <h2 className="auth-title">
            {authPromptTitle || (mode === 'login' ? 'Masuk ke NutriKids' : 'Daftar Akun Baru')}
          </h2>
          <p className="auth-subtitle">
            {authPromptSubtitle ||
              (mode === 'login'
                ? 'Pantau gizi dan tumbuh kembang anak Anda sekarang.'
                : 'Bergabung bersama komunitas orang tua cerdas NutriKids.')}
          </p>
        </div>

        {errorMessage && (
          <div className="auth-error-alert">
            <span>⚠️</span>
            <p>{errorMessage}</p>
          </div>
        )}

        {submittedMessage ? (
          <div className="auth-success-alert">
            <span>✅</span>
            <p>{submittedMessage}</p>
          </div>
        ) : (
          <>
            <form className="auth-form" onSubmit={handleSubmit}>
              {/* Register Fields */}
              {mode === 'register' && (
                <div className="form-group">
                  <input
                    type="text"
                    name="username"
                    className="auth-input"
                    placeholder="Masukan nama lengkap / username anda"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}

              {/* Email Field */}
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

              {/* Phone Field (optional for register) */}
              {mode === 'register' && (
                <div className="form-group">
                  <input
                    type="tel"
                    name="phone"
                    className="auth-input"
                    placeholder="Nomor Telepon (contoh: 081234567890)"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              )}

              {/* Password Field */}
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

              {/* Confirm Password Field */}
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

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-lime-figma auth-submit-btn"
                disabled={loading}
              >
                {loading ? 'Memproses...' : mode === 'login' ? 'Masuk' : 'Daftar'}
              </button>
            </form>

            {/* Quick Demo Login Shortcut */}
            <div className="auth-demo-shortcut">
              <button
                type="button"
                className="btn-demo-quick-login"
                onClick={handleQuickDemoLogin}
              >
                ⚡ Masuk Cepat dengan Akun Demo (Fauzan Al Khawarizmi)
              </button>
            </div>
          </>
        )}

        {/* Mode Switcher Links */}
        <div className="auth-footer-link">
          {mode === 'login' ? (
            <p>
              Tidak punya akun?{' '}
              <button
                type="button"
                className="link-switch"
                onClick={() => {
                  setMode('register');
                  setErrorMessage('');
                }}
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
                onClick={() => {
                  setMode('login');
                  setErrorMessage('');
                }}
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
