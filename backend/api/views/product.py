from rest_framework import viewsets, mixins
from api.serializers.product import ProductSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter
from api.models.product import Product


# Use mixins.ListModelMixin to only exposes the list method (GET /products/)
class ProductViewSet(viewsets.GenericViewSet, mixins.ListModelMixin):
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ["category__name", "tags__name"]
    search_fields = ["description"]

    # overide get_queryset for re-usabilty
    def get_queryset(self):
        # Use select_related to perform a single SQL JOIN query to fetch all related categories (ForeignKey) in one go.
        # Use prefetch_related to perform a separate query to fetch all related tags (ManyToMany), then match them up in Python.

        # Both prefetch_related and select_related prevent Django from running one query for the main objects (N),
        # and then an additional query for each object's related items (N+1 queries), which is inefficient.
        queryset = Product.objects.select_related("category").prefetch_related("tags")
        return queryset
