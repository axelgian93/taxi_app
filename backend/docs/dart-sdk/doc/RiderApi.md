# taxi_openapi.api.RiderApi

## Load the API package
```dart
import 'package:taxi_openapi/api.dart';
```

All URIs are relative to *http://localhost:8080*

Method | HTTP request | Description
------------- | ------------- | -------------
[**riderMyTrips**](RiderApi.md#ridermytrips) | **GET** /rider/my-trips | Mis viajes (rider)


# **riderMyTrips**
> RiderMyTrips200Response riderMyTrips(limit, cursor)

Mis viajes (rider)

Lista los últimos viajes del rider autenticado.

### Example
```dart
import 'package:taxi_openapi/api.dart';

final api = TaxiOpenapi().getRiderApi();
final int limit = 56; // int | 
final String cursor = cursor_example; // String | 

try {
    final response = api.riderMyTrips(limit, cursor);
    print(response);
} catch on DioException (e) {
    print('Exception when calling RiderApi->riderMyTrips: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **limit** | **int**|  | [optional] [default to 20]
 **cursor** | **String**|  | [optional] 

### Return type

[**RiderMyTrips200Response**](RiderMyTrips200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

