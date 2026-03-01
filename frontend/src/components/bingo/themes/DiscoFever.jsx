import React from 'react';
import { Music, Disc3, Sparkles, Star, Radio, Headphones, Volume2 } from 'lucide-react';

export default {
    id: 'discofever',
    label: '🕺 Disco Fever 🪩',
    category: 'Music',
    font: "'Bebas Neue', cursive",
    defaultAccentColor: '#8b5cf6',
    defaultGridSize: 'medium',
    defaultTitleSpace: 'large',
    background: {
        color: '#1a1a2e',
        elements: [
            // Disco ball effect - top center
            {
                content: (
                    <div style={{
                        width: '350px',
                        height: '350px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, rgba(236, 72, 153, 0.2) 30%, transparent 70%)',
                        filter: 'blur(20px)',
                        animation: 'pulse 3s ease-in-out infinite'
                    }} />
                ),
                style: { top: '-100px', left: '50%', transform: 'translateX(-50%)' },
                decorationLevel: 'subtle'
            },
            // Colorful disco lights
            {
                content: (
                    <div style={{
                        width: '250px',
                        height: '250px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(236, 72, 153, 0.25) 0%, transparent 70%)',
                        filter: 'blur(30px)'
                    }} />
                ),
                style: { bottom: '-50px', right: '-50px' },
                decorationLevel: 'subtle'
            },
            {
                content: (
                    <div style={{
                        width: '200px',
                        height: '200px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)',
                        filter: 'blur(25px)'
                    }} />
                ),
                style: { bottom: '-40px', left: '-40px' },
                decorationLevel: 'subtle'
            },
            // Music icons with vibrant colors
            { content: <Disc3 size={120} color="#8b5cf6" strokeWidth={2} />, style: { top: '5%', left: '3%', transform: 'rotate(-20deg)' }, decorationLevel: 'prominent' },
            { content: <Music size={100} color="#ec4899" strokeWidth={2.5} />, style: { top: '8%', right: '3%', transform: 'rotate(15deg)' }, decorationLevel: 'prominent' },
            { content: <Radio size={90} color="#3b82f6" strokeWidth={2.5} />, style: { bottom: '5%', left: '3%', transform: 'rotate(-10deg)' }, decorationLevel: 'subtle' },
            { content: <Headphones size={85} color="#10b981" strokeWidth={2.5} />, style: { bottom: '8%', right: '3%', transform: 'rotate(20deg)' }, decorationLevel: 'subtle' },
            { content: <Volume2 size={75} color="#f59e0b" strokeWidth={2.5} />, style: { top: '45%', left: '2%', transform: 'rotate(-5deg)' }, decorationLevel: 'subtle' },
            // Sparkles and stars for disco effect
            { content: <Sparkles size={50} color="#fbbf24" fill="#fbbf24" />, style: { top: '15%', left: '25%', transform: 'rotate(45deg)' }, decorationLevel: 'subtle' },
            { content: <Star size={45} color="#ec4899" fill="#ec4899" />, style: { top: '20%', right: '25%', transform: 'rotate(-30deg)' }, decorationLevel: 'subtle' },
            { content: <Sparkles size={40} color="#8b5cf6" fill="#8b5cf6" />, style: { bottom: '15%', left: '30%', transform: 'rotate(60deg)' }, decorationLevel: 'subtle' },
            { content: <Star size={35} color="#3b82f6" fill="#3b82f6" />, style: { bottom: '20%', right: '30%', transform: 'rotate(-45deg)' }, decorationLevel: 'subtle' },
            // Disco light rays
            {
                content: (
                    <div style={{
                        width: '100%',
                        height: '100%',
                        background: 'conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(139, 92, 246, 0.1) 15deg, transparent 30deg, rgba(236, 72, 153, 0.1) 45deg, transparent 60deg, rgba(59, 130, 246, 0.1) 75deg, transparent 90deg, rgba(16, 185, 129, 0.1) 105deg, transparent 120deg, rgba(245, 158, 11, 0.1) 135deg, transparent 150deg)',
                        animation: 'spin 20s linear infinite'
                    }} />
                ),
                style: { top: 0, left: 0 },
                decorationLevel: 'subtle'
            }
        ]
    },
    card: {
        border: '4px solid #8b5cf6',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        borderRadius: '20px',
        offset: '12mm',
        shadow: '0 15px 50px rgba(139, 92, 246, 0.3), 0 0 0 1px rgba(236, 72, 153, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
    },
    title: {
        content: '🕺 BINGO 🪩',
        size: 'small',
        weight: '700',
        color: '#ffffff',
        letterSpacing: '0.5pt',
        textAlign: 'center',
        textTransform: 'uppercase',
        shadow: '0 0 10px rgba(139, 92, 246, 0.3)',
        font: "'Bebas Neue', cursive"
    },
    subtitle: {
        size: 'small',
        weight: '500',
        color: '#e9d5ff',
        letterSpacing: '0.3pt',
        textAlign: 'center',
        textTransform: 'uppercase',
        font: "'Bebas Neue', cursive"
    },
    grid: {
        gap: '20px',
        padding: '28px'
    },
    cell: {
        shape: '16px',
        border: '3px solid #8b5cf6',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #0f172a 100%)',
        shadow: '0 8px 25px rgba(139, 92, 246, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        offset: '16px'
    },
    song: {
        size: 'small',
        weight: '600',
        color: '#ffffff',
        font: "'Bebas Neue', cursive"
    },
    artist: {
        size: 'small',
        weight: '400',
        color: '#1a1a2e',
        background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
        padding: '2px 6px',
        borderRadius: '12px',
        font: "'Bebas Neue', cursive"
    },
    cardNumber: {
        size: 'small',
        weight: '600',
        color: '#ffffff',
        background: 'linear-gradient(135deg, #3b82f6, #10b981)',
        padding: '3px 10px',
        borderRadius: '15px',
        shadow: '0 2px 6px rgba(59, 130, 246, 0.2)',
        font: "'Bebas Neue', cursive"
    },
    footer: {
        size: 'small',
        weight: '500',
        color: '#e9d5ff',
        letterSpacing: '0.3pt',
        textTransform: 'uppercase',
        font: "'Bebas Neue', cursive"
    }
};
