import React, { useState } from 'react';
import { createArticle, generateSlug, validateArticle, ARTICLE_TEMPLATES } from '../data/blogTemplates';
import { addBlogArticle } from '../data/blogLoader';
import { Save, Eye, Plus, X } from 'lucide-react';

const ArticleCreator = () => {
  const [article, setArticle] = useState(createArticle());
  const [preview, setPreview] = useState(false);
  const [validation, setValidation] = useState({ isValid: true, errors: [] });

  const updateArticle = (field, value) => {
    if (field === 'title') {
      setArticle(prev => ({
        ...prev,
        [field]: value,
        id: generateSlug(value)
      }));
    } else {
      setArticle(prev => ({ ...prev, [field]: value }));
    }
  };

  const updateSection = (sectionIndex, field, value) => {
    setArticle(prev => ({
      ...prev,
      content: {
        ...prev.content,
        sections: prev.content.sections.map((section, index) =>
          index === sectionIndex ? { ...section, [field]: value } : section
        )
      }
    }));
  };

  const addSection = (type) => {
    const newSection = {
      type,
      title: type === 'text' ? 'New Section' : '',
      content: type === 'text' ? 'Your content here...' : '',
      src: type === 'image' ? 'https://images.unsplash.com/photo-new?w=800&h=400&fit=crop' : '',
      alt: type === 'image' ? 'Image description' : '',
      caption: type === 'image' ? 'Image caption' : ''
    };

    setArticle(prev => ({
      ...prev,
      content: {
        ...prev.content,
        sections: [...prev.content.sections, newSection]
      }
    }));
  };

  const removeSection = (index) => {
    setArticle(prev => ({
      ...prev,
      content: {
        ...prev.content,
        sections: prev.content.sections.filter((_, i) => i !== index)
      }
    }));
  };

  const saveArticle = () => {
    const validation = validateArticle(article);
    setValidation(validation);
    
    if (validation.isValid) {
      addBlogArticle(article);
      alert('Article saved successfully!');
      // Reset form
      setArticle(createArticle(article.template));
    }
  };

  const downloadJSON = () => {
    const dataStr = JSON.stringify(article, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `${article.id}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div className="glass" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <h1 className="brand" style={{ marginBottom: '2rem' }}>Article Creator</h1>
        
        {/* Template Selection */}
        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Template:</label>
          <select
            value={article.template}
            onChange={(e) => setArticle(createArticle(e.target.value))}
            style={{ width: '100%', padding: '0.75rem', background: 'var(--surface)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-md)', color: 'var(--text)' }}
          >
            {Object.entries(ARTICLE_TEMPLATES).map(([key, template]) => (
              <option key={key} value={key}>{template.name} - {template.description}</option>
            ))}
          </select>
        </div>

        {/* Basic Info */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Title:</label>
            <input
              type="text"
              value={article.title}
              onChange={(e) => updateArticle('title', e.target.value)}
              style={{ width: '100%', padding: '0.75rem', background: 'var(--surface)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-md)', color: 'var(--text)' }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Author:</label>
            <input
              type="text"
              value={article.author}
              onChange={(e) => updateArticle('author', e.target.value)}
              style={{ width: '100%', padding: '0.75rem', background: 'var(--surface)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-md)', color: 'var(--text)' }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Category:</label>
            <input
              type="text"
              value={article.category}
              onChange={(e) => updateArticle('category', e.target.value)}
              style={{ width: '100%', padding: '0.75rem', background: 'var(--surface)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-md)', color: 'var(--text)' }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Featured Image:</label>
            <input
              type="url"
              value={article.featuredImage}
              onChange={(e) => updateArticle('featuredImage', e.target.value)}
              style={{ width: '100%', padding: '0.75rem', background: 'var(--surface)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-md)', color: 'var(--text)' }}
            />
          </div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Excerpt:</label>
          <textarea
            value={article.excerpt}
            onChange={(e) => updateArticle('excerpt', e.target.value)}
            rows={3}
            style={{ width: '100%', padding: '0.75rem', background: 'var(--surface)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-md)', color: 'var(--text)', resize: 'vertical' }}
          />
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Tags (comma-separated):</label>
          <input
            type="text"
            value={article.tags.join(', ')}
            onChange={(e) => updateArticle('tags', e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag))}
            placeholder="tutorial, beginner, music-bingo"
            style={{ width: '100%', padding: '0.75rem', background: 'var(--surface)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-md)', color: 'var(--text)' }}
          />
        </div>

        {/* Content Sections */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Content Sections</h3>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => addSection('text')}
                className="btn btn-secondary"
                style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
              >
                <Plus size={16} style={{ marginRight: '0.5rem' }} />
                Add Text
              </button>
              <button
                onClick={() => addSection('image')}
                className="btn btn-secondary"
                style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
              >
                <Plus size={16} style={{ marginRight: '0.5rem' }} />
                Add Image
              </button>
            </div>
          </div>

          {article.content.sections.map((section, index) => (
            <div key={index} className="glass" style={{ padding: '1.5rem', marginBottom: '1rem', position: 'relative' }}>
              <button
                onClick={() => removeSection(index)}
                style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: 'var(--error)', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={16} />
              </button>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                {section.type === 'text' ? (
                  <>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Section Title:</label>
                      <input
                        type="text"
                        value={section.title || ''}
                        onChange={(e) => updateSection(index, 'title', e.target.value)}
                        style={{ width: '100%', padding: '0.75rem', background: 'var(--surface)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-md)', color: 'var(--text)' }}
                      />
                    </div>
                    <div style={{ gridColumn: '1 / -1' }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Content:</label>
                      <textarea
                        value={section.content || ''}
                        onChange={(e) => updateSection(index, 'content', e.target.value)}
                        rows={6}
                        style={{ width: '100%', padding: '0.75rem', background: 'var(--surface)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-md)', color: 'var(--text)', resize: 'vertical' }}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Image URL:</label>
                      <input
                        type="url"
                        value={section.src || ''}
                        onChange={(e) => updateSection(index, 'src', e.target.value)}
                        style={{ width: '100%', padding: '0.75rem', background: 'var(--surface)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-md)', color: 'var(--text)' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Alt Text:</label>
                      <input
                        type="text"
                        value={section.alt || ''}
                        onChange={(e) => updateSection(index, 'alt', e.target.value)}
                        style={{ width: '100%', padding: '0.75rem', background: 'var(--surface)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-md)', color: 'var(--text)' }}
                      />
                    </div>
                    <div style={{ gridColumn: '1 / -1' }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Caption:</label>
                      <input
                        type="text"
                        value={section.caption || ''}
                        onChange={(e) => updateSection(index, 'caption', e.target.value)}
                        style={{ width: '100%', padding: '0.75rem', background: 'var(--surface)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-md)', color: 'var(--text)' }}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Validation Errors */}
        {!validation.isValid && (
          <div className="glass" style={{ padding: '1rem', marginBottom: '2rem', background: 'var(--error-bg)', border: '1px solid var(--error)' }}>
            <h4 style={{ color: 'var(--error)', marginBottom: '0.5rem' }}>Please fix these errors:</h4>
            <ul style={{ color: 'var(--error)', margin: 0, paddingLeft: '1.5rem' }}>
              {validation.errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button
            onClick={() => setPreview(!preview)}
            className="btn btn-secondary"
            style={{ padding: '0.75rem 1.5rem' }}
          >
            <Eye size={20} style={{ marginRight: '0.5rem' }} />
            {preview ? 'Hide Preview' : 'Show Preview'}
          </button>
          
          <button
            onClick={downloadJSON}
            className="btn btn-secondary"
            style={{ padding: '0.75rem 1.5rem' }}
          >
            <Save size={20} style={{ marginRight: '0.5rem' }} />
            Download JSON
          </button>
          
          <button
            onClick={saveArticle}
            className="btn btn-primary"
            style={{ padding: '0.75rem 1.5rem' }}
          >
            <Save size={20} style={{ marginRight: '0.5rem' }} />
            Save Article
          </button>
        </div>
      </div>

      {/* Preview */}
      {preview && (
        <div className="glass" style={{ padding: '2rem' }}>
          <h2 className="brand" style={{ marginBottom: '1rem' }}>Preview</h2>
          <div style={{ background: 'var(--surface)', padding: '1.5rem', borderRadius: 'var(--radius-md)' }}>
            <h3 style={{ marginBottom: '0.5rem' }}>{article.title}</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>{article.excerpt}</p>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              <span>By {article.author} • {article.readTime} • {article.category}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleCreator;
