import 'package:test/test.dart';
import 'package:openapi/openapi.dart';


/// tests for PaymentsApi
void main() {
  final instance = Openapi().getPaymentsApi();

  group(PaymentsApi, () {
    // Listar refunds (ADMIN)
    //
    // Lista auditorías de reembolso/cancelación con filtros y CSV.
    //
    //Future<AdminRefundsGet200Response> adminRefundsGet({ String userId, String city, DateTime from, DateTime to, int limit, String cursor, String format }) async
    test('test adminRefundsGet', () async {
      // TODO
    });

    // Listar pagos (ADMIN)
    //
    // Lista pagos con filtros opcionales y paginación.
    //
    //Future<PaymentsGet200Response> paymentsGet({ String userId, String status, String city, DateTime from, DateTime to, int limit, String cursor, String format }) async
    test('test paymentsGet', () async {
      // TODO
    });

    // Definir PM por defecto
    //
    // Guarda el paymentMethod como predeterminado en Stripe y DB.
    //
    //Future<DriversStatusPost200Response> paymentsSetDefaultPost(PaymentsSetDefaultPostRequest paymentsSetDefaultPostRequest) async
    test('test paymentsSetDefaultPost', () async {
      // TODO
    });

    // Crear SetupIntent
    //
    // Rider crea un SetupIntent para guardar una tarjeta. Devuelve client_secret.
    //
    //Future<PaymentsSetupIntentPost200Response> paymentsSetupIntentPost() async
    test('test paymentsSetupIntentPost', () async {
      // TODO
    });

    // Capturar pago autorizado (ADMIN)
    //
    // Captura un PaymentIntent autorizado de Stripe para el trip.
    //
    //Future<DriversStatusPost200Response> paymentsTripIdCapturePost(String tripId) async
    test('test paymentsTripIdCapturePost', () async {
      // TODO
    });

    // Obtener pago por tripId
    //
    // Devuelve el registro de Payment asociado a un Trip. Requiere JWT y ser dueño del viaje o ADMIN.
    //
    //Future<PaymentsGet200ResponseItemsInner> paymentsTripIdGet(String tripId) async
    test('test paymentsTripIdGet', () async {
      // TODO
    });

    // Obtener recibo
    //
    // Recibo simple del pago asociado al viaje. type=TRIP o CANCELLATION_FEE.
    //
    //Future<PaymentsTripIdReceiptGet200Response> paymentsTripIdReceiptGet(String tripId) async
    test('test paymentsTripIdReceiptGet', () async {
      // TODO
    });

    // Refund/cancel (ADMIN)
    //
    // Reembolsa un Payment capturado (Stripe) o cancela autorización. Para otros métodos, marca REFUNDED y registra auditoría.
    //
    //Future<DriversStatusPost200Response> paymentsTripIdRefundPost(String tripId, { PaymentsTripIdRefundPostRequest paymentsTripIdRefundPostRequest }) async
    test('test paymentsTripIdRefundPost', () async {
      // TODO
    });

    // Refunds por tripId
    //
    // Lista auditorías de reembolso/cancelación del pago de un trip. Requiere JWT y ser dueño del viaje o ADMIN.
    //
    //Future<PaymentsTripIdRefundsGet200Response> paymentsTripIdRefundsGet(String tripId) async
    test('test paymentsTripIdRefundsGet', () async {
      // TODO
    });

    // Stripe webhook
    //
    //Future webhooksStripePost() async
    test('test webhooksStripePost', () async {
      // TODO
    });

  });
}
