import 'dart:io' show Platform;

class Env {
  static const _env = String.fromEnvironment('ENV', defaultValue: 'dev');
  static const _baseOverride = String.fromEnvironment('BASE_URL', defaultValue: '');
  static bool get devMode => _env == 'dev';
  static String baseUrl({bool? dev}) {
    if (_baseOverride.isNotEmpty) return _baseOverride;
    final isDev = dev ?? devMode;
    final port = isDev ? '8081' : '8080';
    try {
      if (Platform.isAndroid) return 'http://10.0.2.2:$port';
      if (Platform.isIOS) return 'http://127.0.0.1:$port';
    } catch (_) {}
    return 'http://127.0.0.1:$port';
  }
}

const int kShareIntervalSec = 10; // driver location share interval when ON_TRIP
const int kIdleIntervalSec = 60; // driver location share interval when IDLE
