import React from 'react';
import './BingoCard.css';

const BingoCard = ({
    children,
    orientation = 'portrait',
    primaryColor = '#8b5cf6',
    columns = 3,
    rows = 3,
    cardNumber,
    eventTitle = 'Bingo Musical',
    isMini = false
}) => {
    const isLandscape = orientation === 'landscape';

    return (
        <div
            className={`bingo-card-container ${orientation} ${isMini ? 'mini' : ''}`}
            style={{
                '--primary': primaryColor,
                '--cols': columns,
                '--rows': rows
            }}
        >
            <div className="bingo-card-content">
                {children}

                {cardNumber && (
                    <div className="card-number-wrapper">
                        <div className="card-number">N° {cardNumber}</div>
                    </div>
                )}

                <div className="bingo-card-footer">
                    BingoMusicMaker • EXCEPTIONAL MUSICAL CURATION
                </div>
            </div>
        </div>
    );
};

export default BingoCard;
