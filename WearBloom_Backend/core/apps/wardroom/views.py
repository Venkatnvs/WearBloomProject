from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import WardrobeItem, UsageRecord, Outfit
from .serializers import WardrobeItemSerializer, UsageRecordSerializer, OutfitSerializer

class WardrobeItemListView(generics.ListCreateAPIView):
    queryset = WardrobeItem.objects.all()
    serializer_class = WardrobeItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class WardrobeItemDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = WardrobeItem.objects.all()
    serializer_class = WardrobeItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

class UsageRecordListView(generics.ListCreateAPIView):
    queryset = UsageRecord.objects.all()
    serializer_class = UsageRecordSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(item__user=self.request.user)

class UsageRecordDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = UsageRecord.objects.all()
    serializer_class = UsageRecordSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(item__user=self.request.user)

class OutfitListView(generics.ListCreateAPIView):
    queryset = Outfit.objects.all()
    serializer_class = OutfitSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class OutfitDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Outfit.objects.all()
    serializer_class = OutfitSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)