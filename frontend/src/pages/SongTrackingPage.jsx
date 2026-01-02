import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Check, Music, Search, Loader2, ChevronLeft } from 'lucide-react';
import api from '../api';

const SongTrackingPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [sortOrder, setSortOrder] = useState('abc'); // 'abc' or 'played'

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                setLoading(true);
                const response = await api.get(`/bingo/${id}/songs/`);
                setSongs(response.data.songs || []);
                setError(null);
            } catch (error) {
                console.error('Error fetching songs:', error);
                setError('Failed to load songs. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchSongs();
    }, [id]);

    const toggleSong = async (songId) => {
        if (isSaving) return;

        try {
            setIsSaving(true);
            const response = await api.post(`/bingo/${id}/songs/${songId}/toggle/`);
            setSongs(songs.map(song =>
                song.id === songId ? { ...song, played: response.data.played } : song
            ));
        } catch (error) {
            console.error('Error toggling song status:', error);
        } finally {
            setIsSaving(false);
        }
    };

    const filteredSongs = useMemo(() => {
        let result = songs.filter(song =>
            song.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            song.artist.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (sortOrder === 'abc') {
            result.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortOrder === 'played') {
            result.sort((a, b) => {
                if (a.played === b.played) return a.name.localeCompare(b.name);
                return a.played ? -1 : 1;
            });
        }
        return result;
    }, [songs, searchTerm, sortOrder]);

    const stats = useMemo(() => {
        const total = songs.length;
        const played = songs.filter(s => s.played).length;
        const percentage = total > 0 ? Math.round((played / total) * 100) : 0;
        return { total, played, percentage };
    }, [songs]);

    return (
        <div style={{
            height: '100vh',
            backgroundColor: 'var(--background)',
            color: 'var(--text)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
        }}>

            {/* Header Area */}
            <div style={{
                zIndex: 50,
                backgroundColor: 'var(--background)',
                borderBottom: '1px solid var(--glass-border)'
            }}>
                <div style={{
                    maxWidth: '800px',
                    margin: '0 auto',
                    padding: '1rem',
                }}>
                    {/* Navigation & Title */}
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem', gap: '1rem' }}>
                        <button
                            onClick={() => navigate(`/bingo/${id}`)}
                            className="btn btn-secondary glass-hover"
                            style={{
                                padding: '0.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 'var(--radius-md)'
                            }}
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <div style={{ flex: 1 }}>
                            <h1 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800 }}>Track Songs</h1>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                Mark songs as they are played
                            </div>
                        </div>

                        {/* Sorting Toggle */}
                        <div style={{ display: 'flex', background: 'var(--surface-light)', borderRadius: 'var(--radius-md)', padding: '2px', border: '1px solid var(--glass-border)' }}>
                            <button
                                onClick={() => setSortOrder('abc')}
                                style={{
                                    padding: '0.4rem 0.8rem',
                                    borderRadius: 'var(--radius-sm)',
                                    border: 'none',
                                    background: sortOrder === 'abc' ? 'var(--primary)' : 'transparent',
                                    color: sortOrder === 'abc' ? 'white' : 'var(--text-muted)',
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                            >
                                A-Z
                            </button>
                            <button
                                onClick={() => setSortOrder('played')}
                                style={{
                                    padding: '0.4rem 0.8rem',
                                    borderRadius: 'var(--radius-sm)',
                                    border: 'none',
                                    background: sortOrder === 'played' ? 'var(--primary)' : 'transparent',
                                    color: sortOrder === 'played' ? 'white' : 'var(--text-muted)',
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                            >
                                Played
                            </button>
                        </div>
                    </div>

                    {/* Progress Bar & Stats */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Game Progress</span>
                            <span style={{
                                fontSize: '0.9rem',
                                fontWeight: 800,
                                color: 'var(--primary)',
                                background: 'hsla(260, 100%, 65%, 0.1)',
                                padding: '2px 8px',
                                borderRadius: '6px',
                            }}>
                                {stats.played} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>/</span> {stats.total}
                            </span>
                        </div>
                        <div style={{
                            height: '6px',
                            background: 'var(--surface-light)',
                            borderRadius: '3px',
                            overflow: 'hidden'
                        }}>
                            <div style={{
                                width: `${stats.percentage}%`,
                                height: '100%',
                                background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
                                transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                            }} />
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div style={{ position: 'relative' }}>
                        <Search size={18} style={{
                            position: 'absolute',
                            left: '14px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: 'var(--text-muted)',
                            zIndex: 10
                        }} />
                        <input
                            type="text"
                            placeholder="Type to search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.875rem 1rem 0.875rem 3rem',
                                borderRadius: 'var(--radius-lg)',
                                background: 'var(--surface-light)',
                                border: '1px solid var(--glass-border)',
                                color: 'var(--text)',
                                fontSize: '1rem',
                                outline: 'none',
                                transition: 'all 0.2s',
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = 'var(--primary)';
                                e.target.style.boxShadow = '0 0 0 2px hsla(260, 100%, 65%, 0.2)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = 'var(--glass-border)';
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', zIndex: 10 }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '2rem' }}>
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
                            <Loader2 size={32} className="animate-spin" style={{ margin: '0 auto 1rem' }} />
                            <p>Syncing library...</p>
                        </div>
                    ) : filteredSongs.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
                            <Music size={48} style={{ margin: '0 auto 1rem', opacity: 0.2 }} />
                            <p>No songs found matching "{searchTerm}"</p>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {filteredSongs.map((song) => (
                                <div
                                    key={song.id}
                                    onClick={() => toggleSong(song.id)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        padding: '1rem',
                                        borderRadius: 'var(--radius-lg)',
                                        // "Light" card usage for better readability as requested
                                        background: song.played
                                            ? 'var(--success-bg)' // defined in index.css
                                            : 'var(--surface-light)',
                                        border: song.played
                                            ? '1px solid var(--success)'
                                            : '1px solid var(--glass-border)',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        position: 'relative',
                                    }}
                                    className="song-card"
                                >
                                    {/* Icon Box */}
                                    <div style={{
                                        width: '44px',
                                        height: '44px',
                                        borderRadius: '10px',
                                        background: song.played ? 'var(--success)' : 'var(--background)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0,
                                        border: `1px solid ${song.played ? 'transparent' : 'var(--glass-border)'}`
                                    }}>
                                        {song.played ? (
                                            <Check size={24} color="white" strokeWidth={3} />
                                        ) : (
                                            <Music size={20} color="var(--text-muted)" />
                                        )}
                                    </div>

                                    {/* Text Info */}
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{
                                            fontSize: '1rem',
                                            fontWeight: 600,
                                            color: 'var(--text)',
                                            marginBottom: '0.2rem',
                                            lineHeight: 1.2
                                        }}>
                                            {song.name}
                                        </div>
                                        <div style={{
                                            fontSize: '0.85rem',
                                            color: 'var(--text-muted)',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}>
                                            {song.artist}
                                        </div>
                                    </div>

                                    {/* Status Badge */}
                                    {song.played && (
                                        <div style={{
                                            fontSize: '0.7rem',
                                            fontWeight: 700,
                                            color: 'var(--success)',
                                            background: 'var(--background)',
                                            padding: '4px 8px',
                                            borderRadius: 'var(--radius-full)',
                                            border: '1px solid var(--success)',
                                            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                                        }}>
                                            PLAYED
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Styles for hover effects */}
            <style>
                {`
                    .song-card:active {
                        transform: scale(0.98) !important;
                    }
                `}
            </style>
        </div>
    );
};

export default SongTrackingPage;
