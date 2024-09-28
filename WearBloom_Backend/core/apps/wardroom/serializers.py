from rest_framework import serializers
from .models import WardrobeItem, UsageRecord, Outfit

class WardrobeItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = WardrobeItem
        fields = '__all__'

class UsageRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = UsageRecord
        fields = '__all__'

class OutfitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Outfit
        fields = '__all__'