import spotipy
from spotipy.oauth2 import SpotifyClientCredentials, SpotifyOAuth
from django.conf import settings
import os

def get_spotify_client():
    """
    Returns a Spotify client using centralized app credentials for public playlists.
    """
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
