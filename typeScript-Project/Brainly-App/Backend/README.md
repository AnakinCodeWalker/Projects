# 🧠 Brainly-App — Knowledge Sharing Platform (React + TypeScript)

A **type-safe knowledge sharing platform** built with React and TypeScript where users can create posts, control visibility (public/private), share content via links, and search their own posts.

Designed with clean architecture, reusable components, and scalable frontend patterns.

---

## 📋 Overview

Brainly-App allows users to **create and manage knowledge posts** in a structured way.
Users can decide whether a post is **public or private**, generate **shareable links**, and easily **search posts they have created**.

The project focuses on **frontend architecture, state management, and TypeScript-driven safety**.

---

## ✨ Features

* **User Accounts** — Users can create and manage their own content
* **Post Creation** — Create text-based knowledge posts
* **Post Visibility Control**

  * Public posts (visible to others)
  * Private posts (only visible to owner)
* **Shareable Links** — Generate links to share public posts
* **Search Functionality** — Search through your own created posts
* **Type-Safe UI** — Strongly typed components using TypeScript
* **Reusable Components** — Modular and maintainable UI
* **REST API Integration** — Clean communication with backend
* **Error & Loading States** — Smooth user experience

---

## 🛠️ Tech Stack

* **Frontend:** React 18+
* **Language:** TypeScript
* **State Management:** React Hooks
* **API Communication:** Fetch / Axios
* **Styling:** CSS3

---

## 📦 Installation

```bash
npm install
```

---

## ⚙️ Environment Variables (`.env`)

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_BASE_URL=http://localhost:5000
```

---

## 🚀 Running the Project

```bash
npm start       # Development mode
npm run build   # Production build
```

Frontend runs on:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 📡 Core Functionality

### Posts

* Create new posts
* Set post visibility (public / private)
* View all posts created by the user
* Generate shareable links for public posts

### Search

* Search posts by title or content
* Filter only user-created posts

### Users

* View basic user profile
* Manage owned posts

---

## 📁 Project Structure

```
src/
├── config/           # App-level configuration
├── controllers/      # API interaction logic
├── middlewares/      # Request / response handlers
├── models/           # TypeScript data models
├── routes/           # Route definitions
├── utils/            # Helper utilities
├── validators/       # Input & form validation
├── app.ts            # App configuration
└── index.ts          # Entry point
```

---

## 🧩 TypeScript Usage

### Post Model Example

```ts
interface Post {
  id: string;
  title: string;
  content: string;
  isPublic: boolean;
  shareLink?: string;
  createdAt: string;
}
```

### Benefits

* Compile-time error detection
* Better IDE auto-completion
* Safer data contracts between components

---

## ✅ Best Practices Followed

* ✅ TypeScript-first development
* ✅ Clean separation of concerns
* ✅ Controlled component state
* ✅ Reusable UI components
* ✅ Predictable data flow

---

## 🔗 Related Projects

* 🔐 **AuthSystem:** Secure authentication backend
* 🎥 **VideoVerse Backend:** Media platform backend
* 🚧 **PeerMeet:** Real-time WebRTC platform
* 📦 **Portfolio Index:** [https://github.com/AnakinCodeWalker/Projects](https://github.com/AnakinCodeWalker/Projects)

---

## 📜 License

MIT License

---

**Built for scalable, type-safe frontend development** 🚀
