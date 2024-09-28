from rest_framework import serializers
from .models import WardrobeItem, UsageRecord, Outfit

class WardrobeItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = WardrobeItem
        fields = '__all__'

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

class UsageRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = UsageRecord
        fields = '__all__'

class OutfitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Outfit
        fields = '__all__'

class OutfitDetailSerializer(serializers.ModelSerializer):
    items = WardrobeItemSerializer(many=True)

    class Meta:
        model = Outfit
        fields = '__all__'