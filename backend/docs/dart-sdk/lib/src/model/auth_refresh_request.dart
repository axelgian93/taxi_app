//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'auth_refresh_request.g.dart';

/// AuthRefreshRequest
///
/// Properties:
/// * [refreshToken] 
@BuiltValue()
abstract class AuthRefreshRequest implements Built<AuthRefreshRequest, AuthRefreshRequestBuilder> {
  @BuiltValueField(wireName: r'refreshToken')
  String get refreshToken;

  AuthRefreshRequest._();

  factory AuthRefreshRequest([void updates(AuthRefreshRequestBuilder b)]) = _$AuthRefreshRequest;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(AuthRefreshRequestBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<AuthRefreshRequest> get serializer => _$AuthRefreshRequestSerializer();
}

class _$AuthRefreshRequestSerializer implements PrimitiveSerializer<AuthRefreshRequest> {
  @override
  final Iterable<Type> types = const [AuthRefreshRequest, _$AuthRefreshRequest];

  @override
  final String wireName = r'AuthRefreshRequest';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    AuthRefreshRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'refreshToken';
    yield serializers.serialize(
      object.refreshToken,
      specifiedType: const FullType(String),
    );
  }

  @override
  Object serialize(
    Serializers serializers,
    AuthRefreshRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required AuthRefreshRequestBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'refreshToken':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.refreshToken = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  AuthRefreshRequest deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = AuthRefreshRequestBuilder();
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

