import React, { useState, useEffect, useRef } from 'react';
import {
    Music, Search, PlusCircle, X, Wand2, ListMusic, Eye, Settings as SettingsIcon,
    User, Mail, Lock, UserPlus, LogIn, Home, ChevronLeft, Link2Off, AlertCircle, Layers, LayoutGrid, Play, Crown, Palette, Check, ArrowRight, ArrowLeft
} from 'lucide-react';

import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';
import API_URLS from '../config/api';
import PageLayout from '../components/PageLayout';
import BingoCardPreview from '../components/BingoCardPreview';
import SplitLayout from '../components/SplitLayout';
import { getAvailableThemes } from '../utils/themeLoader';

const CreateBingo = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = !!id;

    const [currentStep, setCurrentStep] = useState(isEditMode ? 3 : 1);
    const totalSteps = 3;

    const [config, setConfig] = useState({
        eventTitle: '',
        playlistId: '',
        numCards: 20,
        rows: 3,
        columns: 3,
        theme: 'birthday_classic', // Fixed: was birthday_basic
        orientation: 'portrait',
        primary_color: 'default' // Default: use theme's predefined color
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
                        orientation: event.orientation || 'portrait',
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

    const colorMap = {
        'var(--primary)': '#8b5cf6',
        'var(--bingo-cyan)': '#06b6d4',
        'var(--bingo-emerald)': '#10b981',
        'var(--bingo-amber)': '#f59e0b',
        'var(--bingo-pink)': '#ec4899',
        'var(--bingo-indigo)': '#6366f1'
    };

    // Theme default colors
    const themeDefaultColors = {
        'birthday_classic': '#ff6b9d',
        'birthday_premium': '#d946ef',
        'wedding_classic': '#849b87',
        'wedding_premium': '#C5A059',
        'party_classic': '#ec4899',
        'party_premium': '#8b5cf6',
        'corporate_classic': '#475569',
        'corporate_premium': '#0ea5e9'
    };

    const getColorValue = (color, theme = null) => {
        if (color === 'default' && theme) {
            return themeDefaultColors[theme] || '#8b5cf6';
        }
        return colorMap[color] || color;
    };

    // Load available themes dynamically
    const { categorizedThemes, allThemes } = getAvailableThemes();

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
            if (parts.length > 1) id = parts[1].split('?')[0];
        }
        setConfig({ ...config, playlistId: id });
    };

    const handleGenerate = async () => {
        if (!config.playlistId) {
            alert('Please enter a playlist ID or link.');
            return;
        }
        setLoading(true);
        try {
            let response;
            const payload = {
                event_title: config.eventTitle,
                playlist_id: config.playlistId,
                num_cards: config.numCards,
                rows: config.rows,
                columns: config.columns,
                theme: config.theme,
                orientation: config.orientation,
                primary_color: getColorValue(config.primary_color, config.theme)
            };
            if (isEditMode) {
                response = await api.put(`/bingo/${id}/`, payload);
            } else {
                response = await api.post('/bingo/generate_cards/', payload);
            }
            const eventId = isEditMode ? id : response.data.event_id;
            navigate(`/bingo/${eventId}`);
        } catch (err) {
            console.error(err);
            alert(`Error: ` + (err.response?.data?.error || err.message));
        } finally {
            setLoading(false);
        }
    };

    const nextStep = () => {
        if (currentStep === 1 && (!config.eventTitle || !config.playlistId)) {
            alert('Please provide an event title and a Spotify playlist.');
            return;
        }
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
            const scrollBox = document.querySelector('.wizard-form-inner-scroll');
            if (scrollBox) scrollBox.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            handleGenerate();
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
            const scrollBox = document.querySelector('.wizard-form-inner-scroll');
            if (scrollBox) scrollBox.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const steps = [
        { id: 1, name: 'Playlist', icon: <Search size={14} /> },
        { id: 2, name: 'Settings', icon: <Layers size={14} /> },
        { id: 3, name: 'Style', icon: <Palette size={14} /> }
    ];

    return (
        <PageLayout
            title={isEditMode ? 'Edit Bingo' : 'Create Bingo'}
            subtitle={isEditMode ? 'Update event settings.' : 'Generate unique cards from Spotify.'}
            icon={<Wand2 size={24} />}
            hideScrollingBackground={true}
        >
            <SplitLayout
                desktopColumns="minmax(0, 1fr) clamp(350px, 30vw, 450px)"
                sidebar={
                    <div style={{
                        background: 'white',
                        borderRadius: 'var(--radius-xl)',
                        boxShadow: 'var(--shadow-lg)',
                        overflow: 'hidden',
                        width: '100%',
                        maxWidth: '450px',
                        margin: '0 auto',
                        height: config.orientation === 'landscape' ? 'calc(450px * 297 / 210)' : 'auto',
                        aspectRatio: config.orientation === 'portrait' ? '210/297' : '297/210'
                    }}>
                        <BingoCardPreview
                            event={{
                                theme: config.theme,
                                primary_color: config.primary_color === 'default' ? null : getColorValue(config.primary_color),
                                rows: config.rows,
                                columns: config.columns,
                                orientation: config.orientation,
                                event_title: config.eventTitle || 'Disco Night'
                            }}
                            cardData={[]}
                            isMini={false}
                            containerStyle={{
                                width: '100%',
                                height: '100%',
                                borderRadius: 'var(--radius-xl)'
                            }}
                        />
                    </div>
                }
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', height: '100%' }}>
                    {/* Form Content */}
                    <div className="glass" style={{
                        borderRadius: 'var(--radius-xl)',
                        background: 'var(--surface-blur)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid var(--glass-border)',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
                        overflow: 'hidden',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        {/* Stepper */}
                        <div style={{ padding: '1.5rem 1.5rem 0' }}>
                            <div className="stepper-box-mini">
                                <div className="stepper-track-mini">
                                    {steps.map((s, idx) => (
                                        <React.Fragment key={s.id}>
                                            <div
                                                onClick={() => currentStep > s.id && setCurrentStep(s.id)}
                                                className={`step-item-mini ${currentStep === s.id ? 'active' : ''} ${currentStep > s.id ? 'completed' : ''}`}
                                            >
                                                <div className="step-circle-mini">
                                                    {currentStep > s.id ? <Check size={12} /> : s.icon}
                                                </div>
                                                <span className="step-label-mini">{s.name}</span>
                                            </div>
                                            {idx < steps.length - 1 && (
                                                <div className={`step-line-mini ${currentStep > s.id ? 'filled' : ''}`} />
                                            )}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Step Content */}
                        <div style={{ padding: '0 1.5rem 1.5rem', flexGrow: 1, overflowY: 'auto' }}>
                            <div className="step-content-box-mini">
                                {currentStep === 1 && (
                                    <div className="animate-fade-in section-compact-mini">
                                        <div className="input-group-mini">
                                            <label>Choose a Name to appear in your bingo cards</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. Disco Night"
                                                value={config.eventTitle}
                                                onChange={(e) => setConfig({ ...config, eventTitle: e.target.value })}
                                            />
                                        </div>
                                        <div className="input-group-mini">
                                            <label>Paste the Spotify Playlist link</label>
                                            <div style={{ display: 'flex', gap: '0.4rem' }}>
                                                <div style={{ position: 'relative', flex: 1 }}>
                                                    <Search size={14} className="input-icon-left-mini" />
                                                    <input
                                                        type="text"
                                                        placeholder="Paste link..."
                                                        value={config.playlistId}
                                                        onChange={(e) => handlePlaylistChange(e.target.value)}
                                                        style={{ paddingLeft: '2.5rem' }}
                                                    />
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={user?.is_spotify_linked ? fetchUserPlaylists : () => navigate('/settings')}
                                                    className="btn btn-secondary glass-hover btn-square-mini"
                                                >
                                                    {user?.is_spotify_linked ? <ListMusic size={18} /> : <Link2Off size={18} />}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {currentStep === 2 && (
                                    <div className="animate-fade-in section-compact-mini">
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                            <div className="input-group-mini">
                                                <label>Number of bingo cards to generate</label>
                                                <input
                                                    type="number"
                                                    value={config.numCards}
                                                    onChange={(e) => setConfig({ ...config, numCards: parseInt(e.target.value) })}
                                                />
                                            </div>
                                            <div className="input-group-mini">
                                                <label>Grid layout</label>
                                                <select
                                                    value={`${config.rows}x${config.columns}`}
                                                    onChange={(e) => {
                                                        const [r, c] = e.target.value.split('x').map(Number);
                                                        setConfig({ ...config, rows: r, columns: c });
                                                    }}
                                                >
                                                    {gridOptions.map(opt => <option key={opt.label} value={`${opt.rows}x${opt.cols}`}>{opt.label.split(' ')[0]}</option>)}
                                                </select>
                                            </div>
                                            <div className="input-group-mini" style={{ gridColumn: '1 / -1' }}>
                                                <label>Choose card orientation</label>
                                                <div className="toggle-group-mini glass">
                                                    {['portrait', 'landscape'].map(o => (
                                                        <button
                                                            key={o}
                                                            type="button"
                                                            onClick={() => setConfig({ ...config, orientation: o })}
                                                            className={`toggle-btn-mini ${config.orientation === o ? 'active' : ''}`}
                                                        >
                                                            {o}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {currentStep === 3 && (
                                    <div className="animate-fade-in section-compact-mini">
                                        <div style={{ marginBottom: '1.25rem' }}>
                                            <label className="label-bold-mini">Choose your color</label>
                                            <div className="color-grid-mini">
                                                {/* Default Option */}
                                                <button
                                                    type="button"
                                                    onClick={() => setConfig({ ...config, primary_color: 'default' })}
                                                    style={{
                                                        background: config.primary_color === 'default'
                                                            ? `linear-gradient(135deg, ${themeDefaultColors[config.theme] || '#8b5cf6'} 0%, ${themeDefaultColors[config.theme] || '#8b5cf6'} 100%)`
                                                            : 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)',
                                                        position: 'relative',
                                                        overflow: 'hidden',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center'
                                                    }}
                                                    className={`dot-mini ${config.primary_color === 'default' ? 'selected' : ''}`}
                                                    title="Default (Theme Color)"
                                                >
                                                    {config.primary_color === 'default' ? (
                                                        <span style={{ fontSize: '12px', color: 'white', fontWeight: 'bold' }}>✓</span>
                                                    ) : (
                                                        <span style={{ fontSize: '14px', color: '#64748b', fontWeight: 'bold' }}>∅</span>
                                                    )}
                                                </button>
                                                {['var(--primary)', 'var(--bingo-cyan)', 'var(--bingo-emerald)', 'var(--bingo-amber)', 'var(--bingo-pink)', 'var(--bingo-indigo)'].map(color => (
                                                    <button
                                                        key={color}
                                                        type="button"
                                                        onClick={() => setConfig({ ...config, primary_color: color })}
                                                        style={{ background: color }}
                                                        className={`dot-mini ${config.primary_color === color ? 'selected' : ''}`}
                                                    />
                                                ))}
                                                <div className="custom-wrapper-mini">
                                                    <input 
                                                        type="color" 
                                                        value={config.primary_color === 'default' || config.primary_color.startsWith('var(') ? '#8b5cf6' : config.primary_color} 
                                                        onChange={(e) => setConfig({ ...config, primary_color: e.target.value })} 
                                                    />
                                                    <div className="wheel-mini" style={{ background: config.primary_color === 'default' ? themeDefaultColors[config.theme] : getColorValue(config.primary_color) }} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="theme-compact-gallery">
                                            <label className="label-bold-mini">Select a theme</label>
                                            <div className="scroll-box-mini">
                                                <div className="grid-mini">
                                                    {allThemes.map(t => {
                                                        const isSelected = config.theme === t.id;
                                                        return (
                                                            <div key={t.id} onClick={() => setConfig({ ...config, theme: t.id })} className={`theme-box-mini ${isSelected ? 'selected' : ''}`}>
                                                                <div className="box-preview">
                                                                    <div className="preview-mini-internal">
                                                                        <BingoCardPreview
                                                                            event={{
                                                                                theme: t.id,
                                                                                primary_color: null, // Always show theme default in mini previews
                                                                                rows: 3,
                                                                                columns: 3,
                                                                                orientation: 'portrait',
                                                                                event_title: 'Bingo'
                                                                            }}
                                                                            cardData={[]}
                                                                            isMini={true}
                                                                            containerStyle={{
                                                                                height: '100px',
                                                                                borderRadius: 'var(--radius-md)',
                                                                                margin: '0 auto'
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="box-info">
                                                                    <span className="name-m">{t.label}</span>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Navigation Actions */}
                        <div style={{
                            borderTop: '1px solid var(--glass-border)',
                            padding: '1rem 1.5rem',
                            background: 'hsla(0,0%,100%,0.02)',
                            display: 'flex',
                            gap: '0.75rem',
                            flexShrink: 0
                        }}>
                            {currentStep > 1 && (
                                <button onClick={prevStep} className="btn btn-secondary btn-nav-mini">
                                    <ArrowLeft size={16} /> Back
                                </button>
                            )}
                            <button onClick={nextStep} className="btn btn-primary btn-nav-mini primary-nav" disabled={loading}>
                                {loading ? '...' : (currentStep === totalSteps ? 'Generate' : 'Next Step')}
                                <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </SplitLayout>

            {/* Playlist Modal */}
            {showPlaylistModal && (
                <div className="modal-ov">
                    <div className="modal-c glass animate-fade-in">
                        <div className="modal-h">
                            <h3><ListMusic size={20} /> Playlists</h3>
                            <button onClick={() => setShowPlaylistModal(false)} className="close-b"><X size={20} /></button>
                        </div>
                        <div className="modal-b">
                            {paramLoading ? <div className="load-s"><div className="spin-m" /></div> : (
                                <div className="p-grid">
                                    {playlists.map(p => (
                                        <div key={p.id} onClick={() => selectPlaylist(p.id)} className="p-card glass-hover">
                                            <div className="p-img">{p.image ? <img src={p.image} alt="" /> : <Music size={24} />}</div>
                                            <div className="p-t">{p.name}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </PageLayout>
    );
};

export default CreateBingo;

const styleSheet = document.createElement('style');
styleSheet.innerHTML = `
    .wizard-layout-container { width: 100%; max-width: 1400px; margin: 0 auto; }
    .wizard-responsive-wrapper { display: flex; flex-direction: column; width: 100%; gap: 1.5rem; }

    @media (min-width: 1024px) {
        .wizard-layout-container { height: calc(100vh - 20rem); min-height: 480px; }
        .wizard-responsive-wrapper { flex-direction: row; height: 100%; gap: 1.5rem; }
        
        .wizard-form-col { 
            width: 46%; 
            height: 100%; 
            overflow: hidden; 
            display: flex; 
            flex-direction: column; 
            border-radius: 1.5rem;
            background: var(--surface-blur);
            backdrop-filter: blur(20px);
            border: 1px solid var(--glass-border);
            box-shadow: 0 20px 50px rgba(0,0,0,0.3);
        }
        
        .wizard-preview-col-mini { 
            width: 54%; 
            height: 100%; 
            display: flex; 
            align-items: center;
            justify-content: center;
        }
        .wizard-form-inner-scroll { flex: 1; overflow-y: auto; padding: 1.5rem; }
        
        .preview-wrap-mini { 
            width: 90%; 
            height: 90%; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            background: radial-gradient(circle at center, hsla(260, 100%, 65%, 0.05) 0%, transparent 80%); 
            border-radius: 1.5rem; 
            position: relative; 
        }
        
        .wizard-footer-mini { 
            border-top: 1px solid var(--glass-border); 
            padding: 1rem 1.5rem; 
            background: hsla(0,0%,100%,0.02); 
            display: flex;
            gap: 0.75rem;
        }
    }

    /* Typography & Core Form Elements */
    .stepper-box-mini { margin-bottom: 1.5rem; }
    .stepper-track-mini { display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; }
    .step-item-mini { display: flex; flex-direction: column; align-items: center; gap: 0.3rem; opacity: 0.3; transition: 0.3s; cursor: pointer; }
    .step-item-mini.active { opacity: 1; }
    .step-item-mini.completed { opacity: 0.8; }
    
    .step-circle-mini { width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 1px solid var(--glass-border); background: var(--surface-light); font-size: 0.75rem; transition: 0.3s; }
    .active .step-circle-mini { background: var(--primary); color: white; border-color: transparent; }
    .completed .step-circle-mini { background: var(--bingo-emerald); color: white; border-color: transparent; }
    
    .step-label-mini { font-size: 0.6rem; font-weight: 900; text-transform: uppercase; color: var(--text-muted); }
    .active .step-label-mini { color: var(--primary); }
    .step-line-mini { flex: 1; height: 2px; background: var(--glass-border); margin-bottom: 1rem; }
    .step-line-mini.filled { background: var(--bingo-emerald); }

    .section-compact-mini { padding: 0.5rem 0; }
    .section-title-mini { font-size: 1.1rem; font-weight: 900; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.75rem; color: var(--text); }
    .title-icon-mini { width: 34px; height: 34px; border-radius: 10px; display: flex; align-items: center; justify-content: center; }
    .icon-blue { background: hsla(260, 100%, 65%, 0.1); color: var(--primary); }
    .icon-cyan { background: hsla(190, 100%, 50%, 0.1); color: var(--secondary); }
    .icon-pink { background: hsla(320, 100%, 65%, 0.1); color: var(--accent); }

    .input-group-mini { margin-bottom: 1.25rem; }
    .input-group-mini label { display: block; font-size: 0.8rem; font-weight: 800; margin-bottom: 0.5rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; }
    .input-group-mini input, .input-group-mini select { height: 3rem; font-size: 1rem; border-radius: 1rem; padding: 0 1.25rem; background: var(--surface-light); border: 1px solid var(--glass-border); width: 100%; color: var(--text); transition: 0.3s; }
    .input-group-mini input:focus { border-color: var(--primary); background: var(--surface-lighter); }
    .input-icon-left-mini { position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: var(--text-muted); opacity: 0.6; }
    
    .btn-square-mini { width: 3rem; height: 3rem; display: flex; align-items: center; justify-content: center; border-radius: 1rem; }

    .toggle-group-mini { display: flex; padding: 0.4rem; border-radius: 1rem; gap: 0.4rem; background: var(--surface-light); border: 1px solid var(--glass-border); }
    .toggle-btn-mini { flex: 1; height: 2.75rem; border-radius: 0.75rem; border: none; background: transparent; color: var(--text-muted); font-weight: 900; font-size: 0.8rem; text-transform: uppercase; cursor: pointer; transition: 0.3s; }
    .toggle-btn-mini.active { background: var(--primary); color: white; }

    .label-bold-mini { display: block; font-size: 0.85rem; font-weight: 900; margin-bottom: 1rem; color: var(--text); text-transform: uppercase; }
    .color-grid-mini { display: flex; gap: 0.6rem; flex-wrap: wrap; align-items: center; }
    .dot-mini { width: 1.8rem; height: 1.8rem; border-radius: 50%; border: 3px solid transparent; cursor: pointer; transition: 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
    .dot-mini.selected { transform: scale(1.15); border-color: white; }
    
    .custom-wrapper-mini { position: relative; width: 1.8rem; height: 1.8rem; }
    .custom-wrapper-mini input { position: absolute; inset: 0; opacity: 0; cursor: pointer; z-index: 2; }
    .wheel-mini { width: 100%; height: 100%; border-radius: 50%; border: 2px solid var(--glass-border); background: conic-gradient(from 0deg, red, yellow, lime, aqua, blue, magenta, red); }

    .theme-compact-gallery { margin-top: 1.5rem; }
    .scroll-box-mini { height: 260px; overflow-y: auto; padding: 1rem; background: var(--surface-light); border-radius: 1.25rem; border: 1px solid var(--glass-border); }
    .grid-mini { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 1rem; }
    
    .theme-box-mini { border-radius: 1rem; border: 2px solid transparent; background: var(--glass-bg); transition: 0.3s; position: relative; overflow: hidden; cursor: pointer; text-align: center; }
    .theme-box-mini.selected { border-color: var(--primary); background: var(--primary); color: white; }
    
    .box-preview { 
        height: 110px; 
        background: white; 
        overflow: hidden; 
        display: flex; 
        align-items: flex-start; 
        justify-content: center; 
        position: relative; 
        transition: 0.3s; 
        border-bottom: 2px solid transparent;
    }
    .theme-box-mini:hover .box-preview { transform: scale(1.02); }
    .theme-box-mini.selected .box-preview { border-bottom-color: var(--primary); }
    
    .preview-mini-internal { 
        width: 100%; 
        height: 100%; 
        display: flex; 
        align-items: flex-start; 
        justify-content: center; 
        overflow: hidden;
        pointer-events: none;
    }

    /* Container for the mini document peek */
    .preview-mini-internal .bingo-card-container {
        border-radius: 0 !important;
    }
    
    .box-info { padding: 0.6rem; }
    .name-m { font-weight: 900; font-size: 0.75rem; color: var(--text); }
    .c-dot { position: absolute; top: 0.5rem; left: 0.5rem; background: var(--primary); color: white; border-radius: 50%; padding: 3px; z-index: 5; box-shadow: 0 0 10px rgba(0,0,0,0.5); }

    .btn-nav-mini { height: 3.5rem; border-radius: 1.25rem; font-size: 1rem; font-weight: 900; display: flex; align-items: center; justify-content: center; gap: 0.75rem; transition: 0.3s; }
    .btn-nav-mini.primary-nav { flex: 2; background: var(--primary); color: white; border: none; }
    .btn-nav-mini.primary-nav:hover { transform: translateY(-2px); }
    .btn-nav-mini:not(.primary-nav) { flex: 1; }

    /* Mobile Adaptations */
    @media (max-width: 1023px) {
        .wizard-form-col { border-radius: 0; background: transparent; box-shadow: none; border: none; padding-bottom: 7rem; }
        .wizard-footer-mini { position: fixed; bottom: 1.5rem; left: 1rem; right: 1rem; z-index: 1000; padding: 0.85rem; border-radius: 1.75rem; border: 1px solid var(--glass-border); background: var(--surface-blur); backdrop-filter: blur(20px); box-shadow: 0 15px 40px rgba(0,0,0,0.5); }
        .preview-wrap-mini { padding: 1.5rem; border-radius: 1.5rem; margin-top: 1rem; min-height: 300px; }
    }

        .preview-scaler { 
            width: 100%; 
            transition: 0.5s cubic-bezier(0.16, 1, 0.3, 1); 
            filter: drop-shadow(0 25px 50px rgba(0,0,0,0.4)); 
            position: relative; 
            display: flex;
            justify-content: center;
            align-items: center;
        }
    .l-pill { position: absolute; top: -0.8rem; left: 50%; transform: translateX(-50%); background: var(--primary); color: white; padding: 0.4rem 1.25rem; border-radius: 2rem; font-size: 0.7rem; font-weight: 950; text-transform: uppercase; white-space: nowrap; box-shadow: 0 5px 15px rgba(139, 92, 246, 0.4); }

    .animate-fade-in { animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    
    .spin-m { width: 24px; height: 24px; border: 3px solid var(--glass-border); border-top-color: var(--primary); border-radius: 50%; animation: spin 1s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }

    /* Custom Scrollbars */
    .scroll-box-mini::-webkit-scrollbar, .wizard-form-inner-scroll::-webkit-scrollbar { width: 4px; }
    .scroll-box-mini::-webkit-scrollbar-track, .wizard-form-inner-scroll::-webkit-scrollbar-track { background: transparent; }
    .scroll-box-mini:hover::-webkit-scrollbar-track, .wizard-form-inner-scroll:hover::-webkit-scrollbar-track { background: hsla(0,0%,100%,0.05); }
    .scroll-box-mini::-webkit-scrollbar-thumb, .wizard-form-inner-scroll::-webkit-scrollbar-thumb { background: var(--glass-border); border-radius: 10px; transition: 0.3s; }
    .scroll-box-mini::-webkit-scrollbar-thumb:hover, .wizard-form-inner-scroll::-webkit-scrollbar-thumb:hover { background: var(--primary); }
`;
document.head.appendChild(styleSheet);
