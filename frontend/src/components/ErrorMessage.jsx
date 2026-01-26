import React from 'react';
import { AlertCircle, X } from 'lucide-react';

const ErrorMessage = ({ 
  message, 
  onClose, 
  type = 'error',
  autoClose = false,
  autoCloseDelay = 5000 
}) => {
  React.useEffect(() => {
    if (autoClose && onClose) {
      const timer = setTimeout(onClose, autoCloseDelay);
      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseDelay, onClose]);

  if (!message) return null;

  const getIcon = () => {
    switch (type) {
      case 'error':
        return <AlertCircle size={20} />;
      case 'warning':
        return <AlertCircle size={20} />;
      default:
        return <AlertCircle size={20} />;
    }
  };

  const getStyles = () => {
    const baseStyles = {
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 9999,
      maxWidth: '400px',
      minWidth: '300px',
      padding: '1rem 1.25rem',
      borderRadius: 'var(--radius-lg)',
      background: 'var(--surface-blur)',
      backdropFilter: 'blur(20px)',
      border: '1px solid var(--glass-border)',
      boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      animation: 'slideInRight 0.3s ease-out',
      fontSize: '0.9rem',
      fontWeight: '500'
    };

    const typeStyles = {
      error: {
        borderLeft: '4px solid var(--error, #ef4444)',
        color: '#ef4444'
      },
      warning: {
        borderLeft: '4px solid var(--warning, #f59e0b)',
        color: '#f59e0b'
      },
      info: {
        borderLeft: '4px solid var(--primary)',
        color: 'var(--primary)'
      }
    };

    return { ...baseStyles, ...typeStyles[type] };
  };

  return (
    <>
      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes slideOutRight {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }
      `}</style>
      
      <div style={getStyles()}>
        <div style={{ 
          flexShrink: 0, 
          display: 'flex', 
          alignItems: 'center',
          color: 'inherit'
        }}>
          {getIcon()}
        </div>
        
        <div style={{ 
          flex: 1, 
          lineHeight: '1.4',
          wordBreak: 'break-word'
        }}>
          {message}
        </div>
        
        {onClose && (
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.25rem',
              borderRadius: '0.375rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'inherit',
              opacity: 0.7,
              transition: 'opacity 0.2s',
              flexShrink: 0
            }}
            onMouseEnter={(e) => e.target.style.opacity = '1'}
            onMouseLeave={(e) => e.target.style.opacity = '0.7'}
          >
            <X size={16} />
          </button>
        )}
      </div>
    </>
  );
};

export default ErrorMessage;
