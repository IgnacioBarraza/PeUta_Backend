# 🌸 Hyōsei – Backend

## 🚀 Project Overview

**Hyōsei** is a web platform crafted to streamline the organization, participation, and evaluation of university science fairs, expos, and academic project showcases. This backend provides a secure, scalable API for managing users, evaluations, projects, schedules, and more—powering both visitors and evaluators through a seamless experience.

🔹 **Frontend:** Angular  
🔹 **Backend:** Node.js with Express & TypeScript  
🔹 **Database:** PostgreSQL + TypeORM  
🔹 **Architecture:** Hexagonal (Ports & Adapters)  
🔹 **Hosting:** Railway  
🔹 **Cache:** Redis (Future implementation)  
🔹 **Auth:** JWT + HttpOnly Cookies  

---

## 📁 Project Structure

```plaintext
📂 src/
│
├── 📁 adapters/                 # Connects infrastructure to business logic
│   ├── 📁 cache/                # Cache layer (Redis or in-memory LRU cache)
│   └── 📁 typeorm/              # TypeORM specific implementations
│       ├── 📁 repositoryImpl/   # Repository implementations for TypeORM
│       ├── 📁 mappers/          # Data mappers for entity and schema types
│       └── 📁 schema/           # TypeORM entities (DB schemas)
│
├── 📁 core/                     # Business logic (pure, framework-independent)
│   ├── 📁 entities/             # Domain entities
│   ├── 📁 services/             # Application use cases
│   ├── 📁 validations/          # Zod validation schemas
│   └── 📁 ports/                # Interfaces to connect logic to infrastructure
│
├── 📁 infrastructure/           # Manages external tools and systems
│   ├── 📁 config/               # Environment variables & global settings
│   ├── 📁 controllers/          # HTTP layer
│   ├── 📁 middlewares/          # Validation, auth, error handling
│   ├── 📁 orm/                  # TypeORM setup & migrations
│   └── 📁 server/               # Server & route bootstrap
│       ├── 📁 routes/           # Express routes
│       └── server.ts            # App entry point
│
├── 📁 tests/                    # Unit and integration tests
│
└── 📁 utils/                    # General helper functions
```

---

## 🛠️ Setup & Run

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-user/hyosei_backend.git
   cd hyosei_backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set environment variables**
   Create a `.env` file in the root directory:

   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=your_password
   DB_NAME=hyosei_db
   REDIS_URL=redis://localhost:6379
   PORT=3000
   JWT_SECRET=super_secret_token
   NODE_ENV=dev (by default)
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

---

## 🔧 Migrations (TypeORM)

1. **Generate a new migration**

   ```bash
   npm run migration:generate -- src/infrastructure/orm/migrations/NameOfMigration
   ```

2. **Run migrations**

   ```bash
   npm run migration:run
   ```

3. **Revert the last migration**

   ```bash
   npm run migration:revert
   ```

---

## 🔐 Security

* Auth via JWT + HttpOnly cookies
* Routes protected by role-based middleware
* Passwords hashed with bcrypt
* Validations with Zod (core/validations)
* Tokens auto-expire and can be extended

---

## 📚 Useful Documentation

* [Express.js](https://expressjs.com/)
* [TypeScript](https://www.typescriptlang.org/)
* [TypeORM](https://typeorm.io/)
* [Redis](https://redis.io/)
* [Zod](https://zod.dev/)

---

## ✨ Author

Project developed and maintained by **Nacho** 👨‍💻 – Computer Engineering & Software developer 🇨🇱

> “Hyōsei — because academic excellence deserves professional-grade tools.”

☕ If this repo helped you, leave a ⭐ or contact me for custom academic event support ignacio.barraza.rioja@gmail.com.
