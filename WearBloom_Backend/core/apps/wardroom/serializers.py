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

    def update(self, instance, validated_data):
        # Partial update
        if 'items' in validated_data:
            items = validated_data.pop('items')
            instance.items.set(items)
        elif 'name' in validated_data:
            instance.name = validated_data.pop('name')
        elif 'description' in validated_data:
            instance.description = validated_data.pop('description')
        elif 'date' in validated_data:
                instance.date = validated_data.pop('date')
        elif 'favorite' in validated_data:
            instance.favorite = validated_data.pop('favorite')
        print(validated_data)
        return super().update(instance, validated_data)

class OutfitDetailSerializer(serializers.ModelSerializer):
    items = WardrobeItemSerializer(many=True)

    class Meta:
        model = Outfit
        fields = '__all__'