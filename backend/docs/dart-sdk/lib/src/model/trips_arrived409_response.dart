//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'trips_arrived409_response.g.dart';

/// TripsArrived409Response
///
/// Properties:
/// * [error] 
@BuiltValue()
abstract class TripsArrived409Response implements Built<TripsArrived409Response, TripsArrived409ResponseBuilder> {
  @BuiltValueField(wireName: r'error')
  String? get error;

  TripsArrived409Response._();

  factory TripsArrived409Response([void updates(TripsArrived409ResponseBuilder b)]) = _$TripsArrived409Response;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(TripsArrived409ResponseBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<TripsArrived409Response> get serializer => _$TripsArrived409ResponseSerializer();
}

class _$TripsArrived409ResponseSerializer implements PrimitiveSerializer<TripsArrived409Response> {
  @override
  final Iterable<Type> types = const [TripsArrived409Response, _$TripsArrived409Response];

  @override
  final String wireName = r'TripsArrived409Response';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    TripsArrived409Response object, {
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
    TripsArrived409Response object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required TripsArrived409ResponseBuilder result,
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
  TripsArrived409Response deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = TripsArrived409ResponseBuilder();
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

