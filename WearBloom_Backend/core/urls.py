from django.urls import path, include

urlpatterns = [
    path('wardroom/', include('core.apps.wardroom.urls')),
    path('community/', include('core.apps.community.urls')),
]
