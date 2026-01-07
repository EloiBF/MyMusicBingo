import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ThemeRenderer from '../components/bingo/ThemeRenderer';

const LivePreview = () => {
    const [searchParams] = useSearchParams();

    const theme = searchParams.get('theme') || 'classic';
    const primaryColor = searchParams.get('primary_color') || '#2c3e50';
    const rows = parseInt(searchParams.get('rows')) || 3;
    const columns = parseInt(searchParams.get('columns')) || 3;
    const orientation = searchParams.get('orientation') || 'portrait';
    const eventTitle = searchParams.get('event_title') || 'Music Bingo';

    const dummyData = useMemo(() => {
        return Array(rows * columns).fill(null).map((_, i) => ({
            nom: `Song ${i + 1}`,
            artista: `Artist ${i + 1}`
        }));
    }, [rows, columns]);

    const isLandscape = orientation === 'landscape';

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#f8fafc',
            padding: '20px'
        }}>
            <div style={{
                width: isLandscape ? '297mm' : '210mm',
                height: isLandscape ? '210mm' : '297mm',
                background: 'white',
                boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    width: isLandscape ? '297mm' : '210mm',
                    height: isLandscape ? '210mm' : '297mm',
                    transform: 'scale(1)',
                    transformOrigin: 'center center'
                }}>
                    <ThemeRenderer
                        themeId={theme}
                        primaryColor={primaryColor}
                        rows={rows}
                        columns={columns}
                        orientation={orientation}
                        eventTitle={eventTitle}
                        cardData={dummyData}
                        cardNumber={1}
                    />
                </div>
            </div>

            {/* Print button overlay for convenience */}
            <div className="no-print" style={{
                position: 'fixed',
                bottom: '2rem',
                right: '2rem',
                display: 'flex',
                gap: '1rem'
            }}>
                <button
                    onClick={() => window.close()}
                    className="btn btn-secondary"
                    style={{ background: 'white', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                >
                    Close Preview
                </button>
                <button
                    onClick={() => window.print()}
                    className="btn btn-primary"
                    style={{ boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                >
                    Print This Card
                </button>
            </div>

            <style>{`
                @media print {
                    .no-print { display: none !important; }
                    body { margin: 0; padding: 0; background: white; }
                    @page { size: A4 ${orientation}; margin: 0; }
                }
            `}</style>
        </div>
    );
};

export default LivePreview;
