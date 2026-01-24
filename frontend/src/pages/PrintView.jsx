import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Printer, ArrowLeft, Loader2 } from 'lucide-react';
import api from '../api';
import ThemeRenderer from '../components/bingo/ThemeRenderer';

const PrintView = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPrintableData = async () => {
            try {
                const res = await api.get(`/bingo/${eventId}/printable_data/`);
                setData(res.data);
            } catch (err) {
                console.error('Error fetching printable data:', err);
                navigate('/dashboard', { replace: true });
            } finally {
                setLoading(false);
            }
        };

        fetchPrintableData();
    }, [eventId, navigate]);

    const handlePrint = () => {
        window.print();
    };

    if (loading) {
        return (
            <div style={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                color: 'var(--text-muted)',
                background: 'var(--background)'
            }}>
                <Loader2 className="animate-spin" size={32} />
                <p>Preparing high-quality cards...</p>
            </div>
        );
    }

    if (!data) return null;

    const { event, cards } = data;
    const isLandscape = event.orientation === 'landscape';

    return (
        <div className="print-view-container" style={{ background: '#f0f2f5', minHeight: '100vh' }}>
            {/* Control Bar - Hidden on print */}
            <div className="no-print" style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                padding: '0.75rem 2rem',
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                borderBottom: '1px solid rgba(0,0,0,0.1)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
            }}>
                <button
                    className="btn btn-secondary"
                    onClick={() => navigate(`/bingo/${eventId}`)}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                    <ArrowLeft size={18} /> Back to Event
                </button>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>{event.event_title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{cards.length} Cards • {event.rows}x{event.columns}</div>
                </div>
                <button onClick={handlePrint} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Printer size={18} /> Print All Cards
                </button>
            </div>

            {/* Printable Content */}
            <div className="printable-content" style={{
                padding: '80px 0 40px 0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '40px'
            }}>
                {cards.map((card, index) => (
                    <div
                        key={card.id || index}
                        className="print-page"
                        style={{
                            width: isLandscape ? '297mm' : '210mm',
                            height: isLandscape ? '210mm' : '297mm',
                            background: 'white',
                            boxShadow: '0 0 20px rgba(0,0,0,0.1)',
                            position: 'relative',
                            overflow: 'hidden',
                            pageBreakAfter: 'always',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        {/* No scale needed for print as we use mm units in sizes or 100% container */}
                        <div style={{
                            width: isLandscape ? '297mm' : '210mm',
                            height: isLandscape ? '210mm' : '297mm',
                            transform: 'scale(1)', // Pure 1:1 for actual print
                            transformOrigin: 'center center'
                        }}>
                            <ThemeRenderer
                                themeId={event.theme}
                                rows={event.rows}
                                columns={event.columns}
                                orientation={event.orientation}
                                eventTitle={event.event_title}
                                cardData={card.data}
                                cardNumber={card.card_index}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <style>{`
                @media print {
                    body {
                        margin: 0 !important;
                        padding: 0 !important;
                        background: white !important;
                    }
                    .no-print {
                        display: none !important;
                    }
                    .print-view-container {
                        background: white !important;
                        padding: 0 !important;
                    }
                    .printable-content {
                        padding: 0 !important;
                        gap: 0 !important;
                    }
                    .print-page {
                        margin: 0 !important;
                        box-shadow: none !important;
                        width: ${isLandscape ? '297mm' : '210mm'} !important;
                        height: ${isLandscape ? '210mm' : '297mm'} !important;
                        page-break-after: always !important;
                    }
                    @page {
                        size: A4 ${event.orientation};
                        margin: 0;
                    }
                }
            `}</style>
        </div>
    );
};

export default PrintView;
