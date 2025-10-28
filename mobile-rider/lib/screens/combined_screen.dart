import 'package:flutter/material.dart';
import 'package:openapi/openapi.dart';
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
  String? _driverToken;
  int _index = 0; // 0: Rider, 1: Driver
  String? _error;
  bool _busy = true;
  final ValueNotifier<bool> _driverVisible = ValueNotifier<bool>(false);

  @override
  void initState() {
    super.initState();
    _bootstrap();
  }

  Future<void> _bootstrap() async {
    setState(() { _busy = true; _error = null; });
    final api = ApiClient();
    try {
      // Login rider
      api.configure(baseUrl: widget.baseUrl);
      final lr = await api.auth.authLogin(
        authLoginRequest: AuthLoginRequest((AuthLoginRequestBuilder b) {
          b.email = 'rider@taxi.local';
          b.password = '123456';
        }),
      );
      _riderToken = lr.data?.token ?? '';
      if ((_riderToken ?? '').isEmpty) throw Exception('Empty rider token');

      // Login driver
      final ld = await api.auth.authLogin(
        authLoginRequest: AuthLoginRequest((AuthLoginRequestBuilder b) {
          b.email = 'driver@taxi.local';
          b.password = '123456';
        }),
      );
      _driverToken = ld.data?.token ?? '';
      if ((_driverToken ?? '').isEmpty) throw Exception('Empty driver token');

      // Start with rider context
      api.configure(baseUrl: widget.baseUrl, token: _riderToken);
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
      api.configure(baseUrl: widget.baseUrl, token: _riderToken);
      _driverVisible.value = false;
    } else {
      api.configure(baseUrl: widget.baseUrl, token: _driverToken);
      _driverVisible.value = true;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Rider + Driver Demo')),
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
}
