//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:openapi/src/model/auth_register_post201_response_user.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'auth_register_post201_response.g.dart';

/// AuthRegisterPost201Response
///
/// Properties:
/// * [token] 
/// * [user] 
@BuiltValue()
abstract class AuthRegisterPost201Response implements Built<AuthRegisterPost201Response, AuthRegisterPost201ResponseBuilder> {
  @BuiltValueField(wireName: r'token')
  String? get token;

  @BuiltValueField(wireName: r'user')
  AuthRegisterPost201ResponseUser? get user;

  AuthRegisterPost201Response._();

  factory AuthRegisterPost201Response([void updates(AuthRegisterPost201ResponseBuilder b)]) = _$AuthRegisterPost201Response;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(AuthRegisterPost201ResponseBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<AuthRegisterPost201Response> get serializer => _$AuthRegisterPost201ResponseSerializer();
}

class _$AuthRegisterPost201ResponseSerializer implements PrimitiveSerializer<AuthRegisterPost201Response> {
  @override
  final Iterable<Type> types = const [AuthRegisterPost201Response, _$AuthRegisterPost201Response];

  @override
  final String wireName = r'AuthRegisterPost201Response';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    AuthRegisterPost201Response object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    if (object.token != null) {
      yield r'token';
      yield serializers.serialize(
        object.token,
        specifiedType: const FullType(String),
      );
    }
    if (object.user != null) {
      yield r'user';
      yield serializers.serialize(
        object.user,
        specifiedType: const FullType(AuthRegisterPost201ResponseUser),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    AuthRegisterPost201Response object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required AuthRegisterPost201ResponseBuilder result,
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
        case r'user':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(AuthRegisterPost201ResponseUser),
          ) as AuthRegisterPost201ResponseUser;
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
  AuthRegisterPost201Response deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = AuthRegisterPost201ResponseBuilder();
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

