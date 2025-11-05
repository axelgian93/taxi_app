import 'dart:io' show Platform;

String defaultBaseUrl() {
  try {
    if (Platform.isAndroid) return 'http://10.0.2.2:8080';
    if (Platform.isIOS) return 'http://127.0.0.1:8080';
  } catch (_) {
    // Not mobile or Platform not available; fall through
  }
  return 'http://127.0.0.1:8080';
}

