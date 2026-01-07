import React from 'react';
import BingoCard from '../BingoCard';
import './BirthdayPremium1.css';

const BirthdayPremium1 = ({ eventTitle, cardData, columns, rows, primaryColor, orientation, cardNumber, isMini }) => {
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
            <div className="birthday-p1-decor">
                <div className="sparkle s1">✨</div>
                <div className="sparkle s2">✨</div>
                <div className="sparkle s3">✨</div>
            </div>

            <div className="birthday-p1-header">
                <div className="celebration-badge">PARTY TIME</div>
                <h1>✨ BINGO MUSICAL ✨</h1>
                <h2>{eventTitle}</h2>
            </div>

            <div className="bingo-grid birthday-p1-grid-style">
                {cardData.map((item, index) => (
                    <div key={index} className="birthday-p1-cell">
                        <div className="birthday-p1-song">{item.nom || item.name}</div>
                        <div className="birthday-p1-artist">{item.artista || item.artist}</div>
                    </div>
                ))}
            </div>
        </BingoCard>
    );
};

export default BirthdayPremium1;
