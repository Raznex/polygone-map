from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CoordinatesViewSet

router = DefaultRouter()
router.register(r'coordinates', CoordinatesViewSet)

urlpatterns = [
    path('', include(router.urls)),
]