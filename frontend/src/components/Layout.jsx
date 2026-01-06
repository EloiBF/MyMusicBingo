import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <div style={{
            background: 'var(--background)',
            color: 'var(--text)',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <Navbar />
            <main style={{
                flex: 1,
                paddingTop: 'clamp(6rem, 15vh, 10rem)', // Increased padding for better separation
                display: 'flex',
                flexDirection: 'column',
                paddingLeft: '2rem',
                paddingRight: '2rem',
                paddingBottom: '4rem' // Space between content and footer
            }}>
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
