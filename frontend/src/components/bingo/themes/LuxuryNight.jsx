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
            { content: <Disc size={150} color="#1e293b" opacity={0.03} />, style: { top: '5%', right: '5%', transform: 'rotate(15deg)' } },
            { content: <Headphones size={120} color="#1e293b" opacity={0.02} />, style: { bottom: '10%', left: '5%', transform: 'rotate(-10deg)' } },
            { content: <Music size={100} color="#1e293b" opacity={0.03} />, style: { top: '15%', left: '10%', transform: 'rotate(-20deg)' } },
            // Radio and microphone elements - shadow effects
            {
                content: (
                    <svg width="160" height="160" viewBox="0 0 160 160" style={{ opacity: 0.12 }}>
                        <circle cx="80" cy="80" r="60" fill="none" stroke="#1e293b" strokeWidth="3" />
                        <circle cx="80" cy="80" r="40" fill="none" stroke="#1e293b" strokeWidth="2" />
                        <circle cx="80" cy="80" r="20" fill="#1e293b" />
                        <rect x="70" y="20" width="20" height="30" fill="#1e293b" rx="2" />
                    </svg>
                ),
                style: { top: '10%', left: '68%', transform: 'rotate(-5deg)' },
                decorationLevel: 'subtle'
            },
            {
                content: (
                    <svg width="140" height="140" viewBox="0 0 140 140" style={{ opacity: 0.12 }}>
                        <ellipse cx="70" cy="90" rx="25" ry="35" fill="#1e293b" />
                        <rect x="60" y="30" width="20" height="60" fill="#1e293b" rx="10" />
                        <circle cx="55" cy="40" r="8" fill="#1e293b" />
                        <circle cx="85" cy="40" r="8" fill="#1e293b" />
                    </svg>
                ),
                style: { bottom: '20%', right: '8%', transform: 'rotate(8deg)' },
                decorationLevel: 'prominent'
            },
            {
                content: (
                    <svg width="120" height="120" viewBox="0 0 120 120" style={{ opacity: 0.12 }}>
                        <rect x="20" y="40" width="80" height="40" fill="none" stroke="#3b82f6" strokeWidth="2" rx="5" />
                        <circle cx="35" cy="60" r="8" fill="#3b82f6" />
                        <circle cx="85" cy="60" r="8" fill="#3b82f6" />
                        <rect x="45" y="50" width="30" height="20" fill="#3b82f6" rx="2" />
                    </svg>
                ),
                style: { top: '60%', right: '15%', transform: 'rotate(12deg)' },
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
                style: { top: '0px', right: '0px' },
                isDecorative: true
            },
            // Bottom VIP ACCESS
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
