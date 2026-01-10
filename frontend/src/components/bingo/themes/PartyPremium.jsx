import React from 'react';
import BingoCard from '../BingoCard';
import { generateThemePalette } from '../../../utils/colors';

/**
 * Party Premium Theme
 * Style: Neo-Brutalist, Nightclub, Bold
 * Font: 'Outfit', sans-serif (Bold)
 * Background: White with high contrast neon borders
 */
const PartyPremium = ({
    cells,
    title = "Bingo Musical",
    accentColor = "#8b5cf6", // Purple - premium party
    ...props
}) => {
    const palette = generateThemePalette(accentColor);

    // Custom cell decoration: Neon circles
    const renderCellDecor = (index) => {
        if (index % 6 !== 0) return null;
        return (
            <div style={{
                position: 'absolute',
                bottom: '6px',
                right: '6px',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: palette.accent,
                border: `2px solid ${palette.text}`,
                boxShadow: `2px 2px 0px ${palette.text}`
            }} />
        );
    };

    return (
        <BingoCard
            {...props}
            cells={cells}
            title={title}
            accentColor={palette.accent}
            themeStyles={{
                fontFamily: "'Outfit', sans-serif",
                backgroundColor: palette.background,
                border: `6px solid ${palette.text}`,
                borderRadius: '0px',
                padding: '30px',
            }}
            // NEO Title Styling
            titleStyles={{
                color: palette.text,
                fontSize: '64px',
                fontWeight: '900',
                textTransform: 'uppercase',
                letterSpacing: '-3px',
                textShadow: `5px 5px 0px ${palette.accent}`
            }}
            headerStyles={{
                marginBottom: '40px',
                borderBottom: `6px solid ${palette.text}`, // Thick divider
                paddingBottom: '10px',
                textAlign: 'left' // Brutalist alignment
            }}
            gridStyles={{
                gap: '16px',
                background: 'transparent'
            }}
            cellStyles={{
                backgroundColor: palette.background,
                border: `3px solid ${palette.text}`,
                borderRadius: '0px',
                boxShadow: `6px 6px 0px ${palette.text}`,
                fontFamily: "'Outfit', sans-serif",
            }}
            songStyles={{
                fontWeight: '900',
                color: palette.text,
                textTransform: 'uppercase',
                fontSize: '11pt',
                letterSpacing: '-0.5px'
            }}
            artistStyles={{
                color: palette.background,
                fontWeight: '700',
                fontSize: '8pt',
                background: palette.accent,
                padding: '2px 6px',
                marginTop: '6px',
                border: `1px solid ${palette.text}`,
                boxShadow: `2px 2px 0px ${palette.text}`,
                display: 'inline-block'
            }}
            renderCellDecor={renderCellDecor}
            renderCardNumber={(num) => (
                <div style={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '30px',
                    right: '30px',
                    borderTop: `3px dashed ${palette.text}`,
                    paddingTop: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontFamily: 'monospace',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    color: palette.text
                }}>
                    <span>nº {String(num).padStart(4, '0')}</span>
                    <span>VIP ACCESS</span>
                </div>
            )}
        >
            {/* "Music" stamp feeling */}
            <div style={{
                position: 'absolute',
                top: '-20px',
                right: '-10px',
                fontSize: '22px',
                fontWeight: '900',
                border: `4px solid ${palette.text}`,
                background: palette.accent,
                padding: '8px 16px',
                transform: 'rotate(-8deg)',
                boxShadow: `6px 6px 0px ${palette.text}`,
                zIndex: 11
            }}>
                VIBES ONLY
            </div>



        </BingoCard>
    );
};

export default PartyPremium;
