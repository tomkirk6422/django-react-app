from django.db import models
from uuid import uuid

# Create your models here.
class Category(models.Model):
    # ENSURE DEFAULT GLOBAL UNIQUENESS
    identifier = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
    name = models.CharField(max_length=200)


    def __string__(self):
        return f"{self.name}"