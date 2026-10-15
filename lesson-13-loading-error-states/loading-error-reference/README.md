# Loading And Error States Reference App

This is the lesson-13 instructor reference project.

## Recovery use during class
- This project is a known-good comparison app for the lesson-13 loading and error build.
- If a student is blocked, the fallback path is to inspect these files with the instructor:
  - `src/app/_layout.tsx`
  - `src/app/index.js`
  - `src/app/details.js`
  - `src/lib/apiBaseUrl.js`
- The preferred recovery loop is compare and repair:
  1. compare your own `src/app/details.js` to this reference
  2. compare the API base URL helper
  3. compare state values for loading and error
  4. compare the request helper
  5. compare the `useEffect` trigger
  6. compare the conditional rendering branches
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
- a working lesson-12 style two-screen baseline
- one local backend GET request started on detail-screen load
- one visible loading state
- one visible success state
- one visible error state with retry

## Minimum lesson-13 pieces in `details.js`
- the `isLoading` state value
- the `errorMessage` state value
- the request helper setting loading before the request and clearing it after
- the `try/catch` error branch
- the conditional rendering branches for loading, success, and error

## What is not required for lesson success
- Students do not need POST, PUT, or DELETE requests in this lesson.
- Students do not need authentication in this lesson.
- Students do not need advanced caching or pagination.
- Students do not need to redesign the whole screen layout to succeed.

## Suggested demo sequence
1. Show the home screen briefly to confirm the navigation flow still works.
2. Open the detail screen and point out the visible loading state.
3. Wait for the success state and show the rendered list.
4. Use `Simulate error` to trigger the local backend error path.
5. Use `Try again` to recover and confirm navigation still works.
