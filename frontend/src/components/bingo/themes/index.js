/**
 * Dynamic Bingo Card Theme Registry
 * 
 * Automatically loads all .js theme configurations in this directory.
 */

const themeConfigs = import.meta.glob('./*.jsx', { eager: true });

// Process the globules into a clean themes object
export const themes = Object.entries(themeConfigs).reduce((acc, [path, module]) => {
    // Skip this index file
    if (path.endsWith('index.js')) return acc;

    const config = module.default;
    const id = config.id || path.split('/').pop().replace('.jsx', '').toLowerCase();

    acc[id] = config;
    return acc;
}, {});

/**
 * Get a specific theme configuration.
 */
export const getThemeConfig = (themeId) => {
    return themes[themeId] || themes.basic || Object.values(themes)[0];
};

/**
 * Returns all available themes in a format suitable for the UI.
 */
export const getAllThemes = () => {
    return Object.entries(themes).map(([id, config]) => ({
        id: id,
        label: config.label || id.charAt(0).toUpperCase() + id.slice(1),
        category: config.category || 'Essentials',
        tier: config.tier || 'Basic'
    }));
};
