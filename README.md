# 💰 Finance Dashboard System (Role-Based Access Control)

A full-stack finance dashboard application with **JWT authentication**, **role-based access control (RBAC)**, and **filterable financial analytics**.

This system allows users to manage and analyze financial records based on their assigned roles: **Admin, Analyst, and Viewer**.

---

## 🚀 Features

### 🔐 Authentication

* User Registration
* User Login
* JWT-based authentication
* Secure password hashing using bcrypt

---

### 👥 Role-Based Access Control

| Role    | Permissions                                        |
| ------- | -------------------------------------------------- |
| Admin   | Full access (Create, Read, Update, Delete records) |
| Analyst | View records + access analytics + filtering        |
| Viewer  | Read-only access                                   |

---

### 💰 Financial Records Management

* Add transactions (income/expense)
* Edit existing records
* Delete records
* View all transactions

---

### 🔍 Filtering & Search (NEW 🔥)

* Filter by **type** (income / expense)
* Search by **category**
* Date range filtering (backend supported)

Example:

```bash
GET /api/records?type=income
GET /api/records?category=food
GET /api/records?startDate=2026-04-01&endDate=2026-04-30
```

---

### 📊 Dashboard Analytics

* Total Income
* Total Expenses
* Net Balance
* Category-wise breakdown
* Total transactions (Analyst only)
* Search/filter insights (Analyst only)

---

## 🧠 System Design

* **Frontend:** React (Vite)
* **Backend:** Node.js, Express
* **Database:** MongoDB (Mongoose)
* **Authentication:** JWT
* **Architecture:** REST API + Middleware-based design

---

## 🔐 Access Control Logic

* Implemented using custom authentication middleware
* JWT token verifies user identity
* Role-based authorization restricts actions

Example:

* Admin → Full CRUD access
* Analyst → Read + analytics
* Viewer → Read-only

---

## ✅ Validation & Error Handling

* Input validation implemented using **middleware**
* Proper error messages for invalid input
* HTTP status codes used correctly (400, 404, 500)
* Duplicate email handling
* Safe error responses

---

## 📂 Project Structure

```bash
finance-app/
│
├── finance-backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── validation.js
│   ├── app.js
│
├── finance-frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── api/
│
└── README.md
```

---

## 📦 Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/finance-app.git
cd finance-app
```

---

### 2️⃣ Backend Setup

```bash
cd finance-backend
npm install
npm run dev
```

Create `.env` file:

```env
MONGO_URI=your_mongodb_connection
PORT=5000
JWT_SECRET=your_secret_key
```

---

### 3️⃣ Frontend Setup

```bash
cd ../finance-frontend
npm install
npm run dev
```

---

## 🔗 API Endpoints

### 🔐 Auth

* POST `/api/auth/login`

### 👤 Users

* POST `/api/users` → Register user
* GET `/api/users` → Get all users

### 📊 Records

* GET `/api/records` → Get records (with filters)
* POST `/api/records` → Create record (Admin only)
* PUT `/api/records/:id` → Update record (Admin only)
* DELETE `/api/records/:id` → Delete record (Admin only)

### 📈 Summary

* GET `/api/summary` → Dashboard data

---

## 💡 Key Highlights

* JWT-based secure authentication
* Full Role-Based Access Control (RBAC)
* Middleware-based validation system
* Filterable and searchable data
* Clean UI with role-based UX
* Separation of concerns (routes, controllers, middleware)

---

## 🏆 Conclusion

This project demonstrates:

* Real-world backend system design
* Secure authentication & authorization
* Scalable architecture
* Clean frontend-backend integration
* Thoughtful user experience design

---

## 👩‍💻 Author

**Udayasri Pagilla**
udayasripagilla1873@gmail.com