# Forms Flow Reference App

This is the lesson-17 instructor reference project.

## Recovery use during class
- This project is a known-good comparison app for the lesson-17 form and shared-state workflow.
- If a student is blocked, the fallback path is to inspect these files with the instructor:
  - `src/app/_layout.tsx`
  - `src/app/index.js`
  - `src/app/details.js`
  - `src/app/session-form.js`
  - `src/app/plan.js`
  - `src/context/StudyPlanContext.js`
  - `src/lib/apiBaseUrl.js`
- The preferred recovery loop is compare and repair:
  1. compare your own `src/app/session-form.js` to this reference
  2. compare which values stay local while typing
  3. compare the validation checks
  4. compare how submit saves the committed result into Context
  5. compare how `plan.js` displays the saved shared result
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
- a working lesson-16 style shared-state baseline
- one local backend GET request started on detail-screen load
- one shared selected-step list owned by Context
- one local-draft form with controlled inputs
- one simple validation path
- one committed saved session result visible across screens

## Minimum lesson-17 pieces
- the fetch success path in `details.js`
- the local draft form state in `session-form.js`
- the validation checks in `session-form.js`
- the shared save path in `src/context/StudyPlanContext.js`
- the saved shared result shown in `plan.js`

## What is not required for lesson success
- Students do not need POST, PUT, or DELETE requests in this lesson.
- Students do not need authentication in this lesson.
- Students do not need advanced caching or pagination.
- Students do not need to redesign the whole screen layout to succeed.

## Suggested demo sequence
1. Show the home screen briefly to confirm the navigation flow still works.
2. Open the detail screen and wait for the fetched list.
3. Add at least one study step on the details screen.
4. Open the session form.
5. Try one invalid submit to show validation.
6. Enter a valid title and submit.
7. Show the saved result on the summary screen.
