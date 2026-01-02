import React from 'react';
import PageLayout from '../components/PageLayout';

const PrivacyPolicy = () => {
    return (
        <PageLayout
            title="Privacy Policy"
            backPath={-1}
            maxWidth="800px"
        >
            <div className="glass" style={{ padding: '2.5rem', borderRadius: 'var(--radius-lg)' }}>
                <p style={{ marginBottom: '2rem', color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                    This Privacy Policy explains how My Music Bingo collects, uses, and discloses information about you when you use our website and services.
                </p>

                <Section title="1. Information We Collect">
                    <ul style={{ paddingLeft: '1.5rem', listStyleType: 'disc' }}>
                        <li style={{ marginBottom: '0.5rem' }}>
                            <strong>Account Information:</strong> When you register, we collect your username, email address, and password.
                        </li>
                        <li style={{ marginBottom: '0.5rem' }}>
                            <strong>Spotify Data:</strong> If you verify with Spotify, we store your Spotify User ID and access tokens to fetch your playlists. We strictly only access the data authorized by you during the OAuth flow.
                        </li>
                        <li style={{ marginBottom: '0.5rem' }}>
                            <strong>Usage Data:</strong> We may collect anonymous data about how our service is accessed and used.
                        </li>
                    </ul>
                </Section>

                <Section title="2. How We Use Your Information">
                    <p>
                        We use the collected information to:
                    </p>
                    <ul style={{ paddingLeft: '1.5rem', listStyleType: 'disc', marginTop: '0.5rem' }}>
                        <li>Provide and maintain the My Music Bingo service.</li>
                        <li>Authenticate you and manage your session.</li>
                        <li>Fetch your Spotify playlists to generate bingo cards.</li>
                        <li>Notify you about changes to our service.</li>
                    </ul>
                </Section>

                <Section title="3. Data Security">
                    <p>
                        We implement security measures to maintain the safety of your personal information. Your Spotify tokens are stored securely.
                        We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties.
                    </p>
                </Section>

                <Section title="4. Your Rights">
                    <p>
                        You have the right to access, correct, or delete your personal information. You can manage your account settings and unlink Spotify directly from your dashboard.
                    </p>
                </Section>
            </div>
        </PageLayout>
    );
};

const Section = ({ title, children }) => (
    <div style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text)' }}>{title}</h2>
        <div style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>
            {children}
        </div>
    </div>
);

export default PrivacyPolicy;
