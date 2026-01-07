import React, { useRef } from 'react';
import API_URLS from '../config/api';
import ThemeRenderer from './bingo/ThemeRenderer';
import useA4Scale from '../hooks/useA4Scale';

const BingoPreview = ({
    theme = 'classic',
    primaryColor = '#2c3e50',
    rows = 3,
    columns = 3,
    orientation = 'portrait',
    eventTitle = 'Music Bingo',
    cardData = [],
    cardNumber = 1,
    scale = 'auto',
    showFullscreen = true,
    hideFooter = false,
    isMini = false,
    padding = 12,
    containerStyle = {},
    previewStyle = {}
}) => {
    const containerRef = useRef(null);
    const manualScale = typeof scale === 'number' ? scale : null;
    const { scale: previewScale, a4Width, a4Height } = useA4Scale(containerRef, orientation, padding, manualScale);

    const isLandscape = orientation === 'landscape';

    // Mock data if cardData is empty (for live preview)
    const displayData = cardData.length > 0 ? cardData : Array(rows * columns).fill({
        nom: 'Song Title',
        artista: 'Artist Name'
    });

    const handleFullscreen = () => {
        const params = new URLSearchParams({
            theme,
            orientation,
            primary_color: primaryColor,
            rows,
            columns,
            event_title: eventTitle
        }).toString();
        window.open(`/preview?${params}`, '_blank');
    };

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', ...containerStyle }}>
            {!isMini && showFullscreen && (
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem'
                }}>
                    <h3 style={{
                        margin: 0,
                        fontSize: '1rem',
                        fontWeight: 600,
                        color: 'var(--text-muted)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                    }}>
                        Live Preview ({orientation})
                    </h3>
                    <button
                        onClick={handleFullscreen}
                        className="btn-ghost"
                        style={{
                            color: 'var(--primary)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '0.85rem',
                            padding: '4px 8px'
                        }}
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18V3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                        </svg>
                        Fullscreen
                    </button>
                </div>
            )}

            <div
                ref={containerRef}
                style={{
                    padding: `${padding}px`,
                    background: 'white',
                    borderRadius: 'var(--radius-md)',
                    aspectRatio: isLandscape ? '297/210' : '210/297',
                    overflow: 'hidden',
                    position: 'relative',
                    boxShadow: 'var(--shadow-xl)',
                    border: '1px solid var(--border)',
                    width: '100%',
                    ...previewStyle
                }}
            >
                <div style={{
                    width: `${a4Width}px`,
                    height: `${a4Height}px`,
                    transform: `scale(${previewScale})`,
                    transformOrigin: 'top left',
                    position: isMini ? 'relative' : 'absolute',
                    top: isMini ? 0 : `${padding}px`,
                    left: isMini ? 0 : `${padding}px`,
                    pointerEvents: 'none',
                    background: 'white'
                }}>
                    <ThemeRenderer
                        themeId={theme}
                        primaryColor={primaryColor}
                        rows={rows}
                        columns={columns}
                        orientation={orientation}
                        eventTitle={eventTitle}
                        cardData={displayData}
                        cardNumber={cardNumber}
                    />
                </div>
            </div>

            {!hideFooter && !isMini && (
                <p style={{
                    marginTop: '1rem',
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                    textAlign: 'center',
                    fontStyle: 'italic'
                }}>
                    Standard A4 Layout • Live preview
                </p>
            )}
        </div>
    );
};

export default BingoPreview;
