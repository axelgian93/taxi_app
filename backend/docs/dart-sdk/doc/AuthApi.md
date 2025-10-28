# openapi.api.AuthApi

## Load the API package
```dart
import 'package:openapi/api.dart';
```

All URIs are relative to *http://localhost:8080*

Method | HTTP request | Description
------------- | ------------- | -------------
[**authLogin**](AuthApi.md#authlogin) | **POST** /auth/login | 
[**authMe**](AuthApi.md#authme) | **GET** /auth/me | 
[**authRegister**](AuthApi.md#authregister) | **POST** /auth/register | 


# **authLogin**
> AuthRegister201Response authLogin(authLoginRequest)



### Example
```dart
import 'package:openapi/api.dart';

final api = Openapi().getAuthApi();
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

# **authMe**
> AuthMe200Response authMe()



### Example
```dart
import 'package:openapi/api.dart';

final api = Openapi().getAuthApi();

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

# **authRegister**
> AuthRegister201Response authRegister(authRegisterRequest)



### Example
```dart
import 'package:openapi/api.dart';

final api = Openapi().getAuthApi();
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

