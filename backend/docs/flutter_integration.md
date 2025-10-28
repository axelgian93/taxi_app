Flutter integration with Dart SDK

Dependency (pubspec.yaml)

dependencies:
  dio: ^5.7.0
  openapi:
    path: ../backend/docs/dart-sdk

Initialize client

import 'package:openapi/openapi.dart';

class ApiClient {
  static final ApiClient _i = ApiClient._();
  ApiClient._();
  factory ApiClient() => _i;

  final Openapi _open = Openapi();

  void configure({required String baseUrl, String? token}) {
    // Configure all APIs with the same base URL
    for (final api in [
      _open.getAuthApi(),
      _open.getUsersApi(),
      _open.getDriversApi(),
      _open.getTripsApi(),
      _open.getPaymentsApi(),
      _open.getAdminApi(),
    ]) {
      api.dio.options.baseUrl = baseUrl;
      if (token != null && token.isNotEmpty) {
        api.dio.options.headers['Authorization'] = 'Bearer $token';
      } else {
        api.dio.options.headers.remove('Authorization');
      }
    }
  }

  AuthApi get auth => _open.getAuthApi();
  UsersApi get users => _open.getUsersApi();
  DriversApi get drivers => _open.getDriversApi();
  TripsApi get trips => _open.getTripsApi();
  PaymentsApi get payments => _open.getPaymentsApi();
  AdminApi get admin => _open.getAdminApi();
}

Login and request a trip (example)

final api = ApiClient();
api.configure(baseUrl: 'http://localhost:8080');

final login = await api.auth.authLoginPost(
  authLoginRequest: AuthLoginRequest((b) => b
    ..email = 'rider@taxi.local'
    ..password = '123456'),
);

final token = login.data?.token ?? '';
api.configure(baseUrl: 'http://localhost:8080', token: token);

final req = TripsRequestRequest((b) => b
  ..city = 'Guayaquil'
  ..pickupLat = -2.170
  ..pickupLng = -79.922
  ..dropoffLat = -2.190
  ..dropoffLng = -79.890
  ..distanceKm = 5.4
  ..durationMin = 14);

final created = await api.trips.tripsRequestPost(tripsRequestRequest: req);
final tripId = created.data?.trip?.id;

Register push token (FCM)

await api.users.usersRegisterPushTokenPost(
  usersRegisterPushTokenRequest: UsersRegisterPushTokenRequest((b) => b
    ..fcmToken = 'd5x...:APA91bHExampleToken'),
);

Listen to trip SSE (foreground)

import 'dart:convert';
import 'package:http/http.dart' as http;

Future<void> listenTripSse(String baseUrl, String token, String tripId) async {
  final uri = Uri.parse('$baseUrl/trips/$tripId/sse');
  final req = http.Request('GET', uri);
  req.headers['Accept'] = 'text/event-stream';
  req.headers['Authorization'] = 'Bearer $token';
  final client = http.Client();
  final res = await client.send(req);
  final stream = res.stream
      .transform(utf8.decoder)
      .transform(const LineSplitter());
  var buffer = StringBuffer();
  stream.listen((line) {
    if (line.isEmpty) {
      final payload = buffer.toString();
      buffer.clear();
      final dataLine = payload.split('\n').firstWhere(
        (l) => l.startsWith('data: '),
        orElse: () => '',
      );
      if (dataLine.isNotEmpty) {
        final jsonStr = dataLine.substring(6);
        // Handle event JSON
        // print('SSE: $jsonStr');
      }
    } else {
      buffer.writeln(line);
    }
  });
}

Driver location/status update

await api.drivers.driverUpdateLocationPost(
  body: DriverUpdateStatusRequest((b) => b
    ..lat = -2.170
    ..lng = -79.922
    ..status = 'IDLE'),
);

Notes
- If your Flutter app runs on a device/emulator, replace baseUrl with your machine IP instead of localhost.
- For Android emulator, use http://10.0.2.2:8080; for iOS simulator, http://127.0.0.1:8080.
