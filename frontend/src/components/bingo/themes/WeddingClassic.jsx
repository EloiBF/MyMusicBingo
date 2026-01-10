import React from 'react';
import BingoCard from '../BingoCard';
import { generateThemePalette } from '../../../utils/colors';

/**
 * Wedding Classic Theme (Redesigned)
 * Style: Vintage Botanical / Garden / Romantic
 * Font: 'Great Vibes' (Header), 'Cormorant Garamond' (Body)
 * Background: White with soft organic decorations
 */
const WeddingClassic = ({
    cells,
    title = "Bingo Musical",
    accentColor = "#849b87", // Sage Green default
    ...props
}) => {
    const palette = generateThemePalette(accentColor);

    // Subtle leaf decoration for random cells
    const renderCellDecor = (index) => {
        if (index % 4 !== 0) return null;
        return (
            <div style={{
                position: 'absolute',
                bottom: '2px',
                right: '2px',
                fontSize: '16px',
                color: palette.accentExtraLight,
                opacity: 0.6,
                transform: 'rotate(-15deg)'
            }}>
                ❧
            </div>
        );
    };

    return (
        <BingoCard
            {...props}
            cells={cells}
            title={title}
            accentColor={palette.accent}
            themeStyles={{
                fontFamily: "'Playfair Display', serif",
                backgroundColor: palette.background,
                // Elaborate double frame effect
                border: `1px solid ${palette.base}`, // Changed to Base for structure
                outline: `4px double ${palette.accentLight}`, // Outline can stay light accent or move to base grey
                outlineOffset: '6px',
                borderRadius: '4px',
                padding: '40px',
                margin: '20px', // Space for outline
                boxShadow: `0 0 40px -10px ${palette.accentExtraLight}`, // Soft glow
                position: 'relative',
                overflow: 'hidden' // Crop corner decorations
            }}
            titleStyles={{
                fontFamily: "'Dancing Script', cursive",
                fontSize: '52px',
                color: palette.accent, // Title stays Accent
                fontWeight: '700', // Increased weight
                marginBottom: '5px',
                textShadow: `2px 2px 0px ${palette.accent}`
            }}
            headerStyles={{
                marginBottom: '35px',
                borderBottom: `1px solid ${palette.base}`, // Changed to Base
                paddingBottom: '20px',
                textAlign: 'center',
                position: 'relative'
            }}
            gridStyles={{
                gap: '10px',
                background: 'transparent'
            }}
            cellStyles={{
                backgroundColor: palette.background,
                border: `1px solid ${palette.base}`, // Changed to Base
                borderRadius: '8px', // Softer cell corners
                boxShadow: 'none',
                fontFamily: "'Playfair Display', serif",
                fontSize: '10pt',
                color: palette.text,
                padding: '4px', // Reduced padding
                // height: 'auto', // Removed to let grid control height
                // aspectRatio: '1', // Removed to prevent forcing square shape
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                position: 'relative'
            }}
            songStyles={{
                fontWeight: 700,
                color: palette.text,
                fontSize: '11pt',
                lineHeight: '1.2',
                marginBottom: '4px'
            }}
            artistStyles={{
                color: palette.base, // Changed to Base for less visual noise
                fontSize: '9pt',
                fontStyle: 'italic',
                fontWeight: 600
            }}
            // Footer with elegant date
            footerStyles={{
                marginTop: '30px',
                borderTop: 'none',
                textAlign: 'center',
                color: palette.base, // Changed to Base
                fontSize: '14px',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                fontFamily: "'Cormorant Garamond', serif"
            }}
            renderCellDecor={renderCellDecor}
            renderCardNumber={(num) => (
                <div style={{
                    position: 'absolute',
                    bottom: '15px',
                    width: '100%',
                    textAlign: 'center',
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '12px',
                    color: palette.base,
                    letterSpacing: '2px',
                    fontStyle: 'italic'
                }}>
                    ~ nº {num} ~
                </div>
            )}
        >
            {/* --- ELABORATE BACKGROUND DECORATIONS (Color 6) --- */}

            {/* Top Left Curve */}
            <div style={{
                position: 'absolute',
                top: '-50px',
                left: '-50px',
                width: '180px',
                height: '180px',
                border: `20px double ${palette.accentExtraLight}`,
                borderRadius: '50%',
                opacity: 0.5,
                zIndex: 0,
                pointerEvents: 'none'
            }} />

            {/* Bottom Right Curve */}
            <div style={{
                position: 'absolute',
                bottom: '-50px',
                right: '-50px',
                width: '220px',
                height: '220px',
                border: `30px solid ${palette.accentLight}`,
                borderRadius: '50%',
                opacity: 0.3,
                zIndex: 0,
                pointerEvents: 'none'
            }} />

            {/* --- SIDE BRANCH DECORATIONS (SVG Shadows - Adapted for Classic) --- */}

            {/* Left Branch */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '10px',
                transform: 'translateY(-50%)',
                width: '45px',
                height: '60%', // Shorter than premium
                opacity: 0.5,
                zIndex: 0
            }}>
                <svg width="100%" height="100%" viewBox="0 0 50 200" preserveAspectRatio="none">
                    {/* Main Stem - Simpler curve */}
                    <path d="M25,0 Q15,50 25,100 T25,200" stroke={palette.accentExtraLight} strokeWidth="2" fill="none" />
                    {/* Leaves */}
                    {Array.from({ length: 8 }).map((_, i) => (
                        <g key={i} transform={`translate(25, ${20 + i * 22})`}>
                            <path d="M0,0 Q-12,-4 -16,0 Q-12,4 0,0" fill={palette.accentExtraLight} opacity="0.8" transform={`rotate(${-15 + (i % 2) * 5}) scale(1.1)`} />
                            <path d="M0,10 Q12,6 16,10 Q12,14 0,10" fill={palette.accentExtraLight} opacity="0.8" transform={`rotate(${15 - (i % 2) * 5}) scale(1.1)`} />
                        </g>
                    ))}
                </svg>
            </div>

            {/* Right Branch */}
            <div style={{
                position: 'absolute',
                top: '50%',
                right: '10px',
                transform: 'translateY(-50%) scaleX(-1)',
                width: '45px',
                height: '60%',
                opacity: 0.5,
                zIndex: 0
            }}>
                <svg width="100%" height="100%" viewBox="0 0 50 200" preserveAspectRatio="none">
                    {/* Main Stem */}
                    <path d="M25,0 Q15,50 25,100 T25,200" stroke={palette.accentExtraLight} strokeWidth="2" fill="none" />
                    {/* Leaves */}
                    {Array.from({ length: 8 }).map((_, i) => (
                        <g key={i} transform={`translate(25, ${20 + i * 22})`}>
                            <path d="M0,0 Q-12,-4 -16,0 Q-12,4 0,0" fill={palette.accentExtraLight} opacity="0.8" transform={`rotate(${-15 + (i % 2) * 5}) scale(1.1)`} />
                            <path d="M0,10 Q12,6 16,10 Q12,14 0,10" fill={palette.accentExtraLight} opacity="0.8" transform={`rotate(${15 - (i % 2) * 5}) scale(1.1)`} />
                        </g>
                    ))}
                </svg>
            </div>



        </BingoCard>
    );
};

export default WeddingClassic;
