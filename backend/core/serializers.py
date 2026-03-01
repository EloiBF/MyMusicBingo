from rest_framework import serializers
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from .models import BingoUser, BingoEvent, BingoCard

class BingoUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = BingoUser
        fields = ('id', 'email', 'password', 'is_premium')
        extra_kwargs = {
            'password': {'write_only': True, 'required': True},
            'email': {'required': True}
        }

    def validate_email(self, value):
        try:
            validate_email(value)
        except ValidationError:
            raise serializers.ValidationError("Enter a valid email address.")
        
        # Check if email already exists
        if BingoUser.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        
        return value

    def validate_password(self, value):
        if len(value) < 6:
            raise serializers.ValidationError("Password must be at least 6 characters long.")
        return value

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
    background_url = serializers.SerializerMethodField()

    class Meta:
        model = BingoEvent
        fields = [
            'id',
            'user',
            'event_title',
            'playlist_id',
            'playlist_name',
            'num_cards',
            'rows',
            'columns',
            'theme',
            'orientation',
            'is_premium',
            'primary_color',
            'theme_overrides',
            'background_file',
            'background_url',
            'songs_per_card',
            'created_at',
        ]
        read_only_fields = ('user', 'playlist_name', 'songs_per_card')

    def get_background_url(self, obj):
        request = self.context.get('request')
        if not obj.background_file:
            return None
        try:
            url = obj.background_file.url
        except Exception:
            return None
        if request is None:
            return url
        return request.build_absolute_uri(url)

class BingoCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = BingoCard
        fields = '__all__'
