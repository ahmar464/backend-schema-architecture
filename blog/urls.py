# blog/urls.py
from django.urls import path
from . import api_views as views

urlpatterns = [
    path('categories/', views.CategoryListCreateAPIView.as_view(), name='category-list'),
    path('categories/<slug:slug>/', views.CategoryDetailAPIView.as_view(), name='category-detail'),
    path('posts/', views.PostListCreateAPIView.as_view(), name='post-list'),
    path('posts/<slug:slug>/', views.PostDetailAPIView.as_view(), name='post-detail'),
]
