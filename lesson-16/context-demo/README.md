# Context State Reference App

This is the lesson-16 instructor reference project.

## Recovery use during class
- This project is a known-good comparison app for the lesson-16 Context shared-state workflow.
- If a student is blocked, the fallback path is to inspect these files with the instructor:
  - `src/app/_layout.tsx`
  - `src/app/index.js`
  - `src/app/details.js`
  - `src/app/plan.js`
  - `src/context/StudyPlanContext.js`
  - `src/lib/apiBaseUrl.js`
- The preferred recovery loop is compare and repair:
  1. compare your own `src/context/StudyPlanContext.js` to this reference
  2. compare `_layout.tsx` provider placement
  3. compare how `details.js` consumes the shared hook
  4. compare how `plan.js` consumes the shared hook
  5. compare which values stayed local
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
- a working lesson-15 style fetch baseline
- one local backend GET request started on detail-screen load
- one shared selected-step list owned by Context
- one provider wrapped around the shared route tree
- one visible synchronization clue when the plan screen updates the details screen count

## Minimum lesson-16 pieces
- the fetch success path in `details.js`
- the shared provider in `src/context/StudyPlanContext.js`
- the provider placement in `_layout.tsx`
- the shared hook usage in `details.js` and `plan.js`
- one synchronization clue showing both screens agree

## What is not required for lesson success
- Students do not need POST, PUT, or DELETE requests in this lesson.
- Students do not need authentication in this lesson.
- Students do not need advanced caching or pagination.
- Students do not need to redesign the whole screen layout to succeed.

## Suggested demo sequence
1. Show the home screen briefly to confirm the navigation flow still works.
2. Open the detail screen and wait for the fetched list.
3. Add two study steps on the details screen.
4. Open the shared plan screen.
5. Remove one step there.
6. Go back and show that the details screen now shows the updated shared count.
