import React, { useEffect, useState } from 'react';
import { Crown, Calendar, Mail, CheckCircle, AlertCircle, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from '../api';

const Premium = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activating, setActivating] = useState(false);
    const [error, setError] = useState(null);
    
    // Contact form state
    const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
    const [sending, setSending] = useState(false);
    const [sendSuccess, setSendSuccess] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await api.get('/auth/me/');
                setUser(res.data);
                // Pre-fill contact form
                setContactForm(prev => ({ 
                    ...prev, 
                    name: res.data.username || '', 
                    email: res.data.email || '' 
                }));
            } catch (e) {
                setError(e?.response?.data?.detail || e?.message || 'Error');
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const activatePremium = async () => {
        setActivating(true);
        setError(null);
        try {
            const res = await api.post('/auth/activate_premium/');
            setUser(res.data);
            // Updating local user data if any
            try {
                const current = localStorage.getItem('user');
                const parsed = current ? JSON.parse(current) : null;
                localStorage.setItem('user', JSON.stringify({ ...(parsed || {}), ...res.data }));
            } catch (e) { /* ignore */ }
        } catch (e) {
            setError(e?.response?.data?.detail || e?.response?.data?.error || e?.message || 'Error');
        } finally {
            setActivating(false);
        }
    };

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        setSending(true);
        setError(null);
        setSendSuccess(false);
        try {
            await api.post('/auth/contact_premium/', contactForm);
            setSendSuccess(true);
            setContactForm(prev => ({ ...prev, message: '' }));
        } catch (e) {
            setError(t('premium.contact_error', 'Failed to send request.'));
        } finally {
            setSending(false);
        }
    };

    const isPermanent = !!user?.is_premium;
    const trialStart = user?.premium_trial_start;
    const trialExpires = user?.trial_expires_at;
    
    const now = new Date();
    const expiryDate = trialExpires ? new Date(trialExpires) : null;
    const isTrialActive = trialStart && expiryDate && now < expiryDate && !isPermanent;
    const isTrialExpired = trialStart && expiryDate && now >= expiryDate && !isPermanent;
    const noTrialYet = !trialStart && !isPermanent;

    const daysLeft = expiryDate ? Math.max(0, Math.ceil((expiryDate - now) / (1000 * 60 * 60 * 24))) : 0;
    const progressPercent = trialStart ? Math.min(100, Math.max(0, 100 - (daysLeft / 90 * 100))) : 0;

    if (loading) {
        return (
            <div className="container" style={{ paddingTop: '8rem', textAlign: 'center' }}>
                <div className="glass" style={{ padding: '3rem', borderRadius: '16px', display: 'inline-block' }}>
                    <div className="spinner" style={{ marginBottom: '1rem' }}></div>
                    <p>{t('common.loading', 'Loading...')}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container" style={{ paddingTop: '6rem', paddingBottom: '4rem' }}>
            <div className="glass" style={{ padding: '2.5rem', borderRadius: '24px', maxWidth: '800px', margin: '0 auto', border: '1px solid var(--glass-border)' }}>
                
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <div style={{ background: 'var(--primary-gradient)', width: '64px', height: '64px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', boxShadow: '0 8px 16px rgba(0,0,0,0.2)' }}>
                        <Crown size={32} color="white" />
                    </div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem' }}>{t('premium.title', 'Premium')}</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                        {isPermanent ? t('premium.permanent_active', 'Full Premium Access') : t('premium.subtitle', 'Unlock custom themes and advanced personalization.')}
                    </p>
                </div>

                {error && (
                    <div className="glass" style={{ padding: '1rem', borderRadius: '12px', border: '1px solid var(--error)', marginBottom: '1.5rem', color: 'var(--error)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <AlertCircle size={20} />
                        <span>{String(error)}</span>
                    </div>
                )}

                {/* State: PERMANENT PREMIUM */}
                {isPermanent && (
                    <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                        <div className="glass" style={{ padding: '2rem', borderRadius: '16px', background: 'rgba(34, 197, 94, 0.05)', border: '1px solid rgba(34, 197, 94, 0.2)' }}>
                            <CheckCircle size={48} color="#22c55e" style={{ marginBottom: '1rem' }} />
                            <h3 style={{ marginBottom: '0.5rem' }}>{t('premium.active', 'Your account is Premium.')}</h3>
                            <p style={{ color: 'var(--text-muted)' }}>{t('premium.permanent_desc', 'Thank you for supporting BingoMusicMaker! You have access to all features.')}</p>
                        </div>
                    </div>
                )}

                {/* State: TRIAL ACTIVE */}
                {isTrialActive && (
                    <div>
                        <div className="glass" style={{ padding: '2rem', borderRadius: '16px', marginBottom: '2rem', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <div style={{ padding: '8px', borderRadius: '8px', background: 'rgba(59, 130, 246, 0.1)' }}>
                                        <Calendar size={20} color="#3b82f6" />
                                    </div>
                                    <span style={{ fontWeight: '600', fontSize: '1.1rem' }}>{t('premium.trial_active', 'Trial active')}</span>
                                </div>
                                <span style={{ color: 'var(--text-muted)', fontWeight: '500' }}>
                                    {t('premium.days_left', { count: daysLeft })}
                                </span>
                            </div>
                            
                            {/* Progress bar */}
                            <div style={{ height: '8px', background: 'var(--glass-bg)', borderRadius: '4px', marginBottom: '1rem', overflow: 'hidden' }}>
                                <div style={{ 
                                    height: '100%', 
                                    width: `${progressPercent}%`, 
                                    background: 'var(--primary-gradient)',
                                    borderRadius: '4px',
                                    transition: 'width 1s ease-out'
                                }}></div>
                            </div>
                        </div>

                        <div className="glass" style={{ padding: '1.5rem', borderRadius: '16px', border: '1px dashed var(--glass-border)', textAlign: 'center' }}>
                            <h4 style={{ marginBottom: '0.5rem' }}>{t('premium.contact_title', 'Want to keep it forever?')}</h4>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.95rem' }}>
                                {t('premium.contact_trial_info', 'Contact us to get a permanent subcription.')}
                            </p>
                            <button className="btn btn-secondary" onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}>
                                {t('premium.contact_submit', 'Contact Support')}
                            </button>
                        </div>
                    </div>
                )}

                {/* State: NO TRIAL YET */}
                {noTrialYet && (
                    <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                            {t('premium.free_desc', 'Unlock the full power of BingoMusicMaker with custom backgrounds, fonts, and unique themes.')}
                        </p>
                        <button 
                            className="btn btn-primary" 
                            style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', borderRadius: '12px' }}
                            onClick={activatePremium}
                            disabled={activating}
                        >
                            {activating ? t('premium.activating', 'Activating...') : t('premium.activate_trial', 'Activate 3-month free trial')}
                        </button>
                    </div>
                )}

                {/* State: TRIAL EXPIRED */}
                {isTrialExpired && (
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <div className="glass" style={{ padding: '2rem', borderRadius: '16px', border: '1px solid var(--error)', background: 'rgba(239, 68, 68, 0.05)' }}>
                            <AlertCircle size={40} color="var(--error)" style={{ marginBottom: '1rem' }} />
                            <h3 style={{ marginBottom: '0.5rem' }}>{t('premium.trial_expired', 'Trial expired')}</h3>
                            <p style={{ color: 'var(--text-muted)' }}>{t('premium.contact_desc', 'Your trial has expired. Fill out this form if you\'d like to continue using premium features.')}</p>
                        </div>
                    </div>
                )}

                {/* CONTACT FORM (Shown for active trial or expired trial) */}
                {(isTrialActive || isTrialExpired) && (
                    <div id="contact-form" style={{ marginTop: '3rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                            <Mail size={22} className="text-primary" />
                            <h3 style={{ margin: 0 }}>{t('premium.contact_title', 'Contact Support')}</h3>
                        </div>

                        {sendSuccess ? (
                            <div className="glass" style={{ padding: '2rem', borderRadius: '16px', textAlign: 'center', border: '1px solid #22c55e', background: 'rgba(34, 197, 94, 0.05)' }}>
                                <CheckCircle size={40} color="#22c55e" style={{ marginBottom: '1rem' }} />
                                <p style={{ fontWeight: '500' }}>{t('premium.contact_success', 'Request sent successfully!')}</p>
                            </div>
                        ) : (
                            <form onSubmit={handleContactSubmit}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                                    <div className="input-group">
                                        <label>{t('premium.contact_name', 'Name')}</label>
                                        <input 
                                            type="text" 
                                            className="form-control"
                                            required
                                            value={contactForm.name}
                                            onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label>{t('premium.contact_email', 'Email')}</label>
                                        <input 
                                            type="email" 
                                            className="form-control"
                                            required
                                            value={contactForm.email}
                                            onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="input-group" style={{ marginBottom: '1.5rem' }}>
                                    <label>{t('premium.contact_message', 'Message')}</label>
                                    <textarea 
                                        className="form-control" 
                                        rows="4"
                                        required
                                        placeholder={t('premium.contact_message_placeholder', 'Tell us how you use the bingo...')}
                                        value={contactForm.message}
                                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                                        style={{ resize: 'none' }}
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary" disabled={sending} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '1rem' }}>
                                    {sending ? t('common.sending', 'Sending...') : (
                                        <>
                                            <Send size={18} />
                                            {t('premium.contact_submit', 'Send Request')}
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                )}

                <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
                    <button className="btn btn-secondary" onClick={() => navigate('/dashboard')}>
                        {t('common.back', 'Back to Dashboard')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Premium;
