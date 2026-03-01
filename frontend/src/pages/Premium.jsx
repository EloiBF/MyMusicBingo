import React, { useEffect, useState } from 'react';
import { Crown } from 'lucide-react';
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

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await api.get('/auth/me/');
                setUser(res.data);
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
            try {
                const current = localStorage.getItem('user');
                const parsed = current ? JSON.parse(current) : null;
                localStorage.setItem('user', JSON.stringify({ ...(parsed || {}), ...res.data }));
            } catch (e) {
                // ignore
            }
        } catch (e) {
            setError(e?.response?.data?.detail || e?.response?.data?.error || e?.message || 'Error');
        } finally {
            setActivating(false);
        }
    };

    const isPremium = !!user?.is_premium;

    return (
        <div className="container" style={{ paddingTop: '6rem', paddingBottom: '2rem' }}>
            <div className="glass" style={{ padding: '2rem', borderRadius: '16px', maxWidth: '720px', margin: '0 auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <Crown size={22} />
                    <h2 style={{ margin: 0 }}>{t('premium.title', 'Premium')}</h2>
                </div>

                {loading ? (
                    <div style={{ color: 'var(--text-muted)' }}>{t('common.loading', 'Loading...')}</div>
                ) : (
                    <>
                        <div style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>
                            {isPremium
                                ? t('premium.active', 'Your account is Premium.')
                                : t('premium.free', 'Your account is Free. Activate Premium to unlock personalization features.')}
                        </div>

                        {error && (
                            <div className="glass" style={{ padding: '0.75rem', borderRadius: '12px', border: '1px solid var(--glass-border)', marginBottom: '1rem', color: 'var(--error)' }}>
                                {String(error)}
                            </div>
                        )}

                        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                            {!isPremium && (
                                <button
                                    className="btn btn-primary"
                                    onClick={activatePremium}
                                    disabled={activating}
                                >
                                    {activating ? t('premium.activating', 'Activating...') : t('premium.activate_free', 'Activate Premium (free)')}
                                </button>
                            )}

                            <button
                                className="btn btn-secondary"
                                onClick={() => navigate('/dashboard')}
                            >
                                {t('common.back', 'Back')}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Premium;
