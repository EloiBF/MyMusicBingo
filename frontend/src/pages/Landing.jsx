import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Music, Zap, Users, ChevronRight, Play, LogIn, Copy, Palette, Download, Smartphone, Star, Shield, Sparkles, ArrowRight } from 'lucide-react';
import Footer from '../components/Footer';

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div style={{ background: 'var(--background)', color: 'var(--text)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
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
                    <button onClick={() => navigate('/auth')} style={{ background: 'transparent', border: 'none', color: 'var(--text)', cursor: 'pointer', fontWeight: '500' }}>Login</button>
                    <button onClick={() => navigate('/auth')} className="btn btn-primary">Join Now</button>
                </div>
            </nav>

            <div style={{ flex: 1 }}>
                {/* Hero Section */}
                <section style={{
                    padding: 'clamp(4rem, 8vw, 8rem) 1rem',
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    minHeight: '85vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '2.5rem',
                    margin: '0.5rem 1rem',
                    background: '#0a0a0f'
                }}>
                    {/* Background Image - High Energy Party */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: 'url(https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1600&q=80)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        zIndex: 0
                    }} />

                    {/* Refined Overlay */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to bottom, rgba(10, 10, 15, 0.4) 0%, rgba(10, 10, 15, 0.8) 100%)',
                        zIndex: 1
                    }} />

                    {/* Centered Content */}
                    <div className="container" style={{
                        position: 'relative',
                        zIndex: 2,
                        maxWidth: '1000px',
                        margin: '0 auto'
                    }}>
                        <div className="animate-fade-in" style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.5rem 1rem',
                            background: 'rgba(139, 92, 246, 0.1)',
                            border: '1px solid rgba(139, 92, 246, 0.2)',
                            borderRadius: '50px',
                            marginBottom: '2rem',
                            fontSize: '0.9rem',
                            color: 'var(--primary-hover)',
                            fontWeight: '600'
                        }}>
                            <Sparkles size={16} /> Over 10,000 Bingo Cards Created
                        </div>

                        <h1 className="animate-fade-in" style={{
                            lineHeight: '1.05',
                            marginBottom: '2rem',
                            fontSize: 'clamp(3rem, 7vw, 5.5rem)',
                            fontWeight: '800',
                            letterSpacing: '-2px',
                            background: 'linear-gradient(to bottom, #ffffff 0%, #a5a5a5 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}>
                            The Beat <br />
                            <span style={{
                                background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }}>Becomes the Game.</span>
                        </h1>
                        <p className="animate-fade-in" style={{
                            fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
                            color: 'rgba(255, 255, 255, 0.8)',
                            maxWidth: '700px',
                            margin: '0 auto 3.5rem',
                            lineHeight: '1.6',
                            animationDelay: '0.1s'
                        }}>
                            Turn your favorite Spotify playlists into interactive musical bingo.
                            Customize, print, and play in minutes. Perfect for any host who wants to level up their event.
                        </p>

                        <div className="animate-fade-in" style={{
                            display: 'flex',
                            gap: '1.5rem',
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                            animationDelay: '0.2s'
                        }}>
                            <button onClick={() => navigate('/auth')} className="btn btn-primary" style={{
                                padding: '1.4rem 3.5rem',
                                fontSize: '1.2rem',
                                borderRadius: '1rem',
                            }}>
                                Get Started Free <ArrowRight size={22} />
                            </button>
                            <button
                                onClick={() => document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' })}
                                className="btn btn-secondary"
                                style={{
                                    padding: '1.4rem 2.5rem',
                                    fontSize: '1.2rem',
                                    borderRadius: '1rem',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    color: 'white',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    backdropFilter: 'blur(10px)'
                                }}
                            >
                                <Play size={20} fill="currentColor" /> How it Works
                            </button>
                        </div>
                    </div>
                </section>

                {/* Why Section - Streamlined to 3 Cards */}
                <section style={{
                    padding: '8rem 2rem',
                    background: 'var(--surface)',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div className="container">
                        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                            <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', marginBottom: '1.5rem', fontWeight: '800' }}>
                                The Ultimate Host Toolkit
                            </h2>
                            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
                                Everything you need to run a flawless musical bingo night.
                            </p>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                            gap: '2rem'
                        }}>
                            <PremiumFeature
                                icon={<Palette size={32} color="var(--primary)" />}
                                title="Customizable Unique Cards"
                                description="Every card is algorithmically unique and fully themeable. From Golden Wedding to Neon Rave, we've got you covered."
                                backgroundImage="https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=800&q=80"
                            />
                            <PremiumFeature
                                icon={<Download size={32} color="var(--secondary)" />}
                                title="Print High-Quality Pro PDFs"
                                description="Get crystal-clear exports optimized for professional printing or paper-saving layouts. Your choice, always pro."
                                backgroundImage="https://images.unsplash.com/photo-1512418490979-92798cec1380?w=800&q=80"
                            />
                            <PremiumFeature
                                icon={<Smartphone size={32} color="var(--primary)" />}
                                title="Real-Time Host Tracker"
                                description="Host like a professional DJ. Track songs, verify bingos, and manage your game in real-time from any device."
                                backgroundImage="https://images.unsplash.com/photo-1533174072264-a0c2b828608c?w=800&q=80"
                            />
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section id="how-it-works" className="container" style={{ padding: '8rem 2rem' }}>
                    <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', marginBottom: '1.5rem', fontWeight: '800' }}>
                            How It Works
                        </h2>
                        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
                            Start your party in minutes with our simple 5-step process.
                        </p>
                    </div>

                    <div className="landing-steps-grid-3 grid-layout" style={{
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '2.5rem',
                        marginBottom: '2.5rem'
                    }}>
                        <StepCard
                            number="1"
                            icon={<LogIn size={32} color="var(--primary)" />}
                            title="Quick Sign In"
                            description="Create your account to save your bingo events and access premium customization tools."
                        />
                        <StepCard
                            number="2"
                            icon={<Music size={32} color="var(--secondary)" />}
                            title="Connect Spotify"
                            description="Paste any public Spotify playlist ID. We'll instantly import the tracks for your game."
                        />
                        <StepCard
                            number="3"
                            icon={<Palette size={32} color="var(--primary)" />}
                            title="Style Your Cards"
                            description="Choose from professional themes and customize colors to match your event's vibe."
                        />
                    </div>

                    <div className="landing-steps-grid-2 grid-layout" style={{
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '2.5rem',
                        maxWidth: '900px',
                        margin: '0 auto'
                    }}>
                        <StepCard
                            number="4"
                            icon={<Download size={32} color="var(--secondary)" />}
                            title="Print-Ready Export"
                            description="Download high-quality PDFs instantly, optimized for both digital use and professional printing."
                        />
                        <StepCard
                            number="5"
                            icon={<Smartphone size={32} color="var(--primary)" />}
                            title="Live Host Tracker"
                            description="Use our digital dashboard to track played songs and verify winners in real-time."
                        />
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '5rem' }}>
                        <button onClick={() => navigate('/auth')} className="btn btn-primary" style={{ padding: '1.2rem 3rem' }}>
                            Start Your First Game <ArrowRight size={20} />
                        </button>
                    </div>
                </section>

                {/* Testimonials */}
                <section className="container" style={{ padding: '8rem 2rem' }}>
                    <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', marginBottom: '1.5rem', fontWeight: '800' }}>
                            User Success Stories
                        </h2>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '2rem'
                    }}>
                        <TestimonialCard
                            name="Marc G."
                            role="Professional DJ"
                            content="This is the most stable and visualy pleasing tool I've used. My clients are always impressed by the card designs."
                            rating={5}
                        />
                        <TestimonialCard
                            name="Elena S."
                            role="Event Planner"
                            content="Setup takes less than 5 minutes. The Spotify integration is seamless. We use it for every corporate party now."
                            rating={5}
                        />
                        <TestimonialCard
                            name="David L."
                            role="Bar Owner"
                            content="Bingo nights used to be a mess. Now they are our most profitable nights of the week. Super easy to manage!"
                            rating={5}
                        />
                    </div>
                </section>

                {/* Final CTA */}
                <section className="container" style={{ padding: '6rem 2rem' }}>
                    <div className="glass" style={{
                        padding: '6rem 3rem',
                        textAlign: 'center',
                        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(10, 10, 15, 0.4) 100%)',
                        border: '1px solid rgba(139, 92, 246, 0.2)',
                        overflow: 'hidden',
                        position: 'relative'
                    }}>
                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem', fontWeight: '800' }}>
                                Ready to Play?
                            </h2>
                            <p style={{ fontSize: '1.25rem', color: 'rgba(255, 255, 255, 0.8)', maxWidth: '600px', margin: '0 auto 3rem' }}>
                                Join creators worldwide and host the ultimate music bingo event.
                            </p>
                            <button onClick={() => navigate('/auth')} className="btn btn-primary" style={{ padding: '1.5rem 4rem', fontSize: '1.3rem' }}>
                                Get Started Now <ArrowRight size={24} />
                            </button>
                            <p style={{ marginTop: '2rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                Free to start • No credit card required • Unlimited fun
                            </p>
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </div>
    );
};

