#!/bin/bash

echo ""
echo "🌌 Lancement automatique de Ma Biblio Galactique..."

# Détecter l'OS
OS="$(uname)"
IS_WINDOWS=false

if [[ "$OS" == "Darwin" ]]; then
  PLATFORM="macOS"
elif [[ "$OS" == "Linux" ]]; then
  PLATFORM="Linux"
elif grep -q Microsoft /proc/version 2>/dev/null; then
  PLATFORM="WSL (Windows)"
  IS_WINDOWS=true
else
  PLATFORM="Inconnu"
fi

echo "🖥️ Plateforme détectée : $PLATFORM"
sleep 1

# --- BACKEND ---
echo "🔧 Installation backend..."
cd backend || exit
BACKEND_PATH=$(pwd)

if [ ! -d ".venv" ]; then
  python3 -m venv .venv
fi

source .venv/bin/activate
pip install --upgrade pip > /dev/null
pip install -r requirements.txt > /dev/null
python manage.py migrate

# Lancer Django
if [[ "$OS" == "Linux" ]]; then
  gnome-terminal -- bash -c "cd $BACKEND_PATH && source .venv/bin/activate && python manage.py runserver; exec bash"
elif [[ "$OS" == "Darwin" ]]; then
  osascript -e 'tell app "Terminal" to do script "cd '"$BACKEND_PATH"' && source .venv/bin/activate && python manage.py runserver"'
elif $IS_WINDOWS; then
  cmd.exe /C "start cmd /k cd backend && .venv\\Scripts\\activate && python manage.py runserver"
fi

cd ..

# --- FRONTEND ---
echo "💻 Installation frontend..."
cd frontend || exit
FRONTEND_PATH=$(pwd)
npm install --legacy-peer-deps > /dev/null

# Lancer Angular
if [[ "$OS" == "Linux" ]]; then
  gnome-terminal -- bash -c "cd $FRONTEND_PATH && npm run start; exec bash"
elif [[ "$OS" == "Darwin" ]]; then
  osascript -e 'tell app "Terminal" to do script \"cd '"$FRONTEND_PATH"' && npm run start\"'
elif $IS_WINDOWS; then
  cmd.exe /C "start cmd /k cd frontend && npm run start"
fi

# Ouvrir navigateur
echo "🌐 Attente du démarrage complet (5s)..."
sleep 5

echo "🌐 Ouverture de l'app dans le navigateur..."
if [[ "$OS" == "Linux" ]]; then
  xdg-open http://localhost:4200 > /dev/null 2>&1
elif [[ "$OS" == "Darwin" ]]; then
  open http://localhost:4200
elif $IS_WINDOWS; then
  cmd.exe /C "start http://localhost:4200"
fi

echo ""
echo "✅ Tout est prêt !"
echo "  - Backend : http://localhost:8000/api/"
echo "  - Frontend : http://localhost:4200"
