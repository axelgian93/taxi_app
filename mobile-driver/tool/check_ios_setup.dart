import 'dart:io';

void main(List<String> args) async {
  final projectDir = Directory.current.path;
  final iosRunner = Directory('ios/Runner');
  print('iOS setup checker');

  if (!iosRunner.existsSync()) {
    print('• ios/Runner no existe. Ejecuta: flutter create . (dentro de mobile-driver)');
    exit(1);
  }

  final infoPlist = File('ios/Runner/Info.plist');
  if (!infoPlist.existsSync()) {
    print('• ios/Runner/Info.plist no encontrado. Crea el proyecto iOS y vuelve a correr.');
    exit(1);
  }
  final plist = infoPlist.readAsStringSync();
  var ok = true;

  bool containsKey(String key) => RegExp('<key>\s*${RegExp.escape(key)}\s*</key>').hasMatch(plist);
  bool containsBackgroundLocation() {
    final bgModes = RegExp('<key>\s*UIBackgroundModes\s*</key>[\s\S]*?<array>[\s\S]*?</array>');
    final m = bgModes.firstMatch(plist);
    if (m == null) return false;
    final arr = m.group(0)!;
    return arr.contains('<string>location</string>');
  }

  if (!containsKey('NSLocationWhenInUseUsageDescription')) {
    print('✗ Falta NSLocationWhenInUseUsageDescription en Info.plist'); ok = false;
  } else { print('✓ NSLocationWhenInUseUsageDescription'); }
  if (!containsKey('NSLocationAlwaysAndWhenInUseUsageDescription')) {
    print('✗ Falta NSLocationAlwaysAndWhenInUseUsageDescription en Info.plist'); ok = false;
  } else { print('✓ NSLocationAlwaysAndWhenInUseUsageDescription'); }
  if (!containsBackgroundLocation()) {
    print('✗ Falta UIBackgroundModes con "location" en Info.plist'); ok = false;
  } else { print('✓ UIBackgroundModes incluye location'); }

  // Try to detect Google Maps API key usage in AppDelegate (optional)
  final appDelegateSwift = File('ios/Runner/AppDelegate.swift');
  if (appDelegateSwift.existsSync()) {
    final s = appDelegateSwift.readAsStringSync();
    if (s.contains('GMSServices.provideAPIKey')) {
      print('✓ AppDelegate.swift implementa GMSServices.provideAPIKey');
    } else {
      print('• AppDelegate.swift no contiene GMSServices.provideAPIKey. Agrega tu API key de Google Maps en AppDelegate.');
    }
  } else {
    print('• AppDelegate.swift no encontrado (verifica lenguaje Swift/ObjC).');
  }

  if (!ok) {
    print('\nSugerencia: consulta ios/Info.plist.example para copiar los keys necesarios.');
    exit(2);
  }

  print('\n✓ iOS checklist básico OK.');
}

