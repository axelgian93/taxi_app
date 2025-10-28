//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'users_me_push_token_post200_response.g.dart';

/// UsersMePushTokenPost200Response
///
/// Properties:
/// * [ok] 
@BuiltValue()
abstract class UsersMePushTokenPost200Response implements Built<UsersMePushTokenPost200Response, UsersMePushTokenPost200ResponseBuilder> {
  @BuiltValueField(wireName: r'ok')
  bool? get ok;

  UsersMePushTokenPost200Response._();

  factory UsersMePushTokenPost200Response([void updates(UsersMePushTokenPost200ResponseBuilder b)]) = _$UsersMePushTokenPost200Response;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(UsersMePushTokenPost200ResponseBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<UsersMePushTokenPost200Response> get serializer => _$UsersMePushTokenPost200ResponseSerializer();
}

class _$UsersMePushTokenPost200ResponseSerializer implements PrimitiveSerializer<UsersMePushTokenPost200Response> {
  @override
  final Iterable<Type> types = const [UsersMePushTokenPost200Response, _$UsersMePushTokenPost200Response];

  @override
  final String wireName = r'UsersMePushTokenPost200Response';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    UsersMePushTokenPost200Response object, {
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
    UsersMePushTokenPost200Response object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required UsersMePushTokenPost200ResponseBuilder result,
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
  UsersMePushTokenPost200Response deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = UsersMePushTokenPost200ResponseBuilder();
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

