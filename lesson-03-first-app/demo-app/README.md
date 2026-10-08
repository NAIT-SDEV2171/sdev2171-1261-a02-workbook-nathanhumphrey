# First Expo App Reference

This is the lesson-03 instructor reference project.

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
5. Open the app on one prepared path:
   - Android emulator with the installed development build
   - iOS simulator on macOS with the installed development build
   - prepared physical-device path if already available for SDK 56

## Suggested demo edits
- change the title text in `src/app/App.js`
- change the sentence under "What to notice"
- add one extra `Text` block inside the checklist card
- change one color value in the style object

## Important comparison note
Students generating a new blank project will see a simpler default screen first. This reference app is intentionally more polished so the instructor can point out files, visible edits, and reload behaviour more clearly.

## Why this project is minimal
The course intentionally keeps lesson 03 on a blank project structure. Navigation and more complex scaffolding are introduced later.

## Runtime note
- Lesson 03 shows both Expo Go and development builds conceptually.
- The actual course workflow from this point forward should use the development-build path by default.
