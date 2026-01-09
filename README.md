# To launch the backend:  

cd trenscendence-backend

npm run start:dev

# To launch the frontend:

cd trenscendence-frontend

npm run dev


!you can test using curl or the front-end!

# Project Features

What is Built so far:

Backend (NestJS + PostgreSQL + Prisma)
✅ User registration, login and dashboard
✅ User registration with bcrypt password hashing (12 rounds)
✅ JWT authentication with 7-day expiration
✅ Protected routes with JWT guards
✅ Profile auto-creation on registration
✅ Online/offline status tracking
✅ Unique avatars per user
✅ Password never exposed in responses
✅ Proper error handling and validation

Frontend (React + TypeScript + Tailwind)
✅ Home page with login/register buttons
✅ Registration form with client-side validation
✅ Login form with error messages
✅ Protected dashboard route
✅ User profile display with avatar
✅ Status badges (online/offline)
✅ Logout functionality
✅ JWT stored in localStorage
✅ Automatic token refresh on page reload

Security
✅ CORS configured
✅ Input validation (frontend + backend)
✅ SQL injection protected (Prisma ORM)
✅ XSS protected (React escaping)
✅ Passwords salted and hashed
✅ JWTs signed and verified
