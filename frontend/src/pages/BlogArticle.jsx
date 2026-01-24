import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, Tag, ArrowLeft, Share2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { loadBlogArticles, getArticleBySlug, getRecentArticles } from '../data/blogLoader';
import { handleImageError } from '../utils/blogImageUtils';
import Layout from '../components/Layout';

// Parse markdown-style bold text
const parseMarkdown = (text) => {
  // Replace **bold** with <strong>bold</strong>
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
};

// Template Components
const TextHeavyTemplate = ({ sections }) => (
  <div style={{ maxWidth: '64rem', margin: '0 auto' }}>
    {sections.map((section, index) => (
      <div key={index} style={{ marginBottom: '3rem' }}>
        {section.title && (
          <h2 className="brand" style={{ marginBottom: '1.5rem', color: 'var(--text)', textDecoration: 'none' }}>{section.title}</h2>
        )}
        <div style={{ lineHeight: '1.7', color: 'var(--text)' }}>
          {section.content.split('\n').map((paragraph, pIndex) => (
            <p key={pIndex} style={{ marginBottom: '1rem' }} dangerouslySetInnerHTML={{ __html: parseMarkdown(paragraph) }} />
          ))}
        </div>
      </div>
    ))}
  </div>
);

const ImageTextTemplate = ({ sections }) => (
  <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
    {sections.map((section, index) => (
      <div key={index} style={{ marginBottom: '4rem' }}>
        {section.type === 'image' ? (
          <div style={{ marginBottom: '2rem' }}>
            <img
              src={section.src}
              alt={section.alt}
              style={{ width: '100%', height: '24rem', objectFit: 'cover', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)' }}
              onError={(e) => {
                e.target.src = '/assets/images/blog/default.png';
              }}
            />
            {section.caption && (
              <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '1rem', fontStyle: 'italic' }}>{section.caption}</p>
            )}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
            <div>
              {section.title && (
                <h2 className="brand" style={{ marginBottom: '1.5rem' }}>{section.title}</h2>
              )}
              <div style={{ lineHeight: '1.7', color: 'var(--text)' }}>
                {section.content.split('\n').map((paragraph, pIndex) => (
                  <p key={pIndex} style={{ marginBottom: '1rem' }} dangerouslySetInnerHTML={{ __html: parseMarkdown(paragraph) }} />
                ))}
              </div>
            </div>
            {index > 0 && sections[index - 1]?.type === 'image' && (
              <div style={{ order: '-1' }}>
                <img
                  src={sections[index - 1].src}
                  alt={sections[index - 1].alt}
                  style={{ width: '100%', height: '20rem', objectFit: 'cover', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)' }}
                  onError={(e) => handleImageError(e, section.category, section.tags)}
                />
                {sections[index - 1].caption && (
                  <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '1rem', fontStyle: 'italic' }}>{sections[index - 1].caption}</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    ))}
  </div>
);

const MixedTemplate = ({ sections }) => (
  <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
    {sections.map((section, index) => (
      <div key={index} style={{ marginBottom: '4rem' }}>
        {section.type === 'image' ? (
          <div style={{ marginBottom: '2rem', marginLeft: index % 2 === 1 ? 'auto' : '0', marginRight: index % 2 === 1 ? '0' : 'auto' }}>
            <img
              src={section.src}
              alt={section.alt}
              style={{ width: '100%', height: '24rem', objectFit: 'cover', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)' }}
              onError={(e) => handleImageError(e, section.category, section.tags)}
            />
            {section.caption && (
              <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '1rem', fontStyle: 'italic' }}>{section.caption}</p>
            )}
          </div>
        ) : (
          <div style={{ marginLeft: index % 2 === 1 ? 'auto' : '0', marginRight: index % 2 === 1 ? '0' : 'auto' }}>
            {section.title && (
              <h2 className="brand" style={{ marginBottom: '1.5rem' }}>{section.title}</h2>
            )}
            <div style={{ lineHeight: '1.7', color: 'var(--text)' }}>
              {section.content.split('\n').map((paragraph, pIndex) => (
                <p key={pIndex} style={{ marginBottom: '1rem' }} dangerouslySetInnerHTML={{ __html: parseMarkdown(paragraph) }} />
              ))}
            </div>
          </div>
        )}
      </div>
    ))}
  </div>
);

const BlogArticle = () => {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [recentArticles, setRecentArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticleData = async () => {
      setLoading(true);
      const articles = await loadBlogArticles(i18n.language.split('-')[0]);
      setArticle(getArticleBySlug(slug));
      setRecentArticles(getRecentArticles(3).filter(a => a.id !== slug));
      setLoading(false);
    };
    fetchArticleData();
  }, [slug, i18n.language]);

  if (loading) return (
    <Layout>
      <div style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="spin-m" />
      </div>
    </Layout>
  );

  if (!article) {
    return (
      <Layout>
        <div style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <h1 className="brand" style={{ marginBottom: '1rem' }}>Article Not Found</h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>The article you're looking for doesn't exist.</p>
            <button
              onClick={() => navigate('/blog')}
              className="btn btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <ArrowLeft style={{ width: '20px', height: '20px' }} />
              {t('create.nav.back')}
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(i18n.language === 'es' ? 'es-ES' : (i18n.language === 'ca' ? 'ca-ES' : 'en-GB'), {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderTemplate = () => {
    switch (article.template) {
      case 'text-heavy':
        return <TextHeavyTemplate sections={article.content.sections} />;
      case 'image-text':
        return <ImageTextTemplate sections={article.content.sections} />;
      case 'mixed':
        return <MixedTemplate sections={article.content.sections} />;
      default:
        return <TextHeavyTemplate sections={article.content.sections} />;
    }
  };

  const shareArticle = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <Layout>
      <div className="container" style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Hero Section */}
        <div className="glass" style={{ marginBottom: '3rem', overflow: 'hidden', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ height: '300px', position: 'relative', overflow: 'hidden' }}>
            <img
              src={article.featuredImage}
              alt={article.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => handleImageError(e, article.category, article.tags)}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6))', display: 'flex', alignItems: 'flex-end', padding: '2rem' }}>
              <div style={{ color: 'white', width: '100%' }}>
                <h1 className="brand" style={{ marginBottom: '0.5rem', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}>{article.title}</h1>
                <p style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', opacity: 0.95 }}>{article.excerpt}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Meta Information */}
        <div className="glass" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <User style={{ width: '16px', height: '16px' }} />
                {article.author}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Calendar style={{ width: '16px', height: '16px' }} />
                {formatDate(article.publishDate)}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Clock style={{ width: '16px', height: '16px' }} />
                {article.readTime}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="btn btn-primary" style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem' }}>
                  {article.category}
                </span>
              </div>
            </div>
            <button
              onClick={shareArticle}
              className="btn btn-secondary"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <Share2 style={{ width: '16px', height: '16px' }} />
              {t('common.share', { defaultValue: 'Share' })}
            </button>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {article.tags.map(tag => (
              <span
                key={tag}
                style={{
                  background: 'var(--surface-light)',
                  color: 'var(--text-muted)',
                  padding: '0.4rem 0.75rem',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.8rem'
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Article Body */}
        <div className="glass" style={{ padding: '2rem', marginBottom: '3rem' }}>
          {renderTemplate()}
        </div>

        {/* Related Articles */}
        {recentArticles.length > 0 && (
          <div className="glass" style={{ padding: '2rem' }}>
            <h2 className="brand" style={{ marginBottom: '1.5rem' }}>{t('landing.blog.title')}</h2>
            <div className="grid-auto-fit">
              {recentArticles.map(relatedArticle => (
                <article
                  key={relatedArticle.id}
                  className="glass glass-hover"
                  onClick={() => navigate(`/blog/${relatedArticle.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <div style={{ height: '128px', background: 'var(--surface-light)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                    <img
                      src={relatedArticle.featuredImage}
                      alt={relatedArticle.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => handleImageError(e, relatedArticle.category, relatedArticle.tags)}
                    />
                  </div>
                  <div style={{ padding: '1rem' }}>
                    <h3 style={{
                      fontSize: '1.125rem',
                      fontWeight: '600',
                      color: 'var(--text)',
                      marginBottom: '0.5rem'
                    }}>
                      {relatedArticle.title}
                    </h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{relatedArticle.readTime}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BlogArticle;
