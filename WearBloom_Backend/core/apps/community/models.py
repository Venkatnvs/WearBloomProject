from django.db import models
from django.contrib.auth import get_user_model
from core.apps.wardroom.models import WardrobeItem

User = get_user_model()

class ITEMS_EXCHANGE_TYPE_CHOICES(models.TextChoices):
    SALE = 'Sale', 'sale'
    TRADE = 'Trade', 'trade'
    DONATE = 'Donate', 'donate'
    LEND = 'Lend', 'lend'

class ExchangeItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    item = models.ForeignKey(WardrobeItem, on_delete=models.CASCADE)
    exchange_type = models.CharField(max_length=50, choices=ITEMS_EXCHANGE_TYPE_CHOICES.choices, default=ITEMS_EXCHANGE_TYPE_CHOICES.SALE)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    trade_item = models.ForeignKey(WardrobeItem, on_delete=models.SET_NULL, null=True, blank=True, related_name='traded_item')  # For trades
    lend_duration = models.IntegerField(null=True, blank=True)  # For lend duration in days
    description = models.TextField(null=True, blank=True)
    tags = models.JSONField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.item.name
    
    def save(self, *args, **kwargs):
        if self.exchange_type == ITEMS_EXCHANGE_TYPE_CHOICES.SALE and self.price is None:
            raise ValueError("Price is required for Sale exchange type.")
        
        if self.exchange_type == ITEMS_EXCHANGE_TYPE_CHOICES.TRADE and self.trade_item is None:
            raise ValueError("A trade item must be specified for Trade exchange type.")
        
        if self.exchange_type == ITEMS_EXCHANGE_TYPE_CHOICES.LEND and self.lend_duration is None:
            raise ValueError("Lend duration must be specified for Lend exchange type.")
        
        super().save(*args, **kwargs)
