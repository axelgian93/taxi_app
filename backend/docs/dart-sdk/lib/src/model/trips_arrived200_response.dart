//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:taxi_openapi/src/model/trips_request200_response_trip.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'trips_arrived200_response.g.dart';

/// TripsArrived200Response
///
/// Properties:
/// * [ok] 
/// * [trip] 
@BuiltValue()
abstract class TripsArrived200Response implements Built<TripsArrived200Response, TripsArrived200ResponseBuilder> {
  @BuiltValueField(wireName: r'ok')
  bool? get ok;

  @BuiltValueField(wireName: r'trip')
  TripsRequest200ResponseTrip? get trip;

  TripsArrived200Response._();

  factory TripsArrived200Response([void updates(TripsArrived200ResponseBuilder b)]) = _$TripsArrived200Response;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(TripsArrived200ResponseBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<TripsArrived200Response> get serializer => _$TripsArrived200ResponseSerializer();
}

class _$TripsArrived200ResponseSerializer implements PrimitiveSerializer<TripsArrived200Response> {
  @override
  final Iterable<Type> types = const [TripsArrived200Response, _$TripsArrived200Response];

  @override
  final String wireName = r'TripsArrived200Response';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    TripsArrived200Response object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    if (object.ok != null) {
      yield r'ok';
      yield serializers.serialize(
        object.ok,
        specifiedType: const FullType(bool),
      );
    }
    if (object.trip != null) {
      yield r'trip';
      yield serializers.serialize(
        object.trip,
        specifiedType: const FullType(TripsRequest200ResponseTrip),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    TripsArrived200Response object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required TripsArrived200ResponseBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'ok':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(bool),
          ) as bool;
          result.ok = valueDes;
          break;
        case r'trip':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(TripsRequest200ResponseTrip),
          ) as TripsRequest200ResponseTrip;
          result.trip.replace(valueDes);
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  TripsArrived200Response deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = TripsArrived200ResponseBuilder();
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

