//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:taxi_openapi/src/model/trips_request200_response_trip.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'trips_cancel200_response.g.dart';

/// TripsCancel200Response
///
/// Properties:
/// * [ok] 
/// * [trip] 
@BuiltValue()
abstract class TripsCancel200Response implements Built<TripsCancel200Response, TripsCancel200ResponseBuilder> {
  @BuiltValueField(wireName: r'ok')
  bool? get ok;

  @BuiltValueField(wireName: r'trip')
  TripsRequest200ResponseTrip? get trip;

  TripsCancel200Response._();

  factory TripsCancel200Response([void updates(TripsCancel200ResponseBuilder b)]) = _$TripsCancel200Response;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(TripsCancel200ResponseBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<TripsCancel200Response> get serializer => _$TripsCancel200ResponseSerializer();
}

class _$TripsCancel200ResponseSerializer implements PrimitiveSerializer<TripsCancel200Response> {
  @override
  final Iterable<Type> types = const [TripsCancel200Response, _$TripsCancel200Response];

  @override
  final String wireName = r'TripsCancel200Response';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    TripsCancel200Response object, {
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
    TripsCancel200Response object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required TripsCancel200ResponseBuilder result,
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
  TripsCancel200Response deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = TripsCancel200ResponseBuilder();
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

