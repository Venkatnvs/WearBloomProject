from rest_framework import serializers

class DashboardDataSerializer(serializers.Serializer):
    wardroom_items = serializers.IntegerField()
    outfit_items = serializers.IntegerField()
    community_items = serializers.IntegerField()
    usage_records = serializers.IntegerField()