# 🔐 AuthSystem — Secure Authentication Backend

Production-grade authentication backend implementing **JWT lifecycle**, **refresh tokens**, **email verification**, and **secure cookie-based sessions**.
Designed with real-world security practices and clean backend architecture.

---

## 📋 Overview

AuthSystem is a complete authentication solution that demonstrates how modern backend systems handle **user identity, session security, and token management** in production environments.

This project focuses purely on **authentication & authorization**, keeping the scope clean and interview-friendly.

---

## ✨ Features

* **User Registration** — Email verification with expiring tokens
* **Login System** — JWT-based authentication
* **Token Management**

  * Access Token (15 minutes)
  * Refresh Token (7 days)
* **Secure Cookies** — HTTP-only cookies to prevent XSS
* **Password Hashing** — bcrypt with salt rounds
* **Email Verification** — Nodemailer integration
* **Request Validation** — Zod schema validation
* **Centralized Error Handling** — Consistent API responses
* **Scalable Architecture** — Modular & clean folder structure

---

## 🛠️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB, Mongoose
* **Security:** JWT, bcrypt, Zod
* **Email Service:** Nodemailer
* **Language:** JavaScript (ES Modules)

---

## 📦 Installation

```bash
npm install
cp .env.example .env
```

---

## ⚙️ Environment Variables (`.env`)

```env
PORT=3000
MONGO_URL=mongodb://localhost:27017/authsystem

JWT_SECRET=your_secret_key_min_32_chars
JWT_REFRESH_SECRET=your_refresh_secret_min_32_chars

NODEMAILER_EMAIL=your_email@gmail.com
NODEMAILER_PASS=your_app_password

BASE_URL=http://localhost:3000
```

---

## 🚀 Running the Project

```bash
npm run dev     # Development mode
npm start       # Production mode
```

Server runs on:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 📑 API Documentation

Swagger UI available at:
👉 **[http://localhost:3000/api-docs](http://localhost:3000/api-docs)**

---

## 📡 API Endpoints

### Authentication Routes

#### ➤ Register User

`POST /api/auth/signup`

```json
{
  "email": "user@example.com",
  "password": "securepass123",
  "name": "John Doe"
}
```

---

#### ➤ Verify Email

`POST /api/auth/verify-email`

```json
{
  "email": "user@example.com",
  "token": "verification_token_from_email"
}
```

---

#### ➤ Login

`POST /api/auth/login`

```json
{
  "email": "user@example.com",
  "password": "securepass123"
}
```

---

#### ➤ Refresh Token

`POST /api/auth/refresh-token`

```json
{
  "refreshToken": "token_from_cookie"
}
```

---

#### ➤ Get Current User

`GET /api/auth/me`
**Header:** `Authorization: Bearer <access_token>`

---

#### ➤ Logout

`POST /api/auth/logout`
Clears authentication cookies.

---

## 🔒 Security Highlights

* ✅ Password hashing with bcrypt
* ✅ Short-lived access tokens
* ✅ Refresh token rotation ready
* ✅ HTTP-only secure cookies
* ✅ Email verification protection
* ✅ Zod-based request validation
* ✅ Rate-limiting ready

---

## 📁 Project Structure

```
public/temp/
├── controllers/      # Route handlers
├── db/               # Database  Connection
├── models/           # Database schemas
├── middleware/       # Auth & validation
├── routes/           # API endpoints
├── utils/            # Helper functions
├── validations/      # zod validations

src/
├── docs/             # Swagger / OpenAPI specs
├── app               # app configuration
└── index.js          # Server entry

```

---

## 💡 Interview Talking Points

* **JWT Flow:** signup → email verification → login → token refresh
* **Why refresh tokens?** Reduced secret exposure & easier revocation
* **Why HTTP-only cookies?** Prevent XSS token theft
* **Token expiry handling:** Short-lived access tokens + refresh cycle
* **Validation:** Zod ensures API safety at the boundary

---

## 🔗 Related Links

* 🔹 **Portfolio Index:** [https://github.com/AnakinCodeWalker/Projects](https://github.com/AnakinCodeWalker/Projects)
* 🔹 **VideoVerse Backend:** Media uploads & Cloudinary integration
* 🔹 **PeerMeet:** Real-time WebRTC video platform

---

## 📜 License

MIT License

---

**Built with production mindset**
*Ready for technical interviews & real-world use* 🚀
