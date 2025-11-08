import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'config.dart';

class ApiClient {
  final String base;
  final _storage = const FlutterSecureStorage();
  ApiClient({String? baseUrl}) : base = baseUrl ?? Env.baseUrl();

  Future<String?> token() async => await _storage.read(key: 'token');
  Future<void> saveToken(String t) async => _storage.write(key: 'token', value: t);
  Future<void> clear() async => _storage.delete(key: 'token');

  Future<Map<String, dynamic>> postJson(String path, Map body, {bool auth = true}) async {
    final uri = Uri.parse('$base$path');
    final headers = {'Content-Type': 'application/json'};
    if (auth) {
      final t = await token();
      if (t != null) headers['Authorization'] = 'Bearer $t';
    }
    final res = await http.post(uri, headers: headers, body: jsonEncode(body));
    if (res.statusCode >= 200 && res.statusCode < 300) {
      return jsonDecode(res.body) as Map<String, dynamic>;
    }
    throw Exception('HTTP ${res.statusCode}: ${res.body}');
  }

  Future<Map<String, dynamic>> getJson(String path, {Map<String, String>? query, bool auth = true}) async {
    final u = Uri.parse('$base$path').replace(queryParameters: query);
    final headers = <String, String>{};
    if (auth) {
      final t = await token();
      if (t != null) headers['Authorization'] = 'Bearer $t';
    }
    final res = await http.get(u, headers: headers);
    if (res.statusCode >= 200 && res.statusCode < 300) {
      return jsonDecode(res.body) as Map<String, dynamic>;
    }
    throw Exception('HTTP ${res.statusCode}: ${res.body}');
  }
}
