//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'auth_password_forgot200_response.g.dart';

/// AuthPasswordForgot200Response
///
/// Properties:
/// * [ok] 
@BuiltValue()
abstract class AuthPasswordForgot200Response implements Built<AuthPasswordForgot200Response, AuthPasswordForgot200ResponseBuilder> {
  @BuiltValueField(wireName: r'ok')
  bool? get ok;

  AuthPasswordForgot200Response._();

  factory AuthPasswordForgot200Response([void updates(AuthPasswordForgot200ResponseBuilder b)]) = _$AuthPasswordForgot200Response;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(AuthPasswordForgot200ResponseBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<AuthPasswordForgot200Response> get serializer => _$AuthPasswordForgot200ResponseSerializer();
}

class _$AuthPasswordForgot200ResponseSerializer implements PrimitiveSerializer<AuthPasswordForgot200Response> {
  @override
  final Iterable<Type> types = const [AuthPasswordForgot200Response, _$AuthPasswordForgot200Response];

  @override
  final String wireName = r'AuthPasswordForgot200Response';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    AuthPasswordForgot200Response object, {
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
    AuthPasswordForgot200Response object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required AuthPasswordForgot200ResponseBuilder result,
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
  AuthPasswordForgot200Response deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = AuthPasswordForgot200ResponseBuilder();
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

