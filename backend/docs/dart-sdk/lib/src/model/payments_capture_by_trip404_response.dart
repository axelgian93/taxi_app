//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'payments_capture_by_trip404_response.g.dart';

/// PaymentsCaptureByTrip404Response
///
/// Properties:
/// * [error] 
@BuiltValue()
abstract class PaymentsCaptureByTrip404Response implements Built<PaymentsCaptureByTrip404Response, PaymentsCaptureByTrip404ResponseBuilder> {
  @BuiltValueField(wireName: r'error')
  String? get error;

  PaymentsCaptureByTrip404Response._();

  factory PaymentsCaptureByTrip404Response([void updates(PaymentsCaptureByTrip404ResponseBuilder b)]) = _$PaymentsCaptureByTrip404Response;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(PaymentsCaptureByTrip404ResponseBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<PaymentsCaptureByTrip404Response> get serializer => _$PaymentsCaptureByTrip404ResponseSerializer();
}

class _$PaymentsCaptureByTrip404ResponseSerializer implements PrimitiveSerializer<PaymentsCaptureByTrip404Response> {
  @override
  final Iterable<Type> types = const [PaymentsCaptureByTrip404Response, _$PaymentsCaptureByTrip404Response];

  @override
  final String wireName = r'PaymentsCaptureByTrip404Response';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    PaymentsCaptureByTrip404Response object, {
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
    PaymentsCaptureByTrip404Response object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required PaymentsCaptureByTrip404ResponseBuilder result,
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
  PaymentsCaptureByTrip404Response deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = PaymentsCaptureByTrip404ResponseBuilder();
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

