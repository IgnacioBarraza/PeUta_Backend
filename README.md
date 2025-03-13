¡Vamos a actualizar el README según la estructura que tienes en la foto! Quedaría algo así:

---

# 🌟 Science Fair Evaluation Platform  

## 🚀 Project Overview  

A web platform designed to streamline the evaluation process for projects presented at the university's Science Fair. Evaluators can register, log in, and submit project evaluations digitally.  

🔹 **Frontend:** React (possible migration to Angular)  
🔹 **Backend:** Node.js with Express & TypeScript  
🔹 **Database:** PostgreSQL (TypeORM)  
🔹 **Architecture:** Hexagonal (Ports & Adapters)  
🔹 **Hosting:** Railway (free)  
🔹 **Cache:** Redis  

---

## 📁 Project Structure  

```plaintext
📂 src/
│
├── 📁 adapters/                 # Connects infrastructure to business logic
│   ├── 📁 cache/                # Cache layer (Redis or in-memory LRU cache)
│   └── 📁 typeorm/              # TypeORM specific implementations
│       ├── 📁 repositoryImpl/   # Repository implementations for TypeORM
│       └── 📁 schema/           # TypeORM entities (DB schemas)
│
├── 📁 core/                     # Business logic (pure, framework-independent)
│   ├── 📁 entities/             # Domain entities
│   ├── 📁 services/             # Application use cases
│   └── 📁 ports/                # Interfaces to connect logic to infrastructure
│
├── 📁 infrastructure/           # Manages external tools and systems
│   ├── 📁 config/               # Environment variables & global settings
│   ├── 📁 controllers/          # Handles HTTP requests
│   ├── 📁 middlewares/          # Data validation, auth, error handling
│   ├── 📁 orm/                  # TypeORM setup & migrations
│   └── 📁 server/               # Server setup and routes initialization
│       ├── 📁 routes/           # Routes setup
│       └── server.ts            # Entry point for the server
│
├── 📁 tests/                    # Unit and integration tests
│
└── 📁 utils/                    # General utilities (e.g., helper functions)
    └── utils.ts                 # Utility functions file
```

---

## 🛠️ Setup & Run  

1. **Clone the repository**  
   ```bash
   git clone https://github.com/your-user/science-fair-platform.git
   cd science-fair-platform
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
   DB_NAME=science_fair
   REDIS_URL=redis://localhost:6379
   PORT=3000
   ```

4. **Run the development server**  
   ```bash
   npm run dev
   ```

---

## 🔧 Migrations  

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

## 📚 Useful Documentation  

- **Express:** [expressjs.com](https://expressjs.com/)  
- **TypeScript:** [typescriptlang.org](https://www.typescriptlang.org/)  
- **TypeORM:** [typeorm.io](https://typeorm.io/)  
- **Redis:** [redis.io](https://redis.io/)  

---

## ✨ Author  

Project developed by **Nacho** 🎉, Computer Engineering student.  

If you found this useful, leave a ⭐ on the repo!  
