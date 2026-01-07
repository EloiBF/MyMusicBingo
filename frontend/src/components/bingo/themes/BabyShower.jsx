import React from 'react';
import BingoCard from '../BingoCard';
import './BabyShower.css';

const BabyShower = ({ eventTitle, cardData, columns, rows, primaryColor, orientation, cardNumber, isMini }) => {
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
            <div className="baby-shower-decor">
                <div className="icon b1">🧸</div>
                <div className="icon b2">🍼</div>
                <div className="icon b3">👶</div>
            </div>

            <div className="baby-shower-header">
                <h1>🍼 BINGO MUSICAL 🍼</h1>
                <h2>{eventTitle}</h2>
            </div>

            <div className="bingo-grid baby-grid-style">
                {cardData.map((item, index) => (
                    <div key={index} className="baby-cell">
                        <div className="baby-song">{item.nom || item.name}</div>
                        <div className="baby-artist">{item.artista || item.artist}</div>
                    </div>
                ))}
            </div>
        </BingoCard>
    );
};

export default BabyShower;
