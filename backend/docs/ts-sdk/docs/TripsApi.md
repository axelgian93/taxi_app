# TripsApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**tripsAccept**](#tripsaccept) | **POST** /trips/{id}/accept | Aceptar viaje|
|[**tripsArrived**](#tripsarrived) | **POST** /trips/{id}/arrived | Arribo del conductor|
|[**tripsCancel**](#tripscancel) | **POST** /trips/{id}/cancel | Cancelar viaje (rider)|
|[**tripsComplete**](#tripscomplete) | **POST** /trips/{id}/complete | Completar viaje|
|[**tripsDriverLocation**](#tripsdriverlocation) | **GET** /trips/{id}/driver-location | UbicaciÃ³n actual del driver para el viaje|
|[**tripsRequest**](#tripsrequest) | **POST** /trips/request | Solicitar viaje|
|[**tripsSseById**](#tripsssebyid) | **GET** /trips/{id}/sse | Trip live updates (SSE)|
|[**tripsStart**](#tripsstart) | **POST** /trips/{id}/start | Iniciar viaje|

# **tripsAccept**
> TripsRequest200Response tripsAccept()

El conductor acepta el viaje asignado.

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
|**409** | Default Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **tripsArrived**
> TripsArrived200Response tripsArrived()

El conductor llegï¿½ al punto de recogida.

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

**TripsArrived200Response**

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
|**409** | Default Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **tripsCancel**
> TripsCancel200Response tripsCancel()

El rider cancela el viaje; puede aplicar fee segï¿½n estado y reglas.

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

**TripsCancel200Response**

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
|**409** | Default Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **tripsComplete**
> TripsComplete200Response tripsComplete()

Completa el viaje y liquida el pago (captura Stripe o marca CASH pagado).

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

**TripsComplete200Response**

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
|**409** | Default Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **tripsDriverLocation**
> TripsDriverLocation200Response tripsDriverLocation()

Devuelve lat/lng y timestamp de la Ãºltima ubicaciï¿½n reportada por el driver asignado al trip.

### Example

```typescript
import {
    TripsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TripsApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.tripsDriverLocation(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**TripsDriverLocation200Response**

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

Crea un viaje y asigna el conductor disponible mÃ¡s cercano.

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

Stream de eventos del viaje en tiempo real para Rider/Driver via Server-Sent Events. EnvÃ­a eventos como INIT/ASSIGNED/ACCEPTED/ARRIVED/STARTED/COMPLETED/CANCELED y LOCATION (lat/lng del driver).

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
> TripsStart200Response tripsStart()

Inicia el viaje; si method=CARD y Stripe estï¿½ configurado, preautoriza.

### Example

```typescript
import {
    TripsApi,
    Configuration,
    TripsStartRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new TripsApi(configuration);

let id: string; // (default to undefined)
let tripsStartRequest: TripsStartRequest; // (optional)

const { status, data } = await apiInstance.tripsStart(
    id,
    tripsStartRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **tripsStartRequest** | **TripsStartRequest**|  | |
| **id** | [**string**] |  | defaults to undefined|


### Return type

**TripsStart200Response**

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
|**409** | Default Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

