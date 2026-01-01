import React from 'react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
    const navigate = useNavigate();

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
            <button 
                onClick={() => navigate(-1)} 
                className="btn btn-secondary"
                style={{ marginBottom: '2rem' }}
            >
                ← Back
            </button>

            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem', color: 'var(--text-primary)' }}>
                Privacy Policy
            </h1>

            <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                <p style={{ marginBottom: '1.5rem' }}>
                    <strong>Last updated:</strong> January 1, 2026
                </p>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                        1. Introduction
                    </h2>
                    <p style={{ marginBottom: '1rem' }}>
                        MyMusicBingo ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our music bingo application.
                    </p>
                </section>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                        2. Information We Collect
                    </h2>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                        Personal Information
                    </h3>
                    <p style={{ marginBottom: '1rem' }}>
                        When you create an account, we collect:
                    </p>
                    <ul style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
                        <li>Username and email address</li>
                        <li>Spotify account information (if you connect your account)</li>
                        <li>Authentication tokens</li>
                    </ul>

                    <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                        Usage Data
                    </h3>
                    <p style={{ marginBottom: '1rem' }}>
                        We automatically collect information about your interaction with our service:
                    </p>
                    <ul style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
                        <li>Bingo games you create and play</li>
                        <li>Music preferences and selections</li>
                        <li>App usage statistics</li>
                        <li>Device information and IP address</li>
                    </ul>
                </section>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                        3. How We Use Your Information
                    </h2>
                    <p style={{ marginBottom: '1rem' }}>
                        We use the collected information for:
                    </p>
                    <ul style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
                        <li>Providing and maintaining our service</li>
                        <li>Authenticating users and managing accounts</li>
                        <li>Connecting to Spotify for music content</li>
                        <li>Improving our app and user experience</li>
                        <li>Analyzing usage patterns and trends</li>
                        <li>Communicating with you about service updates</li>
                    </ul>
                </section>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                        4. Spotify Integration
                    </h2>
                    <p style={{ marginBottom: '1rem' }}>
                        When you connect your Spotify account:
                    </p>
                    <ul style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
                        <li>We access your Spotify profile information</li>
                        <li>We may access your playlists and saved tracks</li>
                        <li>We use Spotify's API to play music in bingo games</li>
                        <li>Your Spotify data is subject to Spotify's privacy policy</li>
                    </ul>
                    <p style={{ marginBottom: '1rem' }}>
                        We do not store your Spotify password and only access the information necessary to provide our service.
                    </p>
                </section>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                        5. Data Sharing and Disclosure
                    </h2>
                    <p style={{ marginBottom: '1rem' }}>
                        We do not sell your personal information. We may share your data only in the following circumstances:
                    </p>
                    <ul style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
                        <li>With Spotify for music integration purposes</li>
                        <li>With service providers who assist in operating our service</li>
                        <li>When required by law or to protect our rights</li>
                        <li>In connection with a business transfer or merger</li>
                    </ul>
                </section>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                        6. Data Security
                    </h2>
                    <p style={{ marginBottom: '1rem' }}>
                        We implement appropriate technical and organizational measures to protect your information, including:
                    </p>
                    <ul style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
                        <li>Encryption of data in transit and at rest</li>
                        <li>Secure authentication protocols</li>
                        <li>Regular security assessments</li>
                        <li>Access controls and employee training</li>
                    </ul>
                </section>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                        7. Your Rights
                    </h2>
                    <p style={{ marginBottom: '1rem' }}>
                        You have the right to:
                    </p>
                    <ul style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
                        <li>Access your personal information</li>
                        <li>Correct inaccurate information</li>
                        <li>Delete your account and associated data</li>
                        <li>Opt-out of certain data processing</li>
                        <li>Request a copy of your data</li>
                    </ul>
                </section>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                        8. Cookies and Tracking
                    </h2>
                    <p style={{ marginBottom: '1rem' }}>
                        We use cookies and similar technologies to:
                    </p>
                    <ul style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
                        <li>Remember your preferences and login status</li>
                        <li>Analyze app usage and performance</li>
                        <li>Provide personalized features</li>
                    </ul>
                </section>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                        9. Data Retention
                    </h2>
                    <p style={{ marginBottom: '1rem' }}>
                        We retain your personal information only as long as necessary to provide our service and comply with legal obligations. You can request deletion of your account at any time.
                    </p>
                </section>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                        10. Children's Privacy
                    </h2>
                    <p style={{ marginBottom: '1rem' }}>
                        Our service is not intended for children under 13. We do not knowingly collect personal information from children under 13. If we become aware of such collection, we will take steps to delete the information.
                    </p>
                </section>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                        11. International Data Transfers
                    </h2>
                    <p style={{ marginBottom: '1rem' }}>
                        Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for international data transfers.
                    </p>
                </section>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                        12. Changes to This Policy
                    </h2>
                    <p style={{ marginBottom: '1rem' }}>
                        We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
                    </p>
                </section>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                        13. Contact Information
                    </h2>
                    <p style={{ marginBottom: '1rem' }}>
                        If you have any questions about this Privacy Policy or want to exercise your rights, please contact us at:
                    </p>
                    <p style={{ marginBottom: '1rem' }}>
                        Email: info.mymusicbingo@gmail.com
                    </p>
                </section>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
