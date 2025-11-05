# RiderApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**riderMyTrips**](#ridermytrips) | **GET** /rider/my-trips | Mis viajes (rider)|

# **riderMyTrips**
> RiderMyTrips200Response riderMyTrips()

Lista los últimos viajes del rider autenticado.

### Example

```typescript
import {
    RiderApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RiderApi(configuration);

let limit: number; // (optional) (default to 20)
let cursor: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.riderMyTrips(
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

**RiderMyTrips200Response**

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

