//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'trips_cancel_request.g.dart';

/// TripsCancelRequest
///
/// Properties:
/// * [reason] 
@BuiltValue()
abstract class TripsCancelRequest implements Built<TripsCancelRequest, TripsCancelRequestBuilder> {
  @BuiltValueField(wireName: r'reason')
  String? get reason;

  TripsCancelRequest._();

  factory TripsCancelRequest([void updates(TripsCancelRequestBuilder b)]) = _$TripsCancelRequest;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(TripsCancelRequestBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<TripsCancelRequest> get serializer => _$TripsCancelRequestSerializer();
}

class _$TripsCancelRequestSerializer implements PrimitiveSerializer<TripsCancelRequest> {
  @override
  final Iterable<Type> types = const [TripsCancelRequest, _$TripsCancelRequest];

  @override
  final String wireName = r'TripsCancelRequest';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    TripsCancelRequest object, {
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
    TripsCancelRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required TripsCancelRequestBuilder result,
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
  TripsCancelRequest deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = TripsCancelRequestBuilder();
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

