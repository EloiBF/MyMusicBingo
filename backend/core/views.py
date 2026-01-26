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
        # Aceptar tanto email como username para login
        identifier = request.data.get('username') or request.data.get('email')
        password = request.data.get('password')
        
        if not identifier or not password:
            return Response({'error': 'auth.errors.required_fields'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Intentar autenticar con email primero
        try:
            user_obj = BingoUser.objects.get(email=identifier)
            username = user_obj.username
        except BingoUser.DoesNotExist:
            # Si no encuentra por email, usar el identifier como username
            username = identifier
        
        # Check if user exists before attempting authentication
        try:
            user_obj = BingoUser.objects.get(username=username)
        except BingoUser.DoesNotExist:
            return Response({'error': 'auth.errors.user_not_found'}, status=status.HTTP_400_BAD_REQUEST)
        
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
        return Response({'error': 'auth.errors.invalid_password'}, status=status.HTTP_400_BAD_REQUEST)

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

    def perform_update(self, serializer):
        # Get old values to check for changes
        instance = self.get_object()
        old_rows = instance.rows
        old_cols = instance.columns
        old_num_cards = instance.num_cards
        old_playlist_id = instance.playlist_id
        
        # Save updated instance
        event = serializer.save()
        
        # Check if critical params changed
        if (event.rows != old_rows or 
            event.columns != old_cols or 
            event.num_cards != old_num_cards or
            event.playlist_id != old_playlist_id):
            
            # Re-generate cards if necessary
            self._regenerate_cards(event)

    def _regenerate_cards(self, event):
        """Internal helper to regenerate cards for an event."""
        # Delete existing cards first
        event.cards.all().delete()
        
        # Use existing tracks associated with the event
        tracks = list(event.tracks.values_list('name', 'artist'))
        
        if not tracks:
            return  # Should not happen if event was created correctly

        # Generate blocks
        blocks = generate_bingo_blocks(tracks, event.num_cards, event.rows, event.columns)
        
        # Save new cards
        for i, block in enumerate(blocks):
            card_data = [{"nom": s, "artista": a} for s, a in block]
            BingoCard.objects.create(
                event=event,
                card_index=i+1,
                data=card_data
            )

    @action(detail=False, methods=['post'])
    def validate_playlist(self, request):
        """Validates a playlist and checks if requested dimensions are feasible."""
        playlist_id = request.data.get('playlist_id')
        rows = int(request.data.get('rows', 3))
        columns = int(request.data.get('columns', 3))
        num_cards = int(request.data.get('num_cards', 1))
        
        if not playlist_id:
            return Response({"error": "playlist_id is required."}, status=400)
            
        try:
            sp = get_spotify_client()
            if not sp:
                return Response({"error": "Failed to connect to Spotify."}, status=400)
            
            playlist = sp.playlist(playlist_id)
            tracks = fetch_playlist_tracks(sp, playlist_id)
            
            num_songs = len(tracks)
            songs_per_card = rows * columns
            import math
            max_possible_unique = math.comb(num_songs, songs_per_card) if num_songs >= songs_per_card else 0
            
            is_valid = num_songs >= 20 and num_songs >= songs_per_card and num_cards <= max_possible_unique
            
            # Generate user-friendly error messages
            error_message = None
            if not is_valid:
                if num_songs < 20:
                    error_message = f"❌ La lista debería tener al menos 20 canciones. Esta playlist tiene {num_songs} canciones."
                elif num_songs < songs_per_card:
                    error_message = f"❌ No hay suficientes canciones: Esta playlist tiene {num_songs} canciones, pero necesitas {songs_per_card} para un cartón {rows}×{columns}. Prueba una cuadrícula más pequeña o una lista más grande."
                elif num_cards > max_possible_unique:
                    if max_possible_unique == 1:
                        error_message = f"❌ Demasiados cartones: Con {num_songs} canciones, solo 1 cartón {rows}×{columns} es posible. Por favor reduce el número de cartones a 1."
                    elif max_possible_unique < 10:
                        error_message = f"❌ Demasiados cartones: Con {num_songs} canciones, solo {max_possible_unique} cartones {rows}×{columns} únicos son matemáticamente posibles. Por favor reduce el número de cartones a {max_possible_unique} o menos."
                    else:
                        error_message = f"❌ Demasiados cartones: Con {num_songs} canciones, puedes crear hasta {max_possible_unique:,} cartones {rows}×{columns} únicos. Por favor reduce el número de cartones."
            
            return Response({
                "playlist_name": playlist['name'],
                "track_count": num_songs,
                "songs_per_card": songs_per_card,
                "max_possible_unique": max_possible_unique,
                "is_valid": is_valid,
                "error_message": error_message,
                "success_message": f"✅ Perfect! You can create {num_cards} unique {rows}×{columns} cards from {num_songs} songs (maximum possible: {max_possible_unique:,})" if is_valid else None
            })

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

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
        
        try:
            sp = get_spotify_client()
            if not sp:
                return Response({"error": "Failed to connect to Spotify."}, status=400)
            
            playlist = sp.playlist(playlist_id)
            tracks = fetch_playlist_tracks(sp, playlist_id)
            
            if not tracks:
                return Response({"error": "No tracks found in playlist."}, status=400)
            
            # Server-side validation to ensure unique cards are possible
            songs_per_card = rows * columns
            num_songs = len(tracks)
            
            if num_songs < 20:
                return Response({
                    "error": f"La lista debería tener al menos 20 canciones. Esta playlist tiene {num_songs} canciones."
                }, status=400)
            
            if num_songs < songs_per_card:
                return Response({
                    "error": f"No hay suficientes canciones: Esta playlist tiene {num_songs} canciones, pero necesitas {songs_per_card} para un cartón {rows}×{columns}."
                }, status=400)
            
            max_possible_unique = math.comb(num_songs, songs_per_card)
            if num_cards > max_possible_unique:
                return Response({
                    "error": f"Demasiados cartones: Con {num_songs} canciones, solo {max_possible_unique:,} cartones {rows}×{columns} únicos son matemáticamente posibles. Por favor reduce el número de cartones."
                }, status=400)
            
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
            
            # Use the internal regeneration helper
            self._regenerate_cards(event)
            
            return Response({
                "event_id": event.id,
                "event_title": event.event_title,
                "playlist_name": event.playlist_name,
                "cards_generated": event.cards.count()
            }, status=status.HTTP_201_CREATED)

        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            import traceback
            print(traceback.format_exc())
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
