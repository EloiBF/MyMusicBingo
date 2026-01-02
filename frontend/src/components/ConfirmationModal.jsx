import React from 'react';
import { AlertCircle, X } from 'lucide-react';

const ConfirmationModal = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    title, 
    message, 
    confirmText = "Confirm", 
    confirmColor = "#ef4444", 
    icon = <AlertCircle size={44} />,
    isLoading = false
}) => {
    if (!isOpen) return null;

    return (
        <div style={{ 
            position: 'fixed', 
            inset: 0, 
            background: 'rgba(0,0,0,0.8)', 
            zIndex: 2000, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            padding: '1rem', 
            backdropFilter: 'blur(4px)',
            animation: 'fadeIn 0.2s ease-out'
        }}>
            <div className="glass" style={{ 
                padding: '2.5rem', 
                maxWidth: '440px', 
                width: '100%', 
                textAlign: 'center', 
                border: `1px solid ${confirmColor}40`,
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}>
                <button 
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-muted)',
                        cursor: 'pointer'
                    }}
                >
                    <X size={20} />
                </button>

                <div style={{ color: confirmColor, marginBottom: '1.25rem', display: 'flex', justifyContent: 'center' }}>
                    {React.cloneElement(icon, { style: { margin: '0 auto' } })}
                </div>
                
                <h3 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', fontWeight: '700' }}>{title}</h3>
                
                <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', lineHeight: '1.6' }}>
                    {message}
                </p>
                
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button 
                        onClick={onClose} 
                        className="btn btn-secondary" 
                        style={{ flex: 1 }}
                        disabled={isLoading}
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={onConfirm} 
                        className="btn" 
                        style={{ 
                            flex: 1, 
                            background: confirmColor, 
                            color: 'white',
                            border: 'none',
                            opacity: isLoading ? 0.7 : 1,
                            cursor: isLoading ? 'wait' : 'pointer'
                        }}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Processing...' : confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
