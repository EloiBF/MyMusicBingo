import React, { useState, useEffect } from 'react';
import {
    Home, PlusCircle, LogOut, Music, Menu, X, Settings
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../api';

const SidebarLink = ({ icon, label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`btn ${active ? 'btn-primary' : 'btn-secondary'}`}
        style={{
            width: '100%',
            justifyContent: 'flex-start',
            background: active ? 'var(--primary)' : 'transparent',
            border: 'none',
            padding: '0.75rem 1rem'
        }}
    >
        {icon} {label}
    </button>
);

const Layout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get('/auth/me/');
                setUser(response.data);
            } catch (err) {
                console.error('Error fetching user:', err);
            }
        };
        fetchUser();
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const isActive = (path) => location.pathname === path;

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--background)' }}>
            {/* Mobile Toggle Button */}
            <button
                className="mobile-toggle"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle Menu"
            >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="sidebar-overlay"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            <aside className={`glass sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '3rem' }}>
                    <div style={{
                        width: '32px', height: '32px',
                        background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                        borderRadius: '0.5rem',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <Music size={18} color="white" />
                    </div>
                    <span className="brand" style={{ fontSize: '1.25rem' }}>MyMusicBingo</span>
                </div>

                <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <SidebarLink icon={<Home size={20} />} label="Dashboard" onClick={() => navigate('/dashboard')} active={isActive('/dashboard')} />
                    <SidebarLink icon={<PlusCircle size={20} />} label="Create New" onClick={() => navigate('/create')} active={isActive('/create')} />
                    <SidebarLink icon={<Settings size={20} />} label="Settings" onClick={() => navigate('/settings')} active={isActive('/settings')} />
                </nav>

                <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid var(--glass-border)' }}>
                    <div
                        onClick={() => navigate('/settings')}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', cursor: 'pointer', padding: '0.5rem', borderRadius: '0.5rem' }}
                        className="hover-bg"
                    >
                        <div style={{
                            width: '40px', height: '40px',
                            background: 'var(--primary)',
                            borderRadius: '50%',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: 'white', fontWeight: 'bold'
                        }}>
                            {user?.username?.[0]?.toUpperCase() || 'U'}
                        </div>
                        <div style={{ flex: 1 }}>
                            <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>{user?.username || 'Guest'}</p>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                {user?.is_spotify_linked ? 'Spotify Connected' : 'Free Account'}
                            </p>
                        </div>
                    </div>
                    <button onClick={handleLogout} className="btn btn-secondary" style={{ width: '100%', justifyContent: 'flex-start' }}>
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </aside>

            <main className="main-content">
                {children}
            </main>
        </div>
    );
};

export default Layout;
