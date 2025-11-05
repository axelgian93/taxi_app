//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'auth_password_forgot_request.g.dart';

/// AuthPasswordForgotRequest
///
/// Properties:
/// * [email] 
@BuiltValue()
abstract class AuthPasswordForgotRequest implements Built<AuthPasswordForgotRequest, AuthPasswordForgotRequestBuilder> {
  @BuiltValueField(wireName: r'email')
  String get email;

  AuthPasswordForgotRequest._();

  factory AuthPasswordForgotRequest([void updates(AuthPasswordForgotRequestBuilder b)]) = _$AuthPasswordForgotRequest;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(AuthPasswordForgotRequestBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<AuthPasswordForgotRequest> get serializer => _$AuthPasswordForgotRequestSerializer();
}

class _$AuthPasswordForgotRequestSerializer implements PrimitiveSerializer<AuthPasswordForgotRequest> {
  @override
  final Iterable<Type> types = const [AuthPasswordForgotRequest, _$AuthPasswordForgotRequest];

  @override
  final String wireName = r'AuthPasswordForgotRequest';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    AuthPasswordForgotRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'email';
    yield serializers.serialize(
      object.email,
      specifiedType: const FullType(String),
    );
  }

  @override
  Object serialize(
    Serializers serializers,
    AuthPasswordForgotRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required AuthPasswordForgotRequestBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'email':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.email = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  AuthPasswordForgotRequest deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = AuthPasswordForgotRequestBuilder();
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

