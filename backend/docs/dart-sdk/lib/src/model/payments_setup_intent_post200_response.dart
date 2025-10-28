//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'payments_setup_intent_post200_response.g.dart';

/// PaymentsSetupIntentPost200Response
///
/// Properties:
/// * [clientSecret] 
@BuiltValue()
abstract class PaymentsSetupIntentPost200Response implements Built<PaymentsSetupIntentPost200Response, PaymentsSetupIntentPost200ResponseBuilder> {
  @BuiltValueField(wireName: r'clientSecret')
  String? get clientSecret;

  PaymentsSetupIntentPost200Response._();

  factory PaymentsSetupIntentPost200Response([void updates(PaymentsSetupIntentPost200ResponseBuilder b)]) = _$PaymentsSetupIntentPost200Response;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(PaymentsSetupIntentPost200ResponseBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<PaymentsSetupIntentPost200Response> get serializer => _$PaymentsSetupIntentPost200ResponseSerializer();
}

class _$PaymentsSetupIntentPost200ResponseSerializer implements PrimitiveSerializer<PaymentsSetupIntentPost200Response> {
  @override
  final Iterable<Type> types = const [PaymentsSetupIntentPost200Response, _$PaymentsSetupIntentPost200Response];

  @override
  final String wireName = r'PaymentsSetupIntentPost200Response';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    PaymentsSetupIntentPost200Response object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
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
    PaymentsSetupIntentPost200Response object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required PaymentsSetupIntentPost200ResponseBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
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
  PaymentsSetupIntentPost200Response deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = PaymentsSetupIntentPost200ResponseBuilder();
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

