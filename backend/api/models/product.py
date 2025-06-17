from django.db import models
import uuid
from .category import Category

class Product(models.model):
    # ENSURE DEFAULT GLOBAL UNIQUENESS
    identifier = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)