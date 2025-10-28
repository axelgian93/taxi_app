//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'payments_set_default_post_request.g.dart';

/// PaymentsSetDefaultPostRequest
///
/// Properties:
/// * [paymentMethodId] 
@BuiltValue()
abstract class PaymentsSetDefaultPostRequest implements Built<PaymentsSetDefaultPostRequest, PaymentsSetDefaultPostRequestBuilder> {
  @BuiltValueField(wireName: r'paymentMethodId')
  String get paymentMethodId;

  PaymentsSetDefaultPostRequest._();

  factory PaymentsSetDefaultPostRequest([void updates(PaymentsSetDefaultPostRequestBuilder b)]) = _$PaymentsSetDefaultPostRequest;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(PaymentsSetDefaultPostRequestBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<PaymentsSetDefaultPostRequest> get serializer => _$PaymentsSetDefaultPostRequestSerializer();
}

class _$PaymentsSetDefaultPostRequestSerializer implements PrimitiveSerializer<PaymentsSetDefaultPostRequest> {
  @override
  final Iterable<Type> types = const [PaymentsSetDefaultPostRequest, _$PaymentsSetDefaultPostRequest];

  @override
  final String wireName = r'PaymentsSetDefaultPostRequest';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    PaymentsSetDefaultPostRequest object, {
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
    PaymentsSetDefaultPostRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required PaymentsSetDefaultPostRequestBuilder result,
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
  PaymentsSetDefaultPostRequest deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = PaymentsSetDefaultPostRequestBuilder();
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

