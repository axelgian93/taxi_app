//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'payments_set_default_method200_response.g.dart';

/// PaymentsSetDefaultMethod200Response
///
/// Properties:
/// * [ok] 
@BuiltValue()
abstract class PaymentsSetDefaultMethod200Response implements Built<PaymentsSetDefaultMethod200Response, PaymentsSetDefaultMethod200ResponseBuilder> {
  @BuiltValueField(wireName: r'ok')
  bool? get ok;

  PaymentsSetDefaultMethod200Response._();

  factory PaymentsSetDefaultMethod200Response([void updates(PaymentsSetDefaultMethod200ResponseBuilder b)]) = _$PaymentsSetDefaultMethod200Response;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(PaymentsSetDefaultMethod200ResponseBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<PaymentsSetDefaultMethod200Response> get serializer => _$PaymentsSetDefaultMethod200ResponseSerializer();
}

class _$PaymentsSetDefaultMethod200ResponseSerializer implements PrimitiveSerializer<PaymentsSetDefaultMethod200Response> {
  @override
  final Iterable<Type> types = const [PaymentsSetDefaultMethod200Response, _$PaymentsSetDefaultMethod200Response];

  @override
  final String wireName = r'PaymentsSetDefaultMethod200Response';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    PaymentsSetDefaultMethod200Response object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    if (object.ok != null) {
      yield r'ok';
      yield serializers.serialize(
        object.ok,
        specifiedType: const FullType(bool),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    PaymentsSetDefaultMethod200Response object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required PaymentsSetDefaultMethod200ResponseBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'ok':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(bool),
          ) as bool;
          result.ok = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  PaymentsSetDefaultMethod200Response deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = PaymentsSetDefaultMethod200ResponseBuilder();
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

