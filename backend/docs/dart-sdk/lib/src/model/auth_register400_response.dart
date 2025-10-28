//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'auth_register400_response.g.dart';

/// AuthRegister400Response
///
/// Properties:
/// * [error] 
@BuiltValue()
abstract class AuthRegister400Response implements Built<AuthRegister400Response, AuthRegister400ResponseBuilder> {
  @BuiltValueField(wireName: r'error')
  String? get error;

  AuthRegister400Response._();

  factory AuthRegister400Response([void updates(AuthRegister400ResponseBuilder b)]) = _$AuthRegister400Response;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(AuthRegister400ResponseBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<AuthRegister400Response> get serializer => _$AuthRegister400ResponseSerializer();
}

class _$AuthRegister400ResponseSerializer implements PrimitiveSerializer<AuthRegister400Response> {
  @override
  final Iterable<Type> types = const [AuthRegister400Response, _$AuthRegister400Response];

  @override
  final String wireName = r'AuthRegister400Response';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    AuthRegister400Response object, {
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
    AuthRegister400Response object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required AuthRegister400ResponseBuilder result,
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
  AuthRegister400Response deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = AuthRegister400ResponseBuilder();
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

