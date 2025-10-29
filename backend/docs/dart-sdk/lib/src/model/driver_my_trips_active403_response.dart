//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'driver_my_trips_active403_response.g.dart';

/// DriverMyTripsActive403Response
///
/// Properties:
/// * [error] 
@BuiltValue()
abstract class DriverMyTripsActive403Response implements Built<DriverMyTripsActive403Response, DriverMyTripsActive403ResponseBuilder> {
  @BuiltValueField(wireName: r'error')
  String? get error;

  DriverMyTripsActive403Response._();

  factory DriverMyTripsActive403Response([void updates(DriverMyTripsActive403ResponseBuilder b)]) = _$DriverMyTripsActive403Response;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(DriverMyTripsActive403ResponseBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<DriverMyTripsActive403Response> get serializer => _$DriverMyTripsActive403ResponseSerializer();
}

class _$DriverMyTripsActive403ResponseSerializer implements PrimitiveSerializer<DriverMyTripsActive403Response> {
  @override
  final Iterable<Type> types = const [DriverMyTripsActive403Response, _$DriverMyTripsActive403Response];

  @override
  final String wireName = r'DriverMyTripsActive403Response';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    DriverMyTripsActive403Response object, {
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
    DriverMyTripsActive403Response object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required DriverMyTripsActive403ResponseBuilder result,
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
  DriverMyTripsActive403Response deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = DriverMyTripsActive403ResponseBuilder();
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

