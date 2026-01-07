import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Music, Zap, Users, ChevronRight, Play, LogIn, Copy, Palette,
    Download, Smartphone, Star, Shield, Sparkles, ArrowRight,
    Headphones, ChevronsDown
} from 'lucide-react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import API_URLS from '../config/api';
import BingoCardPreview from '../components/BingoCardPreview';

const STACKED_STYLES = `
    .stacked-cards-wrapper {
        position: relative;
        width: 100%;
        aspect-ratio: 210 / 297; 
        max-width: 380px;
        margin: 2rem auto 0rem;
        z-index: 10;
        perspective: 1200px;
    }
    .card-item {
        position: absolute;
        top: 0; left: 0;
        width: 100%; height: 100%;
        transition: var(--transition);
        border-radius: var(--radius-md);
        display: flex;
        align-items: center;
        justify-content: center;
        /* No background or overflow needed as BingoCardPreview handles it, 
           but keep relative positioning context just in case */
    }
    @media (max-width: 480px) {
        .stacked-cards-wrapper { max-width: 280px; }
    }
`;

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div style={{ background: 'var(--background)', color: 'var(--text)', minHeight: '100vh', display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>
            <style>{STACKED_STYLES}</style>

            {/* Navigation */}
            <Navbar />

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
                        backgroundImage: 'url(https://images.unsplash.com/photo-1509824227185-9c5a01ceba0d?q=80&w=715&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
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
                            Play, sing and win <br /> with
                            <span style={{
                                background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }}> Music Bingo!</span>
                        </h1>
                        <p className="animate-fade-in" style={{
                            fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                            color: 'var(--text-muted)',
                            maxWidth: '700px',
                            margin: '0 auto 3rem',
                            animationDelay: '0.1s'
                        }}>
                            Connect Spotify playlists to create unique bingo cards. <br /> Fast, easy and free to use.
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
                <section id="why-section" style={{ padding: 'clamp(1.5rem, 2rem, 2.5rem) 0', background: 'var(--surface)' }}>
                    <div className="container grid-layout" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <h2 style={{ marginBottom: '4rem', lineHeight: 1.2 }}>
                                From Spotify
                                <span style={{ color: 'var(--spotify-green)', display: 'inline-flex', alignItems: 'center', marginLeft: '0.5rem', verticalAlign: 'middle' }}>
                                    <svg width="0.9em" height="0.9em" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" /></svg>
                                </span>
                                <br /> to BingoMusicMaker
                            </h2>


                            <div style={{ display: 'grid', gap: '2rem' }}>
                                <FeatureItem icon={<Palette />} title="Customizable Cards" desc="Fully themeable. From weddings to birthday parties, even corporate events." color="var(--primary)" />
                                <FeatureItem icon={<Download />} title="Print Ready" desc="Get high quality bingo cards instantly or order custom premium prints for your special events." color="var(--secondary)" />
                                <FeatureItem icon={<Smartphone />} title="AI Song Recognition" desc="Control played songs with our AI song identification tool." color="var(--accent)" />
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
                        <StepCard n="1" icon={<LogIn size={28} />} title="Quick Sign In" desc="Create a free account to save events and access premium tools." color="var(--primary)" />
                        <StepCard n="2" icon={<Music size={28} />} title="Connect Spotify" desc="Paste any public playlist ID (share link from Spotify app)." color="var(--secondary)" />
                        <StepCard n="3" icon={<Palette size={28} />} title="Style Cards" desc="Choose themes and colors to match your vibe." color="var(--accent)" />
                    </div>

                    <div className="landing-steps-grid-2 grid-layout" style={{
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        maxWidth: '800px', margin: '0 auto'
                    }}>
                        <StepCard n="4" icon={<Download size={28} />} title="Export & Print" desc="Print yourself or order professional copies." color="var(--success)" />
                        <StepCard n="5" icon={<Smartphone size={28} />} title="AI Song Recognition" desc="Track played songs and verify winners automatically." color="var(--warning)" />
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
                        <TestimonialCard name="Júlia R." text="Song tracking during the Bingo is super easy, I could focus on having fun." rating={5} />
                        <TestimonialCard name="Judith A." text="We ordered custom Bingo Game, the quality and design is really good. The party was amazing!!" rating={5} />
                        <TestimonialCard name="Laia A." text="Easy to connect to Spotify and create full Bingo game with my songs, in less than a minute..." rating={4} />
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
        {subtitle && <p style={{ fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', color: 'var(--text-muted)', marginBottom: '4rem' }}>{subtitle}</p>}
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
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    size={16}
                    /* Canviem var(--primary) per var(--warning) */
                    fill={i < rating ? "var(--warning)" : "none"}
                    color={i < rating ? "var(--warning)" : "var(--gray-600)"}
                />
            ))}
        </div>
        <p style={{ fontStyle: 'italic', marginBottom: '1.5rem', flex: 1, lineHeight: 1.6, color: 'var(--text)' }}>
            "{text}"
        </p>
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

const SAMPLE_DATA = [
    { name: "Shape of You", artist: "Ed Sheeran" },
    { name: "Blinding Lights", artist: "The Weeknd" },
    { name: "Flowers", artist: "Miley Cyrus" },
    { name: "Stay", artist: "The Kid LAROI" },
    { name: "Cruel Summer", artist: "Taylor Swift" },
    { name: "As It Was", artist: "Harry Styles" },
    { name: "Levitating", artist: "Dua Lipa" },
    { name: "Anti-Hero", artist: "Taylor Swift" },
    { name: "Bad Guy", artist: "Billie Eilish" }
];

const FEATURED_THEMES = [
    {
        id: 'retro',
        color: '#FF3CAC',
        title: 'Retro Party'
    },
    {
        id: 'birthday_premium_2',
        color: '#D4AF37',
        title: 'Luxury Night'
    },
    {
        id: 'party_premium_1',
        color: '#00f3ff',
        title: 'Glow Bingo'
    }
];

const StackedBingoCards = () => {
    return (
        <div className="stacked-cards-wrapper">
            {/* 1. Background Card */}
            <div className="card-item" style={{
                transform: 'rotate(-8deg) translateX(-15%) translateY(3%)',
                zIndex: 1
            }}>
                <BingoCardPreview
                    event={{
                        theme: FEATURED_THEMES[0].id,
                        primary_color: FEATURED_THEMES[0].color,
                        rows: 3,
                        columns: 3,
                        orientation: 'portrait',
                        event_title: FEATURED_THEMES[0].title
                    }}
                    cardData={SAMPLE_DATA}
                    isMini={false}
                    containerStyle={{
                        width: '100%',
                        height: '100%',
                        border: '2px solid #333',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                        borderRadius: '8px'
                    }}
                />
            </div>

            {/* 2. Middle Card */}
            <div className="card-item" style={{
                transform: 'rotate(6deg) translateX(12%) translateY(-1%)',
                zIndex: 2
            }}>
                <BingoCardPreview
                    event={{
                        theme: FEATURED_THEMES[1].id,
                        primary_color: FEATURED_THEMES[1].color,
                        rows: 3,
                        columns: 3,
                        orientation: 'portrait',
                        event_title: FEATURED_THEMES[1].title
                    }}
                    cardData={SAMPLE_DATA}
                    isMini={false}
                    containerStyle={{
                        width: '100%',
                        height: '100%',
                        border: '2px solid #444',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                        borderRadius: '8px'
                    }}
                />
            </div>

            {/* 3. Front Card */}
            <div className="card-item" style={{
                transform: 'rotate(-1deg) translateY(-2%)',
                zIndex: 3
            }}>
                <BingoCardPreview
                    event={{
                        theme: FEATURED_THEMES[2].id,
                        primary_color: FEATURED_THEMES[2].color,
                        rows: 3,
                        columns: 3,
                        orientation: 'portrait',
                        event_title: FEATURED_THEMES[2].title
                    }}
                    cardData={SAMPLE_DATA}
                    isMini={false}
                    containerStyle={{
                        width: '100%',
                        height: '100%',
                        border: '2px solid #555',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                        borderRadius: '8px'
                    }}
                />
            </div>
        </div>
    );
};

export default Landing;