// Centralized API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const API_URLS = {
  // Base API URL
  BASE: API_BASE_URL,
  
  // Bingo endpoints
  BINGO_LIVE_PREVIEW: (params) => `${API_BASE_URL}/bingo/live_preview/?${params}`,
  BINGO_PRINTABLE: (id) => `${API_BASE_URL}/bingo/${id}/printable_html/`,
  BINGO_PREVIEW_CARD: (id) => `${API_BASE_URL}/bingo/${id}/preview_card/?preview=1`,
  
  // Auth endpoints
  AUTH_SPOTIFY_CALLBACK: `${API_BASE_URL}/auth/spotify/callback`,
};

export default API_URLS;
