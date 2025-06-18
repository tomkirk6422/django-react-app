from django.db import models
from uuid import uuid


class Category(models.Model):
    # Use UUID as the primary key to ensure global uniqueness and prevent exposure of predictable IDs
    identifier = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
    name = models.CharField(max_length=200)

    def __string__(self):
        return f"{self.name}"
