# Session Persistence Reference App

This is the lesson-21 instructor reference project.

## Recovery use during class
- This project is a known-good comparison app for the lesson-21 persisted-session build.
- If a student is blocked, the fallback path is to inspect these files with the instructor:
  - `src/app/_layout.tsx`
  - `src/app/index.js`
  - `src/app/(protected)/_layout.tsx`
  - `src/context/AuthContext.js`
  - `src/lib/authStorage.js`
  - `src/lib/authApi.js`
  - `src/app/(public)/login.js`
  - `src/app/(public)/register.js`
  - `src/app/(protected)/details.js`
- The preferred recovery loop is compare and repair:
  1. compare `src/lib/authStorage.js` to confirm save, read, and clear behaviour
  2. compare `src/context/AuthContext.js` to confirm restore, validate, and clear logic
  3. compare `src/app/index.js` and `src/app/(protected)/_layout.tsx` to confirm the `isRestoring` gate
  4. compare `src/app/(public)/login.js` or `register.js` only to confirm the saved-session handoff
  5. compare `src/app/(protected)/details.js` to confirm the visible restored-session proof
- Blocked students do not need to install and run this app themselves during class unless the instructor explicitly chooses that path.

## Run
From this folder:

1. Install dependencies:
   - `npm install`
2. Add dev-client support for the preferred class runtime:
   - `npx expo install expo-dev-client`
3. Install secure storage:
   - `npx expo install expo-secure-store`
4. Create and install a development build:
   - `npm run android:dev`
   - or `npm run ios:dev`
5. Start Expo for the development build:
   - `npm run start:dev-client`
6. Open the installed development build on one working path:
   - Android emulator
   - iOS simulator on macOS
   - a prepared device path if already available

## Why this project uses a development build
- The lesson depends on restart testing in the real app runtime.
- The course now uses development builds as the primary path when students need DevTools and runtime features beyond the Expo Go comparison path.
- `expo-secure-store` is part of the real app setup for this lesson.

## What this app demonstrates
- one shared auth provider
- login and registration that save the auth session
- restore-on-startup logic
- `/auth/me` validation for restored sessions
- protected-route gating that waits for restore to finish
- logout that clears stored and live auth state

## Minimum lesson-21 pieces
- storage helper in `src/lib/authStorage.js`
- restore logic in `src/context/AuthContext.js`
- entry redirect guard in `src/app/index.js`
- protected-layout restore guard in `src/app/(protected)/_layout.tsx`
- visible restart proof in `src/app/(protected)/details.js`

## What is not required for lesson success
- Students do not need refresh tokens in this lesson.
- Students do not need third-party auth providers.
- Students do not need role-based access control.
- Students do not need to persist unrelated feature state.
