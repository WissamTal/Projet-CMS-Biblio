@echo off
title 🚀 Lancement de Ma Biblio Galactique (Windows)
echo.
echo 🌌 Initialisation du projet...

REM === BACKEND SETUP ===
echo.
echo 🔧 Configuration du backend (Django)...

cd backend

REM Créer l'environnement virtuel
if not exist .venv (
    python -m venv .venv
)

REM Activer l'environnement
call .venv\Scripts\activate.bat

REM Installer les dépendances
pip install --upgrade pip
pip install -r requirements.txt

REM Appliquer les migrations
python manage.py migrate

REM Lancer le serveur Django
start cmd /k "cd backend && call .venv\Scripts\activate.bat && python manage.py runserver"

cd ..

REM === FRONTEND SETUP ===
echo.
echo 💻 Configuration du frontend (Angular)...

cd frontend

REM Installer les dépendances Angular
call npm install --legacy-peer-deps

REM Lancer Angular
start cmd /k "cd frontend && npm run start"

REM Ouvrir le navigateur
timeout /t 5 > nul
start http://localhost:4200

cd ..

echo.
echo ✅ L'application est lancée avec succès !
echo   - Frontend : http://localhost:4200
echo   - Backend API : http://localhost:8000/api/
pause
