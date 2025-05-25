@echo off
setlocal enabledelayedexpansion

echo.
echo 🚀 Initialisation de Ma Biblio Galactique (Windows)
cd /d "%~dp0"

:: === VÉRIFS ===
where python >nul 2>&1 || (
    echo ❌ Python non trouvé. Installer Python 3.
    start https://www.python.org/downloads/
    pause
    exit /b
)

where pip >nul 2>&1 || (
    echo ❌ pip manquant. Tentative de récupération...
    python -m ensurepip
    python -m pip install --upgrade pip
)

where npm >nul 2>&1 || (
    echo ❌ Node.js / npm non trouvés.
    start https://nodejs.org
    pause
    exit /b
)

:: === BACKEND ===
echo ⚙️ Configuration backend...
cd backend || (echo ❌ Dossier backend introuvable & pause & exit /b)

if not exist .venv (
    echo 🐍 Création de l'environnement virtuel...
    python -m venv .venv
)

call .venv\Scripts\activate
pip install -r requirements.txt

echo 🔄 Migration BDD...
python manage.py migrate

:: Lancer Django dans une nouvelle fenêtre (attention : chemin complet)
start "Django Server" cmd /k "cd /d %cd% && call .venv\Scripts\activate && python manage.py runserver"

cd ..

:: === FRONTEND ===
echo 💻 Configuration frontend...
cd frontend || (echo ❌ Dossier frontend introuvable & pause & exit /b)

echo 📦 Installation des dépendances...
call npm install --legacy-peer-deps

if %errorlevel% neq 0 (
    echo ❌ npm install a échoué
    pause
    exit /b
)

:: Lancer Angular dans une autre fenêtre
start "Angular App" cmd /k "cd /d %cd% && npm run start"

cd ..

:: Attente + ouverture du navigateur
echo ⏳ Attente du lancement...
timeout /t 5 >nul

start http://localhost:4200

echo.
echo ✅ Application lancée avec succès !
echo 🔗 Frontend : http://localhost:4200
echo 🔗 Backend  : http://localhost:8000/api/
pause
