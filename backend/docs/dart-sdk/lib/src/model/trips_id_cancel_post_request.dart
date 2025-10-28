//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'trips_id_cancel_post_request.g.dart';

/// TripsIdCancelPostRequest
///
/// Properties:
/// * [reason] 
@BuiltValue()
abstract class TripsIdCancelPostRequest implements Built<TripsIdCancelPostRequest, TripsIdCancelPostRequestBuilder> {
  @BuiltValueField(wireName: r'reason')
  String? get reason;

  TripsIdCancelPostRequest._();

  factory TripsIdCancelPostRequest([void updates(TripsIdCancelPostRequestBuilder b)]) = _$TripsIdCancelPostRequest;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(TripsIdCancelPostRequestBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<TripsIdCancelPostRequest> get serializer => _$TripsIdCancelPostRequestSerializer();
}

class _$TripsIdCancelPostRequestSerializer implements PrimitiveSerializer<TripsIdCancelPostRequest> {
  @override
  final Iterable<Type> types = const [TripsIdCancelPostRequest, _$TripsIdCancelPostRequest];

  @override
  final String wireName = r'TripsIdCancelPostRequest';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    TripsIdCancelPostRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    if (object.reason != null) {
      yield r'reason';
      yield serializers.serialize(
        object.reason,
        specifiedType: const FullType(String),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    TripsIdCancelPostRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required TripsIdCancelPostRequestBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'reason':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.reason = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  TripsIdCancelPostRequest deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = TripsIdCancelPostRequestBuilder();
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

