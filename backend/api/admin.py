from django.contrib import admin
from api.models.product import Product
from api.models.category import Category
from api.models.tag import Tag


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ["identifier", "name", "description", "category"]
    search_fields = ["identifier", "name", "description"]
    filter_horizontal = ["tags"]


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ["identifier", "name"]
    search_fields = ["identifier", "name"]


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ["identifier", "name"]
    search_fields = ["identifier", "name"]
