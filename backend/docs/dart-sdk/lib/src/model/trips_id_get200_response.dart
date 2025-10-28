//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:openapi/src/model/trips_id_get200_response_trip.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'trips_id_get200_response.g.dart';

/// TripsIdGet200Response
///
/// Properties:
/// * [ok] 
/// * [trip] 
@BuiltValue()
abstract class TripsIdGet200Response implements Built<TripsIdGet200Response, TripsIdGet200ResponseBuilder> {
  @BuiltValueField(wireName: r'ok')
  bool? get ok;

  @BuiltValueField(wireName: r'trip')
  TripsIdGet200ResponseTrip? get trip;

  TripsIdGet200Response._();

  factory TripsIdGet200Response([void updates(TripsIdGet200ResponseBuilder b)]) = _$TripsIdGet200Response;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(TripsIdGet200ResponseBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<TripsIdGet200Response> get serializer => _$TripsIdGet200ResponseSerializer();
}

class _$TripsIdGet200ResponseSerializer implements PrimitiveSerializer<TripsIdGet200Response> {
  @override
  final Iterable<Type> types = const [TripsIdGet200Response, _$TripsIdGet200Response];

  @override
  final String wireName = r'TripsIdGet200Response';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    TripsIdGet200Response object, {
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
        specifiedType: const FullType(TripsIdGet200ResponseTrip),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    TripsIdGet200Response object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required TripsIdGet200ResponseBuilder result,
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
            specifiedType: const FullType(TripsIdGet200ResponseTrip),
          ) as TripsIdGet200ResponseTrip;
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
  TripsIdGet200Response deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = TripsIdGet200ResponseBuilder();
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

