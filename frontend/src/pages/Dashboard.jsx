import React, { useState, useEffect } from 'react';
import {
    PlusCircle, Music, Layers, Printer, BarChart3, ChevronRight, Layout, Play
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from '../api';
import API_URLS from '../config/api';
import PageLayout from '../components/PageLayout';
import BingoCardPreview from '../components/BingoCardPreview';
import PlatformIcon, { getPlaylistUrl } from '../components/PlatformIcon';

const Dashboard = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [stats, setStats] = useState({});
    const [cards, setCards] = useState({});
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [eventsRes, userRes] = await Promise.all([
                    api.get('/bingo/'),
                    api.get('/auth/me/')
                ]);
                const eventsList = Array.isArray(eventsRes.data) ? eventsRes.data : (eventsRes.data.results || []);
                setEvents(eventsList);
                setUser(userRes.data);

                // Fetch stats and first card for each event
                const statsPromises = eventsList.map(event =>
                    api.get(`/bingo/${event.id}/statistics/`).catch(() => null)
                );
                const cardsPromises = eventsList.map(event =>
                    api.get(`/bingo/${event.id}/get_cards/`).catch(() => null)
                );

                const [statsResults, cardsResults] = await Promise.all([
                    Promise.all(statsPromises),
                    Promise.all(cardsPromises)
                ]);

                const statsMap = {};
                const cardsMap = {};
                eventsList.forEach((event, index) => {
                    if (statsResults[index]) {
                        statsMap[event.id] = statsResults[index].data;
                    }
                    if (cardsResults[index] && cardsResults[index].data.length > 0) {
                        cardsMap[event.id] = cardsResults[index].data[0];
                    }
                });
                setStats(statsMap);
                setCards(cardsMap);
            } catch (err) {
                console.error('Error fetching dashboard data:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>{t('dashboard.loading')}</div>;

    const headerActions = events.length > 0 ? (
        <button
            onClick={() => navigate('/create')}
            className="btn btn-primary"
            style={{ padding: '0.8rem 1.8rem', display: 'flex', alignItems: 'center', gap: '0.75rem', boxShadow: 'var(--shadow-lg)' }}
        >
            <PlusCircle size={20} /> {t('dashboard.new_bingo')}
        </button>
    ) : null;

    return (
        <PageLayout
            title={`${t('dashboard.welcome')}${user?.username ? `, ${user.username}` : ''}`}
            subtitle={t('dashboard.subtitle')}
            actions={headerActions}
        >
            {/* Content Section */}
            {events.length === 0 ? (
                <div style={{
                    minHeight: '60vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    gap: '2.5rem',
                    padding: '2rem 1rem',
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: 'var(--radius-xl)',
                    background: 'var(--glass)',
                    border: '1px solid var(--glass-border)',
                }}>
                    {/* Background Ambient Glow */}
                    <div style={{ position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, var(--primary) 15%, transparent 70%)', opacity: 0.15, pointerEvents: 'none', filter: 'blur(80px)' }} />

                    <div style={{
                        position: 'relative',
                        width: '120px', height: '120px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        marginBottom: '1rem'
                    }}>
                        <div style={{
                            position: 'absolute', inset: 0,
                            borderRadius: '30px',
                            background: 'linear-gradient(135deg, var(--primary)20, var(--secondary)20)',
                            transform: 'rotate(12deg)',
                            border: '1px solid var(--glass-border)'
                        }} />
                        <div style={{
                            position: 'absolute', inset: 0,
                            borderRadius: '30px',
                            background: 'linear-gradient(135deg, var(--card-bg) 0%, var(--glass) 100%)',
                            backdropFilter: 'blur(20px)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            border: '1px solid var(--glass-border)',
                            boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)',
                            transform: 'rotate(-6deg)'
                        }}>
                            <Layout size={56} style={{ color: 'var(--primary)', filter: 'drop-shadow(0 4px 12px var(--primary)40)' }} strokeWidth={1.5} />
                        </div>
                    </div>

                    <div style={{ maxWidth: '420px', position: 'relative', zIndex: 1 }}>
                        <h2 style={{
                            fontSize: 'clamp(1.8rem, 4vw, 2.2rem)',
                            fontWeight: '800',
                            marginBottom: '1rem',
                            lineHeight: 1.2
                        }}>
                            {t('dashboard.empty.title')}
                        </h2>
                        <p style={{
                            fontSize: '1.1rem',
                            lineHeight: '1.6',
                            color: 'var(--text-muted)',
                            marginBottom: '2.5rem'
                        }}>
                            {t('dashboard.empty.desc')}
                        </p>

                        <button
                            onClick={() => navigate('/create')}
                            className="btn btn-primary"
                            style={{
                                padding: '1.1rem 2.8rem',
                                fontSize: '1.1rem',
                                borderRadius: '50px',
                                boxShadow: '0 10px 30px -5px var(--primary)60',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.8rem',
                                border: '1px solid rgba(255,255,255,0.2)',
                                transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)'
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                                e.currentTarget.style.boxShadow = '0 20px 40px -10px var(--primary)80';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                e.currentTarget.style.boxShadow = '0 10px 30px -5px var(--primary)60';
                            }}
                        >
                            <span>{t('dashboard.empty.cta')}</span>
                        </button>
                    </div>
                </div>
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '1.25rem',
                    alignContent: 'start'
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
                                overflow: 'hidden',
                                minHeight: '300px',
                                maxHeight: '320px'
                            }}
                            onClick={() => navigate(`/bingo/${event.id}`)}
                        >
                            {/* Header with title */}
                            <div style={{
                                padding: '0.8rem 1.1rem 0.6rem',
                                borderBottom: '1px solid var(--glass-border)',
                                background: 'linear-gradient(135deg, ' + (event.primary_color || 'var(--primary)') + '08, transparent 50%)',
                                flexShrink: 0
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    top: 0, left: 0, right: 0, height: '3px',
                                    background: 'linear-gradient(90deg, ' + (event.primary_color || 'var(--primary)') + ', ' + (event.primary_color || 'var(--secondary)') + ')',
                                    boxShadow: '0 2px 8px ' + (event.primary_color || 'var(--primary)') + '30'
                                }} />

                                <h3 style={{
                                    fontSize: '1.1rem',
                                    marginBottom: '0.3rem',
                                    fontWeight: '700',
                                    lineHeight: '1.2',
                                    color: 'var(--text)',
                                    letterSpacing: '-0.01em',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                }}>
                                    {event.event_title}
                                </h3>

                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.3rem',
                                    color: 'var(--text-muted)',
                                    fontSize: '0.7rem'
                                }}>
                                    <PlatformIcon platform={event.platform || 'spotify'} size={10} />
                                    {(() => {
                                        const url = getPlaylistUrl(event.platform || 'spotify', event.playlist_id);
                                        return url ? (
                                            <a
                                                href={url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{
                                                    color: 'var(--text-muted)',
                                                    textDecoration: 'none',
                                                    transition: 'color 0.2s',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    flex: 1
                                                }}
                                                onMouseEnter={e => {
                                                    e.stopPropagation();
                                                    e.currentTarget.style.color = event.platform?.toLowerCase() === 'youtube' ? '#FF0000' : '#1DB954';
                                                }}
                                                onMouseLeave={e => {
                                                    e.stopPropagation();
                                                    e.currentTarget.style.color = 'var(--text-muted)';
                                                }}
                                                onClick={e => e.stopPropagation()}
                                            >
                                                {event.playlist_name}
                                            </a>
                                        ) : (
                                            <span style={{
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                                flex: 1
                                            }}>{event.playlist_name}</span>
                                        );
                                    })()}
                                </div>
                            </div>

                            {/* Date */}
                            <div style={{
                                padding: '0.4rem 1.1rem 0.4rem',
                                flexShrink: 0
                            }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.3rem',
                                    fontSize: '0.65rem',
                                    color: 'var(--text-muted)',
                                    fontWeight: '500'
                                }}>
                                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                        <line x1="16" y1="2" x2="16" y2="6"></line>
                                        <line x1="8" y1="2" x2="8" y2="6"></line>
                                        <line x1="3" y1="10" x2="21" y2="10"></line>
                                    </svg>
                                    {new Date(event.created_at || Date.now()).toLocaleDateString(i18n.language === 'es' ? 'es-ES' : 'en-GB', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </div>
                            </div>

                            <BingoCardPreview
                                event={event}
                                cardData={cards[event.id]?.data || []}
                                isMini={true}
                            />
                        </div>
                    ))}
                </div>
            )}

            {/* Global Styles for the Hover Effect */}
            <style>{`
                .card-hover:hover {
                    box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px var(--primary)30;
                    border-color: var(--primary)50 !important;
                    background: hsla(0, 0%, 100%, 0.08) !important;
                }
                .card-hover:active {
                    transition: all 0.1s ease;
                }
                .card-hover:hover div[style*="background: var(--glass)"] {
                    background: var(--glass) !important;
                    border-color: var(--primary)40 !important;
                }

            `}</style>
        </PageLayout>
    );
};

export default Dashboard;