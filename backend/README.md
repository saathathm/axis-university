# EduBridge Academy Backend

Phase 1 backend foundation for the EduBridge Academy Platform.

## Setup

```bash
cd backend
npm install
cp .env.example .env
```

Update `.env` with your MySQL credentials:

```env
DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/edubridge_academy"
JWT_SECRET=replace_with_a_long_secure_secret
```

## Prisma Commands

Prisma schema and migrations will be added in the next phase.

```bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:studio
```

## Run Development Server

```bash
npm run dev
```

Health check:

```http
GET http://localhost:5000/api/health
```

## Included In This Phase

- Express app setup
- Server entry point
- Prisma client configuration
- JWT-ready authentication middleware
- Role-based authorization middleware
- Central error middleware
- Multer upload middleware
- Environment variable example
- Backend package scripts
