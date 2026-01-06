import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Music, ArrowRight, User, Mail, Lock, UserPlus, LogIn, Home } from 'lucide-react';
import api from '../api';
import Navbar from '../components/Navbar';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: ''
  });

  useEffect(() => {
    const err = searchParams.get('error');
    if (err) {
      if (err === 'SpotifyAccessDenied') setError('You cancelled the connection to Spotify.');
      else setError('Login failed: ' + err);
    }
  }, [searchParams]);


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
      setError(err.response?.data?.error || err.response?.data?.detail || 'Authentication failed. Please check your data.');
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

        <div style={{
          width: '64px',
          height: '64px',
          background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
          borderRadius: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
          boxShadow: '0 8px 20px rgba(139, 92, 246, 0.3)'
        }}>
          <Music size={32} color="white" />
        </div>

        <h1 className="brand" style={{ fontSize: '2rem', marginBottom: '0.5rem', cursor: 'pointer' }} onClick={() => navigate('/')}>BingoMusicMaker</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.9rem' }}>
          {mode === 'login' ? 'Welcome back! Sign in to continue.' : 'Create an account to start building bingos.'}
        </p>

        {error && (
          <div style={{
            padding: '0.75rem',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            borderRadius: '0.5rem',
            color: '#ef4444',
            fontSize: '0.85rem',
            marginBottom: '1.5rem'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
          <div className="input-group" style={{ marginBottom: '1rem' }}>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Username</label>
            <div style={{ position: 'relative' }}>
              <User size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                style={{ paddingLeft: '2.5rem' }}
                placeholder="Choose a username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
              />
            </div>
          </div>

          {mode === 'register' && (
            <div className="input-group" style={{ marginBottom: '1rem' }}>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="email"
                  style={{ paddingLeft: '2.5rem' }}
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>
          )}

          <div className="input-group" style={{ marginBottom: '2rem' }}>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Password</label>
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
            {loading ? 'Processing...' : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                {mode === 'login' ? <LogIn size={18} /> : <UserPlus size={18} />}
                {mode === 'login' ? 'Sign In' : 'Create Account'}
              </div>
            )}
          </button>
        </form>

        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 'bold', marginLeft: '0.5rem', cursor: 'pointer' }}
          >
            {mode === 'login' ? 'Create one' : 'Sign in'}
          </button>
        </p>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
