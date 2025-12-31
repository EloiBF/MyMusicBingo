import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const AuthCallback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = searchParams.get('token');
        const spotifyId = searchParams.get('spotify_id');
        const displayName = searchParams.get('display_name');
        const error = searchParams.get('error');

        if (token) {
            localStorage.setItem('token', token);

            // Store Spotify account info for future quick login
            if (spotifyId && displayName) {
                const spotifyAccount = {
                    spotify_id: spotifyId,
                    display_name: displayName,
                    last_login: new Date().toISOString()
                };
                localStorage.setItem('spotify_account', JSON.stringify(spotifyAccount));
            }

            navigate('/dashboard');
        } else if (error) {
            alert(`Login Failed: ${error}`);
            navigate('/auth');
        } else {
            navigate('/auth');
        }
    }, [searchParams, navigate]);

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--background)',
            color: 'white'
        }}>
            <h2>Authenticating with Spotify...</h2>
            <p>Please wait while we redirect you.</p>
        </div>
    );
};

export default AuthCallback;
