Push Notifications (FCM)

Overview
- Backend exposes endpoints to register and delete the user’s FCM token and sends push notifications on trip events.
- Requires env var `FCM_SERVER_KEY` (legacy HTTP v1 key) on the API.

Endpoints
- POST `/users/me/push-token` (JWT)
  - Body: `{ fcmToken: string }`
  - Response: `{ ok: true }`
- DELETE `/users/me/push-token` (JWT)
  - Response: `{ ok: true }`

Trip Push Events
- ASSIGNED → push to driver: `Nueva solicitud de viaje`
- ACCEPTED → push to rider: `Conductor aceptó tu viaje`
- ARRIVED → push to rider: `Conductor ha llegado`
- STARTED → push to rider: `Viaje iniciado`
- COMPLETED → push to rider: `Viaje completado (total)`

Flutter Integration
1) Setup Firebase
   - Create Firebase project (Android + iOS apps).
   - Configure `google-services.json` (Android) and `GoogleService-Info.plist` (iOS).
   - Add packages: `firebase_core`, `firebase_messaging`.
2) Initialize on app start
   - `await Firebase.initializeApp();`
   - Request notification permissions (iOS): `FirebaseMessaging.instance.requestPermission()`.
3) Get token and register
   - `final token = await FirebaseMessaging.instance.getToken();`
   - Call `POST /users/me/push-token` with Bearer token from login.
4) Handle updates and refresh
   - Listen `onTokenRefresh` and update backend when token changes.
5) Foreground/Background handlers
   - Foreground: `FirebaseMessaging.onMessage.listen(...)`.
   - Background: set up `firebase_messaging` background handler in top-level.

Local Validation
- Ensure DB up and API running.
- Run: `npm run smoke:push-token` (uses rider@taxi.local by default).

