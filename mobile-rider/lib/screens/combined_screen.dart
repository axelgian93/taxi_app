import 'package:flutter/material.dart';
import 'dart:async';
import '../api_client.dart';
import 'request_screen.dart';
import 'driver_screen.dart';

class CombinedScreen extends StatefulWidget {
  final String baseUrl;
  const CombinedScreen({super.key, required this.baseUrl});

  @override
  State<CombinedScreen> createState() => _CombinedScreenState();
}

class _CombinedScreenState extends State<CombinedScreen> {
  String? _riderToken;
  String? _riderRefresh;
  String? _driverToken;
  String? _driverRefresh;
  int _index = 0; // 0: Rider, 1: Driver
  String? _error;
  bool _busy = true;
  bool? _apiOk;
  Timer? _apiTimer;
  bool _apiChecking = false;
  final ValueNotifier<bool> _driverVisible = ValueNotifier<bool>(false);

  @override
  void initState() {
    super.initState();
    // Redirect back to login if auth expires during use
    ApiClient().setAuthExpiredHandler(() {
      if (!mounted) return;
      Navigator.of(context).pushNamedAndRemoveUntil('/', (route) => false);
    });
    _checkApi();
    _bootstrap();
    _startApiAutoCheck();
  }

  Future<void> _checkApi() async {
    if (_apiChecking) return;
    _apiChecking = true;
    final api = ApiClient();
    final prev = _apiOk;
    if (mounted) setState(() { _apiOk = null; });
    try {
      final ok = await api.ping(baseUrl: widget.baseUrl);
      if (!mounted) return;
      setState(() { _apiOk = ok; });
      if (prev != null && prev != ok) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(ok ? 'API recovered' : 'API down'),
            backgroundColor: ok ? Colors.green : Colors.red,
            duration: const Duration(seconds: 2),
          ),
        );
      }
    } catch (_) {
      if (!mounted) return;
      setState(() { _apiOk = false; });
      if (prev != null && prev != false) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('API down'),
            backgroundColor: Colors.red,
            duration: Duration(seconds: 2),
          ),
        );
      }
    } finally {
      _apiChecking = false;
    }
  }

  void _startApiAutoCheck() {
    _apiTimer?.cancel();
    _apiTimer = Timer.periodic(const Duration(seconds: 30), (_) => _checkApi());
  }

  Future<void> _bootstrap() async {
    setState(() { _busy = true; _error = null; });
    final api = ApiClient();
    try {
      // Login rider
      api.configure(baseUrl: widget.baseUrl);
      final lr = await api.loginRaw('rider@taxi.local', '123456');
      _riderToken = lr?['token'] ?? '';
      _riderRefresh = lr?['refreshToken'] ?? '';
      if ((_riderToken ?? '').isEmpty) throw Exception('Empty rider token');

      // Login driver
      final ld = await api.loginRaw('driver@taxi.local', '123456');
      _driverToken = ld?['token'] ?? '';
      _driverRefresh = ld?['refreshToken'] ?? '';
      if ((_driverToken ?? '').isEmpty) throw Exception('Empty driver token');

      // Start with rider context
      api.configure(baseUrl: widget.baseUrl, token: _riderToken, refreshToken: _riderRefresh);
    } catch (e) {
      setState(() { _error = 'Bootstrap failed: $e'; });
    } finally {
      setState(() { _busy = false; });
    }
  }

  void _onTap(int i) {
    if (_index == i) return;
    setState(() { _index = i; });
    final api = ApiClient();
    if (i == 0) {
      api.configure(baseUrl: widget.baseUrl, token: _riderToken, refreshToken: _riderRefresh);
      _driverVisible.value = false;
    } else {
      api.configure(baseUrl: widget.baseUrl, token: _driverToken, refreshToken: _driverRefresh);
      _driverVisible.value = true;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Rider + Driver Demo'),
        actions: [
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 8.0),
            child: Tooltip(
              message: _apiOk == null ? 'API: checking' : _apiOk == true ? 'API: OK' : 'API: DOWN',
              child: Icon(
                Icons.circle,
                size: 14,
                color: _apiOk == null ? Colors.grey : _apiOk == true ? Colors.green : Colors.red,
              ),
            ),
          ),
          IconButton(onPressed: _checkApi, icon: const Icon(Icons.refresh)),
          IconButton(
            tooltip: 'Historial',
            onPressed: () {
              Navigator.of(context).pushNamed('/history');
            },
            icon: const Icon(Icons.history),
          ),
          IconButton(
            tooltip: 'Verify Email / Reset',
            onPressed: () {
              Navigator.of(context).pushNamed('/verify');
            },
            icon: const Icon(Icons.verified_user),
          ),
          IconButton(
            tooltip: 'Sesiones',
            onPressed: () {
              Navigator.of(context).pushNamed('/sessions');
            },
            icon: const Icon(Icons.devices),
          ),
          IconButton(
            tooltip: 'Clear Session',
            onPressed: () async {
              final api = ApiClient();
              await api.clearSession();
              if (!mounted) return;
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('Sesión limpiada')),
              );
              Navigator.of(context).pushNamedAndRemoveUntil('/', (route) => false);
            },
            icon: const Icon(Icons.logout),
          ),
        ],
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _index,
        onTap: _onTap,
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.person), label: 'Rider'),
          BottomNavigationBarItem(icon: Icon(Icons.local_taxi), label: 'Driver'),
        ],
      ),
      body: _busy
          ? const Center(child: CircularProgressIndicator())
          : (_error != null)
              ? Center(child: Text(_error!, style: const TextStyle(color: Colors.red)))
              : IndexedStack(
                  index: _index,
                  children: [
                    const RequestScreen(),
                    DriverScreen(visibleNotifier: _driverVisible),
                  ],
                ),
    );
  }

  @override
  void dispose() {
    _apiTimer?.cancel();
    super.dispose();
  }
}
