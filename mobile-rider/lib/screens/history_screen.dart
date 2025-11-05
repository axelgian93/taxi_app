import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../api_client.dart';

class HistoryScreen extends StatefulWidget {
  const HistoryScreen({super.key});

  @override
  State<HistoryScreen> createState() => _HistoryScreenState();
}

class _HistoryScreenState extends State<HistoryScreen>
    with SingleTickerProviderStateMixin {
  late final TabController _tab;

  // Local (persisted) list
  List<String> _tripsLocal = [];
  bool _busyLocal = true;

  // Server (rider/my-trips)
  List<Map<String, dynamic>> _tripsServer = [];
  bool _busyServer = true;
  String? _errServer;

  // Driver server (drivers/my-trips/history)
  List<Map<String, dynamic>> _tripsDriver = [];
  bool _busyDriver = true;
  String? _errDriver;

  @override
  void initState() {
    super.initState();
    _tab = TabController(length: 3, vsync: this);
    _loadLocal();
    _loadServer();
    _loadDriver();
  }

  Future<void> _loadLocal() async {
    setState(() => _busyLocal = true);
    final prefs = await SharedPreferences.getInstance();
    final list = prefs.getStringList('recent_trips') ?? <String>[];
    setState(() {
      _tripsLocal = List.of(list);
      _busyLocal = false;
    });
  }

  Future<void> _removeLocalAt(int i) async {
    final prefs = await SharedPreferences.getInstance();
    final list = prefs.getStringList('recent_trips') ?? <String>[];
    if (i >= 0 && i < list.length) {
      list.removeAt(i);
      await prefs.setStringList('recent_trips', list);
      await _loadLocal();
    }
  }

  Future<void> _loadServer() async {
    setState(() {
      _busyServer = true;
      _errServer = null;
    });
    try {
      final api = ApiClient();
      final res = await api.dio.get('/rider/my-trips');
      if (res.statusCode == 200 && res.data is Map) {
        final m = res.data as Map;
        final items = (m['items'] as List?)?.cast<Map<String, dynamic>>() ?? const [];
        setState(() => _tripsServer = List.of(items));
      } else {
        setState(() => _errServer = 'HTTP ${res.statusCode}');
      }
    } catch (e) {
      setState(() => _errServer = '$e');
    } finally {
      setState(() => _busyServer = false);
    }
  }

  Future<void> _loadDriver() async {
    setState(() {
      _busyDriver = true;
      _errDriver = null;
    });
    try {
      final api = ApiClient();
      final res = await api.dio.get('/drivers/my-trips/history');
      if (res.statusCode == 200 && res.data is Map) {
        final m = res.data as Map;
        final items = (m['items'] as List?)?.cast<Map<String, dynamic>>() ?? const [];
        setState(() => _tripsDriver = List.of(items));
      } else {
        setState(() => _errDriver = 'HTTP ${res.statusCode}');
      }
    } catch (e) {
      setState(() => _errDriver = '$e');
    } finally {
      setState(() => _busyDriver = false);
    }
  }

  @override
  void dispose() {
    _tab.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Trips History'),
        bottom: const TabBar(tabs: [
          Tab(text: 'Local'),
          Tab(text: 'Rider'),
          Tab(text: 'Driver'),
        ]),
      ),
      body: TabBarView(
        controller: _tab,
        children: [
          // Local tab
          _busyLocal
              ? const Center(child: CircularProgressIndicator())
              : _tripsLocal.isEmpty
                  ? const Center(child: Text('Sin viajes recientes'))
                  : ListView.builder(
                      itemCount: _tripsLocal.length,
                      itemBuilder: (ctx, i) {
                        final id = _tripsLocal[i];
                        return ListTile(
                          title: Text(id),
                          trailing: Row(mainAxisSize: MainAxisSize.min, children: [
                            IconButton(
                              icon: const Icon(Icons.receipt_long),
                              onPressed: () {
                                Navigator.of(context)
                                    .pushNamed('/receipt', arguments: id);
                              },
                            ),
                            IconButton(
                              icon: const Icon(Icons.delete),
                              onPressed: () => _removeLocalAt(i),
                            )
                          ]),
                        );
                      },
                    ),

          // Rider server tab
          _busyServer
              ? const Center(child: CircularProgressIndicator())
              : _errServer != null
                  ? Center(
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Text('Error: $_errServer',
                            style: const TextStyle(color: Colors.red)),
                        const SizedBox(height: 8),
                        OutlinedButton(
                          onPressed: _loadServer,
                          child: const Text('Reintentar'),
                        )
                      ],
                    ),
                  )
                  : _tripsServer.isEmpty
                      ? const Center(child: Text('No hay viajes (rider)'))
                      : RefreshIndicator(
                          onRefresh: _loadServer,
                          child: ListView.builder(
                            itemCount: _tripsServer.length,
                            itemBuilder: (ctx, i) {
                              final t = _tripsServer[i];
                              final id = (t['id'] ?? '-') as String;
                              final st = (t['status'] ?? '-') as String;
                              final when = (t['requestedAt'] ?? '') as String;
                              return ListTile(
                                title: Text('$id'),
                                subtitle: Text('status: $st\nrequestedAt: $when'),
                                trailing: IconButton(
                                  icon: const Icon(Icons.receipt_long),
                                  onPressed: () {
                                    Navigator.of(context)
                                        .pushNamed('/receipt', arguments: id);
                                  },
                                ),
                              );
                            },
                          ),
                        ),

          // Driver server tab
          _busyDriver
              ? const Center(child: CircularProgressIndicator())
              : _errDriver != null
                  ? Center(
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Text('Error: $_errDriver',
                              style: const TextStyle(color: Colors.red)),
                          const SizedBox(height: 8),
                          OutlinedButton(
                            onPressed: _loadDriver,
                            child: const Text('Reintentar'),
                          )
                        ],
                      ),
                    )
                  : _tripsDriver.isEmpty
                      ? const Center(child: Text('No hay viajes (driver)'))
                      : RefreshIndicator(
                          onRefresh: _loadDriver,
                          child: ListView.builder(
                            itemCount: _tripsDriver.length,
                            itemBuilder: (ctx, i) {
                              final t = _tripsDriver[i];
                              final id = (t['id'] ?? '-') as String;
                              final st = (t['status'] ?? '-') as String;
                              final when = (t['requestedAt'] ?? '') as String;
                              return ListTile(
                                title: Text('$id'),
                                subtitle: Text('status: $st\nrequestedAt: $when'),
                                trailing: IconButton(
                                  icon: const Icon(Icons.receipt_long),
                                  onPressed: () {
                                    Navigator.of(context)
                                        .pushNamed('/receipt', arguments: id);
                                  },
                                ),
                              );
                            },
                          ),
                        ),
        ],
      ),
    );
  }
}
