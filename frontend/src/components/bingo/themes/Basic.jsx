import { Music, Music2, Mic2, Headphones, Disc3, Sparkles, Star } from 'lucide-react';

export default {
    id: 'basic',
    label: 'Basic',
    category: 'Essentials',
    font: "'Outfit', sans-serif",
    defaultAccentColor: '#3b82f6',
    defaultGridSize: 'medium',
    defaultTitleSpace: 'medium',
    background: {
        color: '#ffffff',
        elements: [
            // Background Decorations - més modernes i subtils
            { content: <Music size={90} color="#3b82f6" opacity={0.12} />, style: { top: '5%', left: '8%', transform: 'rotate(-15deg)' }, decorationLevel: 'subtle' },
            { content: <Mic2 size={85} color="#3b82f6" opacity={0.1} />, style: { top: '8%', right: '10%', transform: 'rotate(15deg)' }, decorationLevel: 'subtle' },
            { content: <Disc3 size={70} color="#60a5fa" opacity={0.08} />, style: { bottom: '10%', left: '5%', transform: 'rotate(-20deg)' }, decorationLevel: 'subtle' },
            { content: <Headphones size={65} color="#60a5fa" opacity={0.08} />, style: { bottom: '8%', right: '8%', transform: 'rotate(10deg)' }, decorationLevel: 'subtle' },
            { content: <Music2 size={50} color="#93c5fd" opacity={0.06} />, style: { top: '40%', left: '3%', transform: 'rotate(25deg)' }, decorationLevel: 'subtle' },
            
            // Decoracions subtils
            {
                content: (
                    <div style={{
                        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                        backgroundImage: `
                            linear-gradient(rgba(0,0,0,0.01) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0,0,0,0.01) 1px, transparent 1px)
                        `,
                        backgroundSize: '40px 40px'
                    }} />
                ),
                style: { top: 0, left: 0, width: '100%', height: '100%' },
                isDecorative: true
            },
            {
                content: <div style={{ border: '1px solid #1e293b', width: '96%', height: '98%', borderRadius: '4px' }} />,
                style: { top: '1%', left: '2%' },
                isDecorative: true
            }
        ]
    },
    title: {
        content: 'MUSIC BINGO',
        weight: '800',
        color: '#1e40af',
        letterSpacing: '3pt',
        shadow: '2px 2px 8px rgba(30, 64, 175, 0.2)',
        fontFamily: "'Outfit', sans-serif",
        size: 'medium'
    },
    subtitle: {
        content: '🎵 MUSIC BINGO 🎵',
        size: 'medium',
        weight: '500',
        color: '#64748b',
        letterSpacing: '2pt',
        textTransform: 'uppercase',
        font: "'Outfit', sans-serif"
    },
    grid: {
        gap: '18px',
        padding: '20px'
    },
    cell: {
        shape: '12px',
        border: '3px solid #1e293b',
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        shadow: '0 4px 15px rgba(0,0,0,0.06)',
        offset: '14px'
    },
    song: { 
        size: 'large', 
        weight: '700', 
        color: '#1e293b',
        font: "'Outfit', sans-serif"
    },
    artist: { 
        size: 'medium', 
        weight: '600', 
        color: '#64748b',
        font: "'Outfit', sans-serif"
    },
    cardNumber: {
        size: 'small',
        weight: '600',
        color: '#3b82f6',
        background: '#eff6ff',
        padding: '5px 14px',
        borderRadius: '15px'
    },
    footer: {
        size: 'small',
        weight: '500',
        color: '#94a3b8',
        letterSpacing: '1pt',
        textAlign: 'center',
        font: "'Outfit', sans-serif"
    }
};
