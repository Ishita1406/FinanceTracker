# 💸 MERN Expense Tracker App

A full-stack financial management application with secure authentication, real-time analytics, and data export capabilities. Built with the MERN stack and Dockerized for seamless deployment.

---

## ✨ Key Features

### 🔐 Authentication
- JWT-based login/signup with encrypted passwords
- Profile personalization with Cloudinary image uploads
- Persistent session management

### 📈 Financial Tracking
- **Income/Expense Recording**: Add transactions with emoji icons
- **Real-time Updates**: Instant balance recalculation
- **Smart Categorization**: Organized transaction grouping

### 📊 Data Visualization
- Interactive charts (Bar, Line, Pie) via Recharts
- 30/60-day trend analysis
- Expense breakdown by category

### 🔄 Data Management
- Export transactions as Excel files (via ExcelJS)
- Delete individual or bulk entries
- Fully responsive across devices

---

## 🛠 Tech Stack

| Layer        | Technology                          |
|--------------|-------------------------------------|
| **Frontend** | React 18 + Vite + JavaScript        |
| **Styling**  | Tailwind CSS                        |
| **Charts**   | Recharts                            |
| **Backend**  | Node.js + Express.js                |
| **Database** | MongoDB Atlas                       |
| **Auth**     | JWT + Bcrypt.js                     |
| **Storage**  | Cloudinary (Profile Images)         |
| **Export**   | ExcelJS                             |
| **Deployment** | Docker + Render                   |

---

## 🚀 Quick Start

### ⚙️ Prerequisites
- Node.js ≥ 16.x
- Docker (optional, for containerized setup)
- MongoDB Atlas account
- Cloudinary account (for image uploads)

---

### 📁 Environment Setup

Create a `.env` file in root directory with the following:

```env
MONGO_URL=your-mongodb-connection-string
PORT=8080
JWT_SECRET=your-secret-key
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

## 🧪 Local Development

### 🐳 Docker Setup

This project includes pre-configured `Dockerfile`s for both frontend and backend, along with a `docker-compose.yml` file.

To spin up the app using Docker:

```bash
docker-compose up --build
```
- **Frontend** → [http://localhost:3000](http://localhost:3000)  
- **Backend API** → [http://localhost:8080](http://localhost:8080)

---

### ⚙️ Manual Setup (Without Docker)

```bash
# Backend Setup
npm install
npm run dev
```

```bash
# Frontend Setup(In a new terminal)
cd frontend
npm install
npm run dev
```


## 📱 Mobile Ready

The app is fully responsive:

- Sidebar auto-collapses  
- Charts are interactive on touch devices  
- All features work seamlessly on phones and tablets




