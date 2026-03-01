import React from 'react';
import { getThemeConfig } from './themes/index';
import BingoCard from './BingoCard';

const mergeThemeConfig = (baseConfig, overrides = {}, backgroundUrl = null) => {
    const safeOverrides = overrides && typeof overrides === 'object' ? overrides : {};
    const merged = {
        ...baseConfig,
        ...safeOverrides,
        background: {
            ...(baseConfig?.background || {}),
            ...(safeOverrides?.background || {}),
        },
        title: {
            ...(baseConfig?.title || {}),
            ...(safeOverrides?.title || {}),
        },
        subtitle: {
            ...(baseConfig?.subtitle || {}),
            ...(safeOverrides?.subtitle || {}),
        },
        grid: {
            ...(baseConfig?.grid || {}),
            ...(safeOverrides?.grid || {}),
        },
        cell: {
            ...(baseConfig?.cell || {}),
            ...(safeOverrides?.cell || {}),
        },
        card: {
            ...(baseConfig?.card || {}),
            ...(safeOverrides?.card || {}),
        },
        song: {
            ...(baseConfig?.song || {}),
            ...(safeOverrides?.song || {}),
        },
        artist: {
            ...(baseConfig?.artist || {}),
            ...(safeOverrides?.artist || {}),
        },
        footer: {
            ...(baseConfig?.footer || {}),
            ...(safeOverrides?.footer || {}),
        },
        layout: {
            ...(baseConfig?.layout || {}),
            ...(safeOverrides?.layout || {}),
        },
    };

    if (backgroundUrl) {
        merged.background = {
            ...(merged.background || {}),
            image: backgroundUrl,
        };
    }

    return merged;
};

const ThemeRenderer = ({
    themeId = 'basic',
    gridSize, // Accept gridSize prop
    themeOverrides,
    backgroundUrl,
    ...props
}) => {
    // Get the theme configuration object
    const baseThemeConfig = getThemeConfig(themeId);
    const themeConfig = mergeThemeConfig(baseThemeConfig, themeOverrides, backgroundUrl);

    return (
        <BingoCard
            {...props}
            themeConfig={themeConfig}
            gridSize={gridSize || themeConfig.defaultGridSize || 'medium'} // Use prop or theme default
        />
    );
};

export default ThemeRenderer;

