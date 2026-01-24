from rest_framework import viewsets, status, permissions
from rest_framework.response import Response
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from django.template.loader import render_to_string
from django.utils import timezone
from datetime import timedelta
from .models import BingoUser, BingoEvent, BingoCard, PlaylistTrack
from .serializers import BingoUserSerializer, BingoEventSerializer, BingoCardSerializer
from .spotify import get_spotify_client, fetch_playlist_tracks
from .bingo_engine import generate_bingo_blocks
from django.http import HttpResponse

@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def home(request):
    return Response({
        "message": "BingoMusicMaker API is running",
        "endpoints": {
            "api": "/api/",
            "admin": "/admin/"
        },
        "frontend_note": "Ensure the React frontend is running (usually on port 5173)"
    })

class CustomAuthToken(ObtainAuthToken):
    """Custom token authentication with expiration."""
    
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        
        # Delete old token and create new one
        Token.objects.filter(user=user).delete()
        token = Token.objects.create(user=user)
        
        # Set token expiration (1 hour from now)
        token_created = timezone.now()
        token_expires = token_created + timedelta(hours=1)
        
        response_data = {
            'token': token.key,
            'user': BingoUserSerializer(user).data,
            'expires_at': token_expires.isoformat()
        }
        
        response = Response(response_data)
        
        # Set httpOnly cookie for additional security
        response.set_cookie(
            'auth_token',
            token.key,
            expires=token_expires,
            httponly=True,
            secure=not request.META.get('HTTP_HOST', '').startswith('localhost'),
            samesite='Lax'
        )
        
        return response

class RefreshTokenView(viewsets.GenericViewSet):
    """Refresh authentication token."""
    
    @action(detail=False, methods=['post'])
    def refresh(self, request):
        token_key = request.COOKIES.get('auth_token') or request.headers.get('Authorization', '').replace('Token ', '')
        
        if not token_key:
            return Response({'error': 'No token provided'}, status=status.HTTP_401_UNAUTHORIZED)
        
        try:
            token = Token.objects.select_related('user').get(key=token_key)
            
            # Check if token is older than 1 hour
            if timezone.now() - token.created > timedelta(hours=1):
                token.delete()
                return Response({'error': 'Token expired'}, status=status.HTTP_401_UNAUTHORIZED)
            
            # Create new token
            Token.objects.filter(user=token.user).delete()
            new_token = Token.objects.create(user=token.user)
            
            token_expires = timezone.now() + timedelta(hours=1)
            
            response_data = {
                'token': new_token.key,
                'expires_at': token_expires.isoformat()
            }
            
            response = Response(response_data)
            
            # Update httpOnly cookie
            response.set_cookie(
                'auth_token',
                new_token.key,
                expires=token_expires,
                httponly=True,
                secure=not request.META.get('HTTP_HOST', '').startswith('localhost'),
                samesite='Lax'
            )
            
            return response
            
        except Token.DoesNotExist:
            return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)

