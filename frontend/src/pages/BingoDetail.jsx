import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    BarChart3, Printer, Music, Users, PieChart,
    ChevronLeft, Info, TrendingUp, TrendingDown, Eye, Trash2, Edit, Check
} from 'lucide-react';
import api from '../api';
import SongTracking from '../components/SongTracking';
import API_URLS from '../config/api';

const BingoDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showSongTracking, setShowSongTracking] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [eventRes, statsRes] = await Promise.all([
                    api.get(`/bingo/${id}/`),
                    api.get(`/bingo/${id}/statistics/`)
                ]);
                setEvent(eventRes.data);
                setStats(statsRes.data);
            } catch (err) {
                console.error('Error fetching bingo details:', err);
                alert('Could not find this bingo event.');
                navigate('/dashboard');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id, navigate]);

    const handleDelete = async () => {
        try {
            await api.delete(`/bingo/${id}/`);
            navigate('/dashboard');
        } catch (err) {
            console.error('Error deleting bingo event:', err);
            alert('Failed to delete the bingo event.');
        }
    };

    const handleEdit = () => {
        navigate(`/bingo/${id}/edit`);
    };

    if (loading) return <div style={{ padding: '4rem', textAlign: 'center' }}>Loading event details...</div>;
    if (!event || !stats) return null;

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <button
                onClick={() => navigate('/dashboard')}
                className="btn btn-secondary"
                style={{ marginBottom: '2rem', padding: '0.5rem 1rem' }}
            >
                <ChevronLeft size={18} /> Back to Dashboard
            </button>

            <header className="flex-between-responsive" style={{ marginBottom: '3rem' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                        <h1 style={{ margin: 0 }}>{event.event_title}</h1>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button
                                onClick={handleEdit}
                                className="btn btn-secondary"
                                style={{ padding: '0.5rem 1rem' }}
                                title="Edit event settings"
                            >
                                <Edit size={16} />
                            </button>
                            <button
                                onClick={() => setShowDeleteModal(true)}
                                className="btn btn-danger"
                                style={{ padding: '0.5rem 1rem', background: '#dc3545', borderColor: '#dc3545' }}
                                title="Delete event"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                        <span style={{
                            background: event.primary_color,
                            color: 'white',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '2rem',
                            fontSize: '0.8rem',
                            textTransform: 'uppercase',
                            fontWeight: 'bold'
                        }}>
                            {event.theme}
                        </span>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Music size={20} /> Playlist: {event.playlist_name}
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }} className="flex-between-responsive">
                    <button
                        onClick={() => setShowSongTracking(true)}
                        className="btn btn-secondary"
                        style={{ padding: '1rem 2rem', flex: 1 }}
                    >
                        <Music size={20} /> Song Tracking
                    </button>
                    <button
                        onClick={() => window.open(API_URLS.BINGO_PRINTABLE(id), '_blank')}
                        className="btn btn-primary"
                        style={{ padding: '1rem 2rem', flex: 1 }}
                    >
                        <Printer size={20} /> Print Cards
                    </button>
                </div>
            </header>

            <div className="grid-layout" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 350px', gap: '2.5rem' }}>
                <div>
                    {/* Stats Overview */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                        gap: '1.5rem',
                        marginBottom: '2.5rem'
                    }}>
                        <StatCard icon={<Users size={20} />} label="Participants" value={stats.num_participants} color="#8b5cf6" />
                        <StatCard icon={<PieChart size={20} />} label="Pool Diversity" value={`${stats.unique_songs_used} songs`} color="#ec4899" />
                        <StatCard icon={<Music size={20} />} label="Total Songs" value={stats.total_songs_in_pool} color="#3b82f6" />
                        <StatCard icon={<BarChart3 size={20} />} label="Grid Layout" value={`${event.rows}x${event.columns}`} color="#10b981" />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2.5rem' }}>
                        {/* Most Repeated Songs */}
                        <section className="glass" style={{ padding: '2rem' }}>
                            <h3 style={{
                                marginBottom: '1.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                color: 'var(--primary)'
                            }}>
                                <TrendingUp size={20} /> Most Repeated Songs
                            </h3>
                            <div className="grid-auto-fit">
                                {stats.most_repeated.map(([song, count], idx) => (
                                    <div key={idx} style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '1rem',
                                        background: 'rgba(255, 255, 255, 0.03)',
                                        borderRadius: '0.75rem',
                                        gap: '0.5rem'
                                    }}>
                                        <div style={{ overflow: 'hidden', minWidth: 0, flex: 1 }}>
                                            <p style={{ fontWeight: 600, fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', margin: 0 }} title={song}>
                                                {song.length > 35 ? song.substring(0, 35) + '...' : song}
                                            </p>
                                        </div>
                                        <span style={{
                                            background: 'var(--primary)',
                                            color: 'white',
                                            padding: '0.1rem 0.5rem',
                                            borderRadius: '1rem',
                                            fontSize: '0.75rem',
                                            fontWeight: 'bold',
                                            flexShrink: 0
                                        }}>
                                            {count}x
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>

                {/* Preview Section */}
                <aside style={{ position: 'sticky', top: '2rem', height: 'fit-content' }}>
                    <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Eye size={20} color="var(--primary)" /> Live Preview
                    </h3>
                    <div className="glass" style={{
                        padding: '10px',
                        overflow: 'hidden',
                        aspectRatio: '1 / 1.414',
                        background: '#f8f9fa',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                        transform: 'rotate(-2deg)',
                        border: '2px solid white'
                    }}>
                        <iframe
                            src={API_URLS.BINGO_PREVIEW_CARD(id)}
                            style={{
                                width: '794px',
                                height: '1123px',
                                border: 'none',
                                transform: 'scale(0.5)',
                                transformOrigin: 'top left',
                                overflow: 'hidden',
                                position: 'absolute',
                                top: '0',
                                left: '0'
                            }}
                            scrolling="no"
                            title="Card Preview"
                        />
                    </div>
                    <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                        Preview of the first card (A4 layout)
                    </p>
                </aside>
            </div>

            {showDeleteModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.7)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <div className="glass" style={{ padding: '2rem', maxWidth: '400px', width: '90%' }}>
                        <h3 style={{ marginBottom: '1rem', color: '#dc3545' }}>Delete Bingo Event</h3>
                        <p style={{ marginBottom: '2rem', color: 'var(--text-muted)' }}>
                            Are you sure you want to delete "{event.event_title}"? This action cannot be undone.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="btn btn-secondary"
                                style={{ padding: '0.75rem 1.5rem' }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="btn btn-danger"
                                style={{ padding: '0.75rem 1.5rem', background: '#dc3545', borderColor: '#dc3545' }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {showSongTracking && (
                <SongTracking
                    bingoId={id}
                    onClose={() => setShowSongTracking(false)}
                />
            )}
        </div>
    );
};

const StatCard = ({ icon, label, value, color }) => (
    <div className="glass" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '0.75rem',
            background: `${color}15`,
            color: color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            {icon}
        </div>
        <div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>{label}</p>
            <p style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{value}</p>
        </div>
    </div>
);

export default BingoDetail;
