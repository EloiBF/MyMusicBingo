import React from 'react';

const SplitLayout = ({
    children,
    sidebar,
    sidebarSticky = false,
    desktopColumns = '1fr clamp(350px, 25vw, 450px)',
    reverseOnMobile = false // If we ever want sidebar on top
}) => {
    return (
        <div
            className="grid-layout"
            style={{
                gridTemplateColumns: desktopColumns
            }}
        >
            {/* Main Content Area */}
            <div style={{
                minWidth: 0,
                order: reverseOnMobile ? 2 : 1
            }}>
                {children}
            </div>

            {/* Sidebar Area */}
            <aside style={{
                height: sidebarSticky ? 'fit-content' : '100%',
                position: sidebarSticky ? 'sticky' : 'static',
                top: sidebarSticky ? '8rem' : 'auto',
                order: reverseOnMobile ? 1 : 2
            }}>
                {sidebar}
            </aside>
        </div>
    );
};

export default SplitLayout;
