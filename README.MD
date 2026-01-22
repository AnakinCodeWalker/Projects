# 🚀 Full-Stack & Real-Time Projects Repository

<p align="center">
  <img src="https://img.shields.io/badge/Learning-Continuous-brightgreen?style=for-the-badge" alt="Learning"/>
  <img src="https://img.shields.io/badge/Status-Active-blue?style=for-the-badge" alt="Status"/>
  <img src="https://img.shields.io/badge/Focus-Full--Stack-orange?style=for-the-badge" alt="Focus"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/WebRTC-P2P-333333?style=for-the-badge&logo=webrtc&logoColor=white" alt="WebRTC" />
</p>

---

A curated collection of **production-oriented, full-stack projects** demonstrating secure authentication, media handling, real-time systems, and scalable backend architecture.

---

## 👨‍💻 About / Contact

**Prince Kumar** — `@AnakinCodeWalker`

- ✉️ Email: **[parag31ja@gmail.com](mailto:parag31ja@gmail.com)**
- 🔗 LinkedIn: **[https://www.linkedin.com/in/princekumar3111](https://www.linkedin.com/in/princekumar3111)**
- 💻 GitHub: **[https://github.com/AnakinCodeWalker](https://github.com/AnakinCodeWalker)**

I build backend-first, production-style features: JWT lifecycle, secure cookies, media upload flows, WebRTC signaling, and real-time systems. Always happy to discuss architecture and security patterns.

---

## 🧠 What This Repository Demonstrates

- ✅ Strong **backend fundamentals** (Node.js, Express, MongoDB, PostgreSQL)
- ✅ Secure **authentication & authorization** systems
- ✅ **JWT + Refresh Token** lifecycle management
- ✅ Email verification with token expiry flows
- ✅ **Real-time communication** using WebRTC (P2P) & Socket.IO
- ✅ **TypeScript-first development** with proper typing
- ✅ Media handling: **Multer → Cloudinary** integration
- ✅ Clean architecture: controllers, middleware, models, utils
- ✅ Hands-on experience with **production patterns** (not toy apps)

---

## 🛠️ Tech Stack

### Frontend Stack
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

### Backend Stack
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white)

### Real-Time & Media
![WebRTC](https://img.shields.io/badge/WebRTC-333333?style=flat&logo=webrtc&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-000000?style=flat&logo=socket.io&logoColor=white)
![Multer](https://img.shields.io/badge/Multer-File%20Upload-green?style=flat)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Media%20Storage-blue?style=flat)

### Security & Validation
![JWT](https://img.shields.io/badge/JWT-Auth-orange?style=flat)
![Zod](https://img.shields.io/badge/Zod-Validation-blueviolet?style=flat)
![bcrypt](https://img.shields.io/badge/bcrypt-Hashing-red?style=flat)

---

## 📂 Projects (Ordered by Completion)

> **Note:** Projects are intentionally ordered—completed, deployable work first, followed by ongoing projects.

---

### 1️⃣ 🔐 **AuthSystem** — Secure Authentication Backend ✅ COMPLETE

**Location:** `Projects/AuthSystem`

**Tech Stack:**
- Node.js, Express.js, MongoDB, Mongoose
- JWT (access + refresh tokens)
- Zod validation
- bcrypt password hashing
- Nodemailer email service
- HTTP-only secure cookies

**Key Features:**
- User registration with email verification
- Login with JWT-based session management
- Access & Refresh token strategy
- Token expiry and renewal flows
- Centralized error handling
- Request validation middleware
- Production-ready folder structure

**What You'll Learn:**
- Complete auth lifecycle (signup → email verify → login → token refresh → logout)
- JWT best practices
- Secure cookie management
- Password hashing strategies
- Email service integration

**To Run:**
```bash
cd Projects/AuthSystem
npm install
cp .env.example .env
# Add: MONGO_URL, JWT_SECRET, JWT_REFRESH_SECRET, NODEMAILER_PASS, BASE_URL
npm run dev
```

**API Endpoints Example:**
- `POST /api/auth/signup` - Register user
- `POST /api/auth/login` - Login user
- `POST /api/auth/verify-email` - Verify email token
- `POST /api/auth/refresh-token` - Refresh access token
- `GET /api/auth/me` - Get current user (protected)

---

### 2️⃣ 🧠 **Brainly-App** — React + TypeScript Q&A Platform ✅ COMPLETE

**Location:** `Projects/typeScript-Project/Brainly-App`

**Tech Stack:**
- React 18+ with TypeScript
- REST API integration
- Component-based architecture
- State management

**Key Features:**
- Type-safe React components
- Clean folder structure
- Reusable component library
- Form handling with validation
- Error boundaries
- Responsive UI design

**What You'll Learn:**
- TypeScript best practices in React
- Component composition patterns
- API integration patterns
- State management strategies

**To Run:**
```bash
cd Projects/typeScript-Project/Brainly-App
npm install
npm start
```

---

### 3️⃣ 🎥 **VideoVerse** — Media Platform Backend ✅ COMPLETE

**Location:** `Projects/VideoVerse_Backend`

**Tech Stack:**
- Node.js, Express.js, MongoDB
- Multer (file upload)
- Cloudinary (media storage)
- JWT authentication
- Mongoose ODM

**Key Features:**
- Secure user authentication
- User profile management
- Avatar and cover image upload
- Media file handling (Multer)
- Cloud storage integration (Cloudinary)
- Cleanup mechanisms for failed uploads
- Scalable folder structure

**What You'll Learn:**
- File upload handling best practices
- Multer middleware configuration
- Cloudinary integration workflow
- User profile management
- Media optimization strategies

**To Run:**
```bash
cd Projects/VideoVerse_Backend
npm install
cp .env.example .env
# Add: MONGO_URL, JWT_SECRET, CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
npm run dev
```

**API Features:**
- User registration & authentication
- Profile creation and updates
- Image uploads (avatar, cover)
- Media file management

---

### 4️⃣ 🚧 **PeerMeet** — Real-Time Video Meeting Platform 🔄 ONGOING

**Location:** `Projects/PeerMeet`

**Tech Stack:**
- Frontend: React, TypeScript
- Backend: Node.js, Express.js, MongoDB
- Real-Time: WebRTC (P2P), Socket.IO (signaling)
- Authentication: JWT

**Current Status:**
- ✅ Backend architecture completed
- ✅ Authentication & authorization implemented
- ✅ Room creation & management logic
- ✅ WebRTC signaling server setup
- 🔄 Frontend UI under active development
- 🔄 P2P media stream integration

**Implemented Features:**
- Secure user authentication
- Room-based architecture
- Participant management
- WebRTC signaling protocol
- Ice candidate exchange
- SDP offer/answer handling

**Planned Features:**
- Screen sharing
- Audio/video controls
- Chat messaging
- Recording capabilities
- Room permissions

**What You'll Learn:**
- WebRTC internals (ICE candidates, STUN/TURN)
- Peer-to-peer communication patterns
- Socket.IO signaling implementation
- Real-time session management
- NAT traversal concepts

**To Run:**
```bash
cd Projects/PeerMeet/backend
npm install
cp .env.example .env
# Add: MONGO_URL, JWT_SECRET, SOCKET_SECRET
npm run dev

# In another terminal
cd Projects/PeerMeet/frontend
npm install
npm start
```

---

## 🚀 Quick Start (General Pattern)

Each project follows a similar setup pattern:

```bash
# Clone the repository
git clone https://github.com/AnakinCodeWalker/Projects.git
cd Projects

# Navigate to specific project
cd <project-folder>

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with your credentials

# Run development server
npm run dev
```

---

## 📋 Environment Variables Template

### AuthSystem (.env.example)
```env
MONGO_URL=mongodb://localhost:27017/authsystem
JWT_SECRET=your_jwt_secret_key
JWT_REFRESH_SECRET=your_refresh_token_secret
NODEMAILER_EMAIL=your_email@gmail.com
NODEMAILER_PASS=your_app_password
BASE_URL=http://localhost:5000
PORT=5000
```

### VideoVerse (.env.example)
```env
MONGO_URL=mongodb://localhost:27017/videoverse
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
BASE_URL=http://localhost:5000
PORT=5000
```

### PeerMeet (.env.example)
```env
MONGO_URL=mongodb://localhost:27017/peermeet
JWT_SECRET=your_jwt_secret_key
SOCKET_SECRET=your_socket_secret
BASE_URL=http://localhost:5000
FRONTEND_URL=http://localhost:3000
PORT=5000
```
---

## 🔑 Key Concepts Demonstrated

### Authentication & Security
- JWT implementation (access + refresh tokens)
- Secure password hashing with bcrypt
- HTTP-only cookie storage
- Email verification workflows
- Token expiry and renewal mechanisms
- Authorization middleware

### Database Design
- MongoDB schemas with Mongoose
- Relationships and references
- Data validation
- Indexing strategies
- Clean data models

### Media Handling
- Multer file upload configuration
- Cloudinary integration
- File type validation
- Error handling and cleanup
- Temporary file management

### Real-Time Systems
- WebRTC peer connections
- Socket.IO signaling
- ICE candidate handling
- SDP offer/answer exchange
- Room management
- Participant tracking

### Backend Architecture
- MVC pattern
- Middleware chain
- Error handling
- Request validation
- Separation of concerns
- Scalable folder structure

---

## 🌱 Currently Learning

- Advanced TypeScript patterns
- Backend scalability & system design
- WebRTC internals and optimization
- Microservices architecture
- Docker & containerization
- Open-source collaboration (recently selected)

---

## 📚 Resources & Documentation

- [JWT Best Practices](https://tools.ietf.org/html/rfc7519)
- [WebRTC Documentation](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API)
- [MongoDB Guide](https://docs.mongodb.com/)
- [Express.js Docs](https://expressjs.com/)
- [Cloudinary API](https://cloudinary.com/documentation)

---

## 🤝 Open to Opportunities

I'm actively looking for:

- **Internships** (backend, full-stack)
- **Entry-level roles** in tech companies
- **Open-source contributions** and collaboration
- **Freelance projects** (backend, API development)
- **Technical mentorship** and feedback

Feel free to reach out:

- 📧 Email: [parag31ja@gmail.com](mailto:parag31ja@gmail.com)
- 🔗 LinkedIn: [https://www.linkedin.com/in/princekumar3111](https://www.linkedin.com/in/princekumar3111)
- 💬 GitHub: [@AnakinCodeWalker](https://github.com/AnakinCodeWalker)

---

## 📝 License

This repository is open source and available under the MIT License. See `LICENSE` file for details.

---

## ⭐ Show Your Support

If you find this repository useful or interesting, please consider:

- ⭐ Giving it a star on GitHub
- 🔄 Sharing it with others
- 💬 Providing feedback
- 🐛 Reporting issues
- 🚀 Contributing improvements

---

<p align="center">
  <strong>Made with ❤️ by Prince Kumar</strong><br/>
  Building production-ready systems, one line of code at a time.
</p>
