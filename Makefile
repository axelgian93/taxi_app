## Simple helpers (optional)

.PHONY: rider-dev driver-create driver-dev driver-ios-check

rider-dev:
	cd mobile-rider && flutter pub get && flutter run -d chrome

## With dart-define for device/emulator
rider-dev-define:
	cd mobile-rider && flutter pub get && flutter run --dart-define=ENV=dev --dart-define=BASE_URL=http://10.0.2.2:8081

driver-create:
	cd mobile-driver && flutter create .

driver-dev:
	cd mobile-driver && flutter pub get && flutter run

driver-dev-define:
	cd mobile-driver && flutter pub get && flutter run --dart-define=ENV=dev --dart-define=BASE_URL=http://10.0.2.2:8081

driver-ios-check:
	cd mobile-driver && dart run tool/check_ios_setup.dart
