//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'users_me_push_token_post_request.g.dart';

/// UsersMePushTokenPostRequest
///
/// Properties:
/// * [fcmToken] 
@BuiltValue()
abstract class UsersMePushTokenPostRequest implements Built<UsersMePushTokenPostRequest, UsersMePushTokenPostRequestBuilder> {
  @BuiltValueField(wireName: r'fcmToken')
  String get fcmToken;

  UsersMePushTokenPostRequest._();

  factory UsersMePushTokenPostRequest([void updates(UsersMePushTokenPostRequestBuilder b)]) = _$UsersMePushTokenPostRequest;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(UsersMePushTokenPostRequestBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<UsersMePushTokenPostRequest> get serializer => _$UsersMePushTokenPostRequestSerializer();
}

class _$UsersMePushTokenPostRequestSerializer implements PrimitiveSerializer<UsersMePushTokenPostRequest> {
  @override
  final Iterable<Type> types = const [UsersMePushTokenPostRequest, _$UsersMePushTokenPostRequest];

  @override
  final String wireName = r'UsersMePushTokenPostRequest';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    UsersMePushTokenPostRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'fcmToken';
    yield serializers.serialize(
      object.fcmToken,
      specifiedType: const FullType(String),
    );
  }

  @override
  Object serialize(
    Serializers serializers,
    UsersMePushTokenPostRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required UsersMePushTokenPostRequestBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'fcmToken':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.fcmToken = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  UsersMePushTokenPostRequest deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = UsersMePushTokenPostRequestBuilder();
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