class SpotifyAuthViewSet(viewsets.GenericViewSet):
    permission_classes = [permissions.AllowAny]

    @action(detail=False, methods=['get'])
    def login(self, request):
        show_dialog = request.query_params.get('show_dialog', 'false').lower() == 'true'
        # Linking logic: if user is authenticated, we want to link
        state = 'auth'
        if request.user.is_authenticated:
            state = f"link_{request.user.id}"
            
        scopes = 'user-read-private playlist-read-private user-read-email'
        params = {
            'scope': scopes,
            'response_type': 'code',
            'redirect_uri': settings.SPOTIFY_REDIRECT_URI,
            'client_id': settings.SPOTIFY_CLIENT_ID,
            'state': state
        }
        if show_dialog:
            params['show_dialog'] = 'true'
            
        url = requests.Request('GET', 'https://accounts.spotify.com/authorize', params=params).prepare().url
        return Response({'url': url})

    @action(detail=False, methods=['get'])
    def callback(self, request):
        code = request.query_params.get('code')
        error = request.query_params.get('error')
        state = request.query_params.get('state', 'auth')

        if error:
            return redirect(f'{settings.FRONTEND_URL}/auth?error=SpotifyAccessDenied')

        # Exchange code for tokens
        try:
            response = requests.post('https://accounts.spotify.com/api/token', data={
                'grant_type': 'authorization_code',
                'code': code,
                'redirect_uri': settings.SPOTIFY_REDIRECT_URI,
                'client_id': settings.SPOTIFY_CLIENT_ID,
                'client_secret': settings.SPOTIFY_CLIENT_SECRET
            })
            
            if not response.ok:
                return redirect(f'{settings.FRONTEND_URL}/auth?error=TokenExchangeFailed')

            tokens = response.json()
            access_token = tokens.get('access_token')
            refresh_token = tokens.get('refresh_token')
            expires_in = tokens.get('expires_in')
            
            # Get User Profile
            profile_response = requests.get('https://api.spotify.com/v1/me', headers={
                'Authorization': f'Bearer {access_token}'
            })
            
            if not profile_response.ok:
                return redirect(f'{settings.FRONTEND_URL}/auth?error=ProfileFetchFailed')
                
            profile = profile_response.json()
        except Exception as e:
            return redirect(f'{settings.FRONTEND_URL}/auth?error={str(e)}')

        spotify_id = profile.get('id')
        email = profile.get('email')
        display_name = profile.get('display_name') or spotify_id

        # Determine target user
        user = None
        is_linking = state.startswith('link_')
        
        if is_linking:
            try:
                user_id = state.split('_')[1]
                user = BingoUser.objects.get(pk=user_id)
            except (IndexError, BingoUser.DoesNotExist):
                return redirect(f'{settings.FRONTEND_URL}/settings?error=UserNotFound')
        else:
            # Traditional Spotify Login path
            # Search by Spotify ID via token relation or username
            try:
                token_entry = SpotifyToken.objects.get(user__username=spotify_id)
                user = token_entry.user
            except SpotifyToken.DoesNotExist:
                # Try by email if not found by spotify_id
                if email:
                    try:
                        user = BingoUser.objects.get(email=email)
                    except BingoUser.DoesNotExist:
                        pass
            
            if not user:
                # Create a new account from Spotify
                user = BingoUser.objects.create_user(
                    username=spotify_id,
                    email=email or f"{spotify_id}@spotify.user",
                    first_name=display_name.split(' ')[0] if display_name else '',
                    last_name=' '.join(display_name.split(' ')[1:]) if display_name and ' ' in display_name else ''
                )

        # Update or Create Tokens
        expires_at = timezone.now() + timedelta(seconds=expires_in)
        
        SpotifyToken.objects.update_or_create(
            user=user,
            defaults={
                'access_token': access_token,
                'refresh_token': refresh_token,
                'expires_at': expires_at
            }
        )

        # Get DRF Token
        token, _ = Token.objects.get_or_create(user=user)

        # Redirect back
        if is_linking:
            return redirect(f'{settings.FRONTEND_URL}/settings?spotify_linked=true')
        
        # Redirect to Frontend with Token and Spotify info
        frontend_url = f'{settings.FRONTEND_URL}/auth/callback'
        return redirect(f'{frontend_url}?token={token.key}&spotify_id={spotify_id}&display_name={display_name}')

