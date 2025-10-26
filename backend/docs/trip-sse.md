Trip SSE (Server‑Sent Events)

Overview
- Endpoint: `GET /trips/:id/sse`
- Auth: JWT (Bearer) — must be rider/driver owner of the trip or ADMIN
- Content-Type: `text/event-stream`
- Events delivered as lines starting with `data: {json}\n\n`
- Keep‑alive comments sent every ~15s (`:ka`)

Request
- Headers:
  - `Accept: text/event-stream`
  - `Authorization: Bearer <JWT>`

Example stream
```
data: {"type":"INIT","status":"ASSIGNED","at":"2025-01-01T12:00:00.000Z"}

:ka

data: {"type":"ACCEPTED","status":"ACCEPTED","at":"2025-01-01T12:00:10.000Z"}

data: {"type":"ARRIVED","status":"ARRIVED","at":"2025-01-01T12:01:20.000Z"}

data: {"type":"STARTED","status":"STARTED","at":"2025-01-01T12:02:00.000Z"}

data: {"type":"COMPLETED","status":"COMPLETED","at":"2025-01-01T12:15:30.000Z","data":{"totalUsd":7.8}}

```

Flutter (http.Client) minimal example
```dart
import 'dart:async';
import 'dart:convert';
import 'package:http/http.dart' as http;

Future<StreamSubscription> openTripSse({
  required Uri url,
  required String jwt,
  void Function(Map<String, dynamic> ev)? onEvent,
  void Function(Object err)? onError,
}) async {
  final req = http.Request('GET', url)
    ..headers['Accept'] = 'text/event-stream'
    ..headers['Authorization'] = 'Bearer $jwt';
  final client = http.Client();
  final res = await client.send(req);
  final stream = res.stream.transform(utf8.decoder);
  String buffer = '';
  return stream.listen((chunk) {
    buffer += chunk;
    final parts = buffer.split('\n\n');
    buffer = parts.isNotEmpty ? parts.removeLast() : '';
    for (final part in parts) {
      // skip keep-alive comments
      if (part.startsWith(':')) continue;
      final line = part.split('\n').firstWhere(
        (l) => l.startsWith('data: '),
        orElse: () => '',
      );
      if (line.isEmpty) continue;
      final jsonStr = line.substring(6);
      try {
        final map = json.decode(jsonStr) as Map<String, dynamic>;
        onEvent?.call(map);
      } catch (e) {
        onError?.call(e);
      }
    }
  }, onError: (e) {
    onError?.call(e);
  });
}

// Reconnect strategy: implement exponential backoff on error/close
```

Web (JavaScript) options
- Native `EventSource` does not allow custom headers (no Authorization). Options:
  1) Use a polyfill that supports headers (e.g. `event-source-polyfill`).
  2) Put token in a signed, short‑lived cookie (HTTPOnly) and rely on global security.
  3) Pass token as query param only if unavoidable (less secure; prefer headers/cookies).

Polyfill sample (headers)
```js
import { EventSourcePolyfill } from 'event-source-polyfill';

const es = new EventSourcePolyfill(`/trips/${tripId}/sse`, {
  headers: { Authorization: `Bearer ${jwt}` },
  heartbeatTimeout: 30000,
});
es.onmessage = (e) => {
  // e.data contains the JSON string
  const ev = JSON.parse(e.data);
  console.log('SSE', ev);
};
es.onerror = (e) => {
  console.error('SSE error', e);
  // Optional: close and reconnect with backoff
};
```

Recommendations
- Implement reconnection with exponential backoff (e.g. 1s, 2s, 4s, max 30s).
- Close stream when screen is not visible to save battery/network.
- Keep using push notifications (FCM) for background updates; SSE is best‑effort for foreground.

