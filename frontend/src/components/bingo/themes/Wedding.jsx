import React from 'react';
import { Heart, Music, Sparkles, Star, Bird } from 'lucide-react';

export default {
    id: 'wedding',
    label: 'Wedding Elegance',
    category: 'Celebrations',
    font: "'Cormorant Garamond', serif",
    defaultAccentColor: '#6b7c59',
    defaultGridSize: 'medium',
    defaultTitleSpace: 'large',
    background: {
        color: '#fdfdfc',
        elements: [
            // Elegant Corner Flourish - Top Left with Ring
            {
                content: (
                    <svg width="200" height="200" viewBox="0 0 100 100" style={{ filter: 'drop-shadow(2px 2px 3px rgba(0,0,0,0.1))' }}>
                        <path d="M5,5 Q20,8 30,25 Q12,20 5,5" fill="none" stroke="#d4af37" strokeWidth="0.8" opacity="0.6" />
                        <path d="M8,30 Q25,32 40,20 Q32,25 8,30" fill="none" stroke="#6b7c59" strokeWidth="0.6" opacity="0.5" />
                        <circle cx="5" cy="5" r="1" fill="#d4af37" opacity="0.7" />
                        <circle cx="15" cy="18" r="0.8" fill="#d4af37" opacity="0.5" />
                        <circle cx="25" cy="35" r="8" fill="none" stroke="#d4af37" strokeWidth="1.2" opacity="0.4" />
                        <circle cx="25" cy="35" r="1" fill="#d4af37" opacity="0.6" />
                    </svg>
                ),
                style: { top: '5mm', left: '5mm' },
                isDecorative: true
            },
            // Elegant Corner Flourish - Bottom Right with Ring
            {
                content: (
                    <svg width="200" height="200" viewBox="0 0 100 100" style={{ transform: 'rotate(180deg)', filter: 'drop-shadow(2px 2px 3px rgba(0,0,0,0.1))' }}>
                        <path d="M5,5 Q20,8 30,25 Q12,20 5,5" fill="none" stroke="#d4af37" strokeWidth="0.8" opacity="0.6" />
                        <path d="M8,30 Q25,32 40,20 Q32,25 8,30" fill="none" stroke="#6b7c59" strokeWidth="0.6" opacity="0.5" />
                        <circle cx="5" cy="5" r="1" fill="#d4af37" opacity="0.7" />
                        <circle cx="15" cy="18" r="0.8" fill="#d4af37" opacity="0.5" />
                        <circle cx="25" cy="35" r="8" fill="none" stroke="#d4af37" strokeWidth="1.2" opacity="0.4" />
                        <circle cx="25" cy="35" r="1" fill="#d4af37" opacity="0.6" />
                    </svg>
                ),
                style: { bottom: '5mm', right: '5mm' },
                isDecorative: true
            },

            // Soft Silk-like Gradient Top
            {
                content: <div style={{ width: '100%', height: '30%', background: 'linear-gradient(180deg, rgba(212, 175, 55, 0.02) 0%, transparent 100%)' }} />,
                style: { top: 0, left: 0, width: '100%' },
                isDecorative: true
            },

            // Central Wedding Rings with Shadow
            {
                content: (
                    <svg width="140" height="140" viewBox="0 0 60 60" style={{ filter: 'drop-shadow(3px 3px 4px rgba(0,0,0,0.15))' }}>
                        <circle cx="20" cy="30" r="12" fill="none" stroke="#d4af37" strokeWidth="2" opacity="0.6" />
                        <circle cx="40" cy="30" r="12" fill="none" stroke="#d4af37" strokeWidth="2" opacity="0.6" />
                        <path d="M20,18 Q30,15 40,18" fill="none" stroke="#d4af37" strokeWidth="1.5" opacity="0.5" />
                        <circle cx="20" cy="30" r="2.5" fill="#d4af37" opacity="0.7" />
                        <circle cx="40" cy="30" r="2.5" fill="#d4af37" opacity="0.7" />
                        <path d="M15,25 Q20,22 25,25" fill="none" stroke="#d4af37" strokeWidth="0.8" opacity="0.4" />
                        <path d="M35,25 Q40,22 45,25" fill="none" stroke="#d4af37" strokeWidth="0.8" opacity="0.4" />
                    </svg>
                ),
                style: { top: '15%', left: '50%', transform: 'translateX(-50%)' },
                decorationLevel: 'subtle'
            },

            // Subtle Floral Elements with Shadows
            { content: <Heart size={32} color="#d4af37" strokeWidth={1} opacity={0.3} style={{ filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.1))' }} />, style: { top: '20%', left: '15%', transform: 'rotate(-15deg)' }, decorationLevel: 'subtle' },
            { content: <Heart size={28} color="#d4af37" strokeWidth={1} opacity={0.25} style={{ filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.1))' }} />, style: { top: '25%', right: '20%', transform: 'rotate(10deg)' }, decorationLevel: 'subtle' },
            { content: <Heart size={30} color="#d4af37" strokeWidth={1} opacity={0.28} style={{ filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.1))' }} />, style: { top: '30%', left: '25%', transform: 'rotate(5deg)' }, decorationLevel: 'subtle' },

            // Elegant Doves with Shadows
            { content: <Bird size={40} color="#6b7c59" strokeWidth={1} opacity={0.4} style={{ filter: 'drop-shadow(2px 2px 3px rgba(0,0,0,0.12))' }} />, style: { top: '12%', right: '8%', transform: 'scaleX(-1) scale(0.8)' }, decorationLevel: 'subtle' },
            { content: <Bird size={40} color="#6b7c59" strokeWidth={1} opacity={0.4} style={{ filter: 'drop-shadow(2px 2px 3px rgba(0,0,0,0.12))' }} />, style: { top: '12%', left: '8%', transform: 'scale(0.8)' }, decorationLevel: 'subtle' },

            // Small Ring Decorations with Shadows
            {
                content: (
                    <svg width="60" height="60" viewBox="0 0 30 30" style={{ filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.1))' }}>
                        <circle cx="15" cy="15" r="10" fill="none" stroke="#d4af37" strokeWidth="1.5" opacity="0.5" />
                        <circle cx="15" cy="15" r="1.5" fill="#d4af37" opacity="0.6" />
                    </svg>
                ),
                style: { top: '35%', left: '8%', transform: 'rotate(-10deg)' },
                decorationLevel: 'subtle'
            },
            {
                content: (
                    <svg width="60" height="60" viewBox="0 0 30 30" style={{ filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.1))' }}>
                        <circle cx="15" cy="15" r="10" fill="none" stroke="#d4af37" strokeWidth="1.5" opacity="0.5" />
                        <circle cx="15" cy="15" r="1.5" fill="#d4af37" opacity="0.6" />
                    </svg>
                ),
                style: { top: '35%', right: '8%', transform: 'rotate(10deg)' },
                decorationLevel: 'subtle'
            },

            // Subtle Sparkles with Shadows
            { content: <Sparkles size={28} color="#d4af37" opacity={0.3} style={{ filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.08))' }} />, style: { bottom: '25%', left: '5%' }, decorationLevel: 'subtle' },
            { content: <Sparkles size={26} color="#d4af37" opacity={0.25} style={{ filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.08))' }} />, style: { bottom: '28%', right: '8%' }, decorationLevel: 'subtle' },
            { content: <Sparkles size={24} color="#d4af37" opacity={0.2} style={{ filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.08))' }} />, style: { bottom: '22%', left: '12%' }, decorationLevel: 'subtle' },

            // Elegant Divider Line with Shadow
            {
                content: (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.1))' }}>
                        <div style={{ width: '40px', height: '0.5px', background: 'linear-gradient(90deg, transparent, #d4af37, transparent)' }} />
                        <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#d4af37' }} />
                        <div style={{ width: '40px', height: '0.5px', background: 'linear-gradient(90deg, transparent, #d4af37, transparent)' }} />
                    </div>
                ),
                style: { top: '42%', left: '50%', transform: 'translateX(-50%)' },
                isDecorative: true
            },

            // Very Subtle Texture Overlay
            {
                content: <div style={{ width: '100%', height: '100%', background: 'radial-gradient(circle, rgba(212, 175, 55, 0.01) 1px, transparent 1px)', backgroundSize: '25px 25px' }} />,
                style: { top: 0, left: 0, width: '100%', height: '100%' },
                isDecorative: true
            }
        ]
    },
    card: {
        border: '1px solid #d4af37',
        background: '#ffffff',
        borderRadius: '4px',
        offset: '15mm',
        shadow: '0 15px 40px rgba(107, 124, 89, 0.1)'
    },
    title: {
        content: 'Music Bingo',
        size: 'medium',
        weight: '400',
        color: '#6b7c59',
        letterSpacing: '3pt',
        textAlign: 'center',
        textTransform: 'uppercase',
        font: "'Cormorant Garamond', serif"
    },
    subtitle: {
        size: 'large',
        weight: '300',
        color: '#d4af37',
        letterSpacing: '2pt',
        textAlign: 'center',
        font: "'Great Vibes', cursive",
        textTransform: 'none'
    },
    grid: {
        gap: '16px',
        padding: '24px 20px'
    },
    cell: {
        shape: '0px',
        border: '1.5px solid #d4af37',
        background: '#ffffff',
        shadow: 'inset 0 0 10px rgba(212, 175, 55, 0.02)',
        offset: '12px'
    },
    song: {
        size: 'medium',
        weight: '600',
        color: '#2d3a1d'
    },
    artist: {
        size: 'small',
        weight: '500',
        color: '#6b7c59',
        fontStyle: 'italic'
    },
    cardNumber: {
        size: 'small',
        weight: '600',
        color: '#6b7c59',
        background: 'rgba(107, 124, 89, 0.05)',
        padding: '6px 16px',
        borderRadius: '2px',
        border: '0.5px solid rgba(107, 124, 89, 0.2)'
    },
    footer: {
        size: 'small',
        weight: '400',
        color: '#94a3b8',
        letterSpacing: '2pt',
        font: "'Cormorant Garamond', serif"
    }
};
