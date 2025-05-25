# 📚 Ma Biblio Galactique — Projet B3 Développement Web

Bienvenue dans votre bibliothèque de l’espace 🌌 !  
Ce projet est une **application web complète** permettant à un utilisateur de gérer ses livres : ajout, modification, suppression, recherche, et profil utilisateur.  

> Développée en **Angular** pour le frontend et **Django + DRF** pour le backend avec un thème galactique et une UI réactive.

---

## 🔧 Stack technique

- 🔙 **Backend** : Django 5 + Django REST Framework
- 🔐 Authentification : JWT (`rest_framework_simplejwt`)
- 🎨 **Frontend** : Angular 16+ (standalone components, SCSS)
- 🛠️ UI : Bootstrap, ngx-toastr, ng-bootstrap
- 🌌 Thème : Dark mode + ambiance galaxie (animations SCSS)

---

## 📁 Arborescence du projet

Projet-B3-DevWeb/

├── backend/ # Projet Django (API)

├── frontend/ # Projet Angular (SPA)

├── setup.sh # Script Linux/macOS/WSL

├── setup.bat # Script Windows

├── README.md

---

### 💾 Base de données

Ce projet utilise **SQLite** (base par défaut Django), il n’y a **aucune configuration à faire**.

---

Clone le repo ou télécharger le zip (puis l'extraire) sur votre espace de travail local. Une fois le dossier récupérer, allez dans le dossier. 
Deux scripts se trouvent en fonction de votre OS. 
Choisissez le script qui vous correspond et suivez les indications ci-dessous.

## ▶️ LANCEMENT AUTOMATIQUE

### 🔹 Sous **Windows**

✔️ **Double-cliquez sur `setup.bat`**  
Cela :
- Crée l’environnement virtuel Python
- Installe Django + Angular
- Lance les deux serveurs
- Ouvre automatiquement le navigateur

> [Warning]
> Don't execute the code without commenting the test cases.

---

### 🔸 Sous **Linux/macOS/WSL**

```bash
   chmod +x setup.sh
   ./setup.sh
```

## ▶️ LANCEMENT MANUEL


### Pour le Backend
- cd backend
- python3 -m venv .venv
- source .venv/bin/activate
- pip install -r requirements.txt
- python manage.py migrate
- python manage.py runserver

### Pour le Frontend
- cd frontend
- npm install
- npm run start