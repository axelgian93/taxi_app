# AdminTariffsCreateRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**city** | **string** |  | [default to undefined]
**active** | **boolean** |  | [optional] [default to true]
**baseFareUsd** | **number** |  | [default to undefined]
**perKmUsd** | **number** |  | [default to undefined]
**perMinUsd** | **number** |  | [default to undefined]
**minFareUsd** | **number** |  | [optional] [default to undefined]
**nightMultiplier** | **number** |  | [optional] [default to 1]
**weekendMultiplier** | **number** |  | [optional] [default to 1]
**surgeMultiplier** | **number** |  | [optional] [default to 1]
**nightStartHour** | **number** |  | [optional] [default to undefined]
**nightEndHour** | **number** |  | [optional] [default to undefined]
**cancellationGraceSec** | **number** |  | [optional] [default to undefined]
**cancellationFeeAcceptedUsd** | **number** |  | [optional] [default to undefined]
**cancellationFeeArrivedUsd** | **number** |  | [optional] [default to undefined]
**notes** | **string** |  | [optional] [default to undefined]
**deactivateOld** | **boolean** | Si true, desactiva reglas activas previas de la misma ciudad | [optional] [default to true]

## Example

```typescript
import { AdminTariffsCreateRequest } from './api';

const instance: AdminTariffsCreateRequest = {
    city,
    active,
    baseFareUsd,
    perKmUsd,
    perMinUsd,
    minFareUsd,
    nightMultiplier,
    weekendMultiplier,
    surgeMultiplier,
    nightStartHour,
    nightEndHour,
    cancellationGraceSec,
    cancellationFeeAcceptedUsd,
    cancellationFeeArrivedUsd,
    notes,
    deactivateOld,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
