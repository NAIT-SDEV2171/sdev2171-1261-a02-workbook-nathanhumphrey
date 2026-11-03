# Auth Flow Concepts Reference App

This is the lesson-19 instructor reference project.

## Recovery use during class
- This project is a known-good comparison app for the lesson-19 auth concept flow.
- If a student is blocked, the fallback path is to inspect these files with the instructor:
  - `src/app/_layout.tsx`
  - `src/app/index.js`
  - `src/app/(public)/welcome.js`
  - `src/app/(public)/login.js`
  - `src/app/(public)/register.js`
  - `src/app/(protected)/_layout.tsx`
  - `src/app/(protected)/details.js`
  - `src/context/AuthContext.js`
  - `src/context/StudyPlanContext.js`
  - `src/lib/authApi.js`
  - `src/lib/apiBaseUrl.js`
- The preferred recovery loop is compare and explain:
  1. compare `src/app/index.js` to see the app-launch route decision
  2. compare `src/app/(protected)/_layout.tsx` to see the protected-route gate
  3. compare `src/lib/authApi.js` to see the session-validation and bearer-token request pattern
  4. compare `src/context/AuthContext.js` only after those three files are clear
  5. compare how the existing lesson-18 feature still works inside the protected area
- Blocked students do not need to install and run this app themselves during class unless the instructor explicitly chooses that path.

## Run
From this folder:

1. Install dependencies:
   - `npm install`
2. Add dev-client support for the preferred auth-debugging path:
   - `npx expo install expo-dev-client`
3. Create and install a development build:
   - `npm run android:dev`
   - or `npm run ios:dev`
4. Start Expo for the development build:
   - `npm run start:dev-client`
5. Open the installed development build on one working path:
   - Android emulator
   - iOS simulator on macOS
   - a prepared device path if already available

## Why this project now prefers a development build
- Expo documents development builds as the path that adds stronger tooling such as network request inspection.
- That matters in this module because the auth flow is easier to explain when students can inspect login, registration, and `/auth/me` requests directly.
- Expo Go can still show the screens, but it is no longer the preferred tooling path for auth lessons.

## What this app demonstrates
- one public welcome path
- one register-or-login auth flow
- one shared auth state provider
- one protected Expo Router route group
- one bearer-token request path using `Authorization: Bearer <token>`
- the existing study-step and session-summary workflow behind auth

## Minimum lesson-19 pieces
- the redirect logic in `src/app/index.js`
- the route-group split in `src/app/(public)/` and `src/app/(protected)/`
- the auth actions in `src/context/AuthContext.js`
- the protected request helper in `src/lib/authApi.js`
- the gated feature route in `src/app/(protected)/details.js`

## What is not required for lesson success
- Students do not need secure storage in this lesson.
- Students do not need refresh tokens or external auth providers.
- Students do not need role-based access control.
- Students do not need to redesign the existing study-plan feature to understand the auth flow.

## Suggested demo sequence
1. Show the public welcome screen.
2. Open the login screen and use the seeded account.
3. Confirm the app moves into the protected route group.
4. Wait for `/auth/me` and `/study-steps` to return.
5. Point out the bearer-token request helper.
6. Open the existing protected form flow briefly.
7. Log out and confirm the app returns to the public auth path.
