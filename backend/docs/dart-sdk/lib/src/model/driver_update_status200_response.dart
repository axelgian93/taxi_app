//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'driver_update_status200_response.g.dart';

/// DriverUpdateStatus200Response
///
/// Properties:
/// * [ok] 
@BuiltValue()
abstract class DriverUpdateStatus200Response implements Built<DriverUpdateStatus200Response, DriverUpdateStatus200ResponseBuilder> {
  @BuiltValueField(wireName: r'ok')
  bool? get ok;

  DriverUpdateStatus200Response._();

  factory DriverUpdateStatus200Response([void updates(DriverUpdateStatus200ResponseBuilder b)]) = _$DriverUpdateStatus200Response;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(DriverUpdateStatus200ResponseBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<DriverUpdateStatus200Response> get serializer => _$DriverUpdateStatus200ResponseSerializer();
}

class _$DriverUpdateStatus200ResponseSerializer implements PrimitiveSerializer<DriverUpdateStatus200Response> {
  @override
  final Iterable<Type> types = const [DriverUpdateStatus200Response, _$DriverUpdateStatus200Response];

  @override
  final String wireName = r'DriverUpdateStatus200Response';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    DriverUpdateStatus200Response object, {
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
    DriverUpdateStatus200Response object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required DriverUpdateStatus200ResponseBuilder result,
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
  DriverUpdateStatus200Response deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = DriverUpdateStatus200ResponseBuilder();
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

