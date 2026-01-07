import React, { useRef, useLayoutEffect, useState } from 'react';

const useA4Scale = (containerRef, orientation = 'portrait', padding = 12, manualScale = null) => {
    const [scale, setScale] = useState(manualScale || 0.4);
    const isLandscape = orientation === 'landscape';
    const a4Width = isLandscape ? 1123 : 794;
    const a4Height = isLandscape ? 794 : 1123;

    useLayoutEffect(() => {
        if (manualScale !== null) {
            setScale(manualScale);
            return;
        }

        const updateScale = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.offsetWidth;
                const newScale = Math.min(containerWidth / a4Width, 1);
                setScale(newScale > 0 ? newScale : 0.4);
            }
        };

        const observer = new ResizeObserver(updateScale);
        if (containerRef.current) {
            observer.observe(containerRef.current);
            updateScale();
        }

        return () => observer.disconnect();
    }, [containerRef, orientation, padding, a4Width, manualScale]);

    return { scale, a4Width, a4Height };
};

export default useA4Scale;
