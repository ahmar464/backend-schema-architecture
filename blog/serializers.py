# blog/serializers.py
from rest_framework import serializers
from .models import Category, Post


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug']


class PostSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), write_only=True, source='category'
    )
    author = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Post
        fields = [
            'id', 'title', 'slug', 'content',
            'published', 'created_at', 'updated_at',
            'author', 'category', 'category_id',
        ]
