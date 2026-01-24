import { createAdvancedTheme, registerTheme } from './themeFactory.jsx';

/**
 * Example custom themes demonstrating the advanced theme system
 */

// Gaming Theme
const gamingThemeConfig = {
    name: "Gaming",
    id: "gaming",
    fonts: {
        primary: "'Outfit', sans-serif",
        secondary: "'Inter', sans-serif"
    },
    colors: {
        primary: "#00ff88",
        background: "#0a0a0a",
        text: "#ffffff",
        secondary: "#00ff88"
    },
    spacing: {
        card: "24px",
        cell: "12px",
        gap: "8px"
    },
    borderRadius: {
        card: "4px",
        cell: "2px"
    },
    shadows: true,
    decorations: {
        enabled: true,
        type: "corners",
        frequency: 2
    },
    animations: {
        enabled: true,
        type: "fade",
        duration: "0.3s"
    }
};

// Nature Theme
const natureThemeConfig = {
    name: "Nature",
    id: "nature",
    fonts: {
        primary: "'Playfair Display', serif",
        secondary: "'Inter', sans-serif"
    },
    colors: {
        primary: "#22c55e",
        background: "#f0fdf4",
        text: "#14532d",
        secondary: "#166534"
    },
    spacing: {
        card: "36px",
        cell: "16px",
        gap: "12px"
    },
    borderRadius: {
        card: "16px",
        cell: "8px"
    },
    shadows: true,
    decorations: {
        enabled: true,
        type: "dots",
        frequency: 4
    },
    animations: {
        enabled: true,
        type: "scale",
        duration: "0.2s"
    }
};

// Ocean Theme
const oceanThemeConfig = {
    name: "Ocean",
    id: "ocean",
    fonts: {
        primary: "'Inter', sans-serif",
        secondary: "'Inter', sans-serif"
    },
    colors: {
        primary: "#0ea5e9",
        background: "#f0f9ff",
        text: "#0c4a6e",
        secondary: "#075985"
    },
    spacing: {
        card: "32px",
        cell: "14px",
        gap: "10px"
    },
    borderRadius: {
        card: "12px",
        cell: "6px"
    },
    shadows: true,
    decorations: {
        enabled: true,
        type: "lines",
        frequency: 6
    },
    animations: {
        enabled: true,
        type: "slide",
        duration: "0.25s"
    }
};

// Register the custom themes
export const GamingTheme = registerTheme(gamingThemeConfig);
export const NatureTheme = registerTheme(natureThemeConfig);
export const OceanTheme = registerTheme(oceanThemeConfig);

// Theme collection for easy access
export const customThemes = {
    gaming: GamingTheme,
    nature: NatureTheme,
    ocean: OceanTheme
};

export default {
    GamingTheme,
    NatureTheme,
    OceanTheme,
    customThemes
};
