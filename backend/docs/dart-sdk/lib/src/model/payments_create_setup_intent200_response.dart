//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'payments_create_setup_intent200_response.g.dart';

/// PaymentsCreateSetupIntent200Response
///
/// Properties:
/// * [clientSecret] 
@BuiltValue()
abstract class PaymentsCreateSetupIntent200Response implements Built<PaymentsCreateSetupIntent200Response, PaymentsCreateSetupIntent200ResponseBuilder> {
  @BuiltValueField(wireName: r'clientSecret')
  String? get clientSecret;

  PaymentsCreateSetupIntent200Response._();

  factory PaymentsCreateSetupIntent200Response([void updates(PaymentsCreateSetupIntent200ResponseBuilder b)]) = _$PaymentsCreateSetupIntent200Response;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(PaymentsCreateSetupIntent200ResponseBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<PaymentsCreateSetupIntent200Response> get serializer => _$PaymentsCreateSetupIntent200ResponseSerializer();
}

class _$PaymentsCreateSetupIntent200ResponseSerializer implements PrimitiveSerializer<PaymentsCreateSetupIntent200Response> {
  @override
  final Iterable<Type> types = const [PaymentsCreateSetupIntent200Response, _$PaymentsCreateSetupIntent200Response];

  @override
  final String wireName = r'PaymentsCreateSetupIntent200Response';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    PaymentsCreateSetupIntent200Response object, {
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
    PaymentsCreateSetupIntent200Response object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required PaymentsCreateSetupIntent200ResponseBuilder result,
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
  PaymentsCreateSetupIntent200Response deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = PaymentsCreateSetupIntent200ResponseBuilder();
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

