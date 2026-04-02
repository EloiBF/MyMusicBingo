import React from 'react';
import { Music, Disc3, Star, Zap, Headphones, Radio, Sparkles , Music2} from 'lucide-react';

export default {
    id: 'retrowave',
    label: 'Retro Wave',
    category: 'Retro',
    font: "'Orbitron', sans-serif",
    defaultAccentColor: '#ff6b9d',
    defaultGridSize: 'medium',
    defaultTitleSpace: 'medium',
    background: {
        color: '#1e1b4b',
        elements: [
            // Notes musicals afegides per defecte
            { content: <Music size={60} color="#ff6b9d" opacity={0.12} />, style: { top: '10%', right: '10%', transform: 'rotate(15deg)' }, decorationLevel: 'subtle' },
            { content: <Music2 size={50} color="#ff6b9d" opacity={0.1} />, style: { bottom: '10%', left: '8%', transform: 'rotate(-20deg)' }, decorationLevel: 'subtle' },
        
            // Gradient synthwave de fons
            {
                content: (
                    <div style={{
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(180deg, #1e1b4b 0%, #312e81 40%, #1e1b4b 100%)'
                    }} />
                ),
                style: { top: 0, left: 0, width: '100%', height: '100%' },
                isDecorative: true
            },
            
            // Grid perspectiva synthwave
            {
                content: (
                    <div style={{
                        width: '100%',
                        height: '40%',
                        background: `
                            linear-gradient(0deg, transparent 24%, rgba(34, 211, 238, 0.15) 25%, rgba(34, 211, 238, 0.15) 26%, transparent 27%, transparent 74%, rgba(34, 211, 238, 0.15) 75%, rgba(34, 211, 238, 0.15) 76%, transparent 77%, transparent),
                            linear-gradient(90deg, transparent 24%, rgba(34, 211, 238, 0.15) 25%, rgba(34, 211, 238, 0.15) 26%, transparent 27%, transparent 74%, rgba(34, 211, 238, 0.15) 75%, rgba(34, 211, 238, 0.15) 76%, transparent 77%, transparent)
                        `,
                        backgroundSize: '40px 40px',
                        transform: 'perspective(200px) rotateX(60deg)',
                        transformOrigin: 'center top'
                    }} />
                ),
                style: { bottom: '30%', left: '0', width: '100%' },
                isDecorative: true
            },
            
            // Sol estil synthwave (cercles degradats)
            {
                content: (
                    <div style={{
                        width: '200px',
                        height: '200px',
                        borderRadius: '50%',
                        background: 'linear-gradient(180deg, #fbbf24 0%, #f97316 50%, #ec4899 100%)',
                        opacity: 0.15,
                        filter: 'blur(10px)'
                    }} />
                ),
                style: { top: '25%', left: '50%', transform: 'translateX(-50%)' },
                decorationLevel: 'subtle'
            },
            
            // Linies horitzontals estil sunset
            {
                content: (
                    <div style={{
                        width: '100%',
                        height: '4px',
                        background: 'linear-gradient(90deg, transparent, #ff6b9d, #fde047, #22d3ee, transparent)',
                        opacity: 0.3
                    }} />
                ),
                style: { top: '40%', left: '0' },
                isDecorative: true
            },
            {
                content: (
                    <div style={{
                        width: '80%',
                        height: '3px',
                        background: 'linear-gradient(90deg, transparent, #22d3ee, #ff6b9d, transparent)',
                        opacity: 0.25
                    }} />
                ),
                style: { top: '45%', left: '10%' },
                isDecorative: true
            },
            
            // Icones retro
            { content: <Disc3 size={70} color="#ff6b9d" opacity={0.25} strokeWidth={1.5} />, style: { top: '10%', left: '5%', transform: 'rotate(-20deg)' }, decorationLevel: 'subtle' },
            { content: <Music size={60} color="#22d3ee" opacity={0.2} strokeWidth={1.5} />, style: { top: '15%', right: '8%', transform: 'rotate(25deg)' }, decorationLevel: 'subtle' },
            { content: <Headphones size={55} color="#fde047" opacity={0.2} strokeWidth={1.5} />, style: { bottom: '15%', left: '6%', transform: 'rotate(-15deg)' }, decorationLevel: 'subtle' },
            { content: <Radio size={65} color="#ff6b9d" opacity={0.2} strokeWidth={1.5} />, style: { bottom: '10%', right: '5%', transform: 'rotate(20deg)' }, decorationLevel: 'subtle' },
            
            // Estels i espurnes
            { content: <Star size={20} color="#fbbf24" fill="#fbbf24" opacity={0.4} />, style: { top: '8%', left: '30%' }, decorationLevel: 'subtle' },
            { content: <Star size={16} color="#22d3ee" fill="#22d3ee" opacity={0.35} />, style: { top: '12%', right: '25%' }, decorationLevel: 'subtle' },
            { content: <Star size={18} color="#ff6b9d" fill="#ff6b9d" opacity={0.3} />, style: { bottom: '20%', left: '25%' }, decorationLevel: 'subtle' },
            { content: <Star size={22} color="#fde047" fill="#fde047" opacity={0.35} />, style: { bottom: '25%', right: '30%' }, decorationLevel: 'subtle' },
            
            // Rayos/zaps
            { content: <Zap size={40} color="#fbbf24" opacity={0.25} />, style: { top: '55%', left: '8%', transform: 'rotate(-30deg)' }, decorationLevel: 'subtle' },
            { content: <Zap size={35} color="#22d3ee" opacity={0.2} />, style: { top: '60%', right: '10%', transform: 'rotate(20deg)' }, decorationLevel: 'subtle' },
            
            // Espurnes
            { content: <Sparkles size={30} color="#ff6b9d" opacity={0.3} />, style: { top: '35%', left: '12%' }, decorationLevel: 'subtle' },
            { content: <Sparkles size={26} color="#22d3ee" opacity={0.25} />, style: { bottom: '30%', right: '12%' }, decorationLevel: 'subtle' },
            
            // Cercles decoratius
            {
                content: (
                    <div style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        border: '2px solid rgba(255, 107, 157, 0.2)'
                    }} />
                ),
                style: { top: '20%', left: '15%' },
                decorationLevel: 'subtle'
            },
            {
                content: (
                    <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        border: '2px solid rgba(34, 211, 238, 0.2)'
                    }} />
                ),
                style: { bottom: '35%', right: '15%' },
                decorationLevel: 'subtle'
            }
        ]
    },
    card: {
        border: '3px solid #22d3ee',
        background: 'rgba(30, 27, 75, 0.95)',
        borderRadius: '0px',
        offset: '12mm',
        shadow: '0 0 30px rgba(34, 211, 238, 0.2)'
    },
    title: {
        content: 'MUSIC BINGO',
        size: 'medium',
        weight: '700',
        color: '#ff6b9d',
        letterSpacing: '2pt',
        textAlign: 'center',
        textTransform: 'uppercase',
        shadow: '0 0 15px rgba(255, 107, 157, 0.5)',
        font: "'Orbitron', sans-serif"
    },
    subtitle: {
        content: '📼 MUSIC BINGO 🕹️',
        size: 'medium',
        weight: '500',
        color: '#22d3ee',
        letterSpacing: '3pt',
        textAlign: 'center',
        textTransform: 'uppercase',
        font: "'Orbitron', sans-serif"
    },
    grid: {
        gap: '20px',
        padding: '28px'
    },
    cell: {
        shape: '0px',
        border: '2px solid #fde047',
        background: '#1e1b4b',
        shadow: '0 0 15px rgba(253, 224, 71, 0.15)',
        offset: '16px'
    },
    song: {
        size: 'medium',
        weight: '600',
        color: '#ffffff',
        font: "'Orbitron', sans-serif"
    },
    artist: {
        size: 'small',
        weight: '500',
        color: '#1e1b4b',
        background: 'linear-gradient(135deg, #22d3ee, #06b6d4)',
        padding: '3px 10px',
        borderRadius: '0px',
        font: "'Orbitron', sans-serif"
    },
    cardNumber: {
        size: 'small',
        weight: '600',
        color: '#ff6b9d',
        background: 'rgba(255, 107, 157, 0.1)',
        padding: '5px 14px',
        borderRadius: '0px',
        border: '1px solid rgba(255, 107, 157, 0.4)'
    },
    footer: {
        size: 'small',
        weight: '500',
        color: '#64748b',
        letterSpacing: '2pt',
        textAlign: 'center',
        font: "'Orbitron', sans-serif"
    }
};
