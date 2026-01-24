class BlogArticleLoader {
  constructor() {
    this.articles = [];
    this.loaded = false;
    this.currentLanguage = 'en';
  }

  // Load articles from multiple sources
  async loadArticles(lang = 'en') {
    try {
      this.currentLanguage = lang;

      // Load articles from blog-articles folder
      const dynamicArticles = await this.loadFromFolder(lang);
      this.articles = [...dynamicArticles];

      // Sort by publish date (newest first)
      this.articles.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));

      this.loaded = true;
      return this.articles;
    } catch (error) {
      console.error('Error loading blog articles:', error);
      return [];
    }
  }

  // Load articles from folder
  async loadFromFolder(lang) {
    const modules = import.meta.glob('./blog-articles/*.json');
    const slugs = [
      'advanced-music-bingo-tips',
      'seasonal-music-bingo-guide',
      'playlist-mastery-techniques'
    ];

    const articles = [];

    for (const slug of slugs) {
      let modulePath = `./blog-articles/${slug}.json`;

      // Try language specific file first
      if (lang && lang !== 'en') {
        const langPath = `./blog-articles/${slug}.${lang}.json`;
        if (modules[langPath]) {
          modulePath = langPath;
        }
      }

      if (modules[modulePath]) {
        try {
          const mod = await modules[modulePath]();
          if (mod.default) {
            articles.push(mod.default);
          }
        } catch (err) {
          console.error(`Failed to load article: ${modulePath}`, err);

          // Fallback to English if not already tried
          if (modulePath !== `./blog-articles/${slug}.json` && modules[`./blog-articles/${slug}.json`]) {
            const fallbackMod = await modules[`./blog-articles/${slug}.json`]();
            if (fallbackMod.default) {
              articles.push(fallbackMod.default);
            }
          }
        }
      }
    }

    return articles;
  }

  // Get all articles
  getArticles() {
    return this.articles;
  }

  // Get article by slug
  getArticleBySlug(slug) {
    return this.articles.find(article => article.id === slug);
  }

  // Get recent articles
  getRecentArticles(limit = 3) {
    return this.articles.slice(0, limit);
  }

  // Get articles by category
  getArticlesByCategory(category) {
    return this.articles.filter(article => article.category === category);
  }

  // Get articles by tag
  getArticlesByTag(tag) {
    return this.articles.filter(article => article.tags.includes(tag));
  }

  // Search articles
  searchArticles(query) {
    return this.articles.filter(article =>
      article.title.toLowerCase().includes(query.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(query.toLowerCase())
    );
  }

  // Add new article
  addArticle(article) {
    this.articles.unshift(article);
    this.articles.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
  }
}

// Create singleton instance
const blogLoader = new BlogArticleLoader();

// Export convenience functions
export const getArticleBySlug = (slug) => blogLoader.getArticleBySlug(slug);
export const getRecentArticles = (limit) => blogLoader.getRecentArticles(limit);
export const getArticlesByCategory = (category) => blogLoader.getArticlesByCategory(category);
export const getArticlesByTag = (tag) => blogLoader.getArticlesByTag(tag);
export const loadBlogArticles = (lang) => blogLoader.loadArticles(lang);
export const addBlogArticle = (article) => blogLoader.addArticle(article);

// Reactivity support: components should call loadBlogArticles(i18n.language)
// and then use the returned articles in their state.
