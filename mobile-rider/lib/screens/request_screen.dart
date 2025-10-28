import 'dart:async';
import 'package:flutter/material.dart';
import 'package:openapi/openapi.dart';
import '../api_client.dart';
import '../sse_service.dart';

class RequestScreen extends StatefulWidget {
  const RequestScreen({super.key});
  @override
  State<RequestScreen> createState() => _RequestScreenState();
}

class _RequestScreenState extends State<RequestScreen> {
  final _cityCtrl = TextEditingController(text: 'Guayaquil');
  final _pickupLat = TextEditingController(text: '-2.170');
  final _pickupLng = TextEditingController(text: '-79.922');
  final _dropLat = TextEditingController(text: '-2.190');
  final _dropLng = TextEditingController(text: '-79.890');
  final _dist = TextEditingController(text: '5.4');
  final _dur = TextEditingController(text: '14');
  String _riderMethod = 'CASH';

  String? _tripId;
  String _status = '-';
  bool _busy = false;
  String? _error;
  SseSubscription? _sse;

  @override
  void dispose() {
    _sse?.cancel();
    super.dispose();
  }

  Future<void> _request() async {
    setState(() { _busy = true; _error = null; _tripId = null; _status = '-'; });
    try {
      final api = ApiClient();
      final req = TripsRequestRequest((TripsRequestRequestBuilder b) {
        b.city = _cityCtrl.text.trim();
        b.pickupLat = double.parse(_pickupLat.text);
        b.pickupLng = double.parse(_pickupLng.text);
        b.dropoffLat = double.parse(_dropLat.text);
        b.dropoffLng = double.parse(_dropLng.text);
        b.distanceKm = double.parse(_dist.text);
        b.durationMin = int.parse(_dur.text);
      });
      final resp = await api.trips.tripsRequest(tripsRequestRequest: req);
      final id = resp.data?.trip?.id;
      if (id == null || id.isEmpty) throw Exception('Empty tripId');
      setState(() { _tripId = id; _status = (resp.data?.trip?.status?.toString() ?? 'REQUESTED'); });
      _startSse();
    } catch (e) {
      setState(() { _error = 'Request failed: $e'; });
    } finally {
      setState(() { _busy = false; });
    }
  }

  Future<void> _cancel() async {
    if (_tripId == null) return;
    try {
      final api = ApiClient();
      await api.trips.tripsCancel(id: _tripId!, tripsCancelRequest: TripsCancelRequest((TripsCancelRequestBuilder b) { b.reason = 'USER_REQUEST'; }));
    } catch (e) {
      setState(() { _error = 'Cancel failed: $e'; });
    }
  }

  Future<void> _startSse() async {
    final id = _tripId; if (id == null) return;
    _sse?.cancel();
    final api = ApiClient();
    _sse = await listenTripSse(
      baseUrl: api.baseUrl,
      token: api.token ?? '',
      tripId: id,
      onEvent: (ev) {
        final s = (ev['status'] ?? ev['type'] ?? '') as String?;
        if (s != null && s.isNotEmpty) {
          setState(() { _status = s; });
        }
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Taxi Rider - Request')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            TextField(controller: _cityCtrl, decoration: const InputDecoration(labelText: 'City')),
            Row(children: [
              Expanded(child: TextField(controller: _pickupLat, decoration: const InputDecoration(labelText: 'Pickup Lat'))),
              const SizedBox(width: 8),
              Expanded(child: TextField(controller: _pickupLng, decoration: const InputDecoration(labelText: 'Pickup Lng'))),
            ]),
            const SizedBox(height: 8),
            Row(children: [
              Expanded(child: TextField(controller: _dropLat, decoration: const InputDecoration(labelText: 'Dropoff Lat'))),
              const SizedBox(width: 8),
              Expanded(child: TextField(controller: _dropLng, decoration: const InputDecoration(labelText: 'Dropoff Lng'))),
            ]),
            const SizedBox(height: 8),
            Row(children:[
              const Text('Preferred payment:'),
              const SizedBox(width: 8),
              DropdownButton<String>(
                value: _riderMethod,
                items: const [
                  DropdownMenuItem(value: 'CASH', child: Text('CASH')),
                  DropdownMenuItem(value: 'CARD', child: Text('CARD')),
                ],
                onChanged: (v){ if (v!=null) setState((){ _riderMethod = v; }); },
              )
            ]),
            const SizedBox(height: 8),
            Row(children: [
              Expanded(child: TextField(controller: _dist, decoration: const InputDecoration(labelText: 'Distance Km'))),
              const SizedBox(width: 8),
              Expanded(child: TextField(controller: _dur, decoration: const InputDecoration(labelText: 'Duration Min'))),
            ]),
            const SizedBox(height: 12),
            if (_error != null) Text(_error!, style: const TextStyle(color: Colors.red)),
            const SizedBox(height: 12),
            Row(children: [
              ElevatedButton(onPressed: _busy ? null : _request, child: const Text('Request Trip')),
              const SizedBox(width: 12),
              ElevatedButton(onPressed: _tripId==null ? null : _cancel, child: const Text('Cancel Trip')),
            ]),
            const SizedBox(height: 24),
            Text('Trip ID: ${_tripId ?? '-'}'),
            Text('Status: $_status'),
          ],
        ),
      ),
    );
  }
}
