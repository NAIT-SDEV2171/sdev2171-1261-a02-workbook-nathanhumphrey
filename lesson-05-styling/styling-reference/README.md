# Styling Reference App

This is the lesson-05 instructor reference project.

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

## What this screen demonstrates
- container spacing with `padding` and `gap`
- text hierarchy with `fontSize`, `fontWeight`, and `lineHeight`
- simple surfaces using borders, background color, and radius
- one alignment pattern using Flexbox

## What is not required for lesson success
- Some properties in this reference app are extra polish, not lesson-minimum requirements.
- Students do not need to copy every property they see.
- The lesson minimum is clear spacing, readable text hierarchy, one deliberate alignment choice, and a stable screen for lesson 06.

## Suggested demo sequence
1. Show the lesson-04 version briefly if needed.
2. Run the styled screen and point out spacing, hierarchy, and alignment changes.
3. Remove or change one style group in `src/app/App.js`.
4. Save the file and show the visible result.
5. Leave the app in a known-good state for lesson 06.
