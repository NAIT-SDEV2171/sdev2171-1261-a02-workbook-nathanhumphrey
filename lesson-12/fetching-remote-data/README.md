# Fetching Remote Data Reference App

This is the lesson-12 instructor reference project.

## Recovery use during class
- This project is a known-good comparison app for the lesson-12 fetch build.
- If a student is blocked, the fallback path is to inspect these files with the instructor:
  - `src/app/_layout.tsx`
  - `src/app/index.js`
  - `src/app/details.js`
- The preferred recovery loop is compare and repair:
  1. compare your own `src/app/details.js` to this reference
  2. compare imports
  3. compare state values
  4. compare the request helper
  5. compare the `useEffect` trigger
  6. compare the list render output
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
- a working lesson-10 style two-screen baseline
- one remote GET request started on detail-screen load
- one response mapping step that converts remote JSON into list items
- one rendered list based on remote API data

## Minimum lesson-12 pieces in `details.js`
- the `useEffect` import
- the `remoteSteps` state value
- the request helper
- the `useEffect` trigger
- the `FlatList` data source using remote state

## Extra polish not required for lesson success
- the styled empty-state card
- the exact visual text choices
- any nonessential spacing or color styling

## What is not required for lesson success
- Students do not need POST, PUT, or DELETE requests in this lesson.
- Students do not need authentication in this lesson.
- Students do not need full loading or error UI in this lesson.
- Students do not need advanced caching or pagination.

## Suggested demo sequence
1. Show the home screen briefly to confirm the navigation flow still works.
2. Open the detail screen and point out the empty state before the response arrives.
3. Show the terminal log clue and the rendered remote list.
4. Point to the request helper, the `useEffect` trigger, and the mapped item shape.
5. Confirm navigation still works before leaving the app in a known-good state.
