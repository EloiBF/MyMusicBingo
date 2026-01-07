import React from 'react';
import BingoCard from '../BingoCard';
import './Christmas.css';

const Christmas = ({ eventTitle, cardData, columns, rows, primaryColor, orientation, cardNumber, isMini }) => {
    return (
        <BingoCard
            orientation={orientation}
            primaryColor={primaryColor}
            columns={columns}
            rows={rows}
            cardNumber={cardNumber}
            eventTitle={eventTitle}
            isMini={isMini}
        >
            <div className="christmas-decor">
                <div className="icon c1">❄️</div>
                <div className="icon c2">🎄</div>
                <div className="icon c3">🔔</div>
            </div>

            <div className="christmas-header">
                <h1>🎄 BINGO MUSICAL 🎄</h1>
                <h2>{eventTitle}</h2>
            </div>

            <div className="bingo-grid christmas-grid-style">
                {cardData.map((item, index) => (
                    <div key={index} className="christmas-cell">
                        <div className="christmas-song">{item.nom || item.name}</div>
                        <div className="christmas-artist">{item.artista || item.artist}</div>
                    </div>
                ))}
            </div>
        </BingoCard>
    );
};

export default Christmas;
