from django.db import models
import uuid
from .category import Category
from .tag import Tag


class Product(models.model):
    # Use UUID as the primary key to ensure global uniqueness and prevent exposure of predictable IDs
    identifier = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
    # assuming each product can only have one category
    category = models.OneToOneField(
        Category, on_delete=models.CASCADE, related_name="category"
    )
    # assuming each product can only have many tags
    tag = models.ForeignKey(Tag, on_delete=models.CASCADE, related_name="tags")
