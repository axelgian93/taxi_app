import 'package:test/test.dart';
import 'package:taxi_openapi/taxi_openapi.dart';


/// tests for RiderApi
void main() {
  final instance = TaxiOpenapi().getRiderApi();

  group(RiderApi, () {
    // Mis viajes (rider)
    //
    // Lista los últimos viajes del rider autenticado.
    //
    //Future<RiderMyTrips200Response> riderMyTrips({ int limit, String cursor }) async
    test('test riderMyTrips', () async {
      // TODO
    });

  });
}