class AuthViewSet(viewsets.GenericViewSet):
    queryset = BingoUser.objects.all()
    serializer_class = BingoUserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        if self.action in ['login', 'register']:
            return [permissions.AllowAny()]
        return super().get_permissions()

    @action(detail=False, methods=['get'])
    def me(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)



    @action(detail=False, methods=['post'])
    def login(self, request):
        from django.contrib.auth import authenticate
        username = request.data.get('username')
        password = request.data.get('password')
        
        user = authenticate(username=username, password=password)
        if user:
            # Delete old token and create new one
            Token.objects.filter(user=user).delete()
            token = Token.objects.create(user=user)
            
            # Set token expiration
            token_expires = timezone.now() + timedelta(hours=1)
            
            response_data = {
                'token': token.key,
                'user': BingoUserSerializer(user).data,
                'expires_at': token_expires.isoformat()
            }
            
            response = Response(response_data)
            
            # Set httpOnly cookie
            response.set_cookie(
                'auth_token',
                token.key,
                expires=token_expires,
                httponly=True,
                secure=not request.META.get('HTTP_HOST', '').startswith('localhost'),
                samesite='Lax'
            )
            
            return response
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'])
    def register(self, request):
        serializer = BingoUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            
            # Create token for new user
            token = Token.objects.create(user=user)
            
            # Set token expiration
            token_expires = timezone.now() + timedelta(hours=1)
            
            response_data = {
                'token': token.key,
                'user': BingoUserSerializer(user).data,
                'expires_at': token_expires.isoformat()
            }
            
            response = Response(response_data, status=status.HTTP_201_CREATED)
            
            # Set httpOnly cookie
            response.set_cookie(
                'auth_token',
                token.key,
                expires=token_expires,
                httponly=True,
                secure=not request.META.get('HTTP_HOST', '').startswith('localhost'),
                samesite='Lax'
            )
            
            return response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'])
    def unlink_spotify(self, request):
        try:
            SpotifyToken.objects.filter(user=request.user).delete()
            return Response({'status': 'success'})
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'])
    def logout(self, request):
        """Logout user and delete token."""
        try:
            # Delete token from database
            token_key = request.COOKIES.get('auth_token') or request.headers.get('Authorization', '').replace('Token ', '')
            if token_key:
                Token.objects.filter(key=token_key).delete()
            
            response = Response({'status': 'success'})
            
            # Clear httpOnly cookie
            response.delete_cookie('auth_token')
            
            return response
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class BingoViewSet(viewsets.ModelViewSet):
    queryset = BingoEvent.objects.all().order_by('-created_at')
    serializer_class = BingoEventSerializer

    def get_queryset(self):
        # Allow unauthorized access only for live_preview (landing page)
        if self.action == 'live_preview':
            return BingoEvent.objects.all()
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['post'])
    def generate_cards(self, request):
        event_title = request.data.get('event_title', 'Bingo Musical')
        playlist_id = request.data.get('playlist_id')
        num_cards = int(request.data.get('num_cards', 1))
        rows = int(request.data.get('rows', 3))
        columns = int(request.data.get('columns', 3))
        theme = request.data.get('theme', 'classic')
        orientation = request.data.get('orientation', 'portrait')
        primary_color = request.data.get('primary_color', '#3f51b5')
        
        # Spotify credentials (if private)
        client_id = request.data.get('client_id')
        client_secret = request.data.get('client_secret')

        try:
            sp = get_spotify_client(user=request.user, client_id=client_id, client_secret=client_secret)
            if not sp:
                return Response({"error": "Failed to connect to Spotify. Check credentials."}, status=400)
            
            playlist = sp.playlist(playlist_id)
            tracks = fetch_playlist_tracks(sp, playlist_id)
            
            if not tracks:
                return Response({"error": "No tracks found in playlist."}, status=400)
            
            # Determine if premium
            is_premium = theme not in ['classic', 'modern'] and not theme.endswith('_basic')

            # Create the event
            event = BingoEvent.objects.create(
                user=request.user,
                event_title=event_title,
                playlist_id=playlist_id,
                playlist_name=playlist['name'],
                num_cards=num_cards,
                rows=rows,
                columns=columns,
                theme=theme,
                orientation=orientation,
                is_premium=is_premium,
                primary_color=primary_color
            )
            
            # Save tracks to DB
            PlaylistTrack.objects.bulk_create([
                PlaylistTrack(event=event, name=name, artist=artist)
                for name, artist in tracks
            ])
            
            # Generate blocks
            blocks = generate_bingo_blocks(tracks, num_cards, rows, columns)
            
            # Save cards
            cards = []
            for i, block in enumerate(blocks):
                card_data = [{"nom": s, "artista": a} for s, a in block]
                card = BingoCard.objects.create(
                    event=event,
                    card_index=i+1,
                    data=card_data
                )
                cards.append(card)
            
            return Response({
                "event_id": event.id,
                "event_title": event.event_title,
                "playlist_name": event.playlist_name,
                "cards_generated": len(cards)
            }, status=status.HTTP_201_CREATED)

        except Exception as e:
            import traceback
            print(traceback.format_exc())
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get'])
    def user_playlists(self, request):
        """Fetches the current user's playlists."""
        try:
            sp = get_spotify_client(user=request.user)
            if not sp:
                return Response({"error": "Spotify connection failed. Please log in again."}, status=400)
            
            results = sp.current_user_playlists(limit=50)
            playlists = []
            
            for item in results['items']:
                # Safe get for images
                image_url = item['images'][0]['url'] if item['images'] else None
                
                playlists.append({
                    'id': item['id'],
                    'name': item['name'],
                    'image': image_url,
                    'tracks_count': item['tracks']['total']
                })
                
            return Response(playlists)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['get'])
    def statistics(self, request, pk=None):
        event = self.get_object()
        cards = event.cards.all()
        
        song_count = {}
        total_slots = 0
        
        for card in cards:
            for item in card.data:
                key = f"{item['nom']} - {item['artista']}"
                song_count[key] = song_count.get(key, 0) + 1
                total_slots += 1
        
        sorted_songs = sorted(song_count.items(), key=lambda x: x[1])
        
        stats = {
            "total_songs_in_pool": event.tracks.count(),
            "total_slots_filled": total_slots,
            "unique_songs_used": len(song_count),
            "num_participants": event.num_cards,
            "most_repeated": sorted_songs[-5:][::-1],
            "least_repeated": sorted_songs[:5]
        }
        return Response(stats)

    @action(detail=True, methods=['get'])
    def get_cards(self, request, pk=None):
        event = self.get_object()
        cards = event.cards.all()
        serializer = BingoCardSerializer(cards, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def printable_data(self, request, pk=None):
        """Returns JSON data needed for the frontend to render the printable set."""
        event = self.get_object()
        cards = event.cards.all().order_by('card_index')
        
        serializer = BingoEventSerializer(event)
        cards_serializer = BingoCardSerializer(cards, many=True)
        
        return Response({
            "event": serializer.data,
            "cards": cards_serializer.data
        })

    @action(detail=True, methods=['get'])
    def printable_html(self, request, pk=None):
        """Deprecated: Use printable_data instead."""
        return Response({"error": "This endpoint is deprecated. Use /printable_data/ for JSON data."}, status=410)
        
    @action(detail=True, methods=['get'])
    def songs(self, request, pk=None):
        """Get all songs for a bingo event, sorted alphabetically"""
        bingo = self.get_object()
        songs = bingo.tracks.all().order_by('name')
        
        data = [{
            'id': song.id,
            'name': song.name,  # Cambiado de song.track_name or song.name
            'artist': song.artist,  # Cambiado de song.artist_name or song.artist
            'played': song.played
        } for song in songs]
        
        return Response({'songs': data})

    @action(detail=True, methods=['post'], url_path='songs/(?P<song_id>[^/.]+)/toggle')
    def toggle_song(self, request, pk=None, song_id=None):
        """Toggle the played status of a song"""
        from django.shortcuts import get_object_or_404
        song = get_object_or_404(PlaylistTrack, id=song_id, event_id=pk)
        song.played = not song.played
        song.save()
        return Response({
            'status': 'success',
            'played': song.played,
            'song_id': song.id
        })
