import React from 'react';
import BingoCard from '../BingoCard';
import './CorporatePremium2.css';

const CorporatePremium2 = ({ eventTitle, cardData, columns, rows, primaryColor, orientation, cardNumber, isMini }) => {
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
            <div className="corporate-p2-decor">
                <div className="grid-overlay"></div>
                <div className="circle c1"></div>
            </div>

            <div className="corporate-p2-header">
                <div className="tech-bracket"></div>
                <h1>BINGO MUSICAL</h1>
                <h2>{eventTitle}</h2>
                <div className="tech-bracket bottom"></div>
            </div>

            <div className="bingo-grid corporate-p2-grid-style">
                {cardData.map((item, index) => (
                    <div key={index} className="corporate-p2-cell">
                        <div className="corporate-p2-song">{item.nom || item.name}</div>
                        <div className="corporate-p2-artist">{item.artista || item.artist}</div>
                    </div>
                ))}
            </div>
        </BingoCard>
    );
};

export default CorporatePremium2;
