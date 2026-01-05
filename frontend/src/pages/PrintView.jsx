import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Printer, ArrowLeft } from 'lucide-react';
import api from '../api';

const PrintView = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const iframeRef = useRef(null);

    const [html, setHtml] = useState('');
    const [loading, setLoading] = useState(true);

    const printableUrl = useMemo(() => `/bingo/${eventId}/printable_html/`, [eventId]);

    useEffect(() => {
        let cancelled = false;

        const fetchPrintableHtml = async () => {
            try {
                const res = await api.get(printableUrl, { responseType: 'text' });
                if (!cancelled) setHtml(res.data || '');
            } catch (err) {
                const status = err?.response?.status;
                if (status === 401 || status === 403) {
                    navigate('/auth', { replace: true });
                    return;
                }
                console.error('Error fetching printable HTML:', err);
                navigate('/dashboard', { replace: true });
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        fetchPrintableHtml();
        return () => {
            cancelled = true;
        };
    }, [navigate, printableUrl]);

    const handlePrint = () => {
        const win = iframeRef.current?.contentWindow;
        if (!win) return;
        win.focus();
        win.print();
    };

    if (loading) {
        return (
            <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)', background: 'var(--background)', minHeight: '100vh' }}>
                Loading printable view...
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: 'var(--background)', color: 'var(--text)' }}>
            <div className="no-print glass" style={{
                margin: 'clamp(1rem, 2vw, 1.5rem) clamp(1rem, 3vw, 2rem)',
                position: 'sticky',
                top: 0,
                zIndex: 100,
                padding: '0.8rem clamp(1rem, 2vw, 2rem)',
                background: 'var(--surface)',
                borderBottom: '1px solid var(--glass-border)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backdropFilter: 'var(--glass-blur)',
                WebkitBackdropFilter: 'var(--glass-blur)'
            }}>
                <button className="btn btn-secondary glass glass-hover" onClick={() => navigate('/dashboard')}>
                    <ArrowLeft size={18} /> Back
                </button>
                <button onClick={handlePrint} className="btn btn-primary">
                    <Printer size={18} /> Print
                </button>
            </div>

            <iframe
                ref={iframeRef}
                title="Printable Bingo"
                style={{ width: '100%', height: 'calc(100vh - 64px - clamp(2rem, 4vw, 3rem))', border: 'none', display: 'block', background: '#fff' }}
                srcDoc={html}
            />

            <style>{`
                @media print {
                    .no-print { display: none !important; }
                }
            `}</style>
        </div>
    );
};

export default PrintView;
