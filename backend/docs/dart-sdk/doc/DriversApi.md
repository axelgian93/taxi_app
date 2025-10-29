# openapi.api.DriversApi

## Load the API package
```dart
import 'package:openapi/api.dart';
```

All URIs are relative to *http://localhost:8080*

Method | HTTP request | Description
------------- | ------------- | -------------
[**driverMyTripsActive**](DriversApi.md#drivermytripsactive) | **GET** /drivers/my-trips/active | Mis viajes activos
[**driverUpdateLocation**](DriversApi.md#driverupdatelocation) | **POST** /drivers/location | Actualizar estado del driver
[**driverUpdateStatus**](DriversApi.md#driverupdatestatus) | **POST** /drivers/status | Actualizar estado del driver


# **driverMyTripsActive**
> DriverMyTripsActive200Response driverMyTripsActive()

Mis viajes activos

Lista viajes del driver con estado ACCEPTED/ARRIVED/STARTED.

### Example
```dart
import 'package:openapi/api.dart';

final api = Openapi().getDriversApi();

try {
    final response = api.driverMyTripsActive();
    print(response);
} catch on DioException (e) {
    print('Exception when calling DriversApi->driverMyTripsActive: $e\n');
}
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**DriverMyTripsActive200Response**](DriverMyTripsActive200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **driverUpdateLocation**
> DriverUpdateStatus200Response driverUpdateLocation(driverUpdateStatusRequest)

Actualizar estado del driver

Driver reporta su estado (IDLE/ON_TRIP/etc.). Requiere JWT.

### Example
```dart
import 'package:openapi/api.dart';

final api = Openapi().getDriversApi();
final DriverUpdateStatusRequest driverUpdateStatusRequest = ; // DriverUpdateStatusRequest | 

try {
    final response = api.driverUpdateLocation(driverUpdateStatusRequest);
    print(response);
} catch on DioException (e) {
    print('Exception when calling DriversApi->driverUpdateLocation: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **driverUpdateStatusRequest** | [**DriverUpdateStatusRequest**](DriverUpdateStatusRequest.md)|  | [optional] 

### Return type

[**DriverUpdateStatus200Response**](DriverUpdateStatus200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **driverUpdateStatus**
> DriverUpdateStatus200Response driverUpdateStatus(driverUpdateStatusRequest)

Actualizar estado del driver

Driver reporta su estado (IDLE/ON_TRIP/etc.). Requiere JWT.

### Example
```dart
import 'package:openapi/api.dart';

final api = Openapi().getDriversApi();
final DriverUpdateStatusRequest driverUpdateStatusRequest = ; // DriverUpdateStatusRequest | 

try {
    final response = api.driverUpdateStatus(driverUpdateStatusRequest);
    print(response);
} catch on DioException (e) {
    print('Exception when calling DriversApi->driverUpdateStatus: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **driverUpdateStatusRequest** | [**DriverUpdateStatusRequest**](DriverUpdateStatusRequest.md)|  | [optional] 

### Return type

[**DriverUpdateStatus200Response**](DriverUpdateStatus200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

