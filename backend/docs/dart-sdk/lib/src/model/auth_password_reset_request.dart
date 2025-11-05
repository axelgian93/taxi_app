//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'auth_password_reset_request.g.dart';

/// AuthPasswordResetRequest
///
/// Properties:
/// * [token] 
/// * [newPassword] 
@BuiltValue()
abstract class AuthPasswordResetRequest implements Built<AuthPasswordResetRequest, AuthPasswordResetRequestBuilder> {
  @BuiltValueField(wireName: r'token')
  String get token;

  @BuiltValueField(wireName: r'newPassword')
  String get newPassword;

  AuthPasswordResetRequest._();

  factory AuthPasswordResetRequest([void updates(AuthPasswordResetRequestBuilder b)]) = _$AuthPasswordResetRequest;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(AuthPasswordResetRequestBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<AuthPasswordResetRequest> get serializer => _$AuthPasswordResetRequestSerializer();
}

class _$AuthPasswordResetRequestSerializer implements PrimitiveSerializer<AuthPasswordResetRequest> {
  @override
  final Iterable<Type> types = const [AuthPasswordResetRequest, _$AuthPasswordResetRequest];

  @override
  final String wireName = r'AuthPasswordResetRequest';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    AuthPasswordResetRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'token';
    yield serializers.serialize(
      object.token,
      specifiedType: const FullType(String),
    );
    yield r'newPassword';
    yield serializers.serialize(
      object.newPassword,
      specifiedType: const FullType(String),
    );
  }

  @override
  Object serialize(
    Serializers serializers,
    AuthPasswordResetRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required AuthPasswordResetRequestBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'token':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.token = valueDes;
          break;
        case r'newPassword':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.newPassword = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  AuthPasswordResetRequest deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = AuthPasswordResetRequestBuilder();
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

