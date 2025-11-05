import '../config.dart';
import 'dart:async';
import 'package:flutter/material.dart';
import 'package:taxi_openapi/taxi_openapi.dart';
import 'package:geolocator/geolocator.dart';

import '../api_client.dart';

class DriverScreen extends StatefulWidget {
  final ValueNotifier<bool>? visibleNotifier;
  const DriverScreen({super.key, this.visibleNotifier});
  @override
  State<DriverScreen> createState() => _DriverScreenState();
}

class _DriverScreenState extends State<DriverScreen> {
  final _tripIdCtrl = TextEditingController();
  String _status = '-';
  String? _error;
  bool _busy = false;
  Timer? _timer;
  List<Map<String, dynamic>> _items = const [];
  String _payMethod = 'CASH';

  // Location sharing
  final _latCtrl = TextEditingController(text: '0');
  final _lngCtrl = TextEditingController(text: '0');
  bool _sharing = false;
  Timer? _locTimer;
  bool _gpsSharing = false;

  Future<void> _call(Future<void> Function(String id) f) async {
    setState(() { _busy = true; _error = null; });
    try {
      final id = _tripIdCtrl.text.trim();
      if (id.isEmpty) throw Exception('Enter trip id');
      await f(id);
      setState(() { _status = 'OK'; });
    } catch (e) {
      setState(() { _error = e.toString(); });
    } finally {
      setState(() { _busy = false; });
    }
  }

  Future<void> _loadTrips() async {
    try {
      final api = ApiClient();
      final res = await api.drivers.driverMyTripsActive();
      final data = res.data;
      final items = (data?.items?.toList() ?? const [])
          .map((e) => {
                'id': e.id ?? '',
                'status': e.status ?? '',
              })
          .toList();
      if (!mounted) return;
      setState(() { _items = items; });
    } catch (e) {
      if (mounted) setState(() { _error = 'Load trips failed: $e'; });
    }
  }

  void _startAuto() {
    _timer?.cancel();
    _timer = Timer.periodic(const Duration(seconds: 10), (_) => _loadTrips());
  }

  void _stopAuto() {
    _timer?.cancel();
    _timer = null;
  }

  @override
  void initState() {
    super.initState();
    widget.visibleNotifier?.addListener(() {
      final vis = widget.visibleNotifier!.value;
      if (vis) {
        _loadTrips();
        _startAuto();
      } else {
        _stopAuto();
      }
    });
  }

  @override
  void dispose() {
    _stopAuto();
    _stopShare();
    super.dispose();
  }

  Future<void> _sendLocationOnce() async {
    try {
      final api = ApiClient();
      final lat = double.tryParse(_latCtrl.text.trim()) ?? 0;
      final lng = double.tryParse(_lngCtrl.text.trim()) ?? 0;
      await api.drivers.driverUpdateLocation(
        driverUpdateStatusRequest: DriverUpdateStatusRequest((b) {
          b.lat = lat;
          b.lng = lng;
          b.status = DriverUpdateStatusRequestStatusEnum.IDLE;
        }),
      );
    } catch (e) {
      if (mounted) setState(() { _error = 'Send location failed: $e'; });
    }
  }

  void _startShare() {
    if (_sharing) return;
    setState(() { _sharing = true; });
    _sendLocationOnce();
    _locTimer?.cancel();
    _locTimer = Timer.periodic(const Duration(seconds: kDriverShareSec), (_) => _sendLocationOnce());
  }

  void _stopShare() {
    _locTimer?.cancel();
    _locTimer = null;
    if (_sharing) setState(() { _sharing = false; });
  }

  Future<bool> _ensureLocationPermission() async {
    LocationPermission perm = await Geolocator.checkPermission();
    if (perm == LocationPermission.denied) {
      perm = await Geolocator.requestPermission();
    }
    return perm == LocationPermission.always || perm == LocationPermission.whileInUse;
  }

  Future<void> _useGpsOnce() async {
    final ok = await _ensureLocationPermission();
    if (!ok) { if (mounted) setState(() { _error = 'Location permission denied'; }); return; }
    final pos = await Geolocator.getCurrentPosition(desiredAccuracy: LocationAccuracy.high);
    _latCtrl.text = pos.latitude.toStringAsFixed(6);
    _lngCtrl.text = pos.longitude.toStringAsFixed(6);
    await _sendLocationOnce();
  }

  void _startGpsShare() async {
    final ok = await _ensureLocationPermission();
    if (!ok) { if (mounted) setState(() { _error = 'Location permission denied'; }); return; }
    if (_gpsSharing) return;
    setState(() { _gpsSharing = true; });
    _locTimer?.cancel();
    _locTimer = Timer.periodic(const Duration(seconds: kDriverShareSec), (_) async {
      try {
        final pos = await Geolocator.getCurrentPosition(desiredAccuracy: LocationAccuracy.medium);
        _latCtrl.text = pos.latitude.toStringAsFixed(6);
        _lngCtrl.text = pos.longitude.toStringAsFixed(6);
        await _sendLocationOnce();
      } catch (e) { if (mounted) setState(() { _error = 'GPS update failed: $e'; }); }
    });
  }

