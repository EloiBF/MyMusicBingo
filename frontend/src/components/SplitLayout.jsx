import React from 'react';

const SplitLayout = ({
    children,
    sidebar,
    sidebarSticky = false,
    desktopColumns,
    reverseOnMobile = false,
    containerHeight,
    variant = 'default' // 'default' | 'bingo-standard'
}) => {
    // Standardized configuration for Bingo App Pages
    const isBingoStandard = variant === 'bingo-standard';

    // Defaults based on variant
    const finalHeight = containerHeight || (isBingoStandard ? 'clamp(550px, 65vh, 650px)' : 'clamp(400px, 50vh, 600px)');
    const finalColumns = desktopColumns || (isBingoStandard ? 'auto 1fr' : '1fr clamp(350px, 20vw, 450px)');
    const finalReverse = isBingoStandard ? true : reverseOnMobile;

    return (
        <div
            className={`grid-layout ${isBingoStandard ? 'bingo-standard-layout' : ''}`}
            style={{
                '--desktop-height': finalHeight,
                display: 'grid',
                gridTemplateColumns: finalColumns,
                alignItems: 'stretch',
                gap: '2rem'
            }}
        >
            <style>{`
                .grid-layout { height: auto; }
                @media (min-width: 1024px) {
                    .grid-layout { height: var(--desktop-height) !important; }
                }
                
                /* Standard Bingo Sidebar Logic */
                @media (min-width: 1024px) {
                    .bingo-standard-layout > aside {
                        width: auto !important;
                        aspect-ratio: 210/297;
                        max-width: none !important;
                    }
                }
                @media (max-width: 1023px) {
                    .bingo-standard-layout > aside > div {
                        max-width: 280px !important;
                        margin-left: auto !important; 
                        margin-right: auto !important;
                    }
                }
            `}</style>

            {/* Main Content Area */}
            <div style={{
                order: finalReverse ? 2 : 1,
                display: 'flex',
                flexDirection: 'column',
                minWidth: 0,
                minHeight: 0,
                height: isBingoStandard ? '100%' : 'auto'
            }}>
                {children}
            </div>

            {/* Sidebar Area */}
            <aside style={{
                order: finalReverse ? 1 : 2,
                display: 'flex',
                flexDirection: 'column',
                minWidth: 0,
                minHeight: 0,
                height: isBingoStandard ? '100%' : 'auto'
            }}>
                {sidebar}
            </aside>
        </div>
    );
};

export default SplitLayout;
