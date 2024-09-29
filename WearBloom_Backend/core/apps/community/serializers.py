from rest_framework import serializers
from .models import ExchangeItem
from core.apps.wardroom.serializers import WardrobeItemSerializer
from core.apps.wardroom.models import WardrobeItem

class ExchangeItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExchangeItem
        fields = '__all__'

    def validate(self, data):
        if data['exchange_type'] == 'sale' and not data.get('price'):
            raise serializers.ValidationError("Price is required for sale.")
        if data['exchange_type'] == 'trade' and not data.get('trade_item'):
            raise serializers.ValidationError("A trade item must be specified.")
        if data['exchange_type'] == 'lend' and not data.get('lend_duration'):
            raise serializers.ValidationError("Lend duration must be specified.")
        return data
    
    def to_representation(self, instance):
        instance = super().to_representation(instance)
        items_serializer = WardrobeItem.objects.get(id=instance['item'])
        instance['item'] = WardrobeItemSerializer(items_serializer).data
        if instance['trade_item']:
            instance['trade_item'] = WardrobeItemSerializer(WardrobeItem.objects.get(id=instance['trade_item'])).data
        return instance