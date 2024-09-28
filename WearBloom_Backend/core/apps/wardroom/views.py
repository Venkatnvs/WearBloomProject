from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import WardrobeItem, UsageRecord, Outfit
from .serializers import WardrobeItemSerializer, UsageRecordSerializer, OutfitSerializer, OutfitDetailSerializer

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
    
    # Partial update
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        print(request.data, instance)
        if 'items' in request.data:
            items = request.data.pop('items')
            instance.items.set(items)
        elif 'name' in request.data:
            instance.name = request.data.pop('name')
        elif 'description' in request.data:
            instance.description = request.data.pop('description')
        elif 'date' in request.data:
            instance.date = request.data.pop('date')
        elif 'favorite' in request.data:
            print(request.data)
            instance.favorite = not instance.favorite
        instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
    
class OutfitDetailedListView(generics.ListAPIView):
    queryset = Outfit.objects.all()
    serializer_class = OutfitDetailSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)
    
class OutfitDetail(generics.RetrieveAPIView):
    queryset = Outfit.objects.all()
    serializer_class = OutfitDetailSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)