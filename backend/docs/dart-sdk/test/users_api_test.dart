import 'package:test/test.dart';
import 'package:openapi/openapi.dart';


/// tests for UsersApi
void main() {
  final instance = Openapi().getUsersApi();

  group(UsersApi, () {
    // Eliminar FCM token
    //
    // Borra el FCM token asociado al usuario (logout de push notifications).
    //
    //Future<UsersMePushTokenPost200Response> usersMePushTokenDelete() async
    test('test usersMePushTokenDelete', () async {
      // TODO
    });

    // Registrar FCM token
    //
    // Registra o actualiza el FCM token del usuario logueado.
    //
    //Future<UsersMePushTokenPost200Response> usersMePushTokenPost(UsersMePushTokenPostRequest usersMePushTokenPostRequest) async
    test('test usersMePushTokenPost', () async {
      // TODO
    });

  });
}
