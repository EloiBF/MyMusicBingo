import React from 'react';
import BingoCard from '../BingoCard';
import { generateThemePalette } from '../../../utils/colors';

/**
 * VintageVinyl Theme
 * Style: Retro 70s/80s with vinyl records, warm colors, and vintage typography
 * Font: 'Bebas Neue', 'Courier New' (vintage typewriter)
 * Background: Aged paper texture with vinyl disc decorations
 */
const VintageVinyl = ({
    cells,
    title = "MUSICAL BINGO",
    accentColor = "#8B4513", // Vintage brown
    eventTitle = "Vinyl Collection",
    ...props
}) => {
    const palette = generateThemePalette(accentColor);

    // Vinyl record decoration for cells
    const renderCellDecor = (index) => (
        <div style={{
            position: 'absolute',
            top: '-15px',
            right: '-15px',
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            background: `radial-gradient(circle at 30% 30%, #2a2a2a, #1a1a1a, #0a0a0a)`,
            border: '2px solid #333',
            boxShadow: 'inset 0 0 5px rgba(0,0,0,0.5)',
            zIndex: 1,
            opacity: 0.7
        }}>
            {/* Vinyl grooves */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#ff6b6b',
                border: '1px solid #fff'
            }} />
        </div>
    );

    // Vintage-style title with tape effect
    const richTitle = (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <div style={{
                fontSize: '52px',
                fontWeight: '900',
                textTransform: 'uppercase',
                letterSpacing: '3px',
                color: '#2c1810',
                fontFamily: "'Bebas Neue', cursive",
                position: 'relative',
                transform: 'rotate(-1deg)',
                textShadow: '2px 2px 0px rgba(255,255,255,0.3)'
            }}>
                {title}
            </div>
            {/* Washi tape effect */}
            <div style={{
                position: 'absolute',
                top: '-8px',
                right: '-20px',
                width: '80px',
                height: '25px',
                background: 'linear-gradient(45deg, rgba(255,223,186,0.8), rgba(255,236,179,0.8))',
                transform: 'rotate(45deg)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                zIndex: -1
            }} />
        </div>
    );

    return (
        <BingoCard
            {...props}
            cells={cells}
            title={richTitle}
            eventTitle={eventTitle}
            accentColor={palette.accent}
            themeStyles={{
                fontFamily: "'Courier New', monospace",
                background: `
                    linear-gradient(135deg, #f4e8d0 0%, #e8dcc0 50%, #f4e8d0 100%),
                    repeating-linear-gradient(
                        45deg,
                        transparent,
                        transparent 10px,
                        rgba(139, 69, 19, 0.03) 10px,
                        rgba(139, 69, 19, 0.03) 20px
                    )
                `,
                border: '3px solid #8B4513',
                borderRadius: '8px',
                padding: '35px',
                margin: '20px',
                position: 'relative',
                boxShadow: `
                    0 0 0 1px rgba(139, 69, 19, 0.3),
                    0 5px 15px rgba(0, 0, 0, 0.3),
                    inset 0 0 30px rgba(139, 69, 19, 0.1)
                `
            }}
            titleStyles={{
                textAlign: 'center',
                marginBottom: '15px',
                background: 'none'
            }}
            subtitleStyles={{
                fontFamily: "'Courier New', monospace",
                fontSize: '14px',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '4px',
                color: '#8B4513',
                opacity: 0.8,
                marginBottom: '25px'
            }}
            headerStyles={{
                textAlign: 'center',
                marginBottom: '35px',
                position: 'relative',
                zIndex: 2
            }}
            gridStyles={{
                gap: '12px',
                background: 'transparent',
                padding: '20px'
            }}
            cellStyles={{
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                border: '2px solid #8B4513',
                borderRadius: '4px',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: `
                    inset 0 0 10px rgba(139, 69, 19, 0.1),
                    0 2px 4px rgba(0, 0, 0, 0.1)
                `,
                backdropFilter: 'blur(2px)'
            }}
            songStyles={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: '12pt',
                fontWeight: '700',
                color: '#2c1810',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                position: 'relative',
                zIndex: 2,
                lineHeight: 1.2
            }}
            artistStyles={{
                fontFamily: "'Courier New', monospace",
                fontSize: '8pt',
                color: '#8B4513',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                position: 'relative',
                zIndex: 2,
                fontStyle: 'italic'
            }}
            footerStyles={{ display: 'none' }}
            renderCellDecor={renderCellDecor}
            renderCardNumber={(num) => (
                <div style={{
                    position: 'absolute',
                    bottom: '25px',
                    width: '100%',
                    textAlign: 'center',
                    fontFamily: "'Courier New', monospace",
                    fontSize: '11px',
                    fontWeight: '700',
                    letterSpacing: '2px',
                    color: '#2c1810'
                }}>
                    <div style={{
                        display: 'inline-block',
                        padding: '6px 12px',
                        border: '2px solid #8B4513',
                        borderRadius: '4px',
                        background: 'rgba(255, 255, 255, 0.8)',
                        transform: 'rotate(-1deg)'
                    }}>
                        RECORD #{String(num).padStart(3, '0')}
                    </div>
                </div>
            )}
        >
            {/* Corner vintage decorations */}
            {[
                { top: '15px', left: '15px', rotation: '0deg' },
                { top: '15px', right: '15px', rotation: '90deg' },
                { bottom: '15px', left: '15px', rotation: '270deg' },
                { bottom: '15px', right: '15px', rotation: '180deg' }
            ].map((position, index) => (
                <div
                    key={index}
                    style={{
                        position: 'absolute',
                        ...position,
                        width: '35px',
                        height: '35px',
                        zIndex: 1,
                        transform: `rotate(${position.rotation})`
                    }}
                >
                    <svg width="35" height="35" viewBox="0 0 35 35">
                        <path
                            d="M5,5 L30,5 L30,30 L5,30 Z"
                            fill="none"
                            stroke="#8B4513"
                            strokeWidth="2"
                            opacity="0.6"
                        />
                        <path
                            d="M10,10 L25,10 M10,17.5 L25,17.5 M10,25 L20,25"
                            stroke="#8B4513"
                            strokeWidth="1"
                            opacity="0.4"
                        />
                    </svg>
                </div>
            ))}

            {/* Vintage paper texture overlay */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `
                    repeating-linear-gradient(
                        90deg,
                        transparent,
                        transparent 2px,
                        rgba(139, 69, 19, 0.02) 2px,
                        rgba(139, 69, 19, 0.02) 4px
                    ),
                    repeating-linear-gradient(
                        0deg,
                        transparent,
                        transparent 2px,
                        rgba(139, 69, 19, 0.02) 2px,
                        rgba(139, 69, 19, 0.02) 4px
                    )
                `,
                opacity: 0.5,
                zIndex: 0,
                pointerEvents: 'none'
            }} />

            {/* Vinyl record corner decoration */}
            <div style={{
                position: 'absolute',
                bottom: '20px',
                right: '20px',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: `radial-gradient(circle at 30% 30%, #2a2a2a, #1a1a1a, #0a0a0a)`,
                border: '3px solid #333',
                boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
                zIndex: 1,
                opacity: 0.8
            }}>
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '15px',
                    height: '15px',
                    borderRadius: '50%',
                    background: '#ff6b6b',
                    border: '2px solid #fff'
                }} />
            </div>
        </BingoCard>
    );
};

export default VintageVinyl;
