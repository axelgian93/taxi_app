//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'trips_start409_response.g.dart';

/// TripsStart409Response
///
/// Properties:
/// * [error] 
@BuiltValue()
abstract class TripsStart409Response implements Built<TripsStart409Response, TripsStart409ResponseBuilder> {
  @BuiltValueField(wireName: r'error')
  String? get error;

  TripsStart409Response._();

  factory TripsStart409Response([void updates(TripsStart409ResponseBuilder b)]) = _$TripsStart409Response;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(TripsStart409ResponseBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<TripsStart409Response> get serializer => _$TripsStart409ResponseSerializer();
}

class _$TripsStart409ResponseSerializer implements PrimitiveSerializer<TripsStart409Response> {
  @override
  final Iterable<Type> types = const [TripsStart409Response, _$TripsStart409Response];

  @override
  final String wireName = r'TripsStart409Response';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    TripsStart409Response object, {
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
    TripsStart409Response object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required TripsStart409ResponseBuilder result,
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
  TripsStart409Response deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = TripsStart409ResponseBuilder();
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

