import 'package:test/test.dart';
import 'package:openapi/openapi.dart';


/// tests for AdminApi
void main() {
  final instance = Openapi().getAdminApi();

  group(AdminApi, () {
    // Diagnostics matching
    //
    // Estado de PostGIS y parámetros de matching (env) + contadores de uso.
    //
    //Future<AdminDiagnosticsMatchingGet200Response> adminDiagnosticsMatchingGet() async
    test('test adminDiagnosticsMatchingGet', () async {
      // TODO
    });

    // Prometheus metrics
    //
    // Exposición de métricas en formato Prometheus. Protegido por rol ADMIN.
    //
    //Future adminMetricsGet() async
    test('test adminMetricsGet', () async {
      // TODO
    });

    //Future<AdminTripsGet200Response> adminTripsGet({ int limit, String cursor }) async
    test('test adminTripsGet', () async {
      // TODO
    });

    // Prometheus metrics (public)
    //
    // Endpoint para scraping por Prometheus. Requiere header x-metrics-token si METRICS_TOKEN está definido o si METRICS_PUBLIC=false.
    //
    //Future metricsGet() async
    test('test metricsGet', () async {
      // TODO
    });

  });
}
