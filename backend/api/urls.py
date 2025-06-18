from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api.views.product import ProductViewSet


router = DefaultRouter()

router.register(r"products", ProductViewSet, basename="product")

urlpatterns = [path("", include(router.urls))]
