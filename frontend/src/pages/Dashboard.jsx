import React, { useState, useEffect } from 'react';
import {
    PlusCircle, Music, Layers, Printer, BarChart3, Trash2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const Dashboard = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
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
            } catch (err) {
                console.error('Error fetching dashboard data:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div style={{ padding: '4rem', textAlign: 'center' }}>Loading dashboard...</div>;

    return (
        <>
            <header className="flex-between-responsive" style={{ marginBottom: '4rem' }}>
                <div>
                    <h1 style={{ marginBottom: '0.5rem' }}>My Bingo Events</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Management and statistics for your music bingo nights.</p>
                </div>
                <button onClick={() => navigate('/create')} className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}>
                    <PlusCircle size={18} /> New Bingo
                </button>
            </header>

            {events.length === 0 ? (
                <div className="glass" style={{ padding: '4rem', textAlign: 'center', border: '1px solid var(--glass-border)' }}>
                    <div style={{ marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
                        <Layers size={48} style={{ opacity: 0.1, margin: '0 auto' }} />
                    </div>
                    <h3 style={{ marginBottom: '1rem' }}>No bingo events yet</h3>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Start by creating your first bingo set from a Spotify playlist.</p>
                    <button onClick={() => navigate('/create')} className="btn btn-primary">
                        <PlusCircle size={18} /> Create First Bingo
                    </button>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                    {events.map((event) => (
                        <section
                            key={event.id}
                            className="glass"
                            style={{
                                padding: '2rem',
                                cursor: 'pointer',
                                position: 'relative',
                                overflow: 'hidden',
                                transition: 'var(--transition)',
                                transformOrigin: 'center'
                            }}
                            onClick={() => navigate(`/bingo/${event.id}`)}
                        >
                            {/* Colorful accent bar using event's primary color */}
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                height: '4px',
                                background: event.primary_color
                            }} />

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    background: event.primary_color,
                                    borderRadius: 'var(--radius-md)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: `0 4px 15px ${event.primary_color}40`,
                                    border: '1px solid rgba(255,255,255,0.2)'
                                }}>
                                    <Music size={24} color="white" />
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        window.open(`http://localhost:8000/api/bingo/${event.id}/printable_html/`, '_blank');
                                    }}
                                    className="btn btn-secondary"
                                    style={{ padding: '0.5rem', borderRadius: '0.5rem' }}
                                >
                                    <Printer size={18} />
                                </button>
                            </div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{event.event_title}</h3>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>{event.playlist_name}</p>

                            <div style={{ display: 'flex', gap: '1rem', borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem' }}>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                    <span style={{ fontWeight: 'bold', color: 'var(--text-main)', display: 'block' }}>{event.num_cards}</span>
                                    Cards
                                </div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                    <span style={{ fontWeight: 'bold', color: 'var(--text-main)', display: 'block' }}>{event.rows}x{event.columns}</span>
                                    Grid
                                </div>
                                <div style={{ marginLeft: 'auto', alignSelf: 'center' }}>
                                    <BarChart3 size={18} color={event.primary_color} />
                                </div>
                            </div>
                        </section>
                    ))}
                </div>
            )}
        </>
    );
};

export default Dashboard;
