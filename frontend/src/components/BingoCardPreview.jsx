// BingoCardPreview.jsx
import React, { useRef, useState, useEffect } from 'react';
import BingoPreview from './BingoPreview';

const BingoCardPreview = ({ 
    event, 
    cardData = [], 
    isMini = true,
    containerStyle = {},
    previewStyle = {}
}) => {
    const containerRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    // Calcular altura basada en el ancho y la orientación
    useEffect(() => {
        if (!containerRef.current) return;

        const updateSize = () => {
            const container = containerRef.current;
            if (!container) return;

            const containerWidth = container.clientWidth;
            
            // Relación de aspecto DIN A4 (1:√2)
            const aspectRatio = event.orientation === 'landscape' ? Math.SQRT2 : 1/Math.SQRT2;
            
            // Usar el ancho completo y calcular la altura proporcional
            const width = containerWidth;
            const height = width / aspectRatio;

            setDimensions({ width, height });
        };

        updateSize();
        
        // Añadir listener para redimensionamiento
        const resizeObserver = new ResizeObserver(updateSize);
        resizeObserver.observe(containerRef.current);
        
        return () => {
            if (containerRef.current) {
                resizeObserver.unobserve(containerRef.current);
            }
        };
    }, [event.orientation]);

    const containerStyles = {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        ...containerStyle
    };

    return (
        <div ref={containerRef} style={containerStyles}>
            <div style={{
                width: '100%',
                height: `${dimensions.height}px`,
                position: 'relative',
                background: 'white',
                ...previewStyle
            }}>
                <BingoPreview
                    theme={event.theme || 'classic'}
                    primaryColor={event.primary_color || 'var(--primary)'}
                    rows={event.rows}
                    columns={event.columns}
                    orientation={event.orientation || 'portrait'}
                    eventTitle={event.event_title}
                    cardData={cardData}
                    cardNumber={cardData?.card_index || 1}
                    showFullscreen={false}
                    hideFooter={true}
                    isMini={isMini}
                    padding={8}
                    containerStyle={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        overflow: 'hidden'
                    }}
                    previewStyle={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        objectPosition: 'top center',
                        margin: 0,
                        padding: 0
                    }}
                />
            </div>
        </div>
    );
};

export default BingoCardPreview;