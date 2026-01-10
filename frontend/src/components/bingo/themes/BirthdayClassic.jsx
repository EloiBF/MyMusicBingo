import React from 'react';
import BingoCard from '../BingoCard';
import { generateThemePalette } from '../../../utils/colors';

/**
 * Birthday Classic Theme (Redesigned)
 * Style: Super Festive / Confetti Explosion / Birthday Party
 * Font: 'Fredoka One' (Header), 'Quicksand' (Body) 
 * Background: White with rainbow confetti and balloon decorations
 */
const BirthdayClassic = ({
    cells,
    title = "BINGO DE CUMPLEAÑOS",
    accentColor = "#ff1744", // Vibrant red
    ...props
}) => {
    const palette = generateThemePalette(accentColor);

    // Enhanced confetti and balloon decorations
    const renderCellDecor = (index) => {
        const confettiColors = ['#ff1744', '#00e676', '#2979ff', '#ffea00', '#ff6d00', '#d500f9'];
        const decorations = ['🎂', '🎈', '🎉', '🎁', '🌟', '🎊'];
        
        const color = confettiColors[index % confettiColors.length];
        
        // Confetti dots
        if (index % 2 === 0) {
            return (
                <div style={{
                    position: 'absolute',
                    top: '3px',
                    right: '3px',
                    width: '8px',
                    height: '8px',
                    borderRadius: index % 4 === 0 ? '50%' : '0%',
                    backgroundColor: color,
                    transform: `rotate(${index * 45}deg)`,
                    opacity: 0.8,
                    zIndex: 1
                }} />
            );
        }
        
        // Birthday emojis
        if (index % 3 === 0) {
            return (
                <div style={{
                    position: 'absolute',
                    bottom: '2px',
                    left: '2px',
                    fontSize: '10px',
                    opacity: 0.7,
                    transform: `rotate(${-10 + index * 5}deg)`
                }}>
                    {decorations[index % decorations.length]}
                </div>
            );
        }
        
        return null;
    };

    return (
        <BingoCard
            {...props}
            cells={cells}
            title={title}
            accentColor={palette.accent}
            titleEmojis={{ left: '🎂', right: '🎈' }}
            themeStyles={{
                fontFamily: "'Quicksand', sans-serif",
                backgroundColor: '#fff8f8',
                border: '3px dashed #ff1744',
                borderRadius: '24px',
                padding: '30px',
                margin: '15px',
                position: 'relative',
                overflow: 'visible',
                boxShadow: '0 8px 25px rgba(255, 23, 68, 0.15)'
            }}
            titleStyles={{
                color: '#d50000',
                fontSize: '46px',
                fontWeight: '900',
                fontFamily: "'Fredoka One', cursive",
                textShadow: '3px 3px 0px rgba(255, 23, 68, 0.3)',
                marginBottom: '12px',
                letterSpacing: '2px',
                lineHeight: 1.1,
                background: 'linear-gradient(45deg, #ff1744, #ff6b6b)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
            }}
            subtitleStyles={{
                fontFamily: "'Quicksand', sans-serif",
                fontWeight: '800',
                letterSpacing: '2px',
                fontSize: '14px',
                color: '#ff1744',
                textTransform: 'uppercase',
                marginBottom: '8px'
            }}
            headerStyles={{
                marginBottom: '30px',
                borderBottom: '4px wavy #ffea00',
                paddingBottom: '20px',
                position: 'relative',
                background: 'linear-gradient(90deg, transparent, #ffea00 20%, #ffea00 80%, transparent)',
                backgroundSize: '100% 4px',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'bottom'
            }}
            gridStyles={{
                gap: '15px',
                background: 'transparent',
                padding: '10px'
            }}
            cellStyles={{
                background: 'linear-gradient(135deg, #ffffff, #fff5f5)',
                border: '2px solid #ff1744',
                borderRadius: '18px',
                boxShadow: '4px 4px 0px #ffea00, 8px 8px 0px rgba(255, 23, 68, 0.2)',
                fontFamily: "'Quicksand', sans-serif",
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'visible',
                padding: '8px'
            }}
            songStyles={{
                fontWeight: '800',
                fontSize: '11pt',
                marginBottom: '4px',
                color: '#d50000',
                lineHeight: 1.2,
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
            }}
            artistStyles={{
                color: '#ff1744',
                fontWeight: '700',
                fontSize: '8pt',
                fontStyle: 'italic',
                textTransform: 'capitalize'
            }}
            renderCellDecor={renderCellDecor}
            renderCardNumber={(num) => (
                <div style={{
                    textAlign: 'center',
                    marginTop: '15px',
                    fontFamily: "'Fredoka One', cursive",
                    fontWeight: '900',
                    background: 'linear-gradient(45deg, #ff1744, #ffea00)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontSize: '18px',
                    padding: '8px',
                    borderRadius: '12px',
                    border: '2px solid #ffea00',
                    display: 'inline-block'
                }}>
                    🎉 FIESTA #{num} 🎉
                </div>
            )}
        >
            {/* Enhanced floating decorations */}
            <div style={{
                position: 'absolute',
                top: '-25px',
                right: '25px',
                fontSize: '28px',
                opacity: 0.8,
                transform: 'rotate(15deg)',
                zIndex: 1,
                animation: 'float 3s ease-in-out infinite'
            }}>
                🎈
            </div>

            <div style={{
                position: 'absolute',
                top: '-15px',
                left: '20px',
                fontSize: '24px',
                opacity: 0.7,
                transform: 'rotate(-12deg)',
                zIndex: 1,
                animation: 'float 4s ease-in-out infinite reverse'
            }}>
                🎁
            </div>

            <div style={{
                position: 'absolute',
                bottom: '-15px',
                right: '35px',
                fontSize: '26px',
                opacity: 0.6,
                transform: 'rotate(20deg)',
                zIndex: 1,
                animation: 'float 3.5s ease-in-out infinite'
            }}>
                🎂
            </div>

            {/* Confetti rain effect */}
            {Array.from({ length: 12 }).map((_, i) => (
                <div
                    key={i}
                    style={{
                        position: 'absolute',
                        top: `${Math.random() * 20}%`,
                        left: `${Math.random() * 100}%`,
                        width: '6px',
                        height: '6px',
                        backgroundColor: ['#ff1744', '#00e676', '#2979ff', '#ffea00', '#ff6d00', '#d500f9'][i % 6],
                        borderRadius: Math.random() > 0.5 ? '50%' : '0%',
                        transform: `rotate(${Math.random() * 360}deg)`,
                        opacity: 0.6,
                        zIndex: 0,
                        animation: `fall ${3 + Math.random() * 2}s linear infinite`
                    }}
                />
            ))}

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(15deg); }
                    50% { transform: translateY(-10px) rotate(20deg); }
                }
                @keyframes fall {
                    0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(400px) rotate(360deg); opacity: 0; }
                }
            `}</style>
        </BingoCard>
    );
};

export default BirthdayClassic;
