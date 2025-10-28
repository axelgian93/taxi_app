# TripsRequestPostRequestOneOf


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

## Example

```typescript
import { TripsRequestPostRequestOneOf } from './api';

const instance: TripsRequestPostRequestOneOf = {
    city,
    pickupLat,
    pickupLng,
    dropoffLat,
    dropoffLng,
    distanceKm,
    durationMin,
    searchRadiusM,
    locationMaxAgeMin,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
