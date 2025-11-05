# taxi_openapi.api.AuthApi

## Load the API package
```dart
import 'package:taxi_openapi/api.dart';
```

All URIs are relative to *http://localhost:8080*

Method | HTTP request | Description
------------- | ------------- | -------------
[**authLogin**](AuthApi.md#authlogin) | **POST** /auth/login | 
[**authLogout**](AuthApi.md#authlogout) | **POST** /auth/logout | 
[**authMe**](AuthApi.md#authme) | **GET** /auth/me | 
[**authRefresh**](AuthApi.md#authrefresh) | **POST** /auth/refresh | 
[**authRegister**](AuthApi.md#authregister) | **POST** /auth/register | 


# **authLogin**
> AuthRegister201Response authLogin(authLoginRequest)



### Example
```dart
import 'package:taxi_openapi/api.dart';

final api = TaxiOpenapi().getAuthApi();
final AuthLoginRequest authLoginRequest = ; // AuthLoginRequest | 

try {
    final response = api.authLogin(authLoginRequest);
    print(response);
} catch on DioException (e) {
    print('Exception when calling AuthApi->authLogin: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **authLoginRequest** | [**AuthLoginRequest**](AuthLoginRequest.md)|  | 

### Return type

[**AuthRegister201Response**](AuthRegister201Response.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authLogout**
> AuthLogout200Response authLogout(authLogoutRequest)



### Example
```dart
import 'package:taxi_openapi/api.dart';

final api = TaxiOpenapi().getAuthApi();
final AuthLogoutRequest authLogoutRequest = ; // AuthLogoutRequest | 

try {
    final response = api.authLogout(authLogoutRequest);
    print(response);
} catch on DioException (e) {
    print('Exception when calling AuthApi->authLogout: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **authLogoutRequest** | [**AuthLogoutRequest**](AuthLogoutRequest.md)|  | [optional] 

### Return type

[**AuthLogout200Response**](AuthLogout200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authMe**
> AuthMe200Response authMe()



### Example
```dart
import 'package:taxi_openapi/api.dart';

final api = TaxiOpenapi().getAuthApi();

try {
    final response = api.authMe();
    print(response);
} catch on DioException (e) {
    print('Exception when calling AuthApi->authMe: $e\n');
}
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**AuthMe200Response**](AuthMe200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authRefresh**
> AuthRefresh200Response authRefresh(authRefreshRequest)



### Example
```dart
import 'package:taxi_openapi/api.dart';

final api = TaxiOpenapi().getAuthApi();
final AuthRefreshRequest authRefreshRequest = ; // AuthRefreshRequest | 

try {
    final response = api.authRefresh(authRefreshRequest);
    print(response);
} catch on DioException (e) {
    print('Exception when calling AuthApi->authRefresh: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **authRefreshRequest** | [**AuthRefreshRequest**](AuthRefreshRequest.md)|  | 

### Return type

[**AuthRefresh200Response**](AuthRefresh200Response.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authRegister**
> AuthRegister201Response authRegister(authRegisterRequest)



### Example
```dart
import 'package:taxi_openapi/api.dart';

final api = TaxiOpenapi().getAuthApi();
final AuthRegisterRequest authRegisterRequest = ; // AuthRegisterRequest | 

try {
    final response = api.authRegister(authRegisterRequest);
    print(response);
} catch on DioException (e) {
    print('Exception when calling AuthApi->authRegister: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **authRegisterRequest** | [**AuthRegisterRequest**](AuthRegisterRequest.md)|  | 

### Return type

[**AuthRegister201Response**](AuthRegister201Response.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

