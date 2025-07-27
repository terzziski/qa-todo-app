# QA Todo App

A simple full-stack Todo application for showcasing automated testing skills.

## Features

- React frontend with login and todo list management
- Node.js/Express backend with basic authentication and in-memory storage
- API test automation with Jest + Supertest
- UI test automation with Cypress

---

## ⚙️ Setup Instructions (2 min max)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/qa-todo-app.git
cd qa-todo-app
```

### 2. Install Dependencies

#### Backend (server)
```bash
cd server
npm install
```

#### Frontend (client)
```bash
cd ../client
npm install
```

---

## 🚀 Run the App

### 1. Start the backend

```bash
cd ../server
npm start
```

The server runs on [http://localhost:4000](http://localhost:4000)

### 2. Start the frontend

Open a new terminal:

```bash
cd client
npm start
```

The app runs on [http://localhost:3000](http://localhost:3000)

---

## 🧪 Run Automated Tests

### API Tests (Jest + Supertest)

```bash
cd server
npm test
```

### UI Tests (Cypress)

```bash
cd client
npx cypress open
```

Or headless:

```bash
npx cypress run
```

---

## 👤 Default Login

- **Username:** `admin`
- **Password:** `admin`