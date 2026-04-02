import React from 'react';
import { Music, Sparkles, Sun, Palmtree, Shell, Waves , Music2} from 'lucide-react';

export default {
    id: 'tropical',
    label: 'Tropical',
    category: 'Vibrant',
    font: "'Outfit', sans-serif",
    defaultAccentColor: '#059669',
    defaultGridSize: 'medium',
    defaultTitleSpace: 'medium',
    background: {
        color: '#ecfdf5',
        elements: [
            // Més notes musicals afegides
            { content: <Music2 size={65} color="#059669" opacity={0.15} />, style: { top: '15%', right: '15%', transform: 'rotate(15deg)' }, decorationLevel: 'subtle' },
            { content: <Music size={50} color="#059669" opacity={0.18} />, style: { bottom: '15%', left: '15%', transform: 'rotate(-10deg)' }, decorationLevel: 'subtle' },
        
            // Lush Palm Leaf - Top Left (més gran i visible)
            {
                content: (
                    <svg width="220" height="220" viewBox="0 0 100 100" opacity="0.2">
                        <path d="M10,90 Q30,10 90,10 M10,90 Q40,30 85,20 M10,90 Q50,50 80,40 M10,90 Q60,70 75,65 M10,90 Q20,40 15,10" fill="none" stroke="#059669" strokeWidth="1.2" />
                        <path d="M10,90 C40,40 80,20 95,5 C80,20 60,60 10,90" fill="#059669" opacity="0.6" />
                    </svg>
                ),
                style: { top: '0', left: '0', transform: 'rotate(-15deg)' },
                decorationLevel: 'subtle'
            },
            // Lush Palm Leaf - Top Right (més gran)
            {
                content: (
                    <svg width="200" height="200" viewBox="0 0 100 100" opacity="0.18">
                        <path d="M90,90 Q70,10 10,10 M90,90 Q60,30 15,20 M90,90 Q50,50 20,40 M90,90 Q40,70 25,65 M90,90 Q80,40 85,10" fill="none" stroke="#10b981" strokeWidth="1.2" />
                        <path d="M90,90 C60,40 20,20 5,5 C20,20 40,60 90,90" fill="#10b981" opacity="0.5" />
                    </svg>
                ),
                style: { top: '0', right: '0', transform: 'rotate(10deg)' },
                decorationLevel: 'subtle'
            },
            // Monstera Shape - Bottom Left (més visible)
            {
                content: (
                    <svg width="170" height="170" viewBox="0 0 100 100" opacity="0.15">
                        <path d="M50,10 C20,10 5,30 5,60 C5,90 30,95 50,95 C70,95 95,90 95,60 C95,30 80,10 50,10" fill="#059669" />
                        <path d="M50,30 L50,50 M30,45 L45,55 M70,45 L55,55 M25,70 L45,75 M75,70 L55,75" stroke="#047857" strokeWidth="1" fill="none" />
                    </svg>
                ),
                style: { bottom: '0', left: '0', transform: 'rotate(20deg)' },
                decorationLevel: 'subtle'
            },
            // Abstract Sun / Circle - Top Center (més brillant)
            {
                content: (
                    <div style={{
                        width: '350px',
                        height: '350px',
                        background: 'radial-gradient(circle, rgba(251, 191, 36, 0.12) 0%, rgba(251, 191, 36, 0.05) 40%, transparent 70%)',
                        borderRadius: '50%'
                    }} />
                ),
                style: { top: '0', left: '50%', transform: 'translateX(-50%)' },
                decorationLevel: 'subtle'
            },
            // Sol radiant - icona daurada
            { content: <Sun size={50} color="#fbbf24" opacity={0.35} />, style: { top: '12%', left: '50%', transform: 'translateX(-50%)' }, decorationLevel: 'subtle' },
            
            // Icona de palmera prominent
            { content: <Palmtree size={60} color="#059669" opacity={0.2} />, style: { bottom: '10%', right: '5%' }, decorationLevel: 'subtle' },
            
            // Petites icones tropicals
            { content: <Shell size={35} color="#f97316" opacity={0.2} />, style: { bottom: '20%', left: '8%', transform: 'rotate(25deg)' }, decorationLevel: 'subtle' },
            { content: <Shell size={28} color="#ea580c" opacity={0.15} />, style: { top: '35%', right: '8%', transform: 'rotate(-20deg)' }, decorationLevel: 'subtle' },
            
            // Ones decoratives
            { content: <Waves size={55} color="#0ea5e9" opacity={0.15} />, style: { bottom: '35%', left: '3%', transform: 'rotate(-5deg)' }, decorationLevel: 'subtle' },
            { content: <Waves size={45} color="#0ea5e9" opacity={0.12} />, style: { top: '45%', right: '4%', transform: 'rotate(5deg)' }, decorationLevel: 'subtle' },
            
            // Espurnes daurades
            { content: <Sparkles size={28} color="#fbbf24" opacity={0.25} />, style: { top: '20%', left: '12%' }, decorationLevel: 'subtle' },
            { content: <Sparkles size={24} color="#fbbf24" opacity={0.2} />, style: { bottom: '15%', right: '12%' }, decorationLevel: 'subtle' },
            
            // Notes musicals tropicals
            { content: <Music size={40} color="#059669" opacity={0.15} strokeWidth={1.5} />, style: { top: '55%', left: '2%', transform: 'rotate(-25deg)' }, decorationLevel: 'subtle' },
            { content: <Music size={35} color="#10b981" opacity={0.12} strokeWidth={1.5} />, style: { bottom: '25%', right: '3%', transform: 'rotate(20deg)' }, decorationLevel: 'subtle' },
            
            // Patró de punts subtil
            {
                content: (
                    <div style={{
                        width: '100%',
                        height: '100%',
                        backgroundImage: 'radial-gradient(circle, rgba(5, 150, 105, 0.06) 1px, transparent 1px)',
                        backgroundSize: '20px 20px'
                    }} />
                ),
                style: { top: 0, left: 0, width: '100%', height: '100%' },
                isDecorative: true
            }
        ]
    },
    card: {
        border: '3px solid #059669',
        background: '#ffffff',
        borderRadius: '24px',
        offset: '15mm',
        shadow: '0 20px 50px rgba(5, 150, 105, 0.12)'
    },
    title: {
        content: 'MUSIC BINGO',
        size: 'medium',
        weight: '800',
        color: '#047857',
        letterSpacing: '1pt',
        textAlign: 'center',
        textTransform: 'uppercase',
        shadow: '0 2px 8px rgba(5, 150, 105, 0.15)',
        font: "'Outfit', sans-serif"
    },
    subtitle: {
        content: '🌺 MUSIC BINGO 🥥',
        size: 'medium',
        weight: '600',
        color: '#059669',
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
        shape: '16px',
        border: '3px solid #059669',
        background: 'linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)',
        shadow: '0 10px 25px rgba(5, 150, 105, 0.1)',
        offset: '12px'
    },
    song: {
        size: 'medium',
        weight: '800',
        color: '#064e3b'
    },
    artist: {
        size: 'small',
        weight: '600',
        color: '#ffffff',
        background: 'linear-gradient(135deg, #059669, #10b981)',
        padding: '2px 10px',
        borderRadius: '12px',
        font: "'Outfit', sans-serif"
    },
    cardNumber: {
        size: 'small',
        weight: '700',
        color: '#059669',
        background: '#f0fdf4',
        padding: '6px 16px',
        borderRadius: '20px',
        border: '1px solid rgba(5, 150, 105, 0.2)'
    },
    footer: {
        size: 'small',
        weight: '500',
        color: '#64748b',
        letterSpacing: '1pt',
        textAlign: 'center',
        font: "'Outfit', sans-serif"
    }
};
