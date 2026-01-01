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
                    backgroundColor: '#1a1a2e'
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
                        background: 'linear-gradient(to bottom, rgba(10, 10, 15, 0.1) 0%, rgba(10, 10, 15, 0.5) 100%)',
                        zIndex: 1
                    }} />

                    {/* Centered Content */}
                    <div className="container" style={{
                        position: 'relative',
                        zIndex: 2,
                        maxWidth: '1000px',
                        margin: '0 auto'
                    }}>
                        <h1 className="animate-fade-in" style={{
                            lineHeight: '1.05',
                            marginBottom: '2rem',
                            fontSize: 'clamp(3rem, 7vw, 5.5rem)',
                            fontWeight: '800',
                            letterSpacing: '-2px',
                            background: 'linear-gradient(to bottom, #ffffff 0%, #a5a5a5 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}> Play, sing and win
                            <br />
                            <span style={{
                                background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }}>with Music Bingo!</span>
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
                            Customize your own musical bingo game, fast and easy!
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
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
                            gap: '4rem',
                            alignItems: 'center'
                        }} className="grid-layout">
                            {/* Left Side: Content */}
                            <div>
                                <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', marginBottom: '1.5rem', fontWeight: '800' }}>
                                    From Spotify playlist to Bingo
                                </h2>
                                <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '3rem' }}>
                                    Connect Spotify playlists to create unique bingo cards. <br /> Fast and easy to use.
                                </p>

                                <div style={{ display: 'grid', gap: '1.5rem' }}>
                                    <PremiumFeatureItem
                                        icon={<Palette size={24} color="var(--primary)" />}
                                        title="Customizable Bingo Cards"
                                        description="Every card is fully themeable. From Weddings to corporate events."
                                    />
                                    <PremiumFeatureItem
                                        icon={<Download size={24} color="var(--secondary)" />}
                                        title="Easy to create and print"
                                        description="Get high quality bingo cards ready to print instantly."
                                    />
                                    <PremiumFeatureItem
                                        icon={<Smartphone size={24} color="var(--primary)" />}
                                        title="Real-Time Host Tracker"
                                        description="Host like a professional DJ with our built-in game tracker."
                                    />
                                </div>
                            </div>

                            {/* Right Side: Visual Stack */}
                            <div style={{ position: 'relative', height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="desktop-only">
                                <StackedBingoCards />
                            </div>
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
                            icon={<Palette size={32} color="var(--accent)" />}
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
                            icon={<Download size={32} color="var(--success)" />}
                            title="Print-Ready Export"
                            description="Print bingo cards on your own or order professional printed music bingo games!"
                        />
                        <StepCard
                            number="5"
                            icon={<Smartphone size={32} color="var(--warning)" />}
                            title="Live Host Tracker"
                            description="Use our digital bingo song tracker with IA to track played songs and verify winners the easiest way!"
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

const PremiumFeatureItem = ({ icon, title, description }) => (
    <div style={{ display: 'flex', gap: '1.5rem' }}>
        <div style={{
            minWidth: '48px',
            height: '48px',
            background: 'var(--surface-light)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid var(--glass-border)'
        }}>{icon}</div>
        <div>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '0.4rem', fontWeight: '700' }}>{title}</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.5' }}>{description}</p>
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
            left: '2rem',
            fontSize: '4.5rem',
            fontWeight: '950',
            opacity: 0.15,
            lineHeight: 1,
            color: 'white',
            filter: 'blur(0.5px)'
        }}>{number}</div>
        <div style={{ textAlign: 'right', marginBottom: '2rem' }}>{icon}</div>
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

const StackedBingoCards = () => (
    <div style={{ position: 'relative', width: '420px', height: '560px', perspective: '1000px' }}>
        {/* Retro Theme Card */}
        <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            transform: 'rotate(-12deg) translate(-70px, 30px)',
            zIndex: 1,
            transition: 'var(--transition)',
            cursor: 'pointer',
            border: '4px solid #f39c12',
            borderRadius: '0',
            boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
            overflow: 'hidden'
        }} className="hover-lift">
            <iframe 
                src="http://localhost:8000/api/bingo/live_preview/?theme=retro&primary_color=%23f39c12&rows=3&columns=3&preview=1" 
                style={{
                    width: '794px',
                    height: '1123px',
                    border: 'none',
                    transform: 'scale(0.53)',
                    transformOrigin: '0 0',
                    pointerEvents: 'none'
                }}
                title="Retro Bingo Template"
            />
        </div>
        {/* Wedding Theme Card */}
        <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            transform: 'rotate(10deg) translate(70px, -30px)',
            zIndex: 2,
            transition: 'var(--transition)',
            cursor: 'pointer',
            borderRadius: '8px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
            overflow: 'hidden'
        }} className="hover-lift">
            <iframe 
                src="http://localhost:8000/api/bingo/live_preview/?theme=wedding&primary_color=%23d4af37&rows=3&columns=3&preview=1" 
                style={{
                    width: '794px',
                    height: '1123px',
                    border: 'none',
                    transform: 'scale(0.53)',
                    transformOrigin: '0 0',
                    pointerEvents: 'none'
                }}
                title="Wedding Bingo Template"
            />
        </div>
        {/* Classic Theme Card */}
        <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            transform: 'rotate(-2deg) translate(0, 0)',
            zIndex: 3,
            transition: 'var(--transition)',
            cursor: 'pointer',
            borderRadius: '8px',
            border: '1px solid #333',
            boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
            overflow: 'hidden'
        }} className="hover-lift">
            <iframe 
                src="http://localhost:8000/api/bingo/live_preview/?theme=classic&primary_color=%232c3e50&rows=3&columns=3&preview=1" 
                style={{
                    width: '794px',
                    height: '1123px',
                    border: 'none',
                    transform: 'scale(0.53)',
                    transformOrigin: '0 0',
                    pointerEvents: 'none'
                }}
                title="Classic Bingo Template"
            />
        </div>
    </div>
);

export default Landing;

const extraStyles = document.createElement('style');
extraStyles.innerHTML = `
.hover-lift:hover {
    transform: translateY(-20px) rotate(0deg) scale(1.05) !important;
    z-index: 10 !important;
}
`;
document.head.appendChild(extraStyles);


