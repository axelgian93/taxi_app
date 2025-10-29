//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'driver_update_status401_response.g.dart';

/// DriverUpdateStatus401Response
///
/// Properties:
/// * [error] 
@BuiltValue()
abstract class DriverUpdateStatus401Response implements Built<DriverUpdateStatus401Response, DriverUpdateStatus401ResponseBuilder> {
  @BuiltValueField(wireName: r'error')
  String? get error;

  DriverUpdateStatus401Response._();

  factory DriverUpdateStatus401Response([void updates(DriverUpdateStatus401ResponseBuilder b)]) = _$DriverUpdateStatus401Response;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(DriverUpdateStatus401ResponseBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<DriverUpdateStatus401Response> get serializer => _$DriverUpdateStatus401ResponseSerializer();
}

class _$DriverUpdateStatus401ResponseSerializer implements PrimitiveSerializer<DriverUpdateStatus401Response> {
  @override
  final Iterable<Type> types = const [DriverUpdateStatus401Response, _$DriverUpdateStatus401Response];

  @override
  final String wireName = r'DriverUpdateStatus401Response';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    DriverUpdateStatus401Response object, {
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
    DriverUpdateStatus401Response object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required DriverUpdateStatus401ResponseBuilder result,
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
  DriverUpdateStatus401Response deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = DriverUpdateStatus401ResponseBuilder();
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

