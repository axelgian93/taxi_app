import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';

class PermissionsPage extends StatefulWidget {
  const PermissionsPage({super.key});
  @override
  State<PermissionsPage> createState() => _PermissionsPageState();
}

class _PermissionsPageState extends State<PermissionsPage> {
  bool serviceEnabled = false;
  LocationPermission perm = LocationPermission.denied;
  String? error;

  @override
  void initState() {
    super.initState();
    _refresh();
  }

  Future<void> _refresh() async {
    try {
      final enabled = await Geolocator.isLocationServiceEnabled();
      final p = await Geolocator.checkPermission();
      setState(() { serviceEnabled = enabled; perm = p; error = null; });
    } catch (e) {
      setState(() { error = e.toString(); });
    }
  }

  @override
  Widget build(BuildContext context) {
    final permText = () {
      switch (perm) {
        case LocationPermission.denied: return 'denied';
        case LocationPermission.deniedForever: return 'deniedForever';
        case LocationPermission.whileInUse: return 'whileInUse';
        case LocationPermission.always: return 'always';
        default: return perm.toString();
      }
    }();
    return Scaffold(
      appBar: AppBar(title: const Text('Permisos de ubicación')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          if (error != null) Text(error!, style: const TextStyle(color: Colors.red)),
          Row(children:[ const Text('Servicio de ubicación: '), Chip(label: Text(serviceEnabled ? 'enabled' : 'disabled')) ]),
          Row(children:[ const Text('Permiso: '), Chip(label: Text(permText)) ]),
          const SizedBox(height: 12),
          Wrap(spacing: 8, runSpacing: 8, children:[
            ElevatedButton(onPressed: () async { await Geolocator.requestPermission(); await _refresh(); }, child: const Text('Solicitar permisos')),
            ElevatedButton(onPressed: () async { await Geolocator.openLocationSettings(); }, child: const Text('Abrir ajustes de ubicación')),
            ElevatedButton(onPressed: () async { await Geolocator.openAppSettings(); }, child: const Text('Abrir ajustes de la app')),
            ElevatedButton(onPressed: (){ Navigator.pop(context, true); }, child: const Text('Listo')),
          ]),
          const SizedBox(height: 16),
          const Text('Consejo: concede "Permitir todo el tiempo" para compartir ubicación en segundo plano cuando estés en viaje.'),
        ]),
      ),
    );
  }
}

