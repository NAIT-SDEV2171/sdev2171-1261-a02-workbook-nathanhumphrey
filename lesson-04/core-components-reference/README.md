# Core Components Reference App

This is the lesson-04 instructor reference project.

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
- `View` for structure and grouped sections
- `Text` for headings and instructions
- `Image` for a visual block
- `ScrollView` for screen scrolling
- `TextInput` for basic user input

## What is carryover, not the main focus
- `SafeAreaView`
- `StatusBar`
- `StyleSheet`

These remain from the earlier project baseline. Students do not need to fully understand them yet to succeed in lesson 04.

## Suggested demo sequence
1. Show the screen running.
2. Point out where each core component appears.
3. Remove or add one component block in `src/app/App.js`.
4. Save the file and show the visible result.
5. Leave the app in a known-good state for lesson 05.
