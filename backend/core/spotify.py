import spotipy
from spotipy.oauth2 import SpotifyClientCredentials, SpotifyOAuth
from django.conf import settings
from .models import SpotifyToken
import os

from django.utils import timezone
from datetime import timedelta

def get_spotify_client(user=None, client_id=None, client_secret=None):
    """
    Returns a Spotify client. 
    1. If user is provided and has a token, use that (auto-refresh if needed).
    2. If client_id/secret are provided, use those (User's private app context).
    3. Fallback to centralized app credentials for public playlists.
    """
    if user and user.is_authenticated:
        try:
            token = SpotifyToken.objects.get(user=user)
            
            # Check expiry
            if token.expires_at <= timezone.now():
                # Refresh Token
                sp_oauth = SpotifyOAuth(
                    client_id=settings.SPOTIFY_CLIENT_ID,
                    client_secret=settings.SPOTIFY_CLIENT_SECRET,
                    redirect_uri=settings.SPOTIFY_REDIRECT_URI
                )
                token_info = sp_oauth.refresh_access_token(token.refresh_token)
                
                access_token = token_info['access_token']
                expires_in = token_info['expires_in']
                expires_at = timezone.now() + timedelta(seconds=expires_in)
                
                token.access_token = access_token
                token.expires_at = expires_at
                token.save()
            else:
                access_token = token.access_token
                
            return spotipy.Spotify(auth=access_token)
            
        except SpotifyToken.DoesNotExist:
            pass # Fallthrough if no token

    if client_id and client_secret:
        # User provided their own app credentials
        auth_manager = SpotifyClientCredentials(client_id=client_id, client_secret=client_secret)
        return spotipy.Spotify(auth_manager=auth_manager)
    
    # Fallback to centralized app (should be in environment or settings)
    central_id = settings.SPOTIFY_CLIENT_ID or os.environ.get("SPOTIFY_CLIENT_ID")
    central_secret = settings.SPOTIFY_CLIENT_SECRET or os.environ.get("SPOTIFY_CLIENT_SECRET")
    
    if central_id and central_secret:
        auth_manager = SpotifyClientCredentials(client_id=central_id, client_secret=central_secret)
        return spotipy.Spotify(auth_manager=auth_manager)
    
    return None

def fetch_playlist_tracks(sp, playlist_id):
    """Fetches all tracks from a playlist."""
    results = sp.playlist_items(playlist_id, additional_types=['track'])
    tracks = []
    
    while results:
        for item in results['items']:
            track = item['track']
            if track:
                tracks.append((track['name'], track['artists'][0]['name']))
        
        if results['next']:
            results = sp.next(results)
        else:
            results = None
            
    return tracks
