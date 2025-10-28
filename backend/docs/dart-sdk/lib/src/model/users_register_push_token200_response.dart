//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'users_register_push_token200_response.g.dart';

/// UsersRegisterPushToken200Response
///
/// Properties:
/// * [ok] 
@BuiltValue()
abstract class UsersRegisterPushToken200Response implements Built<UsersRegisterPushToken200Response, UsersRegisterPushToken200ResponseBuilder> {
  @BuiltValueField(wireName: r'ok')
  bool? get ok;

  UsersRegisterPushToken200Response._();

  factory UsersRegisterPushToken200Response([void updates(UsersRegisterPushToken200ResponseBuilder b)]) = _$UsersRegisterPushToken200Response;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(UsersRegisterPushToken200ResponseBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<UsersRegisterPushToken200Response> get serializer => _$UsersRegisterPushToken200ResponseSerializer();
}

class _$UsersRegisterPushToken200ResponseSerializer implements PrimitiveSerializer<UsersRegisterPushToken200Response> {
  @override
  final Iterable<Type> types = const [UsersRegisterPushToken200Response, _$UsersRegisterPushToken200Response];

  @override
  final String wireName = r'UsersRegisterPushToken200Response';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    UsersRegisterPushToken200Response object, {
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
    UsersRegisterPushToken200Response object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required UsersRegisterPushToken200ResponseBuilder result,
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
  UsersRegisterPushToken200Response deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = UsersRegisterPushToken200ResponseBuilder();
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

