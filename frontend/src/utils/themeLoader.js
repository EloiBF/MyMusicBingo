// Dynamic theme loader for bingo themes
const themeModules = import.meta.glob('../components/bingo/themes/*.jsx', { eager: true });

export const getAvailableThemes = () => {
  const themes = [];

  Object.entries(themeModules).forEach(([path, module]) => {
    // Extract filename without extension
    const fileName = path.split('/').pop().replace('.jsx', '');

    // Convert filename to theme ID (camelCase to snake_case)
    const themeId = fileName.replace(/([A-Z])/g, '_$1').toLowerCase().replace(/^_/, '');

    // Extract component name for display
    const componentName = fileName.replace(/([A-Z])/g, ' $1').trim();

    // Determine category and tier from filename
    let category = 'Other';
    let tier = 'Basic';
    let label = componentName;

    if (fileName.includes('Birthday')) {
      category = 'Birthday';
    } else if (fileName.includes('Wedding')) {
      category = 'Wedding';
    } else if (fileName.includes('Party')) {
      category = 'Party';
    } else if (fileName.includes('Corporate')) {
      category = 'Corporate';
    } else if (fileName.includes('Classic') || fileName.includes('Modern') || fileName.includes('Retro')) {
      // Only set to Essentials if it hasn't matched a specific category yet
      if (category === 'Other') {
        category = 'Essentials';
      }
    }

    if (fileName.includes('Premium1')) {
      tier = 'Premium I';
    } else if (fileName.includes('Premium2')) {
      tier = 'Premium II';
    } else if (fileName.includes('Premium')) {
      // Handle new "Premium" without number
      tier = 'Premium I';
    } else if (fileName.includes('Basic')) {
      tier = 'Basic';
    } else if (fileName.includes('Classic')) {
      tier = 'Basic'; // Classic maps to Basic tier for now
    } else if (fileName.includes('Corporate')) {
      tier = 'Premium I';
    }

    // Create label based on category and tier
    if (category === 'Essentials') {
      label = componentName.replace(/(Classic|Modern|Retro)/, '$1');
    } else {
      // For other categories, use the category name as the label
      const categoryName = category === 'Other' ? componentName : category;
      label = tier === 'Basic' ? `${categoryName} Basic` :
        tier === 'Premium I' ? `${categoryName} Premium` :
          tier === 'Premium II' ? `${categoryName} Premium II` : categoryName;
    }

    themes.push({
      id: themeId,
      label: label.trim() || componentName,
      tier,
      category,
      component: module.default
    });
  });

  // Group by category
  const categorizedThemes = {};
  themes.forEach(theme => {
    if (!categorizedThemes[theme.category]) {
      categorizedThemes[theme.category] = [];
    }
    categorizedThemes[theme.category].push({
      id: theme.id,
      label: theme.label,
      tier: theme.tier
    });
  });

  // Convert to the expected format
  const categorizedThemesArray = Object.entries(categorizedThemes).map(([category, options]) => ({
    category,
    options
  }));

  // Sort categories and options
  const categoryOrder = ['Party', 'Wedding', 'Birthday', 'Corporate', 'Essentials', 'Specials', 'Other'];
  categorizedThemesArray.sort((a, b) => {
    const aIndex = categoryOrder.indexOf(a.category);
    const bIndex = categoryOrder.indexOf(b.category);
    if (aIndex === -1 && bIndex === -1) return a.category.localeCompare(b.category);
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });

  categorizedThemesArray.forEach(cat => {
    cat.options.sort((a, b) => {
      const tierOrder = { 'Basic': 0, 'Premium I': 1, 'Premium II': 2 };
      const aTier = tierOrder[a.tier] ?? 3;
      const bTier = tierOrder[b.tier] ?? 3;
      if (aTier !== bTier) return aTier - bTier;
      return a.label.localeCompare(b.label);
    });
  });

  return {
    allThemes: themes,
    categorizedThemes: categorizedThemesArray,
    themeComponents: themes.reduce((acc, theme) => {
      acc[theme.id] = theme.component;
      return acc;
    }, {})
  };
};
