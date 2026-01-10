import React from 'react';
import BingoCard from '../BingoCard';
import { generateThemePalette } from '../../../utils/colors';

/**
 * Birthday Premium Theme
 * Style: Elegant, luxury, "Gatsby" style
 * Font: 'Playfair Display', serif
 * Background: White with elegant gold borders
 */
const BirthdayPremium = ({
    cells,
    title = "Bingo Musical",
    accentColor = "#d946ef", // Fuchsia - premium birthday
    ...props
}) => {
    const palette = generateThemePalette(accentColor);

    // Custom cell decoration: None for ultra clean look
    const renderCellDecor = () => null;

    // Elegant text-only title separator
    const richTitle = (
        <span>
            {title}
        </span>
    );

    return (
        <BingoCard
            {...props}
            cells={cells}
            title={richTitle}
            accentColor={palette.accent}
            themeStyles={{
                fontFamily: "'Bodoni Moda', 'Playfair Display', serif",
                backgroundColor: palette.background,
                // Luxury Card Stock Feel
                border: `1px solid ${palette.accent}`,
                outline: '15px solid white', // Inner white margin
                boxShadow: `0 0 0 16px ${palette.accent}`,  // Outer thick border
                margin: '20px', // Space for outer border
                padding: '40px',
                position: 'relative'
            }}
            titleStyles={{
                color: palette.text,
                fontSize: '36px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                fontWeight: '700',
                fontFamily: "'Playfair Display', serif",
                marginTop: '10px'
            }}
            subtitleStyles={{
                fontFamily: "'Bodoni Moda', 'Playfair Display', serif",
                fontStyle: 'italic',
                fontSize: '14px',
                color: palette.accent
            }}
            headerStyles={{
                borderBottom: `1px solid ${palette.accent}`,
                borderTop: `1px solid ${palette.accent}`,
                padding: '15px 0',
                marginBottom: '40px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '5px'
            }}
            gridStyles={{
                gap: '0', // Full grid
                background: palette.text, // Black inner lines for sharpness
                border: `2px solid ${palette.text}` // Sharp black outer grid border
            }}
            cellStyles={{
                backgroundColor: palette.background,
                border: `1px solid ${palette.text}`, // Sharp black internal lines
                borderRadius: '0',
                fontFamily: "'Bodoni Moda', 'Playfair Display', serif",
                color: palette.text,
                padding: '10px'
            }}
            songStyles={{
                letterSpacing: '0.5px',
                fontSize: '11pt',
                fontWeight: 600,
                textTransform: 'uppercase',
                color: palette.text
            }}
            artistStyles={{
                color: palette.accent,
                fontSize: '8pt',
                fontStyle: 'italic',
                fontWeight: 600,
                fontFamily: "'Inter', sans-serif",
                marginTop: '4px'
            }}
            // Custom footer for "Est. 2024" feel
            footerStyles={{ display: 'none' }}
            renderCellDecor={renderCellDecor}
            renderCardNumber={(num) => (
                <div style={{
                    position: 'absolute',
                    bottom: '20px',
                    width: '100%',
                    textAlign: 'center',
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '12px',
                    letterSpacing: '2px',
                    color: palette.accent
                }}>
                    — nº {num} —
                </div>
            )}
        >




        </BingoCard>
    );
};

export default BirthdayPremium;
