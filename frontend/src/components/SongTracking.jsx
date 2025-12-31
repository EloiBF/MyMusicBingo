import React, { useState, useEffect, useMemo } from 'react';
import { X, Check, Music, Search, Loader2, Trophy } from 'lucide-react';
import api from '../api';

const SongTracking = ({ bingoId, onClose }) => {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                setLoading(true);
                const response = await api.get(`/bingo/${bingoId}/songs/`);
                setSongs(response.data.songs || []);
                setError(null);
            } catch (error) {
                console.error('Error fetching songs:', error);
                setError('Failed to load songs. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        if (bingoId) fetchSongs();
    }, [bingoId]);

    const toggleSong = async (songId) => {
        if (isSaving) return;

        try {
            setIsSaving(true);
            const response = await api.post(`/bingo/${bingoId}/songs/${songId}/toggle/`);
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
        return songs.filter(song =>
            song.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            song.artist.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [songs, searchTerm]);

    const stats = useMemo(() => {
        const total = songs.length;
        const played = songs.filter(s => s.played).length;
        const percentage = total > 0 ? Math.round((played / total) * 100) : 0;
        return { total, played, percentage };
    }, [songs]);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem'
        }}>
            <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '24px',
                maxWidth: '600px',
                width: '100%',
                maxHeight: 'min(90vh, 800px)',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                overflow: 'hidden'
            }}>
                {/* Header */}
                <div style={{
                    padding: '1.5rem 2rem',
                    background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                    color: 'white',
                }}>
                    <button
                        onClick={onClose}
                        style={{
                            position: 'absolute',
                            top: '1.25rem',
                            right: '1.25rem',
                            background: 'rgba(255, 255, 255, 0.2)',
                            backdropFilter: 'blur(4px)',
                            border: 'none',
                            borderRadius: '50%',
                            width: '32px',
                            height: '32px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                    >
                        <X size={18} />
                    </button>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                        <div style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            padding: '0.5rem',
                            borderRadius: '12px'
                        }}>
                            <Music size={24} />
                        </div>
                        <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700 }}>Song Tracker</h2>
                    </div>
                    <p style={{ margin: 0, opacity: 0.9, fontSize: '0.9rem' }}>
                        Track which songs have been played during the game.
                    </p>
                </div>

                {/* Progress & Search Section */}
                <div style={{ padding: '1.5rem 2rem 1rem', borderBottom: '1px solid #f3f4f6' }}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                            <span style={{ fontWeight: 600, color: '#4b5563' }}>Game Progress</span>
                            <span style={{ color: '#6366f1', fontWeight: 700 }}>{stats.played} / {stats.total} songs</span>
                        </div>
                        <div style={{
                            height: '8px',
                            backgroundColor: '#e5e7eb',
                            borderRadius: '4px',
                            overflow: 'hidden'
                        }}>
                            <div style={{
                                width: `${stats.percentage}%`,
                                height: '100%',
                                background: 'linear-gradient(90deg, #6366f1, #a855f7)',
                                borderRadius: '4px',
                                transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                            }} />
                        </div>
                    </div>

                    <div style={{ position: 'relative' }}>
                        <Search size={18} style={{
                            position: 'absolute',
                            left: '12px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: '#9ca3af'
                        }} />
                        <input
                            type="text"
                            placeholder="Search by song or artist..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.75rem 1rem 0.75rem 2.5rem',
                                borderRadius: '12px',
                                border: '1px solid #e5e7eb',
                                outline: 'none',
                                fontSize: '0.95rem',
                                transition: 'all 0.2s',
                                backgroundColor: '#f9fafb'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#6366f1'}
                            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                        />
                    </div>
                </div>

                {/* Song List */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '0 1rem' }}>
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
                            <Loader2 size={32} className="animate-spin" style={{ margin: '0 auto 1rem' }} />
                            <p>Loading playlist tracks...</p>
                        </div>
                    ) : error ? (
                        <div style={{ textAlign: 'center', padding: '3rem', color: '#ef4444' }}>
                            <p>{error}</p>
                        </div>
                    ) : filteredSongs.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
                            <p>{searchTerm ? "No songs match your search." : "No songs found for this event."}</p>
                        </div>
                    ) : (
                        <div style={{ padding: '0.5rem 0' }}>
                            {filteredSongs.map((song) => (
                                <div
                                    key={song.id}
                                    onClick={() => toggleSong(song.id)}
                                    style={{
                                        padding: '0.75rem 1rem',
                                        borderRadius: '12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        cursor: isSaving ? 'wait' : 'pointer',
                                        transition: 'all 0.2s',
                                        marginBottom: '4px',
                                        backgroundColor: song.played ? '#f0fdf4' : 'transparent',
                                        border: `1px solid ${song.played ? '#d1fae5' : 'transparent'}`,
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!song.played) e.currentTarget.style.backgroundColor = '#f3f4f6';
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!song.played) e.currentTarget.style.backgroundColor = 'transparent';
                                    }}
                                >
                                    <div style={{
                                        width: '28px',
                                        height: '28px',
                                        borderRadius: '8px',
                                        border: `2px solid ${song.played ? '#10b981' : '#d1d5db'}`,
                                        backgroundColor: song.played ? '#10b981' : 'white',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0,
                                        transition: 'all 0.2s'
                                    }}>
                                        {song.played ? <Check size={18} color="white" /> : null}
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{
                                            fontWeight: 600,
                                            fontSize: '0.95rem',
                                            color: song.played ? '#059669' : '#1f2937',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}>
                                            {song.name}
                                        </div>
                                        <div style={{
                                            fontSize: '0.8rem',
                                            color: '#6b7280',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}>
                                            {song.artist}
                                        </div>
                                    </div>
                                    {song.played && (
                                        <span style={{
                                            fontSize: '0.75rem',
                                            color: '#10b981',
                                            fontWeight: 600,
                                            backgroundColor: 'white',
                                            padding: '2px 8px',
                                            borderRadius: 'full',
                                            border: '1px solid #d1fae5'
                                        }}>
                                            Played
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div style={{
                    padding: '1rem 2rem',
                    borderTop: '1px solid #f3f4f6',
                    backgroundColor: '#f9fafb',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6b7280', fontSize: '0.8rem' }}>
                        {isSaving ? (
                            <>
                                <Loader2 size={14} className="animate-spin" />
                                <span>Saving changes...</span>
                            </>
                        ) : (
                            <>
                                <Check size={14} />
                                <span>All changes saved</span>
                            </>
                        )}
                    </div>
                    {stats.percentage === 100 && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f59e0b', fontSize: '0.85rem', fontWeight: 700 }}>
                            <Trophy size={16} />
                            <span>Bingo Complete!</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SongTracking;
