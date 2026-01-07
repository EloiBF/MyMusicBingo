import React from 'react';
import BingoCard from '../BingoCard';
import './Graduation.css';

const Graduation = ({ eventTitle, cardData, columns, rows, primaryColor, orientation, cardNumber, isMini }) => {
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
            <div className="graduation-decor">
                <div className="icon g1">🎓</div>
                <div className="icon g2">📜</div>
                <div className="icon g3">✨</div>
            </div>

            <div className="graduation-header">
                <div className="grad-ribbon">CLASS OF 2026</div>
                <h1>🎓 BINGO MUSICAL 🎓</h1>
                <h2>{eventTitle}</h2>
            </div>

            <div className="bingo-grid graduation-grid-style">
                {cardData.map((item, index) => (
                    <div key={index} className="graduation-cell">
                        <div className="graduation-song">{item.nom || item.name}</div>
                        <div className="graduation-artist">{item.artista || item.artist}</div>
                    </div>
                ))}
            </div>
        </BingoCard>
    );
};

export default Graduation;
