from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AuthViewSet, BingoViewSet, SpotifyAuthViewSet

router = DefaultRouter()
router.register(r'auth/spotify', SpotifyAuthViewSet, basename='spotify-auth')
router.register(r'auth', AuthViewSet, basename='auth')
router.register(r'bingo', BingoViewSet, basename='bingo')

urlpatterns = [
    path('', include(router.urls)),
]
