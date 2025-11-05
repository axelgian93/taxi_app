import 'package:flutter/material.dart';
import '../api_client.dart';

class ReceiptScreen extends StatefulWidget {
  final String tripId;
  const ReceiptScreen({super.key, required this.tripId});

  @override
  State<ReceiptScreen> createState() => _ReceiptScreenState();
}

class _ReceiptScreenState extends State<ReceiptScreen> {
  bool _busy = true;
  String? _error;
  String? _type;
  String? _status;
  String? _method;
  num? _amountUsd;

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    setState(() { _busy = true; _error = null; _type = null; _status = null; _method = null; _amountUsd = null; });
    try {
      final api = ApiClient();
      final res = await api.payments.paymentsReceiptByTrip(tripId: widget.tripId);
      final data = res.data;
      setState(() {
        _type = data?.type?.name;
        _status = data?.status;
        _method = data?.method;
        _amountUsd = data?.amountUsd;
      });
    } catch (e) {
      setState(() { _error = 'Load failed: $e'; });
    } finally {
      setState(() { _busy = false; });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Receipt')),
      body: _busy
          ? const Center(child: CircularProgressIndicator())
          : _error != null
              ? Center(child: Text(_error!, style: const TextStyle(color: Colors.red)))
      : _type == null && _status == null && _method == null && _amountUsd == null
                  ? const Center(child: Text('No data'))
                  : Padding(
                      padding: const EdgeInsets.all(16),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('Trip: ${widget.tripId}'),
                          const SizedBox(height: 8),
                          Text('Type: ${_type ?? '-'}'),
                          Text('Status: ${_status ?? '-'}'),
                          Text('Method: ${_method ?? '-'}'),
                          if (_amountUsd != null) Text('Amount USD: ${_amountUsd}'),
                          const SizedBox(height: 16),
                          ElevatedButton(onPressed: _load, child: const Text('Refresh')),
                        ],
                      ),
                    ),
    );
  }
}
