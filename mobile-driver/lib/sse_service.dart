import 'dart:async';
import 'package:sse_client/sse_client.dart';
import 'dart:convert';

typedef OnEvent = void Function(Map<String, dynamic> data);

class DriverSseService {
  SseClient? _client;
  StreamSubscription? _sub;

  void connect(String url, {required String token, required OnEvent onEvent}) {
    close();
    _client = SseClient.connect(Uri.parse(url), headers: {'Authorization': 'Bearer $token'});
    _sub = _client!.stream.listen((msg) {
      try {
        onEvent(_parse(msg));
      } catch (_) {}
    }, onError: (_) {}, onDone: () {});
  }

  void close() {
    _sub?.cancel();
    _sub = null;
    _client?.close();
    _client = null;
  }

  Map<String, dynamic> _parse(String raw) {
    // naive: expect JSON per line
    return raw.isNotEmpty ? (raw == 'ping' ? {'type': 'ping'} : (raw[0] == '{' ? _tryJson(raw) : {'raw': raw})) : {};
  }

  Map<String, dynamic> _tryJson(String s) {
    try {
      return Map<String, dynamic>.from(jsonDecode(s));
    } catch (_) { return {'raw': s}; }
  }
}
