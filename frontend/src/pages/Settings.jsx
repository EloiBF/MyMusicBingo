import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
    User, Mail, Settings as SettingsIcon, Link2, Link2Off, LogOut, CheckCircle2, AlertCircle, Music
} from 'lucide-react';
import api from '../api';

const Settings = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [syncing, setSyncing] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    useEffect(() => {
        fetchUser();

        const linked = searchParams.get('spotify_linked');
        if (linked === 'true') {
            setMessage({ text: 'Spotify account linked successfully!', type: 'success' });
        }
        const error = searchParams.get('error');
        if (error) {
            setMessage({ text: `Failed to link Spotify: ${error}`, type: 'error' });
        }
    }, [searchParams]);

    const fetchUser = async () => {
        setLoading(true);
        try {
            const response = await api.get('/auth/me/');
            setUser(response.data);
        } catch (err) {
            console.error('Error fetching user:', err);
            setMessage({ text: 'Failed to load user profile.', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleLinkSpotify = async () => {
        setSyncing(true);
        try {
            const response = await api.get('/auth/spotify/login/');
            if (response.data.url) {
                window.location.href = response.data.url;
            }
        } catch (err) {
            setMessage({ text: 'Could not connect to Spotify auth.', type: 'error' });
            setSyncing(false);
        }
    };

    const handleUnlinkSpotify = async () => {
        if (!window.confirm('Are you sure you want to unlink your Spotify account? You will lose access to your private playlists.')) return;

        setSyncing(true);
        try {
            await api.post('/auth/unlink_spotify/');
            await fetchUser();
            setMessage({ text: 'Spotify account unlinked.', type: 'info' });
        } catch (err) {
            setMessage({ text: 'Failed to unlink account.', type: 'error' });
        } finally {
            setSyncing(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    if (loading) return <div className="container" style={{ padding: '2rem' }}>Loading settings...</div>;

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <header style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <SettingsIcon size={32} color="var(--primary)" /> Account Settings
                </h1>
                <p style={{ color: 'var(--text-muted)' }}>Manage your profile and external integrations.</p>
            </header>

            {message.text && (
                <div style={{
                    padding: '1rem',
                    borderRadius: '0.75rem',
                    background: message.type === 'success' ? 'rgba(34, 197, 94, 0.1)' :
                        message.type === 'error' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                    border: `1px solid ${message.type === 'success' ? 'rgba(34, 197, 94, 0.2)' :
                        message.type === 'error' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(59, 130, 246, 0.2)'}`,
                    color: message.type === 'success' ? '#22c55e' :
                        message.type === 'error' ? '#ef4444' : '#3b82f6',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '2rem'
                }}>
                    {message.type === 'success' ? <CheckCircle2 size={18} /> :
                        message.type === 'error' ? <AlertCircle size={18} /> : <AlertCircle size={18} />}
                    {message.text}
                </div>
            )}

            <div style={{ display: 'grid', gap: '2rem' }}>
                {/* Profile Section */}
                <section className="glass" style={{ padding: '2rem' }}>
                    <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.75rem' }}>Personal Information</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Username</label>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', borderRadius: '0.5rem' }}>
                                <User size={16} color="var(--primary)" />
                                <span>{user.username}</span>
                            </div>
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Email</label>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', borderRadius: '0.5rem' }}>
                                <Mail size={16} color="var(--primary)" />
                                <span>{user.email}</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Integrations Section */}
                <section className="glass" style={{ padding: '2rem' }}>
                    <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.75rem' }}>Integrations</h2>

                    <div style={{
                        background: 'rgba(29, 185, 84, 0.05)',
                        border: '1px solid rgba(29, 185, 84, 0.1)',
                        borderRadius: '1rem',
                        padding: '1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '1.5rem'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{
                                width: '48px', height: '48px',
                                background: '#1DB954',
                                borderRadius: '50%',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                boxShadow: '0 4px 15px rgba(29, 185, 84, 0.3)'
                            }}>
                                <Music size={24} color="white" />
                            </div>
                            <div>
                                <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Spotify Integration</h3>
                                <p style={{ margin: 0, fontSize: '0.85rem', color: user.is_spotify_linked ? '#1DB954' : 'var(--text-muted)' }}>
                                    {user.is_spotify_linked ? (
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><CheckCircle2 size={12} /> Account Linked</span>
                                    ) : (
                                        'Not connected'
                                    )}
                                </p>
                            </div>
                        </div>

                        {user.is_spotify_linked ? (
                            <button
                                onClick={handleUnlinkSpotify}
                                disabled={syncing}
                                className="btn btn-secondary"
                                style={{ borderRadius: '0.75rem', gap: '0.5rem', borderColor: '#ef4444', color: '#ef4444' }}
                            >
                                <Link2Off size={18} /> Unlink Spotify
                            </button>
                        ) : (
                            <button
                                onClick={handleLinkSpotify}
                                disabled={syncing}
                                className="btn btn-primary"
                                style={{ background: '#1DB954', border: 'none', borderRadius: '0.75rem', gap: '0.5rem', boxShadow: '0 4px 15px rgba(29, 185, 84, 0.2)' }}
                            >
                                <Link2 size={18} /> Connect Spotify
                            </button>
                        )}
                    </div>
                </section>

                {/* Dangerous Zone */}
                <section className="glass" style={{ padding: '2rem', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                    <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: '#ef4444' }}>Session Management</h2>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                        Logging out will end your current session. You will need to sign in again to access My Bingos.
                    </p>
                    <button
                        onClick={handleLogout}
                        className="btn btn-secondary"
                        style={{ background: 'rgba(239, 68, 68, 0.05)', borderColor: 'rgba(239, 68, 68, 0.2)', color: '#ef4444' }}
                    >
                        <LogOut size={18} /> Sign Out of All Devices
                    </button>
                </section>
            </div>
        </div>
    );
};

export default Settings;
