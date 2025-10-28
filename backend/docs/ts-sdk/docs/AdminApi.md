# AdminApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**adminDiagnosticsMatching**](#admindiagnosticsmatching) | **GET** /admin/diagnostics/matching | Diagnostics matching|
|[**adminMetrics**](#adminmetrics) | **GET** /admin/metrics | Prometheus metrics|
|[**adminTariffsCreate**](#admintariffscreate) | **POST** /admin/tariffs | Crear TariffRule|
|[**adminTariffsList**](#admintariffslist) | **GET** /admin/tariffs | Listar TariffRule|
|[**adminTariffsUpdateById**](#admintariffsupdatebyid) | **PATCH** /admin/tariffs/{id} | Actualizar TariffRule|
|[**adminTripsList**](#admintripslist) | **GET** /admin/trips | |
|[**metricsPublic**](#metricspublic) | **GET** /metrics | Prometheus metrics (public)|

# **adminDiagnosticsMatching**
> AdminDiagnosticsMatching200Response adminDiagnosticsMatching()

Estado de PostGIS y parÃ¡metros de matching (env) + contadores de uso.

### Example

```typescript
import {
    AdminApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

const { status, data } = await apiInstance.adminDiagnosticsMatching();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**AdminDiagnosticsMatching200Response**

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

# **adminMetrics**
> adminMetrics()

Exposición de métricas en formato Prometheus. Protegido por rol ADMIN.

### Example

```typescript
import {
    AdminApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

const { status, data } = await apiInstance.adminMetrics();
```

### Parameters
This endpoint does not have any parameters.


### Return type

void (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Default Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **adminTariffsCreate**
> AdminTariffsList200ResponseItemsInner adminTariffsCreate(adminTariffsCreateRequest)

Crea una regla y opcionalmente desactiva reglas activas previas de la misma ciudad.

### Example

```typescript
import {
    AdminApi,
    Configuration,
    AdminTariffsCreateRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

let adminTariffsCreateRequest: AdminTariffsCreateRequest; //

const { status, data } = await apiInstance.adminTariffsCreate(
    adminTariffsCreateRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **adminTariffsCreateRequest** | **AdminTariffsCreateRequest**|  | |


### Return type

**AdminTariffsList200ResponseItemsInner**

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

# **adminTariffsList**
> AdminTariffsList200Response adminTariffsList()

Lista reglas por ciudad.

### Example

```typescript
import {
    AdminApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

let city: string; // (optional) (default to undefined)
let active: boolean; // (optional) (default to undefined)

const { status, data } = await apiInstance.adminTariffsList(
    city,
    active
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **city** | [**string**] |  | (optional) defaults to undefined|
| **active** | [**boolean**] |  | (optional) defaults to undefined|


### Return type

**AdminTariffsList200Response**

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

# **adminTariffsUpdateById**
> AdminTariffsList200ResponseItemsInner adminTariffsUpdateById()

Actualiza campos de una regla por id.

### Example

```typescript
import {
    AdminApi,
    Configuration,
    AdminTariffsUpdateByIdRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

let id: string; // (default to undefined)
let adminTariffsUpdateByIdRequest: AdminTariffsUpdateByIdRequest; // (optional)

const { status, data } = await apiInstance.adminTariffsUpdateById(
    id,
    adminTariffsUpdateByIdRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **adminTariffsUpdateByIdRequest** | **AdminTariffsUpdateByIdRequest**|  | |
| **id** | [**string**] |  | defaults to undefined|


### Return type

**AdminTariffsList200ResponseItemsInner**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Default Response |  -  |
|**404** | Default Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **adminTripsList**
> AdminTripsList200Response adminTripsList()


### Example

```typescript
import {
    AdminApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

let limit: number; // (optional) (default to 50)
let cursor: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.adminTripsList(
    limit,
    cursor
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **limit** | [**number**] |  | (optional) defaults to 50|
| **cursor** | [**string**] |  | (optional) defaults to undefined|


### Return type

**AdminTripsList200Response**

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

# **metricsPublic**
> metricsPublic()

Endpoint para scraping por Prometheus. Requiere header x-metrics-token si METRICS_TOKEN está definido o si METRICS_PUBLIC=false.

### Example

```typescript
import {
    AdminApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

const { status, data } = await apiInstance.metricsPublic();
```

### Parameters
This endpoint does not have any parameters.


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Default Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

