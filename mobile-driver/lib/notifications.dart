import 'dart:io';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';

final FlutterLocalNotificationsPlugin localNotifs = FlutterLocalNotificationsPlugin();

const AndroidNotificationChannel _assignChannel = AndroidNotificationChannel(
  'driver_assignments', 'Driver Assignments',
  description: 'Notificaciones de nuevos viajes asignados',
  importance: Importance.high,
);

Future<void> initLocalNotifications() async {
  const AndroidInitializationSettings androidSettings = AndroidInitializationSettings('@mipmap/ic_launcher');
  const DarwinInitializationSettings iosSettings = DarwinInitializationSettings();
  const InitializationSettings initSettings = InitializationSettings(android: androidSettings, iOS: iosSettings);
  await localNotifs.initialize(initSettings);
  if (Platform.isAndroid) {
    final android = localNotifs.resolvePlatformSpecificImplementation<AndroidFlutterLocalNotificationsPlugin>();
    await android?.createNotificationChannel(_assignChannel);
  }
}

Future<void> showAssignmentNotification(String tripId) async {
  const AndroidNotificationDetails android = AndroidNotificationDetails(
    'driver_assignments', 'Driver Assignments',
    channelDescription: 'Notificaciones de nuevos viajes asignados',
    importance: Importance.high,
    priority: Priority.high,
    playSound: true,
    enableVibration: true,
  );
  const DarwinNotificationDetails ios = DarwinNotificationDetails();
  const NotificationDetails details = NotificationDetails(android: android, iOS: ios);
  await localNotifs.show(2001, 'Nuevo viaje asignado', 'Trip $tripId', details);
}

