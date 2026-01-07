import React from 'react';
import BingoCard from '../BingoCard';
import './PartyPremium2.css';

const PartyPremium2 = ({ eventTitle, cardData, columns, rows, primaryColor, orientation, cardNumber, isMini }) => {
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
            <div className="party-p2-decor">
                <div className="pulse p1"></div>
                <div className="pulse p2"></div>
                <div className="icon d1">⚡</div>
            </div>

            <div className="party-p2-header">
                <div className="glitch-text" data-text="ELECTRO DANCE">ELECTRO DANCE</div>
                <h1>⚡ BINGO MUSICAL ⚡</h1>
                <h2>{eventTitle}</h2>
            </div>

            <div className="bingo-grid party-p2-grid-style">
                {cardData.map((item, index) => (
                    <div key={index} className="party-p2-cell">
                        <div className="party-p2-song">{item.nom || item.name}</div>
                        <div className="party-p2-artist">{item.artista || item.artist}</div>
                    </div>
                ))}
            </div>
        </BingoCard>
    );
};

export default PartyPremium2;
