# 🎥 PeerMeet — Real-Time Video Communication Platform

A **real-time video meeting platform** built using **WebRTC** and **Socket.IO**, enabling peer-to-peer audio/video communication with secure room management and signaling infrastructure.

Designed to demonstrate real-world **real-time systems**, **networking concepts**, and **scalable backend architecture**.

---

## 📋 Overview

PeerMeet allows users to create and join virtual rooms for **live video communication**.
The platform uses **WebRTC for peer-to-peer media streaming** and **Socket.IO as a signaling server** to exchange connection metadata (SDP, ICE candidates).

The project focuses on **real-time communication**, **connection lifecycle management**, and **secure session handling**.

---

## ✨ Features

* **User Authentication** — JWT-based protected access
* **Room Management**

  * Create and join meeting rooms
  * Track participants in real time
* **Real-Time Video & Audio**

  * Peer-to-peer media streaming using WebRTC
* **Signaling Server**

  * Socket.IO for offer/answer exchange
  * ICE candidate propagation
* **Live Participant Updates**

  * Join / leave events
  * Room state synchronization
* **Scalable Architecture**

  * Stateless signaling server
  * Media streams handled P2P (no server load)

---

## 🛠️ Tech Stack

### Frontend

* React
* TypeScript
* WebRTC APIs

### Backend

* Node.js
* Express.js
* MongoDB

### Real-Time

* WebRTC (P2P media streaming)
* Socket.IO (signaling)

### Security

* JWT authentication

---

## 📦 Installation

### Backend

```bash
cd PeerMeet/backend
npm install
cp .env.example .env
```

### Frontend

```bash
cd PeerMeet/frontend
npm install
```

---

## ⚙️ Environment Variables (`.env`)

```env
PORT=5000
MONGO_URL=mongodb://localhost:27017/peermeet

JWT_SECRET=your_secret_key_min_32_chars

FRONTEND_URL=http://localhost:3000
```

---

## 🚀 Running the Project

### Start Backend

```bash
npm run dev
```

### Start Frontend

```bash
npm start
```

* Backend: **[http://localhost:5000](http://localhost:5000)**
* Frontend: **[http://localhost:3000](http://localhost:3000)**

---

## 🔄 How PeerMeet Works (High-Level Flow)

```
User A joins room
    ↓
Socket.IO signaling server
    ↓
Offer / Answer exchange
    ↓
ICE candidates exchanged
    ↓
Direct P2P connection (WebRTC)
    ↓
Live audio/video stream
```

👉 **Media does NOT pass through the server**
👉 Server is only responsible for signaling

---

## 📡 Core Functionality

### Rooms

* Create a new meeting room
* Join existing rooms
* Track active participants

### Signaling

* SDP offer / answer exchange
* ICE candidate sharing
* Connection lifecycle handling

### Media

* Camera & microphone access
* Peer-to-peer audio/video streaming

---

## 📁 Project Structure

```
PeerMeet/
├── backend/
│   ├── controllers/      # API logic
│   ├── models/           # Database schemas
│   ├── middleware/       # Auth middleware
│   ├── routes/           # REST APIs
│   ├── socket/           # Socket.IO signaling logic
│   └── index.js          # Server entry
│
├── frontend/
│   ├── components/       # UI components
│   ├── pages/            # App pages
│   ├── hooks/            # WebRTC & socket hooks
│   └── App.tsx           # Root component
```

---

## 🔒 Security Considerations

* ✅ JWT-protected room access
* ✅ Authentication before joining rooms
* ✅ DTLS-SRTP encryption (WebRTC default)
* ✅ No media stored on server

---

## 💡 Key Concepts Demonstrated

* **WebRTC:** Peer-to-peer real-time communication
* **ICE Candidates:** Best path discovery between peers
* **SDP:** Session negotiation metadata
* **Signaling Server:** Required to establish WebRTC connections
* **Scalability:** Media offloaded from backend

---

## 🔗 Related Projects

* 🔐 **AuthSystem:** Secure authentication backend
* 🎥 **VideoVerse Backend:** Media upload & storage system
* 🧠 **Brainly-App:** Knowledge sharing platform
* 📦 **Portfolio Index:** [https://github.com/AnakinCodeWalker/Projects](https://github.com/AnakinCodeWalker/Projects)

---

## 📜 License

MIT License

---

**Built to demonstrate real-time communication at scale** 🚀
