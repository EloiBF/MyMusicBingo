import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import {
    Music, Zap, Users, ChevronRight, Play, LogIn, Copy, Palette,
    Download, Smartphone, Star, Shield, Sparkles, ArrowRight,
    Headphones, ChevronsDown
} from 'lucide-react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import API_URLS from '../config/api';
import BingoCardPreview from '../components/BingoCardPreview';
import { loadBlogArticles } from '../data/blogLoader';

const LANDING_STYLES = `
    .hero-title {
        font-size: clamp(2rem, 7vw, 4.2rem);
        line-height: 1.2;
        margin-bottom: 1rem;
        word-wrap: break-word;
        overflow-wrap: break-word;
    }
    
    @media (max-width: 768px) {
        .hero-title {
            line-height: 1.3;
            margin-bottom: 1.2rem;
            font-size: clamp(1.8rem, 8vw, 3.2rem);
        }
    }
    
    @media (max-width: 480px) {
        .hero-title {
            line-height: 1.3;
            margin-bottom: 1.5rem;
            font-size: clamp(1.5rem, 8.5vw, 2.6rem);
            max-width: 98%;
            margin-left: auto;
            margin-right: auto;
        }
    }

    .hero-subtitle {
        flex-wrap: wrap;
    }
    
    @media (min-width: 769px) {
        .hero-subtitle {
            flex-wrap: nowrap;
            white-space: nowrap;
        }
    }

    .stacked-cards-wrapper {
        position: relative;
        width: 100%;
        aspect-ratio: 210 / 297; 
        max-width: 450px;
        margin: 0 auto;
        z-index: 10;
        perspective: 1200px;
        display: flex;
        align-items: center;
        justify-content: center;
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
        .hero-section { padding-top: 6rem !important; padding-bottom: 2rem !important; }
    }
`;

