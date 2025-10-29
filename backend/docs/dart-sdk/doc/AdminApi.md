# openapi.api.AdminApi

## Load the API package
```dart
import 'package:openapi/api.dart';
```

All URIs are relative to *http://localhost:8080*

Method | HTTP request | Description
------------- | ------------- | -------------
[**adminDiagnosticsMatching**](AdminApi.md#admindiagnosticsmatching) | **GET** /admin/diagnostics/matching | Diagnostics matching
[**adminMetrics**](AdminApi.md#adminmetrics) | **GET** /admin/metrics | Prometheus metrics
[**adminTariffsCreate**](AdminApi.md#admintariffscreate) | **POST** /admin/tariffs | Crear TariffRule
[**adminTariffsList**](AdminApi.md#admintariffslist) | **GET** /admin/tariffs | Listar TariffRule
[**adminTariffsUpdateById**](AdminApi.md#admintariffsupdatebyid) | **PATCH** /admin/tariffs/{id} | Actualizar TariffRule
[**adminTripsList**](AdminApi.md#admintripslist) | **GET** /admin/trips | 
[**metricsPublic**](AdminApi.md#metricspublic) | **GET** /metrics | Prometheus metrics (public)


# **adminDiagnosticsMatching**
> AdminDiagnosticsMatching200Response adminDiagnosticsMatching()

Diagnostics matching

Estado de PostGIS y parÃ¡metros de matching (env) + contadores de uso.

### Example
```dart
import 'package:openapi/api.dart';

final api = Openapi().getAdminApi();

try {
    final response = api.adminDiagnosticsMatching();
    print(response);
} catch on DioException (e) {
    print('Exception when calling AdminApi->adminDiagnosticsMatching: $e\n');
}
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**AdminDiagnosticsMatching200Response**](AdminDiagnosticsMatching200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **adminMetrics**
> adminMetrics()

Prometheus metrics

ExposiciÃ³n de mÃ©tricas en formato Prometheus. Protegido por rol ADMIN.

### Example
```dart
import 'package:openapi/api.dart';

final api = Openapi().getAdminApi();

try {
    api.adminMetrics();
} catch on DioException (e) {
    print('Exception when calling AdminApi->adminMetrics: $e\n');
}
```

### Parameters
This endpoint does not need any parameter.

### Return type

void (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **adminTariffsCreate**
> AdminTariffsList200ResponseItemsInner adminTariffsCreate(adminTariffsCreateRequest)

Crear TariffRule

Crea una regla y opcionalmente desactiva reglas activas previas de la misma ciudad.

### Example
```dart
import 'package:openapi/api.dart';

final api = Openapi().getAdminApi();
final AdminTariffsCreateRequest adminTariffsCreateRequest = ; // AdminTariffsCreateRequest | 

try {
    final response = api.adminTariffsCreate(adminTariffsCreateRequest);
    print(response);
} catch on DioException (e) {
    print('Exception when calling AdminApi->adminTariffsCreate: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **adminTariffsCreateRequest** | [**AdminTariffsCreateRequest**](AdminTariffsCreateRequest.md)|  | 

### Return type

[**AdminTariffsList200ResponseItemsInner**](AdminTariffsList200ResponseItemsInner.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **adminTariffsList**
> AdminTariffsList200Response adminTariffsList(city, active)

Listar TariffRule

Lista reglas por ciudad.

### Example
```dart
import 'package:openapi/api.dart';

final api = Openapi().getAdminApi();
final String city = city_example; // String | 
final bool active = true; // bool | 

try {
    final response = api.adminTariffsList(city, active);
    print(response);
} catch on DioException (e) {
    print('Exception when calling AdminApi->adminTariffsList: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **city** | **String**|  | [optional] 
 **active** | **bool**|  | [optional] 

### Return type

[**AdminTariffsList200Response**](AdminTariffsList200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **adminTariffsUpdateById**
> AdminTariffsList200ResponseItemsInner adminTariffsUpdateById(id, adminTariffsUpdateByIdRequest)

Actualizar TariffRule

Actualiza campos de una regla por id.

### Example
```dart
import 'package:openapi/api.dart';

final api = Openapi().getAdminApi();
final String id = id_example; // String | 
final AdminTariffsUpdateByIdRequest adminTariffsUpdateByIdRequest = ; // AdminTariffsUpdateByIdRequest | 

try {
    final response = api.adminTariffsUpdateById(id, adminTariffsUpdateByIdRequest);
    print(response);
} catch on DioException (e) {
    print('Exception when calling AdminApi->adminTariffsUpdateById: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**|  | 
 **adminTariffsUpdateByIdRequest** | [**AdminTariffsUpdateByIdRequest**](AdminTariffsUpdateByIdRequest.md)|  | [optional] 

### Return type

[**AdminTariffsList200ResponseItemsInner**](AdminTariffsList200ResponseItemsInner.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **adminTripsList**
> AdminTripsList200Response adminTripsList(limit, cursor)



### Example
```dart
import 'package:openapi/api.dart';

final api = Openapi().getAdminApi();
final int limit = 56; // int | 
final String cursor = cursor_example; // String | 

try {
    final response = api.adminTripsList(limit, cursor);
    print(response);
} catch on DioException (e) {
    print('Exception when calling AdminApi->adminTripsList: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **limit** | **int**|  | [optional] [default to 50]
 **cursor** | **String**|  | [optional] 

### Return type

[**AdminTripsList200Response**](AdminTripsList200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **metricsPublic**
> metricsPublic()

Prometheus metrics (public)

Endpoint para scraping por Prometheus. Requiere header x-metrics-token si METRICS_TOKEN estÃ¡ definido o si METRICS_PUBLIC=false.

### Example
```dart
import 'package:openapi/api.dart';

final api = Openapi().getAdminApi();

try {
    api.metricsPublic();
} catch on DioException (e) {
    print('Exception when calling AdminApi->metricsPublic: $e\n');
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

