import React from 'react';
import { Music, Disc3, Sparkles, Star, Radio, Headphones, Volume2 , Music2} from 'lucide-react';

export default {
    id: 'discofever',
    label: 'Disco Fever',
    category: 'Music',
    font: "'Bebas Neue', cursive",
    defaultAccentColor: '#8b5cf6',
    defaultGridSize: 'medium',
    defaultTitleSpace: 'medium',
    background: {
        color: '#1a1a2e',
        elements: [
            // Notes musicals afegides per defecte
            { content: <Music size={60} color="#8b5cf6" opacity={0.12} />, style: { top: '10%', right: '10%', transform: 'rotate(15deg)' }, decorationLevel: 'subtle' },
            { content: <Music2 size={50} color="#8b5cf6" opacity={0.1} />, style: { bottom: '10%', left: '8%', transform: 'rotate(-20deg)' }, decorationLevel: 'subtle' },
        
            // Disco ball effect - top center
            {
                content: (
                    <div style={{
                        width: '250px',
                        height: '250px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, rgba(236, 72, 153, 0.15) 30%, transparent 70%)',
                        filter: 'blur(20px)',
                        animation: 'pulse 3s ease-in-out infinite'
                    }} />
                ),
                style: { top: '0', left: '50%', transform: 'translateX(-50%)' },
                decorationLevel: 'subtle'
            },
            // Colorful disco lights
            {
                content: (
                    <div style={{
                        width: '200px',
                        height: '200px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(236, 72, 153, 0.2) 0%, transparent 70%)',
                        filter: 'blur(30px)'
                    }} />
                ),
                style: { bottom: '0', right: '0' },
                decorationLevel: 'subtle'
            },
            {
                content: (
                    <div style={{
                        width: '180px',
                        height: '180px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
                        filter: 'blur(25px)'
                    }} />
                ),
                style: { bottom: '0', left: '0' },
                decorationLevel: 'subtle'
            },
            // Music icons with vibrant colors - positioned within page bounds
            { content: <Disc3 size={90} color="#8b5cf6" strokeWidth={2} />, style: { top: '8%', left: '2%', transform: 'rotate(-20deg)' }, decorationLevel: 'prominent' },
            { content: <Music size={80} color="#ec4899" strokeWidth={2.5} />, style: { top: '10%', right: '2%', transform: 'rotate(15deg)' }, decorationLevel: 'prominent' },
            { content: <Radio size={70} color="#3b82f6" strokeWidth={2.5} />, style: { bottom: '8%', left: '2%', transform: 'rotate(-10deg)' }, decorationLevel: 'subtle' },
            { content: <Headphones size={65} color="#10b981" strokeWidth={2.5} />, style: { bottom: '10%', right: '2%', transform: 'rotate(20deg)' }, decorationLevel: 'subtle' },
            { content: <Volume2 size={55} color="#f59e0b" strokeWidth={2.5} />, style: { top: '45%', left: '1%', transform: 'rotate(-5deg)' }, decorationLevel: 'subtle' },
            // Sparkles and stars for disco effect - moved within bounds
            { content: <Sparkles size={40} color="#fbbf24" fill="#fbbf24" />, style: { top: '18%', left: '20%', transform: 'rotate(45deg)' }, decorationLevel: 'subtle' },
            { content: <Star size={35} color="#ec4899" fill="#ec4899" />, style: { top: '22%', right: '20%', transform: 'rotate(-30deg)' }, decorationLevel: 'subtle' },
            { content: <Sparkles size={32} color="#8b5cf6" fill="#8b5cf6" />, style: { bottom: '18%', left: '25%', transform: 'rotate(60deg)' }, decorationLevel: 'subtle' },
            { content: <Star size={28} color="#3b82f6" fill="#3b82f6" />, style: { bottom: '22%', right: '25%', transform: 'rotate(-45deg)' }, decorationLevel: 'subtle' },
            // Disco light rays - reduced opacity to avoid interference
            {
                content: (
                    <div style={{
                        width: '100%',
                        height: '100%',
                        background: 'conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(139, 92, 246, 0.05) 15deg, transparent 30deg, rgba(236, 72, 153, 0.05) 45deg, transparent 60deg, rgba(59, 130, 246, 0.05) 75deg, transparent 90deg, rgba(16, 185, 129, 0.05) 105deg, transparent 120deg, rgba(245, 158, 11, 0.05) 135deg, transparent 150deg)',
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
        content: 'BINGO',
        size: 'small',
        weight: '700',
        color: '#ffffff',
        letterSpacing: '0.5pt',
        textAlign: 'center',
        textTransform: 'uppercase',
        shadow: '0 0 10px rgba(139, 92, 246, 0.3)',
        font: "'Outfit', sans-serif"
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
