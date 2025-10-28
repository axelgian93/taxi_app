import 'package:flutter/material.dart';
import 'screens/login_screen.dart';

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
    );
  }
}

