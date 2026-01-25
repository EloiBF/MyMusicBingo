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
        color: '#ffffff',
        elements: [
            // Background Decorations (subtle, engine-controlled opacity)
            { content: <Music size={100} color="#3b82f6" />, style: { top: '5%', left: '9%', transform: 'rotate(-15deg)' }, decorationLevel: 'subtle' },
            { content: <Mic2 size={100} color="#3b82f6" />, style: { top: '8%', right: '10%', transform: 'rotate(15deg)' }, decorationLevel: 'subtle' },
            
            // Decorations (full opacity, engine-independent)
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
