import React from 'react';
import BingoCard from '../BingoCard';
import './CorporateBasic.css';

const CorporateBasic = ({ eventTitle, cardData, columns, rows, primaryColor, orientation, cardNumber, isMini }) => {
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
            <div className="corporate-basic-decor">
                <div className="box b1"></div>
                <div className="box b2"></div>
            </div>

            <div className="corporate-basic-header">
                <div className="corporate-stripe"></div>
                <h1>📊 BINGO MUSICAL 📊</h1>
                <h2>{eventTitle}</h2>
            </div>

            <div className="bingo-grid corporate-grid-style">
                {cardData.map((item, index) => (
                    <div key={index} className="corporate-cell">
                        <div className="corporate-song">{item.nom || item.name}</div>
                        <div className="corporate-artist">{item.artista || item.artist}</div>
                    </div>
                ))}
            </div>
        </BingoCard>
    );
};

export default CorporateBasic;
