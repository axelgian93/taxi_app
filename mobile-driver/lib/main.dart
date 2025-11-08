import 'dart:async';
import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'api_client.dart';
import 'sse_service.dart';
import 'config.dart';
import 'background.dart';
import 'notifications.dart';
import 'permissions.dart';
import 'push_registrar.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  initializeBackgroundService();
  initLocalNotifications();
  runApp(const DriverApp());
}

class DriverApp extends StatelessWidget {
  const DriverApp({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Driver',
      theme: ThemeData.dark(useMaterial3: true),
      home: const AuthGate(),
    );
  }
}

class AuthGate extends StatefulWidget {
  const AuthGate({super.key});
  @override
  State<AuthGate> createState() => _AuthGateState();
}

class _AuthGateState extends State<AuthGate> {
  final api = ApiClient();
  String? token;
  @override
  void initState() {
    super.initState();
    api.token().then((t){ setState((){ token = t; }); });
  }
  @override
  Widget build(BuildContext context) {
    if (token == null) return LoginPage(api: api, onLogged: (t){ setState(()=> token = t); });
    return DashboardPage(api: api);
  }
}

class LoginPage extends StatefulWidget {
  final ApiClient api; final void Function(String token) onLogged;
  const LoginPage({super.key, required this.api, required this.onLogged});
  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final email = TextEditingController();
  final pass = TextEditingController();
  bool loading = false; String? error;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Driver Login')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          if (error != null) Text(error!, style: const TextStyle(color: Colors.red)),
          TextField(controller: email, decoration: const InputDecoration(labelText: 'Email')),
          TextField(controller: pass, decoration: const InputDecoration(labelText: 'Password'), obscureText: true),
          const SizedBox(height: 12),
          ElevatedButton(onPressed: loading ? null : () async {
            setState(()=> loading = true);
            try {
              final body = await widget.api.postJson('/auth/login', {'email': email.text.trim(), 'password': pass.text});
              final t = body['token'] as String?;
              if (t == null) throw Exception('No token');
              await widget.api.saveToken(t);
              // Register push token (best effort)
              await PushRegistrar(widget.api).registerIfPossible(platform: Platform.isAndroid ? 'android' : 'ios', role: 'DRIVER');
              widget.onLogged(t);
            } catch (e) { setState((){ error = e.toString(); }); } finally { setState(()=> loading = false); }
          }, child: const Text('Ingresar')),
        ]),
      ),
    );
  }
}

class DashboardPage extends StatefulWidget {
  final ApiClient api;
  const DashboardPage({super.key, required this.api});
  @override
  State<DashboardPage> createState() => _DashboardPageState();
}

