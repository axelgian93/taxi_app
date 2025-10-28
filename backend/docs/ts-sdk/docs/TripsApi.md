# TripsApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**tripsAccept**](#tripsaccept) | **POST** /trips/{id}/accept | |
|[**tripsArrived**](#tripsarrived) | **POST** /trips/{id}/arrived | |
|[**tripsCancel**](#tripscancel) | **POST** /trips/{id}/cancel | |
|[**tripsComplete**](#tripscomplete) | **POST** /trips/{id}/complete | |
|[**tripsRequest**](#tripsrequest) | **POST** /trips/request | Solicitar viaje|
|[**tripsSseById**](#tripsssebyid) | **GET** /trips/{id}/sse | Trip live updates (SSE)|
|[**tripsStart**](#tripsstart) | **POST** /trips/{id}/start | |

# **tripsAccept**
> TripsRequest200Response tripsAccept()


### Example

```typescript
import {
    TripsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TripsApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.tripsAccept(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**TripsRequest200Response**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Default Response |  -  |
|**400** | Default Response |  -  |
|**403** | Default Response |  -  |
|**404** | Default Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **tripsArrived**
> TripsRequest200Response tripsArrived()


### Example

```typescript
import {
    TripsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TripsApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.tripsArrived(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**TripsRequest200Response**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Default Response |  -  |
|**400** | Default Response |  -  |
|**403** | Default Response |  -  |
|**404** | Default Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **tripsCancel**
> TripsRequest200Response tripsCancel()


### Example

```typescript
import {
    TripsApi,
    Configuration,
    TripsCancelRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new TripsApi(configuration);

let id: string; // (default to undefined)
let tripsCancelRequest: TripsCancelRequest; // (optional)

const { status, data } = await apiInstance.tripsCancel(
    id,
    tripsCancelRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **tripsCancelRequest** | **TripsCancelRequest**|  | |
| **id** | [**string**] |  | defaults to undefined|


### Return type

**TripsRequest200Response**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Default Response |  -  |
|**400** | Default Response |  -  |
|**403** | Default Response |  -  |
|**404** | Default Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **tripsComplete**
> TripsRequest200Response tripsComplete()


### Example

```typescript
import {
    TripsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TripsApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.tripsComplete(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**TripsRequest200Response**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Default Response |  -  |
|**400** | Default Response |  -  |
|**403** | Default Response |  -  |
|**404** | Default Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **tripsRequest**
> TripsRequest200Response tripsRequest(tripsRequestRequest)

Crea un viaje y asigna el conductor disponible más cercano.

### Example

```typescript
import {
    TripsApi,
    Configuration,
    TripsRequestRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new TripsApi(configuration);

let tripsRequestRequest: TripsRequestRequest; //

const { status, data } = await apiInstance.tripsRequest(
    tripsRequestRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **tripsRequestRequest** | **TripsRequestRequest**|  | |


### Return type

**TripsRequest200Response**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Default Response |  -  |
|**400** | Default Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **tripsSseById**
> string tripsSseById()

Stream de eventos del viaje en tiempo real para Rider/Driver via Server-Sent Events. Envía eventos como INIT/ASSIGNED/ACCEPTED/ARRIVED/STARTED/COMPLETED/CANCELED.

### Example

```typescript
import {
    TripsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TripsApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.tripsSseById(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**string**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/event-stream


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | text/event-stream |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **tripsStart**
> TripsRequest200Response tripsStart()


### Example

```typescript
import {
    TripsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TripsApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.tripsStart(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**TripsRequest200Response**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Default Response |  -  |
|**400** | Default Response |  -  |
|**403** | Default Response |  -  |
|**404** | Default Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

