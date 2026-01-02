import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Music, Zap, Users, ChevronRight, Play, LogIn, Copy, Palette, 
    Download, Smartphone, Star, Shield, Sparkles, ArrowRight, 
    Headphones, ChevronsDown 
} from 'lucide-react';
import Footer from '../components/Footer';
import API_URLS from '../config/api';

/**
 * Estils específics per al component StackedCards per gestionar
 * l'escalat de l'iframe sense embrutar l'index.css global.
 * Utilitza les variables CSS del tema.
 */
const SCALER_STYLES = `
    .stacked-cards-wrapper {
        position: relative;
        width: 100%;
        /* Mantenim la proporció A4 (210/297 = 0.707) */
        aspect-ratio: 0.707; 
        max-width: 380px; /* Mida màxima en desktop */
        margin: 0 auto;
        perspective: 1200px;
    }

    .card-item {
        position: absolute;
        top: 0; left: 0;
        width: 100%; height: 100%;
        transition: var(--transition);
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-xl);
        overflow: hidden;
        background: var(--surface-light);
    }

    /* Contenidor de l'iframe que forcem a ser gegant per després escalar-lo */
    .iframe-scaler-container {
        width: 794px; /* Ample real A4 */
        height: 1123px; /* Alt real A4 */
        position: absolute;
        top: 0;
        left: 0;
        transform-origin: top left;
        /* Aquí està la màgia: L'escala es calcula segons l'amplada del pare */
        /* escala = 100% / 794px */
        transform: scale(calc(var(--container-width, 300) / 794));
        pointer-events: none;
    }

    .iframe-scaler-container iframe {
        width: 100%;
        height: 100%;
        border: none;
    }

    /* Ajustos per a mòbils molt petits */
    @media (max-width: 480px) {
        .stacked-cards-wrapper {
            max-width: 260px;
        }
    }
`;

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div style={{ background: 'var(--background)', color: 'var(--text)', minHeight: '100vh', display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>
            <style>{SCALER_STYLES}</style>

            {/* Navigation */}
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
                    <div style={{
                        width: '40px', height: '40px',
                        background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                        borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <Music size={24} color="white" />
                    </div>
                    <span className="brand" style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)' }}>MyMusicBingo</span>
                </div>
                <div className="nav-buttons">
                    <button onClick={() => navigate('/auth')} className="btn btn-secondary" style={{ background: 'transparent', border: 'none' }}>Login</button>
                    <button onClick={() => navigate('/auth')} className="btn btn-primary join-button">Join Now</button>
                </div>
            </nav>

            <main style={{ flex: 1 }}>
                {/* Hero Section */}
                <section style={{
                    position: 'relative',
                    minHeight: 'clamp(500px, 80vh, 900px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '8rem 1rem 4rem',
                    textAlign: 'center',
                    overflow: 'hidden'
                }}>
                    {/* Background */}
                    <div style={{
                        position: 'absolute', inset: 0, zIndex: 0,
                        backgroundImage: 'url(https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1600&q=80)',
                        backgroundSize: 'cover', backgroundPosition: 'center',
                        filter: 'brightness(0.4) saturate(1.2)'
                    }} />
                    {/* Gradient Overlay usant variables del tema */}
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 0%, var(--background) 100%)', zIndex: 1 }} />

                    {/* Content */}
                    <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                        <h1 className="animate-fade-in" style={{
                            lineHeight: 1.1
                        }}>
                            Play, sing and win <br />
                            <span style={{ 
                                background: 'linear-gradient(135deg, var(--primary), var(--secondary))', 
                                WebkitBackgroundClip: 'text', 
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }}>with Music Bingo!</span>
                        </h1>
                        <p className="animate-fade-in" style={{
                            fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                            color: 'var(--text-muted)',
                            maxWidth: '700px',
                            margin: '0 auto 3rem',
                            animationDelay: '0.1s'
                        }}>
                            Turn your favorite Spotify playlists into interactive musical bingo. 
                            Create your own game, fast and easy!
                        </p>

                        <div className="animate-fade-in" style={{
                            display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', animationDelay: '0.2s'
                        }}>
                            <button onClick={() => navigate('/auth')} className="btn btn-primary" style={{
                                padding: 'clamp(0.8rem, 1.5vw, 1rem) clamp(2rem, 3vw, 3rem)',
                                fontSize: '1.1rem'
                            }}>
                                Get Started Free <ArrowRight size={20} />
                            </button>
                            <button 
                                onClick={() => document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' })}
                                className="btn btn-secondary" style={{
                                padding: 'clamp(0.8rem, 1.5vw, 1rem) clamp(2rem, 3vw, 3rem)',
                                fontSize: '1.1rem',
                                background: 'rgba(255,255,255,0.05)', /* Lleuger glass per sobre de la imatge */
                                backdropFilter: 'blur(10px)'
                            }}>
                                <Play size={18} fill="currentColor" /> How it Works
                            </button>
                        </div>
                    </div>

                    <div style={{
                        position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
                        zIndex: 2, animation: 'bounce 2s infinite', cursor: 'pointer'
                    }} onClick={() => document.getElementById('why-section').scrollIntoView({ behavior: 'smooth' })}>
                        <ChevronsDown size={32} color="var(--text-muted)" />
                    </div>
                </section>

                {/* Why Section */}
                <section id="why-section" style={{ padding: 'clamp(2.5rem, 2.5rem, 2.5rem) 0', background: 'var(--surface)' }}>
                    <div className="container grid-layout" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <h2 style={{ marginBottom: '1.5rem', lineHeight: 1.2 }}>
                                From Spotify 
                                <span style={{ color: '#1DB954', display: 'inline-flex', alignItems: 'center', marginLeft: '0.5rem', verticalAlign: 'middle' }}>
                                    <svg width="0.9em" height="0.9em" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
                                </span>
                                <br /> to MyMusicBingo
                            </h2>
                            <p style={{ fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', color: 'var(--text-muted)', marginBottom: '3rem' }}>
                                Connect Spotify playlists to create unique bingo cards. <br /> Fast, free and easy to use.
                            </p>

                            <div style={{ display: 'grid', gap: '2rem' }}>
                                <FeatureItem icon={<Palette />} title="Customizable Cards" desc="Fully themeable. From weddings to corporate events." color="var(--primary)" />
                                <FeatureItem icon={<Download />} title="Print Ready" desc="Get high quality cards instantly or order premium prints." color="var(--secondary)" />
                                <FeatureItem icon={<Smartphone />} title="AI Song ID" desc="Host effortlessly with our AI song identification tool." color="var(--accent)" />
                            </div>
                        </div>

                        {/* Stacked Cards - Optimized & Responsive */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2rem' }}>
                            <StackedBingoCards />
                        </div>
                    </div>
                </section>

                {/* How It Works */}
                <section id="how-it-works" className="container" style={{ padding: 'clamp(4rem, 8vw, 8rem) 1rem' }}>
                    <SectionHeader title="How It Works" subtitle="Start your party in minutes with our simple process." />
                    
                    <div className="landing-steps-grid-3 grid-layout" style={{ 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                        marginBottom: '2.5rem' 
                    }}>
                        <StepCard n="1" icon={<LogIn size={28} />} title="Quick Sign In" desc="Create account to save events and access premium tools." color="var(--primary)" />
                        <StepCard n="2" icon={<Music size={28} />} title="Connect Spotify" desc="Paste any playlist ID. We import tracks instantly." color="var(--secondary)" />
                        <StepCard n="3" icon={<Palette size={28} />} title="Style Cards" desc="Choose themes and colors to match your vibe." color="var(--accent)" />
                    </div>
                    
                    <div className="landing-steps-grid-2 grid-layout" style={{ 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                        maxWidth: '800px', margin: '0 auto' 
                    }}>
                        <StepCard n="4" icon={<Download size={28} />} title="Export & Print" desc="Print yourself or order professional copies." color="var(--success)" />
                        <StepCard n="5" icon={<Smartphone size={28} />} title="AI Recognition" desc="Track played songs and verify winners automatically." color="var(--warning)" />
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                        <button onClick={() => navigate('/auth')} className="btn btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.1rem' }}>
                            Start Your First Game <ArrowRight size={20} />
                        </button>
                    </div>
                </section>

                {/* Testimonials */}
                <section className="container" style={{ padding: 'clamp(3rem, 6vw, 6rem) 1rem' }}>
                    <SectionHeader title="Success Stories" subtitle="" />
                    <div className="landing-testimonial-grid grid-layout" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                        <TestimonialCard name="Júlia R." text="Song tracking during the Bingo is super easy and fast." rating={5} />
                        <TestimonialCard name="Judith A." text="We ordered custom Bingo Game, the quality is super high." rating={5} />
                        <TestimonialCard name="Laia A." text="Easy to connect to Spotify and create Bingo with my songs." rating={4} />
                    </div>
                </section>

                {/* CTA */}
                <section className="container" style={{ paddingBottom: '6rem' }}>
                    <div className="glass" style={{
                        padding: 'clamp(3rem, 6vw, 5rem) 1rem',
                        textAlign: 'center',
                        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(10, 10, 15, 0.6))',
                        borderColor: 'var(--glass-border)',
                        position: 'relative', overflow: 'hidden'
                    }}>
                        <h2 style={{ marginBottom: '1rem' }}>Ready to Play?</h2>
                        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '2.5rem' }}>Join creators worldwide and host the ultimate music bingo event.</p>
                        <button onClick={() => navigate('/auth')} className="btn btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.2rem' }}>
                            Get Started Now <ArrowRight size={22} />
                        </button>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

// --- Subcomponents ---

const SectionHeader = ({ title, subtitle }) => (
    <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 5vw, 4rem)' }}>
        <h2 style={{ marginBottom: '1rem' }}>{title}</h2>
        {subtitle && <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>{subtitle}</p>}
    </div>
);

const FeatureItem = ({ icon, title, desc, color }) => (
    <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
        <div style={{
            padding: '0.8rem', background: 'var(--surface-light)', borderRadius: '12px',
            border: '1px solid var(--glass-border)', color: color, flexShrink: 0
        }}>{React.cloneElement(icon, { size: 24 })}</div>
        <div>
            <h4 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.3rem', color: 'var(--text)' }}>{title}</h4>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>{desc}</p>
        </div>
    </div>
);

const StepCard = ({ n, icon, title, desc, color }) => (
    <div style={{
        padding: '2rem', borderRadius: 'var(--radius-xl)', background: 'var(--surface-light)',
        border: '1px solid var(--glass-border)', position: 'relative', overflow: 'hidden'
    }}>
        <div style={{
            position: 'absolute', top: '1rem', right: '1rem', fontSize: '5rem',
            fontWeight: 900, opacity: 0.05, lineHeight: 0.8, pointerEvents: 'none', color: 'var(--text)'
        }}>{n}</div>
        <div style={{ color: color, marginBottom: '1rem' }}>{icon}</div>
        <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>{title}</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.5, margin: 0 }}>{desc}</p>
    </div>
);

