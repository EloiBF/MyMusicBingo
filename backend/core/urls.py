from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AuthViewSet, BingoViewSet, SpotifyAuthViewSet, RefreshTokenView, CustomAuthToken

router = DefaultRouter()
router.register(r'auth/spotify', SpotifyAuthViewSet, basename='spotify-auth')
router.register(r'auth', AuthViewSet, basename='auth')
router.register(r'bingo', BingoViewSet, basename='bingo')
router.register(r'auth/refresh', RefreshTokenView, basename='refresh-token')

urlpatterns = [
    path('auth/token/', CustomAuthToken.as_view(), name='api_token_auth'),
    path('', include(router.urls)),
]
