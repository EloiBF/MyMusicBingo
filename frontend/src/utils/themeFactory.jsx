import React from 'react';
import BingoCard from '../components/bingo/BingoCard';
import { generateThemePalette } from './colors';

// Import fonts for theme factory
const fontImport = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;700;900&family=Playfair+Display:wght@400;700&family=Inter:wght@400;500;600;700&display=swap');
`;

// Inject font styles into document head
if (typeof document !== 'undefined' && !document.getElementById('theme-factory-fonts')) {
    const style = document.createElement('style');
    style.id = 'theme-factory-fonts';
    style.textContent = fontImport;
    document.head.appendChild(style);
}

/**
 * Advanced Theme Factory
 * Allows creating dynamic themes with enhanced customization options
 */

export const createAdvancedTheme = (config) => {
    const {
        name = "Custom Theme",
        id = "custom",
        fonts = {
            primary: "'Inter', sans-serif",
            secondary: "'Inter', sans-serif"
        },
        colors = {
            primary: "#3b82f6",
            background: "#ffffff",
            text: "#1e293b",
            secondary: "#64748b"
        },
        spacing = {
            card: "32px",
            cell: "14px",
            gap: "10px"
        },
        borderRadius = {
            card: "8px",
            cell: "4px"
        },
        shadows = true,
        decorations = {
            enabled: true,
            type: "dots", // dots, corners, lines, none
            frequency: 5 // Every N cells
        },
        animations = {
            enabled: false,
            type: "fade", // fade, scale, slide
            duration: "0.2s"
        }
    } = config;

    const palette = generateThemePalette(colors.primary);

    // Enhanced decoration system
    const renderCellDecor = (index) => {
        if (!decorations.enabled || index % decorations.frequency !== 0) {
            return null;
        }

        switch (decorations.type) {
            case "dots":
                return (
                    <div style={{
                        position: 'absolute',
                        top: '2px',
                        right: '2px',
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        backgroundColor: palette.accent,
                        opacity: 0.6
                    }} />
                );
            case "corners":
                return (
                    <>
                        <div style={{
                            position: 'absolute',
                            top: '1px',
                            left: '1px',
                            width: '3px',
                            height: '3px',
                            backgroundColor: palette.accent,
                            opacity: 0.4
                        }} />
                        <div style={{
                            position: 'absolute',
                            top: '1px',
                            right: '1px',
                            width: '3px',
                            height: '3px',
                            backgroundColor: palette.accent,
                            opacity: 0.4
                        }} />
                    </>
                );
            case "lines":
                return (
                    <div style={{
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        right: '0',
                        height: '1px',
                        backgroundColor: palette.accentLight,
                        opacity: 0.5
                    }} />
                );
            default:
                return null;
        }
    };

    // Create the theme component
    const ThemeComponent = ({
        cells,
        title = "BINGO",
        eventTitle = "Musical",
        primaryColor = colors.primary,
        ...props
    }) => {
        const currentPalette = generateThemePalette(primaryColor);

        const baseStyles = {
            fontFamily: fonts.primary,
            backgroundColor: currentPalette.background,
            border: `2px solid ${currentPalette.accent}`,
            borderRadius: borderRadius.card,
            padding: spacing.card,
            margin: '0',
            position: 'relative',
            boxShadow: shadows ? `0 4px 6px ${currentPalette.accentLight}` : 'none'
        };

        const cellStyles = {
            backgroundColor: currentPalette.background,
            border: `1px solid ${currentPalette.accentLight}`,
            borderRadius: borderRadius.cell,
            fontFamily: fonts.secondary,
            padding: spacing.cell,
            textAlign: 'center',
            transition: animations.enabled ? `all ${animations.duration} ease` : 'none'
        };

        // Add animation classes if enabled
        if (animations.enabled) {
            cellStyles['&:hover'] = {
                transform: animations.type === 'scale' ? 'scale(1.05)' : 
                          animations.type === 'slide' ? 'translateY(-2px)' : 'none',
                boxShadow: `0 6px 12px ${currentPalette.accentLight}`
            };
        }

        return (
            <BingoCard
                {...props}
                cells={cells}
                title={title}
                eventTitle={eventTitle}
                themeStyles={baseStyles}
                titleStyles={{
                    color: currentPalette.text,
                    fontSize: '32px',
                    fontWeight: '700',
                    fontFamily: fonts.primary,
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    marginBottom: '8px',
                    lineHeight: 1
                }}
                subtitleStyles={{
                    fontFamily: fonts.secondary,
                    fontWeight: '400',
                    fontSize: '14px',
                    color: currentPalette.base,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    marginBottom: '24px'
                }}
                headerStyles={{
                    marginBottom: '24px',
                    textAlign: 'center',
                    borderBottom: `1px solid ${currentPalette.accentLight}`,
                    paddingBottom: '16px'
                }}
                gridStyles={{
                    gap: spacing.gap,
                    background: 'transparent'
                }}
                cellStyles={cellStyles}
                songStyles={{
                    fontWeight: '600',
                    color: currentPalette.text,
                    fontSize: '11pt',
                    marginBottom: '4px',
                    lineHeight: 1.2
                }}
                artistStyles={{
                    color: currentPalette.base,
                    fontWeight: '400',
                    fontSize: '9pt',
                    fontStyle: 'italic'
                }}
                footerStyles={{
                    fontSize: '11px',
                    color: currentPalette.base,
                    marginTop: '16px',
                    textAlign: 'center'
                }}
                renderCellDecor={renderCellDecor}
                renderCardNumber={(num) => (
                    <div style={{
                        textAlign: 'center',
                        marginTop: '12px',
                        fontFamily: fonts.secondary,
                        fontWeight: '400',
                        color: currentPalette.base,
                        fontSize: '12px'
                    }}>
                        Card #{num}
                    </div>
                )}
            />
        );
    };

    ThemeComponent.displayName = name;
    ThemeComponent.themeConfig = config;

    return ThemeComponent;
};

// Pre-configured theme presets
export const themePresets = {
    modern: {
        name: "Modern",
        id: "modern",
        fonts: {
            primary: "'Outfit', sans-serif",
            secondary: "'Inter', sans-serif"
        },
        colors: {
            primary: "#6366f1",
            background: "#ffffff",
            text: "#1e293b",
            secondary: "#64748b"
        },
        borderRadius: {
            card: "12px",
            cell: "8px"
        },
        shadows: true,
        decorations: {
            enabled: true,
            type: "dots",
            frequency: 3
        },
        animations: {
            enabled: true,
            type: "scale",
            duration: "0.2s"
        }
    },
    elegant: {
        name: "Elegant",
        id: "elegant",
        fonts: {
            primary: "'Playfair Display', serif",
            secondary: "'Inter', sans-serif"
        },
        colors: {
            primary: "#7c3aed",
            background: "#fafafa",
            text: "#1f2937",
            secondary: "#6b7280"
        },
        borderRadius: {
            card: "4px",
            cell: "2px"
        },
        shadows: true,
        decorations: {
            enabled: true,
            type: "corners",
            frequency: 7
        },
        animations: {
            enabled: false
        }
    },
    minimal: {
        name: "Minimal",
        id: "minimal",
        fonts: {
            primary: "'Inter', sans-serif",
            secondary: "'Inter', sans-serif"
        },
        colors: {
            primary: "#000000",
            background: "#ffffff",
            text: "#000000",
            secondary: "#666666"
        },
        borderRadius: {
            card: "0px",
            cell: "0px"
        },
        shadows: false,
        decorations: {
            enabled: false
        },
        animations: {
            enabled: false
        }
    }
};

// Helper to register a new theme
export const registerTheme = (themeConfig) => {
    const theme = createAdvancedTheme(themeConfig);
    return theme;
};

export default {
    createAdvancedTheme,
    themePresets,
    registerTheme
};
