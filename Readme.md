# Personal Portfolio Website

## 1. Introduction

A full-stack personal portfolio website for **Aravind Sarnala**.

It displays personal information, skills, education, social profiles, resume, and provides a Contact Me form connected to a MySQL database.

---

## 2. Technologies Used

### Frontend

- HTML5
- CSS3
- JavaScript

### Backend

- Node.js
- Express.js
- REST API

### Database

- MySQL Server
- MySQL Workbench
- mysql2

### Configuration

- dotenv
- CORS

---

## 3. Project Structure

```text
TASK
│
├── assets
│
├── Backend
│   ├── .env
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── Frontend
│   ├── html
│   │   ├── about.html
│   │   ├── contact.html
│   │   ├── education.html
│   │   └── skill.html
│   │
│   ├── js
│   │   └── contact.js
│   │
│   ├── portfolio.css
│   └── portfolio.html
│
└── README.md
```

---

## 4. Frontend and Backend Run Commands

## Backend

Open the terminal in the **backend project folder**:

```bash
cd backend
```

Install the required dependencies:

```bash
npm install
```

Start the backend server:

```bash
node server.js
```

The backend server will run on:

```text
http://localhost:5000
```

---

## Frontend

Open the `portfolio.html` file in your browser.

Or, if you are using **VS Code Live Server**, right-click:

```text
portfolio.html
```

and select:

```text
Open with Live Server
```

The frontend will open in the browser.

---

## 5. Complete Execution Flow

```text
MySQL Server
     ↓
MySQL Workbench
     ↓
Backend Terminal
     ↓
npm install
     ↓
node server.js
     ↓
Backend → Port 5000
     ↓
Open portfolio.html
     ↓
Frontend
     ↓
Contact Form
     ↓
POST Request
     ↓
Express Backend
     ↓
MySQL Database
```
