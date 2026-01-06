import React, { useState, useEffect } from 'react';
import {
    PlusCircle, Music, Layers, Printer, BarChart3, ChevronRight, Layout, Play
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import API_URLS from '../config/api';
import PageLayout from '../components/PageLayout';

const Dashboard = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [eventsRes, userRes] = await Promise.all([
                    api.get('/bingo/'),
                    api.get('/auth/me/')
                ]);
                setEvents(eventsRes.data);
                setUser(userRes.data);
                
                // Fetch stats for each event
                const statsPromises = eventsRes.data.map(event => 
                    api.get(`/bingo/${event.id}/statistics/`).catch(() => null)
                );
                const statsResults = await Promise.all(statsPromises);
                
                const statsMap = {};
                eventsRes.data.forEach((event, index) => {
                    if (statsResults[index]) {
                        statsMap[event.id] = statsResults[index].data;
                    }
                });
                setStats(statsMap);
            } catch (err) {
                console.error('Error fetching dashboard data:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Loading your dashboard...</div>;

    const headerActions = (
        <button
            onClick={() => navigate('/create')}
            className="btn btn-primary"
            style={{ padding: '0.8rem 1.8rem', display: 'flex', alignItems: 'center', gap: '0.75rem', boxShadow: 'var(--shadow-lg)' }}
        >
            <PlusCircle size={20} /> Create New Bingo
        </button>
    );

    return (
        <PageLayout
            title={`Welcome back${user?.username ? `, ${user.username}` : ''}`}
            subtitle="Manage your music bingos and create new ones in a few clicks."
            actions={headerActions}
        >
            {/* Content Section */}
            {events.length === 0 ? (
                <div className="glass" style={{
                    padding: '6rem 3rem',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '2rem',
                    border: '1px dashed var(--glass-border)',
                    background: 'var(--glass)',
                    backdropFilter: 'var(--glass-blur)',
                    WebkitBackdropFilter: 'var(--glass-blur)',
                    borderRadius: 'var(--radius-xl)',
                    boxShadow: 'var(--shadow-lg)',
                    maxWidth: '600px',
                    margin: '0 auto'
                }}>
                    <div style={{
                        width: '96px', height: '96px', borderRadius: '50%',
                        background: 'linear-gradient(135deg, var(--primary)20, var(--secondary)20)', 
                        display: 'flex',
                        alignItems: 'center', justifyContent: 'center', 
                        color: 'var(--primary)',
                        border: '1px solid var(--primary)30',
                        backdropFilter: 'var(--glass-blur)',
                        WebkitBackdropFilter: 'var(--glass-blur)',
                        boxShadow: '0 8px 24px var(--primary)20'
                    }}>
                        <Layout size={48} strokeWidth={1.5} />
                    </div>
                    <div>
                        <h3 style={{ 
                            fontSize: '1.75rem', 
                            marginBottom: '1rem', 
                            fontWeight: '700',
                            color: 'var(--text)'
                        }}>No bingo events found</h3>
                        <p style={{ 
                            color: 'var(--text-muted)', 
                            maxWidth: '400px', 
                            margin: '0 auto',
                            fontSize: '1rem',
                            lineHeight: '1.6'
                        }}>
                            Ready to host? Transform any Spotify playlist into a professional bingo game in seconds.
                        </p>
                    </div>
                    <button 
                        onClick={() => navigate('/create')} 
                        className="btn btn-primary" 
                        style={{ 
                            marginTop: '1rem',
                            padding: '1rem 2rem',
                            fontSize: '1rem',
                            boxShadow: 'var(--shadow-glow)'
                        }}
                    >
                        Get Started
                    </button>
                </div>
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                    gap: '2rem'
                }}>
                    {events.map((event) => (
                        <div
                            key={event.id}
                            className="glass card-hover"
                            style={{
                                padding: '0',
                                cursor: 'pointer',
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column',
                                transition: 'var(--transition)',
                                border: '1px solid var(--glass-border)',
                                background: 'var(--glass)',
                                backdropFilter: 'var(--glass-blur)',
                                WebkitBackdropFilter: 'var(--glass-blur)',
                                borderRadius: 'var(--radius-xl)',
                                boxShadow: 'var(--shadow-lg)',
                                overflow: 'hidden'
                            }}
                            onClick={() => navigate(`/bingo/${event.id}`)}
                        >
                            {/* Header with color accent and actions */}
                            <div style={{
                                position: 'relative',
                                padding: '1.75rem 2rem 1.25rem',
                                borderBottom: '1px solid var(--glass-border)',
                                background: 'linear-gradient(135deg, ' + (event.primary_color || 'var(--primary)') + '08, transparent 50%)'
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    top: 0, left: 0, right: 0, height: '4px',
                                    background: 'linear-gradient(90deg, ' + (event.primary_color || 'var(--primary)') + ', ' + (event.primary_color || 'var(--secondary)') + ')',
                                    boxShadow: '0 2px 8px ' + (event.primary_color || 'var(--primary)') + '30'
                                }} />
                                
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div style={{ flex: 1, marginRight: '1.5rem' }}>
                                        <h3 style={{ 
                                            fontSize: '1.6rem', 
                                            marginBottom: '0.75rem', 
                                            fontWeight: '800',
                                            lineHeight: '1.2',
                                            color: 'var(--text)',
                                            letterSpacing: '-0.02em'
                                        }}>
                                            {event.event_title}
                                        </h3>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.75rem',
                                            color: 'var(--text-muted)',
                                            fontSize: '0.95rem'
                                        }}>
                                            <span style={{ 
                                                color: 'var(--spotify-green)', 
                                                display: 'inline-flex', 
                                                alignItems: 'center',
                                                width: '20px',
                                                height: '20px'
                                            }}>
                                                <svg width="100%" height="100%" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                                                </svg>
                                            </span>
                                            <span style={{ fontWeight: '500' }}>{event.playlist_name}</span>
                                        </div>
                                    </div>
                                    
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(`/print/${event.id}`);
                                        }}
                                        className="btn-icon-only"
                                        title="Print Cards"
                                        style={{
                                            background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
                                            border: '1px solid var(--primary)',
                                            color: 'white',
                                            backdropFilter: 'none',
                                            WebkitBackdropFilter: 'none',
                                            borderRadius: 'var(--radius-lg)',
                                            width: '44px', height: '44px',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            cursor: 'pointer',
                                            flexShrink: 0
                                        }}
                                    >
                                        <Printer size={20} strokeWidth={2} />
                                    </button>
                                </div>
                            </div>

                            {/* Main content with stats */}
                            <div style={{ padding: '1.5rem 2rem' }}>
                                {/* Quick Stats */}
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(3, 1fr)',
                                    gap: '1.25rem',
                                    marginBottom: '1.75rem'
                                }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{
                                            width: '52px', height: '52px',
                                            background: 'linear-gradient(135deg, var(--primary)25, var(--primary)15)',
                                            color: 'var(--primary)',
                                            borderRadius: 'var(--radius-lg)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            margin: '0 auto 0.75rem',
                                            border: '1px solid var(--primary)35',
                                            boxShadow: '0 4px 12px var(--primary)20',
                                            fontSize: '1.4rem',
                                            fontWeight: '800'
                                        }}>
                                            {event.num_cards}
                                        </div>
                                        <div style={{ 
                                            fontSize: '1.1rem', 
                                            fontWeight: '700', 
                                            color: 'var(--text)',
                                            lineHeight: '1'
                                        }}>Cards</div>
                                    </div>
                                    
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{
                                            width: '52px', height: '52px',
                                            background: 'linear-gradient(135deg, var(--secondary)25, var(--secondary)15)',
                                            color: 'var(--secondary)',
                                            borderRadius: 'var(--radius-lg)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            margin: '0 auto 0.75rem',
                                            border: '1px solid var(--secondary)35',
                                            boxShadow: '0 4px 12px var(--secondary)20',
                                            fontSize: '1.4rem',
                                            fontWeight: '800'
                                        }}>
                                            {stats[event.id]?.total_songs_in_pool || (event.rows * event.columns)}
                                        </div>
                                        <div style={{ 
                                            fontSize: '1.1rem', 
                                            fontWeight: '700', 
                                            color: 'var(--text)',
                                            lineHeight: '1'
                                        }}>Songs Pool</div>
                                    </div>
                                    
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{
                                            width: '52px', height: '52px',
                                            background: 'linear-gradient(135deg, var(--accent)25, var(--accent)15)',
                                            color: 'var(--accent)',
                                            borderRadius: 'var(--radius-lg)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            margin: '0 auto 0.75rem',
                                            border: '1px solid var(--accent)35',
                                            boxShadow: '0 4px 12px var(--accent)20',
                                            fontSize: '1.2rem',
                                            fontWeight: '800'
                                        }}>
                                            {event.rows}×{event.columns}
                                        </div>
                                        <div style={{ 
                                            fontSize: '1.1rem', 
                                            fontWeight: '700', 
                                            color: 'var(--text)',
                                            lineHeight: '1'
                                        }}>Grid Size</div>
                                    </div>
                                </div>

                                {/* Event Status */}
                                <div style={{
                                    padding: '0.75rem 1rem',
                                    fontSize: '0.85rem',
                                    color: 'var(--text-muted)',
                                    fontWeight: '500',
                                    textAlign: 'center'
                                }}>
                                    Created {new Date(event.created_at || Date.now()).toLocaleDateString()}
                                </div>
                            </div>

                            {/* Footer with action */}
                            <div style={{
                                marginTop: 'auto',
                                padding: '1.25rem 2rem',
                                borderTop: '1px solid var(--glass-border)',
                                background: 'linear-gradient(to bottom, transparent, var(--glass))'
                            }}>
                                <div style={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center',
                                    gap: '0.75rem', 
                                    fontSize: '1rem', 
                                    fontWeight: '600',
                                    color: 'var(--primary)',
                                    padding: '0.875rem 1.5rem',
                                    borderRadius: 'var(--radius-lg)',
                                    background: 'linear-gradient(135deg, var(--primary)15, var(--primary)08)',
                                    border: '1px solid var(--primary)25',
                                    transition: 'var(--transition)',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}>
                                    <div style={{
                                        position: 'absolute',
                                        top: 0, left: 0, right: 0, bottom: 0,
                                        background: 'linear-gradient(135deg, var(--primary)20, transparent)',
                                        opacity: 0,
                                        transition: 'opacity 0.3s ease'
                                    }} />
                                    <span style={{ position: 'relative', zIndex: 1 }}>Manage Bingo</span>
                                    <ChevronRight size={18} style={{ position: 'relative', zIndex: 1 }} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Global Styles for the Hover Effect */}
            <style>{`
                .card-hover:hover {
                    transform: translateY(-8px) scale(1.02);
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px var(--primary)30;
                    border-color: var(--primary)50 !important;
                    background: hsla(0, 0%, 100%, 0.08) !important;
                }
                .card-hover:hover .btn-icon-only:not([title="Print Cards"]) {
                    background: var(--primary)20 !important;
                    color: var(--primary) !important;
                    border-color: var(--primary)50 !important;
                    transform: scale(1.1) rotate(5deg);
                    box-shadow: 0 6px 16px var(--primary)30 !important;
                }
                .card-hover:active {
                    transform: translateY(-4px) scale(1.01);
                    transition: all 0.1s ease;
                }
                .card-hover:hover div[style*="background: linear-gradient(135deg, var(--primary)15"] {
                    background: linear-gradient(135deg, var(--primary)25, var(--primary)15) !important;
                    border-color: var(--primary)40 !important;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px var(--primary)20 !important;
                }
                .card-hover:hover div[style*="background: linear-gradient(135deg, var(--primary)15"] > div:first-child {
                    opacity: 1 !important;
                }

            `}</style>
        </PageLayout>
    );
};

export default Dashboard;