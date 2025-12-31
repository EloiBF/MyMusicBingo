import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Music, Zap, Users, Printer, ChevronRight, Play } from 'lucide-react';

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div style={{ background: 'var(--background)', color: 'var(--text)', minHeight: '100vh' }}>
            {/* Navigation */}
            <nav className="glass" style={{
                margin: '1.5rem 2rem',
                padding: '1rem 2rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'sticky',
                top: '1.5rem',
                zIndex: 1000
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                        borderRadius: '0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Music size={24} color="white" />
                    </div>
                    <span className="brand" style={{ fontSize: '1.5rem' }}>MyMusicBingo</span>
                </div>
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <button onClick={() => navigate('/auth')} className="btn btn-secondary">Login</button>
                    <button onClick={() => navigate('/auth')} className="btn btn-primary">Join Now</button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="container" style={{
                padding: 'clamp(4rem, 10vw, 8rem) 1rem',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Background Glows */}
                <div style={{
                    position: 'absolute',
                    top: '-10%',
                    left: '50%',
                    width: 'min(600px, 100%)',
                    height: '600px',
                    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
                    transform: 'translateX(-50%)',
                    zIndex: -1
                }} />

                <h1 className="animate-fade-in" style={{
                    lineHeight: '1.1',
                    marginBottom: '1.5rem',
                    background: 'linear-gradient(to bottom, #fff, #999)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    Turn Your Spotify Playlists <br />
                    <span style={{
                        background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>Into Bingo Night.</span>
                </h1>
                <p className="animate-fade-in" style={{
                    fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                    color: 'var(--text-muted)',
                    maxWidth: '700px',
                    margin: '0 auto 3rem',
                    animationDelay: '0.1s'
                }}>
                    Perfect for parties, team building, or just a night in. Generate unique,
                    beautiful bingo cards from any Spotify playlist in seconds.
                </p>

                <div className="animate-fade-in flex-between-responsive" style={{ justifyContent: 'center', animationDelay: '0.2s' }}>
                    <button onClick={() => navigate('/auth')} className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
                        Get Started Free <ChevronRight size={20} />
                    </button>
                    <button className="btn btn-secondary" style={{ padding: '1rem 2rem' }}>
                        <Play size={18} fill="currentColor" /> Watch Demo
                    </button>
                </div>
            </section>

            {/* Features Grid */}
            <section className="container" style={{ padding: '4rem 2rem 8rem' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '2rem'
                }}>
                    <FeatureCard
                        icon={<Zap size={32} color="var(--secondary)" />}
                        title="Instant Generation"
                        description="Just paste a playlist link and we'll handle the rest. No manual data entry."
                    />
                    <FeatureCard
                        icon={<Users size={32} color="var(--primary)" />}
                        title="Up to 100+ Players"
                        description="Generate different cards for every participant. No two cards are ever the same."
                    />
                    <FeatureCard
                        icon={<Printer size={32} color="var(--secondary)" />}
                        title="Print Ready"
                        description="Beautiful, high-quality PDFs and HTML cards optimized for printing."
                    />
                </div>
            </section>

            {/* Footer */}
            <footer style={{
                borderTop: '1px solid var(--glass-border)',
                padding: '4rem 2rem',
                textAlign: 'center',
                color: 'var(--text-muted)',
                fontSize: '0.9rem'
            }}>
                <div style={{ marginBottom: '1rem' }}>
                    <Music size={24} style={{ opacity: 0.5 }} />
                </div>
                <p>&copy; 2025 MyMusicBingo. All rights reserved.</p>
            </footer>
        </div>
    );
};

const FeatureCard = ({ icon, title, description }) => (
    <div className="glass" style={{ padding: '2.5rem', transition: 'var(--transition)' }}>
        <div style={{ marginBottom: '1.5rem' }}>{icon}</div>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>{title}</h3>
        <p style={{ color: 'var(--text-muted)' }}>{description}</p>
    </div>
);

export default Landing;