const PremiumFeature = ({ icon, title, description, backgroundImage }) => (
    <div className="glass" style={{
        padding: '3rem 2rem',
        transition: 'var(--transition)',
        position: 'relative',
        borderRadius: '2rem',
        overflow: 'hidden',
        minHeight: '320px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        border: '1px solid rgba(255, 255, 255, 0.05)'
    }}>
        <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.3,
            zIndex: 0
        }} />
        <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, var(--surface) 20%, transparent 100%)',
            zIndex: 1
        }} />

        <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{
                marginBottom: '1.5rem',
                width: '60px',
                height: '60px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>{icon}</div>
            <h3 style={{ fontSize: '1.6rem', marginBottom: '1rem', fontWeight: '700' }}>{title}</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '1.05rem' }}>{description}</p>
        </div>
    </div>
);

const StepCard = ({ number, icon, title, description }) => (
    <div style={{
        padding: '3rem',
        borderRadius: '2rem',
        background: 'var(--surface-light)',
        border: '1px solid var(--glass-border)',
        transition: 'var(--transition)',
        position: 'relative'
    }}>
        <div style={{
            position: 'absolute',
            top: '2rem',
            right: '2rem',
            fontSize: '4rem',
            fontWeight: '900',
            opacity: 0.05,
            lineHeight: 1
        }}>{number}</div>
        <div style={{ marginBottom: '2rem' }}>{icon}</div>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.2rem', fontWeight: '700' }}>{title}</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.6' }}>{description}</p>
    </div>
);

const TestimonialCard = ({ name, role, content, rating }) => (
    <div className="glass" style={{
        padding: '2.5rem',
        borderRadius: '2rem',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'rgba(255, 255, 255, 0.02)'
    }}>
        <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '2px' }}>
            {[...Array(rating)].map((_, i) => (
                <Star key={i} size={18} color="var(--primary)" fill="var(--primary)" />
            ))}
        </div>
        <p style={{
            color: 'var(--text)',
            lineHeight: '1.7',
            fontSize: '1.1rem',
            marginBottom: '2rem',
            fontStyle: 'italic',
            flex: 1
        }}>
            "{content}"
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '0.9rem'
            }}>
                {name[0]}
            </div>
            <div>
                <div style={{ fontWeight: '700', fontSize: '1rem' }}>{name}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{role}</div>
            </div>
        </div>
    </div>
);

export default Landing;
