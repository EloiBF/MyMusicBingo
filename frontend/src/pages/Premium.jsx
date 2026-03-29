import React, { useEffect, useState } from 'react';
import { Crown, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from '../api';
import PageLayout from '../components/PageLayout';

const Premium = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get('/auth/me/');
                setUser(res.data);
            } catch (e) {
                // ignore
            }
        };
        fetchUser();
    }, []);

    return (
        <PageLayout
            title={t('premium.title', 'Premium')}
            subtitle={t('premium.subtitle', 'Unlock custom themes and advanced personalization.')}
            backPath="/dashboard"
        >
            <div style={{
                minHeight: '60vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                gap: '2rem',
                padding: '2rem'
            }}>
                <div style={{
                    background: 'var(--primary-gradient)',
                    width: '80px',
                    height: '80px',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 10px 30px rgba(139, 92, 246, 0.3)',
                    opacity: 0.7
                }}>
                    <Crown size={40} color="white" />
                </div>

                <div>
                    <h2 style={{
                        fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                        fontWeight: '800',
                        marginBottom: '1rem',
                        color: 'var(--text)'
                    }}>
                        {t('premium.coming_soon_title', 'Coming Soon')}
                    </h2>
                    <p style={{
                        fontSize: '1.1rem',
                        lineHeight: '1.6',
                        color: 'var(--text-muted)',
                        maxWidth: '500px',
                        margin: '0 auto'
                    }}>
                        {t('premium.coming_soon_desc', 'Premium features are under development. Stay tuned for custom themes, advanced personalization, and more!')}
                    </p>
                </div>

                <button
                    onClick={() => navigate('/dashboard')}
                    className="btn btn-secondary"
                    style={{
                        padding: '1rem 2rem',
                        fontSize: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}
                >
                    <ArrowLeft size={18} />
                    {t('common.back', 'Back to Dashboard')}
                </button>
            </div>
        </PageLayout>
    );
};

export default Premium;
