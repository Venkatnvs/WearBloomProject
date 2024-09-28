from django.urls import path, include
from .views import DashboardView

urlpatterns = [
    path('wardroom/', include('core.apps.wardroom.urls')),
    path('community/', include('core.apps.community.urls')),

    path('dashboard/cards-count/', DashboardView.as_view(), name='dashboard-main-card'),
]
