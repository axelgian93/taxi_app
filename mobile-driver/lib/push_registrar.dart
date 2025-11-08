import 'dart:io';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'api_client.dart';

class PushRegistrar {
  final ApiClient api;
  PushRegistrar(this.api);

  Future<void> registerIfPossible({String platform = 'android', String role = 'DRIVER'}) async {
    try {
      // Request permission (iOS)
      if (Platform.isIOS) {
        await FirebaseMessaging.instance.requestPermission();
      }
      final token = await FirebaseMessaging.instance.getToken();
      if (token == null || token.isEmpty) return;
      await api.postJson('/push/register', { 'token': token, 'platform': platform, 'role': role });
    } catch (_) {
      // ignore if Firebase not configured
    }
  }

  Future<void> unregisterIfPossible({required String token}) async {
    try { await api.postJson('/push/unregister', { 'token': token }); } catch (_) {}
  }
}

