# PaymentsApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**adminPaymentsReport**](#adminpaymentsreport) | **GET** /admin/payments/report | Reporte de pagos (ADMIN)|
|[**adminPaymentsSummaryStatus**](#adminpaymentssummarystatus) | **GET** /admin/payments/summary-status | Resumen por estado de pago (ADMIN)|
|[**adminPaymentsTopDrivers**](#adminpaymentstopdrivers) | **GET** /admin/payments/top-drivers | Top drivers por ingresos (ADMIN)|
|[**adminPaymentsTopRiders**](#adminpaymentstopriders) | **GET** /admin/payments/top-riders | Top riders por gasto (ADMIN)|
|[**adminRefundsList**](#adminrefundslist) | **GET** /admin/refunds | Listar refunds (ADMIN)|
|[**paymentsCaptureByTrip**](#paymentscapturebytrip) | **POST** /payments/{tripId}/capture | Capturar pago autorizado (ADMIN)|
|[**paymentsCreateSetupIntent**](#paymentscreatesetupintent) | **POST** /payments/setup-intent | Crear SetupIntent|
|[**paymentsGetByTrip**](#paymentsgetbytrip) | **GET** /payments/{tripId} | Obtener pago por tripId|
|[**paymentsList**](#paymentslist) | **GET** /payments | Listar pagos (ADMIN)|
|[**paymentsReceiptByTrip**](#paymentsreceiptbytrip) | **GET** /payments/{tripId}/receipt | Obtener recibo|
|[**paymentsRefundByTrip**](#paymentsrefundbytrip) | **POST** /payments/{tripId}/refund | Refund/cancel (ADMIN)|
|[**paymentsRefundsByTrip**](#paymentsrefundsbytrip) | **GET** /payments/{tripId}/refunds | Refunds por tripId|
|[**paymentsSetDefaultMethod**](#paymentssetdefaultmethod) | **POST** /payments/set-default | Definir PM por defecto|
|[**webhooksStripe**](#webhooksstripe) | **POST** /webhooks/stripe | Stripe webhook|

# **adminPaymentsReport**
> AdminPaymentsReport200Response adminPaymentsReport()

Agregados de pagos por fecha/ciudad/estado/m�todo. Si format=csv, devuelve text/csv.

### Example

```typescript
import {
    PaymentsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PaymentsApi(configuration);

let city: string; // (optional) (default to undefined)
let from: string; // (optional) (default to undefined)
let to: string; // (optional) (default to undefined)
let groupBy: 'day' | 'city' | 'status' | 'city_day' | 'method'; // (optional) (default to 'day')
let format: 'json' | 'csv'; // (optional) (default to 'json')

const { status, data } = await apiInstance.adminPaymentsReport(
    city,
    from,
    to,
    groupBy,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **city** | [**string**] |  | (optional) defaults to undefined|
| **from** | [**string**] |  | (optional) defaults to undefined|
| **to** | [**string**] |  | (optional) defaults to undefined|
| **groupBy** | [**&#39;day&#39; | &#39;city&#39; | &#39;status&#39; | &#39;city_day&#39; | &#39;method&#39;**]**Array<&#39;day&#39; &#124; &#39;city&#39; &#124; &#39;status&#39; &#124; &#39;city_day&#39; &#124; &#39;method&#39;>** |  | (optional) defaults to 'day'|
| **format** | [**&#39;json&#39; | &#39;csv&#39;**]**Array<&#39;json&#39; &#124; &#39;csv&#39;>** |  | (optional) defaults to 'json'|


### Return type

**AdminPaymentsReport200Response**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, text/csv


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Default Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **adminPaymentsSummaryStatus**
> AdminPaymentsSummaryStatus200Response adminPaymentsSummaryStatus()

Conteo e importe por estado (PENDING/AUTHORIZED/PAID/FAILED/REFUNDED). CSV disponible.

### Example

```typescript
import {
    PaymentsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PaymentsApi(configuration);

let city: string; // (optional) (default to undefined)
let from: string; // (optional) (default to undefined)
let to: string; // (optional) (default to undefined)
let format: 'json' | 'csv'; // (optional) (default to 'json')

const { status, data } = await apiInstance.adminPaymentsSummaryStatus(
    city,
    from,
    to,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **city** | [**string**] |  | (optional) defaults to undefined|
| **from** | [**string**] |  | (optional) defaults to undefined|
| **to** | [**string**] |  | (optional) defaults to undefined|
| **format** | [**&#39;json&#39; | &#39;csv&#39;**]**Array<&#39;json&#39; &#124; &#39;csv&#39;>** |  | (optional) defaults to 'json'|


### Return type

**AdminPaymentsSummaryStatus200Response**

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

# **adminPaymentsTopDrivers**
> AdminPaymentsTopDrivers200Response adminPaymentsTopDrivers()

Ingresos por driver con pagos PAID. Filtra por fecha/ciudad. CSV disponible.

### Example

```typescript
import {
    PaymentsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PaymentsApi(configuration);

let city: string; // (optional) (default to undefined)
let from: string; // (optional) (default to undefined)
let to: string; // (optional) (default to undefined)
let limit: number; // (optional) (default to 20)
let format: 'json' | 'csv'; // (optional) (default to 'json')

const { status, data } = await apiInstance.adminPaymentsTopDrivers(
    city,
    from,
    to,
    limit,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **city** | [**string**] |  | (optional) defaults to undefined|
| **from** | [**string**] |  | (optional) defaults to undefined|
| **to** | [**string**] |  | (optional) defaults to undefined|
| **limit** | [**number**] |  | (optional) defaults to 20|
| **format** | [**&#39;json&#39; | &#39;csv&#39;**]**Array<&#39;json&#39; &#124; &#39;csv&#39;>** |  | (optional) defaults to 'json'|


### Return type

**AdminPaymentsTopDrivers200Response**

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

# **adminPaymentsTopRiders**
> AdminPaymentsTopRiders200Response adminPaymentsTopRiders()

Gasto por rider con pagos PAID. Filtra por fecha/ciudad. CSV disponible.

### Example

```typescript
import {
    PaymentsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PaymentsApi(configuration);

let city: string; // (optional) (default to undefined)
let from: string; // (optional) (default to undefined)
let to: string; // (optional) (default to undefined)
let limit: number; // (optional) (default to 20)
let format: 'json' | 'csv'; // (optional) (default to 'json')

const { status, data } = await apiInstance.adminPaymentsTopRiders(
    city,
    from,
    to,
    limit,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **city** | [**string**] |  | (optional) defaults to undefined|
| **from** | [**string**] |  | (optional) defaults to undefined|
| **to** | [**string**] |  | (optional) defaults to undefined|
| **limit** | [**number**] |  | (optional) defaults to 20|
| **format** | [**&#39;json&#39; | &#39;csv&#39;**]**Array<&#39;json&#39; &#124; &#39;csv&#39;>** |  | (optional) defaults to 'json'|


### Return type

**AdminPaymentsTopRiders200Response**

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

# **adminRefundsList**
> AdminRefundsList200Response adminRefundsList()

Lista auditorias de reembolso/cancelación con filtros y CSV. Si format=csv, devuelve text/csv.

### Example

```typescript
import {
    PaymentsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PaymentsApi(configuration);

let userId: string; // (optional) (default to undefined)
let city: string; // (optional) (default to undefined)
let from: string; // (optional) (default to undefined)
let to: string; // (optional) (default to undefined)
let limit: number; // (optional) (default to 50)
let cursor: string; // (optional) (default to undefined)
let format: 'json' | 'csv'; // (optional) (default to 'json')

const { status, data } = await apiInstance.adminRefundsList(
    userId,
    city,
    from,
    to,
    limit,
    cursor,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**string**] |  | (optional) defaults to undefined|
| **city** | [**string**] |  | (optional) defaults to undefined|
| **from** | [**string**] |  | (optional) defaults to undefined|
| **to** | [**string**] |  | (optional) defaults to undefined|
| **limit** | [**number**] |  | (optional) defaults to 50|
| **cursor** | [**string**] |  | (optional) defaults to undefined|
| **format** | [**&#39;json&#39; | &#39;csv&#39;**]**Array<&#39;json&#39; &#124; &#39;csv&#39;>** |  | (optional) defaults to 'json'|


### Return type

**AdminRefundsList200Response**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, text/csv


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Default Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **paymentsCaptureByTrip**
> DriverUpdateStatus200Response paymentsCaptureByTrip()

Captura un PaymentIntent autorizado de Stripe para el trip.

### Example

```typescript
import {
    PaymentsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PaymentsApi(configuration);

let tripId: string; // (default to undefined)

const { status, data } = await apiInstance.paymentsCaptureByTrip(
    tripId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **tripId** | [**string**] |  | defaults to undefined|


### Return type

**DriverUpdateStatus200Response**

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
|**404** | Default Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **paymentsCreateSetupIntent**
> PaymentsCreateSetupIntent200Response paymentsCreateSetupIntent()

Rider crea un SetupIntent para guardar una tarjeta. Devuelve client_secret.

### Example

```typescript
import {
    PaymentsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PaymentsApi(configuration);

const { status, data } = await apiInstance.paymentsCreateSetupIntent();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**PaymentsCreateSetupIntent200Response**

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
|**404** | Default Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **paymentsGetByTrip**
> PaymentsList200ResponseItemsInner paymentsGetByTrip()

Devuelve el registro de Payment asociado a un Trip. Requiere JWT y ser due�o del viaje o ADMIN.

### Example

```typescript
import {
    PaymentsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PaymentsApi(configuration);

let tripId: string; // (default to undefined)

const { status, data } = await apiInstance.paymentsGetByTrip(
    tripId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **tripId** | [**string**] |  | defaults to undefined|


### Return type

**PaymentsList200ResponseItemsInner**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Default Response |  -  |
|**403** | Default Response |  -  |
|**404** | Default Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **paymentsList**
> PaymentsList200Response paymentsList()

Lista pagos con filtros opcionales y paginacion. Si format=csv, devuelve text/csv.

### Example

```typescript
import {
    PaymentsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PaymentsApi(configuration);

let userId: string; // (optional) (default to undefined)
let status: 'PENDING' | 'AUTHORIZED' | 'PAID' | 'FAILED' | 'REFUNDED'; // (optional) (default to undefined)
let city: string; // (optional) (default to undefined)
let from: string; // (optional) (default to undefined)
let to: string; // (optional) (default to undefined)
let limit: number; // (optional) (default to 50)
let cursor: string; // (optional) (default to undefined)
let format: 'json' | 'csv'; // (optional) (default to 'json')

const { status, data } = await apiInstance.paymentsList(
    userId,
    status,
    city,
    from,
    to,
    limit,
    cursor,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**string**] |  | (optional) defaults to undefined|
| **status** | [**&#39;PENDING&#39; | &#39;AUTHORIZED&#39; | &#39;PAID&#39; | &#39;FAILED&#39; | &#39;REFUNDED&#39;**]**Array<&#39;PENDING&#39; &#124; &#39;AUTHORIZED&#39; &#124; &#39;PAID&#39; &#124; &#39;FAILED&#39; &#124; &#39;REFUNDED&#39;>** |  | (optional) defaults to undefined|
| **city** | [**string**] |  | (optional) defaults to undefined|
| **from** | [**string**] |  | (optional) defaults to undefined|
| **to** | [**string**] |  | (optional) defaults to undefined|
| **limit** | [**number**] |  | (optional) defaults to 50|
| **cursor** | [**string**] |  | (optional) defaults to undefined|
| **format** | [**&#39;json&#39; | &#39;csv&#39;**]**Array<&#39;json&#39; &#124; &#39;csv&#39;>** |  | (optional) defaults to 'json'|


### Return type

**PaymentsList200Response**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, text/csv


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Default Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **paymentsReceiptByTrip**
> PaymentsReceiptByTrip200Response paymentsReceiptByTrip()

Recibo simple del pago asociado al viaje. type=TRIP o CANCELLATION_FEE.

### Example

```typescript
import {
    PaymentsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PaymentsApi(configuration);

let tripId: string; // (default to undefined)

const { status, data } = await apiInstance.paymentsReceiptByTrip(
    tripId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **tripId** | [**string**] |  | defaults to undefined|


### Return type

**PaymentsReceiptByTrip200Response**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Default Response |  -  |
|**404** | Default Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **paymentsRefundByTrip**
> DriverUpdateStatus200Response paymentsRefundByTrip()

Reembolsa un Payment capturado (Stripe) o cancela autorizacion. Para otros metodos, marca REFUNDED y registra auditoria.

### Example

```typescript
import {
    PaymentsApi,
    Configuration,
    PaymentsRefundByTripRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new PaymentsApi(configuration);

let tripId: string; // (default to undefined)
let paymentsRefundByTripRequest: PaymentsRefundByTripRequest; // (optional)

const { status, data } = await apiInstance.paymentsRefundByTrip(
    tripId,
    paymentsRefundByTripRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **paymentsRefundByTripRequest** | **PaymentsRefundByTripRequest**|  | |
| **tripId** | [**string**] |  | defaults to undefined|


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
|**400** | Default Response |  -  |
|**404** | Default Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **paymentsRefundsByTrip**
> PaymentsRefundsByTrip200Response paymentsRefundsByTrip()

Lista auditorias de reembolso/cancelación del pago de un trip. Requiere JWT y ser due�o del viaje o ADMIN.

### Example

```typescript
import {
    PaymentsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PaymentsApi(configuration);

let tripId: string; // (default to undefined)

const { status, data } = await apiInstance.paymentsRefundsByTrip(
    tripId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **tripId** | [**string**] |  | defaults to undefined|


### Return type

**PaymentsRefundsByTrip200Response**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Default Response |  -  |
|**403** | Default Response |  -  |
|**404** | Default Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **paymentsSetDefaultMethod**
> AuthLogout200Response paymentsSetDefaultMethod(paymentsSetDefaultMethodRequest)

Guarda el paymentMethod como predeterminado en Stripe y DB.

### Example

```typescript
import {
    PaymentsApi,
    Configuration,
    PaymentsSetDefaultMethodRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new PaymentsApi(configuration);

let paymentsSetDefaultMethodRequest: PaymentsSetDefaultMethodRequest; //

const { status, data } = await apiInstance.paymentsSetDefaultMethod(
    paymentsSetDefaultMethodRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **paymentsSetDefaultMethodRequest** | **PaymentsSetDefaultMethodRequest**|  | |


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
|**400** | Default Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **webhooksStripe**
> webhooksStripe()


### Example

```typescript
import {
    PaymentsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PaymentsApi(configuration);

const { status, data } = await apiInstance.webhooksStripe();
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

