Mobile Rider (Flutter) - Sample using Taxi API SDK

Prerequisites
- Flutter SDK 3.3+
- Backend running locally on http://localhost:8080 (Docker compose or npm run dev)

Setup
1) Install deps
   cd mobile-rider
   flutter pub get

2) Run (Android emulator)
   flutter run
   In Login, base URL = http://10.0.2.2:8080

3) Users (after backend bootstrap)
   rider@taxi.local / 123456

What it does
- Login (obtains JWT and sets it globally)
- Request trip with sample coordinates
- Opens SSE to receive live trip events (status updates)
- Cancel button to invoke /trips/:id/cancel

Notes
- For iOS Simulator use base URL http://127.0.0.1:8080
- The app depends on the generated Dart SDK at ../backend/docs/dart-sdk


