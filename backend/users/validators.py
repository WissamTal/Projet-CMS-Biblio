# users/validators.py
import re
from rest_framework import serializers

def validate_password_strength(password):
    if len(password) < 14:
        raise serializers.ValidationError("Le mot de passe doit contenir au moins 14 caractères.")

    if not re.search(r"[A-Z]", password):
        raise serializers.ValidationError("Le mot de passe doit contenir au moins une majuscule.")

    if not re.search(r"[a-z]", password):
        raise serializers.ValidationError("Le mot de passe doit contenir au moins une minuscule.")

    if not re.search(r"[0-9]", password):
        raise serializers.ValidationError("Le mot de passe doit contenir au moins un chiffre.")

    if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):
        raise serializers.ValidationError("Le mot de passe doit contenir au moins un symbole.")
