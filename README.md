# GHOST MODE

**YOUR WORLD. YOUR RULES.**

An Android-first distraction-free session app, with a future path to iPhone and Huawei devices.

## First build
- Choose a 15, 30, 45 or 60 minute session.
- Create a 4-digit in-app vault PIN.
- Start a timed session with rotating original in-app loading-screen concepts.
- End a session through the vault PIN.

## Run locally

```bash
npm install
npx expo start
```

Press `a` in the Expo terminal to launch on an Android emulator, or scan the QR code with Expo Go where supported.

## Important platform limits
This prototype does not replace the Android lock screen, prevent the user leaving the app, force Airplane Mode, intercept cellular calls, or replace carrier voicemail. Android notification controls and kiosk-style behavior require additional permissions/device-owner configuration and must be implemented and tested separately. iOS has stricter limits on system-wide control. Carrier voicemail greetings depend on the carrier or a compatible telephony provider.

## Product and asset policy
Use original artwork inspired by cinematic game loading screens, not copied GTA/Rockstar artwork, characters, music, logos or recordings. Use licensed human voice actors for any future voicemail greeting pack.

## Current status
Early UI prototype. Not production-ready; test session timing, persistence, accessibility, security and device compatibility before release. The current PIN is held in app memory only and is not yet securely persisted.
