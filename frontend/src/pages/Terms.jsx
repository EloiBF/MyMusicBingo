import React from 'react';
import { useNavigate } from 'react-router-dom';

const Terms = () => {
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
                Terms of Service
            </h1>

            <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                <p style={{ marginBottom: '1.5rem' }}>
                    <strong>Last updated:</strong> January 1, 2026
                </p>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                        1. Acceptance of Terms
                    </h2>
                    <p style={{ marginBottom: '1rem' }}>
                        By accessing and using MyMusicBingo, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                    </p>
                </section>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                        2. Description of Service
                    </h2>
                    <p style={{ marginBottom: '1rem' }}>
                        MyMusicBingo is a music bingo game application that allows users to create and play bingo games using music tracks. The service integrates with Spotify to provide access to music content.
                    </p>
                </section>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                        3. User Accounts
                    </h2>
                    <p style={{ marginBottom: '1rem' }}>
                        You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account or password.
                    </p>
                </section>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                        4. Spotify Integration
                    </h2>
                    <p style={{ marginBottom: '1rem' }}>
                        MyMusicBingo uses the Spotify Web API to access music content. You must have a valid Spotify account to use features that require Spotify integration. Your use of Spotify services is governed by Spotify's own terms of service.
                    </p>
                </section>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                        5. User Content
                    </h2>
                    <p style={{ marginBottom: '1rem' }}>
                        You retain ownership of any content you create on MyMusicBingo, including bingo games and playlists. By creating content, you grant us a license to use, modify, and display your content for the purpose of providing the service.
                    </p>
                </section>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                        6. Prohibited Uses
                    </h2>
                    <p style={{ marginBottom: '1rem' }}>
                        You may not use MyMusicBingo for any illegal or unauthorized purpose. You agree not to use the service to:
                    </p>
                    <ul style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
                        <li>Violate any laws or regulations</li>
                        <li>Infringe on intellectual property rights</li>
                        <li>Upload malicious code or harmful content</li>
                        <li>Spam or harass other users</li>
                    </ul>
                </section>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                        7. Privacy
                    </h2>
                    <p style={{ marginBottom: '1rem' }}>
                        Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the service, to understand our practices.
                    </p>
                </section>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                        8. Limitation of Liability
                    </h2>
                    <p style={{ marginBottom: '1rem' }}>
                        MyMusicBingo shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
                    </p>
                </section>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                        9. Changes to Terms
                    </h2>
                    <p style={{ marginBottom: '1rem' }}>
                        We reserve the right to modify these terms at any time. If we make material changes, we will notify you by email or by posting a notice on our site prior to the change becoming effective.
                    </p>
                </section>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                        10. Contact Information
                    </h2>
                    <p style={{ marginBottom: '1rem' }}>
                        If you have any questions about these Terms of Service, please contact us at:
                    </p>
                    <p style={{ marginBottom: '1rem' }}>
                        Email: support@mymusicbingo.com
                    </p>
                </section>
            </div>
        </div>
    );
};

export default Terms;
