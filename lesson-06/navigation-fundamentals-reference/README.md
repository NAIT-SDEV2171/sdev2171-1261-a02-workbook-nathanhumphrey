# Navigation Fundamentals Reference App

This is the lesson-06 instructor reference project.

## Recovery use during class
- This project is primarily an instructor-run reference app.
- If a student is blocked, the fallback path is to inspect these files with the instructor:
  - `src/app/_layout.tsx`
  - `src/app/index.js`
  - `src/app/details.js`
- Blocked students do not need to install and run this app themselves during class unless the instructor explicitly chooses that path.

## Run
From this folder:

1. Install dependencies:
   - `npm install`
2. Add dev-client support:
   - `npx expo install expo-dev-client`
3. Create and install a development build:
   - `npm run android:dev`
   - or `npm run ios:dev`
4. Start Expo:
   - `npm run start`
5. Open the app on one working path:
   - Android emulator with the installed development build
   - iOS simulator on macOS with the installed development build
   - a prepared device path with the installed development build if already available

## What this app demonstrates
- a stack layout in `src/app/_layout.tsx`
- a home route in `src/app/index.js`
- a detail route in `src/app/details.js`
- one forward action and one back action
- a simple split of lesson-05 content into two screens

## What is not required for lesson success
- Students do not need more than two screens in this lesson.
- Students do not need nested layouts or advanced route patterns.
- Students do not need to copy every styling detail in this reference app.

## Suggested demo sequence
1. Show the lesson-05 single-screen version briefly if needed.
2. Open `src/app/_layout.tsx` and explain the stack layout.
3. Open `src/app/index.js` and show the first-screen action.
4. Open `src/app/details.js` and show the return action.
5. Run the app and test both directions of navigation.
