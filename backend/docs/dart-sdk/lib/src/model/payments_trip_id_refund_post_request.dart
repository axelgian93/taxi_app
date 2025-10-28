//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'payments_trip_id_refund_post_request.g.dart';

/// PaymentsTripIdRefundPostRequest
///
/// Properties:
/// * [amountUsd] 
/// * [reason] 
@BuiltValue()
abstract class PaymentsTripIdRefundPostRequest implements Built<PaymentsTripIdRefundPostRequest, PaymentsTripIdRefundPostRequestBuilder> {
  @BuiltValueField(wireName: r'amountUsd')
  num? get amountUsd;

  @BuiltValueField(wireName: r'reason')
  String? get reason;

  PaymentsTripIdRefundPostRequest._();

  factory PaymentsTripIdRefundPostRequest([void updates(PaymentsTripIdRefundPostRequestBuilder b)]) = _$PaymentsTripIdRefundPostRequest;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(PaymentsTripIdRefundPostRequestBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<PaymentsTripIdRefundPostRequest> get serializer => _$PaymentsTripIdRefundPostRequestSerializer();
}

class _$PaymentsTripIdRefundPostRequestSerializer implements PrimitiveSerializer<PaymentsTripIdRefundPostRequest> {
  @override
  final Iterable<Type> types = const [PaymentsTripIdRefundPostRequest, _$PaymentsTripIdRefundPostRequest];

  @override
  final String wireName = r'PaymentsTripIdRefundPostRequest';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    PaymentsTripIdRefundPostRequest object, {
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
    PaymentsTripIdRefundPostRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required PaymentsTripIdRefundPostRequestBuilder result,
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
  PaymentsTripIdRefundPostRequest deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = PaymentsTripIdRefundPostRequestBuilder();
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

