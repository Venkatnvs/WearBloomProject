from django.contrib import admin
from .models import WardrobeItem, UsageRecord, Outfit

admin.site.register(WardrobeItem)
admin.site.register(UsageRecord)
admin.site.register(Outfit)