import yt_dlp

def fetch_youtube_playlist_tracks(playlist_url):
    """
    Fetches all tracks from a YouTube playlist URL using yt-dlp.
    Returns a list of tuples: (track_name, artist_name).
    """
    ydl_opts = {
        'extract_flat': 'in_playlist',
        'quiet': True,
        'no_warnings': True,
        'skip_download': True,
    }
    
    tracks = []
    playlist_title = "YouTube Playlist"
    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(playlist_url, download=False)
            playlist_title = info.get('title', playlist_title)
            
            if 'entries' in info:
                for entry in info['entries']:
                    if entry.get('title'):
                        # Filter out deleted/private videos
                        if entry['title'] in ['[Deleted video]', '[Private video]', 'Deleted video', 'Private video']:
                            continue
                            
                        artist = entry.get('channel') or entry.get('uploader') or "Unknown Channel"
                        title = entry.get('title')
                        tracks.append((title, artist))
            else:
                # Single video
                title = info.get('title')
                artist = info.get('channel') or info.get('uploader') or "Unknown Channel"
                if title:
                    tracks.append((title, artist))
    except Exception as e:
        print(f"Error fetching YouTube playlist: {e}")
        raise ValueError(f"Failed to fetch YouTube playlist: {str(e)}")
        
    return playlist_title, tracks

def is_youtube_url(url_or_id):
    """Check if the string is a YouTube URL"""
    return 'youtube.com' in url_or_id or 'youtu.be' in url_or_id
