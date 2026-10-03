# AppNavi

AppNavi is a React Native application built with Expo and TypeScript.

## Requirements

- Node.js (LTS recommended)
- npm
- Expo Go on a device, or an Android emulator / iOS simulator

## Getting started

Install dependencies and start the Expo development server:

```sh
npm install
npm start
```

Use the QR code to open the app in Expo Go, or start a platform target directly:

```sh
npm run android
npm run ios
npm run web
```

Building for iOS locally requires macOS and Xcode. Android development requires
Android Studio and an emulator or connected device.

## Project structure

- `App.tsx` — root React Native component
- `index.ts` — registers the app with Expo
- `app.json` — Expo application and platform configuration
- `assets/` — app icon, splash image, and web favicon

This project uses Expo's managed workflow. Native `ios/` and `android/`
projects can be generated from the Expo configuration when needed:

```sh
npx expo prebuild
```

Run the TypeScript check with:

```sh
npm run typecheck
```
