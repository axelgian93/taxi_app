import 'package:flutter/material.dart';
import 'dart:async';
// import 'package:openapi/openapi.dart';
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
  String _payMethod = 'CASH'; // or 'CARD'

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
      final res = await api.dio.get('${api.baseUrl}/drivers/my-trips/active');
      final data = res.data as Map<String, dynamic>;
      final items = (data['items'] as List<dynamic>).cast<Map<String, dynamic>>();
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
    // If there's a visibility notifier, react to it
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
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final api = ApiClient();
    return Scaffold(
      appBar: AppBar(title: const Text('Driver Actions'), actions: [
        IconButton(onPressed: _busy ? null : _loadTrips, icon: const Icon(Icons.refresh))
      ]),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            TextField(controller: _tripIdCtrl, decoration: const InputDecoration(labelText: 'Trip ID')),
            const SizedBox(height: 12),
            Row(children:[
              const Text('Payment:'),
              const SizedBox(width: 8),
              DropdownButton<String>(
                value: _payMethod,
                items: const [
                  DropdownMenuItem(value: 'CASH', child: Text('CASH')),
                  DropdownMenuItem(value: 'CARD', child: Text('CARD')),
                ],
                onChanged: (v){ if (v!=null) setState((){ _payMethod = v; }); },
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
            ]),
            const SizedBox(height: 24),
            Text('Status: $_status')
            , const SizedBox(height: 12),
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
