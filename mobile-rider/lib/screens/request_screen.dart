import 'dart:async';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';
import 'package:taxi_openapi/taxi_openapi.dart';
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
  dynamic _sse; // subscription handle
  LatLng? _driverPos;
  DateTime? _lastLocAt;
  bool _verified = true;

  @override
  void initState() {
    super.initState();
    _checkVerified();
  }

  Future<void> _checkVerified() async {
    try {
      final ok = await ApiClient().isEmailVerified();
      if (mounted) setState(() { _verified = ok; });
    } catch (_) {}
  }

  @override
  void dispose() {
    _sse?.cancel();
    super.dispose();
  }

  Future<void> _request() async {
    setState(() {
      _busy = true;
      _error = null;
      _tripId = null;
      _status = '-';
    });
    try {
      final api = ApiClient();
      final req = TripsRequestRequest((b) {
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
      setState(() {
        _tripId = id;
        _status = (resp.data?.trip?.status?.toString() ?? 'REQUESTED');
      });
      // Save to recent trips
      try {
        final prefs = await SharedPreferences.getInstance();
        final list = prefs.getStringList('recent_trips') ?? <String>[];
        if (!list.contains(id)) {
          list.insert(0, id);
          while (list.length > 10) { list.removeLast(); }
          await prefs.setStringList('recent_trips', list);
        }
      } catch (_) {}
      await _startSse();
    } catch (e) {
      final msg = e.toString();
      // If backend enforces verified email, guide user
      if (msg.contains('403') || msg.toLowerCase().contains('not verified')) {
        setState(() { _error = 'Email not verified. Please verify your email.'; });
      } else {
        setState(() { _error = 'Request failed: $e'; });
      }
    } finally {
      setState(() {
        _busy = false;
      });
    }
  }

  Future<void> _cancel() async {
    if (_tripId == null) return;
    try {
      final api = ApiClient();
      await api.trips.tripsCancel(
        id: _tripId!,
        tripsCancelRequest: TripsCancelRequest((b) => b.reason = 'USER_REQUEST'),
      );
    } catch (e) {
      setState(() {
        _error = 'Cancel failed: $e';
      });
    }
  }

  Future<void> _startSse() async {
    final id = _tripId;
    if (id == null) return;
    _sse?.cancel();
    final api = ApiClient();
    _sse = await listenTripSseAutoReconnect(
      baseUrl: api.baseUrl,
      token: api.token ?? '',
      tripId: id,
      onEvent: (ev) {
        final t = (ev['type'] ?? '') as String?;
        if (t == 'LOCATION') {
          final data = ev['data'] as Map<String, dynamic>?;
          final lat = data?['lat'];
          final lng = data?['lng'];
          if (lat is num && lng is num) {
            final now = DateTime.now();
            final last = _lastLocAt;
            if (last == null || now.difference(last).inMilliseconds >= 1000) {
              setState(() {
                _driverPos = LatLng(lat.toDouble(), lng.toDouble());
                _lastLocAt = now;
              });
            }
          }
          return;
        }
        final s = (ev['status'] ?? ev['type'] ?? '') as String?;
        if (s != null && s.isNotEmpty) {
          setState(() => _status = s);
        }
      },
      onStatus: (_) {},
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Taxi Rider - Request'),
        actions: [
          IconButton(
            onPressed: () async {
              final prefs = await SharedPreferences.getInstance();
              await prefs.remove('auth_token');
              await prefs.remove('refresh_token');
              if (!mounted) return;
              Navigator.of(context).pushNamedAndRemoveUntil('/', (route) => false);
            },
            icon: const Icon(Icons.logout),
            tooltip: 'Logout',
          ),
        ],
      ),
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
            Row(children: [
              const Text('Preferred payment:'),
              const SizedBox(width: 8),
              DropdownButton<String>(
                value: _riderMethod,
                items: const [DropdownMenuItem(value: 'CASH', child: Text('CASH'))],
                onChanged: (v) {
                  if (v != null) setState(() => _riderMethod = v);
                },
              ),
            ]),
            const SizedBox(height: 8),
            Row(children: [
              Expanded(child: TextField(controller: _dist, decoration: const InputDecoration(labelText: 'Distance Km'))),
              const SizedBox(width: 8),
              Expanded(child: TextField(controller: _dur, decoration: const InputDecoration(labelText: 'Duration Min'))),
            ]),
            const SizedBox(height: 12),
            if (_error != null) ...[
              Row(children:[
                Expanded(child: Text(_error!, style: const TextStyle(color: Colors.red))),
                if ((_error??'').toLowerCase().contains('not verified'))
                  TextButton(
                    onPressed: () => Navigator.of(context).pushNamed('/verify'),
                    child: const Text('Verify now'),
                  ),
              ])
            ],
            const SizedBox(height: 12),
            Row(children: [
              ElevatedButton(onPressed: _busy || !_verified ? null : _request, child: const Text('Request Trip')),
              const SizedBox(width: 12),
              ElevatedButton(onPressed: _tripId == null ? null : _cancel, child: const Text('Cancel Trip')),
              const SizedBox(width: 12),
              ElevatedButton(
                onPressed: _tripId == null ? null : () {
                  if (_tripId == null) return;
                  Navigator.of(context).pushNamed('/receipt', arguments: _tripId);
                },
                child: const Text('View Receipt'),
              ),
            ]),
            const SizedBox(height: 24),
            Text('Trip ID: ${_tripId ?? '-'}'),
            Text('Status: $_status'),
            const SizedBox(height: 12),
            SizedBox(
              height: 240,
              child: FlutterMap(
                options: MapOptions(
                  initialCenter: LatLng(
                    double.tryParse(_pickupLat.text) ?? 0,
                    double.tryParse(_pickupLng.text) ?? 0,
                  ),
                  initialZoom: 13,
                ),
                children: [
                  TileLayer(
                    urlTemplate: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                    subdomains: const ['a', 'b', 'c'],
                  ),
                  MarkerLayer(markers: [
                    Marker(
                      point: LatLng(
                        double.tryParse(_pickupLat.text) ?? 0,
                        double.tryParse(_pickupLng.text) ?? 0,
                      ),
                      width: 24,
                      height: 24,
                      child: const Icon(Icons.flag, color: Colors.green),
                    ),
                    Marker(
                      point: LatLng(
                        double.tryParse(_dropLat.text) ?? 0,
                        double.tryParse(_dropLng.text) ?? 0,
                      ),
                      width: 24,
                      height: 24,
                      child: const Icon(Icons.flag, color: Colors.red),
                    ),
                    if (_driverPos != null)
                      Marker(
                        point: _driverPos!,
                        width: 28,
                        height: 28,
                        child: const Icon(Icons.local_taxi, color: Colors.orange),
                      ),
                  ]),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
