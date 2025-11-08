import 'dart:io' show Platform;

// Returns the API base URL depending on platform and build mode.
// Priority:
// 1) --dart-define=BASE_URL
// 2) ENV (dev/prod) via --dart-define=ENV=dev|prod
// 3) Platform defaults
String defaultBaseUrl({bool dev = true}) {
  const envBase = String.fromEnvironment('BASE_URL', defaultValue: '');
  if (envBase.isNotEmpty) return envBase;
  const env = String.fromEnvironment('ENV', defaultValue: 'dev');
  if (env == 'dev') dev = true; else if (env == 'prod') dev = false;
  try {
    final port = dev ? '8081' : '8080';
    if (Platform.isAndroid) return 'http://10.0.2.2:' + port;
    if (Platform.isIOS) return 'http://127.0.0.1:' + port;
  } catch (_) {
    // Not mobile or Platform not available; fall through
  }
  return 'http://127.0.0.1:' + (dev ? '8081' : '8080');
}
