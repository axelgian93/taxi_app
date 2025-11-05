# taxi_openapi.model.AdminTariffsUpdateByIdRequest

## Load the model package
```dart
import 'package:taxi_openapi/api.dart';
```

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**city** | **String** |  | [optional] 
**active** | **bool** |  | [optional] [default to true]
**baseFareUsd** | **num** |  | [optional] 
**perKmUsd** | **num** |  | [optional] 
**perMinUsd** | **num** |  | [optional] 
**minFareUsd** | **num** |  | [optional] 
**nightMultiplier** | **num** |  | [optional] [default to 1]
**weekendMultiplier** | **num** |  | [optional] [default to 1]
**surgeMultiplier** | **num** |  | [optional] [default to 1]
**nightStartHour** | **int** |  | [optional] 
**nightEndHour** | **int** |  | [optional] 
**cancellationGraceSec** | **int** |  | [optional] 
**cancellationFeeAcceptedUsd** | **num** |  | [optional] 
**cancellationFeeArrivedUsd** | **num** |  | [optional] 
**notes** | **String** |  | [optional] 
**deactivateOld** | **bool** | Si true, desactiva reglas activas previas de la misma ciudad | [optional] [default to true]

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


