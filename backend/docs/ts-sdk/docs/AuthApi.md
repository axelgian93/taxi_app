# AuthApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**authLogin**](#authlogin) | **POST** /auth/login | |
|[**authLogout**](#authlogout) | **POST** /auth/logout | |
|[**authMe**](#authme) | **GET** /auth/me | |
|[**authRefresh**](#authrefresh) | **POST** /auth/refresh | |
|[**authRegister**](#authregister) | **POST** /auth/register | |

# **authLogin**
> AuthRegister201Response authLogin(authLoginRequest)


### Example

```typescript
import {
    AuthApi,
    Configuration,
    AuthLoginRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let authLoginRequest: AuthLoginRequest; //

const { status, data } = await apiInstance.authLogin(
    authLoginRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **authLoginRequest** | **AuthLoginRequest**|  | |


### Return type

**AuthRegister201Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Default Response |  -  |
|**401** | Default Response |  -  |
|**429** | Default Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authLogout**
> AuthLogout200Response authLogout()


### Example

```typescript
import {
    AuthApi,
    Configuration,
    AuthLogoutRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let authLogoutRequest: AuthLogoutRequest; // (optional)

const { status, data } = await apiInstance.authLogout(
    authLogoutRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **authLogoutRequest** | **AuthLogoutRequest**|  | |


### Return type

**AuthLogout200Response**

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

# **authMe**
> AuthMe200Response authMe()


### Example

```typescript
import {
    AuthApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

const { status, data } = await apiInstance.authMe();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**AuthMe200Response**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Default Response |  -  |
|**401** | Default Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authRefresh**
> AuthRefresh200Response authRefresh(authRefreshRequest)


### Example

```typescript
import {
    AuthApi,
    Configuration,
    AuthRefreshRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let authRefreshRequest: AuthRefreshRequest; //

const { status, data } = await apiInstance.authRefresh(
    authRefreshRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **authRefreshRequest** | **AuthRefreshRequest**|  | |


### Return type

**AuthRefresh200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Default Response |  -  |
|**401** | Default Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authRegister**
> AuthRegister201Response authRegister(authRegisterRequest)


### Example

```typescript
import {
    AuthApi,
    Configuration,
    AuthRegisterRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let authRegisterRequest: AuthRegisterRequest; //

const { status, data } = await apiInstance.authRegister(
    authRegisterRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **authRegisterRequest** | **AuthRegisterRequest**|  | |


### Return type

**AuthRegister201Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Default Response |  -  |
|**400** | Default Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

