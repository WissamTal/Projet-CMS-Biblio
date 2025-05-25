@echo off
echo.
echo 🚀 Initialisation de Ma Biblio Galactique (Windows)

:: Vérifier Python
where python >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo ❌ Python n'est pas installé.
    echo 🔗 Ouverture de https://www.python.org/downloads/
    start https://www.python.org/downloads/
    pause
    exit /b
)

:: Vérifier pip
where pip >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo ❌ pip est manquant.
    echo ➤ Tentative de récupération via ensurepip...
    python -m ensurepip
)

:: Vérifier Node.js / npm
where npm >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js / npm n'est pas installé.
    echo 🔗 Ouverture de https://nodejs.org
    start https://nodejs.org
    pause
    exit /b
)

echo ✅ Dépendances système OK.
echo.

:: --- BACKEND ---
echo 🛠️ Configuration backend (Django)...
cd backend
python -m venv .venv
call .venv\Scripts\activate
pip install --upgrade pip
pip install -r requirements.txt
start cmd /k "cd backend && .venv\Scripts\activate && python manage.py runserver"
cd ..

:: --- FRONTEND ---
echo 💻 Configuration frontend (Angular)...
cd frontend
npm install
start cmd /k "cd frontend && npm run start"
cd ..

echo.
echo ✅ Application prête !
echo 🔗 Frontend : http://localhost:4200
echo 🔗 Backend API : http://localhost:8000/api/
pause
