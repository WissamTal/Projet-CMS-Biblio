from rest_framework import viewsets, permissions
from .models import Book
from .serializers import BookSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Q
from rest_framework.permissions import IsAuthenticated

class BookViewSet(viewsets.ModelViewSet):
    serializer_class = BookSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        print("➡️ Utilisateur connecté :", self.request.user)
        print("➡️ ID utilisateur :", self.request.user.id)
        return Book.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class BookSearchView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        print("🔥 BookSearchView appelé")
        query = request.query_params.get('q', '')
        user_books = Book.objects.filter(user=request.user)

        if query:
            user_books = user_books.filter(
                Q(title__icontains=query) | Q(author__icontains=query)
            )

        serializer = BookSerializer(user_books, many=True)
        return Response(serializer.data)