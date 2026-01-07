// Centralized API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const API_URLS = {
  // Base API URL
  BASE: API_BASE_URL,

  // No longer using backend templates for previews or printing.
  // All rendering is now handled on the frontend via ThemeRenderer.

  // Auth endpoints
  AUTH_SPOTIFY_CALLBACK: `${API_BASE_URL}/auth/spotify/callback`,
};

export default API_URLS;
