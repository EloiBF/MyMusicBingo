import React from 'react';
import BingoCard from '../BingoCard';
import './WeddingPremium1.css';

const WeddingPremium1 = ({ eventTitle, cardData, columns, rows, primaryColor, orientation, cardNumber, isMini }) => {
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
            <div className="wedding-p1-decor">
                <div className="ornament o1">⚜️</div>
                <div className="ornament o2">⚜️</div>
            </div>

            <div className="wedding-p1-header">
                <div className="header-crown">👑</div>
                <h1>BINGO MUSICAL</h1>
                <h2>{eventTitle}</h2>
            </div>

            <div className="bingo-grid wedding-p1-grid-style">
                {cardData.map((item, index) => (
                    <div key={index} className="wedding-p1-cell">
                        <div className="wedding-p1-song">{item.nom || item.name}</div>
                        <div className="wedding-p1-artist">{item.artista || item.artist}</div>
                    </div>
                ))}
            </div>
        </BingoCard>
    );
};

export default WeddingPremium1;
