import React, { useState, useEffect } from 'react';
import {
    Play, Music, LayoutGrid, Layers, Search, Sparkles, Wand2, Eye, ListMusic, X, AlertCircle, Link2Off
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';

const CreateBingo = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = !!id;
    const [config, setConfig] = useState({
        eventTitle: 'Bingo Musical',
        playlistId: '',
        numCards: 70,
        rows: 3,
        columns: 3,
        theme: 'classic',
        primary_color: '#3f51b5'
    });

    const [loading, setLoading] = useState(false);
    const [showPlaylistModal, setShowPlaylistModal] = useState(false);
    const [playlists, setPlaylists] = useState([]);
    const [paramLoading, setParamLoading] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get('/auth/me/');
                setUser(response.data);
            } catch (err) {
                console.error('Error fetching user:', err);
            }
        };
        fetchUser();
    }, []);

    useEffect(() => {
        if (isEditMode) {
            const fetchEventData = async () => {
                try {
                    const response = await api.get(`/bingo/${id}/`);
                    const event = response.data;
                    setConfig({
                        eventTitle: event.event_title,
                        playlistId: event.playlist_id,
                        numCards: event.num_cards,
                        rows: event.rows,
                        columns: event.columns,
                        theme: event.theme,
                        primary_color: event.primary_color
                    });
                } catch (err) {
                    console.error('Error fetching event data:', err);
                    alert('Failed to load event data.');
                    navigate('/dashboard');
                }
            };
            fetchEventData();
        }
    }, [id, isEditMode, navigate]);

    const gridOptions = [
        { label: '3x3 (9 songs)', rows: 3, cols: 3 },
        { label: '4x3 (12 songs)', rows: 4, cols: 3 },
        { label: '4x4 (16 songs)', rows: 4, cols: 4 },
        { label: '5x5 (25 songs)', rows: 5, cols: 5 },
    ];

    const themes = [
        { id: 'classic', label: 'Classic Elegance', icon: '🎼', desc: 'Serif fonts & professional borders' },
        { id: 'modern', label: 'Modern Bold', icon: '⚡', desc: 'Sans-serif & clean brutalist shadows' },
        { id: 'retro', label: 'Retro Wave', icon: '📻', desc: '80s & 90s vibrant nostalgia' },
        { id: 'wedding', label: 'Wedding Gala', icon: '💍', desc: 'Elegant romance & high-end typography' },
        { id: 'birthday', label: 'Birthday Bash', icon: '🎂', desc: 'Colorful & festive celebration' },
        { id: 'graduation', label: 'Academic Excellence', icon: '🎓', desc: 'Graduation & achievement design' },
        { id: 'corporate', label: 'Professional Executive', icon: '🏢', desc: 'Corporate & networking design' },
        { id: 'dance', label: 'Electric Dance', icon: '💃', desc: 'High energy & vibrant pulses' },
        { id: 'christmas', label: 'Christmas Spirit', icon: '🎄', desc: 'Festive joy & winter wonderland' },
    ];

    const fetchUserPlaylists = async () => {
        setParamLoading(true);
        setShowPlaylistModal(true);
        try {
            const response = await api.get('/bingo/user_playlists/');
            setPlaylists(response.data);
        } catch (err) {
            console.error(err);
            alert('Failed to load playlists.');
            setShowPlaylistModal(false);
        } finally {
            setParamLoading(false);
        }
    };

    const selectPlaylist = (id) => {
        setConfig({ ...config, playlistId: id });
        setShowPlaylistModal(false);
    };

    const handlePlaylistChange = (value) => {
        let id = value;
        if (value.includes('spotify.com/playlist/')) {
            const parts = value.split('playlist/');
            if (parts.length > 1) {
                id = parts[1].split('?')[0];
            }
        }
        setConfig({ ...config, playlistId: id });
    };

    const handleGenerate = async (e) => {
        e.preventDefault();
        if (!config.playlistId) {
            alert('Please enter a playlist ID or link.');
            return;
        }

        setLoading(true);
        try {
            let response;
            if (isEditMode) {
                response = await api.put(`/bingo/${id}/`, {
                    event_title: config.eventTitle,
                    playlist_id: config.playlistId,
                    num_cards: config.numCards,
                    rows: config.rows,
                    columns: config.columns,
                    theme: config.theme,
                    primary_color: config.primary_color
                });
            } else {
                response = await api.post('/bingo/generate_cards/', {
                    event_title: config.eventTitle,
                    playlist_id: config.playlistId,
                    num_cards: config.numCards,
                    rows: config.rows,
                    columns: config.columns,
                    theme: config.theme,
                    primary_color: config.primary_color
                });
            }

            const eventId = isEditMode ? id : response.data.event_id;
            navigate(`/bingo/${eventId}`);
        } catch (err) {
            console.error(err);
            alert(`Error ${isEditMode ? 'updating' : 'generating'} bingo cards: ` + (err.response?.data?.error || err.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <header style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Wand2 size={32} color="var(--primary)" /> {isEditMode ? 'Edit Bingo Event' : 'Create Magic Bingo'}
                </h1>
                <p style={{ color: 'var(--text-muted)' }}>{isEditMode ? 'Update My Bingo event settings.' : 'Configure your event and generate unique cards in seconds.'}</p>
            </header>

            <div className="grid-layout" style={{ gridTemplateColumns: '1fr 400px' }}>
                {/* Form Column */}
                <section className="glass" style={{ padding: '3rem' }}>
                    <form onSubmit={handleGenerate}>
                        <div className="input-group" style={{ marginBottom: '2rem' }}>
                            <label>Event Name</label>
                            <input
                                type="text"
                                placeholder="e.g. Disco Night 2025"
                                value={config.eventTitle}
                                onChange={(e) => setConfig({ ...config, eventTitle: e.target.value })}
                                required
                            />
                        </div>

                        <div className="input-group" style={{ marginBottom: '2rem' }}>
                            <label>Spotify Playlist Link</label>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <div style={{ position: 'relative', flex: 1 }}>
                                    <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                    <input
                                        type="text"
                                        placeholder="Paste Spotify link or ID..."
                                        value={config.playlistId}
                                        onChange={(e) => handlePlaylistChange(e.target.value)}
                                        style={{ paddingLeft: '3rem', width: '100%' }}
                                        required
                                    />
                                </div>
                                {user?.is_spotify_linked ? (
                                    <button
                                        type="button"
                                        onClick={fetchUserPlaylists}
                                        className="btn btn-secondary"
                                        style={{ padding: '0 1rem' }}
                                        title="Select from my playlists"
                                    >
                                        <ListMusic size={20} />
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => navigate('/settings')}
                                        className="btn btn-secondary"
                                        style={{ padding: '0 1rem', opacity: 0.7 }}
                                        title="Link Spotify in Settings to see your playlists"
                                    >
                                        <Link2Off size={20} />
                                    </button>
                                )}
                            </div>
                            {!user?.is_spotify_linked && (
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                                    <AlertCircle size={10} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                                    Link your Spotify account in <button onClick={() => navigate('/settings')} style={{ background: 'none', border: 'none', color: 'var(--primary)', padding: 0, textDecoration: 'underline', cursor: 'pointer', fontSize: 'inherit' }}>settings</button> to browse your playlists.
                                </p>
                            )}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2.5rem' }}>
                            <div className="input-group">
                                <label><Layers size={14} /> Participants</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="500"
                                    value={config.numCards}
                                    onChange={(e) => setConfig({ ...config, numCards: parseInt(e.target.value) })}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label><LayoutGrid size={14} /> Layout</label>
                                <select
                                    value={`${config.rows}x${config.columns}`}
                                    onChange={(e) => {
                                        const [r, c] = e.target.value.split('x').map(Number);
                                        setConfig({ ...config, rows: r, columns: c });
                                    }}
                                >
                                    {gridOptions.map(opt => (
                                        <option key={opt.label} value={`${opt.rows}x${opt.cols}`}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div style={{ marginBottom: '3rem' }}>
                            <label style={{ display: 'block', marginBottom: '1rem', fontWeight: 'bold' }}>Theme Selection</label>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                                {themes.map(t => (
                                    <div
                                        key={t.id}
                                        onClick={() => setConfig({ ...config, theme: t.id })}
                                        style={{
                                            padding: '1rem',
                                            borderRadius: '0.75rem',
                                            border: `2px solid ${config.theme === t.id ? 'var(--primary)' : 'var(--glass-border)'}`,
                                            background: config.theme === t.id ? 'rgba(139, 92, 246, 0.05)' : 'transparent',
                                            cursor: 'pointer',
                                            textAlign: 'center'
                                        }}
                                    >
                                        <div style={{ fontSize: '1.5rem', marginBottom: '0.2rem' }}>{t.icon}</div>
                                        <div style={{ fontWeight: 'bold', fontSize: '0.8rem' }}>{t.label}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="input-group">
                                <label>Main Color</label>
                                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                                    {[
                                        '#3f51b5', // Blue
                                        '#f44336', // Red
                                        '#4caf50', // Green
                                        '#ff9800', // Orange
                                        '#9c27b0', // Purple
                                        '#009688', // Teal
                                    ].map(color => (
                                        <button
                                            key={color}
                                            type="button"
                                            onClick={() => setConfig({ ...config, primary_color: color })}
                                            style={{
                                                width: '2.5rem',
                                                height: '2.5rem',
                                                borderRadius: '50%',
                                                background: color,
                                                border: config.primary_color === color ? '3px solid var(--text-color)' : '1px solid rgba(0,0,0,0.1)',
                                                cursor: 'pointer',
                                                transition: 'transform 0.2s',
                                                transform: config.primary_color === color ? 'scale(1.1)' : 'scale(1)'
                                            }}
                                            aria-label={`Select color ${color}`}
                                        />
                                    ))}
                                    <div style={{ position: 'relative', width: '2.5rem', height: '2.5rem' }}>
                                        <input
                                            type="color"
                                            value={config.primary_color}
                                            onChange={(e) => setConfig({ ...config, primary_color: e.target.value })}
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                opacity: 0,
                                                cursor: 'pointer'
                                            }}
                                        />
                                        <div style={{
                                            width: '100%',
                                            height: '100%',
                                            borderRadius: '50%',
                                            background: 'conic-gradient(from 0deg, red, yellow, lime, aqua, blue, magenta, red)',
                                            border: '1px solid rgba(0,0,0,0.1)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <div style={{
                                                width: '1.5rem',
                                                height: '1.5rem',
                                                borderRadius: '50%',
                                                background: config.primary_color,
                                                border: '2px solid white',
                                                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                            }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ width: '100%', height: '3.5rem' }}
                            disabled={loading}
                        >
                            {loading ? 'Processing...' : <><Play size={18} fill="white" /> {isEditMode ? 'Update Bingo Set' : 'Generate Bingo Set'}</>}
                        </button>
                    </form>
                </section>

                {/* Preview Column */}
                <aside style={{ position: 'sticky', top: '2rem', height: 'fit-content' }}>
                    <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Eye size={20} color="var(--primary)" /> Design Preview
                    </h3>
                    <div className="glass" style={{
                        padding: '8px',
                        aspectRatio: '1 / 1.414',
                        background: 'white',
                        boxShadow: '0 15px 35px rgba(0,0,0,0.15)',
                        border: '1px solid var(--glass-border)',
                        overflow: 'hidden'
                    }}>
                        <iframe
                            src={`http://localhost:8000/api/bingo/live_preview/?theme=${config.theme}&primary_color=${encodeURIComponent(config.primary_color)}&rows=${config.rows}&columns=${config.columns}&preview=1`}
                            style={{
                                width: '200%',
                                height: '200%',
                                border: 'none',
                                transform: 'scale(0.5)',
                                transformOrigin: 'top left',
                                overflow: 'hidden'
                            }}
                            scrolling="no"
                            title="Design Preview"
                        />
                    </div>
                    <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                        Mock preview of a single card
                    </p>
                </aside>
            </div>

            {showPlaylistModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.7)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <div className="glass animate-fade-in" style={{ width: '90%', maxWidth: '600px', maxHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <ListMusic size={20} color="var(--primary)" /> Select Playlist
                            </h3>
                            <button onClick={() => setShowPlaylistModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                                <X size={24} />
                            </button>
                        </div>
                        <div style={{ padding: '1.5rem', overflowY: 'auto' }}>
                            {paramLoading ? (
                                <p style={{ textAlign: 'center' }}>Loading your playlists...</p>
                            ) : (
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '1rem' }}>
                                    {playlists.map(p => (
                                        <div
                                            key={p.id}
                                            onClick={() => selectPlaylist(p.id)}
                                            style={{ cursor: 'pointer', borderRadius: '0.5rem', overflow: 'hidden', background: 'var(--card-bg)', border: '1px solid var(--glass-border)', transition: 'transform 0.2s' }}
                                            className="hover-scale"
                                        >
                                            <div style={{ aspectRatio: '1/1', background: '#333' }}>
                                                {p.image ? (
                                                    <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                ) : (
                                                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
                                                        <Music size={32} />
                                                    </div>
                                                )}
                                            </div>
                                            <div style={{ padding: '0.5rem' }}>
                                                <div style={{ fontWeight: 'bold', fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{p.tracks_count} tracks</div>
                                            </div>
                                        </div>
                                    ))}
                                    {playlists.length === 0 && (
                                        <p style={{ gridColumn: '1/-1', textAlign: 'center', color: 'var(--text-muted)' }}>No playlists found.</p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CreateBingo;

const hoverScaleStyle = document.createElement('style');
hoverScaleStyle.innerHTML = `
.hover-scale:hover {
    transform: scale(1.05);
    border-color: var(--primary) !important;
}
`;
document.head.appendChild(hoverScaleStyle);
