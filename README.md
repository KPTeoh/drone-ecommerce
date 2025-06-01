# E-Commerce Application

A full-stack e-commerce application built with **Nuxt 3** (frontend) and **NestJS** (backend), featuring product browsing, cart management, and checkout functionality.

## 🏗️ Architecture Overview

```
┌─────────────────┐    HTTP/REST API    ┌─────────────────┐
│   Frontend      │ ◄─────────────────► │   Backend       │
│   (Nuxt 3)      │                     │   (NestJS)      │
│                 │                     │                 │
│ • Vue 3         │                     │ • TypeScript    │
│ • Pinia Store   │                     │ • In-Memory DB  │
│ • TailwindCSS   │                     │ • REST API      │
│ • SSR/SPA       │                     │ • CORS Enabled  │
└─────────────────┘                     └─────────────────┘
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+
- **npm**

### Installation & Setup

1. **Clone the repository**

```bash
git clone <repository-url>
cd drone-ecommerce
```

2. **Install Backend Dependencies**

```bash
cd backend
npm install
```

3. **Install Frontend Dependencies**

```bash
cd ../frontend
npm install
```

## 🔧 Configuration

### Environment Variables

**Frontend** (`frontend/.env`)

Create .env file on frontend directory to communicate with backend services

Paste the code below:

---
↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
# API Configuration

NUXT_PUBLIC_API_BASE_URL=http://localhost:3001/api

# Development Configuration

NUXT_HOST=localhost

NUXT_PORT=3000

↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
---

### Running the Application

1. **Start Backend Server** (Terminal 1)

```bash
cd backend
npm run start
# Server runs on http://localhost:3001
```

2. **Start Frontend Server** (Terminal 2)

```bash
cd frontend
npm run dev
# Application runs on http://localhost:3000
```

## 🎯 Design Decisions

### 1. **In-Memory Storage vs. File Persistence**

**Choice: In-Memory Storage**

**Rationale:**

- **Simplicity**: No database setup required for demo
- **Performance**: Fastest possible data access
- **Development Speed**: Immediate setup without external dependencies

**Trade-offs:**

- ❌ **Data Loss**: All data resets on server restart
- ❌ **Scalability**: Cannot handle multiple server instances
- ❌ **Persistence**: No data survives between sessions

**Production Alternative:**

### 2. **API Design Choices**

**RESTful Architecture**

- **Clear Resource Mapping**: `/products`, `/cart`, `/checkout`
- **HTTP Verbs**: GET, POST, PUT, DELETE for semantic operations
- **Stateless**: Each request contains all necessary information
- **JSON Communication**: Standard request/response format

**Cart Management Strategy**

- **Server-Side State**: Cart stored on backend for consistency
- **Client-Side Caching**: Frontend caches cart in localStorage
- **Automatic Sync**: Frontend syncs with backend on page load

### 3. **Frontend State Management**

**Choice: Pinia + localStorage**

**Benefits:**

- **Reactive State**: Vue 3 composition API integration
- **Persistence**: Cart survives browser refresh
- **Performance**: Local state reduces API calls
- **User Experience**: Instant UI updates

## ⚖️ Trade-offs Made

### 1. **Development Speed vs. Production Readiness**

**Chosen: Development Speed**

- ✅ **Simpler Setup**: No database or external service dependencies
- ❌ **Production Gaps**: Missing authentication, persistence, scalability

### 2. **Feature Completeness vs. Code Quality**

**Chosen: Balanced Approach**

- ✅ **Core Features**: Complete shopping flow implemented
- ✅ **Clean Code**: Well-structured, documented, and maintainable
- ✅ **Type Safety**: Full TypeScript implementation
- ❌ **Advanced Features**: No user accounts, order history, reviews, etc.

### 3. **Real-time Updates vs. Simplicity**

**Chosen: Simplicity**

- ✅ **Reliable**: Standard HTTP requests with clear error handling
- ✅ **Debuggable**: Easy to trace and troubleshoot
- ❌ **Real-time**: No WebSocket updates for stock changes or cart sync
