Mobile Driver (Flutter)

Quick start
- Prereqs: Flutter SDK, Android Studio/Xcode, device/emulator.
- Create native scaffolding (android/ios):
  - cd mobile-driver
  - flutter create .
- Install deps and run:
  - flutter pub get
  - For Android Emulator (API dev): edit lib/config.dart BASE_URL if needed, or leave default (10.0.2.2:8081)
  - flutter run -d <device>
  - Si falta el folder android/ios: primero `flutter create .`

Environments
- Dev (docker compose --profile dev): API at http://localhost:8081
  - Android emulator uses http://10.0.2.2:8081
  - iOS simulator uses http://127.0.0.1:8081
- Prod (docker compose --profile prod): API at http://localhost:8080

Notes
- Background location and native permissions require android/ and ios/ folders. After flutter create, review AndroidManifest.xml and Info.plist as commented in code.
- Token is stored via flutter_secure_storage.
- Google Maps requires API keys:
  - Android: add inside <application> in android/app/src/main/AndroidManifest.xml
    <meta-data android:name="com.google.android.geo.API_KEY" android:value="YOUR_ANDROID_MAPS_API_KEY" />
  - iOS: add GMSApiKey in ios/Runner/Info.plist or call GMSServices.provideAPIKey in AppDelegate
  - Ensure billing enabled and Maps SDKs activated in Google Cloud Console.

Features implemented
- Login (POST /auth/login), token persisted.
- Dashboard: toggle ONLINE; shares location periodically via POST /drivers/location.
- Polling /drivers/my-trips/active every 5s; on assignment connects SSE /trips/{id}/sse to receive status updates.
- Actions: accept/arrived/start/complete/reject wired to /trips/{id}/{action}.

Android background (next)
- Foreground Service included via flutter_background_service.
- After `flutter create .`, edit android/app/src/main/AndroidManifest.xml:
  - Add permissions:
    - <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    - <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    - <uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
    - <uses-permission android:name="android.permission.FOREGROUND_SERVICE_LOCATION" />
  - Inside `<application>` add service meta (if required by plugin) and ensure default notification channel exists.
  - Target SDK 34 recommended.
- On ONLINE, the app starts the foreground service and sends location every 15s; stops when OFFLINE.
- Increase cadence to kShareIntervalSec when status is ON_TRIP (simple tweak in background.dart timer or from SSE event).
 - Referencia: `android/AndroidManifest.example.xml` incluye permisos y meta-data de Maps; copia su contenido en tu `android/app/src/main/AndroidManifest.xml` si lo necesitas.

iOS background (next)
- Enable Background Modes > Location updates; throttle intervals appropriately.
- Steps after `flutter create .`:
  1) Open `ios/Runner.xcworkspace` in Xcode.
  2) Targets → Runner → Signing & Capabilities → + Capability → Background Modes → check "Location updates" (y opcional "Background fetch").
  3) Edit `ios/Runner/Info.plist` and add keys:
     - `NSLocationWhenInUseUsageDescription`: Razón para acceder a ubicación.
     - `NSLocationAlwaysAndWhenInUseUsageDescription`: Razón para ubicación en segundo plano.
  4) Prueba en dispositivo real; iOS limita la frecuencia en background y puede suspender si no hay navegación activa. Ajusta intervalos (no muy agresivos) y considera "significant change" si se desea.
  5) Google Maps (iOS): en `ios/Runner/AppDelegate.swift` llama `GMSServices.provideAPIKey("TU_API_KEY")` en `didFinishLaunchingWithOptions`.

Pods / dependencias iOS
- El plugin `google_maps_flutter` instala automáticamente `GoogleMaps` vía CocoaPods.
- Después de `flutter create .`, ejecuta:
  - `cd ios && pod install && cd ..`
  - Abre `ios/Runner.xcworkspace` con Xcode.

Ejemplos de AppDelegate
- Swift: `ios/AppDelegate.swift.example` (importa GoogleMaps y llama GMSServices.provideAPIKey).
- Objective‑C: `ios/AppDelegate.m.example` con el mismo patrón.

Checklist iOS automatizable
- Desde `mobile-driver/` puedes correr:
  - `dart run tool/check_ios_setup.dart`
  - Verifica que `Info.plist` tenga los keys y que `UIBackgroundModes` incluya `location`. También intenta detectar `GMSServices.provideAPIKey`.

Ejemplos
- `ios/Info.plist.example`: muestra los keys mínimos a copiar en tu `Info.plist`.

Local notifications (Android/iOS)
- Ya inicializadas en app (Android channel `driver_assignments`).
- Muestra notificación local cuando hay nuevo viaje asignado (cambio de `tripId`).

Push (FCM)
- Código para registrar token FCM incluido (best-effort). Requiere configurar Firebase:
  - Android: agrega `google-services.json` en `android/app/` y aplica el plugin `com.google.gms.google-services` en `android/app/build.gradle` y classpath en `android/build.gradle`.
  - iOS: agrega `GoogleService-Info.plist` en `ios/Runner/` y habilita capabilities necesarias.
  - Backend: define `FCM_SERVER_KEY` (variable de entorno) para enviar notificaciones reales. Sin esa variable, el backend hace log de intento de envío.

Pantalla de permisos
- La app incluye una pantalla de ayuda para permisos (PermissionsPage). Si el servicio de ubicación está desactivado o el permiso está denegado para siempre, se abrirá esta pantalla para guiar al usuario a Ajustes.
