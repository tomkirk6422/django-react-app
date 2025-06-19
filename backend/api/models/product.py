from django.db import models
import uuid
from .category import Category
from .tag import Tag


class Product(models.Model):
    # Use UUID as the primary key to ensure global uniqueness and prevent exposure of predictable IDs
    identifier = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
    name = models.CharField(max_length=200)
    description = models.CharField(max_length=500)
    # I prefer to access reverse relationships with product.category_set.all() instead of using a related_name (more explicit)
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
    )
    tags = models.ManyToManyField(Tag)

    # ensures a readable name appears in the Django admin and any queryset outputs
    def __str__(self):
        return f"{self.name}"
