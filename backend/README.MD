Step : 

postman : ajout url local : http://127.0.0.1:8000/

/api/register/ :  pour enregister un nouvel user avec en body en form data username, email , password

recuperer un token

/api/token/ : avec le meme form data : reponse


    "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NzY3MzUxMSwiaWF0IjoxNzQ3NTg3MTExLCJqdGkiOiI3MmE4YWIxYjNkNDk0MDM0YjY5ZTUxYjNlM2IzMzIzOCIsInVzZXJfaWQiOjF9.AeIpUiROFsiqFabxisX4JZKZFtIqPjBROfQJ5rqCKkM",
    "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ3NTg3NDExLCJpYXQiOjE3NDc1ODcxMTEsImp0aSI6ImNjMzNmOTY1ZjFiMDQyNjJiODBiNzMyMmNiZDdmNzY4IiwidXNlcl9pZCI6MX0.L5LaG4GmdXC4VLjOm_OynSUVRQPUlqU0p1jbxC2guEE"


step : quand on cré une app on doit créé un fichier de migration avec : 
python manage.py makemigrations books


Protection contre les injections SQL :
l'ORM de django est utilisé et protège contre les injection SQL : Book.objects.filter(user=self.request.user)

On utilise l'extension de Django : Django Rest Framework (DRF) qui facilite la création d'API Restful

Retour JSON standardisé : 
les réponses DRF sont en Json via serializer.data par defaut : return Response(serializer.data)

Gestion des erreurs: 
DRF gére les exceptions :
401 si pas connecté
403 si permissions manquantes
404 si objet non trouvé
400 si champ manquant

Configuration CORS ajouté dans les settings.py:
INSTALLED_APPS += ['corsheaders']
MIDDLEWARE = ['corsheaders.middleware.CorsMiddleware', ...]
CORS_ALLOW_ALL_ORIGINS = True