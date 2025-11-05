# taxi_openapi.api.PaymentsApi

## Load the API package
```dart
import 'package:taxi_openapi/api.dart';
```

All URIs are relative to *http://localhost:8080*

Method | HTTP request | Description
------------- | ------------- | -------------
[**adminPaymentsReport**](PaymentsApi.md#adminpaymentsreport) | **GET** /admin/payments/report | Reporte de pagos (ADMIN)
[**adminPaymentsSummaryStatus**](PaymentsApi.md#adminpaymentssummarystatus) | **GET** /admin/payments/summary-status | Resumen por estado de pago (ADMIN)
[**adminPaymentsTopDrivers**](PaymentsApi.md#adminpaymentstopdrivers) | **GET** /admin/payments/top-drivers | Top drivers por ingresos (ADMIN)
[**adminPaymentsTopRiders**](PaymentsApi.md#adminpaymentstopriders) | **GET** /admin/payments/top-riders | Top riders por gasto (ADMIN)
[**adminRefundsList**](PaymentsApi.md#adminrefundslist) | **GET** /admin/refunds | Listar refunds (ADMIN)
[**paymentsCaptureByTrip**](PaymentsApi.md#paymentscapturebytrip) | **POST** /payments/{tripId}/capture | Capturar pago autorizado (ADMIN)
[**paymentsCreateSetupIntent**](PaymentsApi.md#paymentscreatesetupintent) | **POST** /payments/setup-intent | Crear SetupIntent
[**paymentsGetByTrip**](PaymentsApi.md#paymentsgetbytrip) | **GET** /payments/{tripId} | Obtener pago por tripId
[**paymentsList**](PaymentsApi.md#paymentslist) | **GET** /payments | Listar pagos (ADMIN)
[**paymentsReceiptByTrip**](PaymentsApi.md#paymentsreceiptbytrip) | **GET** /payments/{tripId}/receipt | Obtener recibo
[**paymentsRefundByTrip**](PaymentsApi.md#paymentsrefundbytrip) | **POST** /payments/{tripId}/refund | Refund/cancel (ADMIN)
[**paymentsRefundsByTrip**](PaymentsApi.md#paymentsrefundsbytrip) | **GET** /payments/{tripId}/refunds | Refunds por tripId
[**paymentsSetDefaultMethod**](PaymentsApi.md#paymentssetdefaultmethod) | **POST** /payments/set-default | Definir PM por defecto
[**webhooksStripe**](PaymentsApi.md#webhooksstripe) | **POST** /webhooks/stripe | Stripe webhook


# **adminPaymentsReport**
> AdminPaymentsReport200Response adminPaymentsReport(city, from, to, groupBy, format)

Reporte de pagos (ADMIN)

Agregados de pagos por fecha/ciudad/estado/m�todo. Si format=csv, devuelve text/csv.

### Example
```dart
import 'package:taxi_openapi/api.dart';

final api = TaxiOpenapi().getPaymentsApi();
final String city = city_example; // String | 
final DateTime from = 2013-10-20T19:20:30+01:00; // DateTime | 
final DateTime to = 2013-10-20T19:20:30+01:00; // DateTime | 
final String groupBy = groupBy_example; // String | 
final String format = format_example; // String | 

try {
    final response = api.adminPaymentsReport(city, from, to, groupBy, format);
    print(response);
} catch on DioException (e) {
    print('Exception when calling PaymentsApi->adminPaymentsReport: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **city** | **String**|  | [optional] 
 **from** | **DateTime**|  | [optional] 
 **to** | **DateTime**|  | [optional] 
 **groupBy** | **String**|  | [optional] [default to 'day']
 **format** | **String**|  | [optional] [default to 'json']

### Return type

[**AdminPaymentsReport200Response**](AdminPaymentsReport200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, text/csv

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **adminPaymentsSummaryStatus**
> AdminPaymentsSummaryStatus200Response adminPaymentsSummaryStatus(city, from, to, format)

Resumen por estado de pago (ADMIN)

Conteo e importe por estado (PENDING/AUTHORIZED/PAID/FAILED/REFUNDED). CSV disponible.

### Example
```dart
import 'package:taxi_openapi/api.dart';

final api = TaxiOpenapi().getPaymentsApi();
final String city = city_example; // String | 
final DateTime from = 2013-10-20T19:20:30+01:00; // DateTime | 
final DateTime to = 2013-10-20T19:20:30+01:00; // DateTime | 
final String format = format_example; // String | 

try {
    final response = api.adminPaymentsSummaryStatus(city, from, to, format);
    print(response);
} catch on DioException (e) {
    print('Exception when calling PaymentsApi->adminPaymentsSummaryStatus: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **city** | **String**|  | [optional] 
 **from** | **DateTime**|  | [optional] 
 **to** | **DateTime**|  | [optional] 
 **format** | **String**|  | [optional] [default to 'json']

### Return type

[**AdminPaymentsSummaryStatus200Response**](AdminPaymentsSummaryStatus200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **adminPaymentsTopDrivers**
> AdminPaymentsTopDrivers200Response adminPaymentsTopDrivers(city, from, to, limit, format)

Top drivers por ingresos (ADMIN)

Ingresos por driver con pagos PAID. Filtra por fecha/ciudad. CSV disponible.

### Example
```dart
import 'package:taxi_openapi/api.dart';

final api = TaxiOpenapi().getPaymentsApi();
final String city = city_example; // String | 
final DateTime from = 2013-10-20T19:20:30+01:00; // DateTime | 
final DateTime to = 2013-10-20T19:20:30+01:00; // DateTime | 
final int limit = 56; // int | 
final String format = format_example; // String | 

try {
    final response = api.adminPaymentsTopDrivers(city, from, to, limit, format);
    print(response);
} catch on DioException (e) {
    print('Exception when calling PaymentsApi->adminPaymentsTopDrivers: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **city** | **String**|  | [optional] 
 **from** | **DateTime**|  | [optional] 
 **to** | **DateTime**|  | [optional] 
 **limit** | **int**|  | [optional] [default to 20]
 **format** | **String**|  | [optional] [default to 'json']

### Return type

[**AdminPaymentsTopDrivers200Response**](AdminPaymentsTopDrivers200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **adminPaymentsTopRiders**
> AdminPaymentsTopRiders200Response adminPaymentsTopRiders(city, from, to, limit, format)

Top riders por gasto (ADMIN)

Gasto por rider con pagos PAID. Filtra por fecha/ciudad. CSV disponible.

### Example
```dart
import 'package:taxi_openapi/api.dart';

final api = TaxiOpenapi().getPaymentsApi();
final String city = city_example; // String | 
final DateTime from = 2013-10-20T19:20:30+01:00; // DateTime | 
final DateTime to = 2013-10-20T19:20:30+01:00; // DateTime | 
final int limit = 56; // int | 
final String format = format_example; // String | 

try {
    final response = api.adminPaymentsTopRiders(city, from, to, limit, format);
    print(response);
} catch on DioException (e) {
    print('Exception when calling PaymentsApi->adminPaymentsTopRiders: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **city** | **String**|  | [optional] 
 **from** | **DateTime**|  | [optional] 
 **to** | **DateTime**|  | [optional] 
 **limit** | **int**|  | [optional] [default to 20]
 **format** | **String**|  | [optional] [default to 'json']

### Return type

[**AdminPaymentsTopRiders200Response**](AdminPaymentsTopRiders200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **adminRefundsList**
> AdminRefundsList200Response adminRefundsList(userId, city, from, to, limit, cursor, format)

Listar refunds (ADMIN)

Lista auditorias de reembolso/cancelación con filtros y CSV. Si format=csv, devuelve text/csv.

### Example
```dart
import 'package:taxi_openapi/api.dart';

final api = TaxiOpenapi().getPaymentsApi();
final String userId = userId_example; // String | 
final String city = city_example; // String | 
final DateTime from = 2013-10-20T19:20:30+01:00; // DateTime | 
final DateTime to = 2013-10-20T19:20:30+01:00; // DateTime | 
final int limit = 56; // int | 
final String cursor = cursor_example; // String | 
final String format = format_example; // String | 

try {
    final response = api.adminRefundsList(userId, city, from, to, limit, cursor, format);
    print(response);
} catch on DioException (e) {
    print('Exception when calling PaymentsApi->adminRefundsList: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userId** | **String**|  | [optional] 
 **city** | **String**|  | [optional] 
 **from** | **DateTime**|  | [optional] 
 **to** | **DateTime**|  | [optional] 
 **limit** | **int**|  | [optional] [default to 50]
 **cursor** | **String**|  | [optional] 
 **format** | **String**|  | [optional] [default to 'json']

### Return type

[**AdminRefundsList200Response**](AdminRefundsList200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, text/csv

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **paymentsCaptureByTrip**
> DriverUpdateStatus200Response paymentsCaptureByTrip(tripId)

Capturar pago autorizado (ADMIN)

Captura un PaymentIntent autorizado de Stripe para el trip.

### Example
```dart
import 'package:taxi_openapi/api.dart';

final api = TaxiOpenapi().getPaymentsApi();
final String tripId = trp_123; // String | 

try {
    final response = api.paymentsCaptureByTrip(tripId);
    print(response);
} catch on DioException (e) {
    print('Exception when calling PaymentsApi->paymentsCaptureByTrip: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **tripId** | **String**|  | 

### Return type

[**DriverUpdateStatus200Response**](DriverUpdateStatus200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **paymentsCreateSetupIntent**
> PaymentsCreateSetupIntent200Response paymentsCreateSetupIntent()

Crear SetupIntent

Rider crea un SetupIntent para guardar una tarjeta. Devuelve client_secret.

### Example
```dart
import 'package:taxi_openapi/api.dart';

final api = TaxiOpenapi().getPaymentsApi();

try {
    final response = api.paymentsCreateSetupIntent();
    print(response);
} catch on DioException (e) {
    print('Exception when calling PaymentsApi->paymentsCreateSetupIntent: $e\n');
}
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**PaymentsCreateSetupIntent200Response**](PaymentsCreateSetupIntent200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **paymentsGetByTrip**
> PaymentsList200ResponseItemsInner paymentsGetByTrip(tripId)

Obtener pago por tripId

Devuelve el registro de Payment asociado a un Trip. Requiere JWT y ser due�o del viaje o ADMIN.

### Example
```dart
import 'package:taxi_openapi/api.dart';

final api = TaxiOpenapi().getPaymentsApi();
final String tripId = trp_123; // String | 

try {
    final response = api.paymentsGetByTrip(tripId);
    print(response);
} catch on DioException (e) {
    print('Exception when calling PaymentsApi->paymentsGetByTrip: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **tripId** | **String**|  | 

### Return type

[**PaymentsList200ResponseItemsInner**](PaymentsList200ResponseItemsInner.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **paymentsList**
> PaymentsList200Response paymentsList(userId, status, city, from, to, limit, cursor, format)

Listar pagos (ADMIN)

Lista pagos con filtros opcionales y paginacion. Si format=csv, devuelve text/csv.

### Example
```dart
import 'package:taxi_openapi/api.dart';

final api = TaxiOpenapi().getPaymentsApi();
final String userId = userId_example; // String | 
final String status = status_example; // String | 
final String city = city_example; // String | 
final DateTime from = 2013-10-20T19:20:30+01:00; // DateTime | 
final DateTime to = 2013-10-20T19:20:30+01:00; // DateTime | 
final int limit = 56; // int | 
final String cursor = cursor_example; // String | 
final String format = format_example; // String | 

try {
    final response = api.paymentsList(userId, status, city, from, to, limit, cursor, format);
    print(response);
} catch on DioException (e) {
    print('Exception when calling PaymentsApi->paymentsList: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userId** | **String**|  | [optional] 
 **status** | **String**|  | [optional] 
 **city** | **String**|  | [optional] 
 **from** | **DateTime**|  | [optional] 
 **to** | **DateTime**|  | [optional] 
 **limit** | **int**|  | [optional] [default to 50]
 **cursor** | **String**|  | [optional] 
 **format** | **String**|  | [optional] [default to 'json']

### Return type

[**PaymentsList200Response**](PaymentsList200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, text/csv

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **paymentsReceiptByTrip**
> PaymentsReceiptByTrip200Response paymentsReceiptByTrip(tripId)

Obtener recibo

Recibo simple del pago asociado al viaje. type=TRIP o CANCELLATION_FEE.

### Example
```dart
import 'package:taxi_openapi/api.dart';

final api = TaxiOpenapi().getPaymentsApi();
final String tripId = trp_123; // String | 

try {
    final response = api.paymentsReceiptByTrip(tripId);
    print(response);
} catch on DioException (e) {
    print('Exception when calling PaymentsApi->paymentsReceiptByTrip: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **tripId** | **String**|  | 

### Return type

[**PaymentsReceiptByTrip200Response**](PaymentsReceiptByTrip200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **paymentsRefundByTrip**
> DriverUpdateStatus200Response paymentsRefundByTrip(tripId, paymentsRefundByTripRequest)

Refund/cancel (ADMIN)

Reembolsa un Payment capturado (Stripe) o cancela autorizacion. Para otros metodos, marca REFUNDED y registra auditoria.

### Example
```dart
import 'package:taxi_openapi/api.dart';

final api = TaxiOpenapi().getPaymentsApi();
final String tripId = trp_123; // String | 
final PaymentsRefundByTripRequest paymentsRefundByTripRequest = ; // PaymentsRefundByTripRequest | 

try {
    final response = api.paymentsRefundByTrip(tripId, paymentsRefundByTripRequest);
    print(response);
} catch on DioException (e) {
    print('Exception when calling PaymentsApi->paymentsRefundByTrip: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **tripId** | **String**|  | 
 **paymentsRefundByTripRequest** | [**PaymentsRefundByTripRequest**](PaymentsRefundByTripRequest.md)|  | [optional] 

### Return type

[**DriverUpdateStatus200Response**](DriverUpdateStatus200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **paymentsRefundsByTrip**
> PaymentsRefundsByTrip200Response paymentsRefundsByTrip(tripId)

Refunds por tripId

Lista auditorias de reembolso/cancelación del pago de un trip. Requiere JWT y ser due�o del viaje o ADMIN.

### Example
```dart
import 'package:taxi_openapi/api.dart';

final api = TaxiOpenapi().getPaymentsApi();
final String tripId = trp_123; // String | 

try {
    final response = api.paymentsRefundsByTrip(tripId);
    print(response);
} catch on DioException (e) {
    print('Exception when calling PaymentsApi->paymentsRefundsByTrip: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **tripId** | **String**|  | 

### Return type

[**PaymentsRefundsByTrip200Response**](PaymentsRefundsByTrip200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **paymentsSetDefaultMethod**
> AuthLogout200Response paymentsSetDefaultMethod(paymentsSetDefaultMethodRequest)

Definir PM por defecto

Guarda el paymentMethod como predeterminado en Stripe y DB.

### Example
```dart
import 'package:taxi_openapi/api.dart';

final api = TaxiOpenapi().getPaymentsApi();
final PaymentsSetDefaultMethodRequest paymentsSetDefaultMethodRequest = ; // PaymentsSetDefaultMethodRequest | 

try {
    final response = api.paymentsSetDefaultMethod(paymentsSetDefaultMethodRequest);
    print(response);
} catch on DioException (e) {
    print('Exception when calling PaymentsApi->paymentsSetDefaultMethod: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **paymentsSetDefaultMethodRequest** | [**PaymentsSetDefaultMethodRequest**](PaymentsSetDefaultMethodRequest.md)|  | 

### Return type

[**AuthLogout200Response**](AuthLogout200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **webhooksStripe**
> webhooksStripe()

Stripe webhook

### Example
```dart
import 'package:taxi_openapi/api.dart';

final api = TaxiOpenapi().getPaymentsApi();

try {
    api.webhooksStripe();
} catch on DioException (e) {
    print('Exception when calling PaymentsApi->webhooksStripe: $e\n');
}
```

### Parameters
This endpoint does not need any parameter.

### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

