import React from 'react';
import { Sun, Palmtree, Music, Waves, Star, Shell, Umbrella , Music2} from 'lucide-react';

export default {
    id: 'summervibes',
    label: 'Summer Vibes',
    category: 'Seasonal',
    font: "'Outfit', sans-serif",
    defaultAccentColor: '#f97316',
    defaultGridSize: 'medium',
    defaultTitleSpace: 'medium',
    background: {
        color: '#fff7ed',
        elements: [
            // Gradient càlid de fons
            {
                content: (
                    <div style={{
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(135deg, #fff7ed 0%, #fef3c7 50%, #fff7ed 100%)'
                    }} />
                ),
                style: { top: 0, left: 0, width: '100%', height: '100%' },
                isDecorative: true
            },
            
            // Sol radiant
            {
                content: (
                    <div style={{
                        width: '220px',
                        height: '220px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(251, 191, 36, 0.25) 0%, rgba(251, 191, 36, 0.1) 40%, transparent 70%)',
                        filter: 'blur(25px)'
                    }} />
                ),
                style: { top: '0', right: '10%' },
                decorationLevel: 'subtle'
            },
            { content: <Sun size={90} color="#fbbf24" opacity={0.4} />, style: { top: '5%', right: '15%', transform: 'rotate(15deg)' }, decorationLevel: 'subtle' },
            
            // Palmeres estilitzades SVG - Left
            {
                content: (
                    <svg width="200" height="250" viewBox="0 0 100 130" opacity="0.15">
                        <path d="M50,120 Q50,80 30,60 M50,120 Q50,70 20,50 M50,120 Q50,60 10,40 M50,120 Q50,50 25,25 M50,120 Q50,40 45,15" 
                              fill="none" stroke="#16a34a" strokeWidth="2" />
                        <path d="M50,120 Q50,80 70,60 M50,120 Q50,70 80,50 M50,120 Q50,60 90,40 M50,120 Q50,50 75,25 M50,120 Q50,40 55,15" 
                              fill="none" stroke="#16a34a" strokeWidth="2" />
                        <line x1="50" y1="120" x2="50" y2="80" stroke="#16a34a" strokeWidth="3" />
                    </svg>
                ),
                style: { bottom: '0', left: '0' },
                decorationLevel: 'subtle'
            },
            
            // Palmera Right
            {
                content: (
                    <svg width="180" height="220" viewBox="0 0 100 130" opacity="0.12" style={{ transform: 'scaleX(-1)' }}>
                        <path d="M50,120 Q50,80 30,60 M50,120 Q50,70 20,50 M50,120 Q50,60 10,40 M50,120 Q50,50 25,25 M50,120 Q50,40 45,15" 
                              fill="none" stroke="#16a34a" strokeWidth="2" />
                        <path d="M50,120 Q50,80 70,60 M50,120 Q50,70 80,50 M50,120 Q50,60 90,40 M50,120 Q50,50 75,25 M50,120 Q50,40 55,15" 
                              fill="none" stroke="#16a34a" strokeWidth="2" />
                        <line x1="50" y1="120" x2="50" y2="80" stroke="#16a34a" strokeWidth="3" />
                    </svg>
                ),
                style: { bottom: '0', right: '0' },
                decorationLevel: 'subtle'
            },
            
            // Icones d'estiu
            { content: <Palmtree size={60} color="#16a34a" opacity={0.2} />, style: { top: '20%', left: '3%' }, decorationLevel: 'subtle' },
            { content: <Palmtree size={50} color="#16a34a" opacity={0.15} />, style: { top: '35%', right: '5%' }, decorationLevel: 'subtle' },
            
            // Ones decoratives
            { content: <Waves size={70} color="#0ea5e9" opacity={0.15} />, style: { bottom: '25%', left: '8%', transform: 'rotate(-5deg)' }, decorationLevel: 'subtle' },
            { content: <Waves size={55} color="#0ea5e9" opacity={0.12} />, style: { bottom: '15%', right: '12%', transform: 'rotate(5deg)' }, decorationLevel: 'subtle' },
            
            // Estels decoratius
            { content: <Star size={25} color="#fbbf24" fill="#fbbf24" opacity={0.3} />, style: { top: '25%', left: '20%' }, decorationLevel: 'subtle' },
            { content: <Star size={20} color="#f97316" fill="#f97316" opacity={0.25} />, style: { top: '15%', right: '35%' }, decorationLevel: 'subtle' },
            { content: <Star size={22} color="#fbbf24" fill="#fbbf24" opacity={0.3} />, style: { bottom: '30%', right: '25%' }, decorationLevel: 'subtle' },
            
            // Conxes
            { content: <Shell size={35} color="#f97316" opacity={0.2} />, style: { bottom: '20%', left: '20%', transform: 'rotate(30deg)' }, decorationLevel: 'subtle' },
            { content: <Shell size={28} color="#ea580c" opacity={0.15} />, style: { top: '60%', right: '8%', transform: 'rotate(-20deg)' }, decorationLevel: 'subtle' },
            
            // Guarda-sols
            { content: <Umbrella size={45} color="#ec4899" opacity={0.15} />, style: { top: '55%', left: '5%', transform: 'rotate(-15deg)' }, decorationLevel: 'subtle' },
            
            // Notes musicals
            { content: <Music size={40} color="#f97316" opacity={0.2} />, style: { top: '45%', right: '3%', transform: 'rotate(20deg)' }, decorationLevel: 'subtle' },
            { content: <Music size={35} color="#0ea5e9" opacity={0.15} />, style: { bottom: '35%', left: '15%', transform: 'rotate(-25deg)' }, decorationLevel: 'subtle' },
            
            // Patró de punts càlid
            {
                content: (
                    <div style={{
                        width: '100%',
                        height: '100%',
                        backgroundImage: 'radial-gradient(circle, rgba(249, 115, 22, 0.06) 1px, transparent 1px)',
                        backgroundSize: '25px 25px'
                    }} />
                ),
                style: { top: 0, left: 0, width: '100%', height: '100%' },
                isDecorative: true
            }
        ]
    },
    card: {
        border: '3px solid #f97316',
        background: '#ffffff',
        borderRadius: '20px',
        offset: '14mm',
        shadow: '0 15px 40px rgba(249, 115, 22, 0.15)'
    },
    title: {
        content: 'BINGO',
        size: 'medium',
        weight: '800',
        color: '#ea580c',
        letterSpacing: '1pt',
        textAlign: 'center',
        textTransform: 'uppercase',
        shadow: '2px 2px 0px #fbbf24',
        font: "'Outfit', sans-serif"
    },
    subtitle: {
        content: '🌴 MUSIC BINGO 🍹',
        size: 'large',
        weight: '600',
        color: '#0ea5e9',
        letterSpacing: '2pt',
        textAlign: 'center',
        textTransform: 'uppercase',
        font: "'Outfit', sans-serif"
    },
    grid: {
        gap: '16px',
        padding: '24px 20px'
    },
    cell: {
        shape: '12px',
        border: '2px solid #0ea5e9',
        background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)',
        shadow: '0 4px 12px rgba(14, 165, 233, 0.1)',
        offset: '12px'
    },
    song: {
        size: 'medium',
        weight: '700',
        color: '#c2410c',
        font: "'Outfit', sans-serif"
    },
    artist: {
        size: 'small',
        weight: '600',
        color: '#ffffff',
        background: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
        padding: '3px 10px',
        borderRadius: '15px',
        font: "'Outfit', sans-serif"
    },
    cardNumber: {
        size: 'small',
        weight: '700',
        color: '#f97316',
        background: 'rgba(249, 115, 22, 0.1)',
        padding: '6px 16px',
        borderRadius: '20px',
        border: '1px solid rgba(249, 115, 22, 0.3)'
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
