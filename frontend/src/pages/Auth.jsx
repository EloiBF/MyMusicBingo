import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { Music, ArrowRight, User, Mail, Lock, UserPlus, LogIn, Home } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';
import api from '../api';
import Navbar from '../components/Navbar';

const Auth = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const location = useLocation();
  const [mode, setMode] = useState(location.state?.mode || 'register'); // 'login' or 'register'
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    const err = searchParams.get('error');
    if (err) {
      if (err === 'SpotifyAccessDenied') setError(t('auth.errors.cancelled'));
      else setError(t('auth.errors.failed', { error: err }));
    }
  }, [searchParams, t]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = mode === 'login' ? '/auth/login/' : '/auth/register/';
      const response = await api.post(endpoint, formData);

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/dashboard');
      }
    } catch (err) {
      const errorKey = err.response?.data?.error;
      if (errorKey && errorKey.startsWith('auth.errors.')) {
        setError(t(errorKey));
      } else {
        setError(err.response?.data?.error || err.response?.data?.detail || t('auth.errors.generic'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      background: 'var(--background)',
      color: 'var(--text)',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Navbar />
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '6rem' // Account for fixed navbar
      }}>
        <div className="container" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '100%', maxWidth: '450px' }}>
            <div className="glass animate-fade-in" style={{ width: '100%', padding: '3rem', textAlign: 'center' }}>

              <img
                src="/images/logo.png"
                alt="BingoMusicMaker Logo"
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '1rem',
                  margin: '0 auto 0.05rem',
                  objectFit: 'contain'
                }}
              />

              <h1 className="brand" style={{ fontSize: '2rem', marginBottom: '1rem', cursor: 'pointer', lineHeight: 1.1 }} onClick={() => navigate('/')}>BingoMusic<br />Maker</h1>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.9rem' }}>
                {mode === 'login' ? t('auth.login.welcome') : t('auth.register.welcome')}
              </p>

              {error && (
                <div style={{
                  padding: '0.75rem',
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                  borderRadius: '0.5rem',
                  color: 'var(--error)',
                  fontSize: '0.85rem',
                  marginBottom: '1.5rem'
                }}>
                  {error && error.includes('<0 />') ? (
                    <Trans i18nKey={error} components={[<br />]} />
                  ) : (
                    error
                  )}
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                <div className="input-group" style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t('auth.email')}</label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                      type="email"
                      style={{ paddingLeft: '2.5rem' }}
                      placeholder={t('auth.email_placeholder')}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="input-group" style={{ marginBottom: '2rem' }}>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t('auth.password')}</label>
                  <div style={{ position: 'relative' }}>
                    <Lock size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                      type="password"
                      style={{ paddingLeft: '2.5rem' }}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', height: '3.5rem', fontSize: '1rem' }}
                  disabled={loading}
                >
                  {loading ? t('auth.processing') : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                      {mode === 'login' ? <LogIn size={18} /> : <UserPlus size={18} />}
                      {mode === 'login' ? t('auth.signin') : t('auth.signup')}
                    </div>
                  )}
                </button>
              </form>

              <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--glass-border)' }}>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                  {mode === 'login' ? t('auth.no_account') : t('auth.have_account')}
                </p>
                <button
                  onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                  className="btn btn-secondary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  {mode === 'login' ? t('auth.create_one') : t('auth.sign_in_link')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
