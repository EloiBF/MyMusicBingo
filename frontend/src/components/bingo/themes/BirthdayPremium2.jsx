import React from 'react';
import BingoCard from '../BingoCard';
import './BirthdayPremium2.css';

const BirthdayPremium2 = ({ eventTitle, cardData, columns, rows, primaryColor, orientation, cardNumber, isMini }) => {
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
            <div className="birthday-p2-decor">
                <div className="dot d1"></div>
                <div className="dot d2"></div>
                <div className="dot d3"></div>
            </div>

            <div className="birthday-p2-header">
                <div className="luxury-line"></div>
                <h1>💎 BINGO MUSICAL 💎</h1>
                <h2>{eventTitle}</h2>
                <div className="luxury-line"></div>
            </div>

            <div className="bingo-grid birthday-p2-grid-style">
                {cardData.map((item, index) => (
                    <div key={index} className="birthday-p2-cell">
                        <div className="birthday-p2-song">{item.nom || item.name}</div>
                        <div className="birthday-p2-artist">{item.artista || item.artist}</div>
                    </div>
                ))}
            </div>
        </BingoCard>
    );
};

export default BirthdayPremium2;
