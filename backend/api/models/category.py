from django.db import models
import uuid


class Category(models.Model):
    # Use UUID as the primary key to ensure global uniqueness and prevent exposure of predictable IDs
    identifier = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
    name = models.CharField(max_length=200)

    # ensures a readable name appears in the Django admin and any queryset outputs
    def __str__(self):
        return f"{self.name}"
