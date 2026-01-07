import React from 'react';
import BingoCard from '../BingoCard';
import './CorporatePremium1.css';

const CorporatePremium1 = ({ eventTitle, cardData, columns, rows, primaryColor, orientation, cardNumber, isMini }) => {
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
            <div className="corporate-p1-decor">
                <div className="line l1"></div>
                <div className="line l2"></div>
                <div className="icon c1">🏢</div>
            </div>

            <div className="corporate-p1-header">
                <h1>BINGO MUSICAL</h1>
                <h2>{eventTitle}</h2>
                <div className="header-bar"></div>
            </div>

            <div className="bingo-grid corporate-p1-grid-style">
                {cardData.map((item, index) => (
                    <div key={index} className="corporate-p1-cell">
                        <div className="corporate-p1-song">{item.nom || item.name}</div>
                        <div className="corporate-p1-artist">{item.artista || item.artist}</div>
                    </div>
                ))}
            </div>
        </BingoCard>
    );
};

export default CorporatePremium1;
