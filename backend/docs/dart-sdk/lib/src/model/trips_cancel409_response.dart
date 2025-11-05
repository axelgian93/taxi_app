//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'trips_cancel409_response.g.dart';

/// TripsCancel409Response
///
/// Properties:
/// * [error] 
@BuiltValue()
abstract class TripsCancel409Response implements Built<TripsCancel409Response, TripsCancel409ResponseBuilder> {
  @BuiltValueField(wireName: r'error')
  String? get error;

  TripsCancel409Response._();

  factory TripsCancel409Response([void updates(TripsCancel409ResponseBuilder b)]) = _$TripsCancel409Response;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(TripsCancel409ResponseBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<TripsCancel409Response> get serializer => _$TripsCancel409ResponseSerializer();
}

class _$TripsCancel409ResponseSerializer implements PrimitiveSerializer<TripsCancel409Response> {
  @override
  final Iterable<Type> types = const [TripsCancel409Response, _$TripsCancel409Response];

  @override
  final String wireName = r'TripsCancel409Response';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    TripsCancel409Response object, {
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
    TripsCancel409Response object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required TripsCancel409ResponseBuilder result,
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
  TripsCancel409Response deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = TripsCancel409ResponseBuilder();
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

