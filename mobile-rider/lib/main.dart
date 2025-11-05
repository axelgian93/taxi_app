import 'package:flutter/material.dart';
import 'screens/login_screen.dart';
import 'screens/receipt_screen.dart';
import 'screens/history_screen.dart';
import 'screens/sessions_screen.dart';

void main() {
  runApp(const TaxiRiderApp());
}

class TaxiRiderApp extends StatelessWidget {
  const TaxiRiderApp({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Taxi Rider',
      theme: ThemeData(useMaterial3: true, colorSchemeSeed: Colors.indigo),
      home: const LoginScreen(),
      routes: {
        '/history': (ctx) => const HistoryScreen(),
        '/sessions': (ctx) => const SessionsScreen(),
      },
      onGenerateRoute: (settings) {
        if (settings.name == '/receipt') {
          final tripId = settings.arguments as String?;
          if (tripId != null && tripId.isNotEmpty) {
            return MaterialPageRoute(builder: (_) => ReceiptScreen(tripId: tripId));
          }
        }
        return null;
      },
    );
  }
}
