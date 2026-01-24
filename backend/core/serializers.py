from rest_framework import serializers
from .models import BingoUser, BingoEvent, BingoCard

class BingoUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = BingoUser
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = BingoUser.objects.create_user(**validated_data)
        if password:
            user.set_password(password)
            user.save()
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
