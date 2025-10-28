import 'package:openapi/openapi.dart';
import 'package:dio/dio.dart';

class ApiClient {
  static final ApiClient _i = ApiClient._();
  ApiClient._();
  factory ApiClient() => _i;

  final Openapi _open = Openapi();
  String _baseUrl = '';
  String? _token;

  void configure({required String baseUrl, String? token}) {
    _baseUrl = baseUrl;
    _token = token;
    _open.dio.options.baseUrl = _baseUrl;
    if (_token != null && _token!.isNotEmpty) {
      // Name matches security scheme in OpenAPI
      _open.setBearerAuth('bearerAuth', _token!);
    } else {
      _open.setBearerAuth('bearerAuth', '');
    }
  }

  String get baseUrl => _baseUrl;
  String? get token => _token;

  AuthApi get auth => _open.getAuthApi();
  UsersApi get users => _open.getUsersApi();
  DriversApi get drivers => _open.getDriversApi();
  TripsApi get trips => _open.getTripsApi();
  PaymentsApi get payments => _open.getPaymentsApi();

  // Expose Dio for ad-hoc calls (endpoints not in SDK)
  Dio get dio => _open.dio;
}
