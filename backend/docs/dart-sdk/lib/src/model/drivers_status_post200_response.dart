//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'drivers_status_post200_response.g.dart';

/// DriversStatusPost200Response
///
/// Properties:
/// * [ok] 
@BuiltValue()
abstract class DriversStatusPost200Response implements Built<DriversStatusPost200Response, DriversStatusPost200ResponseBuilder> {
  @BuiltValueField(wireName: r'ok')
  bool? get ok;

  DriversStatusPost200Response._();

  factory DriversStatusPost200Response([void updates(DriversStatusPost200ResponseBuilder b)]) = _$DriversStatusPost200Response;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(DriversStatusPost200ResponseBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<DriversStatusPost200Response> get serializer => _$DriversStatusPost200ResponseSerializer();
}

class _$DriversStatusPost200ResponseSerializer implements PrimitiveSerializer<DriversStatusPost200Response> {
  @override
  final Iterable<Type> types = const [DriversStatusPost200Response, _$DriversStatusPost200Response];

  @override
  final String wireName = r'DriversStatusPost200Response';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    DriversStatusPost200Response object, {
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
    DriversStatusPost200Response object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required DriversStatusPost200ResponseBuilder result,
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
  DriversStatusPost200Response deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = DriversStatusPost200ResponseBuilder();
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

