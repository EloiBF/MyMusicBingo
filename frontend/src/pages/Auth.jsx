import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { Music, ArrowRight, User, Mail, Lock, UserPlus, LogIn, Home, Sparkles } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';
import { GoogleLogin } from '@react-oauth/google';
import api from '../api';
import Navbar from '../components/Navbar';

const Auth = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [error, setError] = useState('');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) navigate('/dashboard');
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setIsCreatingAccount(false);
    setError('');

    try {
      const response = await api.post('/auth/login/', {
        email: formData.email,
        password: formData.password
      });

      if (response.data.token) {
        if (response.data.is_new_user) {
          setIsCreatingAccount(true);
          // UX: Wait 5 seconds to show the "Creating account" message as requested
          await new Promise(resolve => setTimeout(resolve, 5000));
        }
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/dashboard');
      }
    } catch (err) {
      const data = err.response?.data;
      const errorKey = data?.error;
      if (typeof errorKey === 'string' && errorKey.startsWith('auth.errors.')) {
        setError(t(errorKey));
      } else {
        setError(data?.error || t('auth.errors.generic'));
      }
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await api.post('/auth/google_login/', {
        id_token: credentialResponse.credential
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/dashboard');
      }
    } catch (err) {
      const data = err.response?.data;
      const errorKey = data?.error;
      if (typeof errorKey === 'string' && errorKey.startsWith('auth.errors.')) {
        setError(t(errorKey));
      } else {
        setError(data?.error || t('auth.errors.generic'));
      }
      setLoading(false);
    } 
  };

  const handleGoogleError = () => {
    setError(t('auth.errors.generic'));
  };

  return (
    <div style={{
      background: 'var(--background)',
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
        padding: 'clamp(1rem, 3vw, 2rem)',
        paddingTop: '6rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background blobs */}
        <div style={{ position: 'absolute', top: '10%', left: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(29, 185, 84, 0.1) 0%, transparent 70%)', filter: 'blur(60px)', zIndex: 0 }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(14, 165, 233, 0.1) 0%, transparent 70%)', filter: 'blur(60px)', zIndex: 0 }} />

        <div className="glass animate-fade-in" style={{
          width: '100%',
          maxWidth: '480px',
          padding: 'clamp(1.5rem, 5vw, 2.5rem)',
          position: 'relative',
          zIndex: 1,
          border: '1px solid var(--glass-border)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <div style={{
                background: 'var(--surface-light)',
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                border: '1px solid var(--glass-border)'
              }}>
                <img 
                  src="/images/logo.png" 
                  alt="BingoMusicMaker Logo" 
                  style={{ 
                    width: '40px', 
                    height: '40px', 
                    objectFit: 'contain',
                    borderRadius: '0.4rem'
                  }} 
                />
              </div>
            </div>

            <h1 className="brand" style={{ fontSize: '2.25rem', marginBottom: '0.75rem', cursor: 'pointer', lineHeight: 1.1 }} onClick={() => navigate('/')}>BingoMusicMaker</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
              {t('auth.login.welcome')}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Google Login first */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center', width: '100%' }}>
              <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  useOneTap
                  theme="filled_blue"
                  width={Math.max(200, Math.min(400, windowWidth - 90)).toString()}
                  shape="pill"
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', width: '100%', gap: '1rem' }}>
                <div style={{ flex: 1, height: '1px', background: 'var(--glass-border)' }}></div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                  {t('auth.or_with')}
                </span>
                <div style={{ flex: 1, height: '1px', background: 'var(--glass-border)' }}></div>
              </div>
            </div>

            {error && (
              <div style={{
                padding: '1rem',
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '0.75rem',
                color: '#ef4444',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                animation: 'fadeIn 0.3s ease'
              }}>
                <Sparkles size={18} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="input-group" style={{ marginBottom: 0 }}>
                <label>{t('auth.email')}</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t('auth.email_placeholder')}
                    required
                    style={{ paddingLeft: '3rem' }}
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="input-group" style={{ marginBottom: '0.5rem' }}>
                <label>{t('auth.password')}</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder={t('auth.password')}
                    required
                    style={{ paddingLeft: '3rem' }}
                    disabled={loading}
                  />
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem', marginLeft: '0.25rem' }}>
                  {t('auth.password_min_length_hint')}
                </p>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
                style={{
                  padding: '1rem',
                  fontSize: '1.1rem',
                  marginTop: '0.5rem',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '0.75rem',
                  height: '54px'
                }}
              >
                {loading ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div className="spinner" style={{ width: '20px', height: '20px', borderWidth: '2px' }} />
                    <span style={{ fontWeight: 600 }}>
                      {isCreatingAccount ? t('auth.creating_account') : t('auth.processing')}
                    </span>
                  </div>
                ) : (
                  <span>{t('auth.signin')}</span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
