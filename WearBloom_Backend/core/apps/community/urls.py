from django.urls import path
from .views import (
    ExchangeItemListView,
    ExchangeItemDetailView,
)

urlpatterns = [
    path('exchange/', ExchangeItemListView.as_view(), name='exchange-list'),
    path('exchange/<int:pk>/', ExchangeItemDetailView.as_view(), name='exchange-detail'),
]