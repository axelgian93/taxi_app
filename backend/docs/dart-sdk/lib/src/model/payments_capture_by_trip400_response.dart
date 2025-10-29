//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'payments_capture_by_trip400_response.g.dart';

/// PaymentsCaptureByTrip400Response
///
/// Properties:
/// * [error] 
@BuiltValue()
abstract class PaymentsCaptureByTrip400Response implements Built<PaymentsCaptureByTrip400Response, PaymentsCaptureByTrip400ResponseBuilder> {
  @BuiltValueField(wireName: r'error')
  String? get error;

  PaymentsCaptureByTrip400Response._();

  factory PaymentsCaptureByTrip400Response([void updates(PaymentsCaptureByTrip400ResponseBuilder b)]) = _$PaymentsCaptureByTrip400Response;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(PaymentsCaptureByTrip400ResponseBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<PaymentsCaptureByTrip400Response> get serializer => _$PaymentsCaptureByTrip400ResponseSerializer();
}

class _$PaymentsCaptureByTrip400ResponseSerializer implements PrimitiveSerializer<PaymentsCaptureByTrip400Response> {
  @override
  final Iterable<Type> types = const [PaymentsCaptureByTrip400Response, _$PaymentsCaptureByTrip400Response];

  @override
  final String wireName = r'PaymentsCaptureByTrip400Response';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    PaymentsCaptureByTrip400Response object, {
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
    PaymentsCaptureByTrip400Response object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required PaymentsCaptureByTrip400ResponseBuilder result,
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
  PaymentsCaptureByTrip400Response deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = PaymentsCaptureByTrip400ResponseBuilder();
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

