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
            { content: <Headphones size={80} color="#1e293b" />, style: { bottom: '68%', left: '80%', transform: 'rotate(-10deg)' }, decorationLevel: 'subtle' },
            // Radio and microphone elements - shadow effects
            {
                content: (
                    <svg width="120" height="120" viewBox="0 0 120 120">
                        <rect x="20" y="40" width="80" height="40" fill="none" stroke="#3b82f6" strokeWidth="2" rx="5" />
                        <circle cx="35" cy="60" r="8" fill="#3b82f6" />
                        <circle cx="85" cy="60" r="8" fill="#3b82f6" />
                        <rect x="45" y="50" width="30" height="20" fill="#3b82f6" rx="2" />
                    </svg>
                ),
                style: { bottom: '2%', right: '2%', transform: 'rotate(12deg)' },
                decorationLevel: 'subtle'
            },
            {
                content: (
                    <div style={{
                        background: '#3b82f6',
                        color: 'white',
                        padding: '5pt 15pt',
                        fontWeight: '900',
                        fontSize: '10pt',
                        borderRadius: '2px',
                        transform: 'rotate(10deg)',
                        boxShadow: '4px 4px 0px #1e293b',
                        border: '2px solid #1e293b'
                    }}>
                        VIBES ONLY
                    </div>
                ),
                style: { top: '5px', right: '5px' },
                isDecorative: true
            },
            // Bottom line
            {
                content: (
                    <div style={{ width: '100%', borderTop: '2px dashed #000', paddingTop: '8px', display: 'flex', justifyContent: 'flex-end' }}>
                        <span style={{ fontSize: '8pt', fontWeight: '900', letterSpacing: '2pt' }}>VIP ACCESS</span>
                    </div>
                ),
                style: { bottom: '4%', left: '5%', right: '5%' },
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
