import React from 'react';
import { Music, Zap, Disc3, Headphones, Star, Cpu, Radio, Sparkles , Music2} from 'lucide-react';

export default {
    id: 'neonlights',
    label: 'Neon Nights',
    category: 'Cyber',
    font: "'Orbitron', sans-serif",
    defaultAccentColor: '#06b6d4',
    defaultGridSize: 'medium',
    defaultTitleSpace: 'medium',
    background: {
        color: '#0a0a0a',
        elements: [
            // Notes musicals afegides per defecte
            { content: <Music size={60} color="#06b6d4" opacity={0.12} />, style: { top: '10%', right: '10%', transform: 'rotate(15deg)' }, decorationLevel: 'subtle' },
            { content: <Music2 size={50} color="#06b6d4" opacity={0.1} />, style: { bottom: '10%', left: '8%', transform: 'rotate(-20deg)' }, decorationLevel: 'subtle' },
        
            // Fons fosc pur
            {
                content: (
                    <div style={{
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(135deg, #0a0a0a 0%, #171717 50%, #0a0a0a 100%)'
                    }} />
                ),
                style: { top: 0, left: 0, width: '100%', height: '100%' },
                isDecorative: true
            },
            
            // Linies de circuit/neon decoratives
            {
                content: (
                    <svg width="300" height="200" viewBox="0 0 300 200" opacity="0.1">
                        <path d="M0,50 L50,50 L50,20 L100,20" fill="none" stroke="#06b6d4" strokeWidth="1" />
                        <path d="M0,100 L80,100 L80,70 L120,70 L120,100 L150,100" fill="none" stroke="#e879f9" strokeWidth="1" />
                        <circle cx="50" cy="50" r="3" fill="#06b6d4" />
                        <circle cx="100" cy="20" r="3" fill="#06b6d4" />
                        <circle cx="80" cy="100" r="3" fill="#e879f9" />
                        <circle cx="150" cy="100" r="3" fill="#e879f9" />
                    </svg>
                ),
                style: { top: '5%', left: '0' },
                decorationLevel: 'subtle'
            },
            {
                content: (
                    <svg width="300" height="200" viewBox="0 0 300 200" opacity="0.1" style={{ transform: 'scaleX(-1)' }}>
                        <path d="M0,50 L50,50 L50,20 L100,20" fill="none" stroke="#facc15" strokeWidth="1" />
                        <path d="M0,100 L80,100 L80,70 L120,70 L120,100 L150,100" fill="none" stroke="#06b6d4" strokeWidth="1" />
                        <circle cx="50" cy="50" r="3" fill="#facc15" />
                        <circle cx="100" cy="20" r="3" fill="#facc15" />
                        <circle cx="80" cy="100" r="3" fill="#06b6d4" />
                        <circle cx="150" cy="100" r="3" fill="#06b6d4" />
                    </svg>
                ),
                style: { top: '5%', right: '0' },
                decorationLevel: 'subtle'
            },
            
            // Glow de neon - cian
            {
                content: (
                    <div style={{
                        width: '250px',
                        height: '250px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, transparent 70%)',
                        filter: 'blur(40px)'
                    }} />
                ),
                style: { top: '0', left: '0' },
                decorationLevel: 'subtle'
            },
            
            // Glow de neon - magenta
            {
                content: (
                    <div style={{
                        width: '250px',
                        height: '250px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(232, 121, 249, 0.1) 0%, transparent 70%)',
                        filter: 'blur(40px)'
                    }} />
                ),
                style: { bottom: '0', right: '0' },
                decorationLevel: 'subtle'
            },
            
            // Glow groc
            {
                content: (
                    <div style={{
                        width: '200px',
                        height: '200px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(250, 204, 21, 0.08) 0%, transparent 70%)',
                        filter: 'blur(35px)'
                    }} />
                ),
                style: { top: '30%', left: '50%', transform: 'translateX(-50%)' },
                decorationLevel: 'subtle'
            },
            
            // Icones cyber
            { content: <Cpu size={55} color="#06b6d4" opacity={0.15} />, style: { top: '15%', left: '5%' }, decorationLevel: 'subtle' },
            { content: <Cpu size={45} color="#e879f9" opacity={0.12} />, style: { top: '20%', right: '8%' }, decorationLevel: 'subtle' },
            
            { content: <Disc3 size={60} color="#facc15" opacity={0.12} strokeWidth={1.5} />, style: { bottom: '15%', left: '6%', transform: 'rotate(-20deg)' }, decorationLevel: 'subtle' },
            { content: <Headphones size={50} color="#06b6d4" opacity={0.15} strokeWidth={1.5} />, style: { bottom: '12%', right: '8%', transform: 'rotate(15deg)' }, decorationLevel: 'subtle' },
            
            { content: <Radio size={55} color="#e879f9" opacity={0.12} strokeWidth={1.5} />, style: { top: '60%', left: '3%', transform: 'rotate(-10deg)' }, decorationLevel: 'subtle' },
            { content: <Music size={45} color="#facc15" opacity={0.1} strokeWidth={1.5} />, style: { top: '65%', right: '5%', transform: 'rotate(20deg)' }, decorationLevel: 'subtle' },
            
            // Estels neon
            { content: <Star size={18} color="#06b6d4" fill="#06b6d4" opacity={0.4} />, style: { top: '8%', left: '25%' }, decorationLevel: 'subtle' },
            { content: <Star size={16} color="#e879f9" fill="#e879f9" opacity={0.35} />, style: { top: '12%', right: '20%' }, decorationLevel: 'subtle' },
            { content: <Star size="20" color="#facc15" fill="#facc15" opacity={0.3} />, style: { bottom: '20%', left: '22%' }, decorationLevel: 'subtle' },
            { content: <Star size="18" color="#06b6d4" fill="#06b6d4" opacity={0.35} />, style: { bottom: '25%', right: '25%' }, decorationLevel: 'subtle' },
            
            // Rayos
            { content: <Zap size="35" color="#06b6d4" opacity={0.2} />, style: { top: '40%', left: '10%', transform: 'rotate(-25deg)' }, decorationLevel: 'subtle' },
            { content: <Zap size="30" color="#e879f9" opacity={0.15} />, style: { top: '50%', right: '12%', transform: 'rotate(20deg)' }, decorationLevel: 'subtle' },
            
            // Espurnes digitals
            { content: <Sparkles size="28" color="#facc15" opacity={0.2} />, style: { top: '35%', right: '15%' }, decorationLevel: 'subtle' },
            { content: <Sparkles size="24" color="#06b6d4" opacity={0.18} />, style: { bottom: '30%', left: '18%' }, decorationLevel: 'subtle' },
            
            // Angles decoratius - Canto superior esquerre
            {
                content: (
                    <div style={{
                        width: '60px',
                        height: '60px',
                        borderTop: '2px solid rgba(6, 182, 212, 0.3)',
                        borderLeft: '2px solid rgba(6, 182, 212, 0.3)'
                    }} />
                ),
                style: { top: '3%', left: '3%' },
                decorationLevel: 'subtle'
            },
            
            // Canto superior dret
            {
                content: (
                    <div style={{
                        width: '60px',
                        height: '60px',
                        borderTop: '2px solid rgba(232, 121, 249, 0.3)',
                        borderRight: '2px solid rgba(232, 121, 249, 0.3)'
                    }} />
                ),
                style: { top: '3%', right: '3%' },
                decorationLevel: 'subtle'
            },
            
            // Canto inferior esquerre
            {
                content: (
                    <div style={{
                        width: '60px',
                        height: '60px',
                        borderBottom: '2px solid rgba(250, 204, 21, 0.3)',
                        borderLeft: '2px solid rgba(250, 204, 21, 0.3)'
                    }} />
                ),
                style: { bottom: '3%', left: '3%' },
                decorationLevel: 'subtle'
            },
            
            // Canto inferior dret
            {
                content: (
                    <div style={{
                        width: '60px',
                        height: '60px',
                        borderBottom: '2px solid rgba(6, 182, 212, 0.3)',
                        borderRight: '2px solid rgba(6, 182, 212, 0.3)'
                    }} />
                ),
                style: { bottom: '3%', right: '3%' },
                decorationLevel: 'subtle'
            }
        ]
    },
    card: {
        border: '3px solid #e879f9',
        background: '#0f0f0f',
        borderRadius: '4px',
        offset: '12mm',
        shadow: '0 0 25px rgba(232, 121, 249, 0.2)'
    },
    title: {
        content: 'MUSIC BINGO',
        size: 'medium',
        weight: '700',
        color: '#06b6d4',
        letterSpacing: '2pt',
        textAlign: 'center',
        textTransform: 'uppercase',
        shadow: '0 0 20px rgba(6, 182, 212, 0.4)',
        font: "'Orbitron', sans-serif"
    },
    subtitle: {
        content: '🌃 MUSIC BINGO 🔮',
        size: 'medium',
        weight: '500',
        color: '#e879f9',
        letterSpacing: '3pt',
        textAlign: 'center',
        textTransform: 'uppercase',
        font: "'Orbitron', sans-serif"
    },
    grid: {
        gap: '18px',
        padding: '26px'
    },
    cell: {
        shape: '4px',
        border: '2px solid #06b6d4',
        background: '#0a0a0a',
        shadow: '0 0 15px rgba(6, 182, 212, 0.15)',
        offset: '14px'
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
        color: '#0a0a0a',
        background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
        padding: '3px 10px',
        borderRadius: '4px',
        font: "'Orbitron', sans-serif"
    },
    cardNumber: {
        size: 'small',
        weight: '600',
        color: '#facc15',
        background: 'rgba(250, 204, 21, 0.1)',
        padding: '5px 14px',
        borderRadius: '4px',
        border: '1px solid rgba(250, 204, 21, 0.4)'
    },
    footer: {
        size: 'small',
        weight: '500',
        color: '#525252',
        letterSpacing: '2pt',
        textAlign: 'center',
        font: "'Orbitron', sans-serif"
    }
};
