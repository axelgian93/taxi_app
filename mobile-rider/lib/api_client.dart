import 'package:taxi_openapi/taxi_openapi.dart';
import 'package:dio/dio.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:async';

class ApiClient {
  static final ApiClient _i = ApiClient._();
  ApiClient._();
  factory ApiClient() => _i;

  final TaxiOpenapi _open = TaxiOpenapi();
  String _baseUrl = '';
  String? _token;
  String? _refreshToken;
  Future<Map<String, String>?>? _refreshInFlight;
  void Function()? _onAuthExpired;

  void configure({required String baseUrl, String? token, String? refreshToken}) {
    _baseUrl = baseUrl;
    _token = token;
    _refreshToken = refreshToken ?? _refreshToken;
    _open.dio.options.baseUrl = _baseUrl;
    if (_token != null && _token!.isNotEmpty) {
      // Name matches security scheme in OpenAPI
      _open.setBearerAuth('bearerAuth', _token!);
    } else {
      _open.setBearerAuth('bearerAuth', '');
    }
    _installInterceptorOnce();
  }

  String get baseUrl => _baseUrl;
  String? get token => _token;
  String? get refreshToken => _refreshToken;

  AuthApi get auth => _open.getAuthApi();
  UsersApi get users => _open.getUsersApi();
  DriversApi get drivers => _open.getDriversApi();
  TripsApi get trips => _open.getTripsApi();
  PaymentsApi get payments => _open.getPaymentsApi();

  // Expose Dio for ad-hoc calls (endpoints not in SDK)
  Dio get dio => _open.dio;

  bool _interceptorInstalled = false;
  void _installInterceptorOnce() {
    if (_interceptorInstalled) return;
    _interceptorInstalled = true;
    _open.dio.interceptors.add(InterceptorsWrapper(
      onError: (DioException err, ErrorInterceptorHandler handler) async {
        if (err.response?.statusCode == 401 && (_refreshToken != null && _refreshToken!.isNotEmpty)) {
          try {
            _refreshInFlight ??= _refreshAuthToken().whenComplete(() => _refreshInFlight = null);
            final newTokens = await _refreshInFlight;
            if (newTokens != null) {
              final req = err.requestOptions;
              if (_token != null && _token!.isNotEmpty) {
                req.headers['Authorization'] = 'Bearer ' + _token!;
              }
              final res = await _open.dio.fetch(req);
              return handler.resolve(res);
            }
          } catch (_) {}
          await _handleAuthExpired();
        }
        return handler.next(err);
      },
    ));
  }

  Future<bool> saveTokens({String? token, String? refreshToken}) async {
    final prefs = await SharedPreferences.getInstance();
    if (token != null) await prefs.setString('auth_token', token);
    if (refreshToken != null) await prefs.setString('refresh_token', refreshToken);
    return true;
  }

  Future<bool> loadTokens() async {
    final prefs = await SharedPreferences.getInstance();
    _token = prefs.getString('auth_token');
    _refreshToken = prefs.getString('refresh_token');
    if (_token != null && _token!.isNotEmpty) _open.setBearerAuth('bearerAuth', _token!);
    _installInterceptorOnce();
    return _token != null && _token!.isNotEmpty;
  }

  Future<Map<String, String>?> loginRaw(String email, String password) async {
    final r = await _open.dio.post(
      '/auth/login',
      options: Options(headers: {'content-type': 'application/json'}),
      data: {'email': email, 'password': password},
    );
    if (r.statusCode == 200 && r.data is Map) {
      final m = r.data as Map;
      final t = (m['token'] ?? '') as String;
      final rt = (m['refreshToken'] ?? '') as String;
      _token = t;
      _refreshToken = rt;
      _open.setBearerAuth('bearerAuth', t);
      await saveTokens(token: t, refreshToken: rt);
      return {'token': t, 'refreshToken': rt};
    }
    return null;
  }

  Future<Map<String, String>?> _refreshAuthToken() async {
    if (_refreshToken == null || _refreshToken!.isEmpty) return null;
    try {
      final r = await _open.dio.post(
        '/auth/refresh',
        options: Options(headers: {'content-type': 'application/json'}),
        data: {'refreshToken': _refreshToken},
      );
      if (r.statusCode == 200 && r.data is Map) {
        final m = r.data as Map;
        final t = (m['token'] ?? '') as String;
        final rt = (m['refreshToken'] ?? '') as String;
        if (t.isNotEmpty && rt.isNotEmpty) {
          _token = t;
          _refreshToken = rt;
          _open.setBearerAuth('bearerAuth', t);
          await saveTokens(token: t, refreshToken: rt);
          return {'token': t, 'refreshToken': rt};
        }
      }
    } catch (_) {}
    return null;
  }

  void setAuthExpiredHandler(void Function()? handler) {
    _onAuthExpired = handler;
  }

  Future<void> _handleAuthExpired() async {
    await clearSession();
    final cb = _onAuthExpired;
    if (cb != null) {
      try { cb(); } catch (_) {}
    }
  }

  Future<void> clearSession() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('auth_token');
    await prefs.remove('refresh_token');
    _token = null;
    _refreshToken = null;
    _open.setBearerAuth('bearerAuth', '');
  }

  Future<bool> ping({String? baseUrl}) async {
    final url = (baseUrl ?? _baseUrl).trim();
    if (url.isEmpty) return false;
    try {
      final res = await _open.dio.get('$url/healthz', options: Options(headers: {'accept': 'application/json'}));
      return res.statusCode == 200;
    } catch (_) {
      return false;
    }
  }
}
