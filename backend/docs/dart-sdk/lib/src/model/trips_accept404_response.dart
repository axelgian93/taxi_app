//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'trips_accept404_response.g.dart';

/// TripsAccept404Response
///
/// Properties:
/// * [error] 
@BuiltValue()
abstract class TripsAccept404Response implements Built<TripsAccept404Response, TripsAccept404ResponseBuilder> {
  @BuiltValueField(wireName: r'error')
  String? get error;

  TripsAccept404Response._();

  factory TripsAccept404Response([void updates(TripsAccept404ResponseBuilder b)]) = _$TripsAccept404Response;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(TripsAccept404ResponseBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<TripsAccept404Response> get serializer => _$TripsAccept404ResponseSerializer();
}

class _$TripsAccept404ResponseSerializer implements PrimitiveSerializer<TripsAccept404Response> {
  @override
  final Iterable<Type> types = const [TripsAccept404Response, _$TripsAccept404Response];

  @override
  final String wireName = r'TripsAccept404Response';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    TripsAccept404Response object, {
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
    TripsAccept404Response object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required TripsAccept404ResponseBuilder result,
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
  TripsAccept404Response deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = TripsAccept404ResponseBuilder();
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

