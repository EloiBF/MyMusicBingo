import React from 'react';
import PageLayout from '../components/PageLayout';
import { Shield, Database, Lock, UserCheck, Eye, Settings } from 'lucide-react';

const PrivacyPolicy = () => {
    return (
        <PageLayout
            title="Privacy Policy"
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
                <Shield size={48} style={{ color: 'var(--primary)', marginBottom: 'clamp(0.5rem, 2vw, 1rem)' }} />
                <p style={{ 
                    fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', 
                    color: 'var(--text)',
                    lineHeight: '1.6',
                    margin: 0,
                    fontWeight: '500'
                }}>
                    This Privacy Policy explains how My Music Bingo collects, uses, and discloses information about you when you use our website and services.
                </p>
            </div>

                {/* Information We Collect */}
                <Section 
                    title="Information We Collect" 
                    icon={<Database size={24} />}
                    badge="Collection"
                >
                    <div style={{ marginBottom: '1.5rem' }}>
                        <p style={{ marginBottom: '1rem' }}>
                            We collect different types of information to provide and improve our service:
                        </p>
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            <InfoCard
                                icon={<UserCheck size={20} />}
                                title="Account Information"
                                description="When you register, we collect your username, email address, and password."
                                color="var(--primary)"
                            />
                            <InfoCard
                                icon={<Database size={20} />}
                                title="Playlist Data"
                                description="We access publicly available playlists to generate bingo cards. No account linking or authentication required."
                                color="var(--secondary)"
                            />
                            <InfoCard
                                icon={<Eye size={20} />}
                                title="Usage Data"
                                description="We may collect anonymous data about how our service is accessed and used."
                                color="var(--info)"
                            />
                        </div>
                    </div>
                </Section>

                {/* How We Use Your Information */}
                <Section 
                    title="How We Use Your Information" 
                    icon={<Settings size={24} />}
                    badge="Usage"
                >
                    <p style={{ marginBottom: '1rem' }}>
                        We use the collected information to:
                    </p>
                    <ul style={{ 
                        paddingLeft: '1.5rem', 
                        listStyleType: 'none',
                        marginTop: '1rem'
                    }}>
                        <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'flex-start' }}>
                            <span style={{ color: 'var(--primary)', marginRight: '0.5rem', fontSize: '1.2rem' }}>•</span>
                            <div>
                                <strong>Provide and maintain</strong> the My Music Bingo service
                            </div>
                        </li>
                        <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'flex-start' }}>
                            <span style={{ color: 'var(--primary)', marginRight: '0.5rem', fontSize: '1.2rem' }}>•</span>
                            <div>
                                <strong>Authenticate you</strong> and manage your session
                            </div>
                        </li>
                        <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'flex-start' }}>
                            <span style={{ color: 'var(--primary)', marginRight: '0.5rem', fontSize: '1.2rem' }}>•</span>
                            <div>
                                <strong>Fetch public playlists</strong> to generate bingo cards
                            </div>
                        </li>
                        <li style={{ display: 'flex', alignItems: 'flex-start' }}>
                            <span style={{ color: 'var(--primary)', marginRight: '0.5rem', fontSize: '1.2rem' }}>•</span>
                            <div>
                                <strong>Notify you</strong> about changes to our service
                            </div>
                        </li>
                    </ul>
                </Section>

                {/* Data Security */}
                <Section 
                    title="Data Security" 
                    icon={<Lock size={24} />}
                    badge="Protection"
                >
                    <p style={{ marginBottom: '1rem' }}>
                        We implement security measures to maintain the safety of your personal information. Your Spotify tokens are stored securely.
                        We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties.
                    </p>
                    <div style={{
                        background: 'var(--success-light)',
                        padding: '1.5rem',
                        borderRadius: 'var(--radius-md)',
                        marginTop: '1rem',
                        border: '1px solid var(--success)',
                        borderLeft: '4px solid var(--success)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <Lock size={24} style={{ color: 'var(--success)' }} />
                            <div>
                                <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--text)' }}>Your Data is Safe</h4>
                                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                    We use industry-standard encryption and security practices to protect your information.
                                </p>
                            </div>
                        </div>
                    </div>
                </Section>

                {/* Your Rights */}
                <Section 
                    title="Your Rights" 
                    icon={<UserCheck size={24} />}
                    badge="Control"
                >
                    <p style={{ marginBottom: '1rem' }}>
                        You have the right to access, correct, or delete your personal information. You can manage your account settings and unlink Spotify directly from your dashboard.
                    </p>
                    <div style={{
                        background: 'var(--surface-light)',
                        padding: '1.5rem',
                        borderRadius: 'var(--radius-md)',
                        marginTop: '1rem',
                        border: '1px solid var(--glass-border)'
                    }}>
                        <h4 style={{ margin: '0 0 1rem 0', color: 'var(--text)' }}>What You Can Do:</h4>
                        <ul style={{ 
                            paddingLeft: '1.5rem', 
                            listStyleType: 'none',
                            margin: 0
                        }}>
                            <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'flex-start' }}>
                                <span style={{ color: 'var(--primary)', marginRight: '0.5rem' }}>✓</span>
                                Access your account information
                            </li>
                            <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'flex-start' }}>
                                <span style={{ color: 'var(--primary)', marginRight: '0.5rem' }}>✓</span>
                                Update your profile details
                            </li>
                            <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'flex-start' }}>
                                <span style={{ color: 'var(--primary)', marginRight: '0.5rem' }}>✓</span>
                                Manage your favorite playlists
                            </li>
                            <li style={{ display: 'flex', alignItems: 'flex-start' }}>
                                <span style={{ color: 'var(--primary)', marginRight: '0.5rem' }}>✓</span>
                                Request deletion of your account and data
                            </li>
                        </ul>
                    </div>
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
                    <Shield size={32} style={{ color: 'var(--primary)', marginBottom: 'clamp(0.5rem, 2vw, 1rem)' }} />
                    <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: 'clamp(0.85rem, 2vw, 0.9rem)' }}>
                        Your privacy is our priority. If you have any questions about this Privacy Policy, please contact us.
                    </p>
                </div>
        </PageLayout>
    );
};

const Section = ({ title, children, icon, badge }) => {
    const getBadgeColor = (badge) => {
        switch(badge) {
            case 'Collection': return 'var(--primary)';
            case 'Usage': return 'var(--secondary)';
            case 'Protection': return 'var(--success)';
            case 'Control': return 'var(--info)';
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

const InfoCard = ({ icon, title, description, color }) => (
    <div style={{
        background: 'var(--surface-light)',
        padding: '1.5rem',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--glass-border)',
        borderLeft: `4px solid ${color}`
    }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <div style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-sm)',
                background: color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                flexShrink: 0
            }}>
                {icon}
            </div>
            <div>
                <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--text)', fontSize: '1.1rem' }}>
                    {title}
                </h4>
                <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                    {description}
                </p>
            </div>
        </div>
    </div>
);

export default PrivacyPolicy;
