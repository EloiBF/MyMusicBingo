import React from 'react';
import BingoCard from '../BingoCard';
import { generateThemePalette } from '../../../utils/colors';

/**
 * Party Classic Theme
 * Style: Vibrant, "Neo" Pop Art, energetic
 * Font: 'Pacifico' (Header), 'Inter' (Body)
 * Background: White
 */
const PartyClassic = ({
    cells,
    title = "Bingo Musical",
    accentColor = "#ec4899", // Hot pink - party theme
    ...props
}) => {
    const palette = generateThemePalette(accentColor);

    // Custom cell decoration: Music Notes & Shapes
    const renderCellDecor = (index) => {
        if (index % 4 !== 0) return null;

        const decorColors = [palette.accent, palette.base, palette.accentLight];
        const color = decorColors[index % decorColors.length];

        return (
            <div style={{
                position: 'absolute',
                top: '5px',
                right: '5px',
                color: color,
                fontSize: '14px',
                opacity: 0.8,
                transform: `rotate(${index * 15}deg)`
            }}>
                ♪
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
                fontFamily: "'Poppins', sans-serif",
                backgroundColor: palette.background,
                border: 'none', // Removed heavy border
                borderRadius: '0', // Square corners
                padding: '40px 30px', // More breathing room
                boxShadow: 'none',
                position: 'relative',
                overflow: 'hidden'
            }}
            // Custom Title with Dancers
            titleStyles={{
                color: palette.accent,
                fontSize: '48px',
                fontWeight: '800',
                fontFamily: "'Fredoka One', cursive",
                textShadow: `3px 3px 0px ${palette.accentLight}`,
                marginBottom: '10px',
                letterSpacing: '1px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '15px'
            }}
            headerStyles={{
                marginBottom: '30px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}
            gridStyles={{
                gap: '12px',
                background: 'transparent'
            }}
            cellStyles={{
                backgroundColor: palette.background,
                border: `2px solid ${palette.text}`,
                borderRadius: '8px',
                boxShadow: `4px 4px 0px ${palette.accent}`, // Pop shadow
                fontFamily: "'Inter', sans-serif"
            }}
            songStyles={{
                fontWeight: '800',
                color: palette.text,
                fontSize: '11pt'
            }}
            artistStyles={{
                color: palette.accent,
                fontWeight: '700'
            }}
            renderCellDecor={renderCellDecor}
            renderCardNumber={(num) => (
                <div style={{
                    textAlign: 'center',
                    marginTop: '25px',
                    fontFamily: "'Pacifico', cursive",
                    color: palette.accent,
                    fontSize: '14px',
                }}>
                    Party Card #{num}
                </div>
            )}
        >
            {/* --- TITLE DECORATION (Dancers) --- */}
            {/* This overrides the default title text to include emojis */}
            <div style={{
                position: 'absolute',
                top: '40px',
                left: 0,
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                pointerEvents: 'none'
            }}>
                <span style={{ fontSize: '42px', marginRight: '260px', transform: 'rotate(-10deg)' }}>💃</span>
                <span style={{ fontSize: '42px', marginLeft: '260px', transform: 'rotate(10deg)' }}>🕺</span>
            </div>

            {/* --- BACKGROUND DECORATION (Confetti & Shapes) --- */}

            {/* Top Left Burst */}
            <div style={{ position: 'absolute', top: '20px', left: '20px', opacity: 0.6 }}>
                <div style={{ position: 'absolute', fontSize: '24px', color: palette.accent, transform: 'rotate(15deg)' }}>★</div>
                <div style={{ position: 'absolute', top: '20px', left: '30px', fontSize: '18px', color: palette.accentLight }}>●</div>
                <div style={{ position: 'absolute', top: '40px', left: '10px', fontSize: '20px', color: palette.accentExtraLight, transform: 'rotate(-20deg)' }}>▲</div>
            </div>

            {/* Bottom Right Burst */}
            <div style={{ position: 'absolute', bottom: '20px', right: '20px', opacity: 0.6 }}>
                <div style={{ position: 'absolute', fontSize: '24px', color: palette.accent, transform: 'rotate(-15deg)' }}>★</div>
                <div style={{ position: 'absolute', bottom: '20px', right: '30px', fontSize: '18px', color: palette.accentLight }}>●</div>
                <div style={{ position: 'absolute', bottom: '40px', right: '10px', fontSize: '20px', color: palette.accentExtraLight, transform: 'rotate(20deg)' }}>▲</div>
            </div>

            {/* Random Confetti Background */}
            <div style={{ position: 'absolute', top: '150px', left: '10%', fontSize: '14px', color: palette.accentLight, opacity: 0.4 }}>✦</div>
            <div style={{ position: 'absolute', top: '40%', right: '5%', fontSize: '16px', color: palette.accent, opacity: 0.3 }}>●</div>
            <div style={{ position: 'absolute', bottom: '150px', left: '15%', fontSize: '20px', color: palette.accentExtraLight, opacity: 0.4, transform: 'rotate(45deg)' }}>■</div>

        </BingoCard>
    );
};

export default PartyClassic;
