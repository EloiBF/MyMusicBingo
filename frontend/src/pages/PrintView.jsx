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
            <div className="no-print control-bar">
                <button
                    className="btn btn-secondary"
                    onClick={() => navigate(`/bingo/${eventId}`)}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                    <ArrowLeft size={18} /> <span className="btn-text">Back to Event</span>
                </button>
                <div className="event-info">
                    <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>{event.event_title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{cards.length} Cards • {event.rows}x{event.columns}</div>
                </div>
                <button onClick={handlePrint} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Printer size={18} /> <span className="btn-text">Print All Cards</span>
                </button>
            </div>

            {/* Printable Content */}
            <div className="printable-content">
                {cards.map((card, index) => (
                    <div
                        key={card.id || index}
                        className="print-page"
                        data-orientation={isLandscape ? 'landscape' : 'portrait'}
                    >
                        <div className="print-page-inner">
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
                /* Control Bar Styles */
                .control-bar {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 1000;
                    padding: 0.75rem 1rem;
                    background: rgba(255, 255, 255, 0.9);
                    backdrop-filter: blur(10px);
                    border-bottom: 1px solid rgba(0,0,0,0.1);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
                }

                .event-info {
                    text-align: center;
                    flex: 1;
                    margin: 0 1rem;
                }

                /* Printable Content Styles */
                .printable-content {
                    padding: 80px 0 40px 0;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 40px;
                }

                .print-page {
                    width: 210mm;
                    height: 297mm;
                    background: white;
                    box-shadow: 0 0 20px rgba(0,0,0,0.1);
                    position: relative;
                    overflow: hidden;
                    page-break-after: always;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .print-page[data-orientation="landscape"] {
                    width: 297mm;
                    height: 210mm;
                }

                .print-page-inner {
                    width: 210mm;
                    height: 297mm;
                    transform: scale(1);
                    transform-origin: center center;
                }

                .print-page[data-orientation="landscape"] .print-page-inner {
                    width: 297mm;
                    height: 210mm;
                }

                /* Mobile Responsive Styles */
                @media screen and (max-width: 768px) {
                    .control-bar {
                        padding: 0.5rem;
                        gap: 0.5rem;
                    }

                    .btn-text {
                        display: none;
                    }

                    .event-info {
                        margin: 0 0.5rem;
                    }

                    .event-info > div:first-child {
                        font-size: 0.875rem !important;
                    }

                    .event-info > div:last-child {
                        font-size: 0.65rem !important;
                    }

                    .printable-content {
                        padding: 60px 1rem 20px 1rem;
                        gap: 20px;
                    }

                    /* Portrait cards on mobile */
                    .print-page[data-orientation="portrait"] {
                        width: calc(100vw - 2rem);
                        height: auto;
                        aspect-ratio: 210 / 297;
                    }

                    /* Landscape cards on mobile */
                    .print-page[data-orientation="landscape"] {
                        width: calc(100vw - 2rem);
                        height: auto;
                        aspect-ratio: 297 / 210;
                    }

                    /* Scale the inner content to fit mobile viewport */
                    .print-page-inner {
                        width: 210mm;
                        height: 297mm;
                        transform: scale(calc((100vw - 2rem) / 210mm));
                        transform-origin: center center;
                    }

                    .print-page[data-orientation="landscape"] .print-page-inner {
                        width: 297mm;
                        height: 210mm;
                        transform: scale(calc((100vw - 2rem) / 297mm));
                        transform-origin: center center;
                    }
                }

                /* Tablet Responsive Styles */
                @media screen and (min-width: 769px) and (max-width: 1024px) {
                    .printable-content {
                        padding: 80px 2rem 40px 2rem;
                    }

                    .print-page[data-orientation="portrait"] {
                        width: min(210mm, calc(100vw - 4rem));
                        height: auto;
                        aspect-ratio: 210 / 297;
                    }

                    .print-page[data-orientation="landscape"] {
                        width: min(297mm, calc(100vw - 4rem));
                        height: auto;
                        aspect-ratio: 297 / 210;
                    }

                    /* Scale content for tablets if needed */
                    .print-page-inner {
                        width: 210mm;
                        height: 297mm;
                        transform: scale(min(1, calc((100vw - 4rem) / 210mm)));
                        transform-origin: center center;
                    }

                    .print-page[data-orientation="landscape"] .print-page-inner {
                        width: 297mm;
                        height: 210mm;
                        transform: scale(min(1, calc((100vw - 4rem) / 297mm)));
                        transform-origin: center center;
                    }
                }

                /* Print Styles */
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
                        page-break-after: always !important;
                    }

                    .print-page[data-orientation="portrait"] {
                        width: 210mm !important;
                        height: 297mm !important;
                    }

                    .print-page[data-orientation="landscape"] {
                        width: 297mm !important;
                        height: 210mm !important;
                    }

                    .print-page-inner {
                        width: 100% !important;
                        height: 100% !important;
                        transform: scale(1) !important;
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
