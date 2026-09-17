# Environment Check App

This is the lesson-02 verification app.

## Course Baseline

This lesson uses a provided verification app so the class can validate one shared workflow before making project-creation choices in lesson 03.

The runnable lesson screen lives in `App.js`.

## Run
From the repo root, open:
- `lesson-02/environment-check-app`

1. Install dependencies:
   - `npm install`
2. Add dev-client support:
   - `npx expo install expo-dev-client`
3. Create and install a development build:
   - `npm run android:dev`
   - or `npm run ios:dev`
4. Start Expo:
   - `npm run start`
5. Open the installed development build on:
   - Android emulator, or
   - iOS simulator on macOS, or
   - a prepared physical-device path if the instructor has one ready for SDK 56
6. If a physical-device path is not already prepared:
   - stay on emulator or simulator for the shared classroom workflow

## What Counts As Verified
You are `verified` when:
- the app opens successfully
- the verification screen renders
- you can toggle the environment checks on screen