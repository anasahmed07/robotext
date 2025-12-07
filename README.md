# Robotext

**The Best Platform to Learn Physical AI & Humanoid Robotics**

Robotext is an interactive learning platform that teaches Physical AI, robotics, and embodied intelligence through hands-on projects. From foundational concepts to cutting-edge Vision-Language-Action (VLA) models, learn by building real robotic systems.

## 🚀 Features

- **4 Comprehensive Modules**:
  - 🤖 Robotic Nervous System: Sensors, actuators, and control loops
  - 🔷 Digital Twin: Simulation and virtual testing environments
  - 🧠 AI Robot Brain: Machine learning and intelligent decision-making
  - 👁️ Vision-Language-Action Models: Multimodal AI for robotics

- **Bilingual Support**: Full English and Urdu (اردو) content with RTL layout
- **User Authentication**: Secure sign-up, login, and personalized learning profiles
- **Adaptive Learning**: Tailored content based on experience level and hardware setup
- **Dark/Light Mode**: Comfortable learning in any environment

## 🛠️ Tech Stack

### Frontend
- **Framework**: Docusaurus 3.9.2 (React-based static site generator)
- **Language**: TypeScript 5.3.3
- **Styling**: Tailwind CSS 3.x + CSS Modules
- **i18n**: Built-in Docusaurus i18n with English & Urdu
- **Deployment**: GitHub Pages

### Backend
- **Runtime**: Node.js 18+ with Express 4.18.2
- **Language**: TypeScript 5.3.3
- **Authentication**: better-auth 0.8.0 (email/password, 30-day sessions)
- **Database**: Neon PostgreSQL (serverless)
- **ORM**: Drizzle ORM 0.29.5
- **Validation**: Zod 3.22.4
- **Logging**: Winston 3.11.0
- **Deployment**: Railway

## 📦 Project Structure

```
robotext/
├── api/                    # Backend API (Express + TypeScript)
│   ├── src/
│   │   ├── routes/         # API endpoints (auth, user)
│   │   ├── db/             # Database schema & migrations
│   │   ├── auth/           # better-auth configuration
│   │   ├── middleware/     # CORS, logging, error handling
│   │   └── utils/          # Validation schemas
│   └── .env.example        # Environment variables template
│
├── web/                    # Frontend (Docusaurus)
│   ├── docs/               # Course content (Markdown)
│   ├── src/
│   │   ├── pages/          # Landing, signup, login, onboarding
│   │   ├── components/     # AuthContext, ProtectedRoute, LanguageToggle
│   │   └── css/            # Global styles, RTL support
│   └── i18n/ur/            # Urdu translations
│
└── specs/                  # Feature specifications & planning
    └── 001-foundation-auth/
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database (or Neon account)
- Git

### Backend Setup

1. **Clone and navigate**:
   ```bash
   git clone https://github.com/anasahmed07/robotext.git
   cd robotext/api
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment**:
   ```bash
   cp .env.example .env
   # Edit .env and set:
   # - DATABASE_URL (from Neon dashboard)
   # - AUTH_SECRET (generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
   ```

4. **Run database migrations**:
   ```bash
   npm run db:push
   ```

5. **Start development server**:
   ```bash
   npm run dev
   ```

Backend will run on `http://localhost:3000`

### Frontend Setup

1. **Navigate to web directory**:
   ```bash
   cd ../web
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment**:
   ```bash
   cp .env.example .env
   # Set REACT_APP_API_URL=http://localhost:3000
   ```

4. **Start development server**:
   ```bash
   npm start
   ```

Frontend will run on `http://localhost:3001`

## 📚 Database Schema

- **user**: Core user data (id, email, name, emailVerified)
- **session**: Authentication sessions (token, expiresAt, userId)
- **account**: OAuth providers & password storage
- **verification**: Email verification tokens
- **user_profiles**: Learning profiles (programmingLanguages, rosFamiliarity, roboticsKnowledge, hardwareSpecs)

## 🌍 Deployment

### Backend (Railway)
1. Create new project in Railway
2. Connect GitHub repository
3. Set environment variables (DATABASE_URL, AUTH_SECRET, FRONTEND_URL)
4. Deploy from main branch

### Frontend (GitHub Pages)
1. Enable GitHub Pages in repository settings
2. Set source to "GitHub Actions"
3. Add `BACKEND_API_URL` secret in repository settings
4. Push to main branch (auto-deploys via GitHub Actions)

## 🧪 Testing

```bash
# Run tests (when implemented)
cd api && npm test
cd web && npm test

# Lint code
npm run lint

# Format code
npm run format
```

## 📖 Documentation

- **Specification**: `specs/001-foundation-auth/spec.md`
- **Architecture**: `specs/001-foundation-auth/plan.md`
- **Tasks**: `specs/001-foundation-auth/tasks.md`
- **Quick Start**: `specs/001-foundation-auth/quickstart.md`

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🔗 Links

- **Live Site**: [GitHub Pages URL]
- **API**: [Railway URL]
- **Repository**: https://github.com/anasahmed07/robotext

## 👤 Author

**Anas Ahmed** - [@anasahmed07](https://github.com/anasahmed07)

---

Built with ❤️ using Docusaurus and better-auth
