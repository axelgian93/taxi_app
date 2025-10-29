//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'payments_refunds_by_trip404_response.g.dart';

/// PaymentsRefundsByTrip404Response
///
/// Properties:
/// * [error] 
@BuiltValue()
abstract class PaymentsRefundsByTrip404Response implements Built<PaymentsRefundsByTrip404Response, PaymentsRefundsByTrip404ResponseBuilder> {
  @BuiltValueField(wireName: r'error')
  String? get error;

  PaymentsRefundsByTrip404Response._();

  factory PaymentsRefundsByTrip404Response([void updates(PaymentsRefundsByTrip404ResponseBuilder b)]) = _$PaymentsRefundsByTrip404Response;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(PaymentsRefundsByTrip404ResponseBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<PaymentsRefundsByTrip404Response> get serializer => _$PaymentsRefundsByTrip404ResponseSerializer();
}

class _$PaymentsRefundsByTrip404ResponseSerializer implements PrimitiveSerializer<PaymentsRefundsByTrip404Response> {
  @override
  final Iterable<Type> types = const [PaymentsRefundsByTrip404Response, _$PaymentsRefundsByTrip404Response];

  @override
  final String wireName = r'PaymentsRefundsByTrip404Response';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    PaymentsRefundsByTrip404Response object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    if (object.error != null) {
      yield r'error';
      yield serializers.serialize(
        object.error,
        specifiedType: const FullType(String),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    PaymentsRefundsByTrip404Response object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required PaymentsRefundsByTrip404ResponseBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'error':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.error = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  PaymentsRefundsByTrip404Response deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = PaymentsRefundsByTrip404ResponseBuilder();
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

