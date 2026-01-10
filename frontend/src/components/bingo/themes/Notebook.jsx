import React from 'react';
import BingoCard from '../BingoCard';

/**
 * Notebook Theme
 * Style: Classic Notebook / Graph Paper / School
 * Font: 'Courier New', monospace
 * Background: White with grid lines like notebook paper
 */
const Notebook = ({
    cells,
    title = "BINGO MUSICAL",
    eventTitle = "Clásico",
    ...props
}) => {
    // Simple pencil mark decoration
    const renderCellDecor = (index) => {
        if (index % 5 === 0) {
            return (
                <div style={{
                    position: 'absolute',
                    top: '2px',
                    right: '2px',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    border: '1px solid #333333',
                    opacity: 0.4
                }} />
            );
        }
        return null;
    };

    return (
        <BingoCard
            {...props}
            cells={cells}
            title={title}
            eventTitle={eventTitle}
            themeStyles={{
                fontFamily: "'Courier New', monospace",
                backgroundColor: '#ffffff',
                border: '2px solid #333333',
                borderRadius: '8px',
                padding: '35px',
                margin: '10px',
                position: 'relative',
                boxShadow: '2px 2px 0px #666666',
                backgroundImage: `
                    repeating-linear-gradient(
                        0deg,
                        transparent,
                        transparent 19px,
                        #cccccc 19px,
                        #cccccc 20px
                    ),
                    repeating-linear-gradient(
                        90deg,
                        transparent,
                        transparent 19px,
                        #cccccc 19px,
                        #cccccc 20px
                    )
                `
            }}
            titleStyles={{
                color: '#000000',
                fontSize: '32px',
                fontWeight: '700',
                fontFamily: "'Courier New', monospace",
                textTransform: 'uppercase',
                marginBottom: '8px',
                letterSpacing: '1px',
                textDecoration: 'underline',
                textDecorationColor: '#333333',
                textDecorationThickness: '2px'
            }}
            subtitleStyles={{
                fontFamily: "'Courier New', monospace",
                fontWeight: '400',
                fontSize: '12px',
                color: '#666666',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginBottom: '15px'
            }}
            headerStyles={{
                marginBottom: '25px',
                textAlign: 'left'
            }}
            gridStyles={{
                gap: '0',
                background: 'transparent',
                border: '2px solid #333333'
            }}
            cellStyles={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid #333333',
                borderRadius: '0',
                fontFamily: "'Courier New', monospace",
                padding: '8px',
                textAlign: 'center',
                position: 'relative'
            }}
            songStyles={{
                fontWeight: '700',
                color: '#000000',
                fontSize: '10pt',
                marginBottom: '2px',
                lineHeight: 1.1,
                fontFamily: "'Courier New', monospace"
            }}
            artistStyles={{
                color: '#333333',
                fontWeight: '400',
                fontSize: '8pt',
                fontFamily: "'Courier New', monospace",
                fontStyle: 'normal'
            }}
            footerStyles={{
                fontSize: '9px',
                color: '#666666',
                marginTop: '15px',
                textAlign: 'center',
                fontFamily: "'Courier New', monospace",
                borderTop: '1px solid #333333',
                paddingTop: '10px'
            }}
            renderCellDecor={renderCellDecor}
            renderCardNumber={(num) => (
                <div style={{
                    textAlign: 'left',
                    marginTop: '10px',
                    fontFamily: "'Courier New', monospace",
                    fontWeight: '400',
                    color: '#333333',
                    fontSize: '11px'
                }}>
                    Tarjeta: {String(num).padStart(3, '0')}
                </div>
            )}
        >
            {/* Left margin line like notebook */}
            <div style={{
                position: 'absolute',
                top: '0',
                left: '50px',
                width: '2px',
                height: '100%',
                backgroundColor: '#ff0000',
                opacity: 0.3,
                zIndex: 0
            }} />

            {/* Hole punches */}
            {Array.from({ length: 3 }).map((_, i) => (
                <div
                    key={i}
                    style={{
                        position: 'absolute',
                        top: `${80 + i * 120}px`,
                        left: '15px',
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        border: '1px solid #333333',
                        backgroundColor: '#ffffff',
                        zIndex: 1
                    }}
                />
            ))}

            {/* Pencil mark in corner */}
            <div style={{
                position: 'absolute',
                bottom: '20px',
                right: '20px',
                fontSize: '14px',
                color: '#333333',
                opacity: 0.6,
                transform: 'rotate(-5deg)',
                fontFamily: "'Courier New', monospace",
                fontStyle: 'italic'
            }}>
                [x] Bueno
            </div>
        </BingoCard>
    );
};

export default Notebook;
