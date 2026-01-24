import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const PageLayout = ({
    children,
    title,
    subtitle,
    actions,
    backPath,
    backLabel = "Back",
    maxWidth = 'clamp(800px, 90vw, 1400px)',
    icon
}) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <div style={{
            maxWidth,
            margin: '0 auto',
            width: '100%',
            paddingBottom: '2rem',
            flex: 1,
            display: 'flex',
            flexDirection: 'column'
        }}>
            {/* Top Navigation & Header Area */}
            <header style={{ marginBottom: '2rem' }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    flexWrap: 'wrap',
                    gap: '1.5rem'
                }}>
                    {/* Back Button and Title Container */}
                    <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '1rem',
                        flex: 1,
                        minWidth: '300px'
                    }}>
                        {/* Back Button */}
                        {backPath && (
                            <button
                                onClick={() => typeof backPath === 'number' ? navigate(backPath) : navigate(backPath)}
                                className="btn btn-secondary glass-hover"
                                style={{
                                    padding: '0.5rem',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: 'transparent',
                                    border: '1px solid var(--glass-border)',
                                    minWidth: '40px',
                                    height: '40px'
                                }}
                                title={backLabel === "Back" ? t('create.nav.back') : backLabel}
                            >
                                <ChevronLeft size={20} />
                            </button>
                        )}
                        
                        {/* Title */}
                        <h1 style={{
                            fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                            marginBottom: '0.75rem',
                            fontWeight: '800',
                            letterSpacing: '-0.02em',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            lineHeight: 1.1,
                            flex: 1
                        }}>
                            {icon && <span style={{ color: 'var(--primary)' }}>{icon}</span>}
                            {title}
                        </h1>
                    </div>

                    {actions && (
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            {actions}
                        </div>
                    )}
                </div>
                
                {/* Subtitle */}
                {subtitle && (
                    <div style={{ 
                        color: 'var(--text-muted)', 
                        fontSize: 'clamp(1rem, 1.5vw, 1.1rem)', 
                        lineHeight: '1.6',
                        marginTop: backPath ? '0' : '0.75rem'
                    }}>
                        {subtitle}
                    </div>
                )}
            </header>

            {/* Main Content */}
            <div className="animate-fade-in" style={{ flex: 1, overflowY: 'auto' }}>
                {children}
            </div>
        </div>
    );
};

export default PageLayout;
