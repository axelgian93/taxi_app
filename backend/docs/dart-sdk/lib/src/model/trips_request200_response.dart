//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:taxi_openapi/src/model/trips_request200_response_trip.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'trips_request200_response.g.dart';

/// TripsRequest200Response
///
/// Properties:
/// * [ok] 
/// * [trip] 
@BuiltValue()
abstract class TripsRequest200Response implements Built<TripsRequest200Response, TripsRequest200ResponseBuilder> {
  @BuiltValueField(wireName: r'ok')
  bool? get ok;

  @BuiltValueField(wireName: r'trip')
  TripsRequest200ResponseTrip? get trip;

  TripsRequest200Response._();

  factory TripsRequest200Response([void updates(TripsRequest200ResponseBuilder b)]) = _$TripsRequest200Response;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(TripsRequest200ResponseBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<TripsRequest200Response> get serializer => _$TripsRequest200ResponseSerializer();
}

class _$TripsRequest200ResponseSerializer implements PrimitiveSerializer<TripsRequest200Response> {
  @override
  final Iterable<Type> types = const [TripsRequest200Response, _$TripsRequest200Response];

  @override
  final String wireName = r'TripsRequest200Response';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    TripsRequest200Response object, {
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
    TripsRequest200Response object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required TripsRequest200ResponseBuilder result,
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
  TripsRequest200Response deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = TripsRequest200ResponseBuilder();
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

