# 🎥 VideoVerse — Media Platform Backend

Production-ready backend for a video/media platform featuring **secure authentication**, **user profiles**, and **cloud-based media uploads**.
Built with scalability, security, and clean backend architecture in mind.

---

## 📋 Overview

VideoVerse is a backend system designed for media-centric applications where users can authenticate, manage profiles, and upload images/videos securely.

The project demonstrates **real-world file upload pipelines**, **Cloudinary integration**, and **JWT-protected APIs**.

---

## ✨ Features

* **User Authentication** — JWT-based login & protected routes
* **User Profiles** — Avatar & cover image management
* **File Upload Pipeline**

  * Multer for multipart handling
  * File type & size validation
* **Cloud Storage** — Cloudinary integration
* **Media Management** — Image & video uploads
* **Security** — bcrypt password hashing, JWT auth
* **Clean Architecture** — Modular & scalable structure

---

## 🛠️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB, Mongoose
* **File Upload:** Multer
* **Cloud Storage:** Cloudinary
* **Security:** JWT, bcrypt
* **Language:** JavaScript (ES Modules)

---

## 📦 Installation

```bash
npm install
cp .env.sample .env
```

---

## ⚙️ Environment Variables (`.env`)

```env
PORT=3000
MONGO_URL=mongodb://localhost:27017/videoverse

JWT_SECRET=your_secret_key_min_32_chars

CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

MAX_FILE_SIZE=52428800   # 50MB
```

---

## 🚀 Running the Project

```bash
npm run dev     # Development mode
```

Server runs on:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 📑 API Documentation

Swagger UI available at:
👉 **[http://localhost:3000/api-docs](http://localhost:3000/api-docs)**

---

## 📡 API Endpoints

### Authentication

* `POST /api/v1/users/signup` — Register user
* `POST /api/v1/users/login` — User login
* `POST /api/v1/users/logout` — Logout user

---

### User Profile

* `GET /api/v1/users/:id` — Get user profile
* `PUT /api/v1/users/update` — Update profile
* `POST /api/v1/users/avatar` — Upload avatar
* `POST /api/v1/users/cover` — Upload cover image

---

### Media

* `GET /api/v1/media` — Get all media
* `POST /api/v1/media/upload` — Upload video/image
* `DELETE /api/v1/media/:id` — Delete media

---

## 🎯 Media Upload Flow

```
Client selects file
    ↓
Multer middleware
    ↓
Type & size validation
    ↓
Upload to Cloudinary
    ↓
Store media URL in MongoDB
    ↓
Delete local temp file
    ↓
Send response to client
```

---

## 🔒 Security Highlights

* ✅ JWT-protected routes
* ✅ Password hashing with bcrypt
* ✅ File type & size validation
* ✅ Secure Cloudinary credentials
* ✅ Temporary file cleanup on failure

---

## 📁 Project Structure

```
public/temp/
├── controllers/      # Request handlers
├── db/               # Database connection
├── middlewares/      # Auth & upload middleware
├── models/           # Mongoose schemas
├── routes/           # API routes
├── utils/            # Cloudinary helpers
└── temp/             # Temporary uploads

src/
├── docs/             # Swagger / OpenAPI specs
├── app.js            # Express app setup
└── index.js          # Server entry
```

---

## 💡 Interview Talking Points

* **Why Cloudinary?** CDN-backed storage, no server disk usage
* **How uploads are secured?** Multer validation + auth middleware
* **Error handling in uploads?** Cleanup on failure to prevent leaks
* **Scalability approach:** Stateless backend, external media storage

---

## 🔗 Related Repositories

* 🔐 **AuthSystem:** Secure authentication backend
* 🚧 **PeerMeet:** Real-time WebRTC video platform
* 📦 **Portfolio Index:** [https://github.com/AnakinCodeWalker/Projects](https://github.com/AnakinCodeWalker/Projects)

---

## 📜 License

MIT License

---

**Built with scalability & security in mind**
*Production-ready backend for media platforms* 🚀
