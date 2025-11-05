//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'trips_accept400_response.g.dart';

/// TripsAccept400Response
///
/// Properties:
/// * [error] 
@BuiltValue()
abstract class TripsAccept400Response implements Built<TripsAccept400Response, TripsAccept400ResponseBuilder> {
  @BuiltValueField(wireName: r'error')
  String? get error;

  TripsAccept400Response._();

  factory TripsAccept400Response([void updates(TripsAccept400ResponseBuilder b)]) = _$TripsAccept400Response;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(TripsAccept400ResponseBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<TripsAccept400Response> get serializer => _$TripsAccept400ResponseSerializer();
}

class _$TripsAccept400ResponseSerializer implements PrimitiveSerializer<TripsAccept400Response> {
  @override
  final Iterable<Type> types = const [TripsAccept400Response, _$TripsAccept400Response];

  @override
  final String wireName = r'TripsAccept400Response';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    TripsAccept400Response object, {
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
    TripsAccept400Response object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required TripsAccept400ResponseBuilder result,
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
  TripsAccept400Response deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = TripsAccept400ResponseBuilder();
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

