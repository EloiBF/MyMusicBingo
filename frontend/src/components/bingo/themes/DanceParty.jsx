import React from 'react';
import { Music, Mic2, Radio, Disc3, Sparkles, Heart, Zap, Headphones } from 'lucide-react';

export default {
    id: 'danceparty',
    label: '💃 Dance Party 🎵',
    category: 'Music',
    font: "'Poppins', sans-serif",
    defaultAccentColor: '#f43f5e',
    defaultGridSize: 'medium',
    defaultTitleSpace: 'large',
    background: {
        color: '#fef2f2',
        elements: [
            // Vibrant gradient circles for party atmosphere
            {
                content: (
                    <div style={{
                        width: '320px',
                        height: '320px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(244, 63, 94, 0.15) 0%, transparent 70%)',
                        filter: 'blur(35px)'
                    }} />
                ),
                style: { top: '-80px', right: '-80px' },
                decorationLevel: 'subtle'
            },
            {
                content: (
                    <div style={{
                        width: '280px',
                        height: '280px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(251, 146, 60, 0.12) 0%, transparent 70%)',
                        filter: 'blur(30px)'
                    }} />
                ),
                style: { bottom: '-70px', left: '-70px' },
                decorationLevel: 'subtle'
            },
            {
                content: (
                    <div style={{
                        width: '240px',
                        height: '240px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)',
                        filter: 'blur(25px)'
                    }} />
                ),
                style: { top: '40%', left: '50%', transform: 'translateX(-50%)' },
                decorationLevel: 'subtle'
            },
            // Music and dance icons with energetic colors
            { content: <Music size={110} color="#f43f5e" strokeWidth={2.5} />, style: { top: '5%', left: '2%', transform: 'rotate(-15deg)' }, decorationLevel: 'prominent' },
            { content: <Mic2 size={95} color="#fb923c" strokeWidth={2.5} />, style: { top: '7%', right: '2%', transform: 'rotate(20deg)' }, decorationLevel: 'prominent' },
            { content: <Radio size={100} color="#a855f7" strokeWidth={2.5} />, style: { bottom: '5%', left: '2%', transform: 'rotate(-25deg)' }, decorationLevel: 'subtle' },
            { content: <Disc3 size={90} color="#f43f5e" strokeWidth={2.5} />, style: { bottom: '8%', right: '2%', transform: 'rotate(15deg)' }, decorationLevel: 'subtle' },
            { content: <Headphones size={85} color="#fb923c" strokeWidth={2.5} />, style: { top: '50%', left: '3%', transform: 'rotate(-10deg)' }, decorationLevel: 'subtle' },
            // Party decorations - sparkles and hearts
            { content: <Sparkles size={45} color="#f43f5e" fill="#f43f5e" />, style: { top: '12%', right: '4%' }, decorationLevel: 'subtle' },
            { content: <Heart size={40} color="#fb923c" fill="#fb923c" />, style: { bottom: '12%', left: '3%' }, decorationLevel: 'subtle' },
            { content: <Sparkles size={38} color="#a855f7" fill="#a855f7" />, style: { bottom: '15%', right: '4%' }, decorationLevel: 'subtle' },
            { content: <Heart size={35} color="#f43f5e" fill="#f43f5e" />, style: { top: '18%', left: '25%', transform: 'rotate(15deg)' }, decorationLevel: 'subtle' },
            { content: <Zap size={42} color="#fb923c" fill="#fb923c" />, style: { top: '20%', right: '25%', transform: 'rotate(-20deg)' }, decorationLevel: 'subtle' },
            // Confetti dots
            {
                content: (
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', width: '120px' }}>
                        {[...Array(15)].map((_, i) => (
                            <div
                                key={i}
                                style={{
                                    width: '10px',
                                    height: '10px',
                                    borderRadius: '50%',
                                    background: ['#f43f5e', '#fb923c', '#a855f7', '#fbbf24', '#10b981'][i % 5],
                                    transform: `rotate(${i * 24}deg)`
                                }}
                            />
                        ))}
                    </div>
                ),
                style: { top: '15%', left: '4%' },
                decorationLevel: 'subtle'
            },
            // Corner party decorations
            {
                content: (
                    <div style={{
                        width: '70px',
                        height: '70px',
                        background: 'linear-gradient(135deg, #f43f5e, #fb923c)',
                        borderRadius: '0 0 100% 0',
                        boxShadow: '0 4px 15px rgba(244, 63, 94, 0.3)'
                    }} />
                ),
                style: { top: 0, left: 0 },
                decorationLevel: 'subtle'
            },
            {
                content: (
                    <div style={{
                        width: '70px',
                        height: '70px',
                        background: 'linear-gradient(225deg, #a855f7, #f43f5e)',
                        borderRadius: '0 0 0 100%',
                        boxShadow: '0 4px 15px rgba(168, 85, 247, 0.3)'
                    }} />
                ),
                style: { top: 0, right: 0 },
                decorationLevel: 'subtle'
            }
        ]
    },
    card: {
        border: '4px solid #f43f5e',
        background: '#ffffff',
        borderRadius: '18px',
        offset: '12mm',
        shadow: '0 12px 40px rgba(244, 63, 94, 0.2), 0 0 0 1px rgba(251, 146, 60, 0.1)'
    },
    title: {
        content: '💃 BINGO 🎵',
        size: 'small',
        weight: '700',
        color: '#f43f5e',
        letterSpacing: '0.5pt',
        textAlign: 'center',
        textTransform: 'uppercase',
        shadow: '2px 2px 0px rgba(251, 146, 60, 0.15)',
        font: "'Poppins', sans-serif"
    },
    subtitle: {
        size: 'small',
        weight: '500',
        color: '#4b484eff',
        letterSpacing: '0.3pt',
        textAlign: 'center',
        textTransform: 'uppercase',
        font: "'Poppins', sans-serif"
    },
    grid: {
        gap: '18px',
        padding: '24px'
    },
    cell: {
        shape: '14px',
        border: '3px solid #f43f5e',
        background: 'linear-gradient(135deg, #ffffff 0%, #fef2f2 100%)',
        shadow: '0 4px 12px rgba(244, 63, 94, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
        offset: '14px'
    },
    song: {
        size: 'small',
        weight: '600',
        color: '#be123c',
        font: "'Poppins', sans-serif"
    },
    artist: {
        size: 'small',
        weight: '400',
        color: '#ffffff',
        background: 'linear-gradient(135deg, #f43f5e, #fb923c)',
        padding: '2px 6px',
        borderRadius: '12px',
        font: "'Poppins', sans-serif"
    },
    cardNumber: {
        size: 'small',
        weight: '600',
        color: '#ffffff',
        background: 'linear-gradient(135deg, #a855f7, #f43f5e)',
        padding: '3px 10px',
        borderRadius: '15px',
        shadow: '0 1px 4px rgba(168, 85, 247, 0.15)',
        font: "'Poppins', sans-serif"
    },
    footer: {
        size: 'small',
        weight: '500',
        color: '#4b484eff',
        letterSpacing: '0.3pt',
        textTransform: 'uppercase',
        font: "'Poppins', sans-serif"
    }
};
