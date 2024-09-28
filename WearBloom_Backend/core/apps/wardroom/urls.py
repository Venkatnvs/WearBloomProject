from django.urls import path
from .views import (
    WardrobeItemListView,
    WardrobeItemDetailView,
    UsageRecordListView,
    UsageRecordDetailView,
    OutfitListView,
    OutfitDetailView,
)

urlpatterns = [
    path('wardrobe/', WardrobeItemListView.as_view(), name='wardrobe-list'),
    path('wardrobe/<int:pk>/', WardrobeItemDetailView.as_view(), name='wardrobe-detail'),
    path('usage/', UsageRecordListView.as_view(), name='usage-list'),
    path('usage/<int:pk>/', UsageRecordDetailView.as_view(), name='usage-detail'),
    path('outfit/', OutfitListView.as_view(), name='outfit-list'),
    path('outfit/<int:pk>/', OutfitDetailView.as_view(), name='outfit-detail'),
]