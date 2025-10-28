//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:openapi/src/model/trips_request_post200_response_trip.dart';
import 'package:openapi/src/model/trips_request_post200_response_pricing.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'trips_request_post200_response.g.dart';

/// TripsRequestPost200Response
///
/// Properties:
/// * [ok] 
/// * [trip] 
/// * [pricing] 
@BuiltValue()
abstract class TripsRequestPost200Response implements Built<TripsRequestPost200Response, TripsRequestPost200ResponseBuilder> {
  @BuiltValueField(wireName: r'ok')
  bool? get ok;

  @BuiltValueField(wireName: r'trip')
  TripsRequestPost200ResponseTrip? get trip;

  @BuiltValueField(wireName: r'pricing')
  TripsRequestPost200ResponsePricing? get pricing;

  TripsRequestPost200Response._();

  factory TripsRequestPost200Response([void updates(TripsRequestPost200ResponseBuilder b)]) = _$TripsRequestPost200Response;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(TripsRequestPost200ResponseBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<TripsRequestPost200Response> get serializer => _$TripsRequestPost200ResponseSerializer();
}

class _$TripsRequestPost200ResponseSerializer implements PrimitiveSerializer<TripsRequestPost200Response> {
  @override
  final Iterable<Type> types = const [TripsRequestPost200Response, _$TripsRequestPost200Response];

  @override
  final String wireName = r'TripsRequestPost200Response';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    TripsRequestPost200Response object, {
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
        specifiedType: const FullType(TripsRequestPost200ResponseTrip),
      );
    }
    if (object.pricing != null) {
      yield r'pricing';
      yield serializers.serialize(
        object.pricing,
        specifiedType: const FullType(TripsRequestPost200ResponsePricing),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    TripsRequestPost200Response object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required TripsRequestPost200ResponseBuilder result,
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
            specifiedType: const FullType(TripsRequestPost200ResponseTrip),
          ) as TripsRequestPost200ResponseTrip;
          result.trip.replace(valueDes);
          break;
        case r'pricing':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(TripsRequestPost200ResponsePricing),
          ) as TripsRequestPost200ResponsePricing;
          result.pricing.replace(valueDes);
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  TripsRequestPost200Response deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = TripsRequestPost200ResponseBuilder();
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

