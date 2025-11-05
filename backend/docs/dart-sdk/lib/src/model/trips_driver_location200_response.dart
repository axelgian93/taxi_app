//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'trips_driver_location200_response.g.dart';

/// TripsDriverLocation200Response
///
/// Properties:
/// * [tripId] 
/// * [driverId] 
/// * [lat] 
/// * [lng] 
/// * [locationUpdatedAt] 
@BuiltValue()
abstract class TripsDriverLocation200Response implements Built<TripsDriverLocation200Response, TripsDriverLocation200ResponseBuilder> {
  @BuiltValueField(wireName: r'tripId')
  String? get tripId;

  @BuiltValueField(wireName: r'driverId')
  String? get driverId;

  @BuiltValueField(wireName: r'lat')
  num? get lat;

  @BuiltValueField(wireName: r'lng')
  num? get lng;

  @BuiltValueField(wireName: r'locationUpdatedAt')
  DateTime? get locationUpdatedAt;

  TripsDriverLocation200Response._();

  factory TripsDriverLocation200Response([void updates(TripsDriverLocation200ResponseBuilder b)]) = _$TripsDriverLocation200Response;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(TripsDriverLocation200ResponseBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<TripsDriverLocation200Response> get serializer => _$TripsDriverLocation200ResponseSerializer();
}

class _$TripsDriverLocation200ResponseSerializer implements PrimitiveSerializer<TripsDriverLocation200Response> {
  @override
  final Iterable<Type> types = const [TripsDriverLocation200Response, _$TripsDriverLocation200Response];

  @override
  final String wireName = r'TripsDriverLocation200Response';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    TripsDriverLocation200Response object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    if (object.tripId != null) {
      yield r'tripId';
      yield serializers.serialize(
        object.tripId,
        specifiedType: const FullType(String),
      );
    }
    if (object.driverId != null) {
      yield r'driverId';
      yield serializers.serialize(
        object.driverId,
        specifiedType: const FullType.nullable(String),
      );
    }
    if (object.lat != null) {
      yield r'lat';
      yield serializers.serialize(
        object.lat,
        specifiedType: const FullType.nullable(num),
      );
    }
    if (object.lng != null) {
      yield r'lng';
      yield serializers.serialize(
        object.lng,
        specifiedType: const FullType.nullable(num),
      );
    }
    if (object.locationUpdatedAt != null) {
      yield r'locationUpdatedAt';
      yield serializers.serialize(
        object.locationUpdatedAt,
        specifiedType: const FullType.nullable(DateTime),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    TripsDriverLocation200Response object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required TripsDriverLocation200ResponseBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'tripId':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.tripId = valueDes;
          break;
        case r'driverId':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType.nullable(String),
          ) as String?;
          if (valueDes == null) continue;
          result.driverId = valueDes;
          break;
        case r'lat':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType.nullable(num),
          ) as num?;
          if (valueDes == null) continue;
          result.lat = valueDes;
          break;
        case r'lng':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType.nullable(num),
          ) as num?;
          if (valueDes == null) continue;
          result.lng = valueDes;
          break;
        case r'locationUpdatedAt':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType.nullable(DateTime),
          ) as DateTime?;
          if (valueDes == null) continue;
          result.locationUpdatedAt = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  TripsDriverLocation200Response deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = TripsDriverLocation200ResponseBuilder();
    final serializedList = (serialized as Iterable<Object?>).toList();
    final unhandled = <Object?>[];
    _deserializeProperties(
      serializers,
      serialized,
      specifiedType: specifiedType,
      serializedList: serializedList,
      unhandled: unhandled,
      result: result,
    );
    return result.build();
  }
}

