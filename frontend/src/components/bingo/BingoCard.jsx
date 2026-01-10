import React from 'react';

const BingoCard = ({
    children,
    orientation = 'portrait',
    primaryColor = '#8b5cf6',
    columns = 3,
    rows = 3,
    cardNumber,
    eventTitle = 'Bingo Musical',
    isMini = false,
    cardData,
    cellStyles = {},
    songStyles = {},
    artistStyles = {},
    titleEmojis = { left: '', right: '' },
    font = "'Montserrat', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif",
    // NUEVA PROP: Permite renderizar elementos decorativos DENTRO de la celda (ej: cinta adhesiva, chincheta)
    accentColor = '#f59e0b',
    headerStyles = {},
    titleStyles = {},
    footerStyles = {},
    themeStyles = {}, // Now properly destructured
    subtitleStyles = {}, // New prop for subtitle customization
    renderCellDecor = null,
    renderCardNumber = null, // New prop for custom card number rendering
    title // Fix: Deseructure title from props
}) => {
    const isLandscape = orientation === 'landscape';

    // Extract theme elements from children
    const themeElements = React.Children.toArray(children);
    const decorativeElements = themeElements.filter(child =>
        React.isValidElement(child) && child.props.style?.position === 'absolute'
    );

    const styles = {
        page: {
            width: isLandscape ? '297mm' : '210mm',
            height: isLandscape ? '210mm' : '297mm',
            background: 'white',
            color: '#1a1a1a',
            fontFamily: font,
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            overflow: 'hidden', // CRITICAL: Ensures content never spills out of the "page"
            margin: '0 auto',
            padding: isLandscape ? '10mm' : '12mm', // Safe margins for most home printers
            printColorAdjust: 'exact',
            WebkitPrintColorAdjust: 'exact',
            ...(isMini && { width: '100%', height: '100%', padding: '5px' })
        },
        cardFrame: {
            // The "Sandbox" for the theme. Themes should paint nicely within here.
            width: 'auto', // Allow margins to shrink the box
            flex: 1, // Fill available vertical space
            display: 'flex',
            flexDirection: 'column',
            boxSizing: 'border-box',
            position: 'relative',
            zIndex: 1,
            backgroundColor: 'white',
            overflow: 'visible', // Allow decorative elements to "pop out" of the border (e.g. stickers), clamped by page overflow
            ...themeStyles
        },
        header: {
            textAlign: 'center',
            marginBottom: '15pt',
            position: 'relative',
            zIndex: 2,
            ...headerStyles
        },
        title: {
            fontSize: '42pt',
            fontWeight: 800,
            color: '#1a1a1a',
            margin: '0 0 8pt 0',
            textTransform: 'uppercase',
            letterSpacing: '2pt',
            lineHeight: 1,
            fontFamily: font,
            ...titleStyles
        },
        subtitle: {
            fontSize: '14pt',
            color: '#666',
            margin: '0 0 5pt 0',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '1pt',
            fontFamily: font || 'inherit',
            ...subtitleStyles
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
            gap: '16px',
            width: '100%',
            flexGrow: 1,
            zIndex: 2,
            padding: '30px 15px',
        },
        gridCell: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2px',
            boxSizing: 'border-box',
            background: 'white',
            position: 'relative',
            textAlign: 'center',
            ...cellStyles
        },
        song: {
            fontSize: '9pt',
            fontWeight: 700,
            color: '#1a1a1a',
            lineHeight: 1.1,
            marginBottom: '1pt',
            wordBreak: 'break-word',
            zIndex: 2,
            position: 'relative',
            fontFamily: font || 'inherit',
            ...songStyles
        },
        artist: {
            fontSize: '7pt',
            color: primaryColor,
            marginTop: '1pt',
            fontWeight: 600,
            zIndex: 2,
            position: 'relative',
            fontFamily: font || 'inherit',
            ...artistStyles
        },
        cardNumberWrapper: {
            textAlign: 'center',
            margin: '5pt 0',
            zIndex: 2,
        },
        cardNumber: {
            display: 'inline-block',
            padding: '2pt 15pt',
            fontSize: '1rem',
            fontWeight: 700,
            color: '#888',
            border: '1px solid #ddd',
            borderRadius: '20px',
            background: '#f9f9f9',
            fontFamily: font || 'inherit',
        },
        footer: {
            fontSize: '7pt',
            color: '#999',
            marginTop: 'auto',
            textAlign: 'center',
            textTransform: 'uppercase',
            letterSpacing: '1pt',
            zIndex: 1,
            fontFamily: font || 'inherit',
            ...footerStyles
        },
    };

    return (
        <div style={styles.page}>
            <div style={styles.cardFrame}>
                {decorativeElements}

                <div style={styles.header}>
                    <h1 style={styles.title}>
                        {titleEmojis.left} {titleEmojis.left ? ' ' : ''}{title || 'BINGO'}{titleEmojis.right ? ' ' : ''} {titleEmojis.right}
                    </h1>
                    <h2 style={styles.subtitle}>{eventTitle}</h2>
                </div>

                <div style={styles.grid}>
                    {cardData && cardData.map((item, index) => (
                        <div key={index} style={styles.gridCell}>
                            {renderCellDecor && renderCellDecor(index)}
                            <div style={styles.song}>{item.nom || item.name}</div>
                            <div style={styles.artist}>{item.artista || item.artist}</div>
                        </div>
                    ))}
                </div>

                {/* Custom Card Number / Footer Rendering */}
                {renderCardNumber ? renderCardNumber(cardNumber) : (cardNumber && (
                    <div style={styles.cardNumberWrapper}>
                        <div style={styles.cardNumber}>Card #{cardNumber}</div>
                    </div>
                ))}

                <div style={styles.footer}>
                    BingoMusicMaker.com
                </div>
            </div>
        </div>
    );
};

export default BingoCard;