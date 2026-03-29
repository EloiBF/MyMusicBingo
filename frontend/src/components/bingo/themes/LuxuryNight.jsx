import React from 'react';
import { Music, Music2, Disc, Headphones, Sparkles } from 'lucide-react';

export default {
    id: 'luxury_night',
    label: "Let's Party",
    category: 'Premium',
    font: "'Montserrat', sans-serif",
    defaultAccentColor: '#3b82f6',
    defaultGridSize: 'medium',
    background: {
        color: '#ffffff',
        elements: [
            { content: <Headphones size={60} color="#1e293b" />, style: { bottom: '72%', left: '82%', transform: 'rotate(-12deg)' }, decorationLevel: 'subtle' },
            // Radio and microphone elements - enhanced shadow effects
            {
                content: (
                    <svg width="100" height="100" viewBox="0 0 120 120">
                        <rect x="15" y="35" width="90" height="50" fill="none" stroke="#3b82f6" strokeWidth="3" rx="8" />
                        <circle cx="30" cy="60" r="10" fill="#3b82f6" />
                        <circle cx="90" cy="60" r="10" fill="#3b82f6" />
                        <rect x="40" y="45" width="40" height="30" fill="#3b82f6" rx="3" />
                        <circle cx="60" cy="60" r="15" fill="none" stroke="#3b82f6" strokeWidth="2" />
                        <path d="M55 55 L65 65 M65 55 L55 65" stroke="#ffffff" strokeWidth="2" />
                    </svg>
                ),
                style: { bottom: '3%', right: '3%', transform: 'rotate(15deg)' },
                decorationLevel: 'subtle'
            },
            {
                content: (
                    <div style={{
                        background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
                        color: 'white',
                        padding: '6pt 18pt',
                        fontWeight: '900',
                        fontSize: '11pt',
                        borderRadius: '6px',
                        transform: 'rotate(12deg)',
                        boxShadow: '4px 4px 0px #1e293b',
                        border: '3px solid #1e293b'
                    }}>
                        VIBES ONLY
                    </div>
                ),
                style: { top: '8px', right: '8px' },
                isDecorative: true
            },
            // Bottom line with enhanced styling
            {
                content: (
                    <div style={{ width: '100%', borderTop: '3px dashed #000', paddingTop: '10px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '9pt', fontWeight: '950', letterSpacing: '3pt', color: '#1e293b' }}>VIP ACCESS</span>
                        <div style={{ width: '20px', height: '20px', background: '#3b82f6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ fontSize: '10pt', color: 'white', fontWeight: 'bold' }}>★</span>
                        </div>
                    </div>
                ),
                style: { bottom: '5%', left: '6%', right: '6%' },
                isDecorative: true
            }
        ]
    },
    card: {
        border: '4px solid #1e293b',
        background: '#ffffff',
        borderRadius: '0px',
        offset: '15mm'
    },
    title: {
        content: 'MUSIC BINGO',
        size: 'medium',
        weight: '950',
        color: '#1e293b',
        letterSpacing: '1pt',
        shadow: '6px 6px 0px #3b82f6',
        textAlign: 'left',
        emojis: { left: '', right: '' }
    },
    subtitle: {
        size: 'medium',
        weight: '700',
        color: '#64748b',
        letterSpacing: '2pt',
        textAlign: 'left'
    },
    grid: { gap: '16px', padding: '30px 20px' },
    cell: {
        shape: '0px',
        border: '3px solid #1e293b',
        background: '#ffffff',
        shadow: '8px 8px 0px #3b82f6',
        offset: '15px'
    },
    song: { size: 'medium', weight: '850', color: '#0f172a' },
    artist: {
        size: 'medium',
        weight: '800',
        color: '#ffffff',
        background: '#3b82f6',
        padding: '3px 10px',
        borderRadius: '4px'
    },
    cardNumber: {
        size: 'small',
        weight: '800',
        color: '#1e293b',
        background: '#f1f5f9',
        padding: '4px 12px',
        borderRadius: '20px'
    },
    footer: {
        size: 'small',
        weight: '900',
        color: '#94a3b8',
        letterSpacing: '2pt'
    }
};
