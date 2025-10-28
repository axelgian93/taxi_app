import 'package:test/test.dart';
import 'package:openapi/openapi.dart';


/// tests for AuthApi
void main() {
  final instance = Openapi().getAuthApi();

  group(AuthApi, () {
    //Future<AuthRegisterPost201Response> authLoginPost(AuthLoginPostRequest authLoginPostRequest) async
    test('test authLoginPost', () async {
      // TODO
    });

    //Future authMeGet() async
    test('test authMeGet', () async {
      // TODO
    });

    //Future<AuthRegisterPost201Response> authRegisterPost(AuthRegisterPostRequest authRegisterPostRequest) async
    test('test authRegisterPost', () async {
      // TODO
    });

  });
}
