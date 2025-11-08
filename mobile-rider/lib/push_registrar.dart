import 'dart:io';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'api_client.dart';

class PushRegistrar {
  final ApiClient api;
  PushRegistrar(this.api);

  Future<void> registerIfPossible({String role = 'RIDER'}) async {
    try {
      if (Platform.isIOS) {
        await FirebaseMessaging.instance.requestPermission();
      }
      final token = await FirebaseMessaging.instance.getToken();
      if (token == null || token.isEmpty) return;
      final platform = Platform.isAndroid ? 'android' : 'ios';
      await api.post('/push/register', { 'token': token, 'platform': platform, 'role': role });
    } catch (_) {}
  }
}

