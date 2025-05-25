@echo off
setlocal enabledelayedexpansion

echo.
echo 🚀 Initialisation de Ma Biblio Galactique (Windows)

:: Récupérer le répertoire racine
cd /d "%~dp0"

:: === PYTHON ===
:check_python
where python >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo ❌ Python n'est pas installé.
    echo 🔗 Ouverture de https://www.python.org/downloads/
    start https://www.python.org/downloads/
    pause
    goto check_python
)

:: === PIP ===
:check_pip
where pip >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo ❌ pip est manquant. Tentative de récupération...
    python -m ensurepip
    python -m pip install --upgrade pip
    where pip >nul 2>&1
    IF %ERRORLEVEL% NEQ 0 (
        echo ❌ pip toujours manquant.
        pause
        goto check_pip
    )
)

:: === NODE / NPM ===
:check_npm
where npm >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js / npm non trouvé.
    echo 🔗 Ouverture de https://nodejs.org
    start https://nodejs.org
    pause
    goto check_npm
)

echo ✅ Dépendances système disponibles !
echo.

:: === BACKEND ===
echo 🛠️ Configuration du backend (Django)...
cd backend

IF NOT EXIST .venv (
    python -m venv .venv
)

call .venv\Scripts\activate
pip install --upgrade pip
pip install -r requirements.txt

:: Lancer le backend dans un terminal
start cmd /k "cd /d %cd% && call .venv\Scripts\activate && python manage.py runserver"

cd ..

:: === FRONTEND ===
echo 💻 Configuration du frontend (Angular)...
cd frontend
npm install --legacy-peer-deps

start cmd /k "cd /d %cd% && npm run start"

cd ..

:: === NAVIGATEUR ===
echo ⏳ Attente du chargement...
timeout /t 5 >nul

echo 🌐 Ouverture de l'app dans le navigateur...
start http://localhost:4200

echo.
echo ✅ L'application est prête !
echo 🔗 Frontend : http://localhost:4200
echo 🔗 Backend API : http://localhost:8000/api/

pause
