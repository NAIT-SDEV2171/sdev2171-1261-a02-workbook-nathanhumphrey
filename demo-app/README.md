Attempt to install the `expo-image-picker` package:

```sh
npx expo install expo-image-picker
```

You will likely receive a dependency issue.

To install packages and avoid older dependencies causing issues, run the following commands: 

1. Remove `node_modules` and `package-lock.json`, then install using `--legacy-peer-deps` so `npm` completes installation despite the `react-dom` / `worklets` peer mismatch:

```sh
rm -rf node_modules package-lock.json && npm install --legacy-peer-deps
```
2. Generate the Android native project with the `expo-image-picker` config plugin applied and launch directly on your Android emulator or connected device:

```sh
npx expo prebuild --platform android --clean && npx expo run:android
```