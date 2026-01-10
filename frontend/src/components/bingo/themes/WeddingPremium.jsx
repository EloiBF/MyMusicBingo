import React from 'react';
import BingoCard from '../BingoCard';
import { generateThemePalette } from '../../../utils/colors';

/**
 * Wedding Premium Theme (Redesigned)
 * Style: Royal Luxury / Palace / Formal
 * Font: 'Cinzel' (Header), 'Bodoni Moda' (Body)
 * Background: White with subtle CSS pattern (damask-ish)
 */
const WeddingPremium = ({
    cells,
    title = "Bingo Musical",
    accentColor = "#C5A059", // Rich Gold
    ...props
}) => {
    const palette = generateThemePalette(accentColor);

    const renderCellDecor = () => null;

    // Split title for sophisticated layout
    const richTitle = (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 2 }}>

            <span style={{
                fontSize: '48px',
                lineHeight: '1',
                margin: '10px 0',
                color: palette.accent,
                textShadow: `1px 1px 0px ${palette.accentLight}`
            }}>{title}</span>
        </div>
    );

    return (
        <BingoCard
            {...props}
            cells={cells}
            title={richTitle}
            accentColor={palette.accent}
            themeStyles={{
                fontFamily: "'Playfair Display', serif",
                backgroundColor: palette.background,
                backgroundImage: 'none',
                // Layered Premium Border
                border: `1px solid ${palette.base}`,
                outline: `2px solid ${palette.accent}`, // Inner Gold/Accent line
                outlineOffset: '-12px',
                borderRadius: '0',
                padding: '50px 70px', // Extra side padding for laurels
                margin: '20px',
                position: 'relative',
                boxShadow: `0 0 0 8px ${palette.background}, 0 0 0 9px ${palette.base}` // Triple framing effect
            }}
            titleStyles={{
                color: palette.accent,
                fontFamily: "'Dancing Script', cursive",
                fontWeight: '700',
                fontSize: '56px', // Larger and clearer
                letterSpacing: '0px',
                textTransform: 'none',
                textShadow: `2px 2px 0px ${palette.accentExtraLight}`,
                lineHeight: '1.2',
                display: 'block',
                marginTop: '10px'
            }}
            headerStyles={{
                marginBottom: '40px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                // Decorative separator
                borderBottom: `2px double ${palette.accentLight}`,
                width: '70%',
                margin: '0 auto 30px auto',
                paddingBottom: '25px'
            }}
            gridStyles={{
                gap: '12px',
                background: 'transparent'
            }}
            cellStyles={{
                backgroundColor: palette.background,
                border: `1px solid ${palette.base}`,
                borderRadius: '2px', // Very slight soft corner
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '8px',
                color: palette.text,
                boxShadow: `2px 2px 0px ${palette.accentExtraLight}` // Dimensional feel
            }}
            songStyles={{
                fontFamily: "'Bodoni Moda', serif",
                fontSize: '10pt',
                color: palette.text,
                fontWeight: 600,
                letterSpacing: '0.5px',
                marginBottom: '4px',
                lineHeight: '1.3'
            }}
            artistStyles={{
                color: palette.accent,
                fontSize: '8pt',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontFamily: "'Cinzel', serif"
            }}
            renderCellDecor={renderCellDecor}
            renderCardNumber={(num) => (
                <div style={{
                    position: 'absolute',
                    bottom: '25px',
                    width: '100%',
                    textAlign: 'center',
                    fontSize: '11px',
                    letterSpacing: '3px',
                    color: palette.accent,
                    fontFamily: "'Cinzel', serif",
                    fontWeight: '600',
                    borderTop: `1px solid ${palette.base}`,
                    maxWidth: '200px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    paddingTop: '10px'
                }}>
                    Nº {String(num).padStart(3, '0')}
                </div>
            )}
        >
            {/* --- CORNER ORNAMENTS (Layered Accents) --- */}

            {/* Top Left */}
            <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 1 }}>
                <div style={{ width: '40px', height: '40px', borderTop: `2px solid ${palette.accent}`, borderLeft: `2px solid ${palette.accent}` }} />
                <div style={{ width: '30px', height: '30px', borderTop: `1px solid ${palette.accentLight}`, borderLeft: `1px solid ${palette.accentLight}`, position: 'absolute', top: '5px', left: '5px' }} />
            </div>

            {/* Top Right */}
            <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 1 }}>
                <div style={{ width: '40px', height: '40px', borderTop: `2px solid ${palette.accent}`, borderRight: `2px solid ${palette.accent}` }} />
                <div style={{ width: '30px', height: '30px', borderTop: `1px solid ${palette.accentLight}`, borderRight: `1px solid ${palette.accentLight}`, position: 'absolute', top: '5px', right: '5px' }} />
            </div>

            {/* Bottom Left */}
            <div style={{ position: 'absolute', bottom: '20px', left: '20px', zIndex: 1 }}>
                <div style={{ width: '40px', height: '40px', borderBottom: `2px solid ${palette.accent}`, borderLeft: `2px solid ${palette.accent}` }} />
                <div style={{ width: '30px', height: '30px', borderBottom: `1px solid ${palette.accentLight}`, borderLeft: `1px solid ${palette.accentLight}`, position: 'absolute', bottom: '5px', left: '5px' }} />
            </div>

            {/* Bottom Right */}
            <div style={{ position: 'absolute', bottom: '20px', right: '20px', zIndex: 1 }}>
                <div style={{ width: '40px', height: '40px', borderBottom: `2px solid ${palette.accent}`, borderRight: `2px solid ${palette.accent}` }} />
                <div style={{ width: '30px', height: '30px', borderBottom: `1px solid ${palette.accentLight}`, borderRight: `1px solid ${palette.accentLight}`, position: 'absolute', bottom: '5px', right: '5px' }} />
            </div>

            {/* --- SIDE BRANCH DECORATIONS (SVG Shadows) --- */}

            {/* Left Branch */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '20px',
                transform: 'translateY(-50%)',
                width: '60px',
                height: '70%',
                opacity: 0.6,
                zIndex: 0
            }}>
                <svg width="100%" height="100%" viewBox="0 0 50 300" preserveAspectRatio="none">
                    {/* Main Stem */}
                    <path d="M25,0 Q10,75 25,150 T25,300" stroke={palette.accentExtraLight} strokeWidth="2" fill="none" />
                    {/* Elongated Leaves - Shadows */}
                    {Array.from({ length: 12 }).map((_, i) => (
                        <g key={i} transform={`translate(25, ${20 + i * 24})`}>
                            {/* Left Leaf */}
                            <path d="M0,0 Q-15,-5 -20,0 Q-15,5 0,0" fill={palette.accentExtraLight} opacity="0.8" transform={`rotate(${-15 + (i % 2) * 10}) scale(${1 + (i % 3) * 0.2})`} />
                            {/* Right Leaf (staggered) */}
                            <path d="M0,12 Q15,7 20,12 Q15,17 0,12" fill={palette.accentExtraLight} opacity="0.8" transform={`rotate(${15 - (i % 2) * 10}) scale(${1 + (i % 3) * 0.2})`} />
                        </g>
                    ))}
                </svg>
            </div>

            {/* Right Branch */}
            <div style={{
                position: 'absolute',
                top: '50%',
                right: '20px',
                transform: 'translateY(-50%) scaleX(-1)', // Mirror for symmetry
                width: '60px',
                height: '70%',
                opacity: 0.6,
                zIndex: 0
            }}>
                <svg width="100%" height="100%" viewBox="0 0 50 300" preserveAspectRatio="none">
                    {/* Main Stem */}
                    <path d="M25,0 Q10,75 25,150 T25,300" stroke={palette.accentExtraLight} strokeWidth="2" fill="none" />
                    {/* Elongated Leaves - Shadows */}
                    {Array.from({ length: 12 }).map((_, i) => (
                        <g key={i} transform={`translate(25, ${20 + i * 24})`}>
                            {/* Left Leaf */}
                            <path d="M0,0 Q-15,-5 -20,0 Q-15,5 0,0" fill={palette.accentExtraLight} opacity="0.8" transform={`rotate(${-15 + (i % 2) * 10}) scale(${1 + (i % 3) * 0.2})`} />
                            {/* Right Leaf (staggered) */}
                            <path d="M0,12 Q15,7 20,12 Q15,17 0,12" fill={palette.accentExtraLight} opacity="0.8" transform={`rotate(${15 - (i % 2) * 10}) scale(${1 + (i % 3) * 0.2})`} />
                        </g>
                    ))}
                </svg>
            </div>

        </BingoCard>
    );
};

export default WeddingPremium;
