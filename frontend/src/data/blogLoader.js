// Dynamic article loader
class BlogArticleLoader {
  constructor() {
    this.articles = [];
    this.loaded = false;
  }

  // Load articles from multiple sources
  async loadArticles() {
    try {
      // Load articles from blog-articles folder
      const dynamicArticles = await this.loadFromFolder();
      this.articles = [...dynamicArticles];
      
      // Sort by publish date (newest first)
      this.articles.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
      
      this.loaded = true;
      return this.articles;
    } catch (error) {
      // Silently handle loading failure
      return [];
    }
  }

  // Load articles from folder (simulated - in production this would be server-side)
  async loadFromFolder() {
    // Import all article files statically
    try {
      const articles = [];
      
      // Import all available article files
      const advancedTips = await import('./blog-articles/advanced-music-bingo-tips.json');
      const seasonalGuide = await import('./blog-articles/seasonal-music-bingo-guide.json');
      const playlistMastery = await import('./blog-articles/playlist-mastery-techniques.json');
      
      if (advancedTips.default) articles.push(advancedTips.default);
      if (seasonalGuide.default) articles.push(seasonalGuide.default);
      if (playlistMastery.default) articles.push(playlistMastery.default);
      
      return articles;
    } catch (error) {
      return [];
    }
  }

  // Get all articles
  getArticles() {
    if (!this.loaded) {
      return [];
    }
    return this.articles;
  }

  // Get article by slug
  getArticleBySlug(slug) {
    if (!this.loaded) {
      return null;
    }
    return this.articles.find(article => article.id === slug);
  }

  // Get recent articles
  getRecentArticles(limit = 3) {
    if (!this.loaded) {
      return [];
    }
    return this.articles.slice(0, limit);
  }

  // Get articles by category
  getArticlesByCategory(category) {
    if (!this.loaded) {
      return [];
    }
    return this.articles.filter(article => article.category === category);
  }

  // Get articles by tag
  getArticlesByTag(tag) {
    if (!this.loaded) {
      return [];
    }
    return this.articles.filter(article => article.tags.includes(tag));
  }

  // Search articles
  searchArticles(query) {
    if (!this.loaded) {
      return [];
    }
    return this.articles.filter(article => 
      article.title.toLowerCase().includes(query.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(query.toLowerCase())
    );
  }

  // Add new article
  addArticle(article) {
    if (!this.loaded) {
      return;
    }
    
    this.articles.unshift(article);
    this.articles.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
  }
}

// Create singleton instance
const blogLoader = new BlogArticleLoader();

// Export convenience functions that maintain the same API as before
export const blogArticles = [];
export const getArticleBySlug = (slug) => blogLoader.getArticleBySlug(slug);
export const getRecentArticles = (limit) => blogLoader.getRecentArticles(limit);
export const getArticlesByCategory = (category) => blogLoader.getArticlesByCategory(category);
export const getArticlesByTag = (tag) => blogLoader.getArticlesByTag(tag);
export const loadBlogArticles = () => blogLoader.loadArticles();
export const addBlogArticle = (article) => blogLoader.addArticle(article);

// Initialize loader
blogLoader.loadArticles().then(articles => {
  blogArticles.push(...articles);
}).catch(error => {
  // Silently handle initialization failure
});
