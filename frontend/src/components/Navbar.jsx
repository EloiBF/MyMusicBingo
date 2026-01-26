import React, { useState, useEffect } from 'react';
import {
    Music, Menu, X, Home, PlusCircle, Settings, LogOut, User, BookOpen
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from '../api';
import ConfirmationModal from './ConfirmationModal';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setIsLoading(false);
                return;
            }

            try {
                const response = await api.get('/auth/me/');
                setUser(response.data);
            } catch (err) {
                console.error('Error fetching user:', err);
                localStorage.removeItem('token'); // Remove invalid token
            } finally {
                setIsLoading(false);
            }
        };
        fetchUser();
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    const handleLogout = () => {
        setShowLogoutModal(true);
    };

    const confirmLogout = () => {
        localStorage.removeItem('token');
        setUser(null); // Update local state immediately
        setIsLoading(false); // Ensure loading state is reset
        setShowLogoutModal(false);
        navigate('/');
    };

    const isActive = (path) => location.pathname === path;

    const navLinks = [
        { icon: <Home size={20} />, label: t('nav.dashboard'), path: '/dashboard' },
        { icon: <PlusCircle size={20} />, label: t('nav.create'), path: '/create' },
        { icon: <BookOpen size={20} />, label: t('nav.blog'), path: '/blog', debug: true },
        { icon: <Settings size={20} />, label: t('nav.settings'), path: '/settings' }
    ];

    return (
        <>
            <nav className="glass" style={{
                margin: 'clamp(1rem, 2vw, 1.5rem) clamp(1rem, 3vw, 2rem)',
                padding: '0.8rem clamp(1rem, 2vw, 2rem)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'fixed',
                top: 0, left: 0, right: 0,
                zIndex: 1000,
                borderRadius: 'var(--radius-lg)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img
                        src="/images/logo.png"
                        alt="BingoMusicMaker Logo"
                        style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: 'var(--radius-md)',
                            objectFit: 'contain'
                        }}
                    />
                    <span
                        className="brand"
                        style={{
                            fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
                            cursor: 'pointer'
                        }}
                        onClick={() => navigate('/')}
                    >
                        BingoMusicMaker
                    </span>
                </div>

                {/* Desktop Navigation */}
                <div className="desktop-nav" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2rem',
                    minHeight: '48px' // Ensure consistent height
                }}>
                    {isLoading ? (
                        /* Loading state - show skeleton or minimal UI */
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{
                                width: '100px',
                                height: '32px',
                                background: 'var(--surface-light)',
                                borderRadius: 'var(--radius-md)',
                                animation: 'pulse 1.5s ease-in-out infinite'
                            }} />
                        </div>
                    ) : user ? (
                        <>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                {navLinks.map((link) => (
                                    <button
                                        key={link.path}
                                        onClick={() => {
                                            if (link.debug) {
                                                console.log('Blog nav link clicked!');
                                            }
                                            navigate(link.path);
                                        }}
                                        className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
                                        style={{
                                            padding: '0.5rem 1rem',
                                            background: 'transparent',
                                            border: 'none',
                                            color: isActive(link.path) ? 'var(--primary)' : 'var(--text-muted)',
                                            borderRadius: 'var(--radius-md)',
                                            cursor: 'pointer',
                                            transition: 'var(--transition)',
                                            fontWeight: '500',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            position: 'relative',
                                            zIndex: 1001
                                        }}
                                    >
                                        {link.icon}
                                        <span className="nav-text">{link.label}</span>
                                    </button>
                                ))}
                            </div>

                            {/* User Menu */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    padding: '0.5rem 1rem',
                                    background: 'var(--surface-light)',
                                    borderRadius: 'var(--radius-md)',
                                    border: '1px solid var(--glass-border)'
                                }}>
                                    <div style={{
                                        width: '32px', height: '32px',
                                        background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
                                        borderRadius: '50%',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: 'white', fontWeight: 'bold', fontSize: '0.9rem'
                                    }}>
                                        {user?.username?.[0]?.toUpperCase() || 'U'}
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minWidth: 0, maxWidth: '150px' }}>
                                        <span style={{ fontSize: '0.9rem', fontWeight: 600, lineHeight: 1.2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '100%' }}>
                                            {user?.email || user?.username || t('common.guest')}
                                        </span>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1 }}>
                                            {user?.is_spotify_linked ? t('nav.spotify_connected') : t('nav.free_account')}
                                        </span>
                                    </div>
                                </div>

                                <LanguageSwitcher />

                                <button
                                    onClick={handleLogout}
                                    className="btn btn-secondary"
                                    style={{
                                        padding: '0.5rem 1rem',
                                        background: 'transparent',
                                        border: '1px solid var(--glass-border)',
                                        color: 'var(--text-muted)'
                                    }}
                                    title="Logout"
                                >
                                    <LogOut size={18} />
                                </button>
                            </div>
                        </>
                    ) : (
                        /* Non-authenticated user navigation */
                        <div className="nav-buttons" style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            minHeight: '48px' // Match authenticated height
                        }}>
                            <button
                                onClick={() => {
                                    console.log('Blog button clicked!');
                                    navigate('/blog');
                                }}
                                className="btn btn-secondary"
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    cursor: 'pointer',
                                    zIndex: 1001
                                }}
                            >
                                <BookOpen size={18} />
                                <span>Blog</span>
                            </button>
                            <button onClick={() => navigate('/auth', { state: { mode: 'login' } })} className="btn btn-secondary" style={{ background: 'transparent', border: 'none' }}>{t('nav.login')}</button>
                            <button onClick={() => navigate('/auth', { state: { mode: 'register' } })} className="btn btn-primary join-button">{t('nav.signup')}</button>
                            <LanguageSwitcher />
                        </div>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="mobile-menu-btn"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    style={{
                        display: 'none',
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text)',
                        cursor: 'pointer',
                        padding: '0.5rem'
                    }}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </nav>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="mobile-menu-overlay"
                    style={{
                        position: 'fixed',
                        top: 0, left: 0, right: 0, bottom: 0,
                        background: 'rgba(0, 0, 0, 0.8)',
                        backdropFilter: 'blur(10px)',
                        zIndex: 999,
                        display: 'flex',
                        flexDirection: 'column',
                        paddingTop: '6rem',
                        padding: '6rem 1rem 2rem'
                    }}
                >
                    <div style={{
                        background: 'var(--surface)',
                        borderRadius: 'var(--radius-lg)',
                        padding: '2rem',
                        maxWidth: '400px',
                        margin: '0 auto',
                        width: '100%'
                    }}>
                        {isLoading ? (
                            /* Loading state for mobile */
                            <div style={{ textAlign: 'center' }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    background: 'var(--surface-light)',
                                    borderRadius: '50%',
                                    margin: '0 auto 2rem',
                                    animation: 'pulse 1.5s ease-in-out infinite'
                                }} />
                                <p style={{ color: 'var(--text-muted)' }}>Loading...</p>
                            </div>
                        ) : user ? (
                            <>
                                {/* User Info */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    marginBottom: '2rem',
                                    padding: '1rem',
                                    background: 'var(--surface-light)',
                                    borderRadius: 'var(--radius-md)'
                                }}>
                                    <div style={{
                                        width: '48px', height: '48px',
                                        background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
                                        borderRadius: '50%',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: 'white', fontWeight: 'bold', fontSize: '1.1rem'
                                    }}>
                                        {user?.username?.[0]?.toUpperCase() || 'U'}
                                    </div>
                                    <div style={{ minWidth: 0, flex: 1 }}>
                                        <div style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {user?.email || user?.username || t('common.guest')}
                                        </div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                            {user?.is_spotify_linked ? t('nav.spotify_connected') : t('nav.free_account')}
                                        </div>
                                    </div>
                                </div>

                                {/* Navigation Links */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem' }}>
                                    {navLinks.map((link) => (
                                        <button
                                            key={link.path}
                                            onClick={() => {
                                                if (link.debug) {
                                                    console.log('Mobile authenticated blog button clicked!');
                                                }
                                                navigate(link.path);
                                            }}
                                            className={`mobile-nav-link ${isActive(link.path) ? 'active' : ''}`}
                                            style={{
                                                padding: '1rem',
                                                background: isActive(link.path) ? 'var(--primary)' : 'var(--surface-light)',
                                                border: 'none',
                                                color: isActive(link.path) ? 'white' : 'var(--text)',
                                                borderRadius: 'var(--radius-md)',
                                                cursor: 'pointer',
                                                transition: 'var(--transition)',
                                                fontWeight: '500',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '1rem',
                                                textAlign: 'left'
                                            }}
                                        >
                                            {link.icon}
                                            <span>{link.label}</span>
                                        </button>
                                    ))}
                                </div>

                                {/* Logout Button */}
                                <button
                                    onClick={handleLogout}
                                    className="btn btn-secondary"
                                    style={{
                                        width: '100%',
                                        justifyContent: 'center',
                                        background: 'var(--error)',
                                        color: 'white',
                                        border: 'none'
                                    }}
                                >
                                    <LogOut size={18} /> {t('nav.logout')}
                                </button>
                                <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}>
                                    <LanguageSwitcher />
                                </div>
                            </>
                        ) : (
                            /* Non-authenticated user mobile menu */
                            <div style={{ textAlign: 'center' }}>
                                <div style={{
                                    width: '64px',
                                    height: '64px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 2rem'
                                }}>
                                    <img
                                        src="/images/logo.png"
                                        alt="BingoMusicMaker Logo"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'contain'
                                        }}
                                    />
                                </div>

                                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Welcome to BingoMusicMaker</h3>
                                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.9rem' }}>
                                    Create an account to start building amazing music bingo cards
                                </p>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <button
                                        onClick={() => {
                                            console.log('Mobile blog button clicked!');
                                            navigate('/blog');
                                        }}
                                        className="btn btn-secondary"
                                        style={{
                                            width: '100%',
                                            justifyContent: 'center',
                                            background: 'transparent',
                                            border: '1px solid var(--glass-border)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <BookOpen size={18} />
                                        Blog
                                    </button>
                                    <button
                                        onClick={() => navigate('/auth', { state: { mode: 'register' } })}
                                        className="btn btn-primary"
                                        style={{
                                            width: '100%',
                                            justifyContent: 'center',
                                            padding: '1rem'
                                        }}
                                    >
                                        Join Now
                                    </button>
                                    <button
                                        onClick={() => navigate('/auth', { state: { mode: 'login' } })}
                                        className="btn btn-secondary"
                                        style={{
                                            width: '100%',
                                            justifyContent: 'center',
                                            background: 'transparent',
                                            border: '1px solid var(--glass-border)'
                                        }}
                                    >
                                        {t('nav.login')}
                                    </button>
                                    <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}>
                                        <LanguageSwitcher />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Logout Confirmation Modal */}
            <ConfirmationModal
                isOpen={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
                onConfirm={confirmLogout}
                title={t('nav.logout_confirm_title') || 'Logout'}
                message={t('nav.logout_confirm_message') || "Are you sure you want to logout? You'll need to login again to access your account."}
                confirmText={t('nav.logout') || "Logout"}
                confirmColor="var(--error)"
                icon={<LogOut size={44} />}
            />
        </>
    );
};

export default Navbar;
