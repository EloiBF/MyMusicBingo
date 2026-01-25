import React from 'react';
import { Music, Radio, Disc3, Mic, Sparkles, Star, Heart, Zap } from 'lucide-react';

export default {
    id: 'pop',
    label: 'Pop Party',
    category: 'Fun',
    font: "'Poppins', sans-serif",
    defaultAccentColor: '#ec4899',
    defaultGridSize: 'medium',
    defaultTitleSpace: 'medium',
    background: {
        color: '#fff5f7',
        elements: [
            // Vibrant gradient circles
            {
                content: (
                    <div style={{
                        width: '300px',
                        height: '300px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(236, 72, 153, 0.15) 0%, transparent 70%)',
                        filter: 'blur(40px)'
                    }} />
                ),
                style: { top: '-80px', right: '-80px' },
                decorationLevel: 'subtle'
            },
            {
                content: (
                    <div style={{
                        width: '250px',
                        height: '250px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, transparent 70%)',
                        filter: 'blur(35px)'
                    }} />
                ),
                style: { bottom: '-60px', left: '-60px' }, decorationLevel: 'subtle'
            },
            {
                content: (
                    <div style={{
                        width: '200px',
                        height: '200px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(251, 146, 60, 0.1) 0%, transparent 70%)',
                        filter: 'blur(30px)'
                    }} />
                ),
                style: { top: '35%', left: '50%', transform: 'translateX(-50%)' },
                decorationLevel: 'subtle'
            },
            // Fun music icons with vibrant colors
            { content: <Music size={100} color="#ec4899" strokeWidth={2.5} />, style: { top: '5%', left: '2%', transform: 'rotate(-15deg)' }, decorationLevel: 'subtle' },
            { content: <Radio size={90} color="#a855f7" strokeWidth={2.5} />, style: { top: '5%', right: '2%', transform: 'rotate(20deg)' }, decorationLevel: 'prominent' },
            { content: <Disc3 size={110} color="#ec4899" strokeWidth={2.5} />, style: { bottom: '5%', left: '2%', transform: 'rotate(-25deg)' }, decorationLevel: 'subtle' },
            { content: <Mic size={85} color="#fb923c" strokeWidth={2.5} />, style: { bottom: '65%', right: '2%', transform: 'rotate(12deg)' }, decorationLevel: 'subtle' },
            // Sparkles and stars scattered
            { content: <Sparkles size={45} color="#a855f7" fill="#a855f7" />, style: { top: '14%', right: '4%' }, decorationLevel: 'subtle' },
            { content: <Star size={40} color="#fb923c" fill="#fb923c" />, style: { bottom: '15%', left: '3%' }, decorationLevel: 'subtle' },
            { content: <Star size={35} color="#ec4899" fill="#ec4899" />, style: { bottom: '16%', right: '3%' }, decorationLevel: 'subtle' },
            // Floating hearts
            { content: <Heart size={35} color="#ec4899" fill="#ec4899" />, style: { top: '15%', left: '30%', transform: 'rotate(15deg)' }, decorationLevel: 'subtle' },
            { content: <Heart size={28} color="#a855f7" fill="#a855f7" />, style: { top: '18%', right: '30%', transform: 'rotate(-10deg)' }, decorationLevel: 'subtle' },
            // Confetti-like dots
            {
                content: (
                    <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', width: '100px' }}>
                        {[...Array(12)].map((_, i) => (
                            <div
                                key={i}
                                style={{
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    background: ['#ec4899', '#a855f7', '#fb923c', '#fbbf24', '#f59e0b'][i % 5]
                                }}
                            />
                        ))}
                    </div>
                ),
                style: { top: '18%', left: '4%' },
                decorationLevel: 'subtle'
            },
            // Corner accent shapes
            {
                content: (
                    <div style={{
                        width: '60px',
                        height: '60px',
                        background: 'linear-gradient(135deg, #ec4899, #a855f7)',
                        borderRadius: '0 0 100% 0'
                    }} />
                ),
                style: { top: 0, left: 0 }, decorationLevel: 'subtle'
            },
            {
                content: (
                    <div style={{
                        width: '60px',
                        height: '60px',
                        background: 'linear-gradient(225deg, #a855f7, #fb923c)',
                        borderRadius: '0 0 0 100%'
                    }} />
                ),
                style: { top: 0, right: 0 }, decorationLevel: 'subtle'
            }
        ]
    },
    card: {
        border: '4px solid #ec4899',
        background: '#ffffff',
        borderRadius: '16px',
        offset: '12mm',
        shadow: '0 12px 40px rgba(236, 72, 153, 0.2), 0 0 0 1px rgba(168, 85, 247, 0.1)'
    },
    title: {
        content: 'MUSIC BINGO',
        size: 'medium',
        weight: '900',
        color: '#ec4899',
        letterSpacing: '2pt',
        textAlign: 'center',
        shadow: '4px 4px 0px rgba(168, 85, 247, 0.3)',
        font: "'Poppins', sans-serif"
    },
    subtitle: {
        size: 'large',
        weight: '700',
        color: '#4b484eff',
        letterSpacing: '2pt',
        textAlign: 'center',
        font: "'Poppins', sans-serif"
    },
    grid: {
        gap: '18px',
        padding: '24px'
    },
    cell: {
        shape: '12px',
        border: '3px solid #ec4899',
        background: 'linear-gradient(135deg, #ffffff 0%, #fff5f7 100%)',
        shadow: '0 4px 12px rgba(236, 72, 153, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
        offset: '14px'
    },
    song: {
        size: 'large',
        weight: '800',
        color: '#be185d',
        font: "'Poppins', sans-serif"
    },
    artist: {
        size: 'medium',
        weight: '600',
        color: '#ffffff',
        background: 'linear-gradient(135deg, #ec4899, #a855f7)',
        padding: '4px 12px',
        borderRadius: '20px',
        font: "'Poppins', sans-serif"
    },
    cardNumber: {
        size: 'medium',
        weight: '800',
        color: '#ffffff',
        background: 'linear-gradient(135deg, #a855f7, #fb923c)',
        padding: '6px 16px',
        borderRadius: '25px',
        shadow: '0 2px 8px rgba(168, 85, 247, 0.3)'
    },
    footer: {
        size: 'medium',
        weight: '700',
        color: '#4b484eff',
        letterSpacing: '2pt',
        font: "'Poppins', sans-serif"
    }
};
