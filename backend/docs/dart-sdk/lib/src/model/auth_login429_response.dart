//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'auth_login429_response.g.dart';

/// AuthLogin429Response
///
/// Properties:
/// * [error] 
@BuiltValue()
abstract class AuthLogin429Response implements Built<AuthLogin429Response, AuthLogin429ResponseBuilder> {
  @BuiltValueField(wireName: r'error')
  String? get error;

  AuthLogin429Response._();

  factory AuthLogin429Response([void updates(AuthLogin429ResponseBuilder b)]) = _$AuthLogin429Response;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(AuthLogin429ResponseBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<AuthLogin429Response> get serializer => _$AuthLogin429ResponseSerializer();
}

class _$AuthLogin429ResponseSerializer implements PrimitiveSerializer<AuthLogin429Response> {
  @override
  final Iterable<Type> types = const [AuthLogin429Response, _$AuthLogin429Response];

  @override
  final String wireName = r'AuthLogin429Response';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    AuthLogin429Response object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    if (object.error != null) {
      yield r'error';
      yield serializers.serialize(
        object.error,
        specifiedType: const FullType(String),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    AuthLogin429Response object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required AuthLogin429ResponseBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'error':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.error = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  AuthLogin429Response deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = AuthLogin429ResponseBuilder();
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

