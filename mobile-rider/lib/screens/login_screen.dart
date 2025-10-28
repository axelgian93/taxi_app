import 'package:flutter/material.dart';
import '../api_client.dart';
import 'request_screen.dart';
import 'driver_screen.dart';
import 'combined_screen.dart';
import 'package:openapi/openapi.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _baseUrlCtrl = TextEditingController(text: 'http://10.0.2.2:8080');
  final _emailCtrl = TextEditingController(text: 'rider@taxi.local');
  final _passCtrl = TextEditingController(text: '123456');
  bool _busy = false;
  String? _error;

  Future<void> _login() async {
    setState(() { _busy = true; _error = null; });
    try {
      final api = ApiClient();
      api.configure(baseUrl: _baseUrlCtrl.text.trim());
      final resp = await api.auth.authLogin(
        authLoginRequest: AuthLoginRequest((AuthLoginRequestBuilder b) {
          b.email = _emailCtrl.text.trim();
          b.password = _passCtrl.text.trim();
        }),
      );
      final token = resp.data?.token ?? '';
      if (token.isEmpty) throw Exception('Empty token');
      api.configure(baseUrl: _baseUrlCtrl.text.trim(), token: token);
      if (!mounted) return;
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
      api.configure(baseUrl: _baseUrlCtrl.text.trim());
      final resp = await api.auth.authLogin(
        authLoginRequest: AuthLoginRequest((AuthLoginRequestBuilder b) {
          b.email = 'driver@taxi.local';
          b.password = '123456';
        }),
      );
      final token = resp.data?.token ?? '';
      if (token.isEmpty) throw Exception('Empty token');
      api.configure(baseUrl: _baseUrlCtrl.text.trim(), token: token);
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
            ElevatedButton(
              onPressed: _busy ? null : () {
                Navigator.of(context).pushReplacement(
                  MaterialPageRoute(builder: (_) => CombinedScreen(baseUrl: _baseUrlCtrl.text.trim())),
                );
              },
              child: const Text('Demo Rider+Driver'),
            )
          ],
        ),
      ),
    );
  }
}
