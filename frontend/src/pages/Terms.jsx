import React from 'react';
import PageLayout from '../components/PageLayout';

const Terms = () => {
    return (
        <PageLayout
            title="Terms of Service"
            backPath={-1}
            maxWidth="800px"
        >
            <div className="glass" style={{ padding: '2.5rem', borderRadius: 'var(--radius-lg)' }}>
                <p style={{ marginBottom: '2rem', color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                    Welcome to My Music Bingo! These terms outline the rules and regulations for using our playlist-to-bingo service.
                </p>

                <Section title="1. Service Description">
                    <p>
                        My Music Bingo allows users to connect their Spotify accounts, select playlists, and generate printable musical bingo cards for personal entertainment use.
                    </p>
                </Section>

                <Section title="2. User Accounts">
                    <p>
                        To use our core features, you must register an account. You can optionally link your Spotify account to access your private playlists.
                        You are responsible for maintaining the confidentiality of your login credentials.
                    </p>
                </Section>

                <Section title="3. Spotify Integration">
                    <p>
                        Our service integrates with Spotify. By linking your account, you grant us permission to read your playlists solely for the purpose of generating bingo cards.
                        We do not modify your playlists or Library. You may unlink your Spotify account at any time in the Settings page.
                    </p>
                </Section>

                <Section title="4. Intellectual Property">
                    <p>
                        The generated bingo cards are for personal, non-commercial entertainment. The musical works referenced on the cards remain the property of their respective rights holders.
                        My Music Bingo does not provide music streaming or downloading capabilities.
                    </p>
                </Section>

                <Section title="5. Data Privacy">
                    <p>
                        Your privacy is important to us. Please refer to our Privacy Policy for details on how we collect, use, and protect your information.
                    </p>
                </Section>

                <Section title="6. Modifications">
                    <p>
                        We reserve the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms.
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

export default Terms;
