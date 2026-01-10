import React from 'react';
import BingoCard from '../BingoCard';
import { generateThemePalette } from '../../../utils/colors';

/**
 * NeonGaming Theme
 * Style: Cyberpunk Gaming / Esports / Twitch aesthetic
 * Font: 'Orbitron', 'Rajdhani' (futuristic)
 * Background: Dark with neon gradients and glow effects
 */
const NeonGaming = ({
    cells,
    title = "BINGO",
    accentColor = "#00ffff", // Cyan neon
    eventTitle = "MUSICAL CHALLENGE",
    ...props
}) => {
    const palette = generateThemePalette(accentColor);

    // Animated neon cell decoration
    const renderCellDecor = (index) => (
        <div style={{
            position: 'absolute',
            top: '-2px',
            left: '-2px',
            right: '-2px',
            bottom: '-2px',
            background: `linear-gradient(45deg, ${palette.accent}, ${hexToRgba(accentColor, 0.3)}, ${palette.accent})`,
            borderRadius: '8px',
            opacity: 0.7,
            zIndex: 1,
            animation: `neonPulse ${2 + (index % 3)}s infinite alternate`
        }} />
    );

    // Cyber-style title with glitch effect
    const richTitle = (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <div style={{
                fontSize: '48px',
                fontWeight: '900',
                textTransform: 'uppercase',
                letterSpacing: '4px',
                color: palette.background,
                textShadow: `
                    0 0 10px ${palette.accent},
                    0 0 20px ${palette.accent},
                    0 0 30px ${palette.accent},
                    0 0 40px ${accentColor}
                `,
                fontFamily: "'Orbitron', sans-serif",
                position: 'relative',
                zIndex: 2
            }}>
                {title}
            </div>
            {/* Glitch shadow */}
            <div style={{
                position: 'absolute',
                top: '2px',
                left: '-2px',
                fontSize: '48px',
                fontWeight: '900',
                textTransform: 'uppercase',
                letterSpacing: '4px',
                color: hexToRgba('#ff00ff', 0.7),
                fontFamily: "'Orbitron', sans-serif",
                zIndex: 1,
                transform: 'skewX(-5deg)'
            }}>
                {title}
            </div>
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
                fontFamily: "'Rajdhani', sans-serif",
                background: `linear-gradient(135deg, #0a0a0a 0%, #1a0033 50%, #000a1a 100%)`,
                border: `2px solid ${palette.accent}`,
                borderRadius: '12px',
                padding: '30px',
                margin: '15px',
                position: 'relative',
                boxShadow: `
                    0 0 20px ${hexToRgba(accentColor, 0.5)},
                    inset 0 0 20px ${hexToRgba(accentColor, 0.1)}
                `,
                overflow: 'hidden'
            }}
            titleStyles={{
                textAlign: 'center',
                marginBottom: '10px',
                background: 'none'
            }}
            subtitleStyles={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: '16px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '3px',
                color: palette.accent,
                textShadow: `0 0 10px ${palette.accent}`,
                marginBottom: '20px'
            }}
            headerStyles={{
                textAlign: 'center',
                marginBottom: '30px',
                position: 'relative',
                zIndex: 2
            }}
            gridStyles={{
                gap: '8px',
                background: 'transparent',
                padding: '20px',
                borderRadius: '8px',
                background: hexToRgba('#000000', 0.3)
            }}
            cellStyles={{
                backgroundColor: hexToRgba('#1a1a2e', 0.8),
                border: `1px solid ${palette.accent}`,
                borderRadius: '8px',
                position: 'relative',
                overflow: 'hidden',
                backdropFilter: 'blur(5px)',
                transition: 'all 0.3s ease',
                boxShadow: `inset 0 0 10px ${hexToRgba(accentColor, 0.2)}`
            }}
            songStyles={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: '11pt',
                fontWeight: '700',
                color: palette.background,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                textShadow: `0 0 5px ${hexToRgba(accentColor, 0.8)}`,
                position: 'relative',
                zIndex: 2
            }}
            artistStyles={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: '8pt',
                color: palette.accent,
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                textShadow: `0 0 8px ${palette.accent}`,
                position: 'relative',
                zIndex: 2
            }}
            footerStyles={{ display: 'none' }}
            renderCellDecor={renderCellDecor}
            renderCardNumber={(num) => (
                <div style={{
                    position: 'absolute',
                    bottom: '20px',
                    width: '100%',
                    textAlign: 'center',
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: '12px',
                    fontWeight: '700',
                    letterSpacing: '2px',
                    color: palette.accent,
                    textShadow: `0 0 10px ${palette.accent}`
                }}>
                    <div style={{
                        display: 'inline-block',
                        padding: '8px 16px',
                        border: `1px solid ${palette.accent}`,
                        borderRadius: '20px',
                        background: hexToRgba(accentColor, 0.1),
                        boxShadow: `0 0 15px ${hexToRgba(accentColor, 0.5)}`
                    }}>
                        PLAYER #{String(num).padStart(3, '0')}
                    </div>
                </div>
            )}
        >
            {/* Corner circuit board decorations */}
            {[
                { top: '10px', left: '10px' },
                { top: '10px', right: '10px' },
                { bottom: '10px', left: '10px' },
                { bottom: '10px', right: '10px' }
            ].map((position, index) => (
                <div
                    key={index}
                    style={{
                        position: 'absolute',
                        ...position,
                        width: '40px',
                        height: '40px',
                        zIndex: 1
                    }}
                >
                    <svg width="40" height="40" viewBox="0 0 40 40">
                        <path
                            d="M5,5 L35,5 L35,35 L5,35 Z"
                            fill="none"
                            stroke={palette.accent}
                            strokeWidth="1"
                            opacity="0.6"
                        />
                        <circle cx="10" cy="10" r="2" fill={palette.accent} opacity="0.8" />
                        <circle cx="30" cy="10" r="2" fill={palette.accent} opacity="0.8" />
                        <circle cx="10" cy="30" r="2" fill={palette.accent} opacity="0.8" />
                        <circle cx="30" cy="30" r="2" fill={palette.accent} opacity="0.8" />
                        <path
                            d="M10,10 L30,30 M30,10 L10,30"
                            stroke={palette.accent}
                            strokeWidth="0.5"
                            opacity="0.4"
                        />
                    </svg>
                </div>
            ))}

            {/* Background grid pattern */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `
                    linear-gradient(${hexToRgba(accentColor, 0.1)} 1px, transparent 1px),
                    linear-gradient(90deg, ${hexToRgba(accentColor, 0.1)} 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px',
                opacity: 0.3,
                zIndex: 0
            }} />

            {/* Add CSS animation */}
            <style jsx>{`
                @keyframes neonPulse {
                    0% { opacity: 0.4; }
                    100% { opacity: 0.9; }
                }
            `}</style>
        </BingoCard>
    );
};

// Helper function to convert hex to rgba
const hexToRgba = (hex, alpha) => {
    let c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split('');
        if (c.length == 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = '0x' + c.join('');
        return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',' + alpha + ')';
    }
    return hex;
};

export default NeonGaming;
