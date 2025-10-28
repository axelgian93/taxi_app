# TripsRequestPostRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**city** | **string** |  | [optional] [default to undefined]
**pickupLat** | **number** |  | [default to undefined]
**pickupLng** | **number** |  | [default to undefined]
**dropoffLat** | **number** |  | [default to undefined]
**dropoffLng** | **number** |  | [default to undefined]
**distanceKm** | **number** |  | [optional] [default to undefined]
**durationMin** | **number** |  | [optional] [default to undefined]
**searchRadiusM** | **number** | Solo ADMIN. Radio de bÃºsqueda en metros (500-20000). | [optional] [default to undefined]
**locationMaxAgeMin** | **number** | Solo ADMIN. AntigÃ¼edad mÃ¡xima de ubicaciÃ³n en minutos (1-60). | [optional] [default to undefined]
**origin** | [**TripsRequestPostRequestOneOf1Origin**](TripsRequestPostRequestOneOf1Origin.md) |  | [default to undefined]
**destination** | [**TripsRequestPostRequestOneOf1Origin**](TripsRequestPostRequestOneOf1Origin.md) |  | [default to undefined]

## Example

```typescript
import { TripsRequestPostRequest } from './api';

const instance: TripsRequestPostRequest = {
    city,
    pickupLat,
    pickupLng,
    dropoffLat,
    dropoffLng,
    distanceKm,
    durationMin,
    searchRadiusM,
    locationMaxAgeMin,
    origin,
    destination,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
