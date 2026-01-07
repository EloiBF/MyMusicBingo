import React from 'react';
import BingoCard from '../BingoCard';
import './PartyPremium1.css';

const PartyPremium1 = ({ eventTitle, cardData, columns, rows, primaryColor, orientation, cardNumber, isMini }) => {
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
            <div className="party-p1-decor">
                <div className="shape s1"></div>
                <div className="shape s2"></div>
                <div className="shape s3"></div>
            </div>

            <div className="party-p1-header">
                <h1>📼 BINGO MUSICAL 📼</h1>
                <h2>{eventTitle}</h2>
            </div>

            <div className="bingo-grid party-p1-grid-style">
                {cardData.map((item, index) => (
                    <div key={index} className="party-p1-cell">
                        <div className="party-p1-song">{item.nom || item.name}</div>
                        <div className="party-p1-artist">{item.artista || item.artist}</div>
                    </div>
                ))}
            </div>

            <div className="party-p1-number-wrapper">
                <div className="party-p1-number">n°{cardNumber}</div>
            </div>
        </BingoCard>
    );
};

export default PartyPremium1;