  void _stopGpsShare() {
    _gpsSharing = false;
    _locTimer?.cancel();
    _locTimer = null;
  }

  @override
  Widget build(BuildContext context) {
    final api = ApiClient();
    return Scaffold(
      appBar: AppBar(
        title: const Text('Driver Actions'),
        actions: [IconButton(onPressed: _busy ? null : _loadTrips, icon: const Icon(Icons.refresh))],
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            TextField(controller: _tripIdCtrl, decoration: const InputDecoration(labelText: 'Trip ID')),
            const SizedBox(height: 12),
            Row(children:[
              Expanded(child: TextField(controller: _latCtrl, keyboardType: TextInputType.number, decoration: const InputDecoration(labelText: 'Lat'))),
              const SizedBox(width: 8),
              Expanded(child: TextField(controller: _lngCtrl, keyboardType: TextInputType.number, decoration: const InputDecoration(labelText: 'Lng'))),
            ]),
            const SizedBox(height: 8),
            Row(children:[
              ElevatedButton(onPressed: _sendLocationOnce, child: const Text('Send Location')),
              const SizedBox(width: 12),
              _sharing ? ElevatedButton(onPressed: _stopShare, child: const Text('Stop Sharing')) : ElevatedButton(onPressed: _startShare, child: const Text('Start Sharing')),
              const SizedBox(width: 12),
              ElevatedButton(onPressed: _useGpsOnce, child: const Text('Use GPS Once')),
              const SizedBox(width: 12),
              _gpsSharing ? ElevatedButton(onPressed: _stopGpsShare, child: const Text('Stop GPS Share')) : ElevatedButton(onPressed: _startGpsShare, child: const Text('Start GPS Share')),
            ]),
            const SizedBox(height: 12),
            Row(children:[
              const Text('Payment:'),
              const SizedBox(width: 8),
              DropdownButton<String>(
                value: _payMethod,
                items: const [DropdownMenuItem(value: 'CASH', child: Text('CASH'))],
                onChanged: (v){ if (v!=null) setState((){ _payMethod = 'CASH'; }); },
              )
            ]),
            const SizedBox(height: 8),
            if (_error != null) Text(_error!, style: const TextStyle(color: Colors.red)),
            const SizedBox(height: 12),
            Wrap(spacing: 12, runSpacing: 12, children: [
              ElevatedButton(onPressed: _busy ? null : () => _call((id) => api.trips.tripsAccept(id: id)), child: const Text('Accept')),
              ElevatedButton(onPressed: _busy ? null : () => _call((id) => api.trips.tripsArrived(id: id)), child: const Text('Arrived')),
              ElevatedButton(onPressed: _busy ? null : () => _call((id) => api.trips.tripsStart(id: id)), child: const Text('Start')),
              ElevatedButton(onPressed: _busy ? null : () => _call((id) => api.trips.tripsComplete(id: id)), child: const Text('Complete')),
              ElevatedButton(onPressed: _busy ? null : _loadTrips, child: const Text('Refresh My Trips')),
              ElevatedButton(onPressed: _busy ? null : () async {
                try {
                  final id = _tripIdCtrl.text.trim(); if (id.isEmpty) throw Exception('Enter trip id');
                  final res = await api.payments.paymentsGetByTrip(tripId: id);
                  if (!mounted) return;
                  final p = res.data;
                  showDialog(context: context, builder: (_) => AlertDialog(
                    title: const Text('Payment'),
                    content: Text('status: ${p?.status}\nmethod: ${p?.method}\nprovider: ${p?.provider ?? '-'}\nauthorized: ${p?.isAuthorized}\npaid: ${p?.isPaid}\ncapturable: ${p?.capturable}'),
                  ));
                } catch (e) { setState(() { _error = 'Check payment failed: $e'; }); }
              }, child: const Text('Check Payment')),
              ElevatedButton(
                onPressed: _busy ? null : () {
                  final id = _tripIdCtrl.text.trim();
                  if (id.isEmpty) { setState(() { _error = 'Enter trip id'; }); return; }
                  Navigator.of(context).pushNamed('/receipt', arguments: id);
                },
                child: const Text('View Receipt'),
              ),
            ]),
            const SizedBox(height: 24),
            Text('Status: $_status'),
            const SizedBox(height: 12),
            Expanded(
              child: RefreshIndicator(
                onRefresh: _loadTrips,
                child: ListView.builder(
                  itemCount: _items.length,
                  itemBuilder: (ctx, i) {
                    final it = _items[i];
                    final id = (it['id'] ?? '').toString();
                    final status = (it['status'] ?? '').toString();
                    return ListTile(
                      title: Text(id),
                      subtitle: Text('status: $status'),
                      onTap: () { _tripIdCtrl.text = id; },
                    );
                  },
                ),
              ),
            )
          ],
        ),
      ),
    );
  }
}
