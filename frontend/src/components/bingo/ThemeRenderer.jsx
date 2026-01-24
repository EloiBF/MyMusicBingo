import React from 'react';
import { getThemeConfig } from './themes/index';
import BingoCard from './BingoCard';

const ThemeRenderer = ({
    themeId = 'basic',
    gridSize, // Accept gridSize prop
    ...props
}) => {
    // Get the theme configuration object
    const themeConfig = getThemeConfig(themeId);

    return (
        <BingoCard
            {...props}
            themeConfig={themeConfig}
            gridSize={gridSize || themeConfig.defaultGridSize || 'medium'} // Use prop or theme default
        />
    );
};

export default ThemeRenderer;

