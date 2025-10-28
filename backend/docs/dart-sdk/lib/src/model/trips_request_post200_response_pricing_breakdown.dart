//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'trips_request_post200_response_pricing_breakdown.g.dart';

/// TripsRequestPost200ResponsePricingBreakdown
///
/// Properties:
/// * [base_] 
/// * [distance] 
/// * [duration] 
/// * [surge] 
@BuiltValue()
abstract class TripsRequestPost200ResponsePricingBreakdown implements Built<TripsRequestPost200ResponsePricingBreakdown, TripsRequestPost200ResponsePricingBreakdownBuilder> {
  @BuiltValueField(wireName: r'base')
  num? get base_;

  @BuiltValueField(wireName: r'distance')
  num? get distance;

  @BuiltValueField(wireName: r'duration')
  num? get duration;

  @BuiltValueField(wireName: r'surge')
  num? get surge;

  TripsRequestPost200ResponsePricingBreakdown._();

  factory TripsRequestPost200ResponsePricingBreakdown([void updates(TripsRequestPost200ResponsePricingBreakdownBuilder b)]) = _$TripsRequestPost200ResponsePricingBreakdown;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(TripsRequestPost200ResponsePricingBreakdownBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<TripsRequestPost200ResponsePricingBreakdown> get serializer => _$TripsRequestPost200ResponsePricingBreakdownSerializer();
}

class _$TripsRequestPost200ResponsePricingBreakdownSerializer implements PrimitiveSerializer<TripsRequestPost200ResponsePricingBreakdown> {
  @override
  final Iterable<Type> types = const [TripsRequestPost200ResponsePricingBreakdown, _$TripsRequestPost200ResponsePricingBreakdown];

  @override
  final String wireName = r'TripsRequestPost200ResponsePricingBreakdown';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    TripsRequestPost200ResponsePricingBreakdown object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    if (object.base_ != null) {
      yield r'base';
      yield serializers.serialize(
        object.base_,
        specifiedType: const FullType(num),
      );
    }
    if (object.distance != null) {
      yield r'distance';
      yield serializers.serialize(
        object.distance,
        specifiedType: const FullType(num),
      );
    }
    if (object.duration != null) {
      yield r'duration';
      yield serializers.serialize(
        object.duration,
        specifiedType: const FullType(num),
      );
    }
    if (object.surge != null) {
      yield r'surge';
      yield serializers.serialize(
        object.surge,
        specifiedType: const FullType(num),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    TripsRequestPost200ResponsePricingBreakdown object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required TripsRequestPost200ResponsePricingBreakdownBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'base':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(num),
          ) as num;
          result.base_ = valueDes;
          break;
        case r'distance':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(num),
          ) as num;
          result.distance = valueDes;
          break;
        case r'duration':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(num),
          ) as num;
          result.duration = valueDes;
          break;
        case r'surge':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(num),
          ) as num;
          result.surge = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  TripsRequestPost200ResponsePricingBreakdown deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = TripsRequestPost200ResponsePricingBreakdownBuilder();
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

