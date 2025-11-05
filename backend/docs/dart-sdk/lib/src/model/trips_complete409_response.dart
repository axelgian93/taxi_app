//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'trips_complete409_response.g.dart';

/// TripsComplete409Response
///
/// Properties:
/// * [error] 
@BuiltValue()
abstract class TripsComplete409Response implements Built<TripsComplete409Response, TripsComplete409ResponseBuilder> {
  @BuiltValueField(wireName: r'error')
  String? get error;

  TripsComplete409Response._();

  factory TripsComplete409Response([void updates(TripsComplete409ResponseBuilder b)]) = _$TripsComplete409Response;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(TripsComplete409ResponseBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<TripsComplete409Response> get serializer => _$TripsComplete409ResponseSerializer();
}

class _$TripsComplete409ResponseSerializer implements PrimitiveSerializer<TripsComplete409Response> {
  @override
  final Iterable<Type> types = const [TripsComplete409Response, _$TripsComplete409Response];

  @override
  final String wireName = r'TripsComplete409Response';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    TripsComplete409Response object, {
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
    TripsComplete409Response object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required TripsComplete409ResponseBuilder result,
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
  TripsComplete409Response deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = TripsComplete409ResponseBuilder();
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

