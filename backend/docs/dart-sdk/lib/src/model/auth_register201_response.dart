//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:taxi_openapi/src/model/auth_register201_response_user.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'auth_register201_response.g.dart';

/// AuthRegister201Response
///
/// Properties:
/// * [token] 
/// * [refreshToken] 
/// * [user] 
@BuiltValue()
abstract class AuthRegister201Response implements Built<AuthRegister201Response, AuthRegister201ResponseBuilder> {
  @BuiltValueField(wireName: r'token')
  String? get token;

  @BuiltValueField(wireName: r'refreshToken')
  String? get refreshToken;

  @BuiltValueField(wireName: r'user')
  AuthRegister201ResponseUser? get user;

  AuthRegister201Response._();

  factory AuthRegister201Response([void updates(AuthRegister201ResponseBuilder b)]) = _$AuthRegister201Response;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(AuthRegister201ResponseBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<AuthRegister201Response> get serializer => _$AuthRegister201ResponseSerializer();
}

class _$AuthRegister201ResponseSerializer implements PrimitiveSerializer<AuthRegister201Response> {
  @override
  final Iterable<Type> types = const [AuthRegister201Response, _$AuthRegister201Response];

  @override
  final String wireName = r'AuthRegister201Response';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    AuthRegister201Response object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    if (object.token != null) {
      yield r'token';
      yield serializers.serialize(
        object.token,
        specifiedType: const FullType(String),
      );
    }
    if (object.refreshToken != null) {
      yield r'refreshToken';
      yield serializers.serialize(
        object.refreshToken,
        specifiedType: const FullType(String),
      );
    }
    if (object.user != null) {
      yield r'user';
      yield serializers.serialize(
        object.user,
        specifiedType: const FullType(AuthRegister201ResponseUser),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    AuthRegister201Response object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required AuthRegister201ResponseBuilder result,
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
        case r'refreshToken':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.refreshToken = valueDes;
          break;
        case r'user':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(AuthRegister201ResponseUser),
          ) as AuthRegister201ResponseUser;
          result.user.replace(valueDes);
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  AuthRegister201Response deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = AuthRegister201ResponseBuilder();
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

