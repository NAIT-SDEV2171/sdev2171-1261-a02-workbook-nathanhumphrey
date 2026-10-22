# State Sharing Problem Reference App

This is the lesson-15 instructor reference project.

## Recovery use during class
- This project is a known-good comparison app for the lesson-15 state-sharing problem workflow.
- If a student is blocked, the fallback path is to inspect these files with the instructor:
  - `src/app/_layout.tsx`
  - `src/app/index.js`
  - `src/app/details.js`
  - `src/app/plan.js`
  - `src/lib/apiBaseUrl.js`
- The preferred recovery loop is compare and repair:
  1. compare your own `src/app/details.js` to this reference
  2. compare how the local selection state is stored
  3. compare the navigation action that sends the copied plan
  4. compare `src/app/plan.js`
  5. compare where each screen keeps its own data copy
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
- a working lesson-14 style fetch baseline
- one local backend GET request started on detail-screen load
- one local selected-step list on the details screen
- one copied plan snapshot on a second screen
- one visible mismatch when the copied screen changes but the original screen does not

## Minimum lesson-15 pieces
- the fetch success path in `details.js`
- the local selected-step state in `details.js`
- the copied parameter data sent to `plan.js`
- one mismatch clue showing the screens are out of sync

## What is not required for lesson success
- Students do not need Context implementation in this lesson.
- Students do not need POST, PUT, or DELETE requests in this lesson.
- Students do not need authentication in this lesson.
- Students do not need advanced caching or pagination.
- Students do not need to redesign the whole screen layout to succeed.

## Suggested demo sequence
1. Show the home screen briefly to confirm the navigation flow still works.
2. Open the detail screen and wait for the fetched list.
3. Add two study steps locally on the detail screen.
4. Open the plan copy screen.
5. Remove one step there.
6. Go back and show that the detail screen still shows its original local selection count.
