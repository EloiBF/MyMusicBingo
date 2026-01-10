import React from 'react';
import BingoCard from '../BingoCard';
import { generateThemePalette } from '../../../utils/colors';

/**
 * Corporate Premium Theme
 * Style: Modern, tech, startup vibe, conference style
 * Font: 'Outfit', sans-serif
 * Background: White with gradient accents (simulated with CSS)
 */
const CorporatePremium = ({
    cells,
    title = "Bingo Musical",
    accentColor = "#0ea5e9", // Sky blue - modern corporate
    ...props
}) => {
    const palette = generateThemePalette(accentColor);

    // Techy decorative dots
    const renderCellDecor = (index) => {
        if (index % 2 !== 0) return null;
        return (
            <div style={{
                position: 'absolute',
                bottom: '4px',
                right: '4px',
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                backgroundColor: palette.accentExtraLight
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
                border: 'none',
                borderRadius: '0',
                padding: '40px 50px',
                position: 'relative',
                boxShadow: 'none',
                overflow: 'hidden'
            }}
            titleStyles={{
                color: palette.text,
                fontSize: '40px',
                fontWeight: '800',
                letterSpacing: '-1px',
                lineHeight: 1,
                textAlign: 'left'
            }}
            subtitleStyles={{
                color: palette.accent,
                fontSize: '14px',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                textAlign: 'left',
                marginBottom: '5px'
            }}
            headerStyles={{
                marginBottom: '40px',
                paddingBottom: '20px',
                display: 'flex',
                alignItems: 'flex-start',
                flexDirection: 'column-reverse',
                borderLeft: `6px solid ${palette.accent}`,
                paddingLeft: '20px'
            }}
            gridStyles={{
                gap: '12px',
                background: 'transparent'
            }}
            cellStyles={{
                backgroundColor: palette.background,
                border: `1px solid ${palette.accent}`,
                borderRadius: '6px',
                boxShadow: `4px 4px 0px ${palette.accentLight}`,
                fontFamily: "'Outfit', sans-serif",
                color: palette.text,
                fontWeight: '500',
                padding: '12px'
            }}
            songStyles={{
                color: palette.text,
                fontWeight: 700,
                fontSize: '11pt',
                marginBottom: '4px'
            }}
            artistStyles={{
                color: palette.base,
                fontWeight: 600,
                fontSize: '9pt'
            }}
            footerStyles={{ display: 'none' }}
            renderCellDecor={renderCellDecor}
            renderCardNumber={(num) => (
                <div style={{
                    position: 'absolute',
                    bottom: '0',
                    right: '0',
                    background: palette.accent,
                    color: palette.background,
                    padding: '4px 12px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    borderTopLeftRadius: '8px'
                }}>
                    nº {String(num).padStart(2, '0')}
                </div>
            )}
        >
            {/* Geometric Background Accent */}
            <div style={{
                position: 'absolute',
                top: '-50px',
                right: '-50px',
                width: '150px',
                height: '150px',
                background: `linear-gradient(135deg, ${palette.accentLight} 0%, transparent 100%)`,
                borderRadius: '50%',
                zIndex: 0,
                pointerEvents: 'none'
            }} />


        </BingoCard>
    );
};

export default CorporatePremium;
