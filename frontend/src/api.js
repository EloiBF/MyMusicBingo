import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
    withCredentials: true, // Enable cookies for authentication
});

// Add a request interceptor to include the auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Token ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Add a response interceptor to handle token expiration
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Refresh failed or unauthorized, redirect to login
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            
            // Only redirect if we are not already on the auth page to avoid loops
            if (!window.location.pathname.startsWith('/auth')) {
                window.location.href = '/auth';
            }
        }
        return Promise.reject(error);
    }
);

export default api;
