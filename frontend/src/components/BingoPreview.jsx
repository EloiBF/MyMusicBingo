import React, { useRef, useLayoutEffect } from 'react';
import API_URLS from '../config/api';

const BingoPreview = ({
    theme = 'classic',
    primaryColor = '#2c3e50',
    rows = 3,
    columns = 3,
    eventTitle = 'Music Bingo',
    scale = 'auto',
    showFullscreen = true,
    hideFooter = false,
    padding = 12,
    containerStyle = {},
    iframeStyle = {}
}) => {
    const containerRef = useRef(null);
    const [previewScale, setPreviewScale] = React.useState(typeof scale === 'number' ? scale : 0.4);

    useLayoutEffect(() => {
        if (scale !== 'auto') {
            setPreviewScale(scale);
            return;
        }

        const updateScale = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.offsetWidth;
                // 794px is the A4 width in pixels at 96 DPI
                // Subtract padding (x2 for both sides) and 2px for border from available width
                const safeMargin = (padding * 2) + 2;
                const newScale = Math.min((containerWidth - safeMargin) / 794, 1);
                setPreviewScale(newScale > 0 ? newScale : 0.4);
            }
        };

        const observer = new ResizeObserver(updateScale);
        if (containerRef.current) {
            observer.observe(containerRef.current);
            updateScale(); // Initial calculation
        }

        return () => observer.disconnect();
    }, [scale, padding]); // Add padding to dependencies

    // Use a unique ID for the iframe to ensure it refreshes when vital params change
    const params = `theme=${theme}&primary_color=${encodeURIComponent(primaryColor)}&rows=${rows}&columns=${columns}&preview=1&event_title=${encodeURIComponent(eventTitle)}`;
    const previewUrl = API_URLS.BINGO_LIVE_PREVIEW(params);

    const handleFullscreen = () => {
        // Reuse live preview for fullscreen if we are in creation mode (no ID usually)
        // Or if we strictly wanted the card preview, we'd need a different endpoint that accepts params.
        // For now, using live preview is safest as it accepts params.
        window.open(previewUrl, '_blank');
    };

    return (
        <div style={{ width: '100%', ...containerStyle }}>
            {showFullscreen && (
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
                        Live Preview
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
                    aspectRatio: '210/297', // A4 aspect ratio
                    overflow: 'hidden',
                    position: 'relative',
                    boxShadow: 'var(--shadow-xl)',
                    border: '1px solid var(--border)',
                    ...iframeStyle
                }}
            >
                <div style={{
                    width: '794px',
                    height: '1123px',
                    transform: `scale(${previewScale})`,
                    transformOrigin: 'top left',
                    position: 'absolute',
                    top: `${padding}px`,
                    left: `${padding}px`,
                    pointerEvents: 'none' // Prevent interaction with iframe
                }}>
                    <iframe
                        key={params} // Force re-render on param change
                        src={previewUrl}
                        style={{
                            width: '100%',
                            height: '100%',
                            display: 'block', // Prevent inline spacing issues
                            border: 'none',
                            background: 'white'
                        }}
                        title="Bingo Card Preview"
                    />
                </div>
            </div>

            {!hideFooter && (
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
