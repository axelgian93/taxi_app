import 'package:flutter/material.dart';
import '../api_client.dart';

class SessionsScreen extends StatefulWidget {
  const SessionsScreen({super.key});

  @override
  State<SessionsScreen> createState() => _SessionsScreenState();
}

class _SessionsScreenState extends State<SessionsScreen> {
  bool _busy = true;
  String? _error;
  List<Map<String, dynamic>> _items = const [];

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    setState(() { _busy = true; _error = null; });
    try {
      final api = ApiClient();
      final res = await api.dio.get('/auth/sessions');
      if (res.statusCode == 200 && res.data is Map) {
        final m = res.data as Map;
        final list = (m['items'] as List?)?.cast<Map<String, dynamic>>() ?? const [];
        setState(() { _items = list; });
      } else {
        setState(() { _error = 'HTTP ${res.statusCode}'; });
      }
    } catch (e) {
      setState(() { _error = '$e'; });
    } finally {
      setState(() { _busy = false; });
    }
  }

  Future<void> _revokeAll() async {
    setState(() { _busy = true; _error = null; });
    try {
      final api = ApiClient();
      final res = await api.dio.post('/auth/sessions/revoke-all');
      if (!mounted) return;
      if (res.statusCode == 200) {
        ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Todas las sesiones revocadas')));
        await _load();
      } else {
        setState(() { _error = 'HTTP ${res.statusCode}'; });
      }
    } catch (e) {
      setState(() { _error = '$e'; });
    } finally {
      setState(() { _busy = false; });
    }
  }

  Future<void> _revokeItem(Map<String, dynamic> it) async {
    setState(() { _busy = true; _error = null; });
    try {
      final api = ApiClient();
      final deviceId = it['deviceId'] as String?;
      final tokenId = it['id']?.toString();
      final body = <String, dynamic>{};
      if (deviceId != null && deviceId.isNotEmpty) body['deviceId'] = deviceId; else body['tokenId'] = tokenId;
      final res = await api.dio.post('/auth/sessions/revoke', data: body, options: null);
      if (!mounted) return;
      if (res.statusCode == 200) {
        ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Sesión revocada')));
        await _load();
      } else {
        setState(() { _error = 'HTTP ${res.statusCode}'; });
      }
    } catch (e) {
      setState(() { _error = '$e'; });
    } finally {
      setState(() { _busy = false; });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Mis sesiones'),
        actions: [
          IconButton(onPressed: _busy ? null : _load, icon: const Icon(Icons.refresh)),
          IconButton(onPressed: _busy ? null : _revokeAll, icon: const Icon(Icons.logout)),
        ],
      ),
      body: _busy
          ? const Center(child: CircularProgressIndicator())
          : _error != null
              ? Center(child: Text(_error!, style: const TextStyle(color: Colors.red)))
              : _items.isEmpty
                  ? const Center(child: Text('Sin sesiones activas'))
                  : RefreshIndicator(
                      onRefresh: _load,
                      child: ListView.separated(
                        itemCount: _items.length,
                        separatorBuilder: (_, __) => const Divider(height: 1),
                        itemBuilder: (ctx, i) {
                          final it = _items[i];
                          final deviceName = (it['deviceName'] ?? '') as String;
                          final deviceId = (it['deviceId'] ?? '') as String;
                          final ua = (it['userAgent'] ?? '') as String;
                          final ip = (it['ip'] ?? '') as String;
                          final createdAt = (it['createdAt'] ?? '') as String;
                          final lastUsedAt = (it['lastUsedAt'] ?? '') as String;
                          final expiresAt = (it['expiresAt'] ?? '') as String;
                          return ListTile(
                            title: Text(deviceName.isNotEmpty ? deviceName : (deviceId.isNotEmpty ? deviceId : 'Sin nombre')),
                            subtitle: Text('UA: ${ua.isNotEmpty ? ua : '-'}\nIP: ${ip.isNotEmpty ? ip : '-'}\nCreada: $createdAt\nÚltimo uso: ${lastUsedAt.isNotEmpty ? lastUsedAt : '-'}\nExpira: $expiresAt'),
                            trailing: IconButton(
                              icon: const Icon(Icons.close),
                              tooltip: 'Revocar',
                              onPressed: _busy ? null : () => _revokeItem(it),
                            ),
                          );
                        },
                      ),
                    ),
    );
  }
}

