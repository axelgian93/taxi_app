# DriversApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**driverMyTripsActive**](#drivermytripsactive) | **GET** /drivers/my-trips/active | Mis viajes activos|
|[**driverMyTripsHistory**](#drivermytripshistory) | **GET** /drivers/my-trips/history | Mis viajes (historial)|
|[**driverUpdateLocation**](#driverupdatelocation) | **POST** /drivers/location | Actualizar estado del driver|
|[**driverUpdateStatus**](#driverupdatestatus) | **POST** /drivers/status | Actualizar estado del driver|

# **driverMyTripsActive**
> DriverMyTripsActive200Response driverMyTripsActive()

Lista viajes del driver con estado ACCEPTED/ARRIVED/STARTED.

### Example

```typescript
import {
    DriversApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DriversApi(configuration);

const { status, data } = await apiInstance.driverMyTripsActive();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**DriverMyTripsActive200Response**

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
|**403** | Default Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **driverMyTripsHistory**
> DriverMyTripsHistory200Response driverMyTripsHistory()

Lista de viajes completados o cancelados para el driver autenticado.

### Example

```typescript
import {
    DriversApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DriversApi(configuration);

let limit: number; // (optional) (default to 20)
let cursor: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.driverMyTripsHistory(
    limit,
    cursor
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **limit** | [**number**] |  | (optional) defaults to 20|
| **cursor** | [**string**] |  | (optional) defaults to undefined|


### Return type

**DriverMyTripsHistory200Response**

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
|**403** | Default Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

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
|**401** | Default Response |  -  |

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
|**401** | Default Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

