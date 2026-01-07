import React from 'react';
import BingoCard from '../BingoCard';
import './PartyBasic.css';

const PartyBasic = ({ eventTitle, cardData, columns, rows, primaryColor, orientation, cardNumber, isMini }) => {
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
            <div className="party-basic-decor">
                <div className="confetti c1">🎉</div>
                <div className="confetti c2">✨</div>
                <div className="confetti c3">🎈</div>
            </div>

            <div className="bingo-card-header">
                <h1>{eventTitle}</h1>
                <h2>Party Time</h2>
            </div>

            <div className="bingo-grid">
                {cardData.map((item, index) => (
                    <div key={index}>
                        <div className="bingo-song">{item.nom || item.name}</div>
                        <div className="bingo-artist">{item.artista || item.artist}</div>
                    </div>
                ))}
            </div>
        </BingoCard>
    );
};

export default PartyBasic;
