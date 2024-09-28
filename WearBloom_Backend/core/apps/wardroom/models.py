from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class WARDROOM_CATEGORY_CHOICES(models.TextChoices):
    TOPS = 'Tops', 'tops'
    BOTTOMS = 'Bottoms', 'bottoms'
    DRESSES = 'Dresses', 'dresses'
    OUTERWEAR = 'Outerwear', 'outerwear'
    SHOES = 'Shoes', 'shoes'
    ACCESSORIES = 'Accessories', 'accessories'

class WardrobeItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    category = models.CharField(max_length=50, choices=WARDROOM_CATEGORY_CHOICES.choices, default=WARDROOM_CATEGORY_CHOICES.TOPS)
    name = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)
    color = models.CharField(max_length=50)
    image = models.ImageField(upload_to='wardroom/')
    tags = models.JSONField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    
class UsageRecord(models.Model):
    item = models.ForeignKey(WardrobeItem, on_delete=models.CASCADE)
    date = models.DateField()
    occasion = models.CharField(max_length=50)
    notes = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.item.name
    
class Outfit(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=100)
    items = models.ManyToManyField(WardrobeItem)
    date = models.DateField(null=True, blank=True)
    occasion = models.CharField(max_length=50, null=True, blank=True)
    favorite = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.user.email} - {self.date}'