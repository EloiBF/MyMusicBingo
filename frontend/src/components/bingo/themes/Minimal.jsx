import React from 'react';
import BingoCard from '../BingoCard';

/**
 * Minimal Theme
 * Style: Ultra Minimal / Clean / Black & White
 * Font: 'Inter', sans-serif
 * Background: Pure white with black text - no colors
 */
const Minimal = ({
    cells,
    title = "BINGO",
    eventTitle = "Musical",
    ...props
}) => {
    // No decoration for ultra clean look
    const renderCellDecor = () => null;

    return (
        <BingoCard
            {...props}
            cells={cells}
            title={title}
            eventTitle={eventTitle}
            themeStyles={{
                fontFamily: "'Inter', sans-serif",
                backgroundColor: '#ffffff',
                border: '1px solid #000000',
                borderRadius: '0',
                padding: '40px',
                margin: '0',
                position: 'relative',
                boxShadow: 'none'
            }}
            titleStyles={{
                color: '#000000',
                fontSize: '36px',
                fontWeight: '900',
                fontFamily: "'Inter', sans-serif",
                textTransform: 'uppercase',
                letterSpacing: '2px',
                marginBottom: '10px',
                lineHeight: 1
            }}
            subtitleStyles={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: '400',
                fontSize: '14px',
                color: '#666666',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginBottom: '20px'
            }}
            headerStyles={{
                marginBottom: '30px',
                textAlign: 'center',
                borderBottom: '1px solid #000000',
                paddingBottom: '20px'
            }}
            gridStyles={{
                gap: '8px',
                background: 'transparent'
            }}
            cellStyles={{
                backgroundColor: '#ffffff',
                border: '1px solid #000000',
                borderRadius: '0',
                fontFamily: "'Inter', sans-serif",
                padding: '12px',
                textAlign: 'center'
            }}
            songStyles={{
                fontWeight: '700',
                color: '#000000',
                fontSize: '11pt',
                marginBottom: '4px',
                lineHeight: 1.2
            }}
            artistStyles={{
                color: '#666666',
                fontWeight: '400',
                fontSize: '9pt',
                fontStyle: 'italic'
            }}
            footerStyles={{
                fontSize: '10px',
                color: '#999999',
                marginTop: '20px',
                textAlign: 'center'
            }}
            renderCellDecor={renderCellDecor}
            renderCardNumber={(num) => (
                <div style={{
                    textAlign: 'center',
                    marginTop: '15px',
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: '400',
                    color: '#666666',
                    fontSize: '12px'
                }}>
                    Card #{num}
                </div>
            )}
        />
    );
};

export default Minimal;
