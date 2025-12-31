from django.db import models
from django.contrib.auth.models import AbstractUser

class BingoUser(AbstractUser):
    """Custom user model for BingoMusicMaker."""
    email = models.EmailField(unique=True)
    google_id = models.CharField(max_length=255, blank=True, null=True)
    
    # Spotify credentials for private playlists
    spotify_client_id = models.CharField(max_length=255, blank=True, null=True)
    spotify_client_secret = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.username

class SpotifyToken(models.Model):
    """Storage for Spotify OAuth tokens."""
    user = models.OneToOneField(BingoUser, on_delete=models.CASCADE, related_name='spotify_token')
    access_token = models.CharField(max_length=512)
    refresh_token = models.CharField(max_length=512)
    expires_at = models.DateTimeField()

class BingoEvent(models.Model):
    """A session for generating bingo cards."""
    user = models.ForeignKey(BingoUser, on_delete=models.CASCADE, related_name='events')
    event_title = models.CharField(max_length=255, default="Bingo Musical")
    playlist_id = models.CharField(max_length=255)
    playlist_name = models.CharField(max_length=255)
    
    # Configuration
    num_cards = models.PositiveIntegerField(default=1)
    rows = models.PositiveIntegerField(default=3)
    columns = models.PositiveIntegerField(default=3)
    theme = models.CharField(max_length=50, default='classic')
    primary_color = models.CharField(max_length=7, default='#3f51b5') # Hex color
    songs_per_card = models.PositiveIntegerField() # rows * columns
    
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        self.songs_per_card = self.rows * self.columns
        super().save(*args, **kwargs)

class PlaylistTrack(models.Model):
    """Tracks fetched for a specific event/playlist."""
    event = models.ForeignKey(BingoEvent, on_delete=models.CASCADE, related_name='tracks')
    name = models.CharField(max_length=255)
    artist = models.CharField(max_length=255)
    played = models.BooleanField(default=False)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return f"{self.name} - {self.artist}"

class BingoCard(models.Model):
    """An individual card generated for an event."""
    event = models.ForeignKey(BingoEvent, on_delete=models.CASCADE, related_name='cards')
    card_index = models.PositiveIntegerField()
    data = models.JSONField() # List of song/artist pairs
    
    class Meta:
        unique_together = ('event', 'card_index')
