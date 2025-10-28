//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:openapi/src/model/trips_request_post200_response_trip.dart';
import 'package:openapi/src/model/trips_request_post200_response_pricing.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'trips_id_complete_post200_response.g.dart';

/// TripsIdCompletePost200Response
///
/// Properties:
/// * [ok] 
/// * [trip] 
/// * [pricing] 
/// * [clientSecret] 
@BuiltValue()
abstract class TripsIdCompletePost200Response implements Built<TripsIdCompletePost200Response, TripsIdCompletePost200ResponseBuilder> {
  @BuiltValueField(wireName: r'ok')
  bool? get ok;

  @BuiltValueField(wireName: r'trip')
  TripsRequestPost200ResponseTrip? get trip;

  @BuiltValueField(wireName: r'pricing')
  TripsRequestPost200ResponsePricing? get pricing;

  @BuiltValueField(wireName: r'clientSecret')
  String? get clientSecret;

  TripsIdCompletePost200Response._();

  factory TripsIdCompletePost200Response([void updates(TripsIdCompletePost200ResponseBuilder b)]) = _$TripsIdCompletePost200Response;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(TripsIdCompletePost200ResponseBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<TripsIdCompletePost200Response> get serializer => _$TripsIdCompletePost200ResponseSerializer();
}

class _$TripsIdCompletePost200ResponseSerializer implements PrimitiveSerializer<TripsIdCompletePost200Response> {
  @override
  final Iterable<Type> types = const [TripsIdCompletePost200Response, _$TripsIdCompletePost200Response];

  @override
  final String wireName = r'TripsIdCompletePost200Response';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    TripsIdCompletePost200Response object, {
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
    if (object.clientSecret != null) {
      yield r'clientSecret';
      yield serializers.serialize(
        object.clientSecret,
        specifiedType: const FullType(String),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    TripsIdCompletePost200Response object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required TripsIdCompletePost200ResponseBuilder result,
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
        case r'clientSecret':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.clientSecret = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  TripsIdCompletePost200Response deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = TripsIdCompletePost200ResponseBuilder();
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

