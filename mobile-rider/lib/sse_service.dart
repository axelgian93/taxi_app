import 'dart:async';
import 'dart:convert';
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

