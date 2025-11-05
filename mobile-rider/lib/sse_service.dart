import 'dart:async';
import 'dart:convert';
import 'dart:math' as math;
import 'package:http/http.dart' as http;

typedef TripEventHandler = void Function(Map<String, dynamic> ev);

class SseSubscription {
  final StreamSubscription _sub;
  final http.Client _client;
  SseSubscription(this._sub, this._client);
  void cancel() {
    _sub.cancel();
    _client.close();
  }
}

Future<SseSubscription> listenTripSse({
  required String baseUrl,
  required String token,
  required String tripId,
  required TripEventHandler onEvent,
}) async {
  final uri = Uri.parse('$baseUrl/trips/$tripId/sse');
  final req = http.Request('GET', uri);
  req.headers['Accept'] = 'text/event-stream';
  req.headers['Authorization'] = 'Bearer $token';
  final client = http.Client();
  final res = await client.send(req);
  final stream = res.stream.transform(utf8.decoder).transform(const LineSplitter());

  final buffer = StringBuffer();
  final sub = stream.listen((line) {
    if (line.isEmpty) {
      final payload = buffer.toString();
      buffer.clear();
      final dataLine = payload.split('\n').firstWhere((l) => l.startsWith('data: '), orElse: () => '');
      if (dataLine.isNotEmpty) {
        final jsonStr = dataLine.substring(6);
        try {
          final obj = json.decode(jsonStr) as Map<String, dynamic>;
          onEvent(obj);
        } catch (_) {}
      }
    } else {
      buffer.writeln(line);
    }
  });
  return SseSubscription(sub, client);
}

typedef StatusHandler = void Function(String status);

class SseAutoSubscription {
  final String baseUrl;
  final String token;
  final String tripId;
  final TripEventHandler onEvent;
  final StatusHandler? onStatus;

  http.Client? _client;
  StreamSubscription<String>? _sub;
  bool _closed = false;
  int _attempt = 0;

  SseAutoSubscription({
    required this.baseUrl,
    required this.token,
    required this.tripId,
    required this.onEvent,
    this.onStatus,
  });

  Timer? _inactivity;
  static const _inactivityTimeoutSec = 25;

  void _bumpInactivityWatch() {
    _inactivity?.cancel();
    _inactivity = Timer(const Duration(seconds: _inactivityTimeoutSec), () {
      if (_closed) return;
      // Consider connection stale; force reconnect
      try { _sub?.cancel(); } catch (_) {}
      try { _client?.close(); } catch (_) {}
      _scheduleReconnect();
    });
  }

  Future<void> _connect() async {
    if (_closed) return;
    onStatus?.call('connecting');
    try {
      final uri = Uri.parse('$baseUrl/trips/$tripId/sse');
      final req = http.Request('GET', uri);
      req.headers['Accept'] = 'text/event-stream';
      req.headers['Authorization'] = 'Bearer $token';
      final client = http.Client();
      _client = client;
      final res = await client.send(req);
      if (res.statusCode != 200) {
        // Backoff on non-success
        _scheduleReconnect();
        return;
      }
      onStatus?.call('connected');
      _attempt = 0;
      final stream = res.stream.transform(utf8.decoder).transform(const LineSplitter());
      final buffer = StringBuffer();
      _sub = stream.listen((line) {
        _bumpInactivityWatch();
        if (line.isEmpty) {
          final payload = buffer.toString();
          buffer.clear();
          final dataLine = payload.split('\n').firstWhere((l) => l.startsWith('data: '), orElse: () => '');
          if (dataLine.isNotEmpty) {
            final jsonStr = dataLine.substring(6);
            try {
              final obj = json.decode(jsonStr) as Map<String, dynamic>;
              onEvent(obj);
            } catch (_) {}
          }
        } else {
          buffer.writeln(line);
        }
      }, onError: (_) {
        _scheduleReconnect();
      }, onDone: () {
        _scheduleReconnect();
      }, cancelOnError: true);
    } catch (_) {
      _scheduleReconnect();
    }
  }

  void _scheduleReconnect() {
    if (_closed) return;
    onStatus?.call('reconnecting');
    _attempt += 1;
    final base = math.min(30, 1 << (_attempt <= 5 ? _attempt : 5));
    final jitter = (base / 3).floor();
    final delaySec = base + (jitter > 0 ? math.Random().nextInt(jitter) : 0);
    Future.delayed(Duration(seconds: delaySec), () {
      if (_closed) return;
      _disposeCurrent();
      _connect();
    });
  }

  void _disposeCurrent() {
    try { _sub?.cancel(); } catch (_) {}
    try { _client?.close(); } catch (_) {}
    try { _inactivity?.cancel(); } catch (_) {}
    _sub = null;
    _client = null;
  }

  Future<void> start() => _connect();

  void cancel() {
    _closed = true;
    _disposeCurrent();
    onStatus?.call('closed');
  }
}

Future<SseAutoSubscription> listenTripSseAutoReconnect({
  required String baseUrl,
  required String token,
  required String tripId,
  required TripEventHandler onEvent,
  StatusHandler? onStatus,
}) async {
  final sub = SseAutoSubscription(
    baseUrl: baseUrl,
    token: token,
    tripId: tripId,
    onEvent: onEvent,
    onStatus: onStatus,
  );
  await sub.start();
  return sub;
}