const Landing = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
            const data = await loadBlogArticles(i18n.language.split('-')[0]);
            setArticles(data);
        };
        fetchArticles();
    }, [i18n.language]);

    return (
        <div style={{ background: 'var(--background)', color: 'var(--text)', minHeight: '100vh', display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>
            <style>{LANDING_STYLES}</style>

            {/* Navigation */}
            <Navbar />

            <main style={{ flex: 1 }}>
                {/* Hero Section */}
                <section className="hero-section" style={{
                    position: 'relative',
                    minHeight: 'clamp(400px, 70vh, 900px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 'clamp(6rem, 14vw, 12rem) clamp(1rem, 4vw, 2rem)',
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
                        <h1 className="animate-fade-in hero-title">
                            <Trans i18nKey="landing.hero.title" components={[<br />, <span style={{
                                background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }} />]}>
                                Play, sing and win  with Music Bingo!
                            </Trans>
                        </h1>
                        <p className="animate-fade-in hero-subtitle" style={{
                            fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
                            color: 'var(--text-muted)',
                            maxWidth: '700px',
                            margin: '0 auto 2.5rem',
                            animationDelay: '0.1s',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.45rem',
                            lineHeight: 1.4
                        }}>
                            {t('landing.hero.subtitle').split('<1>').map((part, i) => {
                                if (i === 0) return <span key={i}>{part}</span>;
                                const [spotifyPart, ...rest] = part.split('</1>');
                                return (
                                    <React.Fragment key={i}>
                                        <span style={{
                                            color: 'var(--spotify-green)',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '0.45rem',
                                            whiteSpace: 'nowrap'
                                        }}>
                                            <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                                            </svg>
                                            {spotifyPart}
                                        </span>
                                        <span>{rest.join('</1>')}</span>
                                    </React.Fragment>
                                );
                            })}
                        </p>

                        <div className="animate-fade-in" style={{
                            display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', animationDelay: '0.2s'
                        }}>
                            <button onClick={() => navigate('/auth')} className="btn btn-primary" style={{
                                padding: 'clamp(0.8rem, 1.5vw, 1rem) clamp(2rem, 3vw, 3rem)',
                                fontSize: '1.1rem'
                            }}>
                                {t('landing.hero.cta')} <ArrowRight size={20} />
                            </button>
                            <button
                                onClick={() => document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' })}
                                className="btn btn-secondary" style={{
                                    padding: 'clamp(0.8rem, 1.5vw, 1rem) clamp(2rem, 3vw, 3rem)',
                                    fontSize: '1.1rem',
                                    background: 'transparent', /* Removed rgba(255,255,255,0.05) */
                                    backdropFilter: 'none' /* Removed blur(10px) */
                                }}>
                                <Play size={18} fill="currentColor" /> {t('landing.hero.secondaryCta')}
                            </button>
                        </div>
                    </div>
                </section>

                {/* Why Section */}
                <section id="why-section" style={{ padding: 'clamp(3rem, 6vw, 6rem) 0', background: 'var(--surface)' }}>
                    <div className="container grid-layout" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(2rem, 4vw, 4rem)', alignItems: 'center' }}>
                        {/* Stacked Cards - Optimized & Responsive */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
                            <StackedBingoCards />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <h2 style={{ marginBottom: '4rem', lineHeight: 1.2 }}>
                                {t('landing.why.title_from')}
                                <span style={{ color: 'var(--spotify-green)', display: 'inline-flex', alignItems: 'center', marginLeft: '0.5rem', verticalAlign: 'middle' }}>
                                    <svg width="0.9em" height="0.9em" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" /></svg>
                                </span>
                                <br /> {t('landing.why.title_to')}
                            </h2>


                            <div style={{ display: 'grid', gap: '2rem' }}>
                                <FeatureItem icon={<Palette />} title={t('landing.why.features.custom.title')} desc={t('landing.why.features.custom.desc')} color="var(--primary)" />
                                <FeatureItem icon={<Download />} title={t('landing.why.features.print.title')} desc={t('landing.why.features.print.desc')} color="var(--secondary)" />
                                <FeatureItem icon={<Smartphone />} title={t('landing.why.features.ai.title')} desc={t('landing.why.features.ai.desc')} color="var(--accent)" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* How It Works */}
                <section id="how-it-works" className="container" style={{ padding: 'clamp(4rem, 8vw, 8rem) 1rem' }}>
                    <SectionHeader title={t('landing.how.title')} subtitle={t('landing.how.subtitle')} />

                    <div className="landing-steps-grid-3 grid-layout" style={{
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        marginBottom: '2.5rem'
                    }}>
                        <StepCard n="1" icon={<LogIn size={28} />} title={t('landing.how.steps.1.title')} desc={t('landing.how.steps.1.desc')} color="var(--primary)" />
                        <StepCard n="2" icon={<Music size={28} />} title={t('landing.how.steps.2.title')} desc={t('landing.how.steps.2.desc')} color="var(--secondary)" />
                        <StepCard n="3" icon={<Palette size={28} />} title={t('landing.how.steps.3.title')} desc={t('landing.how.steps.3.desc')} color="var(--accent)" />
                    </div>

                    <div className="landing-steps-grid-2 grid-layout" style={{
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        maxWidth: '800px', margin: '0 auto'
                    }}>
                        <StepCard n="4" icon={<Download size={28} />} title={t('landing.how.steps.4.title')} desc={t('landing.how.steps.4.desc')} color="var(--success)" />
                        <StepCard n="5" icon={<Smartphone size={28} />} title={t('landing.how.steps.5.title')} desc={t('landing.how.steps.5.desc')} color="var(--warning)" />
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                        <button onClick={() => navigate('/auth')} className="btn btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.1rem' }}>
                            {t('landing.how.cta')} <ArrowRight size={20} />
                        </button>
                    </div>
                </section>

                {/* Testimonials */}
                <section className="container" style={{ padding: 'clamp(3rem, 6vw, 6rem) 1rem' }}>
                    <SectionHeader title={t('landing.testimonials.title')} subtitle="" />
                    <div className="landing-testimonial-grid grid-layout" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                        <TestimonialCard name="Júlia R." text={t('landing.testimonials.items.1')} rating={5} />
                        <TestimonialCard name="Judith A." text={t('landing.testimonials.items.2')} rating={5} />
                        <TestimonialCard name="Laia A." text={t('landing.testimonials.items.3')} rating={4} />
                    </div>
                </section>

                {/* Blog Section */}
                <section className="container" style={{ padding: 'clamp(3rem, 6vw, 6rem) 1rem' }}>
                    <SectionHeader title={t('landing.blog.title')} subtitle={t('landing.blog.subtitle')} />
                    <div className="grid-auto-fit" style={{ marginBottom: '2rem' }}>
                        {articles.slice(0, 3).map(article => (
                            <article key={article.id} className="glass glass-hover" style={{ cursor: 'pointer' }} onClick={() => navigate(`/blog/${article.id}`)}>
                                <div style={{ height: '200px', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '1rem', position: 'relative' }}>
                                    <img
                                        src={article.featuredImage}
                                        alt={article.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                    <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
                                        <span className="btn btn-primary" style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}>
                                            {article.category}
                                        </span>
                                    </div>
                                </div>
                                <div style={{ padding: '1.5rem' }}>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem', color: 'var(--text)' }}>
                                        {article.title}
                                    </h3>
                                    <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: '1.6' }}>
                                        {article.excerpt}
                                    </p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{article.readTime}</span>
                                        <ArrowRight size={16} style={{ color: 'var(--primary)' }} />
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <button onClick={() => navigate('/blog')} className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
                            {t('landing.blog.cta')}
                            <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />
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
        id: 'disco',
        color: '#9333ea',
        title: 'Disco Party'
    },
    {
        id: 'pop',
        color: '#ec4899',
        title: 'Pop Hits'
    },
    {
        id: 'luxury_night',
        color: '#3b82f6',
        title: 'Luxury Night'
    }
];

const StackedBingoCards = () => {
    return (
        <div className="stacked-cards-wrapper">
            {/* 1. Background Card */}
            <div className="card-item" style={{
                transform: 'rotate(-10deg) translateX(-20%) translateY(2%) scale(0.9)',
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
                    transparentPage={false}
                    containerStyle={{ width: '100%', height: '100%' }}
                    previewStyle={{
                        boxShadow: '0 5px 20px rgba(0,0,0,0.3)'
                    }}
                    borderStyle={{
                        border: '3px solid #000000'
                    }}
                />
            </div>

            {/* 2. Middle Card */}
            <div className="card-item" style={{
                transform: 'rotate(5deg) translateX(15%) translateY(-2%) scale(0.95)',
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
                    transparentPage={false}
                    containerStyle={{ width: '100%', height: '100%' }}
                    previewStyle={{
                        boxShadow: '0 10px 30px rgba(0,0,0,0.4)'
                    }}
                    borderStyle={{
                        border: '3px solid #000000'
                    }}
                />
            </div>

            {/* 3. Front Card */}
            <div className="card-item" style={{
                transform: 'rotate(-2deg) scale(1.02)',
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
                    transparentPage={false}
                    containerStyle={{ width: '100%', height: '100%' }}
                    previewStyle={{
                        boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
                    }}
                    borderStyle={{
                        border: '3px solid #000000'
                    }}
                />
            </div>
        </div>
    );
};

export default Landing;