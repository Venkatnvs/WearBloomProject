from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import ExchangeItem
from .serializers import ExchangeItemSerializer

class ExchangeItemListView(generics.ListCreateAPIView):
    queryset = ExchangeItem.objects.all()
    serializer_class = ExchangeItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ExchangeItemDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ExchangeItem.objects.all()
    serializer_class = ExchangeItemSerializer
    permission_classes = [permissions.IsAuthenticated]