const TestimonialCard = ({ name, text, rating }) => (
    <div className="glass" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', gap: '2px', marginBottom: '1rem' }}>
            {[...Array(5)].map((_, i) => <Star key={i} size={16} fill={i < rating ? "var(--primary)" : "none"} color={i < rating ? "var(--primary)" : "var(--gray-600)"} />)}
        </div>
        <p style={{ fontStyle: 'italic', marginBottom: '1.5rem', flex: 1, lineHeight: 1.6, color: 'var(--text)' }}>"{text}"</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <div style={{ 
                width: 36, height: 36, borderRadius: '50%', 
                background: 'var(--surface-light)', 
                border: '1px solid var(--glass-border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' 
            }}>{name[0]}</div>
            <span style={{ fontWeight: 600 }}>{name}</span>
        </div>
    </div>
);

const StackedBingoCards = () => {
    const wrapperRef = React.useRef(null);
    const [width, setWidth] = React.useState(0);

    React.useLayoutEffect(() => {
        const updateWidth = () => {
            if (wrapperRef.current) {
                setWidth(wrapperRef.current.offsetWidth);
            }
        };
        
        window.addEventListener('resize', updateWidth);
        updateWidth();
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    const cardStyles = {
        '--container-width': width
    };

    return (
        <div className="stacked-cards-wrapper" ref={wrapperRef} style={cardStyles}>
            {/* 1. Retro (Ara al fons) */}
            <div className="card-item" style={{ 
                transform: 'rotate(-10deg) translateX(-18%) translateY(5%)', 
                border: '1px solid var(--gray-700)', 
                zIndex: 1 
            }}>
                <div className="iframe-scaler-container">
                    <iframe 
                        title="Retro" 
                        src={API_URLS.BINGO_LIVE_PREVIEW('theme=retro&primary_color=%23f39c12&rows=3&columns=3&preview=1')} 
                    />
                </div>
            </div>

            {/* 2. Wedding (Al mig) */}
            <div className="card-item" style={{ 
                transform: 'rotate(8deg) translateX(15%) translateY(-2%)', 
                zIndex: 2 
            }}>
                <div className="iframe-scaler-container">
                    <iframe 
                        title="Wedding" 
                        src={API_URLS.BINGO_LIVE_PREVIEW('theme=wedding&primary_color=%23d4af37&rows=3&columns=3&preview=1')} 
                    />
                </div>
            </div>

            {/* 3. Classic (Ara al front de tot) */}
            <div className="card-item" style={{ 
                transform: 'rotate(-2deg)', 
                border: '1px solid var(--gray-600)', 
                zIndex: 3 
            }}>
                <div className="iframe-scaler-container">
                    <iframe 
                        title="Classic" 
                        src={API_URLS.BINGO_LIVE_PREVIEW('theme=classic&primary_color=%232c3e50&rows=3&columns=3&preview=1')} 
                    />
                </div>
            </div>
        </div>
    );
};

export default Landing;