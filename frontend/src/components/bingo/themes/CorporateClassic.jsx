import React from 'react';
import BingoCard from '../BingoCard';
import { generateThemePalette } from '../../../utils/colors';

/**
 * Corporate Classic Theme
 * Style: Clean, professional, minimal, grid-focused
 * Font: 'Inter', sans-serif
 * Background: White with slate gray accents
 */
const CorporateClassic = ({
    cells,
    title = "Bingo Musical",
    accentColor = "#475569", // Default Slate
    ...props
}) => {
    const palette = generateThemePalette(accentColor);

    // No specific cell decor for corporate to keep it clean
    const renderCellDecor = () => null;

    return (
        <BingoCard
            {...props}
            cells={cells}
            title={title}
            accentColor={palette.accent}
            themeStyles={{
                fontFamily: "'Inter', sans-serif",
                backgroundColor: palette.background,
                border: 'none',
                borderRadius: '0',
                padding: '40px 50px', // Standard document margin
                boxShadow: 'none',
                position: 'relative'
            }}
            titleStyles={{
                textAlign: 'center',
                fontSize: '32px',
                fontWeight: '800',
                letterSpacing: '-0.5px',
                textTransform: 'uppercase',
                color: palette.text,
                marginBottom: '5px'
            }}
            subtitleStyles={{
                textAlign: 'center',
                color: palette.accent,
                fontWeight: '600',
                fontSize: '14px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
            }}
            headerStyles={{
                marginBottom: '30px',
                paddingBottom: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center' // Centered header
            }}
            gridStyles={{
                gap: '4px', // Tight gap
                background: 'transparent'
            }}
            cellStyles={{
                backgroundColor: palette.background,
                border: `1px solid ${palette.base}`, // Visible border
                borderRadius: '4px',
                boxShadow: `4px 4px 0px ${palette.accentLight}`,
                fontFamily: "'Inter', sans-serif",
                fontSize: '10pt',
                color: palette.text,
                padding: '10px'
            }}
            songStyles={{
                fontWeight: 700,
                color: palette.text,
                fontSize: '10pt',
                marginBottom: '4px'
            }}
            artistStyles={{
                color: palette.accent, // Dynamic Brand Color
                fontSize: '8pt',
                fontWeight: 500
            }}
            footerStyles={{ display: 'none' }}
            renderCellDecor={renderCellDecor}
            renderCardNumber={(num) => (
                <div style={{
                    position: 'absolute',
                    bottom: '15px',
                    width: '100%',
                    textAlign: 'center',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '10px',
                    color: palette.text,
                    opacity: 0.6
                }}>
                    nº {num}
                </div>
            )}
        >


            {/* Document Footer */}
            <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '50px',
                right: '50px',
                borderTop: `1px solid ${palette.accentExtraLight}`,
                paddingTop: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '10px',
                color: palette.base,
                fontWeight: '500'
            }}>
            </div>

        </BingoCard>
    );
};

export default CorporateClassic;
