import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, Tag } from 'lucide-react';
import { blogArticles } from '../data/blogLoader';
import { handleImageError } from '../utils/blogImageUtils';
import Layout from '../components/Layout';

const Blog = () => {
  const navigate = useNavigate();

  // Sort articles from new to old (already handled by blogLoader)
  const sortedArticles = [...blogArticles].sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));

  return (
    <Layout>
      <div className="container" style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div className="glass" style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <h1 className="brand" style={{ marginBottom: '1rem', color: 'var(--text)', textDecoration: 'none', fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
            Blog
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            The tips and articles to make an unforgettable event with Music Bingo!
          </p>
        </div>

        {/* Articles Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
          {sortedArticles.map((article, index) => (
            <article
              key={article.id}
              className="glass"
              style={{
                borderRadius: '1rem',
                overflow: 'hidden',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
              }}
              onClick={() => navigate(`/blog/${article.id}`)}
            >
              {/* Image */}
              <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                <img
                  src={article.featuredImage}
                  alt={article.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => handleImageError(e, article.category, article.tags)}
                />
              </div>

              {/* Content */}
              <div style={{ padding: '1.5rem' }}>
                <Link to={`/blog/${article.id}`} style={{ textDecoration: 'none' }}>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem', color: 'var(--text)', textDecoration: 'none', lineHeight: '1.3' }}>
                    {article.title}
                  </h2>
                </Link>

                <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: '1.6' }}>
                  {article.excerpt}
                </p>

                {/* Meta Info */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <User style={{ width: '16px', height: '16px' }} />
                    {article.author}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Calendar style={{ width: '16px', height: '16px' }} />
                    {new Date(article.publishDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Clock style={{ width: '16px', height: '16px' }} />
                    {article.readTime}
                  </div>
                </div>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {article.tags.map(tag => (
                    <span
                      key={tag}
                      className="btn btn-secondary"
                      style={{ fontSize: '0.75rem', padding: '0.25rem 0.75rem' }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* No Results */}
        {sortedArticles.length === 0 && (
          <div className="glass" style={{ textAlign: 'center', padding: '3rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text)' }}>No articles found</h3>
            <p style={{ color: 'var(--text-muted)' }}>Check back soon for new content!</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Blog;
