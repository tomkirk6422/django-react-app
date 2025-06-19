# Novel Finder (Product Finder)

A full-stack web application built with Django REST Framework and React that allows users to search and filter products/books by categories, tags, and descriptions.

## 🛠️ Tech Stack

**Backend:**

- Django 5.2.3
- Django REST Framework
- Django CORS Headers
- Django Filters
- SQLite Database

**Frontend:**

- React 18
- Vite
- Styled Components
- Axios

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.8+** ([Download Python](https://python.org/downloads/))
- **Node.js 16+** ([Download Node.js](https://nodejs.org/))
- **Git** ([Download Git](https://git-scm.com/downloads))

Backend Setup (Django)

#### Navigate to backend directory

```bash
cd backend
```

#### Create and activate virtual environment

```bash
# Windows (Command Prompt)
python -m venv venv
venv\Scripts\activate

# Windows (PowerShell)
python -m venv venv
venv\Scripts\Activate.ps1

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

#### Install Python dependencies

```bash
pip install -r requirements.txt
```

#### Start the Django development server

```bash
# If virtual environment activation works properly
python manage.py runserver

# If you have ModuleNotFoundError error, try deleting venv contents and reinstalling packages with
venv\Scripts\python.exe -m pip install --no-cache-dir -r requirements.txt
```

The Django backend will be running at `http://localhost:8000`

Frontend Setup (React)

#### Open a new terminal and navigate to frontend directory

```bash
cd frontend
```

#### Install Node.js dependencies

```bash
npm install
```

#### Start the React development server

```bash
npm run dev
```

The React frontend will be running at `http://localhost:5173`
