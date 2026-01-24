import { Music, Music2, Music3, Mic2, Headphones, Speaker, Disc, Sparkles, Star } from 'lucide-react';

export default {
    id: 'basic',
    label: 'Basic',
    category: 'Essentials',
    font: "'Montserrat', sans-serif",
    defaultAccentColor: '#3b82f6',
    defaultGridSize: 'medium',
    defaultTitleSpace: 'medium',
    background: {
        color: '#fcfcfc',
        elements: [
            { content: <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: 'linear-gradient(rgba(0,0,0,0.01) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.01) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />, style: { top: 0, left: 0, width: '100%', height: '100%' } },
            // Musical note decorations around title area - using consistent opacity with levels
            { content: <Music size={60} color="#3b82f6" opacity={0.12} />, style: { top: '5%', left: '10%', transform: 'rotate(-15deg)' }, decorationLevel: 'subtle' },
            { content: <Music2 size={50} color="#3b82f6" opacity={0.12} />, style: { top: '8%', right: '12%', transform: 'rotate(20deg)' }, decorationLevel: 'prominent' },
            { content: <Music3 size={45} color="#3b82f6" opacity={0.12} />, style: { top: '12%', left: '15%', transform: 'rotate(10deg)' }, decorationLevel: 'subtle' },
            { content: <Speaker size={55} color="#3b82f6" opacity={0.12} />, style: { top: '6%', right: '8%', transform: 'rotate(-8deg)' }, decorationLevel: 'prominent' },
            { content: <Disc size={40} color="#3b82f6" opacity={0.12} />, style: { top: '10%', left: '25%', transform: 'rotate(25deg)' }, decorationLevel: 'subtle' },
            // Existing elements - using consistent opacity
            { content: <Mic2 size={100} color="#3b82f6" opacity={0.12} />, style: { top: '8%', right: '5%', transform: 'rotate(15deg)' }, decorationLevel: 'subtle' },
            { content: <Headphones size={110} color="#3b82f6" opacity={0.12} />, style: { bottom: '5%', left: '8%', transform: 'rotate(5deg)' }, decorationLevel: 'prominent' },
            { content: <Disc size={90} color="#3b82f6" opacity={0.12} />, style: { bottom: '2%', right: '2%', transform: 'rotate(-15deg)' }, decorationLevel: 'subtle' },
            { content: <Sparkles size={60} color="#3b82f6" opacity={0.12} />, style: { top: '25%', left: '5%' }, decorationLevel: 'prominent' },
            { content: <Star size={50} color="#3b82f6" opacity={0.12} />, style: { bottom: '25%', right: '5%' }, decorationLevel: 'subtle' },
            { content: <div style={{ border: '1px solid #1e293b', opacity: 0.12, width: '96%', height: '98%', borderRadius: '4px' }} />, style: { top: '1%', left: '2%' } },
        ]
    },
    title: {
        content: 'BINGO',
        weight: '700',
        color: '#dc2626',
        letterSpacing: '2pt',
        shadow: '3px 3px 0px #991b1b',
        fontFamily: "'Dancing Script', 'Brush Script MT', cursive",
        fontStyle: 'italic',
        size: 'medium'
    },
    subtitle: {
        size: 'medium',
        weight: '600',
        color: '#64748b',
        letterSpacing: '1pt'
    },
    grid: {
        gap: '20px',
        padding: '16px'
    },
    cell: {
        shape: '8px',
        border: '4px solid #1e293b',
        background: '#ffffff',
        shadow: '0 4px 20px rgba(0,0,0,0.1)',
        offset: '12px'
    },
    song: { size: 'large', weight: '800', color: '#1e293b' },
    artist: { size: 'medium', weight: '600', color: '#64748b' }
};
