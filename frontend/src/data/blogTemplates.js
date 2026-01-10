// Blog article template definitions
export const ARTICLE_TEMPLATES = {
  'text-heavy': {
    name: 'Text Heavy',
    description: 'Perfect for detailed guides and tutorials',
    sections: [
      {
        type: 'text',
        title: 'Introduction',
        content: 'Your introduction text here...'
      },
      {
        type: 'text',
        title: 'Main Content',
        content: 'Your main content here...'
      },
      {
        type: 'text',
        title: 'Conclusion',
        content: 'Your conclusion here...'
      }
    ]
  },
  'image-text': {
    name: 'Image & Text',
    description: 'Great for visual storytelling with alternating images and text',
    sections: [
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-example1?w=800&h=400&fit=crop',
        alt: 'Example image',
        caption: 'Image caption here...'
      },
      {
        type: 'text',
        title: 'Section Title',
        content: 'Your text content here...'
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-example2?w=800&h=400&fit=crop',
        alt: 'Another example',
        caption: 'Another caption...'
      },
      {
        type: 'text',
        title: 'Another Section',
        content: 'More text content...'
      }
    ]
  },
  'mixed': {
    name: 'Mixed Content',
    description: 'Flexible layout with various content types',
    sections: [
      {
        type: 'text',
        title: 'Introduction',
        content: 'Start with text...'
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-example1?w=800&h=400&fit=crop',
        alt: 'Visual content',
        caption: 'Image description...'
      },
      {
        type: 'text',
        title: 'Main Points',
        content: 'Key information here...'
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-example2?w=800&h=400&fit=crop',
        alt: 'Supporting visual',
        caption: 'Supporting image...'
      }
    ]
  }
};

// Default article structure for easy creation
export const DEFAULT_ARTICLE = {
  id: '',
  title: '',
  excerpt: '',
  author: 'Music Bingo Team',
  publishDate: new Date().toISOString().split('T')[0],
  readTime: '5 min read',
  category: 'Tutorial',
  tags: [],
  featuredImage: 'https://images.unsplash.com/photo-default?w=800&h=400&fit=crop',
  template: 'text-heavy',
  content: {
    sections: []
  }
};

// Helper function to create new article
export const createArticle = (template = 'text-heavy', overrides = {}) => {
  const templateData = ARTICLE_TEMPLATES[template];
  if (!templateData) {
    throw new Error(`Template "${template}" not found`);
  }

  return {
    ...DEFAULT_ARTICLE,
    id: overrides.id || generateSlug(overrides.title || 'new-article'),
    title: overrides.title || '',
    excerpt: overrides.excerpt || '',
    category: overrides.category || 'Tutorial',
    tags: overrides.tags || [],
    featuredImage: overrides.featuredImage || 'https://images.unsplash.com/photo-default?w=800&h=400&fit=crop',
    template,
    content: {
      sections: templateData.sections.map(section => ({
        ...section,
        ...overrides.sections?.find(s => s.type === section.type)
      }))
    },
    ...overrides
  };
};

// Helper function to generate slug from title
export const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

// Validation function for articles
export const validateArticle = (article) => {
  const errors = [];
  
  if (!article.id) errors.push('Article ID is required');
  if (!article.title) errors.push('Title is required');
  if (!article.excerpt) errors.push('Excerpt is required');
  if (!article.author) errors.push('Author is required');
  if (!article.publishDate) errors.push('Publish date is required');
  if (!article.category) errors.push('Category is required');
  if (!Array.isArray(article.tags)) errors.push('Tags must be an array');
  if (!article.featuredImage) errors.push('Featured image is required');
  if (!article.template) errors.push('Template is required');
  if (!article.content || !Array.isArray(article.content.sections)) {
    errors.push('Content sections are required');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};
