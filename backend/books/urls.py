from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import BookViewSet, BookSearchView

router = DefaultRouter()
router.register(r'', BookViewSet, basename='book')

extra_routes = [
    path('search/', BookSearchView.as_view(), name='book-search'),
]
urlpatterns = extra_routes + router.urls