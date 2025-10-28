//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:openapi/src/model/auth_me200_response_user.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'auth_me200_response.g.dart';

/// AuthMe200Response
///
/// Properties:
/// * [user] 
@BuiltValue()
abstract class AuthMe200Response implements Built<AuthMe200Response, AuthMe200ResponseBuilder> {
  @BuiltValueField(wireName: r'user')
  AuthMe200ResponseUser? get user;

  AuthMe200Response._();

  factory AuthMe200Response([void updates(AuthMe200ResponseBuilder b)]) = _$AuthMe200Response;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(AuthMe200ResponseBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<AuthMe200Response> get serializer => _$AuthMe200ResponseSerializer();
}

class _$AuthMe200ResponseSerializer implements PrimitiveSerializer<AuthMe200Response> {
  @override
  final Iterable<Type> types = const [AuthMe200Response, _$AuthMe200Response];

  @override
  final String wireName = r'AuthMe200Response';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    AuthMe200Response object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    if (object.user != null) {
      yield r'user';
      yield serializers.serialize(
        object.user,
        specifiedType: const FullType(AuthMe200ResponseUser),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    AuthMe200Response object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required AuthMe200ResponseBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'user':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(AuthMe200ResponseUser),
          ) as AuthMe200ResponseUser;
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
  AuthMe200Response deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = AuthMe200ResponseBuilder();
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

