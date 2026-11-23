# Camera Permission Reference App

This is the lesson-25 instructor reference project.

## Recovery use during class
- This project is a known-good comparison app for the lesson-25 permission-state build.
- The app itself should stay working and should be used as a stable comparison path, not as the main student starting point.
- If a student is blocked, the fallback path is to inspect these files with the instructor:
  - `src/app/(protected)/details.js`
  - `package.json`
  - `app.json`
  - `src/context/AuthContext.js` only if the protected baseline itself breaks
- The preferred recovery loop is compare and repair:
  1. compare `src/app/(protected)/details.js` for the permission-state card, request path, and gated camera action
  2. compare `package.json` and `app.json` only if the lesson-24 camera setup itself is missing
  3. compare auth files only if the protected route stopped working before permission testing began
- Blocked students do not need to install and run this app themselves during class unless the instructor explicitly chooses that path.

## Run
From this folder:

1. Install dependencies:
   - `npm install`
2. Add dev-client support for the preferred class runtime:
   - `npx expo install expo-dev-client`
3. Create and install a development build:
   - `npm run android:dev`
   - or `npm run ios:dev`
4. Start Expo for the development build:
   - `npm run start:dev-client`

## What this app demonstrates
- one shared auth provider
- secure stored-session restore
- `/auth/me` validation on startup
- protected-route gating that waits for restore
- protected study-step requests using the bearer token
- one permission-aware camera state card
- one gated camera-launch path
- one local preview result on the protected `details` screen
- logout that clears live and stored auth state

## Minimum lesson-25 comparison files
- `src/app/(protected)/details.js`
- `package.json`
- `app.json`

## What is not required for lesson success
- Students do not need to move the image into shared state in this lesson.
- Students do not need a second media-library selection branch.
- Students do not need to redesign the protected feature UI.
