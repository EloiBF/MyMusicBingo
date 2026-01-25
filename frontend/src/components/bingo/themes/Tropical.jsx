import React from 'react';
import { Music, Sparkles, Sun, Trees as Tree, Palmtree } from 'lucide-react';

export default {
    id: 'tropical',
    label: 'Tropical',
    category: 'Vibrant',
    font: "'Outfit', sans-serif",
    defaultAccentColor: '#059669',
    defaultGridSize: 'medium',
    defaultTitleSpace: 'large',
    background: {
        color: '#f8fafc',
        elements: [
            // Lush Palm Leaf - Top Left
            {
                content: (
                    <svg width="300" height="300" viewBox="0 0 100 100">
                        <path d="M10,90 Q30,10 90,10 M10,90 Q40,30 85,20 M10,90 Q50,50 80,40 M10,90 Q60,70 75,65 M10,90 Q20,40 15,10" fill="none" stroke="#059669" strokeWidth="1" />
                        <path d="M10,90 C40,40 80,20 95,5 C80,20 60,60 10,90" fill="#059669" />
                    </svg>
                ),
                style: { top: '-50px', left: '-50px', transform: 'rotate(-15deg)' }, decorationLevel: 'subtle'
            },
            // Lush Palm Leaf - Top Right
            {
                content: (
                    <svg width="250" height="250" viewBox="0 0 100 100">
                        <path d="M90,90 Q70,10 10,10 M90,90 Q60,30 15,20 M90,90 Q50,50 20,40 M90,90 Q40,70 25,65 M90,90 Q80,40 85,10" fill="none" stroke="#10b981" strokeWidth="1" />
                        <path d="M90,90 C60,40 20,20 5,5 C20,20 40,60 90,90" fill="#10b981" />
                    </svg>
                ),
                style: { top: '-30px', right: '-40px', transform: 'rotate(10deg)' }, decorationLevel: 'subtle'
            },
            // Monstera Shape - Bottom Left
            {
                content: (
                    <svg width="200" height="200" viewBox="0 0 100 100">
                        <path d="M50,10 C20,10 5,30 5,60 C5,90 30,95 50,95 C70,95 95,90 95,60 C95,30 80,10 50,10 M50,30 L50,50 M30,45 L45,55 M70,45 L55,55 M25,70 L45,75 M75,70 L55,75" fill="#059669" />
                    </svg>
                ),
                style: { bottom: '5%', left: '-20px', transform: 'rotate(20deg)' }, decorationLevel: 'subtle'
            },
            // Abstract Sun / Circle - Top Center
            {
                content: (
                    <div style={{
                        width: '400px',
                        height: '400px',
                        background: 'radial-gradient(circle, rgba(251, 191, 36, 0.08) 0%, transparent 70%)',
                        borderRadius: '50%'
                    }} />
                ),
                style: { top: '-10%', left: '50%', transform: 'translateX(-50%)' }, decorationLevel: 'subtle'
            },
            // Small icons scattered - moved closer to margins
            { content: <Sun size={40} color="#fbbf24" />, style: { top: '25%', left: '1%' }, decorationLevel: 'prominent' },
            { content: <Music size={32} color="#059669" />, style: { bottom: '12%', right: '5%' }, decorationLevel: 'subtle' },
            { content: <Sparkles size={24} color="#fbbf24" />, style: { bottom: '20%', right: '2%' }, decorationLevel: 'subtle' },
            { content: <Sparkles size={32} color="#fbbf24" />, style: { top: '10%', left: '15%' }, decorationLevel: 'subtle' }
        ]
    },
    card: {
        border: '3px solid #059669',
        background: '#ffffff',
        borderRadius: '24px',
        offset: '15mm',
        shadow: '0 20px 50px rgba(5, 150, 105, 0.08)'
    },
    title: {
        content: 'Music Bingo',
        size: 'medium',
        weight: '900',
        color: '#064e3b',
        letterSpacing: '1pt',
        textAlign: 'center',
        textTransform: 'uppercase',
        font: "'Outfit', sans-serif"
    },
    subtitle: {
        size: 'medium',
        weight: '600',
        color: '#059669',
        letterSpacing: '2pt',
        textAlign: 'center'
    },
    grid: {
        gap: '16px',
        padding: '24px 20px'
    },
    cell: {
        shape: '16px',
        border: '3px solid #059669', // Stronger accent border
        background: '#f0fdf4', // Very subtle light green background
        shadow: '0 10px 25px rgba(5, 150, 105, 0.1)', // Deeper shadow for better separation
        offset: '12px'
    },
    song: {
        size: 'medium',
        weight: '800',
        color: '#064e3b'
    },
    artist: {
        size: 'small',
        weight: '600',
        color: '#059669',
        background: '#f0fdf4',
        padding: '2px 8px',
        borderRadius: '4px'
    },
    cardNumber: {
        size: 'small',
        weight: '800',
        color: '#059669',
        background: '#ecfdf5',
        padding: '6px 16px',
        borderRadius: '20px'
    },
    footer: {
        size: 'small',
        weight: '600',
        color: '#94a3b8',
        letterSpacing: '1pt'
    }
};
