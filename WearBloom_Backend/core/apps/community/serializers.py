from rest_framework import serializers
from .models import ExchangeItem

class ExchangeItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExchangeItem
        fields = '__all__'