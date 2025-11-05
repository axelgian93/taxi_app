Mobile Rider (Flutter) - Sample using Taxi API SDK

Prerequisites
- Flutter SDK 3.3+
- Backend running locally (http://127.0.0.1:8080)

Setup
1) Install deps
   cd mobile-rider
   flutter pub get

2) Run
   - Android emulator: flutter run (Base URL defaults to http://10.0.2.2:8080)
   - iOS simulator: flutter run (Base URL defaults to http://127.0.0.1:8080)

3) Users (after backend bootstrap)
   rider@taxi.local / 123456

What it does
- Login (obtains JWT and sets it globally)
- Rider: request trip (sample coords), listen SSE for status, cancel
- Driver: accept/arrived/start/complete, refresh my trips, check payment
- Driver: share location manually or via GPS (permissions required)

Notes
- The app depends on the generated Dart SDK at ../backend/docs/dart-sdk (package name taxi_openapi)
- Base URL defaults by platform and persists (SharedPreferences). You can override it in the Login screen.
- For GPS location (Driver): grant location permissions on device/emulator.
  - Android: enable location in emulator; if needed, add mock location.
  - iOS: emulator requires Location set in Features > Location; for real device, ensure permissions.


