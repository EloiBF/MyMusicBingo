import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer style={{
            background: 'var(--glass-bg)',
            borderTop: '1px solid var(--glass-border)',
            padding: '2rem 0',
            marginTop: 'auto',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)'
        }}>
            <div style={{
                maxWidth: 'clamp(800px, 90vw, 1400px)',
                margin: '0 auto',
                padding: '0 2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem'
            }}>
                {/* Main Footer Content */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '2rem'
                }}>
                    {/* Brand Section */}
                    <div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            marginBottom: '1rem'
                        }}>
                            <img 
                                src="/images/logo.png" 
                                alt="BingoMusicMaker Logo"
                                style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '0.5rem',
                                    objectFit: 'contain'
                                }}
                            />
                            <span style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                                BingoMusicMaker
                            </span>
                        </div>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                            Create and play music bingo games with your friends. Connect with Spotify for the ultimate music experience.
                        </p>
                    </div>

                    {/* Links Section */}
                    <div>
                        <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                            Quick Links
                        </h3>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <li>
                                <Link
                                    to="/dashboard"
                                    style={{
                                        color: 'var(--text-secondary)',
                                        textDecoration: 'none',
                                        transition: 'color 0.2s ease'
                                    }}
                                    onMouseOver={(e) => e.target.style.color = 'var(--primary)'}
                                    onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}
                                >
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/create"
                                    style={{
                                        color: 'var(--text-secondary)',
                                        textDecoration: 'none',
                                        transition: 'color 0.2s ease'
                                    }}
                                    onMouseOver={(e) => e.target.style.color = 'var(--primary)'}
                                    onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}
                                >
                                    Create Game
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/settings"
                                    style={{
                                        color: 'var(--text-secondary)',
                                        textDecoration: 'none',
                                        transition: 'color 0.2s ease'
                                    }}
                                    onMouseOver={(e) => e.target.style.color = 'var(--primary)'}
                                    onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}
                                >
                                    Settings
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal Section */}
                    <div>
                        <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                            Legal
                        </h3>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <li>
                                <Link
                                    to="/terms"
                                    style={{
                                        color: 'var(--text-secondary)',
                                        textDecoration: 'none',
                                        transition: 'color 0.2s ease'
                                    }}
                                    onMouseOver={(e) => e.target.style.color = 'var(--primary)'}
                                    onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}
                                >
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/privacy"
                                    style={{
                                        color: 'var(--text-secondary)',
                                        textDecoration: 'none',
                                        transition: 'color 0.2s ease'
                                    }}
                                    onMouseOver={(e) => e.target.style.color = 'var(--primary)'}
                                    onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div>
                        <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                            Support
                        </h3>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <li>
                                <a
                                    href="mailto:support@BingoMusicMaker.com"
                                    style={{
                                        color: 'var(--text-secondary)',
                                        textDecoration: 'none',
                                        transition: 'color 0.2s ease'
                                    }}
                                    onMouseOver={(e) => e.target.style.color = 'var(--primary)'}
                                    onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}
                                >
                                    Contact Support
                                </a>
                            </li>
                            <li>
                                <a
                                    href="mailto:privacy@BingoMusicMaker.com"
                                    style={{
                                        color: 'var(--text-secondary)',
                                        textDecoration: 'none',
                                        transition: 'color 0.2s ease'
                                    }}
                                    onMouseOver={(e) => e.target.style.color = 'var(--primary)'}
                                    onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}
                                >
                                    Privacy Inquiries
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div style={{
                    borderTop: '1px solid var(--glass-border)',
                    paddingTop: '1.5rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '1rem'
                }}>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: 0 }}>
                        © 2026 BingoMusicMaker. All rights reserved.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                            Made with ❤️ and 🎵
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
