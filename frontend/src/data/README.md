# Blog Management System

This new blog system makes it easy to create and manage articles through templates and JSON files.

## 📁 File Structure

```
frontend/src/data/
├── blogTemplates.js     # Template definitions and helpers
├── blogLoader.js       # Dynamic article loader
├── blogArticles.js     # Legacy articles (still works)
└── blog-articles/     # New article files (JSON format)
    ├── advanced-music-bingo-tips.json
    ├── seasonal-music-bingo.json
    └── your-article.json
```

## 🎯 Templates

### 1. Text Heavy
- Perfect for: Detailed guides, tutorials, step-by-step instructions
- Structure: Multiple text sections with titles

### 2. Image & Text  
- Perfect for: Visual storytelling, case studies, examples
- Structure: Alternating images and text sections

### 3. Mixed Content
- Perfect for: Flexible layouts, varied content types
- Structure: Custom mix of text and images

## 📝 Creating Articles

### Method 1: Article Creator Tool
Visit `/create-article` to use the visual form:
1. Choose a template
2. Fill in basic info (title, author, category)
3. Edit content sections
4. Preview and save

### Method 2: JSON Files
Create `.json` files in `data/blog-articles/`:

```json
{
  "id": "your-article-slug",
  "title": "Your Article Title",
  "excerpt": "Brief description...",
  "author": "Your Name",
  "publishDate": "2024-01-20",
  "readTime": "5 min read",
  "category": "Tutorial",
  "tags": ["tag1", "tag2"],
  "featuredImage": "https://images.unsplash.com/photo...",
  "template": "text-heavy",
  "content": {
    "sections": [
      {
        "type": "text",
        "title": "Section Title",
        "content": "Your content here..."
      }
    ]
  }
}
```

## 🚀 Features

- **Template System**: Pre-built layouts for different content types
- **Dynamic Loading**: Automatically loads all JSON files from folder
- **Validation**: Built-in article validation
- **Preview**: Live preview while creating
- **Export**: Download articles as JSON files
- **Backward Compatible**: Still works with existing blogArticles.js

## 📸 Image Sources

Use Unsplash for high-quality, free images:
- Base URL: `https://images.unsplash.com/photo-{id}?w=800&h=400&fit=crop`
- Find photos: https://unsplash.com/

## 🔄 Migration

To migrate existing articles:
1. Use Article Creator tool at `/create-article`
2. Select appropriate template
3. Copy-paste content from existing articles
4. Download as JSON
5. Move to `data/blog-articles/` folder

## 🛠️ Development

In production, the `blogLoader.js` would connect to a backend API that:
- Reads files from `blog-articles/` directory
- Provides CRUD operations for articles
- Handles file uploads and management

For now, it simulates this functionality and maintains backward compatibility.

## 📊 Article Schema

| Field | Type | Required | Description |
|--------|------|----------|-------------|
| id | string | ✅ | Unique identifier (URL slug) |
| title | string | ✅ | Article title |
| excerpt | string | ✅ | Brief description |
| author | string | ✅ | Author name |
| publishDate | string | ✅ | YYYY-MM-DD format |
| readTime | string | ✅ | "X min read" |
| category | string | ✅ | Article category |
| tags | array | ✅ | Array of tag strings |
| featuredImage | string | ✅ | Image URL |
| template | string | ✅ | Template type |
| content.sections | array | ✅ | Content sections |

## 🎨 Styling

All articles automatically use your design system:
- CSS variables for colors and spacing
- Glassmorphism effects
- Responsive layouts
- Consistent typography
