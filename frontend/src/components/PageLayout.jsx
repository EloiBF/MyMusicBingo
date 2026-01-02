import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();

    return (
        <div style={{ maxWidth, margin: '0 auto', width: '100%' }}>
            {/* Top Navigation & Header Area */}
            <header style={{ marginBottom: 'clamp(3rem, 6vw, 4rem)' }}>
                {/* Back Button */}
                {backPath && (
                    <button
                        onClick={() => typeof backPath === 'number' ? navigate(backPath) : navigate(backPath)}
                        className="btn btn-secondary glass-hover"
                        style={{
                            marginBottom: '1.5rem',
                            padding: '0.5rem 1rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '0.9rem',
                            background: 'transparent',
                            border: '1px solid var(--glass-border)'
                        }}
                    >
                        <ChevronLeft size={16} /> {backLabel}
                    </button>
                )}

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    flexWrap: 'wrap',
                    gap: '1.5rem'
                }}>
                    <div style={{ flex: 1, minWidth: '300px' }}>
                        <h1 style={{
                            fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                            marginBottom: '0.75rem',
                            fontWeight: '800',
                            letterSpacing: '-0.02em',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            lineHeight: 1.1
                        }}>
                            {icon && <span style={{ color: 'var(--primary)' }}>{icon}</span>}
                            {title}
                        </h1>
                        {subtitle && (
                            <div style={{ color: 'var(--text-muted)', fontSize: 'clamp(1rem, 1.5vw, 1.1rem)', lineHeight: '1.6' }}>
                                {subtitle}
                            </div>
                        )}
                    </div>

                    {actions && (
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            {actions}
                        </div>
                    )}
                </div>
            </header>

            {/* Main Content */}
            <div className="animate-fade-in">
                {children}
            </div>
        </div>
    );
};

export default PageLayout;
