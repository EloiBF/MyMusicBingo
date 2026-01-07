import React from 'react';
import BingoCard from '../BingoCard';
import './Dance.css';

const Dance = ({ eventTitle, cardData, columns, rows, primaryColor, orientation, cardNumber, isMini }) => {
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
            <div className="dance-decor">
                <div className="circle c1"></div>
                <div className="circle c2"></div>
                <div className="icon d1">💃</div>
            </div>

            <div className="dance-header">
                <h1>⚡ BINGO MUSICAL ⚡</h1>
                <h2>{eventTitle}</h2>
            </div>

            <div className="bingo-grid dance-grid-style">
                {cardData.map((item, index) => (
                    <div key={index} className="dance-cell">
                        <div className="dance-song">{item.nom || item.name}</div>
                        <div className="dance-artist">{item.artista || item.artist}</div>
                    </div>
                ))}
            </div>
        </BingoCard>
    );
};

export default Dance;
