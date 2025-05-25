from rest_framework import generics, serializers
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import RegisterSerializer
from django.contrib.auth.models import User

from .serializers import CustomTokenObtainPairSerializer
from .validators import validate_password_strength


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = RegisterSerializer(request.user)
        return Response(serializer.data)

    def put(self, request):
        user = request.user

        # Mise à jour du nom d'utilisateur
        username = request.data.get('username')
        if username:
            user.username = username

        # Mise à jour de l'email
        user.email = request.data.get('email', user.email)

        # Changement de mot de passe si présent
        password = request.data.get('password')
        password2 = request.data.get('password2')

        if password:
            if password != password2:
                return Response({'error': 'Les mots de passe ne correspondent pas'}, status=400)
            try:
                validate_password_strength(password)
            except serializers.ValidationError as e:
                return Response({'error': str(e.detail[0])}, status=400)

            user.set_password(password)

        user.save()
        return Response({'message': 'Profil mis à jour avec succès'})

class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            'username': user.username,
            'email': user.email
        })
