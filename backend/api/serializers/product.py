from rest_framework import serializers
from .category import CategorySerializer
from .tag import TagSerializer
from api.models.product import Product


class ProductSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True, read_only=True)
    category = CategorySerializer(read_only=True)

    class Meta:
        model = Product
        fields = "__all__"
