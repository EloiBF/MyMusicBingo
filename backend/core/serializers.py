from rest_framework import serializers
from .models import BingoUser, BingoEvent, BingoCard

class BingoUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = BingoUser
        fields = ('id', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        email = validated_data['email']
        # Generar username automáticamente desde el email (parte antes del @)
        username = email.split('@')[0]
        
        # Asegurar que el username sea único
        original_username = username
        counter = 1
        while BingoUser.objects.filter(username=username).exists():
            username = f"{original_username}{counter}"
            counter += 1
        
        password = validated_data.pop('password', None)
        user = BingoUser.objects.create_user(
            username=username,
            email=email,
            password=password
        )
        return user

class BingoEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = BingoEvent
        fields = '__all__'
        read_only_fields = ('user', 'playlist_name', 'songs_per_card')

class BingoCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = BingoCard
        fields = '__all__'
