import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Languages, ChevronDown, Check, Globe } from 'lucide-react';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const languages = [
        { code: 'en', label: 'English', flag: 'EN' },
        { code: 'es', label: 'Español', flag: 'ES' },
        { code: 'ca', label: 'Català', flag: 'CA' }
    ];

    const currentLanguage = languages.find(lang => lang.code === i18n.language.split('-')[0]) || languages[0];

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setIsOpen(false);
    };

    return (
        <div style={{ position: 'relative' }}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    background: 'var(--surface-light)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--text)',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    fontWeight: '500',
                    transition: 'var(--transition)'
                }}
            >
                <Globe size={18} style={{ color: 'var(--primary)' }} />
                <span>{currentLanguage.flag}</span>
                <ChevronDown size={14} style={{
                    transition: 'transform 0.3s ease',
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                }} />
            </button>

            {isOpen && (
                <>
                    <div
                        onClick={() => setIsOpen(false)}
                        style={{
                            position: 'fixed',
                            top: 0, left: 0, right: 0, bottom: 0,
                            zIndex: 1000
                        }}
                    />
                    <div style={{
                        position: 'absolute',
                        top: '120%',
                        right: 0,
                        background: 'var(--surface)',
                        border: '1px solid var(--glass-border)',
                        borderRadius: 'var(--radius-md)',
                        boxShadow: 'var(--shadow-lg)',
                        zIndex: 1001,
                        minWidth: '150px',
                        overflow: 'hidden',
                        padding: '0.5rem'
                    }}>
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => changeLanguage(lang.code)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    width: '100%',
                                    padding: '0.75rem 1rem',
                                    background: i18n.language.startsWith(lang.code) ? 'var(--surface-light)' : 'transparent',
                                    border: 'none',
                                    color: 'var(--text)',
                                    cursor: 'pointer',
                                    borderRadius: 'var(--radius-sm)',
                                    textAlign: 'left',
                                    transition: 'var(--transition)'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <span>{lang.flag}</span>
                                    <span>{lang.label}</span>
                                </div>
                                {i18n.language.startsWith(lang.code) && (
                                    <Check size={14} style={{ color: 'var(--primary)' }} />
                                )}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default LanguageSwitcher;
