//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'trips_accept409_response.g.dart';

/// TripsAccept409Response
///
/// Properties:
/// * [error] 
@BuiltValue()
abstract class TripsAccept409Response implements Built<TripsAccept409Response, TripsAccept409ResponseBuilder> {
  @BuiltValueField(wireName: r'error')
  String? get error;

  TripsAccept409Response._();

  factory TripsAccept409Response([void updates(TripsAccept409ResponseBuilder b)]) = _$TripsAccept409Response;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(TripsAccept409ResponseBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<TripsAccept409Response> get serializer => _$TripsAccept409ResponseSerializer();
}

class _$TripsAccept409ResponseSerializer implements PrimitiveSerializer<TripsAccept409Response> {
  @override
  final Iterable<Type> types = const [TripsAccept409Response, _$TripsAccept409Response];

  @override
  final String wireName = r'TripsAccept409Response';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    TripsAccept409Response object, {
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
    TripsAccept409Response object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required TripsAccept409ResponseBuilder result,
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
  TripsAccept409Response deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = TripsAccept409ResponseBuilder();
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

