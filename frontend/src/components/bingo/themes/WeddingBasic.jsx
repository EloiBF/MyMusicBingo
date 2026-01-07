import React from 'react';
import BingoCard from '../BingoCard';
import './WeddingBasic.css';

const WeddingBasic = ({ eventTitle, cardData, columns, rows, primaryColor, orientation, cardNumber, isMini }) => {
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
            <div className="wedding-basic-decor">
                <div className="icon w1">🕊️</div>
                <div className="icon w2">💍</div>
                <div className="icon w3">🌸</div>
            </div>

            <div className="wedding-basic-header">
                <h1>💍 BINGO MUSICAL 💍</h1>
                <h2>{eventTitle}</h2>
            </div>

            <div className="bingo-grid wedding-grid-style">
                {cardData.map((item, index) => (
                    <div key={index} className="wedding-cell">
                        <div className="wedding-song">{item.nom || item.name}</div>
                        <div className="wedding-artist">{item.artista || item.artist}</div>
                    </div>
                ))}
            </div>
        </BingoCard>
    );
};

export default WeddingBasic;
