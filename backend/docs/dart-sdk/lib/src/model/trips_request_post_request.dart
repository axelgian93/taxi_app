//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:openapi/src/model/trips_request_post_request_one_of1.dart';
import 'package:openapi/src/model/trips_request_post_request_one_of1_origin.dart';
import 'package:openapi/src/model/trips_request_post_request_one_of.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';
import 'package:one_of/one_of.dart';

part 'trips_request_post_request.g.dart';

/// TripsRequestPostRequest
///
/// Properties:
/// * [city] 
/// * [pickupLat] 
/// * [pickupLng] 
/// * [dropoffLat] 
/// * [dropoffLng] 
/// * [distanceKm] 
/// * [durationMin] 
/// * [searchRadiusM] - Solo ADMIN. Radio de bÃºsqueda en metros (500-20000).
/// * [locationMaxAgeMin] - Solo ADMIN. AntigÃ¼edad mÃ¡xima de ubicaciÃ³n en minutos (1-60).
/// * [origin] 
/// * [destination] 
@BuiltValue()
abstract class TripsRequestPostRequest implements Built<TripsRequestPostRequest, TripsRequestPostRequestBuilder> {
  /// One Of [TripsRequestPostRequestOneOf], [TripsRequestPostRequestOneOf1]
  OneOf get oneOf;

  TripsRequestPostRequest._();

  factory TripsRequestPostRequest([void updates(TripsRequestPostRequestBuilder b)]) = _$TripsRequestPostRequest;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(TripsRequestPostRequestBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<TripsRequestPostRequest> get serializer => _$TripsRequestPostRequestSerializer();
}

class _$TripsRequestPostRequestSerializer implements PrimitiveSerializer<TripsRequestPostRequest> {
  @override
  final Iterable<Type> types = const [TripsRequestPostRequest, _$TripsRequestPostRequest];

  @override
  final String wireName = r'TripsRequestPostRequest';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    TripsRequestPostRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
  }

  @override
  Object serialize(
    Serializers serializers,
    TripsRequestPostRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final oneOf = object.oneOf;
    return serializers.serialize(oneOf.value, specifiedType: FullType(oneOf.valueType))!;
  }

  @override
  TripsRequestPostRequest deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = TripsRequestPostRequestBuilder();
    Object? oneOfDataSrc;
    final targetType = const FullType(OneOf, [FullType(TripsRequestPostRequestOneOf), FullType(TripsRequestPostRequestOneOf1), ]);
    oneOfDataSrc = serialized;
    result.oneOf = serializers.deserialize(oneOfDataSrc, specifiedType: targetType) as OneOf;
    return result.build();
  }
}

