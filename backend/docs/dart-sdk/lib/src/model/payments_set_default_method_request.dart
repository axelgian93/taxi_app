//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'payments_set_default_method_request.g.dart';

/// PaymentsSetDefaultMethodRequest
///
/// Properties:
/// * [paymentMethodId] 
@BuiltValue()
abstract class PaymentsSetDefaultMethodRequest implements Built<PaymentsSetDefaultMethodRequest, PaymentsSetDefaultMethodRequestBuilder> {
  @BuiltValueField(wireName: r'paymentMethodId')
  String get paymentMethodId;

  PaymentsSetDefaultMethodRequest._();

  factory PaymentsSetDefaultMethodRequest([void updates(PaymentsSetDefaultMethodRequestBuilder b)]) = _$PaymentsSetDefaultMethodRequest;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(PaymentsSetDefaultMethodRequestBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<PaymentsSetDefaultMethodRequest> get serializer => _$PaymentsSetDefaultMethodRequestSerializer();
}

class _$PaymentsSetDefaultMethodRequestSerializer implements PrimitiveSerializer<PaymentsSetDefaultMethodRequest> {
  @override
  final Iterable<Type> types = const [PaymentsSetDefaultMethodRequest, _$PaymentsSetDefaultMethodRequest];

  @override
  final String wireName = r'PaymentsSetDefaultMethodRequest';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    PaymentsSetDefaultMethodRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'paymentMethodId';
    yield serializers.serialize(
      object.paymentMethodId,
      specifiedType: const FullType(String),
    );
  }

  @override
  Object serialize(
    Serializers serializers,
    PaymentsSetDefaultMethodRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required PaymentsSetDefaultMethodRequestBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'paymentMethodId':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.paymentMethodId = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  PaymentsSetDefaultMethodRequest deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = PaymentsSetDefaultMethodRequestBuilder();
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

