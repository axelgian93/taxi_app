//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:taxi_openapi/src/model/trips_request200_response_trip.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'trips_start200_response.g.dart';

/// TripsStart200Response
///
/// Properties:
/// * [ok] 
/// * [trip] 
@BuiltValue()
abstract class TripsStart200Response implements Built<TripsStart200Response, TripsStart200ResponseBuilder> {
  @BuiltValueField(wireName: r'ok')
  bool? get ok;

  @BuiltValueField(wireName: r'trip')
  TripsRequest200ResponseTrip? get trip;

  TripsStart200Response._();

  factory TripsStart200Response([void updates(TripsStart200ResponseBuilder b)]) = _$TripsStart200Response;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(TripsStart200ResponseBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<TripsStart200Response> get serializer => _$TripsStart200ResponseSerializer();
}

class _$TripsStart200ResponseSerializer implements PrimitiveSerializer<TripsStart200Response> {
  @override
  final Iterable<Type> types = const [TripsStart200Response, _$TripsStart200Response];

  @override
  final String wireName = r'TripsStart200Response';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    TripsStart200Response object, {
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
    TripsStart200Response object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required TripsStart200ResponseBuilder result,
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
  TripsStart200Response deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = TripsStart200ResponseBuilder();
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

