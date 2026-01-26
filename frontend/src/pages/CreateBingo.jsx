import React, { useState, useEffect, useRef } from 'react';
import {
    Music, Search, PlusCircle, X, Wand2, ListMusic, Eye, Settings as SettingsIcon,
    User, Mail, Lock, UserPlus, LogIn, Home, ChevronLeft, Link2Off, AlertCircle, Layers, LayoutGrid, Play, Crown, Palette, Check, ArrowRight, ArrowLeft
} from 'lucide-react';

import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from '../api';
import API_URLS from '../config/api';
import PageLayout from '../components/PageLayout';
import BingoCardPreview from '../components/BingoCardPreview';
import SplitLayout from '../components/SplitLayout';
import ErrorMessage from '../components/ErrorMessage';
import { getAvailableThemes } from '../utils/themeLoader';

const CreateBingo = () => {
    const { t } = useTranslation();
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
        theme: 'basic',
        orientation: 'portrait'
    });

    const [loading, setLoading] = useState(false);
    const [showPlaylistModal, setShowPlaylistModal] = useState(false);
    const [playlists, setPlaylists] = useState([]);
    const [paramLoading, setParamLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    // Validation state
    const [validation, setValidation] = useState({
        is_valid: true,
        error_message: null,
        success_message: null,
        loading: false,
        track_count: 0,
        max_possible_unique: 0
    });

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

    // Real-time validation effect
    useEffect(() => {
        if (!config.playlistId || config.playlistId.length < 5) {
            setValidation({ 
                is_valid: true, 
                error_message: null, 
                success_message: null, 
                loading: false, 
                track_count: 0,
                max_possible_unique: 0 
            });
            return;
        }

        const validate = async () => {
            setValidation(prev => ({ ...prev, loading: true }));
            try {
                const response = await api.post('/bingo/validate_playlist/', {
                    playlist_id: config.playlistId,
                    rows: config.rows,
                    columns: config.columns,
                    num_cards: config.numCards
                });
                setValidation({
                    is_valid: response.data.is_valid,
                    error_message: response.data.error_message,
                    success_message: response.data.success_message,
                    loading: false,
                    track_count: response.data.track_count,
                    max_possible_unique: response.data.max_possible_unique
                });
            } catch (err) {
                console.error('Validation error:', err);
                // Don't block on connection errors, but log it
                setValidation(prev => ({ ...prev, loading: false }));
            }
        };

        const timeoutId = setTimeout(validate, 800); // Debounce
        return () => clearTimeout(timeoutId);
    }, [config.playlistId, config.rows, config.columns, config.numCards]);

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
                        orientation: event.orientation || 'portrait'
                    });
                } catch (err) {
                    console.error('Error fetching event data:', err);
                    setErrorMessage(t('create.alerts.load_failed'));
                    navigate('/dashboard');
                }
            };
            fetchEventData();
        }
    }, [id, isEditMode, navigate, t]);

    const gridOptions = [
        { label: '3x3 (9 songs)', rows: 3, cols: 3 },
        { label: '4x3 (12 songs)', rows: 4, cols: 3 },
        { label: '4x4 (16 songs)', rows: 4, cols: 4 },
    ];

    const getColorValue = (color, theme = null) => {
        return color;
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
            setErrorMessage(t('create.playlist.error'));
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
            setErrorMessage(t('create.alerts.playlist_required'));
            return;
        }
        
        // Check validation before generating
        if (!validation.is_valid) {
            setErrorMessage(validation.error_message || t('create.alerts.validation_failed'));
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
                orientation: config.orientation
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
            setErrorMessage(`${t('common.error')}: ` + (err.response?.data?.error || err.message));
        } finally {
            setLoading(false);
        }
    };

    const nextStep = () => {
        if (currentStep === 1 && !config.playlistId) {
            setErrorMessage(t('create.alerts.playlist_required'));
            return;
        }
        
        // Check validation before proceeding from step 1
        if (currentStep === 1 && !validation.is_valid) {
            setErrorMessage(validation.error_message || t('create.alerts.validation_failed'));
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
        { id: 1, name: t('create.steps.playlist'), icon: <Search size={14} /> },
        { id: 2, name: t('create.steps.theme'), icon: <Palette size={14} /> },
        { id: 3, name: t('create.steps.layout'), icon: <Layers size={14} /> }
    ];

    return (
        <PageLayout
            title={isEditMode ? t('create.edit_title') : t('create.title')}
            subtitle={isEditMode ? t('create.edit_subtitle') : t('create.subtitle')}
            icon={<Wand2 size={24} />}
            hideScrollingBackground={true}
        >
            <SplitLayout
                variant="bingo-standard"
                sidebar={
                    <div style={{
                        background: 'var(--surface-blur)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: 'var(--radius-xl)',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
                        overflow: 'hidden',
                        padding: '2rem',

                        // Default mobile styles
                        width: '100%',
                        maxWidth: '450px',
                        margin: '0 auto',

                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1,
                        height: '100%'
                    }}>
                        <h3 style={{
                            textAlign: 'center',
                            marginBottom: '1rem',
                            color: 'var(--text-muted)',
                            fontSize: '0.8rem',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em'
                        }}>
                            {t('create.preview_title', 'Bingo Card Preview')}
                        </h3>
                        <BingoCardPreview
                            event={{
                                theme: config.theme,
                                rows: config.rows,
                                columns: config.columns,
                                orientation: config.orientation,
                                event_title: config.eventTitle || t('create.default_title')
                            }}
                            cardData={[]}
                            isMini={false}
                            containerStyle={{
                                width: '100%',
                                borderRadius: 'var(--radius-xl)',
                                flex: 1,
                                maxHeight: 'calc(100% - 4rem)'
                            }}
                        />
                    </div>
                }
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1, height: '100%' }}>
                    {/* Form Content */}
                    <div className="glass" style={{
                        borderRadius: 'var(--radius-xl)',
                        background: 'var(--surface-blur)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid var(--glass-border)',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1
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
                        <div className="wizard-content-scroll" style={{
                            overflowY: 'auto',
                            display: 'flex',
                            flexDirection: 'column',
                            flex: 1
                        }}>
                            <div className="step-content-box-mini" style={{ flex: 1 }}>
                                {currentStep === 1 && (
                                    <div className="animate-fade-in section-compact-mini">
                                        <div className="input-group-mini">
                                            <label>{t('create.playlist.label')}</label>
                                            <div style={{ position: 'relative' }}>
                                                {validation.loading ? (
                                                    <div className="spin-mini" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                                                ) : (validation.is_valid && validation.track_count > 0) ? (
                                                    <Check size={16} color="var(--success)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                                                ) : (
                                                    <Search size={14} className="input-icon-left-mini" />
                                                )}

                                                <input
                                                    type="text"
                                                    placeholder={t('create.playlist.placeholder')}
                                                    value={config.playlistId}
                                                    onChange={(e) => handlePlaylistChange(e.target.value)}
                                                    style={{
                                                        paddingLeft: '2.5rem',
                                                        borderColor: (validation.is_valid && validation.track_count > 0 && !validation.loading) ? 'var(--success)' :
                                                            (!validation.is_valid && !validation.loading) ? 'var(--error)' : 'var(--glass-border)',
                                                        boxShadow: (validation.is_valid && validation.track_count > 0 && !validation.loading) ? '0 0 0 1px var(--success)' : 'none',
                                                        transition: 'all 0.3s ease'
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        {!validation.is_valid && !validation.loading && (
                                            <div className="validation-msg error animate-fade-in">
                                                <AlertCircle size={16} /> {validation.error_message}
                                            </div>
                                        )}

                                        <div className="text-sm text-gray-500" style={{ fontSize: '0.875rem', color: '#9ca3af', lineHeight: '1.4', marginTop: '2rem' }}>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '0.5rem' }}>
                                                <div className="glass" style={{ padding: '0.75rem', borderRadius: '8px' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                                                        <span style={{ fontSize: '1.2rem', marginRight: '0.5rem' }}>💻</span>
                                                        <strong style={{ color: '#e5e7eb' }}>{t('create.playlist.guide.desktop.title')}</strong>
                                                    </div>
                                                    <ol style={{ margin: '0', paddingLeft: '1.2rem', fontSize: '0.8rem', color: '#9ca3af' }}>
                                                        <li>{t('create.playlist.guide.desktop.step1')}</li>
                                                        <li>{t('create.playlist.guide.desktop.step2')}</li>
                                                        <li>{t('create.playlist.guide.desktop.step3')}</li>
                                                        <li>{t('create.playlist.guide.desktop.step4')}</li>
                                                        <li>{t('create.playlist.guide.desktop.step5')}</li>
                                                    </ol>
                                                </div>
                                                <div className="glass" style={{ padding: '0.75rem', borderRadius: '8px' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                                                        <span style={{ fontSize: '1.2rem', marginRight: '0.5rem' }}>📱</span>
                                                        <strong style={{ color: '#e5e7eb' }}>{t('create.playlist.guide.mobile.title')}</strong>
                                                    </div>
                                                    <ol style={{ margin: '0', paddingLeft: '1.2rem', fontSize: '0.8rem', color: '#9ca3af' }}>
                                                        <li>{t('create.playlist.guide.mobile.step1')}</li>
                                                        <li>{t('create.playlist.guide.mobile.step2')}</li>
                                                        <li>{t('create.playlist.guide.mobile.step3')}</li>
                                                        <li>{t('create.playlist.guide.mobile.step4')}</li>
                                                        <li>{t('create.playlist.guide.mobile.step5')}</li>
                                                    </ol>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {currentStep === 2 && (
                                    <div className="animate-fade-in section-compact-mini" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                        <div className="theme-compact-gallery" style={{ marginTop: 0, flex: 1, display: 'flex', flexDirection: 'column' }}>
                                            <label className="label-bold-mini">{t('create.theme.label')}</label>
                                            <div className="scroll-box-mini" style={{ flex: 1, overflowY: 'auto' }}>
                                                <div className="grid-mini">
                                                    {allThemes.map(themeItem => {
                                                        const isSelected = config.theme === themeItem.id;
                                                        return (
                                                            <div key={themeItem.id} onClick={() => setConfig({ ...config, theme: themeItem.id })} className={`theme-box-mini ${isSelected ? 'selected' : ''}`}>
                                                                <div className="box-preview">
                                                                    <div className="preview-mini-internal">
                                                                        <BingoCardPreview
                                                                            event={{
                                                                                theme: themeItem.id,
                                                                                rows: 3,
                                                                                columns: 3,
                                                                                orientation: 'portrait',
                                                                                event_title: t('common.guest')
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
                                                                    <span className="name-m">{t(`themes.labels.${themeItem.id.toLowerCase()}`, { defaultValue: themeItem.label })}</span>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {currentStep === 3 && (
                                    <div className="animate-fade-in section-compact-mini">
                                        <div className="input-group-mini">
                                            <label>{t('create.layout.name_label')}</label>
                                            <input
                                                type="text"
                                                placeholder={t('create.layout.name_placeholder')}
                                                value={config.eventTitle}
                                                onChange={(e) => setConfig({ ...config, eventTitle: e.target.value })}
                                            />
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                            <div className="input-group-mini" style={{ display: 'flex', flexDirection: 'column' }}>
                                                <label style={{ flexGrow: 1 }}>
                                                    {t('create.layout.num_cards_label')}
                                                </label>
                                                <input
                                                    type="number"
                                                    value={config.numCards}
                                                    onChange={(e) => setConfig({ ...config, numCards: parseInt(e.target.value) })}
                                                    max={validation.max_possible_unique || undefined}
                                                />
                                            </div>
                                            <div className="input-group-mini" style={{ display: 'flex', flexDirection: 'column' }}>
                                                <label style={{ flexGrow: 1 }}>{t('create.layout.grid_label')}</label>
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
                                                <label>{t('create.layout.orientation_label')}</label>
                                                <div className="toggle-group-mini glass">
                                                    {['portrait', 'landscape'].map(o => (
                                                        <button
                                                            key={o}
                                                            type="button"
                                                            onClick={() => setConfig({ ...config, orientation: o })}
                                                            className={`toggle-btn-mini ${config.orientation === o ? 'active' : ''}`}
                                                        >
                                                            {t(`create.layout.${o}`)}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Navigation Actions */}
                        <div className="wizard-footer-mini" style={{
                            borderTop: '1px solid var(--glass-border)',
                            padding: '1rem 1.5rem',
                            background: 'hsla(0,0%,100%,0.02)',
                            display: 'flex',
                            gap: '0.75rem',
                            flexShrink: 0
                        }}>
                            {currentStep > 1 && (
                                <button onClick={prevStep} className="btn btn-secondary btn-nav-mini">
                                    <ArrowLeft size={16} /> {t('create.nav.back')}
                                </button>
                            )}
                            <button
                                onClick={nextStep}
                                className="btn btn-primary btn-nav-mini primary-nav"
                                disabled={loading || validation.loading || !validation.is_valid}
                            >
                                {loading ? t('common.generating') : (currentStep === totalSteps ? t('create.nav.generate') : t('create.nav.next'))}
                                <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </SplitLayout>

            {/* Playlist Modal */}
            {
                showPlaylistModal && (
                    <div className="modal-ov">
                        <div className="modal-c glass animate-fade-in">
                            <div className="modal-h">
                                <h3><ListMusic size={20} /> {t('create.playlist_modal.title')}</h3>
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
                )
            }

            {/* Custom Error Message */}
            <ErrorMessage
                message={errorMessage}
                onClose={() => setErrorMessage(null)}
                type="error"
                autoClose={true}
            />
        </PageLayout >
    );
};

export default CreateBingo;

const styleSheet = document.createElement('style');
styleSheet.innerHTML = `
    .wizard-layout-container { width: 100%; max-width: 1400px; margin: 0 auto; }
    .wizard-responsive-wrapper { display: flex; flex-direction: column; width: 100%; gap: 1.5rem; }
    .wizard-content-scroll { padding: 0 1.5rem 6rem; }

    @media (min-width: 1024px) {
        .wizard-content-scroll { padding: 0 1.5rem 1.5rem; }
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
            width: 95%; 
            height: 100%; 
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
    
    .theme-box-mini { border-radius: 1rem; border: 2px solid var(--glass-border); background: rgba(255,255,255,0.03); transition: 0.3s; position: relative; overflow: hidden; cursor: pointer; text-align: center; }
    .theme-box-mini:hover { border-color: rgba(255,255,255,0.2); background: rgba(255,255,255,0.05); }
    .theme-box-mini.selected { border-color: var(--primary); background: var(--primary); color: white; box-shadow: 0 10px 20px rgba(139, 92, 246, 0.2); }
    
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
        .wizard-footer-mini { 
            position: fixed; 
            bottom: 0; 
            left: 0; 
            right: 0; 
            z-index: 1000; 
            padding: 1rem 1.5rem; 
            border-top: 1px solid var(--glass-border); 
            background: var(--surface); 
            backdrop-filter: blur(20px); 
            box-shadow: 0 -10px 30px rgba(0,0,0,0.3); 
            padding-bottom: max(1rem, env(safe-area-inset-bottom));
        }
        .preview-wrap-mini { 
            padding: 1rem; 
            border-radius: 1.5rem; 
            margin-bottom: 1rem; 
            margin-top: 0;
            min-height: auto; 
            max-height: 50vh;
            max-width: 280px; 
            margin-left: auto;
            margin-right: auto;
        }
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

    .validation-msg { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1rem; border-radius: 0.75rem; font-size: 0.85rem; font-weight: 600; }
    .validation-msg.error { background: hsla(0, 84%, 60%, 0.1); color: var(--error); border: 1px solid hsla(0, 84%, 60%, 0.2); }
    .validation-msg.success { background: hsla(142, 76%, 36%, 0.1); color: var(--success); border: 1px solid hsla(142, 76%, 36%, 0.2); }
    .validation-msg.loading { color: var(--text-muted); }
    
    .spin-mini { width: 14px; height: 14px; border: 2px solid var(--glass-border); border-top-color: var(--primary); border-radius: 50%; animation: spin 1s linear infinite; }

    /* Custom Scrollbars */
    .scroll-box-mini::-webkit-scrollbar, .wizard-form-inner-scroll::-webkit-scrollbar { width: 4px; }
    .scroll-box-mini::-webkit-scrollbar-track, .wizard-form-inner-scroll::-webkit-scrollbar-track { background: transparent; }
    .scroll-box-mini:hover::-webkit-scrollbar-track, .wizard-form-inner-scroll:hover::-webkit-scrollbar-track { background: hsla(0,0%,100%,0.05); }
    .scroll-box-mini::-webkit-scrollbar-thumb, .wizard-form-inner-scroll::-webkit-scrollbar-thumb { background: var(--glass-border); border-radius: 10px; transition: 0.3s; }
    .scroll-box-mini::-webkit-scrollbar-thumb:hover, .wizard-form-inner-scroll::-webkit-scrollbar-thumb:hover { background: var(--primary); }

    /* Desktop A4 Layout Enforcement */
    @media (min-width: 1024px) {
        .wizard-form-col {
            /* This targets the sidebar if we add this class to it, or we can target via inline style logic if easier */
            width: auto !important;
            aspect-ratio: 210/297;
            max-width: none !important;
        }
    }
`;
document.head.appendChild(styleSheet);
