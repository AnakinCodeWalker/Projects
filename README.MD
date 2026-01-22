# 🚀 Full-Stack & Real-Time Projects Repository

<p align="center">
  <img src="https://img.shields.io/badge/Learning-Continuous-brightgreen?style=for-the-badge" alt="Learning"/>
  <img src="https://img.shields.io/badge/Status-Active-blue?style=for-the-badge" alt="Status"/>
  <img src="https://img.shields.io/badge/Focus-Production--Ready-orange?style=for-the-badge" alt="Focus"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/WebRTC-P2P-333333?style=for-the-badge&logo=webrtc&logoColor=white" alt="WebRTC" />
</p>

---

A curated collection of **enterprise-grade, full-stack projects** demonstrating secure authentication, media handling, real-time systems, and scalable backend architecture. Built with production standards, clean code principles, and industry best practices.

---

## 👨‍💻 Developer Profile

**Prince Kumar** — Full Stack Developer | Backend Specialist

- ✉️ Email: **[parag31ja@gmail.com](mailto:parag31ja@gmail.com)**
- 🔗 LinkedIn: **[https://www.linkedin.com/in/princekumar3111](https://www.linkedin.com/in/princekumar3111)**
- 💻 GitHub: **[https://github.com/AnakinCodeWalker](https://github.com/AnakinCodeWalker)**

**Specialization:** Backend architecture, authentication systems, real-time communication, and scalable microservices.


---

## 🛠️ Technology Stack 

### Backend (Node.js Ecosystem)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Auth-orange?style=flat)

### Frontend (React Ecosystem)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)

### Real-Time & Infrastructure
![WebRTC](https://img.shields.io/badge/WebRTC-P2P-333333?style=flat&logo=webrtc&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-Signaling-black?style=flat&logo=socket.io&logoColor=white)
![Multer](https://img.shields.io/badge/Multer-File%20Upload-green?style=flat)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Cloud%20Storage-blue?style=flat)

### Security & Validation
![bcrypt](https://img.shields.io/badge/bcrypt-Password%20Hashing-red?style=flat)
![Zod](https://img.shields.io/badge/Zod-Data%20Validation-blueviolet?style=flat)
![Nodemailer](https://img.shields.io/badge/Nodemailer-Email%20Service-yellow?style=flat)

---

## 📂 Projects 

> **Portfolio Strategy:** Completed projects first → Ongoing projects last

---

### 🔐 Project 1: AuthSystem — Enterprise Authentication Backend

**Status:** ✅ **PRODUCTION READY**  
**Location:** `Projects/AuthSystem`  


#### Core Responsibilities Demonstrated
- **Authentication Flow:** Complete user lifecycle (signup → email verify → login → token refresh → logout)
- **Security Implementation:** JWT strategy, bcrypt hashing, HTTP-only cookies
- **Backend Architecture:** Controllers, middleware, models, utils separation
- **Database Design:** User schema with email verification, token storage
- **Email Integration:** Nodemailer service with verification tokens

#### Technical Highlights for PwC Interview
```
JWT Access Token (15 min) ──> Refresh Token (7 days) ──> New Access Token
              │
         httpOnly Cookie (secure transport)
              │
         Database validation & cleanup
```

**Tech Stack:**
- Node.js, Express.js
- MongoDB + Mongoose
- JWT (access + refresh)
- bcrypt, Zod, Nodemailer

---

### 🧠 Project 2: Brainly-App — React + TypeScript Frontend

**Status:** ✅ **COMPLETE**  
**Location:** `Projects/typeScript-Project/Brainly-App`  


#### Core Responsibilities Demonstrated
- **Type-Safe Components:** TypeScript interfaces for all props
- **API Integration:** REST client setup, error handling
- **State Management:** React hooks (useState, useEffect, useContext)
- **Clean Architecture:** Reusable components, proper separation

#### Technical Highlights
```
Q&A Platform Architecture:
├── Questions Component
├── Answers Component
├── User Profiles
└── Search & Filter
```

**Tech Stack:**
- React 18+
- TypeScript
- REST APIs
- Component composition


---

### 🎥 Project 3: VideoVerse — Media Platform Backend

**Status:** ✅ **PRODUCTION READY**  
**Location:** `Projects/VideoVerse_Backend`  
**Time to Understand:** 8-12 minutes

#### Core Responsibilities Demonstrated
- **File Upload Pipeline:** Multer → validation → Cloudinary → cleanup
- **User Management:** Profiles with avatar & cover images
- **Cloud Integration:** Cloudinary API integration
- **Security:** JWT authentication on protected routes
- **Scalability:** Proper error handling, cleanup mechanisms


**Tech Stack:**
- Node.js, Express.js
- MongoDB + Mongoose
- Multer (file upload)
- Cloudinary (media storage)
- JWT authentication

---

### 🚧 Project 4: PeerMeet — Real-Time Video Platform (ONGOING)

**Status:** 🔄 **IN DEVELOPMENT**  
**Location:** `Projects/PeerMeet`  
**Time to Understand:** 10-15 minutes

#### Core Responsibilities Demonstrated
- **WebRTC Implementation:** P2P audio/video streaming
- **Real-Time Signaling:** Socket.IO for connection establishment
- **Room Management:** Participant tracking, join/leave events
- **Backend Infrastructure:** Session management, authentication

**Tech Stack:**
- Frontend: React, TypeScript
- Backend: Node.js, Express, MongoDB
- Real-Time: WebRTC, Socket.IO
- Authentication: JWT

**Current Implementation Status:**
- ✅ User authentication & authorization
- ✅ Room creation & management
- ✅ Participant tracking system
- ✅ WebRTC signaling protocol
- ✅ ICE candidate exchange
- ✅ SDP offer/answer handling
- 🔄 Frontend UI components
- 🔄 Media stream integration
- 📋 Screen sharing (planned)
- 📋 Recording (planned)

```

---

## 🔒 Security & Best Practices Implemented

### Authentication & Authorization
- ✅ JWT-based authentication (access + refresh tokens)
- ✅ Secure password hashing (bcrypt with salt rounds)
- ✅ HTTP-only cookies (prevent XSS)
- ✅ CORS configuration (prevent CSRF)
- ✅ Email verification (prevent spam)
- ✅ Token expiry & cleanup (prevent token reuse)

### Data Validation
- ✅ Zod schema validation (request body)
- ✅ TypeScript type safety (compile-time errors)
- ✅ File type & size validation (prevent attacks)
- ✅ Input sanitization (prevent injection)

### Database Security
- ✅ Password hashing (never store plain text)
- ✅ Sensitive data encryption
- ✅ Proper indexing (prevent N+1 queries)
- ✅ Connection pooling (resource management)


---

### Clone & Install
```bash
git clone https://github.com/AnakinCodeWalker/Projects.git
cd Projects
```


## 🎓 Learning Resources

### Authentication & JWT
- [JWT Best Practices](https://tools.ietf.org/html/rfc7519)
- [Refresh Token Rotation](https://auth0.com/blog/refresh-tokens-what-are-they-and-when-to-use-them/)
- [bcrypt Algorithm](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)

### WebRTC & Real-Time
- [MDN WebRTC API](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API)
- [WebRTC Signaling](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Session_description)
- [Socket.IO Guide](https://socket.io/docs/)

### Backend Architecture
- [Express.js Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)
- [MongoDB Schema Design](https://docs.mongodb.com/manual/core/data-model-design/)
- [RESTful API Design](https://restfulapi.net/)

### General
- [System Design Primer](https://github.com/donnemartin/system-design-primer)
- [Clean Code Principles](https://www.oreilly.com/library/view/clean-code-a/9780136083238/)

---


## 📞 Contact & Open to Opportunities

**I'm actively looking for:**
- Backend/Full-Stack internships
- Entry-level software engineer roles
- Open-source contributions

**Get in touch:**
- 📧 Email: [parag31ja@gmail.com](mailto:parag31ja@gmail.com)
- 🔗 LinkedIn: [https://www.linkedin.com/in/princekumar3111](https://www.linkedin.com/in/princekumar3111)
- 💻 GitHub: [@AnakinCodeWalker](https://github.com/AnakinCodeWalker)

**Available for:**
- Technical discussions
- Architecture deep-dives
- Code reviews
- Pair programming

---

## 📝 License

MIT License - See LICENSE file for details

---

<p align="center">
  <strong>Building Production-Ready Systems</strong><br/>
  <em>One line of code at a time</em><br/><br/>
  Made with ❤️ by Prince Kumar<br/>
  Ready for PwC Launchpad 🚀
</p>
