import 'package:flutter/material.dart';
import '../api_client.dart';
import 'request_screen.dart';
import 'driver_screen.dart';
import 'combined_screen.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../utils/platform_base_url.dart';
import '../push_registrar.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _baseUrlCtrl = TextEditingController();
  final _emailCtrl = TextEditingController(text: 'rider@taxi.local');
  final _passCtrl = TextEditingController(text: '123456');
  bool _busy = false;
  String? _error;
  bool? _apiOk;

  @override
  void initState() {
    super.initState();
    // Redirect to login on auth expiration from any screen
    ApiClient().setAuthExpiredHandler(() {
      if (!mounted) return;
      Navigator.of(context).pushNamedAndRemoveUntil('/', (route) => false);
    });
    _initBaseUrlAndHealth();
  }

  Future<void> _initBaseUrlAndHealth() async {
    setState(() { _busy = true; _error = null; _apiOk = null; });
    try {
      final prefs = await SharedPreferences.getInstance();
      final saved = prefs.getString('base_url');
      final base = (saved == null || saved.isEmpty) ? defaultBaseUrl() : saved;
      _baseUrlCtrl.text = base;
      final api = ApiClient();
      final ok = await api.ping(baseUrl: base);
      setState(() { _apiOk = ok; });
      if (ok) { await prefs.setString('base_url', base); }
      // Autologin if we have a valid token
      final token = prefs.getString('auth_token');
      if (ok && token != null && token.isNotEmpty) {
        api.configure(baseUrl: base, token: token);
        try {
          final me = await api.auth.authMe();
          if (me.statusCode == 200 && mounted) {
            Navigator.of(context).pushReplacement(MaterialPageRoute(builder: (_) => const RequestScreen()));
            return;
          }
        } catch (_) {}
      }
    } catch (e) {
      setState(() { _apiOk = false; _error = 'Health check failed: $e'; });
    } finally {
      if (mounted) setState(() { _busy = false; });
    }
  }

  Future<void> _login() async {
    setState(() { _busy = true; _error = null; });
    try {
      final api = ApiClient();
      final base = _baseUrlCtrl.text.trim();
      api.configure(baseUrl: base);
      final ok = await api.ping(baseUrl: base);
      setState(() { _apiOk = ok; });
      if (!ok) throw Exception('API not reachable');
      (await SharedPreferences.getInstance()).setString('base_url', base);
      final creds = await api.loginRaw(_emailCtrl.text.trim(), _passCtrl.text.trim());
      final token = creds?['token'] ?? '';
      final refresh = creds?['refreshToken'] ?? '';
      if (token.isEmpty) throw Exception('Empty token');
      api.configure(baseUrl: _baseUrlCtrl.text.trim(), token: token, refreshToken: refresh);
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString('auth_token', token);
      await prefs.setString('refresh_token', refresh);
      if (!mounted) return;
      // Register push token (best effort)
      await PushRegistrar(api).registerIfPossible(role: 'RIDER');
      Navigator.of(context).pushReplacement(MaterialPageRoute(builder: (_) => const RequestScreen()));
    } catch (e) {
      setState(() { _error = 'Login failed: $e'; });
    } finally {
      if (mounted) setState(() { _busy = false; });
    }
  }

  Future<void> _loginDriver() async {
    setState(() { _busy = true; _error = null; });
    try {
      final api = ApiClient();
      final base = _baseUrlCtrl.text.trim();
      api.configure(baseUrl: base);
      final ok = await api.ping(baseUrl: base);
      setState(() { _apiOk = ok; });
      if (!ok) throw Exception('API not reachable');
      (await SharedPreferences.getInstance()).setString('base_url', base);
      final creds = await api.loginRaw('driver@taxi.local', '123456');
      final token = creds?['token'] ?? '';
      if (token.isEmpty) throw Exception('Empty token');
      api.configure(baseUrl: _baseUrlCtrl.text.trim(), token: token);
      // Nota: token de driver no se persiste; flujo de demo
      if (!mounted) return;
      Navigator.of(context).pushReplacement(MaterialPageRoute(builder: (_) => const DriverScreen()));
    } catch (e) {
      setState(() { _error = 'Login driver failed: $e'; });
    } finally {
      if (mounted) setState(() { _busy = false; });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Taxi Rider - Login')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            TextField(controller: _baseUrlCtrl, decoration: const InputDecoration(labelText: 'Base URL')), 
            const SizedBox(height: 6),
            Row(children:[
              const Text('API status:'),
              const SizedBox(width: 8),
              if (_apiOk == null) ...[
                const Icon(Icons.circle, size: 12, color: Colors.grey),
                const SizedBox(width: 6),
                const Text('checking...')
              ] else ...[
                Icon(Icons.circle, size: 12, color: _apiOk == true ? Colors.green : Colors.red),
                const SizedBox(width: 6),
                Text(_apiOk == true ? 'OK' : 'DOWN', style: TextStyle(color: _apiOk == true ? Colors.green : Colors.red)),
              ],
              const SizedBox(width: 12),
              OutlinedButton(onPressed: _busy ? null : _initBaseUrlAndHealth, child: const Text('Check')),
            ]),
            TextField(controller: _emailCtrl, decoration: const InputDecoration(labelText: 'Email')),
            TextField(controller: _passCtrl, decoration: const InputDecoration(labelText: 'Password'), obscureText: true),
            const SizedBox(height: 12),
            if (_error != null) Text(_error!, style: const TextStyle(color: Colors.red)),
            const SizedBox(height: 12),
            Row(children:[
              Expanded(child: ElevatedButton(onPressed: _busy ? null : _login, child: _busy ? const CircularProgressIndicator() : const Text('Login Rider'))),
              const SizedBox(width: 12),
              Expanded(child: ElevatedButton(onPressed: _busy ? null : _loginDriver, child: const Text('Login Driver'))),
            ])
            , const SizedBox(height: 12),
            OutlinedButton(
              onPressed: _busy ? null : () async {
                final api = ApiClient();
                await api.clearSession();
                if (!mounted) return;
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('Sesión limpiada')),
                );
              },
              child: const Text('Limpiar sesión'),
            ),
            const SizedBox(height: 8),
            OutlinedButton(
              onPressed: _busy ? null : () {
                Navigator.of(context).pushNamed('/sessions');
              },
              child: const Text('Mis sesiones'),
            ),
            const SizedBox(height: 8),
            ElevatedButton(
              onPressed: _busy ? null : () {
                Navigator.of(context).pushReplacement(
                  MaterialPageRoute(builder: (_) => CombinedScreen(baseUrl: _baseUrlCtrl.text.trim())),
                );
              },
              child: const Text('Demo Rider+Driver'),
            )
            , const SizedBox(height: 8),
            OutlinedButton(
              onPressed: _busy ? null : () {
                Navigator.of(context).pushNamed('/history');
              },
              child: const Text('Ver historial de viajes'),
            ),
            const SizedBox(height: 8),
            OutlinedButton(
              onPressed: _busy ? null : () {
                Navigator.of(context).pushNamed('/verify');
              },
              child: const Text('Verificar email / Reset password'),
            ),
          ],
        ),
      ),
    );
  }
}
