# GHOST MODE

**YOUR WORLD. YOUR RULES.**

A distraction-free session app prototype for desktop browsers, Android and iPhone.

## First build
- Choose a 15, 30, 45 or 60 minute session.
- Create a 4-digit in-app vault PIN.
- Start a timed session with rotating original in-app cinematic screens.
- End a session through the vault PIN.

## Run on a computer (web)
Install Node.js LTS, then open a terminal in this project folder and run:

```bash
npm install
npm run web
```

Expo will show a local browser address (usually http://localhost:8081). Open that address in Chrome, Edge or Firefox.

To create a static web build:

```bash
npm run build:web
```

## Run locally on mobile
```bash
npm install
npx expo start
```

Press `a` in the Expo terminal to launch on an Android emulator, or scan the QR code with Expo Go where supported.

## Important platform limits
The browser version is a web app. It cannot control your computer's system notifications, lock screen, airplane mode or cellular calls. The mobile prototype also does not replace the Android lock screen, prevent the user leaving the app, force Airplane Mode, intercept cellular calls, or replace carrier voicemail. These features depend on operating-system permissions, device configuration and carrier/provider support.

## Product and asset policy
Use original artwork inspired by cinematic game loading screens, not copied GTA/Rockstar artwork, characters, music, logos or recordings. Use licensed human voice actors for any future voicemail greeting pack.

## Current status
Early UI prototype. Not production-ready; test session timing, persistence, accessibility, security and device compatibility before release. The current PIN is held in app memory only and is not yet securely persisted.
