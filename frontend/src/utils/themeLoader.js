/**
 * Theme Loader Utility
 * Bridges the dynamic theme registry with the UI components.
 */
import { getAllThemes as getRegistryThemes } from '../components/bingo/themes/index';

export const getAvailableThemes = () => {
  const themes = getRegistryThemes();

  // Group by category for the UI selection
  const categorizedThemes = {};
  themes.forEach(theme => {
    const category = theme.category || 'Other';
    if (!categorizedThemes[category]) {
      categorizedThemes[category] = [];
    }
    categorizedThemes[category].push({
      id: theme.id,
      label: theme.label,
      tier: theme.tier,
      labelKey: `themes.labels.${theme.id.toLowerCase()}`,
      categoryKey: `themes.categories.${category.toLowerCase()}`
    });
  });

  const categorizedThemesArray = Object.entries(categorizedThemes).map(([category, options]) => ({
    category,
    options
  }));

  // Sort categories - Essentials first
  categorizedThemesArray.sort((a, b) => {
    if (a.category === 'Essentials') return -1;
    if (b.category === 'Essentials') return 1;
    return a.category.localeCompare(b.category);
  });

  return {
    allThemes: themes,
    categorizedThemes: categorizedThemesArray
  };
};
