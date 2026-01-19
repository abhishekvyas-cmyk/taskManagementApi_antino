# 📌 Task Management API

A complete **Node.js + Express + MongoDB** backend implementing **Authentication**, **Authorization**, **Task CRUD**, **Admin controls**, and **Security best practices**.

---

## 🚀 Tech Stack

* **Node.js**
* **Express.js**
* **MongoDB + Mongoose**
* **JWT Authentication (Access + Refresh Token)**
* **bcrypt password hashing**
* **Rate Limiting**
* **Feature-based folder structure**

---

# 📁 Folder Structure (Feature Based)

```
src/
 ├── api/
 │    └── v1/
 │         ├── auth/
 │         ├── user/
 │         └── tasks/
 ├── middleware/
 ├── utils/
 ├── config/
 └── app.js
```

---

# 🔐 Authentication Features

### ✔ **User Registration**

* Fields: `name`, `email`, `password`, `role` (default: `"user"`)
* Validations:

  * Unique email
  * Password minimum **8 chars** (uppercase + lowercase + number)
* Password hashed using **bcrypt**

### ✔ **User Login**

* Fields: `email`, `password`
* Generates:

  * **Access Token:** 15 min
  * **Refresh Token:** 7 days
* Returns: token + user info

### ✔ **Get Current User Profile**

* Authentication required
* Returns logged-in user details (no password)

### ✔ **User Logout**

* Authentication required
* Invalidates refresh token (server side)

### ✔ **Refresh Token System**

**POST `/api/v1/auth/refresh`**

* Returns new access token
* Refresh token valid for **7 days**

---

# 📝 Task Management Features

### ✔ **Create Task**

**POST `/api/v1/tasks`**

* Authentication required
* Fields:

  * `title`, `description`, `status`, `priority`, `dueDate`
* `createdBy` is automatically set from logged-in user

### ✔ **Get All Tasks**

**GET `/api/v1/tasks`**

* Users → can view **only their tasks**
* Admin → can view **all tasks**
* Supports filters:

  * `?status=pending&priority=high&search=keyword`

### ✔ **Get Single Task**

**GET `/api/v1/tasks/:id`**

* Allowed if requester is:

  * Task creator
  * Task assignee
  * Admin

### ✔ **Update Task**

**PUT `/api/v1/tasks/:id`**

* **Creator/Admin** → update everything
* **Assignee** → update **status only**

### ✔ **Delete Task**

**DELETE `/api/v1/tasks/:id`**

* Only **creator** or **admin** can delete

### ✔ **Task Statistics**

**GET `/api/v1/tasks/stats/all`**
Returns:

* total tasks
* completed tasks
* pending tasks
* tasks grouped by priority
  Admins → overall stats
  Users → only their stats

---

# 👨‍💼 Admin Features

### ✔ **Get All Users**

**GET `/api/v1/user`**

* Admin only
* Password excluded

### ✔ **Update User Role**

**PUT `/api/v1/user/:id/role`**

* Admin only
* Allowed roles: `"user"` or `"admin"`

### ✔ **Delete User**

**DELETE `/api/v1/user/:id`**

* Admin only

---

# 🛡 Middleware Features

### 🔹 **Authentication Middleware**

* Extracts JWT from headers
* Verifies access token
* Attaches user to `req.user`
* Returns **401** for invalid/expired token

### 🔹 **Authorization Middleware**

* Checks roles: user/admin
* 403 for insufficient permissions

### 🔹 **Rate Limiting**

* 100 requests / 15 minutes per IP
* Prevents API abuse & brute force attacks

---

# 🔒 Security Features

* Password hashing with **bcrypt**
* Access + Refresh Token signing with **JWT**
* Validation on all endpoints
* No password exposed in responses
* Environment variables via `.env`
* CORS enabled
* Proper HTTP status codes:

  * `200, 201, 400, 401, 403, 404, 500`
* Central error handling system

---

# 🚀 Installation & Setup

## 1️⃣ Clone project

```sh
git clone <repo-url>
cd task-management-api
```

## 2️⃣ Install dependencies

```sh
npm install
```

## 3️⃣ Create `.env`

```
PORT=3000
MONGO_URI=<your_local_or_atlas_url>
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
```

## 4️⃣ Run server

```sh
npm run dev
```

---

# 🧪 Test APIs (Postman)

All APIs fully tested with:

* Register
* Login
* Refresh Token
* CRUD Tasks
* Stats
* Admin User Management