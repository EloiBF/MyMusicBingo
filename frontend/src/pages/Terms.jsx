import React from 'react';
import PageLayout from '../components/PageLayout';
import { Shield, Users, Music, Lock, FileText, Settings } from 'lucide-react';

const Terms = () => {
    return (
        <PageLayout
            title="Terms of Service"
            backPath={-1}
            maxWidth="1000px"
            subtitle="Last updated: January 2024"
        >
            {/* Introduction */}
            <div style={{
                background: 'linear-gradient(135deg, var(--primary-light), var(--secondary-light))',
                padding: 'clamp(1.5rem, 3vw, 2rem)',
                borderRadius: 'var(--radius-md)',
                marginBottom: 'clamp(2rem, 4vw, 3rem)',
                textAlign: 'center',
                border: '1px solid var(--glass-border)'
            }}>
                <Music size={48} style={{ color: 'var(--primary)', marginBottom: 'clamp(0.5rem, 2vw, 1rem)' }} />
                <p style={{ 
                    fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', 
                    color: 'var(--text)',
                    lineHeight: '1.6',
                    margin: 0,
                    fontWeight: '500'
                }}>
                    Welcome to My Music Bingo! These terms outline the rules and regulations for using our playlist-to-bingo service.
                </p>
            </div>

                {/* Service Description */}
                <Section 
                    title="Service Description" 
                    icon={<Music size={24} />}
                    badge="Core"
                >
                    <p>
                        My Music Bingo allows users to select from public playlists and generate printable musical bingo cards for personal entertainment use.
                    </p>
                    <div style={{
                        background: 'var(--surface-light)',
                        padding: '1rem',
                        borderRadius: 'var(--radius-sm)',
                        marginTop: '1rem',
                        borderLeft: '4px solid var(--primary)'
                    }}>
                        <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                            <strong>Key Features:</strong> Public playlist browsing, customizable bingo cards, personal entertainment focus.
                        </p>
                    </div>
                </Section>

                {/* User Accounts */}
                <Section 
                    title="User Accounts" 
                    icon={<Users size={24} />}
                    badge="Required"
                >
                    <p>
                        To use our core features, you must register an account to access personalized bingo card creation tools.
                        You are responsible for maintaining the confidentiality of your login credentials.
                    </p>
                    <ul style={{ 
                        paddingLeft: '1.5rem', 
                        listStyleType: 'none',
                        marginTop: '1rem'
                    }}>
                        <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'flex-start' }}>
                            <span style={{ color: 'var(--primary)', marginRight: '0.5rem' }}>✓</span>
                            Secure account registration
                        </li>
                        <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'flex-start' }}>
                            <span style={{ color: 'var(--primary)', marginRight: '0.5rem' }}>✓</span>
                            Access to creation tools
                        </li>
                        <li style={{ display: 'flex', alignItems: 'flex-start' }}>
                            <span style={{ color: 'var(--primary)', marginRight: '0.5rem' }}>✓</span>
                            Credential security responsibility
                        </li>
                    </ul>
                </Section>

                {/* Spotify Integration */}
                <Section 
                    title="Playlist Access" 
                    icon={<Music size={24} />}
                    badge="Content"
                >
                    <p>
                        Our service provides access to publicly available playlists for generating bingo cards. We do not require any account linking or authentication with music services.
                        All playlists used are publicly accessible content.
                    </p>
                    <div style={{
                        background: 'var(--info-light)',
                        padding: '1rem',
                        borderRadius: 'var(--radius-sm)',
                        marginTop: '1rem',
                        border: '1px solid var(--info)'
                    }}>
                        <p style={{ margin: 0, fontSize: '0.9rem' }}>
                            <strong>Note:</strong> We only use publicly available playlists - no account linking required.
                        </p>
                    </div>
                </Section>

                {/* Intellectual Property */}
                <Section 
                    title="Intellectual Property" 
                    icon={<Lock size={24} />}
                    badge="Legal"
                >
                    <p>
                        The generated bingo cards are for personal, non-commercial entertainment. The musical works referenced on the cards remain the property of their respective rights holders.
                        My Music Bingo does not provide music streaming or downloading capabilities.
                    </p>
                </Section>

                {/* Data Privacy */}
                <Section 
                    title="Data Privacy" 
                    icon={<Shield size={24} />}
                    badge="Protection"
                >
                    <p>
                        Your privacy is important to us. Please refer to our Privacy Policy for details on how we collect, use, and protect your information.
                    </p>
                </Section>

                {/* Modifications */}
                <Section 
                    title="Modifications" 
                    icon={<Settings size={24} />}
                    badge="Updates"
                >
                    <p>
                        We reserve the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms.
                    </p>
                </Section>

                {/* Footer */}
                <div style={{
                    marginTop: 'clamp(2rem, 4vw, 3rem)',
                    padding: 'clamp(1.5rem, 3vw, 2rem)',
                    background: 'var(--surface-light)',
                    borderRadius: 'var(--radius-md)',
                    textAlign: 'center',
                    border: '1px solid var(--glass-border)'
                }}>
                    <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: 'clamp(0.85rem, 2vw, 0.9rem)' }}>
                        By using My Music Bingo, you acknowledge that you have read and agree to these terms.
                    </p>
                </div>
        </PageLayout>
    );
};

const Section = ({ title, children, icon, badge }) => {
    const getBadgeColor = (badge) => {
        switch(badge) {
            case 'Core': return 'var(--primary)';
            case 'Required': return 'var(--error)';
            case 'Integration': return 'var(--secondary)';
            case 'Legal': return 'var(--warning)';
            case 'Protection': return 'var(--success)';
            case 'Updates': return 'var(--info)';
            default: return 'var(--text-muted)';
        }
    };

    return (
        <div style={{ 
            marginBottom: 'clamp(2rem, 4vw, 3rem)',
            scrollMarginTop: '100px'
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 'clamp(0.75rem, 2vw, 1rem)',
                marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
                flexWrap: 'wrap'
            }}>
                {icon && (
                    <div style={{
                        width: 'clamp(40px, 8vw, 48px)',
                        height: 'clamp(40px, 8vw, 48px)',
                        borderRadius: 'var(--radius-md)',
                        background: 'var(--surface-light)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--primary)',
                        border: '1px solid var(--glass-border)',
                        flexShrink: 0
                    }}>
                        {icon}
                    </div>
                )}
                <div style={{ flex: 1, minWidth: '200px' }}>
                    <h2 style={{ 
                        fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', 
                        margin: 0,
                        color: 'var(--text)',
                        fontWeight: '700',
                        letterSpacing: '-0.01em',
                        lineHeight: 1.2
                    }}>
                        {title}
                    </h2>
                </div>
                {badge && (
                    <span style={{
                        background: getBadgeColor(badge),
                        color: 'white',
                        padding: '0.25rem 0.75rem',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: 'clamp(0.65rem, 1.5vw, 0.75rem)',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        flexShrink: 0
                    }}>
                        {badge}
                    </span>
                )}
            </div>
            <div style={{ 
                color: 'var(--text-muted)', 
                lineHeight: '1.7',
                fontSize: 'clamp(0.95rem, 2vw, 1.05rem)'
            }}>
                {children}
            </div>
        </div>
    );
};

export default Terms;
