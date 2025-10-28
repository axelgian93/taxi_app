# DriversApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**driverUpdateLocation**](#driverupdatelocation) | **POST** /drivers/location | Actualizar estado del driver|
|[**driverUpdateStatus**](#driverupdatestatus) | **POST** /drivers/status | Actualizar estado del driver|

# **driverUpdateLocation**
> DriverUpdateStatus200Response driverUpdateLocation()

Driver reporta su estado (IDLE/ON_TRIP/etc.). Requiere JWT.

### Example

```typescript
import {
    DriversApi,
    Configuration,
    DriverUpdateStatusRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DriversApi(configuration);

let driverUpdateStatusRequest: DriverUpdateStatusRequest; // (optional)

const { status, data } = await apiInstance.driverUpdateLocation(
    driverUpdateStatusRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **driverUpdateStatusRequest** | **DriverUpdateStatusRequest**|  | |


### Return type

**DriverUpdateStatus200Response**

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

# **driverUpdateStatus**
> DriverUpdateStatus200Response driverUpdateStatus()

Driver reporta su estado (IDLE/ON_TRIP/etc.). Requiere JWT.

### Example

```typescript
import {
    DriversApi,
    Configuration,
    DriverUpdateStatusRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DriversApi(configuration);

let driverUpdateStatusRequest: DriverUpdateStatusRequest; // (optional)

const { status, data } = await apiInstance.driverUpdateStatus(
    driverUpdateStatusRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **driverUpdateStatusRequest** | **DriverUpdateStatusRequest**|  | |


### Return type

**DriverUpdateStatus200Response**

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

