# Lesson 19 Backend

This backend adds local JWT authentication support to the same study-step backend line used in earlier lessons.

## Purpose
- keep the same `{ id, label }` study-step shape used in lessons 13-18
- add local registration, login, logout-ready token flow, and `/auth/me`
- protect the study-step endpoints so lesson 19 can show a real bearer-token request
- avoid dependence on an external auth or data service

## Run
From this folder:

1. Install dependencies:
   - `npm install`
2. Create `.env` from `.env.example`:
   - `cp .env.example .env`
3. Start the backend:
   - `npm start`
   - or `npm run dev` for auto-restart while editing
4. Leave this terminal running while the Expo app is open.

## Seeded login
- Email: `student1@example.com`
- Password: `Password123!`

## Auth endpoints
- `POST /auth/register`
  - body: `{ "name": string, "email": string, "password": string }`
- `POST /auth/login`
  - body: `{ "email": string, "password": string }`
- `GET /auth/me`
  - header: `Authorization: Bearer <token>`

## Protected study-step endpoints
- `GET /study-steps`
- `GET /study-steps/:id`

These protected endpoints require:

```http
Authorization: Bearer <token>
```

Example:
- `http://localhost:3000/study-steps?delay=700`

## Data file
- `study-steps.json`
  Stores the lesson-local `users` array and the protected `steps` array.

## Notes for Expo
- Android emulator usually needs `http://10.0.2.2:3000`
- iOS simulator can use `http://127.0.0.1:3000`
- A physical device must use your computer LAN IP instead of localhost
