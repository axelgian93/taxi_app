//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:openapi/src/model/trips_request_post200_response_pricing_breakdown.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'trips_request_post200_response_pricing.g.dart';

/// TripsRequestPost200ResponsePricing
///
/// Properties:
/// * [baseFareUsd] 
/// * [perKmUsd] 
/// * [perMinUsd] 
/// * [minFareUsd] 
/// * [surgeMultiplier] 
/// * [totalUsd] 
/// * [breakdown] 
@BuiltValue()
abstract class TripsRequestPost200ResponsePricing implements Built<TripsRequestPost200ResponsePricing, TripsRequestPost200ResponsePricingBuilder> {
  @BuiltValueField(wireName: r'baseFareUsd')
  num? get baseFareUsd;

  @BuiltValueField(wireName: r'perKmUsd')
  num? get perKmUsd;

  @BuiltValueField(wireName: r'perMinUsd')
  num? get perMinUsd;

  @BuiltValueField(wireName: r'minFareUsd')
  num? get minFareUsd;

  @BuiltValueField(wireName: r'surgeMultiplier')
  num? get surgeMultiplier;

  @BuiltValueField(wireName: r'totalUsd')
  num? get totalUsd;

  @BuiltValueField(wireName: r'breakdown')
  TripsRequestPost200ResponsePricingBreakdown? get breakdown;

  TripsRequestPost200ResponsePricing._();

  factory TripsRequestPost200ResponsePricing([void updates(TripsRequestPost200ResponsePricingBuilder b)]) = _$TripsRequestPost200ResponsePricing;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(TripsRequestPost200ResponsePricingBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<TripsRequestPost200ResponsePricing> get serializer => _$TripsRequestPost200ResponsePricingSerializer();
}

class _$TripsRequestPost200ResponsePricingSerializer implements PrimitiveSerializer<TripsRequestPost200ResponsePricing> {
  @override
  final Iterable<Type> types = const [TripsRequestPost200ResponsePricing, _$TripsRequestPost200ResponsePricing];

  @override
  final String wireName = r'TripsRequestPost200ResponsePricing';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    TripsRequestPost200ResponsePricing object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    if (object.baseFareUsd != null) {
      yield r'baseFareUsd';
      yield serializers.serialize(
        object.baseFareUsd,
        specifiedType: const FullType(num),
      );
    }
    if (object.perKmUsd != null) {
      yield r'perKmUsd';
      yield serializers.serialize(
        object.perKmUsd,
        specifiedType: const FullType(num),
      );
    }
    if (object.perMinUsd != null) {
      yield r'perMinUsd';
      yield serializers.serialize(
        object.perMinUsd,
        specifiedType: const FullType(num),
      );
    }
    if (object.minFareUsd != null) {
      yield r'minFareUsd';
      yield serializers.serialize(
        object.minFareUsd,
        specifiedType: const FullType(num),
      );
    }
    if (object.surgeMultiplier != null) {
      yield r'surgeMultiplier';
      yield serializers.serialize(
        object.surgeMultiplier,
        specifiedType: const FullType(num),
      );
    }
    if (object.totalUsd != null) {
      yield r'totalUsd';
      yield serializers.serialize(
        object.totalUsd,
        specifiedType: const FullType(num),
      );
    }
    if (object.breakdown != null) {
      yield r'breakdown';
      yield serializers.serialize(
        object.breakdown,
        specifiedType: const FullType(TripsRequestPost200ResponsePricingBreakdown),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    TripsRequestPost200ResponsePricing object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required TripsRequestPost200ResponsePricingBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'baseFareUsd':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(num),
          ) as num;
          result.baseFareUsd = valueDes;
          break;
        case r'perKmUsd':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(num),
          ) as num;
          result.perKmUsd = valueDes;
          break;
        case r'perMinUsd':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(num),
          ) as num;
          result.perMinUsd = valueDes;
          break;
        case r'minFareUsd':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(num),
          ) as num;
          result.minFareUsd = valueDes;
          break;
        case r'surgeMultiplier':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(num),
          ) as num;
          result.surgeMultiplier = valueDes;
          break;
        case r'totalUsd':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(num),
          ) as num;
          result.totalUsd = valueDes;
          break;
        case r'breakdown':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(TripsRequestPost200ResponsePricingBreakdown),
          ) as TripsRequestPost200ResponsePricingBreakdown;
          result.breakdown.replace(valueDes);
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  TripsRequestPost200ResponsePricing deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = TripsRequestPost200ResponsePricingBuilder();
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

