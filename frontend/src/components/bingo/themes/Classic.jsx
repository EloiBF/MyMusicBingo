import React from 'react';
import BingoCard from '../BingoCard';
import './Classic.css';

const Classic = ({ eventTitle, cardData, columns, rows, primaryColor, orientation, cardNumber, isMini }) => {
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
            <div className="classic-decor">
                <div className="note n1">♪</div>
                <div className="note n2">♫</div>
                <div className="note n3">♬</div>
            </div>

            <div className="bingo-card-header">
                <h1>{eventTitle}</h1>
                <h2>Musical Bingo Experience</h2>
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

export default Classic;
