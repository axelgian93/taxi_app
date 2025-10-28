# UsersApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**usersDeletePushToken**](#usersdeletepushtoken) | **DELETE** /users/me/push-token | Eliminar FCM token|
|[**usersRegisterPushToken**](#usersregisterpushtoken) | **POST** /users/me/push-token | Registrar FCM token|

# **usersDeletePushToken**
> UsersRegisterPushToken200Response usersDeletePushToken()

Borra el FCM token asociado al usuario (logout de push notifications).

### Example

```typescript
import {
    UsersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

const { status, data } = await apiInstance.usersDeletePushToken();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**UsersRegisterPushToken200Response**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Default Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **usersRegisterPushToken**
> UsersRegisterPushToken200Response usersRegisterPushToken(usersRegisterPushTokenRequest)

Registra o actualiza el FCM token del usuario logueado.

### Example

```typescript
import {
    UsersApi,
    Configuration,
    UsersRegisterPushTokenRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

let usersRegisterPushTokenRequest: UsersRegisterPushTokenRequest; //

const { status, data } = await apiInstance.usersRegisterPushToken(
    usersRegisterPushTokenRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **usersRegisterPushTokenRequest** | **UsersRegisterPushTokenRequest**|  | |


### Return type

**UsersRegisterPushToken200Response**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Default Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

