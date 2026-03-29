from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
from datetime import timedelta

TRIAL_DURATION_DAYS = 90

class BingoUser(AbstractUser):
    """Custom user model for BingoMusicMaker."""
    email = models.EmailField(unique=True)
    is_premium = models.BooleanField(default=False)
    premium_trial_start = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.email

    def is_trial_active(self):
        """Returns True if the user is within the 3-month trial window."""
        if self.premium_trial_start is None:
            return False
        return timezone.now() < self.premium_trial_start + timedelta(days=TRIAL_DURATION_DAYS)

    def effective_is_premium(self):
        """Returns True if user has permanent premium OR an active trial."""
        return self.is_premium or self.is_trial_active()

class ContactRequest(models.Model):
    """A contact request from a user interested in permanent premium."""
    name = models.CharField(max_length=255)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} <{self.email}> — {self.created_at.strftime('%Y-%m-%d')}"

class BingoEvent(models.Model):
    """A session for generating bingo cards."""
    user = models.ForeignKey(BingoUser, on_delete=models.CASCADE, related_name='events')
    event_title = models.CharField(max_length=255, default="Bingo Musical")
    playlist_id = models.CharField(max_length=255)
    playlist_name = models.CharField(max_length=255)
    platform = models.CharField(max_length=20, default='spotify')  # 'spotify' | 'youtube'
    
    # Configuration
    num_cards = models.PositiveIntegerField(default=1)
    rows = models.PositiveIntegerField(default=3)
    columns = models.PositiveIntegerField(default=3)
    theme = models.CharField(max_length=50, default='classic')
    orientation = models.CharField(max_length=10, default='portrait')
    is_premium = models.BooleanField(default=False)
    primary_color = models.CharField(max_length=7, default='#3f51b5') # Hex color
    theme_overrides = models.JSONField(default=dict, blank=True)
    background_file = models.FileField(upload_to='backgrounds/', null=True, blank=True)
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
