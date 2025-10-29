//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'trips_request400_response.g.dart';

/// TripsRequest400Response
///
/// Properties:
/// * [error] 
@BuiltValue()
abstract class TripsRequest400Response implements Built<TripsRequest400Response, TripsRequest400ResponseBuilder> {
  @BuiltValueField(wireName: r'error')
  String? get error;

  TripsRequest400Response._();

  factory TripsRequest400Response([void updates(TripsRequest400ResponseBuilder b)]) = _$TripsRequest400Response;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(TripsRequest400ResponseBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<TripsRequest400Response> get serializer => _$TripsRequest400ResponseSerializer();
}

class _$TripsRequest400ResponseSerializer implements PrimitiveSerializer<TripsRequest400Response> {
  @override
  final Iterable<Type> types = const [TripsRequest400Response, _$TripsRequest400Response];

  @override
  final String wireName = r'TripsRequest400Response';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    TripsRequest400Response object, {
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
    TripsRequest400Response object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required TripsRequest400ResponseBuilder result,
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
  TripsRequest400Response deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = TripsRequest400ResponseBuilder();
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

