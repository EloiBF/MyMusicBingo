import React from 'react';
import { Heart, Music, Sparkles, Star } from 'lucide-react';

export default {
    id: 'wedding',
    label: 'Wedding Elegance',
    category: 'Celebrations',
    font: "'Great Vibes', cursive",
    defaultAccentColor: '#6b7c59',
    defaultGridSize: 'medium',
    defaultTitleSpace: 'large',
    background: {
        color: '#ffffff',
        elements: [
            // Elegant corner flourishes (top-left)
            {
                content: (
                    <svg width="120" height="120" viewBox="0 0 120 120" style={{ opacity: 0.15 }}>
                        <path d="M 0 0 Q 30 30 60 0 Q 30 30 60 60 Q 30 30 0 60 Z" fill="#6b7c59" />
                        <circle cx="60" cy="60" r="3" fill="#d4af37" />
                    </svg>
                ),
                style: { top: '10px', left: '10px' }
            },
            // Top-right corner
            {
                content: (
                    <svg width="120" height="120" viewBox="0 0 120 120" style={{ opacity: 0.15, transform: 'rotate(90deg)' }}>
                        <path d="M 0 0 Q 30 30 60 0 Q 30 30 60 60 Q 30 30 0 60 Z" fill="#6b7c59" />
                        <circle cx="60" cy="60" r="3" fill="#d4af37" />
                    </svg>
                ),
                style: { top: '10px', right: '10px' }
            },
            // Bottom-left corner
            {
                content: (
                    <svg width="120" height="120" viewBox="0 0 120 120" style={{ opacity: 0.15, transform: 'rotate(-90deg)' }}>
                        <path d="M 0 0 Q 30 30 60 0 Q 30 30 60 60 Q 30 30 0 60 Z" fill="#6b7c59" />
                        <circle cx="60" cy="60" r="3" fill="#d4af37" />
                    </svg>
                ),
                style: { bottom: '10px', left: '10px' }
            },
            // Bottom-right corner
            {
                content: (
                    <svg width="120" height="120" viewBox="0 0 120 120" style={{ opacity: 0.15, transform: 'rotate(180deg)' }}>
                        <path d="M 0 0 Q 30 30 60 0 Q 30 30 60 60 Q 30 30 0 60 Z" fill="#6b7c59" />
                        <circle cx="60" cy="60" r="3" fill="#d4af37" />
                    </svg>
                ),
                style: { bottom: '10px', right: '10px' }
            },
            // Delicate olive branches
            { content: <Music size={80} color="#6b7c59" opacity={0.06} />, style: { top: '15%', left: '3%', transform: 'rotate(-25deg)' } },
            { content: <Music size={80} color="#6b7c59" opacity={0.06} />, style: { top: '15%', right: '3%', transform: 'rotate(25deg)' } },
            // Wedding rings - shadow effects
            {
                content: (
                    <svg width="90" height="90" viewBox="0 0 90 90" style={{ opacity: 0.12 }}>
                        <circle cx="30" cy="45" r="20" fill="none" stroke="#d4af37" strokeWidth="3"/>
                        <circle cx="30" cy="45" r="15" fill="none" stroke="#d4af37" strokeWidth="2"/>
                        <circle cx="60" cy="45" r="20" fill="none" stroke="#d4af37" strokeWidth="3"/>
                        <circle cx="60" cy="45" r="15" fill="none" stroke="#d4af37" strokeWidth="2"/>
                    </svg>
                ),
                style: { top: '25%', left: '8%', transform: 'rotate(-15deg)' },
                decorationLevel: 'subtle'
            },
            {
                content: (
                    <svg width="90" height="90" viewBox="0 0 90 90" style={{ opacity: 0.12 }}>
                        <circle cx="30" cy="45" r="20" fill="none" stroke="#d4af37" strokeWidth="3"/>
                        <circle cx="30" cy="45" r="15" fill="none" stroke="#d4af37" strokeWidth="2"/>
                        <circle cx="60" cy="45" r="20" fill="none" stroke="#d4af37" strokeWidth="3"/>
                        <circle cx="60" cy="45" r="15" fill="none" stroke="#d4af37" strokeWidth="2"/>
                    </svg>
                ),
                style: { top: '25%', right: '8%', transform: 'rotate(15deg)' },
                decorationLevel: 'prominent'
            },
            // Delicate flowers - shadow effects
            {
                content: (
                    <svg width="80" height="80" viewBox="0 0 80 80" style={{ opacity: 0.12 }}>
                        <circle cx="40" cy="40" r="25" fill="none" stroke="#6b7c59" strokeWidth="2"/>
                        <circle cx="40" cy="25" r="8" fill="#6b7c59"/>
                        <circle cx="25" cy="40" r="8" fill="#6b7c59"/>
                        <circle cx="55" cy="40" r="8" fill="#6b7c59"/>
                        <circle cx="40" cy="55" r="8" fill="#6b7c59"/>
                        <circle cx="30" cy="30" r="5" fill="#6b7c59"/>
                        <circle cx="50" cy="30" r="5" fill="#6b7c59"/>
                        <circle cx="30" cy="50" r="5" fill="#6b7c59"/>
                        <circle cx="50" cy="50" r="5" fill="#6b7c59"/>
                    </svg>
                ),
                style: { top: '35%', left: '5%', transform: 'rotate(-10deg)' },
                decorationLevel: 'subtle'
            },
            {
                content: (
                    <svg width="80" height="80" viewBox="0 0 80 80" style={{ opacity: 0.12 }}>
                        <circle cx="40" cy="40" r="25" fill="none" stroke="#6b7c59" strokeWidth="2"/>
                        <circle cx="40" cy="25" r="8" fill="#6b7c59"/>
                        <circle cx="25" cy="40" r="8" fill="#6b7c59"/>
                        <circle cx="55" cy="40" r="8" fill="#6b7c59"/>
                        <circle cx="40" cy="55" r="8" fill="#6b7c59"/>
                        <circle cx="30" cy="30" r="5" fill="#6b7c59"/>
                        <circle cx="50" cy="30" r="5" fill="#6b7c59"/>
                        <circle cx="30" cy="50" r="5" fill="#6b7c59"/>
                        <circle cx="50" cy="50" r="5" fill="#6b7c59"/>
                    </svg>
                ),
                style: { top: '35%', right: '5%', transform: 'rotate(10deg)' },
                decorationLevel: 'prominent'
            },
            {
                content: (
                    <svg width="70" height="70" viewBox="0 0 70 70" style={{ opacity: 0.12 }}>
                        <ellipse cx="35" cy="35" rx="20" ry="15" fill="none" stroke="#d4af37" strokeWidth="2"/>
                        <path d="M 35 20 Q 25 30 35 35 Q 45 30 35 20" fill="#d4af37"/>
                        <path d="M 20 35 Q 30 25 35 35 Q 30 45 20 35" fill="#d4af37"/>
                        <path d="M 50 35 Q 40 25 35 35 Q 40 45 50 35" fill="#d4af37"/>
                        <path d="M 35 50 Q 25 40 35 35 Q 45 40 35 50" fill="#d4af37"/>
                    </svg>
                ),
                style: { bottom: '25%', left: '7%', transform: 'rotate(5deg)' },
                decorationLevel: 'subtle'
            },
            {
                content: (
                    <svg width="70" height="70" viewBox="0 0 70 70" style={{ opacity: 0.12 }}>
                        <ellipse cx="35" cy="35" rx="20" ry="15" fill="none" stroke="#d4af37" strokeWidth="2"/>
                        <path d="M 35 20 Q 25 30 35 35 Q 45 30 35 20" fill="#d4af37"/>
                        <path d="M 20 35 Q 30 25 35 35 Q 30 45 20 35" fill="#d4af37"/>
                        <path d="M 50 35 Q 40 25 35 35 Q 40 45 50 35" fill="#d4af37"/>
                        <path d="M 35 50 Q 25 40 35 35 Q 45 40 35 50" fill="#d4af37"/>
                    </svg>
                ),
                style: { bottom: '25%', right: '7%', transform: 'rotate(-5deg)' },
                decorationLevel: 'prominent'
            },
            // Gold accent hearts
            { content: <Heart size={40} color="#d4af37" opacity={0.12} fill="#d4af37" />, style: { top: '8%', left: '48%' } },
            { content: <Heart size={30} color="#d4af37" opacity={0.08} fill="#d4af37" />, style: { top: '12%', left: '52%' } },
            // Sparkle accents
            { content: <Sparkles size={35} color="#d4af37" opacity={0.15} />, style: { top: '20%', right: '8%' } },
            { content: <Sparkles size={35} color="#d4af37" opacity={0.15} />, style: { top: '20%', left: '8%' } },
            { content: <Star size={25} color="#d4af37" opacity={0.1} />, style: { bottom: '15%', left: '5%' } },
            { content: <Star size={25} color="#d4af37" opacity={0.1} />, style: { bottom: '15%', right: '5%' } },
            // Elegant border frame
            {
                content: (
                    <div style={{
                        border: '2px solid #6b7c59',
                        opacity: 0.2,
                        width: '96%',
                        height: '97%',
                        borderRadius: '8px',
                        boxShadow: 'inset 0 0 0 1px #d4af37'
                    }} />
                ),
                style: { top: '1.5%', left: '2%' }
            },
            // Gold accent line at top
            {
                content: <div style={{ width: '200px', height: '2px', background: 'linear-gradient(90deg, transparent, #d4af37, transparent)', opacity: 0.4 }} />,
                style: { top: '23%', left: '50%', transform: 'translateX(-50%)' }
            },
            // Subtle texture overlay
            {
                content: (
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(212, 175, 55, 0.03) 0%, transparent 50%)',
                        pointerEvents: 'none'
                    }} />
                ),
                style: { top: 0, left: 0, width: '100%', height: '100%' }
            }
        ]
    },
    card: {
        border: '3px solid #6b7c59',
        background: '#ffffff',
        borderRadius: '8px',
        offset: '12mm',
        shadow: '0 8px 32px rgba(107, 124, 89, 0.15)'
    },
    title: {
        content: 'Music Bingo',
        size: 'medium',
        weight: '400',
        color: '#6b7c59',
        letterSpacing: '2pt',
        textAlign: 'center',
        textTransform: 'none',
        font: "'Great Vibes', cursive"
    },
    subtitle: {
        size: 'medium',
        weight: '400',
        color: '#d4af37',
        letterSpacing: '2pt',
        textAlign: 'center',
        font: "'Great Vibes', cursive"
    },
    grid: {
        gap: '14px',
        padding: '20px'
    },
    cell: {
        shape: '6px',
        border: '2px solid #6b7c59',
        background: '#fefefe',
        shadow: '0 2px 8px rgba(107, 124, 89, 0.08)',
        offset: '10px'
    },
    song: {
        size: 'medium',
        weight: '600',
        color: '#2d3a24',
        font: "'Montserrat', sans-serif"
    },
    artist: {
        size: 'small',
        weight: '500',
        color: '#6b7c59',
        font: "'Montserrat', sans-serif"
    },
    cardNumber: {
        size: 'small',
        weight: '600',
        color: '#6b7c59',
        background: 'rgba(212, 175, 55, 0.15)',
        padding: '6px 14px',
        borderRadius: '20px'
    },
    footer: {
        size: 'small',
        weight: '400',
        color: '#a0a89a',
        letterSpacing: '2pt',
        font: "'Great Vibes', cursive"
    }
};
