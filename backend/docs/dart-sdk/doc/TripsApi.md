# openapi.api.TripsApi

## Load the API package
```dart
import 'package:openapi/api.dart';
```

All URIs are relative to *http://localhost:8080*

Method | HTTP request | Description
------------- | ------------- | -------------
[**tripsAccept**](TripsApi.md#tripsaccept) | **POST** /trips/{id}/accept | Aceptar viaje
[**tripsArrived**](TripsApi.md#tripsarrived) | **POST** /trips/{id}/arrived | Arribo del conductor
[**tripsCancel**](TripsApi.md#tripscancel) | **POST** /trips/{id}/cancel | Cancelar viaje (rider)
[**tripsComplete**](TripsApi.md#tripscomplete) | **POST** /trips/{id}/complete | Completar viaje
[**tripsRequest**](TripsApi.md#tripsrequest) | **POST** /trips/request | Solicitar viaje
[**tripsSseById**](TripsApi.md#tripsssebyid) | **GET** /trips/{id}/sse | Trip live updates (SSE)
[**tripsStart**](TripsApi.md#tripsstart) | **POST** /trips/{id}/start | Iniciar viaje


# **tripsAccept**
> TripsRequest200Response tripsAccept(id)

Aceptar viaje

El conductor acepta el viaje asignado.

### Example
```dart
import 'package:openapi/api.dart';

final api = Openapi().getTripsApi();
final String id = id_example; // String | 

try {
    final response = api.tripsAccept(id);
    print(response);
} catch on DioException (e) {
    print('Exception when calling TripsApi->tripsAccept: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**|  | 

### Return type

[**TripsRequest200Response**](TripsRequest200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **tripsArrived**
> TripsRequest200Response tripsArrived(id)

Arribo del conductor

El conductor llega al punto de recogida.

### Example
```dart
import 'package:openapi/api.dart';

final api = Openapi().getTripsApi();
final String id = id_example; // String | 

try {
    final response = api.tripsArrived(id);
    print(response);
} catch on DioException (e) {
    print('Exception when calling TripsApi->tripsArrived: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**|  | 

### Return type

[**TripsRequest200Response**](TripsRequest200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **tripsCancel**
> TripsRequest200Response tripsCancel(id, tripsCancelRequest)

Cancelar viaje (rider)

El rider cancela el viaje; puede aplicar fee segÃºn estado y reglas.

### Example
```dart
import 'package:openapi/api.dart';

final api = Openapi().getTripsApi();
final String id = id_example; // String | 
final TripsCancelRequest tripsCancelRequest = ; // TripsCancelRequest | 

try {
    final response = api.tripsCancel(id, tripsCancelRequest);
    print(response);
} catch on DioException (e) {
    print('Exception when calling TripsApi->tripsCancel: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**|  | 
 **tripsCancelRequest** | [**TripsCancelRequest**](TripsCancelRequest.md)|  | [optional] 

### Return type

[**TripsRequest200Response**](TripsRequest200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **tripsComplete**
> TripsRequest200Response tripsComplete(id)

Completar viaje

Completa el viaje y liquida el pago (captura Stripe o marca CASH pagado).

### Example
```dart
import 'package:openapi/api.dart';

final api = Openapi().getTripsApi();
final String id = id_example; // String | 

try {
    final response = api.tripsComplete(id);
    print(response);
} catch on DioException (e) {
    print('Exception when calling TripsApi->tripsComplete: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**|  | 

### Return type

[**TripsRequest200Response**](TripsRequest200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **tripsRequest**
> TripsRequest200Response tripsRequest(tripsRequestRequest)

Solicitar viaje

Crea un viaje y asigna el conductor disponible mÃ¡s cercano.

### Example
```dart
import 'package:openapi/api.dart';

final api = Openapi().getTripsApi();
final TripsRequestRequest tripsRequestRequest = ; // TripsRequestRequest | 

try {
    final response = api.tripsRequest(tripsRequestRequest);
    print(response);
} catch on DioException (e) {
    print('Exception when calling TripsApi->tripsRequest: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **tripsRequestRequest** | [**TripsRequestRequest**](TripsRequestRequest.md)|  | 

### Return type

[**TripsRequest200Response**](TripsRequest200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **tripsSseById**
> String tripsSseById(id)

Trip live updates (SSE)

Stream de eventos del viaje en tiempo real para Rider/Driver via Server-Sent Events. EnvÃ­a eventos como INIT/ASSIGNED/ACCEPTED/ARRIVED/STARTED/COMPLETED/CANCELED.

### Example
```dart
import 'package:openapi/api.dart';

final api = Openapi().getTripsApi();
final String id = id_example; // String | 

try {
    final response = api.tripsSseById(id);
    print(response);
} catch on DioException (e) {
    print('Exception when calling TripsApi->tripsSseById: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**|  | 

### Return type

**String**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/event-stream

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **tripsStart**
> TripsRequest200Response tripsStart(id, tripsStartRequest)

Iniciar viaje

Inicia el viaje; si method=CARD y Stripe estÃ¡ configurado, preautoriza.

### Example
```dart
import 'package:openapi/api.dart';

final api = Openapi().getTripsApi();
final String id = id_example; // String | 
final TripsStartRequest tripsStartRequest = ; // TripsStartRequest | 

try {
    final response = api.tripsStart(id, tripsStartRequest);
    print(response);
} catch on DioException (e) {
    print('Exception when calling TripsApi->tripsStart: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**|  | 
 **tripsStartRequest** | [**TripsStartRequest**](TripsStartRequest.md)|  | [optional] 

### Return type

[**TripsRequest200Response**](TripsRequest200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

