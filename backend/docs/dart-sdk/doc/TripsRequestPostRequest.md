# openapi.model.TripsRequestPostRequest

## Load the model package
```dart
import 'package:openapi/api.dart';
```

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**city** | **String** |  | [optional] 
**pickupLat** | **num** |  | 
**pickupLng** | **num** |  | 
**dropoffLat** | **num** |  | 
**dropoffLng** | **num** |  | 
**distanceKm** | **num** |  | [optional] 
**durationMin** | **int** |  | [optional] 
**searchRadiusM** | **int** | Solo ADMIN. Radio de bÃºsqueda en metros (500-20000). | [optional] 
**locationMaxAgeMin** | **int** | Solo ADMIN. AntigÃ¼edad mÃ¡xima de ubicaciÃ³n en minutos (1-60). | [optional] 
**origin** | [**TripsRequestPostRequestOneOf1Origin**](TripsRequestPostRequestOneOf1Origin.md) |  | 
**destination** | [**TripsRequestPostRequestOneOf1Origin**](TripsRequestPostRequestOneOf1Origin.md) |  | 

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


