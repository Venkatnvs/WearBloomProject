from datetime import datetime, timedelta
from django.utils.timezone import make_aware
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from core.apps.wardroom.models import WardrobeItem, UsageRecord, Outfit
from core.apps.community.models import ExchangeItem
from .serializers import DashboardDataSerializer

class DashboardView(generics.GenericAPIView):
    permissions = [permissions.IsAuthenticated,]
    serializer_class = DashboardDataSerializer

    def get_dashboard_data(self, user, start_date, end_date):
        wardroom_items = WardrobeItem.objects.filter(user=user, created_at__range=[start_date, end_date]).count()
        outfit_items = Outfit.objects.filter(user=user, date__range=[start_date, end_date]).count()
        community_items = ExchangeItem.objects.filter(created_at__range=[start_date, end_date]).count()
        usage_records = UsageRecord.objects.filter(item__user=user, date__range=[start_date, end_date]).count()

        return {
            'wardroom_items': wardroom_items,
            'outfit_items': outfit_items,
            'community_items': community_items,
            'usage_records': usage_records
        }

    @swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                'start_date', 
                openapi.IN_QUERY, 
                description="Start date for filtering (YYYY-MM-DD)", 
                type=openapi.TYPE_STRING, 
                format='date', 
                default=(datetime.now() - timedelta(days=30)).strftime('%Y-%m-%d')
            ),
            openapi.Parameter(
                'end_date', 
                openapi.IN_QUERY, 
                description="End date for filtering (YYYY-MM-DD)", 
                type=openapi.TYPE_STRING, 
                format='date', 
                default=datetime.now().strftime('%Y-%m-%d')
            ),
        ]
    )
    def get(self, request):
        user = request.user
        end_date = request.query_params.get('end_date', datetime.now().date())
        start_date = request.query_params.get('start_date', (datetime.now() - timedelta(days=30)).date())
        if isinstance(end_date, str):
            end_date = make_aware(datetime.strptime(end_date, '%Y-%m-%d'))
        if isinstance(start_date, str):
            start_date = make_aware(datetime.strptime(start_date, '%Y-%m-%d'))
        try:
            dashboard_data = self.get_dashboard_data(user, start_date, end_date)
            serialized_data = self.serializer_class(data=dashboard_data)
            if serialized_data.is_valid():
                return Response(serialized_data.data, status=status.HTTP_200_OK)
            else:
                return Response(serialized_data.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)