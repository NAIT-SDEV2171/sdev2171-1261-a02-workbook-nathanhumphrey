# Camera Capture Reference App

This is the lesson-24 instructor reference project.

## Recovery use during class
- This project is a known-good comparison app for the lesson-24 camera-capture build.
- The app itself should stay working and should be used as a stable comparison path, not as the main student starting point.
- If a student is blocked, the fallback path is to inspect these files with the instructor:
  - `package.json`
  - `app.json`
  - `src/app/(protected)/details.js`
  - `src/context/AuthContext.js` only if the protected baseline itself breaks
- The preferred recovery loop is compare and repair:
  1. compare `package.json` to confirm the camera package was added
  2. compare `app.json` to confirm the plugin/config change
  3. compare `src/app/(protected)/details.js` for the camera import, local state, action, and preview
  4. compare auth files only if the protected route stopped working before the camera flow could be tested
- Blocked students do not need to install and run this app themselves during class unless the instructor explicitly chooses that path.

## Run
From this folder:

1. Install dependencies:
   - `npm install`
2. Add dev-client support for the preferred class runtime:
   - `npx expo install expo-dev-client`
3. Install the camera package if the folder was restored without dependencies:
   - `npx expo install expo-image-picker`
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
- the course runtime standard is already the installed development build
- lesson 24 adds a native module, so the app needs a rebuilt binary after package installation
- physical-device testing is easier to support from the same development-build path

## What this app demonstrates
- one shared auth provider
- secure stored-session restore
- `/auth/me` validation on startup
- protected-route gating that waits for restore
- protected study-step requests using the bearer token
- one protected camera-launch path
- one local preview result on the protected `details` screen
- logout that clears live and stored auth state

## Minimum lesson-24 comparison files
- `package.json`
- `app.json`
- `src/app/(protected)/details.js`

## What is not required for lesson success
- Students do not need to move the image into shared state in this lesson.
- Students do not need a second media-library selection branch.
- Students do not need to redesign the protected feature UI.
