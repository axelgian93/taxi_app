import 'dart:async';
import 'dart:io';
import 'package:flutter_background_service/flutter_background_service.dart';
import 'package:flutter_background_service/android.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:geolocator/geolocator.dart';
import 'api_client.dart';

final _notifications = FlutterLocalNotificationsPlugin();

Future<void> initializeBackgroundService() async {
  if (!Platform.isAndroid) return; // focus Android for now
  const AndroidNotificationChannel channel = AndroidNotificationChannel(
    'driver_loc_channel', 'Driver Location',
    description: 'Location sharing service', importance: Importance.low,
  );
  await _notifications.resolvePlatformSpecificImplementation<AndroidFlutterLocalNotificationsPlugin>()?.createNotificationChannel(channel);

  final service = FlutterBackgroundService();
  await service.configure(
    androidConfiguration: AndroidConfiguration(
      onStart: onStart,
      autoStart: false,
      isForegroundMode: true,
      notificationChannelId: channel.id,
      initialNotificationTitle: 'Taxi Driver',
      initialNotificationContent: 'Compartiendo ubicación',
      foregroundServiceNotificationId: 9001,
    ),
    iosConfiguration: IosConfiguration(),
  );
}

@pragma('vm:entry-point')
Future<void> onStart(ServiceInstance service) async {
  // Only Android here
  if (service is AndroidServiceInstance) {
    service.setAsForegroundService();
  }
  final api = ApiClient();
  Timer? timer;
  int intervalSec = 15;
  try {
    // Ensure perms
    final enabled = await Geolocator.isLocationServiceEnabled();
    if (!enabled) return;
    var perm = await Geolocator.checkPermission();
    if (perm == LocationPermission.denied) perm = await Geolocator.requestPermission();
    if (perm == LocationPermission.deniedForever) return;

    timer = Timer.periodic(Duration(seconds: intervalSec), (_) async {
      try {
        final pos = await Geolocator.getCurrentPosition(desiredAccuracy: LocationAccuracy.high);
        await api.postJson('/drivers/location', { 'lat': pos.latitude, 'lng': pos.longitude });
      } catch (_) {}
    });
  } catch (_) {}

  service.on('stop').listen((_) {
    timer?.cancel();
    service.stopSelf();
  });

  service.on('set_interval').listen((event) {
    final sec = int.tryParse('${event?['sec'] ?? ''}') ?? 15;
    if (sec <= 0) return;
    intervalSec = sec;
    timer?.cancel();
    timer = Timer.periodic(Duration(seconds: intervalSec), () async {
      try {
        final pos = await Geolocator.getCurrentPosition(desiredAccuracy: LocationAccuracy.high);
        await api.postJson('/drivers/location', { 'lat': pos.latitude, 'lng': pos.longitude });
      } catch (_) {}
    });
  });
}

Future<void> startLocationService() async {
  if (!Platform.isAndroid) return;
  final service = FlutterBackgroundService();
  await service.startService();
}

Future<void> stopLocationService() async {
  if (!Platform.isAndroid) return;
  final service = FlutterBackgroundService();
  service.invoke('stop');
}

Future<void> setLocationInterval(int seconds) async {
  if (!Platform.isAndroid) return;
  final service = FlutterBackgroundService();
  service.invoke('set_interval', { 'sec': seconds });
}
