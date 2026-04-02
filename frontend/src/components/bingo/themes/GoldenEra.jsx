import React from 'react';
import { Music, Star, Sparkles, Crown, Diamond, Sun , Music2} from 'lucide-react';

export default {
    id: 'goldenera',
    label: 'Golden Era',
    category: 'Elegant',
    font: "'Playfair Display', serif",
    defaultAccentColor: '#d4af37',
    defaultGridSize: 'medium',
    defaultTitleSpace: 'medium',
    background: {
        color: '#fef3c7',
        elements: [
            // Patró de linies diagonals subtil
            {
                content: (
                    <div style={{
                        width: '100%',
                        height: '100%',
                        background: `
                            repeating-linear-gradient(
                                45deg,
                                transparent,
                                transparent 20px,
                                rgba(212, 175, 55, 0.03) 20px,
                                rgba(212, 175, 55, 0.03) 22px
                            )
                        `
                    }} />
                ),
                style: { top: 0, left: 0, width: '100%', height: '100%' },
                isDecorative: true
            },
            
            // Ornaments Art Decó - Top Left
            {
                content: (
                    <svg width="200" height="150" viewBox="0 0 100 75" opacity="0.25">
                        {/* Motiu geomètric Art Decó */}
                        <path d="M5,5 L25,5 L25,25 L5,25 Z" fill="none" stroke="#d4af37" strokeWidth="1" />
                        <path d="M30,5 L45,5 L45,20 L30,20 Z" fill="none" stroke="#d4af37" strokeWidth="0.8" />
                        <path d="M10,30 L20,30 L15,40 Z" fill="#d4af37" opacity="0.5" />
                        <line x1="5" y1="50" x2="50" y2="50" stroke="#d4af37" strokeWidth="0.5" />
                        <circle cx="25" cy="60" r="5" fill="none" stroke="#d4af37" strokeWidth="0.8" />
                        <path d="M5,70 L50,70" stroke="#d4af37" strokeWidth="0.5" strokeDasharray="5,5" />
                    </svg>
                ),
                style: { top: '0', left: '0' },
                decorationLevel: 'subtle'
            },
            
            // Ornaments Art Decó - Top Right (mirall)
            {
                content: (
                    <svg width="200" height="150" viewBox="0 0 100 75" opacity="0.25" style={{ transform: 'scaleX(-1)' }}>
                        <path d="M5,5 L25,5 L25,25 L5,25 Z" fill="none" stroke="#d4af37" strokeWidth="1" />
                        <path d="M30,5 L45,5 L45,20 L30,20 Z" fill="none" stroke="#d4af37" strokeWidth="0.8" />
                        <path d="M10,30 L20,30 L15,40 Z" fill="#d4af37" opacity="0.5" />
                        <line x1="5" y1="50" x2="50" y2="50" stroke="#d4af37" strokeWidth="0.5" />
                        <circle cx="25" cy="60" r="5" fill="none" stroke="#d4af37" strokeWidth="0.8" />
                        <path d="M5,70 L50,70" stroke="#d4af37" strokeWidth="0.5" strokeDasharray="5,5" />
                    </svg>
                ),
                style: { top: '0', right: '0' },
                decorationLevel: 'subtle'
            },
            
            // Ornaments Art Decó - Bottom Left
            {
                content: (
                    <svg width="180" height="120" viewBox="0 0 100 70" opacity="0.2" style={{ transform: 'scaleY(-1)' }}>
                        <path d="M5,5 L25,5 L25,25 L5,25 Z" fill="none" stroke="#cd7f32" strokeWidth="1" />
                        <path d="M30,5 L45,5 L45,20 L30,20 Z" fill="none" stroke="#cd7f32" strokeWidth="0.8" />
                        <line x1="5" y1="35" x2="50" y2="35" stroke="#cd7f32" strokeWidth="0.5" />
                        <circle cx="25" cy="50" r="4" fill="none" stroke="#cd7f32" strokeWidth="0.8" />
                    </svg>
                ),
                style: { bottom: '0', left: '0' },
                decorationLevel: 'subtle'
            },
            
            // Ornaments Art Decó - Bottom Right
            {
                content: (
                    <svg width="180" height="120" viewBox="0 0 100 70" opacity="0.2" style={{ transform: 'scale(-1)' }}>
                        <path d="M5,5 L25,5 L25,25 L5,25 Z" fill="none" stroke="#cd7f32" strokeWidth="1" />
                        <path d="M30,5 L45,5 L45,20 L30,20 Z" fill="none" stroke="#cd7f32" strokeWidth="0.8" />
                        <line x1="5" y1="35" x2="50" y2="35" stroke="#cd7f32" strokeWidth="0.5" />
                        <circle cx="25" cy="50" r="4" fill="none" stroke="#cd7f32" strokeWidth="0.8" />
                    </svg>
                ),
                style: { bottom: '0', right: '0' },
                decorationLevel: 'subtle'
            },
            
            // Corona daurada decorativa
            { content: <Crown size={45} color="#d4af37" opacity={0.15} />, style: { top: '15%', left: '50%', transform: 'translateX(-50%)' }, decorationLevel: 'subtle' },
            
            // Diamants decoratius
            { content: <Diamond size={30} color="#d4af37" opacity={0.2} />, style: { top: '25%', left: '10%', transform: 'rotate(45deg)' }, decorationLevel: 'subtle' },
            { content: <Diamond size={25} color="#cd7f32" opacity={0.15} />, style: { top: '30%', right: '12%', transform: 'rotate(-30deg)' }, decorationLevel: 'subtle' },
            { content: <Diamond size={28} color="#d4af37" opacity={0.18} />, style: { bottom: '25%', left: '15%', transform: 'rotate(60deg)' }, decorationLevel: 'subtle' },
            { content: <Diamond size={22} color="#cd7f32" opacity={0.12} />, style: { bottom: '30%', right: '10%', transform: 'rotate(-45deg)' }, decorationLevel: 'subtle' },
            
            // Estels daurats
            { content: <Star size={24} color="#d4af37" fill="#d4af37" opacity={0.25} />, style: { top: '20%', left: '25%' }, decorationLevel: 'subtle' },
            { content: <Star size={20} color="#d4af37" fill="#d4af37" opacity={0.2} />, style: { top: '22%', right: '28%' }, decorationLevel: 'subtle' },
            { content: <Star size={22} color="#d4af37" fill="#d4af37" opacity={0.22} />, style: { bottom: '22%', left: '30%' }, decorationLevel: 'subtle' },
            { content: <Star size={18} color="#d4af37" fill="#d4af37" opacity={0.18} />, style: { bottom: '25%', right: '25%' }, decorationLevel: 'subtle' },
            
            // Espurnes daurades
            { content: <Sparkles size={28} color="#d4af37" opacity={0.2} />, style: { top: '35%', right: '20%' }, decorationLevel: 'subtle' },
            { content: <Sparkles size={24} color="#cd7f32" opacity={0.15} />, style: { bottom: '35%', left: '22%' }, decorationLevel: 'subtle' },
            
            // Sol estilitzat
            { content: <Sun size={40} color="#d4af37" opacity={0.12} />, style: { top: '50%', left: '5%' }, decorationLevel: 'subtle' },
            { content: <Sun size={35} color="#cd7f32" opacity={0.1} />, style: { top: '55%', right: '6%' }, decorationLevel: 'subtle' },
            
            // Notes musicals elegants
            { content: <Music size={35} color="#d4af37" opacity={0.15} strokeWidth={1} />, style: { top: '40%', left: '3%', transform: 'rotate(-15deg)' }, decorationLevel: 'subtle' },
            { content: <Music size={30} color="#cd7f32" opacity={0.12} strokeWidth={1} />, style: { bottom: '20%', right: '5%', transform: 'rotate(20deg)' }, decorationLevel: 'subtle' },
            
            // Línia divisòria daurada superior
            {
                content: (
                    <div style={{
                        width: '60%',
                        height: '2px',
                        background: 'linear-gradient(90deg, transparent 0%, #d4af37 20%, #d4af37 80%, transparent 100%)',
                        opacity: 0.4
                    }} />
                ),
                style: { top: '18%', left: '20%' },
                isDecorative: true
            },
            
            // Línia divisòria daurada inferior
            {
                content: (
                    <div style={{
                        width: '60%',
                        height: '2px',
                        background: 'linear-gradient(90deg, transparent 0%, #cd7f32 20%, #cd7f32 80%, transparent 100%)',
                        opacity: 0.3
                    }} />
                ),
                style: { bottom: '18%', left: '20%' },
                isDecorative: true
            }
        ]
    },
    card: {
        border: '4px solid #d4af37',
        background: '#ffffff',
        borderRadius: '0px',
        offset: '16mm',
        shadow: '0 20px 50px rgba(212, 175, 55, 0.15)'
    },
    title: {
        content: 'MUSIC BINGO',
        size: 'medium',
        weight: '700',
        color: '#0a0a0a',
        letterSpacing: '4pt',
        textAlign: 'center',
        textTransform: 'uppercase',
        shadow: '0 2px 10px rgba(212, 175, 55, 0.3)',
        font: "'Playfair Display', serif"
    },
    subtitle: {
        content: '📻 MUSIC BINGO 🎺',
        size: 'large',
        weight: '400',
        color: '#d4af37',
        letterSpacing: '3pt',
        textAlign: 'center',
        textTransform: 'uppercase',
        font: "'Inter', sans-serif"
    },
    grid: {
        gap: '16px',
        padding: '26px 22px'
    },
    cell: {
        shape: '0px',
        border: '2px solid #d4af37',
        background: '#ffffff',
        shadow: '0 4px 15px rgba(212, 175, 55, 0.1)',
        offset: '12px'
    },
    song: {
        size: 'medium',
        weight: '700',
        color: '#1a1a1a',
        font: "'Playfair Display', serif"
    },
    artist: {
        size: 'small',
        weight: '600',
        color: '#ffffff',
        background: 'linear-gradient(135deg, #d4af37, #cd7f32)',
        padding: '3px 10px',
        borderRadius: '2px',
        font: "'Inter', sans-serif"
    },
    cardNumber: {
        size: 'small',
        weight: '700',
        color: '#d4af37',
        background: 'rgba(212, 175, 55, 0.1)',
        padding: '6px 16px',
        borderRadius: '2px',
        border: '1px solid rgba(212, 175, 55, 0.4)'
    },
    footer: {
        size: 'small',
        weight: '500',
        color: '#78716c',
        letterSpacing: '2pt',
        textAlign: 'center',
        font: "'Inter', sans-serif"
    }
};