class _DashboardPageState extends State<DashboardPage> {
  bool online = false; Timer? locTimer; Timer? pollTimer; String status = 'IDLE'; String? error; String? tripId;
  final sse = DriverSseService();
  final _mapCtl = Completer<GoogleMapController>();
  LatLng? driverPos; LatLng? pickupPos; LatLng? dropPos;
  bool follow = true;
  @override
  void dispose() { locTimer?.cancel(); pollTimer?.cancel(); sse.close(); stopLocationService(); super.dispose(); }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Driver')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          if (error != null) Text(error!, style: const TextStyle(color: Colors.red)),
          Row(children:[
            const Text('Estado: '),
            Chip(label: Text(online ? 'ONLINE' : 'OFFLINE')),
            const SizedBox(width: 12),
            Switch(value: online, onChanged: (v) async {
              setState(()=> online = v);
              locTimer?.cancel(); pollTimer?.cancel();
              if (v) {
                await _requestPerms();
                // Start location sharing (idle cadence by default)
                locTimer = Timer.periodic(Duration(seconds: kIdleIntervalSec), (_) => _sendLoc());
                // Poll for assignments/active trips
                await _pollActive();
                pollTimer = Timer.periodic(const Duration(seconds: 5), (_) => _pollActive());
                // Start Android foreground service
                await startLocationService();
              } else {
                sse.close();
                setState((){ tripId = null; status = 'IDLE'; });
                await stopLocationService();
              }
            })
          ]),
          const SizedBox(height: 8),
          Row(children:[
            Checkbox(value: follow, onChanged: (v){ setState(()=> follow = v ?? true); }),
            const Text('Seguir driver')
          ]),
          const SizedBox(height: 4),
          Text('Trip status: $status'),
          if (tripId != null) Text('Trip: $tripId', style: const TextStyle(color: Colors.grey)),
          const SizedBox(height: 12),
          Expanded(
            child: ClipRRect(
              borderRadius: BorderRadius.circular(6),
              child: GoogleMap(
                initialCameraPosition: CameraPosition(
                  target: driverPos ?? pickupPos ?? const LatLng(0, 0),
                  zoom: driverPos != null || pickupPos != null ? 14 : 2,
                ),
                myLocationEnabled: true,
                myLocationButtonEnabled: true,
                onMapCreated: (c) { if (!_mapCtl.isCompleted) _mapCtl.complete(c); },
                markers: _buildMarkers(),
              ),
            ),
          ),
          const SizedBox(height: 12),
          Wrap(spacing: 8, children:[
            ElevatedButton(onPressed: tripId==null? null : () => _sendAction('accept'), child: const Text('Aceptar')),
            ElevatedButton(onPressed: () => _sendAction('arrived'), child: const Text('Arrived')),
            ElevatedButton(onPressed: () => _sendAction('start'), child: const Text('Start')),
            ElevatedButton(onPressed: () => _sendAction('complete'), child: const Text('Complete')),
            ElevatedButton(onPressed: () => _sendAction('reject'), child: const Text('Rechazar')),
            ElevatedButton(onPressed: _fitBounds, child: const Text('Reencuadrar')),
          ])
        ]),
      ),
    );
  }

  Future<void> _requestPerms() async {
    final enabled = await Geolocator.isLocationServiceEnabled();
    if (!enabled) {
      if (mounted) { await Navigator.of(context).push(MaterialPageRoute(builder: (_) => const PermissionsPage())); }
      throw Exception('Servicio de ubicación desactivado');
    }
    var perm = await Geolocator.checkPermission();
    if (perm == LocationPermission.denied) perm = await Geolocator.requestPermission();
    if (perm == LocationPermission.deniedForever) {
      if (mounted) { await Navigator.of(context).push(MaterialPageRoute(builder: (_) => const PermissionsPage())); }
      throw Exception('Permiso ubicación denegado');
    }
  }

  Future<void> _sendLoc() async {
    try {
      final pos = await Geolocator.getCurrentPosition(desiredAccuracy: LocationAccuracy.high);
      setState(() { driverPos = LatLng(pos.latitude, pos.longitude); });
      await widget.api.postJson('/drivers/location', { 'lat': pos.latitude, 'lng': pos.longitude });
      if (follow && _mapCtl.isCompleted) {
        final ctl = await _mapCtl.future;
        await ctl.animateCamera(CameraUpdate.newLatLng(driverPos!));
      }
    } catch (e){ setState(()=> error = e.toString()); }
  }

  Future<void> _sendAction(String action) async {
    try {
      if (tripId == null) throw Exception('No trip');
      await widget.api.postJson('/trips/$tripId/$action', {});
      setState(()=> status = action.toUpperCase());
    } catch (e){ setState(()=> error = e.toString()); }
  }

  Future<void> _pollActive() async {
    try {
      final res = await widget.api.getJson('/drivers/my-trips/active');
      final items = (res['items'] as List?) ?? [];
      if (items.isNotEmpty) {
        final t = items.first as Map<String, dynamic>;
        final id = t['id'] as String?;
        final st = t['status'] as String? ?? 'ASSIGNED';
        final pLat = (t['pickupLat'] as num?)?.toDouble();
        final pLng = (t['pickupLng'] as num?)?.toDouble();
        final dLat = (t['dropoffLat'] as num?)?.toDouble();
        final dLng = (t['dropoffLng'] as num?)?.toDouble();
        if (mounted) setState(() {
          pickupPos = (pLat != null && pLng != null) ? LatLng(pLat, pLng) : null;
          dropPos = (dLat != null && dLng != null) ? LatLng(dLat, dLng) : null;
        });
        if (id != null && id != tripId) {
          // New assignment — connect to SSE for this trip
          final tok = await widget.api.token();
          if (tok != null) {
            final base = Env.baseUrl();
            sse.connect('$base/trips/$id/sse', token: tok, onEvent: (ev) async {
              final s = (ev['data']?['status'] ?? ev['status'] ?? ev['event'])?.toString().toUpperCase();
              if (s == null) return;
              if (mounted) setState(()=> status = s);
              await _adjustCadenceByStatus(s);
            });
          }
          // Notify new assignment
          await showAssignmentNotification(id);
        }
        if (mounted) setState(() { tripId = id; status = st; });
        _fitBounds();
        await _adjustCadenceByStatus(st);
      } else {
        if (mounted) setState(() { tripId = null; status = online ? 'IDLE' : 'OFFLINE'; });
        sse.close();
      }
    } catch (e) { setState(()=> error = e.toString()); }
  }

  Set<Marker> _buildMarkers() {
    final markers = <Marker>{};
    if (driverPos != null) {
      markers.add(Marker(markerId: const MarkerId('driver'), position: driverPos!, infoWindow: const InfoWindow(title: 'Driver')));
    }
    if (pickupPos != null) {
      markers.add(Marker(markerId: const MarkerId('pickup'), position: pickupPos!, infoWindow: const InfoWindow(title: 'Origen')));
    }
    if (dropPos != null) {
      markers.add(Marker(markerId: const MarkerId('dropoff'), position: dropPos!, infoWindow: const InfoWindow(title: 'Destino')));
    }
    return markers;
  }

  Future<void> _fitBounds() async {
    if (!_mapCtl.isCompleted) return;
    final ctl = await _mapCtl.future;
    final points = <LatLng>[];
    if (driverPos != null) points.add(driverPos!);
    if (pickupPos != null) points.add(pickupPos!);
    if (dropPos != null) points.add(dropPos!);
    if (points.isEmpty) return;
    var sw = points.first; var ne = points.first;
    for (final p in points) {
      sw = LatLng(p.latitude < sw.latitude ? p.latitude : sw.latitude, p.longitude < sw.longitude ? p.longitude : sw.longitude);
      ne = LatLng(p.latitude > ne.latitude ? p.latitude : ne.latitude, p.longitude > ne.longitude ? p.longitude : ne.longitude);
    }
    final bounds = LatLngBounds(southwest: sw, northeast: ne);
    try {
      await ctl.animateCamera(CameraUpdate.newLatLngBounds(bounds, 60));
    } catch (_) {}
  }

  Future<void> _adjustCadenceByStatus(String s) async {
    final high = (s == 'STARTED' || s == 'ON_TRIP');
    // Foreground timer
    locTimer?.cancel();
    locTimer = Timer.periodic(Duration(seconds: high ? kShareIntervalSec : kIdleIntervalSec), (_) => _sendLoc());
    // Background service timer
    await setLocationInterval(high ? kShareIntervalSec : kIdleIntervalSec);
  }
}
