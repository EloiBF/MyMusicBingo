import React from 'react';
import BingoCard from '../BingoCard';
import './WeddingPremium2.css';

const WeddingPremium2 = ({ eventTitle, cardData, columns, rows, primaryColor, orientation, cardNumber, isMini }) => {
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
            <div className="wedding-p2-decor">
                <div className="petal p1">🌸</div>
                <div className="petal p2">🌸</div>
                <div className="petal p3">🌸</div>
            </div>

            <div className="wedding-p2-header">
                <h1>🌸 BINGO MUSICAL 🌸</h1>
                <h2>{eventTitle}</h2>
            </div>

            <div className="bingo-grid wedding-p2-grid-style">
                {cardData.map((item, index) => (
                    <div key={index} className="wedding-p2-cell">
                        <div className="wedding-p2-song">{item.nom || item.name}</div>
                        <div className="wedding-p2-artist">{item.artista || item.artist}</div>
                    </div>
                ))}
            </div>
        </BingoCard>
    );
};

export default WeddingPremium2;
