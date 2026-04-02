import React from 'react';
import { Music, Disc3, Headphones, Sparkles, Star, Crown, Gem , Music2} from 'lucide-react';

export default {
    id: 'luxury_night',
    label: "Let's Party",
    category: 'Premium',
    font: "'Outfit', sans-serif",
    defaultAccentColor: '#3b82f6',
    defaultGridSize: 'medium',
    background: {
        color: '#fafafa',
        elements: [
            // Notes musicals afegides per defecte
            { content: <Music size={60} color="#3b82f6" opacity={0.12} />, style: { top: '10%', right: '10%', transform: 'rotate(15deg)' }, decorationLevel: 'subtle' },
            { content: <Music2 size={50} color="#3b82f6" opacity={0.1} />, style: { bottom: '10%', left: '8%', transform: 'rotate(-20deg)' }, decorationLevel: 'subtle' },
        
            // Patró de punts VIP subtil
            {
                content: (
                    <div style={{
                        width: '100%',
                        height: '100%',
                        backgroundImage: 'radial-gradient(circle, rgba(59, 130, 246, 0.04) 1px, transparent 1px)',
                        backgroundSize: '25px 25px'
                    }} />
                ),
                style: { top: 0, left: 0, width: '100%', height: '100%' },
                isDecorative: true
            },
            
            // Icones de luxe subtils
            { content: <Headphones size={55} color="#1e293b" opacity={0.12} />, style: { top: '15%', right: '8%', transform: 'rotate(-12deg)' }, decorationLevel: 'subtle' },
            { content: <Disc3 size={60} color="#3b82f6" opacity={0.1} />, style: { bottom: '12%', left: '6%', transform: 'rotate(15deg)' }, decorationLevel: 'subtle' },
            { content: <Crown size={45} color="#d4af37" opacity={0.15} />, style: { top: '10%', left: '50%', transform: 'translateX(-50%)' }, decorationLevel: 'subtle' },
            
            // Elements decoratius geomètrics - reemplaçant "VIBES ONLY"
            {
                content: (
                    <div style={{
                        width: '50px',
                        height: '50px',
                        background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
                        borderRadius: '50%',
                        opacity: 0.2
                    }} />
                ),
                style: { top: '8%', right: '5%' },
                decorationLevel: 'subtle'
            },
            {
                content: (
                    <div style={{
                        width: '30px',
                        height: '30px',
                        border: '2px solid #d4af37',
                        borderRadius: '50%',
                        opacity: 0.3
                    }} />
                ),
                style: { bottom: '20%', right: '10%' },
                decorationLevel: 'subtle'
            },
            
            // Estels daurats
            { content: <Star size={22} color="#d4af37" fill="#d4af37" opacity={0.25} />, style: { top: '20%', left: '12%' }, decorationLevel: 'subtle' },
            { content: <Star size={18} color="#d4af37" fill="#d4af37" opacity={0.2} />, style: { bottom: '25%', right: '15%' }, decorationLevel: 'subtle' },
            
            // Gemes decoratives
            { content: <Gem size={35} color="#3b82f6" opacity={0.12} />, style: { top: '60%', left: '3%', transform: 'rotate(30deg)' }, decorationLevel: 'subtle' },
            { content: <Gem size={28} color="#d4af37" opacity={0.1} />, style: { bottom: '30%', right: '5%', transform: 'rotate(-20deg)' }, decorationLevel: 'subtle' },
            
            // Espurnes
            { content: <Sparkles size={30} color="#3b82f6" opacity={0.15} />, style: { top: '35%', left: '15%' }, decorationLevel: 'subtle' },
            { content: <Sparkles size={24} color="#d4af37" opacity={0.12} />, style: { bottom: '15%', left: '20%' }, decorationLevel: 'subtle' },
            
            // Notes musicals
            { content: <Music size={40} color="#1e293b" opacity={0.08} strokeWidth={1.5} />, style: { bottom: '40%', left: '2%', transform: 'rotate(-25deg)' }, decorationLevel: 'subtle' },
            
            // Línies decoratives
            {
                content: (
                    <div style={{
                        width: '100%',
                        height: '1px',
                        background: 'linear-gradient(90deg, transparent, #d4af37, transparent)',
                        opacity: 0.3
                    }} />
                ),
                style: { top: '22%', left: '0' },
                isDecorative: true
            },
            
            // Radio i micròfon simplificats
            {
                content: (
                    <svg width="80" height="80" viewBox="0 0 120 120" opacity="0.1">
                        <rect x="15" y="35" width="90" height="50" fill="none" stroke="#3b82f6" strokeWidth="2" rx="8" />
                        <circle cx="30" cy="60" r="8" fill="#3b82f6" />
                        <circle cx="90" cy="60" r="8" fill="#3b82f6" />
                        <rect x="40" y="45" width="40" height="30" fill="#3b82f6" rx="3" opacity="0.5" />
                    </svg>
                ),
                style: { bottom: '8%', right: '8%', transform: 'rotate(15deg)' },
                decorationLevel: 'subtle'
            }
        ]
    },
    card: {
        border: '4px solid #1e293b',
        background: '#ffffff',
        borderRadius: '8px',
        offset: '15mm',
        shadow: '0 12px 40px rgba(30, 41, 59, 0.1)'
    },
    title: {
        content: 'MUSIC BINGO',
        size: 'medium',
        weight: '800',
        color: '#1e293b',
        letterSpacing: '2pt',
        shadow: '4px 4px 0px #3b82f6',
        textAlign: 'left',
        font: "'Outfit', sans-serif"
    },
    subtitle: {
        content: '🥂 MUSIC BINGO 🍾',
        size: 'medium',
        weight: '600',
        color: '#475569',
        letterSpacing: '2pt',
        textAlign: 'left',
        font: "'Outfit', sans-serif"
    },
    grid: { gap: '16px', padding: '30px 20px' },
    cell: {
        shape: '4px',
        border: '3px solid #1e293b',
        background: '#ffffff',
        shadow: '6px 6px 0px #3b82f6',
        offset: '15px'
    },
    song: { 
        size: 'medium', 
        weight: '700', 
        color: '#0f172a',
        font: "'Outfit', sans-serif"
    },
    artist: {
        size: 'medium',
        weight: '600',
        color: '#ffffff',
        background: '#3b82f6',
        padding: '3px 10px',
        borderRadius: '4px',
        font: "'Outfit', sans-serif"
    },
    cardNumber: {
        size: 'small',
        weight: '700',
        color: '#1e293b',
        background: '#f1f5f9',
        padding: '5px 14px',
        borderRadius: '15px',
        border: '1px solid #e2e8f0'
    },
    footer: {
        size: 'small',
        weight: '500',
        color: '#94a3b8',
        letterSpacing: '2pt',
        textAlign: 'center',
        font: "'Outfit', sans-serif"
    }
};
