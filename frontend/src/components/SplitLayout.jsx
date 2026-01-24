import React from 'react';

const SplitLayout = ({
    children,
    sidebar,
    sidebarSticky = false,
    desktopColumns = '1fr clamp(350px, 20vw, 450px)',
    reverseOnMobile = false,
    containerHeight = 'clamp(400px, 50vh, 600px)'
}) => {
    return (
        <div
            className="grid-layout"
            style={{
                display: 'grid',
                gridTemplateColumns: desktopColumns,
                height: containerHeight + ' !important',
                alignItems: 'stretch',
                gap: '2rem'
            }}
        >
            {/* Main Content Area */}
            <div style={{
                order: reverseOnMobile ? 2 : 1,
                display: 'flex',
                flexDirection: 'column',
                minHeight: 0 // Permite que el contenido se contraiga correctamente
            }}>
                {children}
            </div>

            {/* Sidebar Area */}
            <aside style={{
                order: reverseOnMobile ? 1 : 2,
                display: 'flex',
                flexDirection: 'column',
                minHeight: 0 // Permite que el sidebar se contraiga correctamente
            }}>
                {sidebar}
            </aside>
        </div>
    );
};

export default SplitLayout;
