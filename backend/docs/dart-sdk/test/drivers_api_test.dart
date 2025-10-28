import 'package:test/test.dart';
import 'package:openapi/openapi.dart';


/// tests for DriversApi
void main() {
  final instance = Openapi().getDriversApi();

  group(DriversApi, () {
    // Actualizar estado del driver
    //
    // Driver reporta su estado (IDLE/ON_TRIP/etc.). Requiere JWT.
    //
    //Future<DriversStatusPost200Response> driversLocationPost({ DriversStatusPostRequest driversStatusPostRequest }) async
    test('test driversLocationPost', () async {
      // TODO
    });

    // Actualizar estado del driver
    //
    // Driver reporta su estado (IDLE/ON_TRIP/etc.). Requiere JWT.
    //
    //Future<DriversStatusPost200Response> driversStatusPost({ DriversStatusPostRequest driversStatusPostRequest }) async
    test('test driversStatusPost', () async {
      // TODO
    });

  });
}
