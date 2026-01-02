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
            backgroundColor: 'var(--background)',
            zIndex: 900,
            display: 'flex',
            flexDirection: 'column',
            paddingTop: '80px', // Account for navbar
        }}>
            {/* Background Gradient Mesh */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: 'radial-gradient(at 0% 0%, rgba(139, 92, 246, 0.15) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(16, 185, 129, 0.1) 0px, transparent 50%)',
                zIndex: -1,
                pointerEvents: 'none'
            }} />

            <div className="container" style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                maxWidth: '800px',
                width: '100%',
                margin: '0 auto',
                padding: '0',
                height: '100%',
                overflow: 'hidden'
            }}>

                {/* Header - Sticky */}
                <div style={{
                    padding: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid var(--glass-border)',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{
                            backgroundColor: 'rgba(139, 92, 246, 0.1)',
                            padding: '0.5rem',
                            borderRadius: '12px',
                            color: 'var(--primary)'
                        }}>
                            <Music size={24} />
                        </div>
                        <div>
                            <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, lineHeight: 1.2 }}>Song Tracker</h2>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                {stats.played} / {stats.total} found
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="btn btn-secondary glass-hover"
                        style={{ padding: '0.5rem' }}
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Search Bar - Sticky */}
                <div style={{
                    padding: '1rem',
                    borderBottom: '1px solid var(--glass-border)',
                    background: 'var(--background)', // Ensure opacity behind sticky
                    zIndex: 10
                }}>
                    <div style={{ position: 'relative' }}>
                        <Search size={18} style={{
                            position: 'absolute',
                            left: '12px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: 'var(--text-muted)'
                        }} />
                        <input
                            type="text"
                            placeholder="Type to search song..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.875rem 1rem 0.875rem 2.5rem',
                                borderRadius: 'var(--radius-lg)',
                                border: '1px solid var(--glass-border)',
                                outline: 'none',
                                fontSize: '1rem',
                                backgroundColor: 'var(--surface-light)',
                                color: 'var(--text)'
                            }}
                        />
                    </div>
                </div>

                {/* Song List - Scrollable */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '0 1rem 6rem' }}>
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                            <Loader2 size={32} className="animate-spin" style={{ margin: '0 auto 1rem' }} />
                            <p>Loading tracks...</p>
                        </div>
                    ) : filteredSongs.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                            <p>{searchTerm ? "No songs match." : "No songs found."}</p>
                        </div>
                    ) : (
                        <div style={{ padding: '1rem 0' }}>
                            {filteredSongs.map((song) => (
                                <div
                                    key={song.id}
                                    onClick={() => toggleSong(song.id)}
                                    style={{
                                        padding: '1rem',
                                        borderRadius: 'var(--radius-md)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        cursor: 'pointer',
                                        marginBottom: '0.75rem',
                                        backgroundColor: song.played ? 'rgba(16, 185, 129, 0.1)' : 'var(--surface-light)',
                                        border: `1px solid ${song.played ? 'rgba(16, 185, 129, 0.3)' : 'var(--glass-border)'}`,
                                        transition: 'all 0.2s',
                                        minHeight: '44px' // Ensure good touch target
                                    }}
                                >
                                    <div style={{
                                        width: '24px',
                                        height: '24px',
                                        borderRadius: '6px',
                                        border: `2px solid ${song.played ? 'var(--success)' : 'var(--gray-600)'}`,
                                        backgroundColor: song.played ? 'var(--success)' : 'transparent',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0
                                    }}>
                                        {song.played && <Check size={16} color="white" />}
                                    </div>

                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{
                                            fontWeight: 600,
                                            fontSize: '1rem',
                                            color: song.played ? 'var(--success)' : 'var(--text)',
                                            marginBottom: '0.1rem'
                                        }}>
                                            {song.name}
                                        </div>
                                        <div style={{
                                            fontSize: '0.85rem',
                                            color: 'var(--text-muted)',
                                        }}>
                                            {song.artist}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer Progress - Sticky Bottom */}
                <div style={{
                    position: 'absolute',
                    bottom: 0, left: 0, right: 0,
                    padding: '1rem',
                    background: 'var(--surface)',
                    borderTop: '1px solid var(--glass-border)',
                    boxShadow: '0 -4px 12px rgba(0,0,0,0.1)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                            {isSaving ? 'Saving...' : 'Saved'}
                        </div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--primary)' }}>
                            {stats.percentage}% Complete
                        </div>
                    </div>
                    <div style={{
                        height: '6px',
                        backgroundColor: 'var(--surface-light)',
                        borderRadius: '3px',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            width: `${stats.percentage}%`,
                            height: '100%',
                            background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
                            borderRadius: '3px',
                            transition: 'width 0.3s ease'
                        }} />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SongTracking;
