import React from 'react';
import { Ghost, Flame, Moon, Star, Music, Skull, Sparkles , Music2} from 'lucide-react';

export default {
    id: 'spookynight',
    label: 'Spooky Night',
    category: 'Seasonal',
    font: "'Bebas Neue', cursive",
    defaultAccentColor: '#f97316',
    defaultGridSize: 'medium',
    defaultTitleSpace: 'medium',
    background: {
        color: '#0f0f0f',
        elements: [
            // Gradient fons - efecte nit misteriosa
            {
                content: (
                    <div style={{
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(180deg, #1a1a2e 0%, #0f0f0f 50%, #000000 100%)',
                        position: 'absolute'
                    }} />
                ),
                style: { top: 0, left: 0, width: '100%', height: '100%' },
                isDecorative: true
            },
            
            // Lluna al fons
            {
                content: (
                    <div style={{
                        width: '180px',
                        height: '180px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(251, 191, 36, 0.15) 0%, rgba(251, 191, 36, 0.05) 50%, transparent 70%)',
                        filter: 'blur(20px)'
                    }} />
                ),
                style: { top: '5%', right: '15%' },
                decorationLevel: 'subtle'
            },
            {
                content: <Moon size={100} color="#fbbf24" fill="#fbbf24" opacity={0.2} />,
                style: { top: '8%', right: '18%' },
                decorationLevel: 'subtle'
            },
            
            // Fantasmes decoratius
            { content: <Ghost size={50} color="#7c3aed" opacity={0.3} />, style: { top: '15%', left: '5%', transform: 'rotate(-15deg)' }, decorationLevel: 'subtle' },
            { content: <Ghost size={40} color="#7c3aed" opacity={0.25} />, style: { top: '25%', right: '8%', transform: 'rotate(20deg)' }, decorationLevel: 'subtle' },
            { content: <Ghost size={45} color="#7c3aed" opacity={0.28} />, style: { bottom: '20%', left: '10%', transform: 'rotate(-10deg)' }, decorationLevel: 'subtle' },
            
            // Flames decoratives (foc de Halloween)
            { content: <Flame size={55} color="#f97316" opacity={0.25} />, style: { bottom: '12%', right: '5%', transform: 'rotate(10deg)' }, decorationLevel: 'subtle' },
            { content: <Flame size={40} color="#ea580c" opacity={0.2} />, style: { top: '55%', left: '3%', transform: 'rotate(-20deg)' }, decorationLevel: 'subtle' },
            
            // Fantasmes
            { content: <Ghost size={45} color="#e9d5ff" opacity={0.15} />, style: { top: '40%', right: '4%' }, decorationLevel: 'subtle' },
            { content: <Ghost size={35} color="#e9d5ff" opacity={0.1} />, style: { bottom: '35%', left: '6%' }, decorationLevel: 'subtle' },
            
            // Estels brillants (toxics)
            { content: <Star size={20} color="#a855f7" fill="#a855f7" opacity={0.4} />, style: { top: '10%', left: '25%' }, decorationLevel: 'subtle' },
            { content: <Star size={16} color="#22d3ee" fill="#22d3ee" opacity={0.35} />, style: { top: '18%', right: '30%' }, decorationLevel: 'subtle' },
            { content: <Star size={18} color="#f97316" fill="#f97316" opacity={0.3} />, style: { bottom: '25%', right: '25%' }, decorationLevel: 'subtle' },
            
            // Calaveres
            { content: <Skull size={30} color="#475569" opacity={0.2} />, style: { top: '60%', left: '8%', transform: 'rotate(-15deg)' }, decorationLevel: 'subtle' },
            { content: <Skull size={25} color="#475569" opacity={0.15} />, style: { bottom: '40%', right: '10%', transform: 'rotate(20deg)' }, decorationLevel: 'subtle' },
            
            // Notes musicals fantasmagòriques
            { content: <Music size={40} color="#7c3aed" opacity={0.2} />, style: { top: '70%', left: '15%', transform: 'rotate(-30deg)' }, decorationLevel: 'subtle' },
            { content: <Music size={35} color="#f97316" opacity={0.15} />, style: { bottom: '15%', right: '20%', transform: 'rotate(25deg)' }, decorationLevel: 'subtle' },
            
            // Espurnes màgiques
            { content: <Sparkles size={28} color="#a855f7" opacity={0.3} />, style: { top: '30%', left: '12%' }, decorationLevel: 'subtle' },
            { content: <Sparkles size={24} color="#22d3ee" opacity={0.25} />, style: { bottom: '30%', right: '15%' }, decorationLevel: 'subtle' },
            
            // Silueta d'arbres - Bottom corners
            {
                content: (
                    <svg width="150" height="100" viewBox="0 0 100 70" opacity="0.2">
                        <path d="M20,70 L30,40 L25,45 L35,30 L30,35 L50,10 L70,35 L65,30 L75,45 L70,40 L80,70 Z" fill="#0f0f0f" />
                    </svg>
                ),
                style: { bottom: '0', left: '0' },
                decorationLevel: 'subtle'
            },
            {
                content: (
                    <svg width="150" height="100" viewBox="0 0 100 70" opacity="0.2" style={{ transform: 'scaleX(-1)' }}>
                        <path d="M20,70 L30,40 L25,45 L35,30 L30,35 L50,10 L70,35 L65,30 L75,45 L70,40 L80,70 Z" fill="#0f0f0f" />
                    </svg>
                ),
                style: { bottom: '0', right: '0' },
                decorationLevel: 'subtle'
            }
        ]
    },
    card: {
        border: '4px solid #f97316',
        background: 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)',
        borderRadius: '16px',
        offset: '12mm',
        shadow: '0 15px 50px rgba(249, 115, 22, 0.15)'
    },
    title: {
        content: 'BINGO',
        size: 'medium',
        weight: '700',
        color: '#f97316',
        letterSpacing: '1pt',
        textAlign: 'center',
        textTransform: 'uppercase',
        shadow: '0 0 20px rgba(249, 115, 22, 0.4)',
        font: "'Bebas Neue', cursive"
    },
    subtitle: {
        content: '👻 MUSIC BINGO 🎃',
        size: 'medium',
        weight: '500',
        color: '#a855f7',
        letterSpacing: '2pt',
        textAlign: 'center',
        textTransform: 'uppercase',
        font: "'Bebas Neue', cursive"
    },
    grid: {
        gap: '18px',
        padding: '24px'
    },
    cell: {
        shape: '10px',
        border: '2px solid #7c3aed',
        background: '#0f0f0f',
        shadow: '0 4px 15px rgba(124, 58, 237, 0.2)',
        offset: '14px'
    },
    song: {
        size: 'medium',
        weight: '600',
        color: '#ffffff',
        font: "'Inter', sans-serif"
    },
    artist: {
        size: 'small',
        weight: '500',
        color: '#0f0f0f',
        background: 'linear-gradient(135deg, #f97316, #ea580c)',
        padding: '3px 10px',
        borderRadius: '12px',
        font: "'Inter', sans-serif"
    },
    cardNumber: {
        size: 'small',
        weight: '600',
        color: '#f97316',
        background: 'rgba(249, 115, 22, 0.1)',
        padding: '5px 14px',
        borderRadius: '15px',
        border: '1px solid rgba(249, 115, 22, 0.3)'
    },
    footer: {
        size: 'small',
        weight: '500',
        color: '#475569',
        letterSpacing: '1pt',
        textAlign: 'center',
        font: "'Inter', sans-serif"
    }
};
