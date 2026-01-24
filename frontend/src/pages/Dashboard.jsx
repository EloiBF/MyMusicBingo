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

    const headerActions = (
        <button
            onClick={() => navigate('/create')}
            className="btn btn-primary"
            style={{ padding: '0.8rem 1.8rem', display: 'flex', alignItems: 'center', gap: '0.75rem', boxShadow: 'var(--shadow-lg)' }}
        >
            <PlusCircle size={20} /> {t('dashboard.new_bingo')}
        </button>
    );

    return (
        <PageLayout
            title={`${t('dashboard.welcome')}${user?.username ? `, ${user.username}` : ''}`}
            subtitle={t('dashboard.subtitle')}
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
                        }}>{t('dashboard.empty.title')}</h3>
                        <p style={{
                            color: 'var(--text-muted)',
                            maxWidth: '400px',
                            margin: '0 auto',
                            fontSize: '1rem',
                            lineHeight: '1.6'
                        }}>
                            {t('dashboard.empty.desc')}
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
                        {t('dashboard.empty.cta')}
                    </button>
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
                                    <span style={{
                                        color: 'var(--spotify-green)',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        width: '10px',
                                        height: '10px',
                                        flexShrink: 0
                                    }}>
                                        <svg width="100%" height="100%" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                                        </svg>
                                    </span>
                                    <span style={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        flex: 1
                                    }}>{event.playlist_name}</span>
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