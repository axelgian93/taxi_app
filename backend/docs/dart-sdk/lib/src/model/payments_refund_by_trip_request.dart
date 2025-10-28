//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'payments_refund_by_trip_request.g.dart';

/// PaymentsRefundByTripRequest
///
/// Properties:
/// * [amountUsd] 
/// * [reason] 
@BuiltValue()
abstract class PaymentsRefundByTripRequest implements Built<PaymentsRefundByTripRequest, PaymentsRefundByTripRequestBuilder> {
  @BuiltValueField(wireName: r'amountUsd')
  num? get amountUsd;

  @BuiltValueField(wireName: r'reason')
  String? get reason;

  PaymentsRefundByTripRequest._();

  factory PaymentsRefundByTripRequest([void updates(PaymentsRefundByTripRequestBuilder b)]) = _$PaymentsRefundByTripRequest;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(PaymentsRefundByTripRequestBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<PaymentsRefundByTripRequest> get serializer => _$PaymentsRefundByTripRequestSerializer();
}

class _$PaymentsRefundByTripRequestSerializer implements PrimitiveSerializer<PaymentsRefundByTripRequest> {
  @override
  final Iterable<Type> types = const [PaymentsRefundByTripRequest, _$PaymentsRefundByTripRequest];

  @override
  final String wireName = r'PaymentsRefundByTripRequest';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    PaymentsRefundByTripRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    if (object.amountUsd != null) {
      yield r'amountUsd';
      yield serializers.serialize(
        object.amountUsd,
        specifiedType: const FullType(num),
      );
    }
    if (object.reason != null) {
      yield r'reason';
      yield serializers.serialize(
        object.reason,
        specifiedType: const FullType(String),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    PaymentsRefundByTripRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required PaymentsRefundByTripRequestBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'amountUsd':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(num),
          ) as num;
          result.amountUsd = valueDes;
          break;
        case r'reason':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.reason = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  PaymentsRefundByTripRequest deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = PaymentsRefundByTripRequestBuilder();
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

