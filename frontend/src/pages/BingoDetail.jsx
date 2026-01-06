import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    BarChart3, Printer, Music, Users, ChevronLeft,
    TrendingUp, TrendingDown, Eye, Trash2, Edit, ExternalLink, LayoutGrid
} from 'lucide-react';
import api from '../api';
import API_URLS from '../config/api';
import PageLayout from '../components/PageLayout';
import SplitLayout from '../components/SplitLayout';
import ConfirmationModal from '../components/ConfirmationModal';
import BingoPreview from '../components/BingoPreview';

const BingoDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleting, setDeleting] = useState(false);

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
                navigate('/dashboard');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id, navigate]);

    const handleDelete = async () => {
        setDeleting(true);
        try {
            await api.delete(`/bingo/${id}/`);
            navigate('/dashboard');
        } catch (err) {
            alert('Failed to delete the bingo event.');
            setDeleting(false);
            setShowDeleteModal(false);
        }
    };

    if (loading) return <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading event details...</div>;
    if (!event || !stats) return null;

    const pageSubtitle = (
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', color: 'var(--text-muted)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{
                    color: 'var(--spotify-green)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    width: '16px',
                    height: '16px'
                }}>
                    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                    </svg>
                </span> <span>{event.playlist_name}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <LayoutGrid size={16} /> <span>{event.theme} Theme</span>
            </div>
        </div>
    );

    const pageActions = (
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button
                onClick={() => navigate(`/print/${id}`)}
                className="btn btn-primary"
                style={{ fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: 'var(--shadow-lg)' }}
            >
                <Printer size={18} /> Print Cards
            </button>
            <button
                onClick={() => navigate(`/bingo/${id}/track`)}
                className="btn btn-secondary glass"
                style={{ fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
                <Music size={18} /> Track Songs
            </button>
            <button
                onClick={() => navigate(`/bingo/${id}/edit`)}
                className="btn btn-secondary"
                style={{ padding: '0.7rem' }}
                title="Edit Event"
            >
                <Edit size={18} />
            </button>
            <button
                onClick={() => setShowDeleteModal(true)}
                className="btn btn-secondary"
                style={{ padding: '0.7rem', color: 'var(--accent)' }}
                title="Delete Event"
            >
                <Trash2 size={18} />
            </button>
        </div>
    );

    return (
        <PageLayout
            title={event.event_title}
            subtitle={pageSubtitle}
            backPath="/dashboard"
            backLabel="Dashboard"
            actions={pageActions}
        >
            <ConfirmationModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
                title="Delete this event?"
                message={`All generated cards and statistics for "${event.event_title}" will be permanently removed.`}
                confirmText="Yes, Delete"
                confirmColor="var(--error)"
                icon={<Trash2 size={44} color="var(--error)" />}
                isLoading={deleting}
            />

            {/* Main Content Grid */}
            <SplitLayout
                desktopColumns="minmax(0, 1fr) clamp(350px, 30vw, 450px)"
                sidebar={
                    <div style={{ 
                        height: '100%', 
                        display: 'flex', 
                        flexDirection: 'column',
                        marginLeft: 'auto',
                        marginRight: '0'
                    }}>
                        <BingoPreview
                            theme={event.theme}
                            primaryColor={event.primary_color}
                            rows={event.rows}
                            columns={event.columns}
                            eventTitle={event.event_title}
                            scale="auto"
                            showFullscreen={false}
                            containerStyle={{ flex: 1 }}
                        />
                    </div>
                }
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {/* Metrics Overview */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '1.25rem' }}>
                        <StatCard icon={<Users size={20} />} label="Participants" value={stats.num_participants} color="var(--primary)" />
                        <StatCard icon={<Music size={20} />} label="Songs Pool" value={stats.total_songs_in_pool} color="var(--secondary)" />
                        <StatCard icon={<BarChart3 size={20} />} label="Grid Size" value={`${event.rows}x${event.columns}`} color="var(--accent)" />
                    </div>

                    {/* Insights Box */}
                    <section className="glass" style={{
                        padding: '2rem',
                        borderRadius: 'var(--radius-lg)',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <h3 style={{ margin: '0 0 1.5rem 0', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.25rem' }}>
                            <TrendingUp size={20} color="var(--primary)" /> Most Appearing
                        </h3>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                            gap: '1rem',
                            alignContent: 'start',
                            marginBottom: '2rem'
                        }}>
                            {stats.most_repeated.slice(0, 6).map(([song, count], idx) => (
                                <div key={idx} style={{
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                    padding: '0.85rem 1rem', background: 'var(--surface-light)',
                                    borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)'
                                }}>
                                    <span style={{ fontWeight: 500, fontSize: '0.9rem', opacity: 0.9, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '190px' }}>{song}</span>
                                    <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--primary)', background: 'rgba(139, 92, 246, 0.1)', padding: '2px 8px', borderRadius: '4px' }}>{count}x</span>
                                </div>
                            ))}
                        </div>

                        <h3 style={{ margin: '0 0 1.5rem 0', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.25rem' }}>
                            <TrendingDown size={20} color="var(--secondary)" /> Least Appearing
                        </h3>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                            gap: '1rem',
                            alignContent: 'start'
                        }}>
                            {stats.least_repeated?.slice(0, 6).map(([song, count], idx) => (
                                <div key={idx} style={{
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                    padding: '0.85rem 1rem', background: 'var(--surface-light)',
                                    borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)'
                                }}>
                                    <span style={{ fontWeight: 500, fontSize: '0.9rem', opacity: 0.9, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '190px' }}>{song}</span>
                                    <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--secondary)', background: 'rgba(34, 197, 94, 0.1)', padding: '2px 8px', borderRadius: '4px' }}>{count}x</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </SplitLayout>
        </PageLayout>
    );
};

const StatCard = ({ icon, label, value, color }) => (
    <div className="glass" style={{ padding: '1.25rem', borderRadius: 'var(--radius-lg)' }}>
        <div style={{ color: color, marginBottom: '0.75rem', opacity: 0.8 }}>{icon}</div>
        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>{label}</div>
        <div style={{ fontSize: '1.5rem', fontWeight: '800' }}>{value}</div>
    </div>
);

export default BingoDetail;