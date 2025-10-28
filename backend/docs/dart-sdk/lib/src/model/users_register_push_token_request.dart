//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'users_register_push_token_request.g.dart';

/// UsersRegisterPushTokenRequest
///
/// Properties:
/// * [fcmToken] 
@BuiltValue()
abstract class UsersRegisterPushTokenRequest implements Built<UsersRegisterPushTokenRequest, UsersRegisterPushTokenRequestBuilder> {
  @BuiltValueField(wireName: r'fcmToken')
  String get fcmToken;

  UsersRegisterPushTokenRequest._();

  factory UsersRegisterPushTokenRequest([void updates(UsersRegisterPushTokenRequestBuilder b)]) = _$UsersRegisterPushTokenRequest;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(UsersRegisterPushTokenRequestBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<UsersRegisterPushTokenRequest> get serializer => _$UsersRegisterPushTokenRequestSerializer();
}

class _$UsersRegisterPushTokenRequestSerializer implements PrimitiveSerializer<UsersRegisterPushTokenRequest> {
  @override
  final Iterable<Type> types = const [UsersRegisterPushTokenRequest, _$UsersRegisterPushTokenRequest];

  @override
  final String wireName = r'UsersRegisterPushTokenRequest';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    UsersRegisterPushTokenRequest object, {
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
    UsersRegisterPushTokenRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required UsersRegisterPushTokenRequestBuilder result,
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
  UsersRegisterPushTokenRequest deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = UsersRegisterPushTokenRequestBuilder();
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

