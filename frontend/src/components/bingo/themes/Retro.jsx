import React from 'react';
import BingoCard from '../BingoCard';
import './Retro.css';

const Retro = ({ eventTitle, cardData, columns, rows, primaryColor, orientation, cardNumber, isMini }) => {
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
            <div className="retro-decor">
                <div className="icon r1">📼</div>
                <div className="icon r2">📻</div>
                <div className="icon r3">💿</div>
            </div>

            <div className="retro-header">
                <div className="retro-label">ORIGINAL MIX</div>
                <h1>📼 BINGO MUSICAL 📼</h1>
                <h2>{eventTitle}</h2>
            </div>

            <div className="bingo-grid retro-grid-style">
                {cardData.map((item, index) => (
                    <div key={index} className="retro-cell">
                        <div className="retro-song">{item.nom || item.name}</div>
                        <div className="retro-artist">{item.artista || item.artist}</div>
                    </div>
                ))}
            </div>
        </BingoCard>
    );
};

export default Retro;
