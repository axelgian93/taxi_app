# openapi.api.UsersApi

## Load the API package
```dart
import 'package:openapi/api.dart';
```

All URIs are relative to *http://localhost:8080*

Method | HTTP request | Description
------------- | ------------- | -------------
[**usersDeletePushToken**](UsersApi.md#usersdeletepushtoken) | **DELETE** /users/me/push-token | Eliminar FCM token
[**usersRegisterPushToken**](UsersApi.md#usersregisterpushtoken) | **POST** /users/me/push-token | Registrar FCM token


# **usersDeletePushToken**
> DriverUpdateStatus200Response usersDeletePushToken()

Eliminar FCM token

Borra el FCM token asociado al usuario (logout de push notifications).

### Example
```dart
import 'package:openapi/api.dart';

final api = Openapi().getUsersApi();

try {
    final response = api.usersDeletePushToken();
    print(response);
} catch on DioException (e) {
    print('Exception when calling UsersApi->usersDeletePushToken: $e\n');
}
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**DriverUpdateStatus200Response**](DriverUpdateStatus200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **usersRegisterPushToken**
> DriverUpdateStatus200Response usersRegisterPushToken(usersRegisterPushTokenRequest)

Registrar FCM token

Registra o actualiza el FCM token del usuario logueado.

### Example
```dart
import 'package:openapi/api.dart';

final api = Openapi().getUsersApi();
final UsersRegisterPushTokenRequest usersRegisterPushTokenRequest = ; // UsersRegisterPushTokenRequest | 

try {
    final response = api.usersRegisterPushToken(usersRegisterPushTokenRequest);
    print(response);
} catch on DioException (e) {
    print('Exception when calling UsersApi->usersRegisterPushToken: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **usersRegisterPushTokenRequest** | [**UsersRegisterPushTokenRequest**](UsersRegisterPushTokenRequest.md)|  | 

### Return type

[**DriverUpdateStatus200Response**](DriverUpdateStatus200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

