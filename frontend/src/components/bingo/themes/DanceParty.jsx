import React from 'react';
import { Music, Mic2, Radio, Disc3, Sparkles, Heart, Zap, Headphones , Music2} from 'lucide-react';

export default {
    id: 'danceparty',
    label: 'Dance Party',
    category: 'Music',
    font: "'Poppins', sans-serif",
    defaultAccentColor: '#f43f5e',
    defaultGridSize: 'medium',
    defaultTitleSpace: 'medium',
    background: {
        color: '#fef2f2',
        elements: [
            // Notes musicals afegides per defecte
            { content: <Music size={60} color="#f43f5e" opacity={0.12} />, style: { top: '10%', right: '10%', transform: 'rotate(15deg)' }, decorationLevel: 'subtle' },
            { content: <Music2 size={50} color="#f43f5e" opacity={0.1} />, style: { bottom: '10%', left: '8%', transform: 'rotate(-20deg)' }, decorationLevel: 'subtle' },
        
            // Vibrant gradient circles for party atmosphere - positioned within bounds
            {
                content: (
                    <div style={{
                        width: '250px',
                        height: '250px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(244, 63, 94, 0.12) 0%, transparent 70%)',
                        filter: 'blur(35px)'
                    }} />
                ),
                style: { top: '0', right: '0' },
                decorationLevel: 'subtle'
            },
            {
                content: (
                    <div style={{
                        width: '220px',
                        height: '220px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(251, 146, 60, 0.1) 0%, transparent 70%)',
                        filter: 'blur(30px)'
                    }} />
                ),
                style: { bottom: '0', left: '0' },
                decorationLevel: 'subtle'
            },
            {
                content: (
                    <div style={{
                        width: '200px',
                        height: '200px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(168, 85, 247, 0.08) 0%, transparent 70%)',
                        filter: 'blur(25px)'
                    }} />
                ),
                style: { top: '35%', left: '50%', transform: 'translateX(-50%)' },
                decorationLevel: 'subtle'
            },
            // Top corner accents - subtle decorative elements
            {
                content: (
                    <div style={{
                        width: '25px',
                        height: '25px',
                        background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.5), rgba(251, 146, 60, 0.5))',
                        borderRadius: '50%'
                    }} />
                ),
                style: { top: '3%', left: '3%' },
                decorationLevel: 'subtle'
            },
            {
                content: (
                    <div style={{
                        width: '20px',
                        height: '20px',
                        background: 'linear-gradient(225deg, rgba(168, 85, 247, 0.5), rgba(244, 63, 94, 0.5))',
                        borderRadius: '50%'
                    }} />
                ),
                style: { top: '5%', right: '4%' },
                decorationLevel: 'subtle'
            },
            { content: <Sparkles size={22} color="#f43f5e" fill="#f43f5e" opacity={0.6} />, style: { top: '8%', left: '8%' }, decorationLevel: 'subtle' },
            { content: <Sparkles size={18} color="#fb923c" fill="#fb923c" opacity={0.5} />, style: { top: '6%', right: '8%' }, decorationLevel: 'subtle' },
            // Music and dance icons - moved down to avoid header overlap
            { content: <Music size={75} color="#f43f5e" strokeWidth={2.5} />, style: { top: '35%', left: '1%', transform: 'rotate(-15deg)' }, decorationLevel: 'subtle' },
            { content: <Mic2 size={65} color="#fb923c" strokeWidth={2.5} />, style: { top: '55%', right: '1%', transform: 'rotate(20deg)' }, decorationLevel: 'subtle' },
            { content: <Radio size={70} color="#a855f7" strokeWidth={2.5} />, style: { bottom: '8%', left: '1%', transform: 'rotate(-25deg)' }, decorationLevel: 'subtle' },
            { content: <Disc3 size={60} color="#f43f5e" strokeWidth={2.5} />, style: { bottom: '10%', right: '1%', transform: 'rotate(15deg)' }, decorationLevel: 'subtle' },
            { content: <Headphones size={55} color="#fb923c" strokeWidth={2.5} />, style: { top: '72%', left: '2%', transform: 'rotate(-10deg)' }, decorationLevel: 'subtle' },
            // Party decorations - sparkles and hearts - repositioned away from header
            { content: <Sparkles size={32} color="#f43f5e" fill="#f43f5e" />, style: { top: '38%', right: '3%' }, decorationLevel: 'subtle' },
            { content: <Heart size={30} color="#fb923c" fill="#fb923c" />, style: { bottom: '15%', left: '2%' }, decorationLevel: 'subtle' },
            { content: <Sparkles size={28} color="#a855f7" fill="#a855f7" />, style: { bottom: '18%', right: '3%' }, decorationLevel: 'subtle' },
            { content: <Heart size={26} color="#f43f5e" fill="#f43f5e" />, style: { top: '60%', left: '18%', transform: 'rotate(15deg)' }, decorationLevel: 'subtle' },
            { content: <Zap size={32} color="#fb923c" fill="#fb923c" />, style: { top: '65%', right: '18%', transform: 'rotate(-20deg)' }, decorationLevel: 'subtle' },
            // Confetti dots - moved down
            {
                content: (
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', width: '70px' }}>
                        {[...Array(10)].map((_, i) => (
                            <div
                                key={i}
                                style={{
                                    width: '7px',
                                    height: '7px',
                                    borderRadius: '50%',
                                    background: ['#f43f5e', '#fb923c', '#a855f7', '#fbbf24', '#10b981'][i % 5],
                                    transform: `rotate(${i * 24}deg)`
                                }}
                            />
                        ))}
                    </div>
                ),
                style: { top: '40%', left: '3%' },
                decorationLevel: 'subtle'
            },
            // Corner accents - very subtle small rounded corners only
            {
                content: (
                    <div style={{
                        width: '35px',
                        height: '35px',
                        background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.4), rgba(251, 146, 60, 0.4))',
                        borderRadius: '0 0 100% 0'
                    }} />
                ),
                style: { top: '2%', left: '2%' },
                decorationLevel: 'subtle'
            },
            {
                content: (
                    <div style={{
                        width: '35px',
                        height: '35px',
                        background: 'linear-gradient(225deg, rgba(168, 85, 247, 0.4), rgba(244, 63, 94, 0.4))',
                        borderRadius: '0 0 0 100%'
                    }} />
                ),
                style: { top: '2%', right: '2%' },
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
        content: 'BINGO',
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
